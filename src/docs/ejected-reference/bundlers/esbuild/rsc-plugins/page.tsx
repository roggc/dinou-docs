"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Layers, Database, Cpu, HelpCircle } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "client-manifest-flow", title: "📊 Client Manifest Plugin Flow", level: 2 },
  { id: "server-functions-flow", title: "📊 Server Functions Proxy Flow", level: 2 },
  { id: "compiler-flow", title: "📊 React Compiler Bridge Flow", level: 2 },
  { id: "code-manifest", title: "⚙️ react-client-manifest-plugin.mjs", level: 2 },
  { id: "code-server", title: "⚙️ server-functions-plugin.mjs", level: 2 },
  { id: "code-babel", title: "⚙️ babel-react-compiler-plugin.mjs", level: 2 },
];

const MANIFEST_DIAGRAM = `graph TD
    Start[metafile.outputs from esbuild] --> Loop[Loop through output chunks]
    Loop --> DirectiveCheck{Contains 'use client' directive?}
    DirectiveCheck -->|No| Skip[Skip module]
    DirectiveCheck -->|Yes| Parse[parseExports code]
    Parse --> UpdateMap[Update manifest map:<br/>manifestKey -> Hashed chunk path]
    UpdateMap --> WriteManifest[Write react-client-manifest.json]`;

const SERVER_DIAGRAM = `graph TD
    Start[File loaded by esbuild] --> DirectiveCheck{Contains 'use server' directive?}
    DirectiveCheck -->|No| Proceed[Proceed Null]
    DirectiveCheck -->|Yes| Parse[parseExports code]
    Parse --> GenProxy[Generate Proxy Code:<br/>import createServerFunctionProxy<br/>export proxies of all exports]
    GenProxy --> Return[Return replacement contents]`;

const COMPILER_DIAGRAM = `graph TD
    Start[File loaded by esbuild] --> EntryCheck{Is an entrypoint?}
    EntryCheck -->|No| Proceed[Proceed Null]
    EntryCheck -->|Yes| Transpile[babel.transformAsync:<br/>presets: @babel/preset-react, @babel/preset-typescript<br/>plugins: babel-plugin-react-compiler]
    Transpile --> Return[Return compiled JS code]`;

const MANIFEST_CODE = `import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { readFileSync } from "node:fs";
import parseExports from "../../core/parse-exports.js";
import { useClientRegex } from "../../constants.js";

export default function reactClientManifestPlugin({
  manifestPath = "react_client_manifest/react-client-manifest.json",
  manifest = {},
} = {}) {
  return {
    name: "react-client-manifest",
    setup(build) {
      build.onEnd(async (result) => {
        try {
          const meta = result.metafile;
          if (meta && meta.outputs) {
            for (const [outFile, outInfo] of Object.entries(meta.outputs)) {
              const fileName = outFile.replace(/\\\\/g, "/").split(/[\\/]/).pop();
              const outUrl = "/" + fileName;
              const modulePath = outInfo.entryPoint;
              if (!modulePath || modulePath.startsWith("dinou-asset-entry:")) {
                continue;
              }
              const absModulePath = path.resolve(modulePath);
              const baseFileUrl = pathToFileURL(absModulePath).href;
              const code = readFileSync(absModulePath, "utf8");
              const isClientModule = useClientRegex.test(code.trim());
              if (!isClientModule) {
                continue;
              }
              const exports = parseExports(code);
              for (const expName of exports) {
                const manifestKey =
                  expName === "default"
                    ? baseFileUrl
                    : \`\${baseFileUrl}#\${expName}\`;
                if (manifest[manifestKey]) {
                  manifest[manifestKey].id = outUrl; // Map module url to the final build file path
                }
              }
            }
          }

          await fs.mkdir(path.dirname(manifestPath), { recursive: true });
          await fs.writeFile(manifestPath, JSON.stringify(manifest, null, 2), "utf8");
        } catch (err) {
          console.warn("[react-client-manifest] onEnd error:", err.message);
        }
      });
    },
  };
}`;

const SERVER_CODE = `import path from "path";
import fs from "node:fs/promises";
import parseExports from "../../core/parse-exports.js";
import { useServerRegex } from "../../constants.js";

export default function serverFunctionsPlugin(manifestData = {}) {
  return {
    name: "server-functions-proxy",
    setup(build) {
      const root = process.cwd();
      const serverFunctions = new Map();

      // 1. Intercept "use server" actions and compile proxy skeletons
      build.onLoad({ filter: /\\.[jt]sx?$/ }, async (args) => {
        const code = await fs.readFile(args.path, "utf8");
        if (!useServerRegex.test(code.trim())) return null;

        const exports = parseExports(code);
        if (exports.length === 0) return null;

        const relativePath = path.relative(root, args.path).replace(/\\\\/g, "/");
        serverFunctions.set(relativePath, new Set(exports));

        const fileUrl = \`file:///\${relativePath}\`;
        let proxyCode = \`import { createServerFunctionProxy } from "/__SERVER_FUNCTION_PROXY__";\\n\`;

        for (const exp of exports) {
          const key = exp === "default" ? \`\${fileUrl}#default\` : \`\${fileUrl}#\${exp}\`;
          if (exp === "default") {
            proxyCode += \`export default createServerFunctionProxy(\${JSON.stringify(key)});\n\`;
          } else {
            proxyCode += \`export const \${exp} = createServerFunctionProxy(\${JSON.stringify(key)});\n\`;
          }
        }

        return { contents: proxyCode, loader: "js" };
      });

      // 2. Map placeholder path to final compiled build file
      build.onEnd(async (result) => {
        const hashedProxy = "/" + (manifestData["serverFunctionProxy.js"] || "serverFunctionProxy.js");

        for (const outputFile of Object.values(result.outputFiles)) {
          const fileCode = new TextDecoder().decode(outputFile.contents);
          if (!fileCode) continue;
          if (fileCode.includes("/__SERVER_FUNCTION_PROXY__")) {
            const newCode = fileCode.replace(/\\/__SERVER_FUNCTION_PROXY__/g, hashedProxy);
            outputFile.contents = new TextEncoder().encode(newCode);
          }
        }

        const manifestObj = {};
        for (const [path, exportsSet] of serverFunctions.entries()) {
          manifestObj[path] = Array.from(exportsSet);
        }

        const manifestPath = path.join("server_functions_manifest", "server-functions-manifest.json");
        await fs.mkdir(path.dirname(manifestPath), { recursive: true });
        await fs.writeFile(manifestPath, JSON.stringify(manifestObj, null, 2));
      });
    },
  };
}`;

const BABEL_CODE = `import babel from "@babel/core";
import fs from "node:fs/promises";
import path from "node:path";

const norm = (p) => path.resolve(p).replace(/\\\\/g, "/");

export default function babelReactCompilerPlugin() {
  return {
    name: "babel-react-compiler-bridge",
    setup(build) {
      const entryPoints = build.initialOptions.entryPoints;

      build.onLoad({ filter: /\\.[jt]sx?$/ }, async (args) => {
        if (args.path.includes("node_modules")) return;
        const abs = path.resolve(args.path);
        const absNorm = norm(abs);
        
        const isAnEntryPoint = Object.values(entryPoints).some(
          (val) => norm(path.resolve(val)) === absNorm,
        );
        if (!isAnEntryPoint) return;

        try {
          const source = await fs.readFile(args.path, "utf8");
          const filename = args.path;

          // Compile code using Babel and the new React 19 compiler memoizer plugin
          const result = await babel.transformAsync(source, {
            filename,
            presets: [
              ["@babel/preset-react", { runtime: "automatic" }],
              "@babel/preset-typescript",
            ],
            plugins: ["babel-plugin-react-compiler"],
            sourceMaps: true,
            configFile: false,
          });

          if (!result || !result.code) return;

          return { contents: result.code, loader: "js" };
        } catch (error) {
          return { errors: [{ text: error.message, detail: error }] };
        }
      });
    },
  };
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-6 w-6 text-primary text-yellow-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Core RSC Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the compiler plugins coordinating Client Manifest generations, Server Action IPC proxying, and React 19 compilations.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • Client Manifest: <code>./dinou/esbuild/plugins-esbuild/react-client-manifest-plugin.mjs</code> <br />
              • Actions Proxy: <code>./dinou/esbuild/plugins-esbuild/server-functions-plugin.mjs</code> <br />
              • React 19 Compiler: <code>./dinou/esbuild/plugins-esbuild/babel-react-compiler-plugin.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                React Server Components require tight compiler integrations: client component bundles must be indexed so they can be referenced in server streams, and Server Actions (which contain private backend database lookups) must be replaced with proxy callbacks before sending code to browser clients.
              </p>
            </section>

            <hr className="my-8" />

            {/* CLIENT FLOW */}
            <section id="client-manifest-flow">
              <h2>📊 Client Manifest Plugin Flow</h2>
              <p>
                The flowchart below traces the client component export parsing and manifest indexing process:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{MANIFEST_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SERVER FLOW */}
            <section id="server-functions-flow">
              <h2>📊 Server Functions Proxy Flow</h2>
              <p>
                The flowchart below shows how Server Actions are transformed into client-side fetch proxy calls:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{SERVER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* COMPILER FLOW */}
            <section id="compiler-flow">
              <h2>📊 React Compiler Bridge Flow</h2>
              <p>
                The flowchart below shows the Babel bridge that compiles React 19 auto-memoized trees:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{COMPILER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH MANIFEST */}
            <section id="code-manifest">
              <h2>⚙️ react-client-manifest-plugin.mjs</h2>
              <p>
                Below is the full, complete code of the React client manifest compiler plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{MANIFEST_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH SERVER */}
            <section id="code-server">
              <h2>⚙️ server-functions-plugin.mjs</h2>
              <p>
                Below is the full, complete code of the Server Action proxy compiler plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{SERVER_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH BABEL */}
            <section id="code-babel">
              <h2>⚙️ babel-react-compiler-plugin.mjs</h2>
              <p>
                Below is the full, complete code of the Babel React Compiler plugin bridge:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{BABEL_CODE}</CodeBlock>
              </div>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
