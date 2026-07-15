"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Terminal, Cpu, RefreshCw, Layers, ShieldCheck, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "resolve-hook", title: "⚙️ 1. Resolve Hook & TSConfig Paths", level: 2 },
  { id: "asset-stubs", title: "🎨 2. Asset & CSS ESM Interception", level: 2 },
  { id: "use-client-refs", title: "⚛️ 3. Client References ('use client')", level: 2 },
  { id: "use-server-actions", title: "🚀 4. Server Actions ('use server')", level: 2 },
  { id: "babel-compilation", title: "⚡ 5. JSX & TypeScript Transpilation", level: 2 },
  { id: "customizations", title: "🛠️ Common Tweak Recipes", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                ESM Loader & Module Resolver
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dissect the inner mechanics of <code>babel-esm-loader.js</code>, Node's custom ESM loaders thread that transpiles JSX/TSX and registers React boundaries on-the-fly.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              • Custom ESM loader: <code>./dinou/core/babel-esm-loader.js</code> <br />
              • Loader entry: <code>./dinou/core/register-loader.mjs</code> <br />
              • Import/Cache helper: <code>./dinou/core/import-module.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Node.js by default is built to execute standard, compiled JavaScript. It does not know how to parse TypeScript (<code>.ts/.tsx</code>), JSX elements, CSS Modules, or dynamic media resources. Furthermore, Node.js does not natively recognize React's special <code>"use client"</code> and <code>"use server"</code> directives.
              </p>
              <p>
                Dinou bridges this execution gap by starting the server with a custom Node.js ESM Loader (via the <code>--import</code> flag in <code>register-loader.mjs</code>). The loader runs in a dedicated worker thread, intercepting every ES Modules dynamic <code>import()</code> and static <code>import</code> chain to resolve, stub, and transpile code on the fly.
              </p>
            </section>

            <hr className="my-8" />

            {/* RESOLVE HOOK */}
            <section id="resolve-hook">
              <h2>⚙️ 1. Resolve Hook & TSConfig Paths</h2>
              <p>
                When a file triggers an import, Node's loader triggers the <code>resolve()</code> hook. Dinou intercepts the request to support clean directory path aliases:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`exports.resolve = async function resolve(specifier, context, defaultResolve) {
  const absPathWithExt = getAbsPathWithExt(specifier, context); // Resolves config paths (@/...)
  if (absPathWithExt) {
    const url = pathToFileURL(absPathWithExt).href;
    return {
      url,
      shortCircuit: true, // Bypass standard Node.js resolver
    };
  }
  return defaultResolve(specifier, context, defaultResolve);
};`}</CodeBlock>
              </div>
              <p>
                By using <code>getAbsPathWithExt()</code>, Dinou checks <code>tsconfig.json</code> and maps specifiers like <code>@/components/Header</code> directly to their absolute local file paths before Node can reject the query.
              </p>
            </section>

            <hr className="my-8" />

            {/* ASSET STUBS */}
            <section id="asset-stubs">
              <h2>🎨 2. Asset & CSS ESM Interception</h2>
              <p>
                Inside the <code>load()</code> hook, Dinou checks the incoming file extension. If a component imports static assets or stylesheets, the loader blocks the default engine binary read:
              </p>
              
              <h3>A. Non-JS Media Assets</h3>
              <p>
                When importing assets like images (<code>.png</code>, <code>.svg</code>), the loader returns a virtual mock stub exporting the URL target path:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const filepath = fileURLToPath(url);
const hashedName = createScopedName(localName, filepath);
const virtualExport = \`export default "/assets/\${hashedName}\${ext}";\`;

return {
  format: "module",
  source: virtualExport,
  shortCircuit: true,
};`}</CodeBlock>
              </div>

              <h3>B. Stylesheets & CSS Modules</h3>
              <p>
                When importing stylesheets (<code>.css</code>), it delegates compilation to PostCSS (via CommonJS <code>require()</code>) and exports the hashed class dictionary:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const mod = require(fileURLToPath(url)); // Triggers css-require-hook
const source = \`export default \${JSON.stringify(mod)};\`;
return { format: "module", source, shortCircuit: true };`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CLIENT REFERENCES */}
            <section id="use-client-refs">
              <h2>⚛️ 3. Client References (<code>"use client"</code>)</h2>
              <p>
                When a Server Component renders, it builds a metadata description (RSC JSON) detailing where Client Components are nested. The server should never compile or evaluate the actual JS body of a Client Component.
              </p>
              <p>
                If a loaded file contains the <code>"use client"</code> directive, the ESM loader intercepts the code and discards the file body completely. It parses the module exports and registers them as **Client References**:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// If file contains 'use client' and we are running inside the react-server graph:
const exports = parseExports(source);
let newSrc = "";

// Import hydration registers from the RSC package
newSrc += 'import pkg from "@roggc/react-server-dom-esm/server.node.js";\\n';
newSrc += 'const {registerClientReference} = pkg;\\n';

for (const name of exports) {
  if (name === 'default') {
    newSrc += \`export default registerClientReference(function() {
      throw new Error("Attempted to call the default export from the server but it's on the client.");
    }, \${JSON.stringify(urlToReturn)}, "default");\\n\`;
  } else {
    newSrc += \`export const \${name} = registerClientReference(function() {
      throw new Error("Attempted to call \${name}() from the server but \${name} is on the client.");
    }, \${JSON.stringify(urlToReturn)}, \${JSON.stringify(name)});\\n\`;
  }
}

return { format: "module", source: newSrc, shortCircuit: true };`}</CodeBlock>
              </div>
              <p>
                This ensures that the server process only outputs the metadata link (reference location) instead of running client-only React hooks like <code>useEffect</code> or <code>useState</code>, which would crash the node process.
              </p>
            </section>

            <hr className="my-8" />

            {/* SERVER ACTIONS */}
            <section id="use-server-actions">
              <h2>🚀 4. Server Actions (<code>"use server"</code>)</h2>
              <p>
                If a file contains <code>"use server"</code>, the functions inside represent asynchronous server actions that the browser client can call remotely.
              </p>
              <p>
                The loader processes the module exports, builds the ESM JavaScript structure, and binds them to the server registry:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const { code } = await transformAsync(source, { ...BabelConfig });
let newSrc = code + "\\n\\n";

newSrc += 'import pkgServer from "@roggc/react-server-dom-esm/server.node.js";\\n';
newSrc += 'const {registerServerReference} = pkgServer;\\n';

const relativeFileUrl = "file:///" + rel.replace(/\\\\/g, "/");
for (const name of exports) {
  if (name !== 'default') {
    newSrc += \`registerServerReference(\${name}, \${JSON.stringify(relativeFileUrl)}, \${JSON.stringify(name)});\n\`;
  }
}
return { format: "module", source: newSrc, shortCircuit: true };`}</CodeBlock>
              </div>
              <p>
                This links each function to a unique identifier so the router can locate and run the exact action when receiving postbacks.
              </p>
            </section>

            <hr className="my-8" />

            {/* BABEL COMPILATION */}
            <section id="babel-compilation">
              <h2>⚡ 5. JSX & TypeScript Transpilation</h2>
              <p>
                For files that do not trigger <code>"use client"</code> or <code>"use server"</code> checks (regular utility files, layout shells, or static pages), the loader compiles the TypeScript and JSX content:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const { code } = await transformAsync(source, {
  filename,
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  sourceMaps: "inline",
});
return { format: "module", source: code, shortCircuit: true };`}</CodeBlock>
              </div>
              <p>
                The output is returning clean, standardized ECMAScript modules that the Node engine can execute inside the V8 context.
              </p>
            </section>

            <hr className="my-8" />

            {/* CUSTOMIZATION INSTRUCTIONS */}
            <section id="customizations">
              <h2>🛠️ Common Tweak Recipes</h2>
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 space-y-3 not-prose text-sm">
                <div>
                  <strong>1. Adding Custom Babel Compilers:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can change compilation rules or register alternative Babel presets (such as adding decorator support) inside the <code>transformAsync()</code> parameters inside the <code>load()</code> hook.
                  </p>
                </div>
                <div>
                  <strong>2. Supporting Custom File Formats:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add new loader branches inside the <code>load()</code> hook (such as loading raw text or markdown files as JS modules) to extend the importing capabilities of your framework.
                  </p>
                </div>
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
