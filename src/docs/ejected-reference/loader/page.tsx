"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Terminal, Cpu, RefreshCw, Layers, ShieldCheck, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "loader-structure", title: "📊 Physical File Structure", level: 2 },
  { id: "deps-mocking", title: "🔗 1. Dependencies & Resolution Mocking", level: 2 },
  { id: "resolve-hook", title: "⚙️ 2. The Resolve Hook", level: 2 },
  { id: "load-hook", title: "📦 3. The Load Hook", level: 2 },
  { id: "asset-interception", title: "🎨 A & B. Asset & CSS Interception", level: 3 },
  { id: "client-references", title: "⚛️ C.1. Client References ('use client')", level: 3 },
  { id: "server-functions", title: "🚀 C.2. Server Functions ('use server')", level: 3 },
  { id: "standard-js", title: "📄 C.3. Standard JS Files", level: 3 },
  { id: "jsx-ts-compilation", title: "⚡ C.4. JSX & TypeScript Transpilation", level: 3 },
  { id: "customizations", title: "🛠️ Common Tweak Recipes", level: 2 },
];

const LOADER_STRUCTURE_DIAGRAM = `graph TD
    classDef depClass fill:#334155,stroke:#475569,stroke-width:1px,color:#fff;
    classDef hookClass fill:#1e293b,stroke:#334155,stroke-width:1px,color:#fff;

    subgraph LoaderSystem [babel-esm-loader.js Pipeline]
        Deps[1. Dependencies & Resolution Mocking<br/>• fs, path, url, babel/core<br/>• Overrides Module._resolveFilename for React server bundles]:::depClass
        
        Deps --> Resolve[2. resolve Hook<br/>• Intercepts imports at lookup stage<br/>• Delegates to getAbsPathWithExt for aliases/extensions<br/>• Returns absolute file:// URL]:::hookClass
        
        Resolve --> Load[3. load Hook<br/>• Intercepts source loading stage]:::hookClass
    end

    subgraph LoadStages [load Hook Branches]
        Load --> Asset[A. Static Assets .png/.jpg/.svg<br/>• Generates mock ES module exporting asset path]
        Load --> CSS[B. Stylesheets .css<br/>• Requires path to run PostCSS JIT<br/>• Exports JSON class mappings]
        Load --> Src[C. Source Files .js/.jsx/.ts/.tsx<br/>• Analyzes directives]
    end

    subgraph SourceParsing [Source Code Directives]
        Src --> ClientCheck{isReactServer & hasUseClient?}
        ClientCheck -->|Yes| ClientStub[Client Reference Stubbing<br/>• Discards original server-side code<br/>• Generates registerClientReference stub proxies]
        
        Src --> ServerCheck{isReactServer & hasUseServer?}
        ServerCheck -->|Yes| ServerRegister[Server Actions Registration<br/>• Compiles functions with Babel<br/>• Maps function exports to Action IDs<br/>• Binds via registerServerReference]

        Src --> DefaultJS[Standard JS / TSX<br/>• Transpiles JSX & types to JS via Babel<br/>• Injects inline source maps]
    end`;

const LOADER_DEPS_MOCKING_CODE = `const fs = require("fs");
const path = require("path");
const { transformAsync } = require("@babel/core");
const { fileURLToPath, pathToFileURL } = require("url");
const createScopedName = require("./createScopedName");
const { extensionsWithDot } = require("./asset-extensions.js");
const { getAbsPathWithExt } = require("./get-abs-path-with-ext.js");
const { normalizePathCase } = require("./path-utils.js");
const Module = require("module");

const originalResolveFilename = Module._resolveFilename;
const isWebpack = process.env.DINOU_BUILD_TOOL === "webpack";

let reactServerPath, reactDomServerPath, reactJsxRuntimePath, reactJsxDevRuntimePath;

if (!isWebpack) {
  const reactPkgJson = require.resolve("react/package.json");
  reactServerPath = path.join(path.dirname(reactPkgJson), "react.react-server.js");
  reactJsxRuntimePath = path.join(path.dirname(reactPkgJson), "jsx-runtime.react-server.js");
  reactJsxDevRuntimePath = path.join(path.dirname(reactPkgJson), "jsx-dev-runtime.react-server.js");

  const reactDomPkgJson = require.resolve("react-dom/package.json");
  reactDomServerPath = path.join(path.dirname(reactDomPkgJson), "react-dom.react-server.js");
}

Module._resolveFilename = function (request, parent, isMain, options) {
  if (!isWebpack) {
    if (request === "react") {
      return reactServerPath;
    } else if (request === "react-dom") {
      return reactDomServerPath;
    } else if (request === "react/jsx-runtime") {
      return reactJsxRuntimePath;
    } else if (request === "react/jsx-dev-runtime") {
      return reactJsxDevRuntimePath;
    }
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};

require("./css-require-hook.js")();`;

const LOADER_RESOLVE_HOOK_CODE = `exports.resolve = async function resolve(specifier, context, defaultResolve) {
  const absPathWithExt = getAbsPathWithExt(specifier, context);
  if (absPathWithExt) {
    const url = pathToFileURL(absPathWithExt).href;
    return {
      url,
      shortCircuit: true,
    };
  }
  return defaultResolve(specifier, context, defaultResolve);
};`;

const LOADER_ASSETS_LOAD_CODE = `// Handles asset file extensions (e.g. .png, .jpg, .svg, etc.)
const assetExts = extensionsWithDot;
const ext = path.extname(url.split("?")[0]);

if (assetExts.includes(ext)) {
  const filepath = fileURLToPath(url);
  const localName = path.basename(filepath, ext);
  const hashedName = createScopedName(localName, filepath);
  const virtualExport = \`export default "/assets/\${hashedName}\${ext}";\`;

  return {
    format: "module",
    source: virtualExport,
    shortCircuit: true,
    url,
  };
}

// Handles stylesheets and CSS module mapping dictionaries
if (ext === ".css") {
  const mod = require(fileURLToPath(url));
  const source = \`export default \${JSON.stringify(mod)};\`;
  return { format: "module", source, shortCircuit: true, url };
}`;

const LOADER_CLIENT_REF_CODE = `const cleanUrl = url.split("?")[0];
if (/\\.(jsx|tsx|ts|js)$/.test(cleanUrl)) {
  const filename = fileURLToPath(cleanUrl.startsWith("file://") ? cleanUrl : pathToFileURL(cleanUrl).href);
  const rel = path.relative(normalizePathCase(process.cwd()), normalizePathCase(filename));
  const source = fs.readFileSync(filename, "utf-8");
  const urlToReturn = pathToFileURL(filename).href;

  const useClientRegex = /^\\s*(?:(?:\\/\\/[^\\n]*\\n\\s*)|(?:\\/\\*[\\s\\S]*?\\*\\/\\s*))*['"]use client['"]/;
  const hasUseClient = useClientRegex.test(source);

  const isReactServer = process.execArgv.some(arg => arg.includes("react-server"));

  if (isReactServer && hasUseClient) {
    const parseExports = require("./parse-exports.js");
    const exports = parseExports(source);
    let newSrc = "";
    if (isWebpack) {
      newSrc += 'import { registerClientReference } from "react-server-dom-webpack/server";\\n';
    } else {
      const packageJsonPath = require.resolve("@roggc/react-server-dom-esm/package.json");
      const serverNodePath = path.join(path.dirname(packageJsonPath), "server.node.js");
      const serverNodeUrl = pathToFileURL(serverNodePath).href;
      newSrc += \`import pkg from \${JSON.stringify(serverNodeUrl)};\\n\`;
      newSrc += 'const {registerClientReference} = pkg;\\n';
    }
    for (const name of exports) {
      if (name === 'default') {
        newSrc += 'export default registerClientReference(function() {\\n';
        newSrc += '  throw new Error(' + JSON.stringify("Attempted to call the default export of " + urlToReturn + " from the server but it's on the client.") + ');\\n';
        newSrc += '}, ' + JSON.stringify(urlToReturn) + ', "default");\\n';
      } else {
        newSrc += 'export const ' + name + ' = registerClientReference(function() {\\n';
        newSrc += '  throw new Error(' + JSON.stringify("Attempted to call " + name + "() from the server but " + name + " is on the client.") + ');\\n';
        newSrc += '}, ' + JSON.stringify(urlToReturn) + ', ' + JSON.stringify(name) + ');\\n';
      }
    }
    return {
      format: "module",
      source: newSrc,
      shortCircuit: true,
      url: urlToReturn,
    };
  }
}`;

const LOADER_SERVER_ACTION_CODE = `const { useServerRegex } = require("../constants.js");
const hasUseServer = useServerRegex.test(source);

if (isReactServer && hasUseServer) {
  const parseExports = require("./parse-exports.js");
  const exports = parseExports(source);

  const { code } = await transformAsync(source, {
    filename,
    presets: [
      ["@babel/preset-react", { runtime: "automatic" }],
      "@babel/preset-typescript",
    ],
    sourceMaps: "inline",
    ast: false,
  });

  let newSrc = code + "\\n\\n";

  if (!isWebpack) {
    const packageJsonPath = require.resolve("@roggc/react-server-dom-esm/package.json");
    const serverNodePath = path.join(path.dirname(packageJsonPath), "server.node.js");
    const serverNodeUrl = pathToFileURL(serverNodePath).href;
    newSrc += \`import pkgServer from \${JSON.stringify(serverNodeUrl)};\\n\`;
    newSrc += 'const {registerServerReference} = pkgServer;\\n';
  }

  const relativeFileUrl = "file:///" + rel.replace(/\\\\/g, "/");
  for (const name of exports) {
    if (name !== 'default') {
      newSrc += \`registerServerReference(\${name}, \dots);\n\`;
    }
  }

  return {
    format: "module",
    source: newSrc,
    shortCircuit: true,
    url: urlToReturn,
  };
}`;

const LOADER_STANDARD_JS_CODE = `const esmSyntaxRegex = /^(?:import|export)\\b/m;
const hasESMSyntax = esmSyntaxRegex.test(source);

if (ext === ".js" && !rel.startsWith("src" + path.sep) && !hasESMSyntax) {
  // Pass to default loader if it's a non-esm commonjs file in node_modules
  return defaultLoad(url, context, defaultLoad);
}

if (ext === ".js") {
  // If it's a JS file in our source, load it directly as module
  return {
    format: "module",
    source,
    shortCircuit: true,
    url,
  };
}`;

const LOADER_BABEL_TRANSPILE_CODE = `const { code } = await transformAsync(source, {
  filename,
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  sourceMaps: "inline",
  ast: false,
});

return {
  format: "module",
  source: code,
  shortCircuit: true,
  url: urlToReturn,
};`;

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

            {/* PHYSICAL STRUCTURE */}
            <section id="loader-structure">
              <h2>📊 Physical File Structure</h2>
              <p>
                The <code>babel-esm-loader.js</code> file follows this logical pipeline structure during module resolution and compilation:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{LOADER_STRUCTURE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* DEPENDENCIES & MOCKING */}
            <section id="deps-mocking">
              <h2>🔗 1. Dependencies & Resolution Mocking</h2>
              <p>
                At startup, the loader pulls in core Node.js file system APIs, Babel transpilation modules, and project helper functions (like <code>getAbsPathWithExt</code>).
              </p>
              <p>
                Crucially, when running under ES Modules in a non-Webpack environment, Node.js needs to resolve the standard <code>"react"</code> and <code>"react-dom"</code> packages to their respective server-specific bundles (<code>.react-server.js</code>). The loader overrides Node's native module resolver hook <code>Module._resolveFilename</code> to dynamically map these imports:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LOADER_DEPS_MOCKING_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* RESOLVE HOOK */}
            <section id="resolve-hook">
              <h2>⚙️ 2. The Resolve Hook (<code>exports.resolve</code>)</h2>
              <p>
                When a file triggers an import, Node's loader triggers the <code>resolve()</code> hook. Dinou intercepts the request to support clean directory path aliases and implicit file extensions:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LOADER_RESOLVE_HOOK_CODE}</CodeBlock>
              </div>
              <p>
                <strong>Under the Hood: <code>getAbsPathWithExt()</code> and Path Normalization</strong>
              </p>
              <p>
                In the ES Modules specification, Node.js natively requires explicit relative paths with complete file extensions (e.g., <code>import Header from "./Header.tsx"</code> instead of <code>"./Header"</code>). To restore standard frontend importing syntax, <code>getAbsPathWithExt()</code> executes three operations:
              </p>
              <ul>
                <li>
                  <strong>Alias Resolution (tsconfig.json):</strong> It reads the project's <code>tsconfig.json</code> (or <code>jsconfig.json</code>) síncronamente at startup. It maps the <code>compilerOptions.paths</code> keys (e.g., <code>"@/*"</code>) to their absolute target base directories on disk.
                </li>
                <li>
                  <strong>Relative Path Resolution:</strong> If the specifier is relative (starts with <code>./</code> or <code>../</code>), it converts the path to an absolute location relative to the parent file's folder (<code>context.parentURL</code>).
                </li>
                <li>
                  <strong>Implicit Extension & Index Scans (<code>tryExtensions</code>):</strong> Once an absolute path is resolved, if it does not point directly to an active file, it scans sequentially for valid file suffixes: <code>.js</code>, <code>.ts</code>, <code>.jsx</code>, and <code>.tsx</code>. If the path points to a directory (e.g., <code>components/Header/</code>), it sweeps for index entryfiles: <code>index.js</code>, <code>index.ts</code>, <code>index.jsx</code>, or <code>index.tsx</code>.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* LOAD HOOK */}
            <section id="load-hook">
              <h2>📦 3. The Load Hook (<code>exports.load</code>)</h2>
              <p>
                Once a module's file URL is resolved, Node calls the <code>load()</code> hook to fetch and parse the source code. Dinou intercepts the loading process depending on the file type:
              </p>

              {/* ASSET INTERCEPTION */}
              <h3 id="asset-interception">🎨 A & B. Asset & CSS Interception</h3>
              <p>
                If a component imports stylesheets or static media files, Node's loader would throw an evaluation error. Dinou intercepts these extensions and returns virtual mock stubs:
              </p>
              <ul>
                <li>
                  <strong>Non-JS Media Assets (images, fonts, etc.):</strong> The loader checks against the list of asset extensions. It creates a scoped hashed name and returns a virtual module that simply exports the static public asset URL (e.g. <code>export default "/assets/logo.a1b2.png"</code>).
                </li>
                <li>
                  <strong>CSS Stylesheets:</strong> Imports ending in <code>.css</code> are required synchronously (which triggers the backend <code>css-require-hook</code> to parse class names into a mapped CSS modules dictionary) and exported as a JSON-serialized object module.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LOADER_ASSETS_LOAD_CODE}</CodeBlock>
              </div>

              {/* CLIENT REFERENCES */}
              <h3 id="client-references">⚛️ C.1. Client References (<code>"use client"</code>)</h3>
              <p>
                When a Server Component renders, it builds a metadata description (RSC Flight payload) detailing where Client Components are nested. The server should never compile or evaluate the actual JS body of a Client Component, as browser-only globals (like <code>window</code> or <code>document</code>) or React hooks (like <code>useEffect</code> or <code>useState</code>) would crash the Node.js server.
              </p>
              <p>
                <strong>The <code>isReactServer && hasUseClient</code> Conditional Guard:</strong>
              </p>
              <p>
                If the loader is running within the React Server Components rendering graph (identified by checking if <code>process.execArgv</code> contains the <code>react-server</code> flag) and detects the <code>"use client"</code> directive in a file:
              </p>
              <ol>
                <li>
                  <strong>Discarding the Source Code:</strong> The loader completely discards the original source file body to protect the server environment.
                </li>
                <li>
                  <strong>Parsing Exports:</strong> It parses the file's exports síncronamente using the helper <code>parseExports(source)</code>.
                </li>
                <li>
                  <strong>Registering Proxies:</strong> It replaces the exports with a call to <code>registerClientReference()</code> from React's server-dom packages (as shown below). This registers a metadata hook pointing to the local file URL and export key.
                </li>
              </ol>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LOADER_CLIENT_REF_CODE}</CodeBlock>
              </div>
              <p>
                This ensures that the server process only outputs the metadata link (reference location) instead of running client-only code. If the server tries to invoke a client component default or named export directly, the proxy function throws a descriptive runtime exception.
              </p>

              {/* SERVER FUNCTIONS */}
              <h3 id="server-functions">🚀 C.2. Server Functions (<code>"use server"</code>)</h3>
              <p>
                If a file contains the <code>"use server"</code> directive, the functions exported from this module represent Server Functions (Server Actions) that the client browser can trigger remotely via POST request callbacks.
              </p>
              <p>
                <strong>The <code>isReactServer && hasUseServer</code> Conditional Guard:</strong>
              </p>
              <p>
                When executing Server Components, if the loader catches a <code>"use server"</code> module:
              </p>
              <ol>
                <li>
                  <strong>Transpile code:</strong> Unlike client components, it does not discard the function bodies. It compiles the code via Babel to generate pure JavaScript compatible with the execution environment.
                </li>
                <li>
                  <strong>Map IDs:</strong> It maps every exported function key to an absolute reference using its relative file system URL and the export symbol name.
                </li>
                <li>
                  <strong>Server Registry Binding:</strong> It appends calls to <code>registerServerReference()</code> mapping the function pointer to its unique remote address (as shown below).
                </li>
              </ol>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LOADER_SERVER_ACTION_CODE}</CodeBlock>
              </div>
              <p>
                This links each function to a unique identifier. When the client invokes a Server Function, the browser transmits a POST request containing these target parameters. The Dinou router reads the request, maps it to the registered function, executes it in the Node environment, and streams the React response back to the client.
              </p>

              {/* STANDARD JS FILES */}
              <h3 id="standard-js">📄 C.3. Standard JS Files</h3>
              <p>
                For standard, plain JavaScript files that are imported, the loader determines whether to bypass compiler steps:
              </p>
              <ul>
                <li>
                  <strong>CommonJS node_modules bypass:</strong> If it's a <code>.js</code> file in the <code>node_modules</code> folder that does not contain ES Module syntax (like static <code>import/export</code> statements), it bypasses custom loaders and delegates to Node's <code>defaultLoad</code>.
                </li>
                <li>
                  <strong>Workspace JS files:</strong> If it belongs to our application source, the file is loaded directly as a standard ES Module.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LOADER_STANDARD_JS_CODE}</CodeBlock>
              </div>

              {/* JSX & TS COMPILATION */}
              <h3 id="jsx-ts-compilation">⚡ C.4. JSX & TypeScript Transpilation</h3>
              <p>
                For source files that do not trigger client reference or server function stubs (regular utility files, layouts, or static pages), the loader compiles the TypeScript syntax and JSX elements:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LOADER_BABEL_TRANSPILE_CODE}</CodeBlock>
              </div>
              <p>
                The output returns clean, standardized ECMAScript modules (with inline source maps for debugging) that the V8 runtime engine can execute natively.
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
