"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Terminal, Shield, RefreshCw, Zap, Cpu, Key, HelpCircle } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "module-hack", title: "📦 1. Module Resolution Hack", level: 2 },
  { id: "babel-register", title: "⚙️ 2. On-the-fly Transpilation", level: 2 },
  { id: "assets-styles", title: "🎨 3. Assets & Styles Loading", level: 2 },
  { id: "hmr-engine", title: "🔄 4. Dev HMR & Cache Eviction", level: 2 },
  { id: "context-wrappers", title: "🛡️ 5. Context State & Cookie Injection", level: 2 },
  { id: "routing-endpoints", title: "🚀 6. Routing & RSC Endpoints", level: 2 },
  { id: "security-features", title: "🛡️ 7. Bot Mitigation Shield", level: 2 },
  { id: "startup-sequence", title: "🏁 8. Server Startup Sequence", level: 2 },
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
                Deep Dive: server.js
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              An exhaustive architectural review of <code>dinou/core/server.js</code>, the framework's main Express server orchestrator.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Path:</strong> <code>./dinou/core/server.js</code> <br />
              <strong>Role:</strong> Parent Node.js process. Responsible for starting the web server, resolving route structures, hosting Server Actions, managing Node's runtime module cache, and piping flight payloads to the SSR sub-process.
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                The <code>server.js</code> file is the root server entry point. It is loaded as a <strong>CommonJS (CJS)</strong> script in Node.js, and is executed with the <code>--conditions=react-server</code> flag. It bootstraps the environment, overrides Node's module resolution, transpiles incoming ES modules, watches filesystem changes for HMR cache eviction, and starts the Express application.
              </p>

              <h3>server.js File Structure & Lifecycle</h3>
              <p>
                Below is a visual map outlining the lifecycle phases and core duties of the ejected <code>server.js</code> file:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{`========================================================================================================
                                      SERVER.JS ARCHITECTURE & LIFECYCLE
========================================================================================================

 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │  1. INITIALIZATION & TRANSPILATION                                                                 │
 │                                                                                                    │
 │  • Load Core Dependencies (Express, Chokidar, React Server DOM, etc.)                              │
 │  • @babel/register Hook ──> JIT transpile JSX/TypeScript imports in CommonJS (server & child)       │
 │  • asset-require-hook & css-require-hook ──> Mock static imports (png, css) in Node.js             │
 └───────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │  2. HOT MODULE REPLACEMENT ENGINE (Development Only)                                               │
 │                                                                                                    │
 │  • Chokidar Watcher ──> Monitors react_client_manifest/ for updates                                │
 │  • loadManifestWithRetry & readJSONWithRetry ──> Prevent concurrent I/O race conditions            │
 │  • clearRequireCache & getParents ──> Evict modified modules & propagate HMR recursively           │
 └───────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │  3. EXPRESS APP & ENVIRONMENT MIDDLEWARES                                                          │
 │                                                                                                    │
 │  • Static Asset Handlers ──> Serve files from dist3/ (client builds) & src/                        │
 │  • AsyncLocalStorage Request Context ──> Bind HTTP request/response to React rendering thread      │
 └───────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │  4. ROUTING & RSC ENDPOINTS                                                                        │
 │                                                                                                    │
 │  ├── GET  /____rsc_payload____/*        ──> Returns the standard RSC Flight binary payload stream │
 │  │                                                                                                 │
 │  ├── POST /____rsc_payload_error____/*  ──> Handles server crashes, returns React error layout    │
 │  │                                                                                                 │
 │  ├── GET  Wildcard Route (/*)           ──> Compiles parameters, checks blocklists, routes requests │
 │  │                                           to page_functions, and pipes output to children        │
 │  │                                                                                                 │
 │  └── POST /____server_function____       ──> Invokes actions mapped by registerServerReference     │
 └───────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                     │
                                     ▼
 ┌────────────────────────────────────────────────────────────────────────────────────────────────────┐
 │  5. LAUNCH                                                                                         │
 │                                                                                                    │
 │  • Listen (port 3000) ──> Ready to handle request streams                                          │
 └────────────────────────────────────────────────────────────────────────────────────────────────────┘`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* 1. MODULE RESOLUTION HACK */}
            <section id="module-hack">
              <h2>📦 1. Module Resolution Hack</h2>
              <p>
                React Server Components (RSC) require a specialized build of React (<code>react.react-server.js</code>) that includes server-exclusive APIs like <code>renderToPipeableStream</code> and prevents the import of client-only hooks like <code>useState</code>.
              </p>
              <p>
                Because standard CommonJS <code>require("react")</code> calls ignore Node's <code>--conditions</code> flags (which only affect ES Modules imports), Dinou intercepts Node's module loader by overriding <code>Module._resolveFilename</code>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const Module = require("module");
const originalResolveFilename = Module._resolveFilename;

Module._resolveFilename = function (request, parent, isMain, options) {
  if (!isWebpack) { // Webpack handles its own resolver manifests
    if (request === "react") return reactServerPath;
    if (request === "react-dom") return reactDomServerPath;
    if (request === "react/jsx-runtime") return reactJsxRuntimePath;
    if (request === "react/jsx-dev-runtime") return reactJsxDevRuntimePath;
  }
  return originalResolveFilename.call(this, request, parent, isMain, options);
};`}</CodeBlock>
              </div>

              <h3>Why this is critical:</h3>
              <ul>
                <li><strong>Prevents Memory Collisions:</strong> If standard React and React Server run in the same process, the V8 engine instantiates both simultaneously, leading to crashes during serialization.</li>
                <li><strong>Webpack Bypassing:</strong> If you bundle using Webpack, this hook is bypassed (<code>isWebpack = true</code>) because Webpack handles compilation pathways internally and registers its own resolver registers via <code>react-server-dom-webpack/node-register</code>.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* 2. ON-THE-FLY TRANSPILATION */}
            <section id="babel-register">
              <h2>⚙️ 2. On-the-fly Transpilation</h2>
              <p>
                Dinou projects are authored in modern ES Modules (ESM) with TSX, JSX, and TypeScript. To run these seamlessly in Node's parent CommonJS process without an upfront compile step in development, the server registers <code>@babel/register</code>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/node_modules[\\/](?!dinou)/], // Transpile app files & ejected core files
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/transform-modules-commonjs"],
  extensions: [".js", ".jsx", ".ts", ".tsx"],
});`}</CodeBlock>
              </div>

              <h3>Why is this strictly necessary?</h3>
              <p>
                Without this registration block, the master server process would crash instantly. Node.js has no native capabilities to parse or execute frontend-centric configurations:
              </p>
              <ul>
                <li>
                  <strong>Sintax JSX/TSX:</strong> Node's V8 engine throws a <code>SyntaxError: Unexpected token '&lt;'</code> the moment it encounters a JSX bracket (e.g., <code>&lt;Page /&gt;</code>). Babel compiles JSX into standard, executable <code>React.createElement</code> or <code>_jsx</code> function calls.
                </li>
                <li>
                  <strong>TypeScript Types:</strong> TypeScript types, interfaces, and decorators are not native to JavaScript. `@babel/register` strips TypeScript syntax in memory so the output matches pure ECMAScript.
                </li>
                <li>
                  <strong>ESM-to-CommonJS Conversion:</strong> The ejected server and rendering pipeline are built on CommonJS (<code>require()</code>), whereas client component folders utilize ES Modules (<code>import/export</code>). The <code>@babel/transform-modules-commonjs</code> plugin translates ESM imports into synchronous CommonJS structures in real-time, preventing <code>Cannot use import statement outside a module</code> crashes.
                </li>
                <li>
                  <strong>Zero-Build Developer Experience (JIT Compiler):</strong> By using on-the-fly require hooks instead of compiling the entire backend to a temporary folder, Dinou evaluates updated files immediately. The JIT (Just-In-Time) compilation enables instant page updates on refresh and fuels the Hot Module Replacement (HMR) process.
                </li>
              </ul>

              <h3>Babel Register vs. ESM Loader (Why both exist)</h3>
              <p>
                Dinou employs two distinct JIT compilers to transpile JSX/TypeScript code depending on the execution thread:
              </p>
              <ul>
                <li>
                  <strong><code>@babel/register</code> (CommonJS Scope):</strong> Intercepts imports loaded synchronously via Node's native <code>require()</code>. It compiles the master Express server (<code>server.js</code>) and the child HTML compiler (<code>render-html.js</code>).
                </li>
                <li>
                  <strong><code>babel-esm-loader.js</code> (ESM Scope):</strong> Intercepts dynamic <code>import()</code> calls loaded asynchronously inside Node's native ES Module pipeline. It compiles the React Server Components (RSC) rendering graph. 
                </li>
              </ul>
              <p>
                <strong>The Critical Role of the ESM Loader in RSC:</strong> When executing Server Components, Node loads files natively as ES Modules. If it imports a component marked with <code>"use client"</code>, the ESM Loader intercepts the request, discards the client-only JS body, and registers a client reference stub (via <code>registerClientReference</code>) to map the component onto the Flight stream. This prevents Node from executing browser-specific codes (like <code>useState</code>) that would crash the server.
              </p>

              <h4>What happens if we remove <code>@babel/register</code>?</h4>
              <p>
                Even though Dinou has the <code>babel-esm-loader.js</code> active, removing the <code>@babel/register</code> block would cause the master server process to crash instantly. This is because Node's ESM Loader operates in a separate thread and <strong>has no control over the CommonJS <code>require()</code> pipeline</strong>:
              </p>
              <ul>
                <li>
                  <strong>Extension Resolution Failure:</strong> When <code>server.js</code> attempts to load user page files or parameter validators (such as <code>page_functions.ts</code>), Node's native CommonJS loader will fail to resolve the path because it does not recognize <code>.ts</code>, <code>.tsx</code>, or <code>.jsx</code> extension layouts by default.
                </li>
                <li>
                  <strong>Syntax Crash:</strong> Even if path resolution succeeded, Node's V8 compiler would parse the TSX bracket layouts or TypeScript types as raw JavaScript. This throws immediate syntax errors like <code>SyntaxError: Unexpected token '&lt;'</code> or <code>SyntaxError: Unexpected token ':'</code> and halts the server.
                </li>
                <li>
                  <strong>Child Process Isolation Crash:</strong> The child HTML compiler (<code>render-html.js</code>) is spawned as a CommonJS script. Without <code>@babel/register</code> initialized at startup, it cannot import any of the user's React 19 layout or page components to stream the initial HTML.
                </li>
              </ul>

              <Alert className="my-4 not-prose">
                <Zap className="h-4 w-4 text-amber-500" />
                <AlertTitle>Babel Configuration Tuning</AlertTitle>
                <AlertDescription>
                  If you want to add custom Babel plugins (such as decorators or experimental syntax support), you can append them to this <code>babelRegister</code> object in your ejected server file.
                </AlertDescription>
              </Alert>
            </section>

            <hr className="my-8" />

            {/* 3. ASSETS & STYLES LOADING */}
            <section id="assets-styles">
              <h2>🎨 3. Assets & Styles Loading</h2>
              <p>
                To allow components to import non-JS assets directly, the server installs require extension overrides:
              </p>
              <ul>
                <li>
                  <strong>CSS Modules Hook (<code>css-require-hook.js</code>)</strong>: 
                  Intercepts <code>.css</code> imports, compiles class selectors on-the-fly using <strong>PostCSS</strong>, generates deterministic hashed names via <code>createScopedName.js</code>, and returns a JSON dictionary mapping the original keys to the hashed classnames.
                </li>
                <li>
                  <strong>Asset Loader Hook (<code>asset-require-hook.js</code>)</strong>: 
                  Intercepts media files (using extensions from <code>asset-extensions.js</code>), calculates an asset hash, copies it, and returns the static public URL prefix string (e.g., <code>"/assets/logo.a1b2c3.png"</code>).
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* 4. DEV HMR & CACHE EVICTION */}
            <section id="hmr-engine">
              <h2>🔄 4. Dev HMR & Cache Eviction</h2>
              <p>
                In development, when you edit a React Component, the bundler (Rollup/Esbuild or Webpack) updates the client build and outputs a metadata mapping file called <code>react-client-manifest.json</code>.
              </p>

              <h3>What is the Client Manifest?</h3>
              <p>
                The client manifest is a JSON map generated by the bundler that links absolute source file locations to the compiled public asset assets served to the browser:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="json">{`{
  "file:///C:/Users/.../src/components/Counter.tsx": {
    "id": "/assets/Counter.js",
    "chunks": ["/assets/Counter.js"],
    "name": "Counter"
  }
}`}</CodeBlock>
              </div>

              <h3>Why does the Server Watch the Manifest?</h3>
              <p>
                The server monitors the manifest file for two critical reasons:
              </p>
              <ul>
                <li>
                  <strong>RSC Boundary Detection:</strong> When rendering React Server Components on the server, React Server DOM consults this manifest. If an imported component path exists in the JSON, React knows it is a Client Component (marked with <code>"use client"</code>). React skips executing its JS body in Node.js (preventing crashes from window/state references) and writes a client reference link to the Flight stream.
                </li>
                <li>
                  <strong>HMR Compilation Signalling:</strong> Instead of watching thousands of <code>.tsx</code> files, the server watches the manifest folder. When <code>react-client-manifest.json</code> updates, it serves as a "build complete" signal. The server immediately wakes up to evict outdated modules from Node's cache.
                </li>
              </ul>

              <p>
                However, Node.js permanently caches modules loaded via <code>require()</code>. To ensure the parent server picks up your changes instantly without a process restart, <code>server.js</code> sets up a file watcher using <code>chokidar</code>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function clearRequireCache(modulePath, visited = new Set()) {
  try {
    const resolved = require.resolve(modulePath);
    if (visited.has(resolved)) return;
    visited.add(resolved);

    if (require.cache[resolved]) {
      delete require.cache[resolved]; // Remove from Node's cache

      // Recursively evict parents in src/ to ensure updates cascade upwards
      const parents = getParents(resolved);
      for (const parent of parents) {
        if (parent.startsWith(path.resolve(process.cwd(), "src"))) {
          clearRequireCache(parent, visited);
        }
      }
    }
  } catch (err) {}
}`}</CodeBlock>
              </div>

              <h3>HMR Mechanics & Chokidar's Role:</h3>
              <ol>
                <li>
                  <strong>High-Performance File Watching:</strong> <code>chokidar.watch()</code> is configured to monitor <code>react_client_manifest/</code> (or Webpack's output folder). It triggers the <code>onManifestChange()</code> callback immediately when the bundler finishes compiling changes and writes the updated manifest file to disk.
                </li>
                <li>
                  <strong>Write-Concurrency Guard (Read Retries):</strong> Because Chokidar events can fire while the bundler is still writing bytes to disk (which would result in an empty JSON read error), the server wraps manifest reading inside <code>loadManifestWithRetry()</code> and <code>readJSONWithRetry()</code>. 
                  <ul>
                    <li><code>loadManifestWithRetry()</code>: Bounded to startup, attempting up to 10 reads with 100ms async delays.</li>
                    <li><code>readJSONWithRetry()</code>: Runs during active requests, executing up to 4 fast attempts using <strong><code>Atomics.wait</code></strong> over a SharedArrayBuffer to perform microsecond-level síncrona pauses without clogging the event loop.</li>
                  </ul>
                </li>
                <li>
                  <strong>Dependency Diffing:</strong> When a valid new manifest is loaded, Dinou compares its module keys with the cached <code>currentManifest</code> version. Any added or removed module keys represent boundaries that have shifted from server rendering to client hydration.
                </li>
                <li>
                  <strong>Recursive Node Cache Eviction (<code>clearRequireCache</code>):</strong> Since Node's native module loader permanently caches evaluated JavaScript files in <code>require.cache</code>, subsequent browser requests would read the stale cached values. Dinou solves this by:
                  <ul>
                    <li>Evicting the target file path via <code>delete require.cache[resolvedPath]</code>.</li>
                    <li>
                      <strong>Parent Propagation (HMR Bubbling):</strong> Using a custom helper (<code>getParents()</code>), it scans <code>require.cache</code> to identify all parent modules importing the modified code and sweeps them recursively. The sweep is bounded strictly to modules residing in the project's <code>src/</code> directory for system safety.
                    </li>
                  </ul>
                </li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* 5. CONTEXT STATE & COOKIE INJECTION */}
            <section id="context-wrappers">
              <h2>🛡️ 5. Context State & Cookie Injection</h2>
              <p>
                Dinou links Express request and response scopes to React Server Component trees using Node's <code>AsyncLocalStorage</code> (configured in <code>request-context.js</code>). 
              </p>
              
              <h3>Why does Dinou use three distinct context wrappers?</h3>
              <p>
                A single unified context object cannot satisfy the conflicting networking, security, and process isolation constraints present during a request's lifecycle. Dinou splits request states into three environment-specific containers:
              </p>

              <div className="my-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <th className="px-4 py-2 font-bold text-left">Context Wrapper</th>
                      <th className="px-4 py-2 font-bold text-left">Execution Thread</th>
                      <th className="px-4 py-2 font-bold text-left">Request Phase</th>
                      <th className="px-4 py-2 font-bold text-left">Redirection Method</th>
                      <th className="px-4 py-2 font-bold text-left">Cookie Mutations</th>
                      <th className="px-4 py-2 font-bold text-left">Design Constraint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr>
                      <td className="px-4 py-2 font-semibold"><code>getContext</code></td>
                      <td className="px-4 py-2">Master Server (Express)</td>
                      <td className="px-4 py-2">GET /____rsc_payload (Soft SPA navigation)</td>
                      <td className="px-4 py-2">Intercepts redirect; writes custom <code>x-rsc-redirect</code> header.</td>
                      <td className="px-4 py-2">Writes traditional <code>Set-Cookie</code> headers.</td>
                      <td className="px-4 py-2">Prevents standard 302 redirects from breaking AJAX fetch routers.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold"><code>getContextForServerFunctionEndpoint</code></td>
                      <td className="px-4 py-2">Master Server (Express)</td>
                      <td className="px-4 py-2">POST /____server_function (Server Functions)</td>
                      <td className="px-4 py-2">Throws <code>dinou-internal-redirect</code> to abort execution mid-stream.</td>
                      <td className="px-4 py-2"><strong>Hybrid:</strong> Mid-stream cookie writes append command packets. Blocks <code>HttpOnly</code>.</td>
                      <td className="px-4 py-2">Handles cookie updates and redirection signals inside active Flight stream channels.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold"><code>contextForChild</code></td>
                      <td className="px-4 py-2">Child Render Process (Fork)</td>
                      <td className="px-4 py-2">GET / (Initial load / Hard reload)</td>
                      <td className="px-4 py-2">Blocked (No <code>res</code> object available).</td>
                      <td className="px-4 py-2">Blocked (No <code>res</code> object available).</td>
                      <td className="px-4 py-2">Serializes request headers across IPC. Enforces strict sandbox isolation.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold mb-2">Architectural Flow Mapping:</p>
                <div className="not-prose">
                  <CodeBlock language="text">{`                  ┌───────────────────────────┐
                  │  Client Request Received  │
                  └─────────────┬─────────────┘
                                │
                                ▼
                        [ Request Type? ]
                       /        │        \\
                      /         │         \\
       GET (Soft SPA Nav)       │          POST (Server Function)
            ▼                   │                   ▼
      getContext()              │   getContextForServerFunctionEndpoint()
    (safeResCall Guard)         │                   │
                                │                   ├─► cookie() -> Hybrid Setter
                        GET (Hard Reload)           │   (headers Sent? D:cookie : res.cookie)
                                │                   │
                                ▼                   └─► redirect() -> throw error loop
                         contextForChild
                                │
                                ▼
                       renderAppToHtml()
                     (Child Process Fork)`}</CodeBlock>
                </div>
              </div>

              <p>
                The server provisions request contexts through three distinct wrappers:
              </p>

              <h3>A. Standard Request Context (<code>getContext</code>)</h3>
              <p>
                Executed during standard page requests. This wrapper intercepts calls to Express's native response methods using a custom security guard helper, <code>safeResCall</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const safeResCall = (methodName, ...args) => {
  if (hasRedirected) return;
  
  // 1. Prevent ERR_HTTP_HEADERS_SENT Node.js server crashes
  if (res.headersSent) {
    if (methodName === "redirect" && req.path.includes("____rsc_payload")) return;
    console.log(\`[Dinou] res.\${methodName} called but headers already sent. Ignoring.\`);
    return; // Exit silently
  }

  if (methodName === "redirect") {
    hasRedirected = true;
    let url = args.length === 2 ? args[1] : args[0];
    let status = args.length === 2 ? args[0] : 302;

    // 2. Open-Redirect Vulnerability Filter
    const resolvedUrl = resolveRelativeUrl(url, req.path);
    let finalUrl = "/";
    if (typeof resolvedUrl === "string" && resolvedUrl.startsWith("/") && !resolvedUrl.startsWith("//")) {
      finalUrl = resolvedUrl;
    } else {
      console.warn(\`[Dinou Security] Blocked unsafe redirect to: \${url}\`);
    }

    // 3. RSC Router Redirect Handling
    if (req.path.includes("____rsc_payload")) {
      res.setHeader("x-rsc-redirect", finalUrl);
      res.status(200).end();
      return;
    }

    res.redirect.apply(res, [status, finalUrl]);
    return;
  }
  return res[methodName].apply(res, args);
};

// 4. Return the consolidated mock request/response context
const context = {
  req: {
    cookies: { ...req.cookies },
    headers: {
      "user-agent": req.headers["user-agent"],
      cookie: req.headers["cookie"],
      referer: req.headers["referer"],
      host: req.headers["host"],
      authorization: req.headers["authorization"],
      "accept-language": req.headers["accept-language"],
      "x-forwarded-for": req.headers["x-forwarded-for"],
      forwarded: req.headers["forwarded"],
      "content-type": req.headers["content-type"],
      origin: req.headers["origin"],
    },
    query: { ...req.query },
    path: req.path,
    method: req.method,
  },
  res: {
    status: (code) => safeResCall("status", code),
    setHeader: (name, value) => safeResCall("setHeader", name, value),
    clearCookie: (name, options) => safeResCall("clearCookie", name, options),
    cookie: (name, value, options) => safeResCall("cookie", name, value, options),
    redirect: (...args) => safeResCall("redirect", ...args),
  },
};

return context;`}</CodeBlock>
              </div>
              <ul>
                <li>
                  <strong>Header Protection (Node Anti-Crash Guard):</strong> Writing headers after a response stream has started throws a fatal Node.js exception (<code>ERR_HTTP_HEADERS_SENT</code>) that can crash the server process. The <code>safeResCall</code> helper intercepts response mutations (like <code>cookie</code> or <code>status</code>) and exits silently if headers have already been sent.
                </li>
                <li>
                  <strong>Open-Redirect Mitigation:</strong> Validates target URLs to ensure they are relative paths (starting with a single slash <code>/</code>) and do not contain protocol specifiers, preventing phishing redirects to external host domains.
                </li>
                <li>
                  <strong>RSC Router Sync:</strong> If the client navigates via a soft routing SPA transition (requesting a <code>____rsc_payload</code> path) and a server component triggers a redirect, the server intercepts this redirect. Instead of sending a standard <code>302</code> status code (which the browser's <code>fetch</code> API would follow transparently without updating the client-side SPA route), the server sends the target URL in a custom <code>x-rsc-redirect</code> header and responds with a <code>200 OK</code>.
                </li>
              </ul>

              <hr className="my-6" />

              <h3>B. Server Function Context (<code>getContextForServerFunctionEndpoint</code>)</h3>
              <p>
                Server Functions run inside <code>POST</code> request endpoints, where the server may already be streaming updates back to the browser. Under this setup, Dinou provisions context using a custom endpoint-specific wrapper:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function getContextForServerFunctionEndpoint(req, res) {
  const context = {
    req: {
      cookies: { ...req.cookies },
      headers: {
        "user-agent": req.headers["user-agent"],
        cookie: req.headers["cookie"],
        referer: req.headers["referer"],
        host: req.headers["host"],
        authorization: req.headers["authorization"],
        "accept-language": req.headers["accept-language"],
        "x-forwarded-for": req.headers["x-forwarded-for"],
        forwarded: req.headers["forwarded"],
        "content-type": req.headers["content-type"],
        origin: req.headers["origin"],
      },
      query: { ...req.query },
      path: req.path,
      method: req.method,
    },
    res: {
      redirect: (urlOrStatus, url) => {
        const rawUrl = url || urlOrStatus;
        const referer = req.headers["referer"];
        let refererPath = "/";
        if (referer) {
          try {
            refererPath = new URL(referer).pathname;
          } catch (e) {}
        }
        const resolvedUrl = resolveRelativeUrl(rawUrl, refererPath);
        let finalUrl = "/";
        if (typeof resolvedUrl === "string" && resolvedUrl.startsWith("/") && !resolvedUrl.startsWith("//")) {
          finalUrl = resolvedUrl;
        } else {
          console.warn(\`[Dinou Security] Blocked unsafe server function redirect to: \${rawUrl}\`);
        }
        
        // Throw an exception to halt normal execution and trigger the redirect loop
        throw {
          $$type: "dinou-internal-redirect",
          url: finalUrl,
        };
      },
      status: (code) => {
        if (!res.headersSent) res.status(code);
      },
      setHeader: (n, v) => {
        if (!res.headersSent) res.setHeader(n, v);
      },
      cookie: (name, value, options) => {
        // Scenario A: Headers not sent yet. Use native Express cookie setter.
        if (!res.headersSent) {
          res.setHeader("Content-Type", "text/x-component");
          res.cookie(name, value, options);
          return;
        }

        // Scenario B: Streaming active (Headers already flushed).
        // Block HttpOnly because client-side JavaScript cannot write HttpOnly cookies.
        if (options && options.httpOnly) {
          console.error(\`[Dinou Error] Cannot set HttpOnly cookie '\${name}'... streaming active.\`);
          return;
        }

        // Inject cookie mutation command directly into the active flight stream
        let cookieStr = \`\${name}=\${encodeURIComponent(value)}\`;
        if (options) {
          if (options.path) cookieStr += \`; path=\${options.path}\`;
          if (options.domain) cookieStr += \`; domain=\${options.domain}\`;
          if (options.maxAge) cookieStr += \`; max-age=\${options.maxAge}\`;
          if (options.expires) cookieStr += \`; expires=\${new Date(options.expires).toUTCString()}\`;
          if (options.secure) cookieStr += \`; secure\`;
          if (options.sameSite) cookieStr += \`; samesite=\${options.sameSite}\`;
        }
        res.write(\`D:{"type":"cookie","cookie":\${JSON.stringify(cookieStr)}}\\n\`);
      },
      clearCookie: (name, options) => {
        if (!res.headersSent) {
          res.setHeader("Content-Type", "text/x-component");
          res.clearCookie(name, options);
          return;
        }
        let cookieStr = \`\${name}=; Max-Age=0\`;
        const path = options?.path || "/";
        cookieStr += \`; path=\${path}\`;
        if (options) {
          if (options.domain) cookieStr += \`; domain=\${options.domain}\`;
          if (options.secure) cookieStr += \`; secure\`;
          if (options.sameSite) cookieStr += \`; samesite=\${options.sameSite}\`;
        }
        cookieStr += ";";
        res.write(\`D:{"type":"cookie","cookie":\${JSON.stringify(cookieStr)}}\\n\`);
      }
    }
  };
  return context;
}`}</CodeBlock>
              </div>

              <h4>1. Controlled Redirection & Exception Handling Loop</h4>
              <p>
                Because Server Functions run during POST calls that return streams, a standard HTTP <code>302</code> status cannot be written mid-response. Instead, the <code>res.redirect</code> implementation aborts further execution by throwing a <code>dinou-internal-redirect</code> object:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`redirect: (urlOrStatus, url) => {
  const rawUrl = url || urlOrStatus;
  const resolvedUrl = resolveRelativeUrl(rawUrl, refererPath);
  let finalUrl = resolvedUrl.startsWith("/") ? resolvedUrl : "/";

  // Throw an exception to halt normal execution and trigger the redirect loop
  throw {
    $$type: "dinou-internal-redirect",
    url: finalUrl,
  };
}`}</CodeBlock>
              </div>
              <p>
                This exception is caught directly by the POST handler try-catch block inside <code>POST /____server_function____</code>:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`try {
  result = await requestStorage.run(context, async () => await fn(...args));
} catch (err) {
  if (err && err.$$type === "dinou-internal-redirect") {
    const safeUrl = JSON.stringify(err.url);

    if (!res.headersSent) {
      // Scenario A: Headers not sent yet. Return a direct JSON redirect payload.
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-Dinou-Redirect", err.url);
      return res.status(200).json({ redirect: err.url });
    } else {
      // Scenario B: Headers already sent (active stream).
      // Append a custom redirect instruction to the stream and close the connection.
      res.write(\`D:{"type":"redirect","url":\${safeUrl}}\\n\`);
      res.end();
      return;
    }
  }
  throw err; // bubble up normal exceptions
}`}</CodeBlock>
              </div>

              <h4>2. Hybrid Cookie & Expiration Manager</h4>
              <p>
                The cookie setter implements a dual-mode behavior depending on the connection state:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`cookie: (name, value, options) => {
  // Scenario A: Headers not sent yet. Use native Express cookie setter.
  if (!res.headersSent) {
    res.setHeader("Content-Type", "text/x-component");
    res.cookie(name, value, options);
    return;
  }

  // Scenario B: Streaming active (Headers already flushed).
  // Block HttpOnly because client-side JavaScript cannot write HttpOnly cookies.
  if (options && options.httpOnly) {
    console.error(\`[Dinou Error] Cannot set HttpOnly cookie '\${name}'... streaming active.\`);
    return;
  }

  // Inject cookie mutation command directly into the active flight stream
  let cookieStr = \`\${name}=\${encodeURIComponent(value)}\`;
  if (options) {
    if (options.path) cookieStr += \`; path=\${options.path}\`;
    if (options.domain) cookieStr += \`; domain=\${options.domain}\`;
    if (options.maxAge) cookieStr += \`; max-age=\${options.maxAge}\`;
    if (options.expires) cookieStr += \`; expires=\${new Date(options.expires).toUTCString()}\`;
    if (options.secure) cookieStr += \`; secure\`;
    if (options.sameSite) cookieStr += \`; samesite=\${options.sameSite}\`;
  }
  res.write(\`D:{"type":"cookie","cookie":\${JSON.stringify(cookieStr)}}\\n\`);
}`}</CodeBlock>
              </div>
              
              <p><strong>Cookie Creation Mechanics:</strong></p>
              <ul>
                <li>
                  <strong>Scenario A (Headers not sent):</strong> Utilizes Express's native <code>res.cookie</code> method. It explicitly injects the <code>Content-Type: text/x-component</code> header (which represents React's RSC Flight stream contract) to initialize the network pipe before writing the cookie to the HTTP response header payload.
                </li>
                <li>
                  <strong>Scenario B (Streaming active):</strong> When response headers have already been flushed to the browser, standard HTTP header injection is no longer possible. To bypass this, Dinou manually serializes cookie attributes (including <code>domain</code>, <code>path</code>, <code>secure</code>, and <code>sameSite</code>) into a standard formatted cookie string, wraps it inside a JSON structure, and streams it down the open HTTP channel using <code>res.write()</code>. The browser runtime intercepts this special text packet and writes the cookie programmatically.
                </li>
                <li>
                  <strong>HttpOnly Isolation Security Guard:</strong> Browsers restrict access to <code>HttpOnly</code> cookies to prevent Cross-Site Scripting (XSS) document hijacking. Because Scenario B relies on browser-side JavaScript to parse the stream and write cookies to the document, setting <code>HttpOnly</code> cookies is blocked once streaming starts. Dinou logs a console error to warn developers if this occurs.
                </li>
              </ul>
              
              <p>
                Similarly, clearing cookies dynamically mid-stream uses a custom script injection command with <code>Max-Age=0</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`clearCookie: (name, options) => {
  if (!res.headersSent) {
    res.setHeader("Content-Type", "text/x-component");
    res.clearCookie(name, options);
    return;
  }
  let cookieStr = \`\${name}=; Max-Age=0\`;
  const path = options?.path || "/";
  cookieStr += \`; path=\${path}\`;
  if (options) {
    if (options.domain) cookieStr += \`; domain=\${options.domain}\`;
    if (options.secure) cookieStr += \`; secure\`;
    if (options.sameSite) cookieStr += \`; samesite=\${options.sameSite}\`;
  }
  cookieStr += ";";
  res.write(\`D:{"type":"cookie","cookie":\${JSON.stringify(cookieStr)}}\\n\`);
}`}</CodeBlock>
              </div>

              <p><strong>Cookie Deletion Mechanics:</strong></p>
              <ul>
                <li>
                  <strong>Scenario A (Headers not sent):</strong> Calls Express's native <code>res.clearCookie</code> method, which appends a deletion header instructing the browser to discard the cookie.
                </li>
                <li>
                  <strong>Scenario B (Streaming active):</strong> Because headers cannot be modified mid-stream, Dinou simulates cookie deletion by setting <code>Max-Age=0</code>. This formats a custom cookie command string that forces the cookie to expire immediately, instructing the browser to remove it.
                </li>
              </ul>

              <hr className="my-6" />

              <h3>C. Wildcard Child Context (<code>contextForChild</code>)</h3>
              <p>
                For initial loads or hard refreshes, rendering is delegated to a child thread. Because complex Node.js Express sockets cannot be sent directly over IPC (Inter-Process Communication), Dinou builds a serialized context:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const contextForChild = {
  req: {
    query: { ...req.query },
    cookies: { ...req.cookies },
    headers: {
      "user-agent": req.headers["user-agent"],
      cookie: req.headers["cookie"],
      referer: req.headers["referer"],
      host: req.headers["host"],
      authorization: req.headers["authorization"],
      "accept-language": req.headers["accept-language"],
      "x-forwarded-for": req.headers["x-forwarded-for"],
      forwarded: req.headers["forwarded"],
      "content-type": req.headers["content-type"],
      origin: req.headers["origin"],
    },
    path: req.path,
    method: req.method,
  }
};`}</CodeBlock>
              </div>
              <p>
                This cloned metadata is sent to the child process (<code>render-html.js</code>) during compilation, allowing Server Components to access cookies, authorization headers, and browser user-agents during server rendering.
              </p>
              
              <p>
                This container is passed as an argument to the child process renderer function (<code>renderAppToHtml</code>) inside the wildcard router:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const appHtmlStream = renderAppToHtml(
  reqPath,
  JSON.stringify({ ...req.query }),
  contextForChild, // Cloned context injected here
  res,
  capturedStatus,
  isDynamic,
  isPathBlocked
);`}</CodeBlock>
              </div>
              
              <p>
                <strong>Security Sandboxing & the omission of <code>res</code>:</strong> The response helper (<code>res</code>) is excluded from the child process context. This prevents the child rendering process from modifying cookies, headers, or redirects. All server state mutations are handled by the main server thread, keeping rendering logic decoupled from data mutation endpoints.
              </p>
            </section>

            <hr className="my-8" />

            {/* 6. ROUTING & RSC ENDPOINTS */}
            <section id="routing-endpoints">
              <h2>🚀 6. Routing & RSC Endpoints</h2>
              <p>
                Dinou's core server orchestrates two central endpoints inside <code>core/server.js</code> to handle user routing navigations and trigger Server Actions.
              </p>

              <h3>A. Serving RSC Payloads (<code>serveRSCPayload</code>)</h3>
              <p>
                Triggered on page navigations. In Dinou, the client-side SPA router intercepts link clicks and fetches RSC Flight payloads (React element trees) instead of initiating full HTML page requests. To ensure cache consistency and support Stale-While-Revalidate (SWR) patterns, Dinou exposes five distinct RSC routing endpoints:
              </p>

              <div className="my-6 overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-800 text-xs">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-900">
                      <th className="px-4 py-2 font-bold text-left">Endpoint Route</th>
                      <th className="px-4 py-2 font-bold text-left">serveRSCPayload Flags</th>
                      <th className="px-4 py-2 font-bold text-left">Target Payload</th>
                      <th className="px-4 py-2 font-bold text-left">Caller & Client Role</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                    <tr>
                      <td className="px-4 py-2 font-semibold"><code>/____rsc_payload____/*</code></td>
                      <td className="px-4 py-2"><code>isOld: false</code>, <code>isStatic: false</code></td>
                      <td className="px-4 py-2">Latest cache file (<code>rsc.rsc</code>) or dynamic SSR on-the-fly.</td>
                      <td className="px-4 py-2">Standard client-side SPA router. Resolves pages during routing transitions.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold"><code>/____rsc_payload_old____/*</code></td>
                      <td className="px-4 py-2"><code>isOld: true</code>, <code>isStatic: false</code></td>
                      <td className="px-4 py-2">Fallback cache file (<code>rsc._old.rsc</code>) or dynamic SSR.</td>
                      <td className="px-4 py-2">Client hydration router. Triggered if a page is regenerating in background to match the old HTML.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold"><code>/____rsc_payload_static____/*</code></td>
                      <td className="px-4 py-2"><code>isOld: false</code>, <code>isStatic: true</code></td>
                      <td className="px-4 py-2">Only cached static assets (<code>rsc.rsc</code>). Dynamic rendering is blocked.</td>
                      <td className="px-4 py-2">Client-side router. Fetches static files directly without triggering server-side compilers.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold"><code>/____rsc_payload_old_static____/*</code></td>
                      <td className="px-4 py-2"><code>isOld: true</code>, <code>isStatic: true</code></td>
                      <td className="px-4 py-2">Only cached backup assets (<code>rsc._old.rsc</code>). Dynamic rendering is blocked.</td>
                      <td className="px-4 py-2">Client-side router. Fetches old static backup assets directly during active background builds.</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 font-semibold"><code>/____rsc_payload_error____/*</code> (POST)</td>
                      <td className="px-4 py-2"><em>Not processed via serveRSCPayload</em></td>
                      <td className="px-4 py-2">Error boundary view stream (<code>getErrorJSX</code>).</td>
                      <td className="px-4 py-2">Client-side router. Invoked when client-side React rendering fails, returning an error UI stream.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold mb-2">RSC Payload Execution Mapping:</p>
                <div className="not-prose">
                  <CodeBlock language="text">{`           [ Client Router Request ]
                       │
                       ▼
             [ Choose RSC Route? ]
            /          │          \\
           /           │           \\
    /____rsc_payload____       /____rsc_payload_static____
          │                         │
          ▼                         ▼
   isOld = false             isOld = false
   isStatic = false          isStatic = true
          │                         │
          ▼                         ▼
  serveRSCPayload(..., isOld, isStatic)
          │
          ├────────► [ isStatic == true? ]
          │                  │
          │                  ▼
          │         [ Only read disk cache ]
          │         ├─► useOld ? rsc._old.rsc
          │         └─► else   ? rsc.rsc
          │         (No file? 403 Forbidden/Block)
          │
          └────────► [ isStatic == false? ]
                             │
                             ▼
                    [ SSG/ISR Cache exists? ]
                     /                    \\
                    /                      \\
                  Yes                       No
                  ▼                         ▼
        [ check useOld logic ]        [ Dynamic SSR Pipeline ]
        ├─► isOld == true?             ├─► validateParams()
        ├─► regenerating?              ├─► getJSX()
        ├─► buildId mismatch?          └─► renderToPipeableStream()
        │     │
        │     ├─► Yes: rsc._old.rsc
        │     └─► No:  rsc.rsc
        ▼
   [ Stream: application/octet-stream ]`}</CodeBlock>
                </div>
              </div>

              <h4>How <code>serveRSCPayload</code> executes parameters:</h4>
              <p>
                The <code>serveRSCPayload</code> function uses the <code>isOld</code> and <code>isStatic</code> flags to compute the target file path and restrict rendering paths:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`async function serveRSCPayload(req, res, isOld = false, isStatic = false) {
  try {
    // 1. Strip the matching routing prefix from req.path to resolve the raw route path
    const reqPath = (
      req.path.endsWith("/") ? req.path : req.path + "/"
    ).replace(
      isOld
        ? isStatic
          ? "/____rsc_payload_old_static____"
          : "/____rsc_payload_old____"
        : isStatic
          ? "/____rsc_payload_static____"
          : "/____rsc_payload____",
      "",
    );

    // 2. Serve static cached file if path is not dynamic or if static only is requested
    if ((!isDevelopment && !dynamicState.value) || isStatic) {
      let currentGeneratedAt = null;
      try {
        const metadataPath = path.join("dist2", reqPath, "metadata.json");
        if (existsSync(metadataPath)) {
          const metaObj = JSON.parse(readFileSync(metadataPath, "utf8"));
          currentGeneratedAt = metaObj.generatedAt || null;
        }
      } catch (e) {}

      // Fallback triggers for Stale-While-Revalidate:
      const useOld =
        isOld ||
        regenerating.has(reqPath) ||
        (req.query.buildId &&
          currentGeneratedAt &&
          req.query.buildId !== String(currentGeneratedAt));

      // Resolve the target payload file name
      const payloadPath = path.resolve(
        "dist2",
        reqPath.replace(/^\//, ""),
        useOld ? "rsc._old.rsc" : "rsc.rsc",
      );
      
      // Serve file sychronously...
    }
  }
}`}</CodeBlock>
              </div>

              <h4>1. Pre-compiled Static Cache (SSG / ISR)</h4>
              <p>
                If a route is static (or not flagged as dynamic), the server attempts to load cached files from the <code>dist2/</code> folder:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const useOld =
  isOld ||
  regenerating.has(reqPath) ||
  (req.query.buildId &&
    currentGeneratedAt &&
    req.query.buildId !== String(currentGeneratedAt));

const payloadPath = path.resolve(
  "dist2",
  reqPath.replace(/^\//, ""),
  useOld ? "rsc._old.rsc" : "rsc.rsc"
);`}</CodeBlock>
              </div>
              <p>
                <strong>Stale-While-Revalidate Fallback:</strong> If the requested build ID does not match the generated date, or if a background compilation task is already running (<code>regenerating.has(reqPath)</code>), the server automatically streams the backup file (<code>rsc._old.rsc</code>) to prevent blocking the client.
              </p>

              <h4>2. Parameter & Route Validation</h4>
              <p>
                For dynamic pages, the server imports the route configuration module (<code>page_functions</code>) to validate parameters before rendering:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`if (validateParamsFn) {
  const isValid = await validateParamsFn(dynamicParams);
  if (!isValid) isPathBlocked = true; // Returns 404
}

if (!isPathBlocked && allowISGValue === false) {
  // Check if current dynamic route exists inside getStaticPaths() whitelist
  const isPathAllowed = staticPathsSet.has(serializedQuery);
  if (!isPathAllowed) isPathBlocked = true;
}`}</CodeBlock>
              </div>

              <h4>3. Dynamic RSC Serialization</h4>
              <p>
                If the route is valid, the server runs the request inside the async storage context and streams the RSC Flight payload using React's <code>renderToPipeableStream</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`await requestStorage.run(context, async () => {
  const jsx = await getJSX(reqPath, { ...req.query }, isNotFound, isDevelopment, isPathBlocked);
  const manifest = isDevelopment ? loadManifestFromDisk() : cachedClientManifest;
  const { pipe } = renderToPipeableStream(jsx, manifest);
  pipe(res); // Stream Flight binary stream directly to client
});`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>B. Executing Error Payloads (<code>POST /____rsc_payload_error____</code>)</h3>
              <p>
                Unlike standard rendering paths, the error endpoint is a <code>POST</code> route that does not invoke <code>serveRSCPayload</code>. Instead, it acts as an asynchronous Error Boundary renderer.
              </p>
              
              <h4>1. Rationale & Client Calling Flow</h4>
              <p>
                When a runtime exception occurs in client-side React code during dynamic routing or hydration, the browser's SPA runtime catches the exception. To prevent a blank screen, it posts the serialized exception stack back to the server:
              </p>
              <ul>
                <li><strong>Trigger:</strong> React Client Error Boundary catching a render crash.</li>
                <li><strong>Destination:</strong> <code>POST /____rsc_payload_error____/[route]</code> with a body of <code>{'{ error: { message, stack, name } }'}</code>.</li>
                <li><strong>Output:</strong> A binary Flight stream representing the error visual fallback tree (which renders local <code>error.tsx</code> templates if defined).</li>
              </ul>

              <div className="my-6">
                <p className="text-sm font-semibold mb-2">Error Boundary Payload Mapping:</p>
                <div className="not-prose">
                  <CodeBlock language="text">{`           [ React Client-Side Component ]
                         │
                         ▼ (Render Exception Caught!)
           [ Dinou Client Error Boundary ]
                         │
                         ▼ (Serialize error trace: stack, message)
             POST /____rsc_payload_error____/[route]
                         │
                         ▼
             [ Master Server Express POST ]
                         │
                         ▼
                 getContext(req, res)
                         │
                         ▼
              requestStorage.run(context)
                         │
                         ▼
               [ getErrorJSX(reqPath) ]
             Searches local directory tree
             for the closest "error.tsx"
                         │
                         ▼
           [ React 19 renderToPipeableStream ]
             Serializes error JSX using the
             client-side assets manifest
                         │
                         ▼
           [ binary text/x-component stream ]
                         │
                         ▼
            [ Hydrate Fallback UI in Browser ]`}</CodeBlock>
                </div>
              </div>

              <h4>2. Server-Side Execution Handler</h4>
              <p>
                The server intercepts the error, runs it inside the AsyncLocalStorage request scope, and compiles the fallback layout using <code>getErrorJSX</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`app.post(/^\/____rsc_payload_error____\/.*\/?$/, async (req, res) => {
  try {
    // 1. Strip routing prefix to isolate page path
    const reqPath = (
      req.path.endsWith("/") ? req.path : req.path + "/"
    ).replace("/____rsc_payload_error____", "");

    const context = getContext(req, res);
    await requestStorage.run(context, async () => {
      // 2. Resolve error JSX layout (searching for error.tsx templates)
      const jsx = await getErrorJSX(
        reqPath,
        { ...req.query },
        req.body.error,
        isDevelopment,
      );
      
      // 3. Serialize and stream error tree using React 19 pipeable streams
      const manifest = isDevelopment ? loadManifestFromDisk() : cachedClientManifest;
      const { pipe } = isWebpack
        ? renderToPipeableStream(jsx, manifest)
        : renderToPipeableStream(jsx, pathToFileURL(process.cwd()).href + "/");
      pipe(res);
    });
  } catch (error) {
    console.error("Error rendering RSC:", error);
    res.status(500).send("Internal Server Error");
  }
});`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>C. Wildcard Initial Load Handler (<code>app.get(/^\/.*\/?$/)</code>)</h3>
              <p>
                This regex wildcard endpoint captures all standard browser GET requests (such as entering a URL directly or performing a hard refresh). Since these requests expect a fully rendered HTML page instead of an RSC Flight stream, the server handles them differently:
              </p>

              <div className="my-6">
                <p className="text-sm font-semibold mb-2">Wildcard Load Execution Mapping:</p>
                <div className="not-prose">
                  <CodeBlock language="text">{`           [ Browser GET /path ] (Initial Load / Refresh)
                         │
                         ▼
           [ Match Wildcard app.get("*") ]
                         │
                         ▼
            [ Route Parameter Validation ]
            ├─► validateParams()
            └─► allowISG check
                         │
                         ▼
        [ Production, Static, Valid & HTML exists? ]
           /                                   \\
          /                                     \\
        Yes                                      No
        ▼                                        ▼
 [ Serve HTML Cache ]                  [ Dynamic SSR Pipeline ]
 ├─► Read index.html or                ├─► contextForChild
 │   index._old.html                   ├─► processLimiter.run()
 │                                     │   (Concurrency Guard)
 ├─► Inject Header Scripts:            ▼
 │   ├─► __DINOU_USE_STATIC__ = true   ├─► renderAppToHtml()
 │   ├─► __DINOU_USE_OLD_RSC__ = true  │   (Fork Subprocess SSR)
 │   └─► __DINOU_BUILD_ID__ = buildId  │
 │                                     ├─► Stream HTML response
 ├─► res.statusCode = status           │
 └─► res.send(html)                    ▼
                                       res.on("finish")
                                       └─► generatingISG()
                                           (Background Cache Build)`}</CodeBlock>
                </div>
              </div>

              <h4>1. The Cache Gatekeeper Condition (All four flags required)</h4>
              <p>
                Before checking for the physical file on disk, the server checks a composite logical gatekeeper:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`if (!isDevelopment && !dynamicState.value && pagePath && !isPathBlocked)`}</CodeBlock>
              </div>
              <p>
                Each flag is necessary to ensure correct rendering behavior and prevent security or layout bugs:
              </p>
              <ul>
                <li>
                  <strong><code>!isDevelopment</code>:</strong> In local development, the user edits files in real-time. If the server served cached static HTML files, changes to React JSX wouldn't be reflected without rebuilds. Disabling caching in development ensures dynamic compilation is triggered on every reload.
                </li>
                <li>
                  <strong><code>!dynamicState.value</code>:</strong> Differentiates static/ISR pages from dynamic routes. Dynamic routes require fresh headers, cookies, or search parameters and cannot be cached as static index.html pages. Serving a static file here would bypass dynamic session state logic.
                </li>
                <li>
                  <strong><code>pagePath</code>:</strong> Confirms that the incoming request URL matches an actual React Server Component page file (e.g., <code>page.tsx</code>) in the <code>src/</code> directory. If missing (like for missing files or static routes without matching page files), caching is skipped to prevent serving index pages for 404 responses.
                </li>
                <li>
                  <strong><code>!isPathBlocked</code>:</strong> Set by route-parameter validators (<code>validateParams</code>). If a user requests a page with invalid parameters and the validator blocks the route, bypassing this flag could serve static cached page structures to unauthorized users instead of returning a 404.
                </li>
              </ul>

              <hr className="my-6" />

              <h4>2. Pre-rendered HTML Cache & Hydration Hooks</h4>
              <p>
                If all four gatekeeper flags pass, the server reads the index page from the <code>dist2/</code> folder:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const fileToRead = htmlPathOld || htmlPath;
if (existsSync(fileToRead) && !dynamicState.value) {
  res.setHeader("Content-Type", "text/html");
  let htmlContent = readFileSync(fileToRead, "utf8");
  
  // Inject browser flags to direct SPA hydration
  let scripts = \`<script>window.__DINOU_USE_STATIC__=true;</script>\`;
  if (htmlPathOld) {
    scripts += \`<script>window.__DINOU_USE_OLD_RSC__=true;</script>\`;
  }
  if (buildId) {
    scripts += \`<script>window.__DINOU_BUILD_ID__="\${buildId}";</script>\`;
  }
  
  htmlContent = htmlContent.replace("</head>", \`\${scripts}</head>\`);
  return res.send(htmlContent);
}`}</CodeBlock>
              </div>
              <p>
                <strong>Hydration Script Injection:</strong> Before sending the cached HTML file, the server injects script tags into the <code>&lt;head&gt;</code> to configure hydration options:
              </p>
              <ul>
                <li><code>window.__DINOU_USE_STATIC__ = true</code>: Instructs the client-side SPA router to retrieve its initial Flight payload from pre-built static files instead of initiating dynamic SSR requests.</li>
                <li><code>window.__DINOU_USE_OLD_RSC__ = true</code>: During background ISR compilations, this directs the client to load the corresponding backup payload (<code>rsc._old.rsc</code>) to prevent cache mismatch errors.</li>
                <li><code>window.__DINOU_BUILD_ID__ = buildId</code>: Syncs active build version timestamps to prevent runtime caching inconsistencies between the browser and server.</li>
              </ul>

              <hr className="my-6" />

              <h4>3. Dynamic SSR Pipeline with Concurrency Limiter</h4>
              <p>
                If the page is dynamic, not yet cached, or fails the gatekeeper checks, the server performs dynamic Server-Side Rendering (SSR). This rendering is managed by a process limiter:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`processLimiter.run(async () => {
  const appHtmlStream = renderAppToHtml(reqPath, JSON.stringify({ ...req.query }), contextForChild, res);
  res.setHeader("Content-Type", "text/html");
  appHtmlStream.pipe(res);

  // Background Cache Build (Fire and Forget)
  res.on("finish", () => {
    if (!isDevelopment && res.statusCode === 200 && req.method === "GET" && isReady) {
      generatingISG(reqPath, dynamicState); // Recompile page in background
    }
  });

  // Concurrency Slot Release Hook
  await new Promise((resolve) => {
    appHtmlStream.on("end", resolve);
    appHtmlStream.on("error", (error) => {
      console.error("Stream error:", error);
      if (!res.headersSent) res.status(500).send("Internal Server Error");
      resolve();
    });
    res.on("close", resolve); // Release slot if user cancels request or closes tab
  });
});`}</CodeBlock>
              </div>
              <ul>
                <li>
                  <strong>Process Limiter Slot Release Hook:</strong> The process limiter restricts concurrent page rendering requests to protect CPU resources. To prevent resource leaks, the wrapper holds the concurrency slot active using a Promise. It resolves and releases the slot only when the stream ends (<code>end</code>), encounters an error (<code>error</code>), or the client cancels the connection (<code>close</code>).
                </li>
                <li>
                  <strong>Background ISG Generation:</strong> When the response stream completes (<code>res.on("finish")</code>), if the request was successful, the server starts a background compilation task (<code>generatingISG()</code>) to render and cache the page on disk for subsequent visits.
                </li>
              </ul>

              <hr className="my-6" />

              <h3>D. Executing Server Functions (<code>POST /____server_function____</code>)</h3>
              <p>
                This endpoint processes client-side Server Functions. It includes built-in security features to protect server endpoints:
              </p>

              <h4>1. Origin & Anti-CSRF Verification</h4>
              <p>
                The server inspects header values to verify that request sources match host domains, and validates custom headers to prevent cross-site request forgery:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`if (!isDevelopment && origin && !origin.includes(host)) {
  return res.status(403).json({ error: "Invalid Origin" });
}
if (req.headers["x-server-function-call"] !== "1") {
  return res.status(403).json({ error: "Missing security header" });
}`}</CodeBlock>
              </div>

              <h4>2. Path Resolution & Directory Guard Verification</h4>
              <p>
                To handle requests from multiple operating systems and protect the file system, Dinou executes a strict path normalization and sandbox resolution pipeline inside the POST route:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`let relativePath;

// A. Check if the URL is a relative reference (e.g. file:///src/...)
// If so, extract it directly without using fileURLToPath (which throws on Windows without a drive letter)
const isRelativeSrc = fileUrl.startsWith("file:///src/") || fileUrl.startsWith("file:///src\\");

if (isRelativeSrc) {
  relativePath = fileUrl.replace(/^file:\/\/\/?/, "").trim();
} else {
  // B. Convert absolute file:// URIs to localized system path formats
  const resolvedPath = fileURLToPath(fileUrl);
  relativePath = resolvedPath;

  const normalizedCwd = normalizePathCase(process.cwd());
  const normalizedResolved = normalizePathCase(resolvedPath);

  if (normalizedResolved.startsWith(normalizedCwd)) {
    relativePath = path.relative(normalizedCwd, normalizedResolved);
  } else {
    relativePath = relativePath.replace(/^[\\/]+/, "");
  }
}

// C. Anti-Directory-Traversal Guard Check
const normalizedRelative = relativePath.replace(/\\/g, "/");
if (
  normalizedRelative.startsWith("/") ||
  normalizedRelative.includes("..") ||
  normalizedRelative.includes(":")
) {
  return res
    .status(400)
    .json({ error: "Invalid path: no absolute, traversal, or drive letter allowed" });
}

// D. Restrict to 'src/' folder: prepend 'src/' if missing, and resolve absolutePath
if (!relativePath.startsWith("src/") && !relativePath.startsWith("src\\")) {
  relativePath = path.join("src", relativePath);
}
const absolutePath = path.resolve(process.cwd(), relativePath);

// E. Verify that absolutePath is strictly inside 'src/'
const srcDir = path.resolve(process.cwd(), "src");
if (!absolutePath.startsWith(srcDir + path.sep)) {
  return res.status(403).json({ error: "Access denied: file outside src directory" });
}`}</CodeBlock>
              </div>

              <p><strong>Mechanics & Rationale:</strong></p>
              <ul>
                <li>
                  <strong>Windows <code>fileURLToPath</code> Bypass (A & B):</strong> Native Node.js <code>fileURLToPath</code> throws a fatal error on Windows (<code>TypeError: Unique drive letter expected</code>) when parsed with relative URIs like <code>file:///src/...</code>. Dinou bypasses this by matching <code>isRelativeSrc</code> and manually scraping the <code>file://</code> protocol prefix to yield a clean path.
                </li>
                <li>
                  <strong>Path Case Normalization:</strong> Operating systems handle drive letters differently (e.g. <code>c:\</code> vs <code>C:\</code>). Dinou runs <code>normalizePathCase</code> over paths to prevent compilation mismatches in Windows.
                </li>
                <li>
                  <strong>Anti-Directory-Traversal Guard (C):</strong> Verifies that the path does not start with root slashes, does not contain drive colons (<code>:</code>), and does not include dot-dot sequences (<code>..</code>) to block path traversal attempts.
                </li>
                <li>
                  <strong>Sandbox Enforcement (D & E):</strong> Pre-pends the <code>src/</code> directory and verifies that the resolved path points strictly inside the project's source directory, returning <code>403 Forbidden</code> if it attempts to point to external folders.
                </li>
              </ul>

              <p>
                In production, the server validates the action ID against the whitelist manifest generated during the build step:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`allowedExports = serverFunctionsManifest[normalizedRelative.replace(/\\\\/g, "/")];
if (!allowedExports || !allowedExports.includes(exportName)) {
  return res.status(400).json({ error: "Invalid export name" });
}`}</CodeBlock>
              </div>

              <h4>3. Dynamic Import & Execution Pipeline</h4>
              <p>
                If the server function is verified, the server dynamically imports the target code module and isolates the target function (either default or named export) before executing it:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// Dynamically load target module
const mod = await importModule(absolutePath);
const fn = exportName === "default" ? mod.default : mod[exportName];

if (typeof fn !== "function") {
  return res.status(400).json({ error: "Export is not a function" });
}

// Execute function inside requestStorage context
try {
  result = await requestStorage.run(context, async () => await fn(...args));
} catch (err) {
  if (err && err.$$type === "dinou-internal-redirect") {
    if (!res.headersSent) {
      // Scenario A: Headers not sent yet. Return a direct JSON redirect payload.
      res.setHeader("Content-Type", "application/json");
      res.setHeader("X-Dinou-Redirect", err.url);
      return res.json({ redirect: err.url });
    } else {
      // Scenario B: Headers already sent (active stream).
      // Append a custom redirect instruction to the stream and close the connection.
      res.write(\`D:{"type":"redirect","url":\${JSON.stringify(err.url)}}\\n\`);
      res.end();
      return;
    }
  }
  throw err; // bubble up other exceptions
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* 7. BOT MITIGATION SHIELD */}
            <section id="security-features">
              <h2>🛡️ 7. Bot Mitigation Shield</h2>
              <p>
                Dinou features an embedded request shield. Dynamic static generation (ISG/ISR) forks child compilation processes which consumes server resources. Bots probing for common exploits (e.g., searching for PHP pages or env files) can cause unnecessary CPU spikes.
              </p>
              <p>
                To protect your server, <code>server.js</code> tests requests against a bot list:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const botGarbagePatterns = [
  /\.php$/i,
  /\.env$/i,
  /\.git\b/i,
  /wp-admin/i,
  /\.sql$/i,
];

app.use((req, res, next) => {
  const isGarbage = botGarbagePatterns.some((pattern) => pattern.test(req.path));
  if (isGarbage) {
    return res.status(404).send("Not Found"); // Deny instantly
  }
  next();
});`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* 8. SERVER STARTUP SEQUENCE */}
            <section id="startup-sequence">
              <h2>🏁 8. Server Startup Sequence</h2>
              <p>
                At the very end of <code>server.js</code>, an asynchronous self-executing function <code>(async () =&gt; &#123; ... &#125;)()</code> coordinates the HTTP socket bindings and background static compilations:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const http = require("http");

(async () => {
  try {
    const server = http.createServer(app);

    // 1. Anti-Zombie Port Safety Check
    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        console.error(\`\\n❌ FATAL ERROR: Port \${port} is already in use!\`);
      } else {
        console.error("❌ [Server Error]:", error);
      }
      process.exit(1);
    });

    // 2. Open HTTP Listener Sockets
    await new Promise((resolve) => {
      server.listen(port, () => {
        console.log(\`\\n🚀 Dinou Server is ready on http://localhost:\${port}\`);
        resolve();
      });
    });

    // 3. Environment Specific Tasks
    if (!isDevelopment) {
      generateStatic()
        .then(() => {
          isReady = true; // Mark as ready after SSG compilation succeeds
        })
        .catch((err) => {
          isReady = true; // Fallback to dynamic execution
        });
    }
  } catch (error) {
    process.exit(1);
  }
})();`}</CodeBlock>
              </div>

              <h3>The Architectural Role of the <code>isReady</code> State</h3>
              <p>
                Dinou declares a global lifecycle boolean <code>let isReady = isDevelopment;</code>. Although it might seem unused at first glance, it serves two critical purposes:
              </p>
              <ul>
                <li>
                  <strong>Preventing Disk File System Contention (ISG vs SSG):</strong> In production (<code>!isDevelopment</code>), the server fires <code>generateStatic()</code> at startup to pre-build all static pages to disk. If an incoming client requests a dynamic route that triggers Incremental Static Generation (ISG/ISR) at the same time, Node.js would attempt to write, rename, and rewrite those same static files in parallel. 
                  <br />
                  To prevent EBUSY/EPERM file locking conflicts on disk, <code>isReady</code> acts as a gatekeeper. By remaining <code>false</code> during the initial build, Dinou disables background revalidations (ISG) on matching wildcard GET routes until the initial compilation completes.
                </li>
                <li>
                  <strong>Testing Integration & Ready Signaling:</strong> Dinou exposes a diagnostic endpoint: <code>/__DINOU_STATUS_PLAYWRIGHT__</code>. Automated testing runners (such as Playwright) need a reliable signal to know when the server has finished its initial compilation before launching E2E UI tests. The endpoint queries:
                  <br />
                  <code>isReady: isDevelopment ? isManifestReady() : isReady</code>
                  <br />
                  It returns a status response containing <code>isReady: true</code> only when all static components and client manifests have been written successfully.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CUSTOMIZATION INSTRUCTIONS */}
            <section>
              <h2>🛠️ Common Customization Recipes</h2>
              <p>
                Here are a few common ways developers modify this file after ejecting:
              </p>
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 space-y-3 not-prose text-sm">
                <div>
                  <strong>1. Adding Express Middleware:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can install standard Express middleware (such as <code>helmet</code> or <code>cors</code>) and register them directly with <code>app.use()</code>.
                  </p>
                </div>
                <div>
                  <strong>2. Implementing Custom Server Routes:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    Add standard Express API endpoints (e.g., <code>app.get("/api/health", ...)</code>) before the wildcard RSC route handler.
                  </p>
                </div>
                <div>
                  <strong>3. Altering File Extension Loaders:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    Extend <code>asset-extensions.js</code> or add custom require overrides to compile alternative styles or templates on-the-fly.
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
