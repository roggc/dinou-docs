"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Shield } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "server-functions-flow", title: "📊 Server Functions Flow", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const SERVER_FUNCTIONS_DIAGRAM = `graph TD
    Start[transform hook: load file] --> Check{Contains 'use server'?}
    Check -->|No| Pass[Pass through / Return null]
    Check -->|Yes| Parse[parseExports exports]
    
    Parse --> Registry[Register exports in serverFunctions Map]
    Registry --> ProxyCode[Generate fetch proxies code for all exports]
    ProxyCode --> Return[Return proxy code to replace original code]
    
    Return --> GenerateBundle[generateBundle: read manifestGeneratorPlugin.manifestData]
    GenerateBundle --> ReplacePlaceholder[Replace /__SERVER_FUNCTION_PROXY__ with hashed path]
    ReplacePlaceholder --> WriteManifest[Write server-functions-manifest.json]`;

const SERVER_CODE = `// rollup-plugin-server-functions.js
const path = require("path");
const fs = require("fs/promises");
const manifestGeneratorPlugin = require("./manifest-generator-plugin");
const parseExports = require("../../core/parse-exports.js");
const { useServerRegex } = require("../../constants.js");

function serverFunctionsPlugin() {
  const root = process.cwd();
  const serverFunctions = new Map(); // Collect here: Map<relativePath, Set<exports>>

  return {
    name: "server-functions-proxy",
    transform(code, id) {
      if (!useServerRegex.test(code.trim())) return null;

      const exports = parseExports(code);
      if (exports.length === 0) return null;

      const relativePath = path.relative(root, id).replace(/\\\\/g, "/");
      serverFunctions.set(relativePath, new Set(exports));

      const fileUrl = \`file:///\${relativePath}\`;

      let proxyCode = \`
        import { createServerFunctionProxy } from "/__SERVER_FUNCTION_PROXY__";
      \`;

      for (const exp of exports) {
        const key =
          exp === "default" ? \`\${fileUrl}#default\` : \`\${fileUrl}#\${exp}\`;
        if (exp === "default") {
          proxyCode += \`export default createServerFunctionProxy(\${JSON.stringify(
            key
          )});\n\`;
        } else {
          proxyCode += \`export const \${exp} = createServerFunctionProxy(\${JSON.stringify(
            key
          )});\n\`;
        }
      }

      return {
        code: proxyCode,
        map: null,
      };
    },
    async generateBundle(options, bundle) {
      const manifest = manifestGeneratorPlugin.manifestData;
      const hashedPath =
        "/" + (manifest["serverFunctionProxy.js"] || "serverFunctionProxy.js");

      for (const file of Object.keys(bundle)) {
        const chunk = bundle[file];
        if (chunk.type === "asset" || !chunk.code) continue;
        if (chunk.code.includes("/__SERVER_FUNCTION_PROXY__")) {
          chunk.code = chunk.code.replace(
            /\\/__SERVER_FUNCTION_PROXY__/g,
            hashedPath
          );
        }
      }

      const manifestObj = {};
      for (const [relPath, exportsSet] of serverFunctions.entries()) {
        manifestObj[relPath] = Array.from(exportsSet);
      }

      const manifestPath = path.join(
        "server_functions_manifest",
        "server-functions-manifest.json"
      );
      try {
        await fs.mkdir(path.dirname(manifestPath), { recursive: true });
        await fs.writeFile(manifestPath, JSON.stringify(manifestObj, null, 2));
      } catch (err) {
        console.error(err);
      }
    },
  };
}

module.exports = serverFunctionsPlugin;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-6 w-6 text-primary text-orange-600 dark:text-orange-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Server Functions Plugin
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the Rollup compiler hooks used to secure database calls and serialize Server Functions during production bundling.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/rollup/rollup-plugins/rollup-plugin-server-functions.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Server Functions contain sensitive database hooks and APIs that must never leak into client-side JS bundles.
              </p>
              <p>
                The <code>rollup-plugin-server-functions.js</code> plugin intercepts modules containing the <code>"use server"</code> directive during the <code>transform</code> stage. It strips out all server-side logic and replaces it with dynamic fetch proxy stubs. When the bundle is created, it writes the Server Function whitelist index: <code>server-functions-manifest.json</code>.
              </p>
            </section>

            <hr className="my-8" />

            {/* SERVER FUNCTIONS FLOW */}
            <section id="server-functions-flow">
              <h2>📊 Server Functions Flow</h2>
              <p>
                The flowchart below shows how Server Functions are extracted and transformed into client-side proxy skeletons:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="650px">{SERVER_FUNCTIONS_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of the Server Functions plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{SERVER_CODE}</CodeBlock>
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
