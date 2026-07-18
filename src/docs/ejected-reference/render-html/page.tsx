"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Terminal, RefreshCw, Cpu, Layers, MessageSquareWarning, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "architecture", title: "🔄 The Two-Process SSR Pipeline", level: 2 },
  { id: "render-app-parent", title: "⚡ Parent Handler: render-app-to-html.js", level: 2 },
  { id: "render-html-child", title: "⚙️ Child Process: render-html.js", level: 2 },
  { id: "customizations", title: "🛠️ Common Tweak Recipes", level: 2 },
];

const PIPELINE_DIAGRAM = ` [Express Server.js] ───────────────► Calling renderAppToHtml()
        │                                     │
        │                                     ▼ [Forking Child Process]
        │                            [render-app-to-html.js] (Parent Environment)
        │                                     │
        │                                     ├─► 1. Evaluates React Server graph
        │                                     ├─► 2. Generates RSC Flight JSON binary
        │                                     │
        ▼ [Piping RSC Flight Stream via fd:4] │
  ┌───────────────────────────────────────────┼───────────────────────────┐
  │ [render-html.js] (Child Process Environment - Standard Client React)   │
  │                                           │                           │
  │   a. Reads flight stream from fd:4 ◄──────┘                           │
  │   b. Reconstructs client-safe JSX via createFromNodeStream()          │
  │   c. Performs React 19 SSR via renderToPipeableStream()               │
  │   d. Writes final HTML chunks to stdout                               │
  └───────────────────┬───────────────────────────────────────────────────┘
                      │
                      ▼ [Piped stdout chunks]
                [Express res] ────────► Browser (HTML Response)`;

const PARENT_STRUCTURE_DIAGRAM = `========================================================================================================
                          PHYSICAL FILE CODE STRUCTURE: RENDER-APP-TO-HTML.JS
========================================================================================================

  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  1. Dependencies & Module Imports                                                                │
  │     • child_process (fork), fs, path, url, status-manifest, concurrency-manager (processLimiter) │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  2. Global Helper Functions                                                                      │
  │                                                                                                  │
  │     ├── getManifest()                                                                            │
  │     │   • síncronamente reads & parses client manifest files for module IDs resolution            │
  │     │                                                                                            │
  │     └── toFileUrl(p)                                                                             │
  │         • Converts local absolute system paths to absolute 'file://' format strings              │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  3. createParentResponseWrapper(reqPath, res, child)                                             │
  │     • Constructs the IPC command listener wrapper                                                │
  │     • Listens to "message" commands from the child renderer (e.g. cookies or redirects)           │
  │     • If headersSent: writes direct inline <script> modifications into the output stream chunk   │
  │     • If headersClean: triggers native Express methods (res.cookie / res.redirect)               │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  4. Main Export: renderAppToHtml(reqPath, reqQuery, context, isReady, res, options)              │
  │     • Resolves render-html.js filepath & checks output cache (dist2/rsc.rsc)                     │
  │     • Sets up temporary file descriptor fd 4                                                     │
  │     • IF CACHED:                                                                                 │
  │         • Pipes compiled static dist2/rsc.rsc directly into fd 4                                 │
  │     • IF DYNAMIC:                                                                                │
  │         • Renders Server Components (RSC) to binary Flight payload stream                       │
  │         • Writes stream concurrently into fd 4                                                   │
  │     • Spawns the child process renderer: fork(renderHtmlPath, [args], { stdio: [..., fd:4] })    │
  │     • Sets up IPC message listener: child.on("message", createParentResponseWrapper)             │
  │     • Limits concurrent renders: processLimiter.acquire()                                        │
  │     • Streams output: child.stdout.pipe(res)                                                     │
  └──────────────────────────────────────────────────────────────────────────────────────────────────┘`;

const CHILD_SPAWNING_CODE = `const child = fork(
  renderHtmlPath,
  [
    reqPath,
    paramsString,
    contextForChild ? JSON.stringify(contextForChild) : JSON.stringify({}),
    isDynamic ? "true" : "false",
  ],
  {
    execArgv: cleanExecArgv,
    stdio: ["inherit", "pipe", "inherit", "ipc", rscReadFd],
  }
);`;

const RSC_CACHE_BYPASS_CODE = `const rscPath = path.resolve(process.cwd(), "dist2", reqPath.replace(/^\\//, ""), "rsc.rsc");
const hasStaticRsc = !isDynamic && fs.existsSync(rscPath);

if (hasStaticRsc) {
  const rscBuffer = fs.readFileSync(rscPath);
  child.stdio[4].write(rscBuffer); // Inject cached RSC payload directly
  child.stdio[4].end();
} else {
  // Fallback to dynamic SSR compilation using getJSX and React 19 server package
  requestStorage.run(context, () => {
    getJSX(reqPath, query, isNotFound, isDevelopment, forceNotFound)
      .then((jsx) => {
        const manifest = getManifest();
        const { pipe } = renderToPipeableStream(jsx, manifest);
        pipe(child.stdio[4]); // Pipe generated Flight stream to child
      });
  });
}`;

const PARENT_RESPONSE_WRAPPER_CODE = `function createParentResponseWrapper(reqPath, res, child) {
  return {
    setHeader: (name, value) => {
      if (!res.headersSent) res.setHeader(name, value);
    },
    cookie: (name, value, options) => {
      if (res.headersSent) {
        // Fallback to streaming inline JS mutations if headers are flushed
        if (options && options.httpOnly) return;
        const cookieStr = constructCookieString(name, value, options);
        res.write(\`<script>document.cookie = \${JSON.stringify(cookieStr)};</script>\`);
      } else {
        res.cookie(name, value, options);
      }
    },
    redirect: (arg1, arg2) => {
      const url = arg2 || arg1;
      safeRedirect(url); // Triggers standard 302 or inlines window.location.href script
    }
  };
}`;

const RESPONSE_PROXY_CODE = `const responseProxy = createResponseProxy(reqPath, res, child);
child.on("message", (message) => {
  if (message && typeof message === "object" && message.type === "res_call") {
    const { command, args } = message;
    
    // Scenario 1: Headers already sent
    if (res.headersSent) {
      if (command === "redirect") {
        const target = args.length === 1 ? args[0] : args[1];
        const resolved = resolveRelativeUrl(target, reqPath);
        res.write(\`<script>window.location.href = \${JSON.stringify(resolved)};</script>\`);
        res.end();
        child.kill(); // Terminate renderer immediately
        return;
      }
      if (command === "cookie") {
        const [name, value, options] = args;
        if (options?.httpOnly) return; // Blocked: JS cannot write HttpOnly
        const cookieStr = constructCookieString(name, value, options);
        res.write(\`<script>document.cookie = \${JSON.stringify(cookieStr)};</script>\`);
        return;
      }
    }
    
    // Scenario 2: Headers not yet sent
    if (typeof res[command] === "function") {
      res[command].apply(res, args); // Execute native Express response methods
    }
  }
});`;

const IPC_FLOW_DIAGRAM = `         [ Master Express Server ]                   [ Child Process (render-html) ]
                     │                                              │
                     ├────────► Fork child process ────────────────►│
                     │                                              │
       Check Cache   ├─► (Exists) -> Read dist2/rsc.rsc             │
                     │   (Missing)-> compile JSX to Flight          │
                     │                                              │
                     ├────────► Pipe Flight data (fd 4) ───────────►│ (createFromNodeStream)
                     │                                              │
                     │◄──────── stream HTML chunks (stdout) ────────┤ (renderToPipeableStream)
                     │                                              │
      Child calls    │                                              │
    res.cookie/redir │◄──────── IPC command message ────────────────┤ (send message)
                     │                                              │
                     ├─► (Headers Sent?)                            │
                     │   ├─► Yes: write <script> cookie/redirect    │
                     │   └─► No : call native Express headers       │`;

const CHILD_STRUCTURE_DIAGRAM = `========================================================================================================
                             PHYSICAL FILE CODE STRUCTURE: RENDER-HTML.JS
========================================================================================================

  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  1. Webpack Runtime Global Mocks                                                                 │
  │     • global.__webpack_require__(id): Resolves mapped Client Component IDs using require()       │
  │     • global.__webpack_chunk_load__(chunkId): Instantly resolves static chunk loading promises   │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  2. Core Environment Setup & Require Hooks                                                       │
  │     • @babel/register, css-require-hook, asset-require-hook, Module._resolveFilename overrides   │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  3. Error Rendering Functions                                                                    │
  │                                                                                                  │
  │     ├── formatErrorHtml(error)           ──> HTML crash templates (development stack overlays)   │
  │     ├── formatErrorHtmlProduction(error) ──> Sanitized HTML crash templates (production logs)    │
  │     └── writeErrorOutput(error, isProd)  ──> Writes error HTML to stdout and exits process with 1│
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  4. Manifest & Import Map Utilities                                                              │
  │                                                                                                  │
  │     ├── getImportMapHtml() ──> Returns HTML tag injecting ESM import maps                        │
  │     └── getSsrManifest()   ──> Reads & caches client and SSR module dependency mappings          │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  5. Main Render Implementation: renderToStream(reqPath, paramsString, contextJson, isDynamic)    │
  │     • Reads inherited fd 4 stream to parse RSC Flight payload binary                             │
  │     • Reconstructs the JSX tree asynchronously (createFromNodeStream)                            │
  │     • Calls renderToPipeableStream() to write HTML chunks to process.stdout                      │
  │     • Handles ShellReady event to write ESM import maps                                          │
  │     • onError callback: Catches SSR crashes and triggers fallback render (getErrorJSX)           │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  6. Self-Executing Startup Hook (CLI Execution)                                                  │
  │     • Reads CLI arguments: [_, _, reqPath, paramsString, contextJson, isDynamic]                 │
  │     • Invokes renderToStream() immediately upon child process spawning                           │
  └──────────────────────────────────────────────────────────────────────────────────────────────────┘`;

const WEBPACK_MOCKS_CODE = `global.__webpack_require__ = function (id) {
  if (global.__webpack_require_map__ && global.__webpack_require_map__[id]) {
    return require(global.__webpack_require_map__[id]); // Redirects to local system file path
  }
  if (typeof id === "string" && id.startsWith("./")) {
    id = path.resolve(process.cwd(), id);
  }
  return require(id);
};
global.__webpack_chunk_load__ = () => Promise.resolve(); // Chunks are already on disk`;

const REQUIRE_HOOKS_CODE = `const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/node_modules[\\\\/](?!dinou)/], // Compile app and framework core files
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/transform-modules-commonjs"],
  extensions: [".js", ".jsx", ".ts", ".tsx"],
});

require("./css-require-hook.js")(); // Parse CSS Modules to class maps
addHook({
  extensions,
  name: (localName, filepath) => createScopedName(localName, filepath) + ".[ext]",
  publicPath: "/assets/",
}); // Parse image/svg imports to static public URL strings`;

const ERROR_RENDERING_CODE = `function formatErrorHtml(error) {
  const message = error.message || "Unknown error";
  const stack = error.stack ? error.stack.replace(/\\n/g, "<br>").replace(/\\s/g, "&nbsp;") : "No stack trace available";
  return \`<!DOCTYPE html><html>...<body><h1 class="error-title">An Error Occurred</h1><p class="error-message">\${message}</p><div class="error-stack">\${stack}</div></body></html>\`;
}

function writeErrorOutput(error, isProd) {
  process.stdout.write(
    isProd ? formatErrorHtmlProduction(error) : formatErrorHtml(error)
  );
  process.stderr.write(
    JSON.stringify({ error: error.message, stack: error.stack })
  );
}`;

const MANIFEST_UTILITIES_CODE = `function getSsrManifest() {
  const ssrManifest = JSON.parse(fs.readFileSync(ssrManifestPath, "utf8"));
  const clientManifest = JSON.parse(fs.readFileSync(clientManifestPath, "utf8"));

  const requireMap = {};
  for (const [fileUrl, entry] of Object.entries(clientManifest)) {
    if (entry && entry.id !== undefined) {
      requireMap[entry.id] = fileURLToPath(fileUrl); // Mappings table
    }
  }
  global.__webpack_require_map__ = requireMap; // Populate require() polyfill
  return ssrManifest;
}`;

const RENDER_TO_STREAM_CODE = `async function renderToStream(
  reqPath,
  query,
  serializedBox,
  isDynamic,
) {
  const context = {
    req: serializedBox.req,
    res: createResponseProxy(),
  };

  // 1. Run inside the asynchronous execution context
  await requestStorage.run(context, async () => {
    try {
      const { createReadStream } = require("fs");
      const rscStream = createReadStream(null, { fd: 4 });
      const { pathToFileURL } = require("url");
      const baseUrl = pathToFileURL(process.cwd()).href + "/";

      // 2. Reconstruct Client-Safe JSX Components Graph
      const jsx = isWebpack
        ? await createFromNodeStream(rscStream, getSsrManifest())
        : await createFromNodeStream(rscStream, baseUrl, baseUrl);

      // 3. Compile JSX to HTML chunks streamed to stdout
      const stream = renderToPipeableStream(jsx, {
        onShellReady() {
          if (!isWebpack) {
            const importMapHtml = getImportMapHtml(); // Inject importmaps in ESM
            process.stdout.write(importMapHtml);
          }
          stream.pipe(process.stdout);
        },
        onError(error) {
          // 4. Advanced Error Recovery Boundary
          process.nextTick(async () => {
            if (stream && !stream.destroyed) {
              try {
                stream.unpipe(process.stdout);
                stream.destroy();
              } catch { }
            }
            const isProd = process.env.NODE_ENV === "production";

            try {
              const errorJSX = await getErrorJSX(reqPath, query, error, isDevelopment);
              if (!context.res.headersSent) context.res.status(500);

              if (errorJSX === undefined) {
                writeErrorOutput(error, isProd);
                process.exit(1); // Hard Fallback
              }

              // Render custom boundary (error.tsx)
              const errorStream = renderToPipeableStream(errorJSX, {
                onShellReady() {
                  if (!isWebpack) {
                    const importMapHtml = getImportMapHtml();
                    process.stdout.write(importMapHtml);
                  }
                  errorStream.pipe(process.stdout);
                },
                onError(err) {
                  console.error("Error rendering error JSX:", err);
                  writeErrorOutput(error, isProd);
                  process.exit(1);
                },
                bootstrapModules: isDevelopment
                  ? [
                    getAssetFromManifest("error.js"),
                    isWebpack ? undefined : getAssetFromManifest("runtime.js"),
                  ].filter(Boolean)
                  : [getAssetFromManifest("error.js")],
                bootstrapScriptContent: \`window.__DINOU_ERROR_MESSAGE__=\${JSON.stringify(
                  error.message || "Unknown error",
                )};window.__DINOU_ERROR_NAME__=\${JSON.stringify(error.name)};\${isDevelopment
                  ? \`window.__DINOU_ERROR_STACK__=\${JSON.stringify(error.stack || "")};\`
                  : ""
                }\${isDevelopment ? \`window.HMR_WEBSOCKET_URL="ws://localhost:3001";\` : ""}\`,
              });
            } catch (err) {
              console.error("Render error (no error.tsx?):", err);
              writeErrorOutput(error, isProd);
              process.exit(1);
            }
          });
        },
        bootstrapModules: isDevelopment
          ? [
            getAssetFromManifest("main.js"),
            isWebpack ? undefined : getAssetFromManifest("runtime.js"),
          ].filter(Boolean)
          : [getAssetFromManifest("main.js")],
        ...(isDevelopment
          ? {
            bootstrapScriptContent: \`window.HMR_WEBSOCKET_URL="ws://localhost:3001";\`,
          }
          : {}),
      });
    } catch (error) {
      if (context && context.res && typeof context.res.status === "function") {
        if (!context.res.headersSent) context.res.status(500);
      }
      process.stdout.write(formatErrorHtml(error));
      process.stderr.write(
        JSON.stringify({ error: error.message, stack: error.stack }),
      );
      process.exit(1);
    }
  });
}`;

const STARTUP_HOOK_CODE = `const reqPath = process.argv[2] || "/";
const paramsString = process.argv[3] || "{}";
const contextJson = process.argv[4] || "{}";
const isDynamic = process.argv[5] === "true";

renderToStream(reqPath, paramsString, contextJson, isDynamic);`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                HTML Renderer Pipeline
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand how Dinou isolates Server Components rendering from Client SSR through a dual-process bridge using <code>render-app-to-html.js</code> and <code>render-html.js</code>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              • Parent manager: <code>./dinou/core/render-app-to-html.js</code> <br />
              • Child renderer: <code>./dinou/core/render-html.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                React 19 separates the execution of Server Components (RSC) and Client Components. The server needs to run under the <code>react-server</code> environment condition, while client-side rendering (SSR) must run under the standard React environment. Attempting to run both in the same Node.js process leads to V8 memory conflicts and duplicate module definitions.
              </p>
              <p>
                Dinou bypasses this boundary limit by executing these tasks in two isolated Node.js processes communicating through an IPC pipe and standard outputs.
              </p>
            </section>

            <hr className="my-8" />

            {/* ARCHITECTURE DIAGRAM */}
            <section id="architecture">
              <h2>🔄 The Two-Process SSR Pipeline</h2>
              <p>
                The lifecycle of an HTML request follows this decoupled execution graph:
              </p>
              
              <div className="not-prose my-6 border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto">
                <pre className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre">{PIPELINE_DIAGRAM}</pre>
              </div>
            </section>

            <hr className="my-8" />

            {/* PARENT HANDLER */}
            <section id="render-app-parent">
              <h2>⚡ Parent Handler: <code>render-app-to-html.js</code></h2>
              <p>
                This module acts as the orchestrator running inside the master Express server process. It handles child process lifecycle management, serializes requests across the IPC channel, and manages response streaming.
              </p>

              <h3>render-app-to-html.js Code Structure & Functions</h3>
              <p>
                The file defines the following helper variables, utilities, and main export:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{PARENT_STRUCTURE_DIAGRAM}</CodeBlock>
              </div>

              <h3>1. Spawning the Child Process</h3>
              <p>
                When a user requests a page, the parent spins up a clean, isolated child process using Node's <code>fork()</code> to run the standard React renderer (<code>render-html.js</code>):
              </p>
              <div className="not-prose my-2">
                <CodeBlock language="javascript">{CHILD_SPAWNING_CODE}</CodeBlock>
              </div>
              <p>
                <strong>File Descriptor Mapping:</strong> The <code>stdio</code> array maps file descriptors:
              </p>
              <ul>
                <li><code>stdio[1] (stdout)</code>: Dedicated to receiving compiled HTML chunks back from the child, piped directly to Express's <code>res</code> object.</li>
                <li><code>stdio[3] (ipc)</code>: Bidirectional message channel for context updates.</li>
                <li><code>stdio[4] (pipe)</code>: Custom data descriptor dedicated to streaming the React Server Components (RSC) Flight payload down to the child process.</li>
              </ul>

              <hr className="my-6" />

              <h3>2. Static Cache Optimization (RSC Cache Bypass)</h3>
              <p>
                To avoid redundant rendering overhead, the parent checks if a static RSC binary (<code>rsc.rsc</code>) exists in the <code>dist2/</code> cache. If found, it bypasses the Server Component compilation pipeline and writes the file contents directly to the child's RSC stream:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RSC_CACHE_BYPASS_CODE}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>3. Parent Response Mocking (<code>createParentResponseWrapper</code>)</h3>
              <p>
                During dynamic SSR, the parent runs Server Components inside the <code>requestStorage</code> context using a mocked Express response wrapper. This maps response calls to the child process IPC channel:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PARENT_RESPONSE_WRAPPER_CODE}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>4. Bidirectional IPC Context Synchronization</h3>
              <p>
                Since Server Components execute in a separate process from the HTML renderer, mutations (such as <code>res.cookie</code> or <code>res.redirect</code>) triggered inside the child process are sent back to the parent as IPC message payloads:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RESPONSE_PROXY_CODE}</CodeBlock>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold mb-2">IPC & Process Pipeline Flow:</p>
                <div className="not-prose">
                  <CodeBlock language="text">{IPC_FLOW_DIAGRAM}</CodeBlock>
                </div>
              </div>
            </section>

            <hr className="my-8" />

            {/* CHILD PROCESS */}
            <section id="render-html-child">
              <h2>⚙️ Child Process: <code>render-html.js</code></h2>
              <p>
                The child process runs in a clean standard React rendering thread (free from the <code>react-server</code> environment condition). Below is the complete step-by-step breakdown of its internal execution pipeline:
              </p>

              <h3>render-html.js Code Structure & Functions</h3>
              <p>
                The file defines the following global structures, internal utilities, and self-execution hook:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{CHILD_STRUCTURE_DIAGRAM}</CodeBlock>
              </div>

              <h3>1. Webpack Runtime Global Mocks</h3>
              <p>
                React Client Components compiled by bundlers rely on specific globals like <code>__webpack_require__</code> and <code>__webpack_chunk_load__</code> to resolve chunks in the browser. Since the isolated child process runs inside a native Node.js V8 context, it overrides these globals at startup to redirect module resolution:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{WEBPACK_MOCKS_CODE}</CodeBlock>
              </div>
              <ul>
                <li>
                  <strong><code>global.__webpack_require__</code>:</strong> Intercepts imports. If a component request matches a key in <code>global.__webpack_require_map__</code>, it maps the identifier to the absolute physical file on disk (calculated from the Client Manifest) and calls Node's native <code>require()</code>.
                </li>
                <li>
                  <strong><code>global.__webpack_chunk_load__</code>:</strong> Mocks dynamic loading. Because all bundle assets already reside locally on the disk, dynamic loading is a no-op that resolves immediately.
                </li>
              </ul>

              <hr className="my-6" />

              <h3>2. Core Environment Setup & Require Hooks</h3>
              <p>
                Before executing JSX or user styles, the child process establishes its JIT compiler hooks to prevent syntax or resolution errors:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{REQUIRE_HOOKS_CODE}</CodeBlock>
              </div>
              <ul>
                <li>
                  <strong>Babel Register:</strong> Compiles React 19 JSX brackets and TypeScript constructs into raw CommonJS.
                </li>
                <li>
                  <strong>CSS Require Hook:</strong> Compiles PostCSS classes into JSON keymaps, outputting scoped class names (e.g., mapping <code>.container</code> to <code>.container__x3a2</code>) matching the client stylesheet builds.
                </li>
                <li>
                  <strong>Asset Require Hook (<code>addHook</code>):</strong> Intercepts file extensions for static assets (like <code>.png</code> or <code>.svg</code>) to prevent evaluation errors, returning a static URL string (e.g., <code>/assets/logo.a1b2c3.png</code>).
                </li>
              </ul>

              <hr className="my-6" />

              <h3>3. Error Rendering Functions</h3>
              <p>
                In the event of a compiler or React rendering crash, <code>render-html.js</code> uses dedicated templates to output a complete, standalone error HTML payload:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{ERROR_RENDERING_CODE}</CodeBlock>
              </div>
              <ul>
                <li>
                  <strong><code>formatErrorHtml</code>:</strong> Produces a stylized HTML overlay displaying the error stack trace, tailored for local debugging.
                </li>
                <li>
                  <strong><code>formatErrorHtmlProduction</code>:</strong> Outputs a minimal HTML template containing a script that logs the error context to the client browser's console, hiding implementation details from the user.
                </li>
                <li>
                  <strong><code>writeErrorOutput</code>:</strong> Directs the formatted HTML directly to <code>process.stdout</code> and writes the raw JSON traceback metadata block to <code>process.stderr</code> before exiting the process.
                </li>
              </ul>

              <hr className="my-6" />

              <h3>4. Manifest & Import Map Utilities</h3>
              <p>
                Before starting the React stream, the child reads the compilation manifests to populate Webpack and ESM resolvers:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{MANIFEST_UTILITIES_CODE}</CodeBlock>
              </div>
              <ul>
                <li>
                  <strong><code>getSsrManifest()</code>:</strong> Populates the global <code>__webpack_require_map__</code> by converting all client manifest <code>file://</code> URLs to absolute paths, ensuring runtime require lookups succeed.
                </li>
                <li>
                  <strong><code>getImportMapHtml()</code>:</strong> Builds a <code>&lt;script type="importmap"&gt;</code> element dynamically to resolve ES module specifiers in non-webpack environments.
                </li>
              </ul>

              <div className="my-4 border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/40 not-prose space-y-3">
                <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <Cpu className="h-4 w-4 text-blue-500" />
                  How Module Resolution Differs: Webpack vs. ESM (esbuild/Rollup)
                </h4>
                <div className="text-xs text-muted-foreground leading-relaxed space-y-2">
                  <div>
                    <strong>📦 Webpack (Server-side mapping):</strong>
                    <p className="mt-1">
                      Webpack relies on <strong>abstract module IDs</strong> (e.g., numeric IDs like <code>102</code>) instead of actual file paths. During Server-Side Rendering (SSR), React needs <code>getSsrManifest()</code> to build <code>__webpack_require_map__</code>, mapping those abstract IDs back to physical file paths on disk for Node's <code>require()</code>. Under Webpack, <code>getImportMapHtml()</code> is a no-op that returns an empty string, since the Webpack runtime handles module loading in the browser.
                    </p>
                  </div>
                  <div>
                    <strong>🌐 ESM (Client-side mapping):</strong>
                    <p className="mt-1">
                      ESM-based runtimes (using <strong>esbuild</strong> and <strong>Rollup</strong>) write native relative ES module paths directly into the Flight stream. The child process resolves these paths natively via standard dynamic <code>import()</code> statements, rendering <code>getSsrManifest()</code> unnecessary. However, the client browser needs to resolve module specifiers (bare imports like <code>import React from 'react'</code>) to physical URLs. This is solved by <code>getImportMapHtml()</code>, which reads <code>react-client-manifest.json</code> to inject a <code>&lt;script type="importmap"&gt;</code> element dynamically in non-webpack environments.
                    </p>
                  </div>
                </div>
              </div>

              <hr className="my-6" />

              <h3>5. Main Render Implementation: <code>renderToStream</code></h3>
              <p>
                This asynchronous function orchestrates the reading, reconstruction, and rendering of the React tree:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RENDER_TO_STREAM_CODE}</CodeBlock>
              </div>
              <p>
                During execution, <code>renderToStream</code> opens a stream on file descriptor <code>fd:4</code> to read the binary Flight stream, parsing it with React's <code>createFromNodeStream()</code> within the isolated <code>requestStorage.run</code> context.
              </p>
              <p>
                The rebuilt component graph is then compiled to HTML chunks via React's <code>renderToPipeableStream()</code>. The orchestration executes through the following structural blocks:
              </p>
              <ul>
                <li>
                  <strong>Context Isolation (<code>requestStorage.run</code>):</strong> Wraps the rendering thread inside a thread-safe AsyncLocalStorage container. This ensures sub-components can access request headers, query parameters, and cookie contexts without cross-talk.
                </li>
                <li>
                  <strong>Client Asset Resolution (<code>bootstrapModules</code>):</strong> Maps client hydration bundles using <code>getAssetFromManifest()</code>. This dynamic lookup maps the static identifiers (like <code>main.js</code> and <code>runtime.js</code>) to the physical hash-appended build assets inside the client manifest.
                </li>
                <li>
                  <strong>HMR WebSocket Injection (<code>bootstrapScriptContent</code>):</strong> In development mode, it registers the global <code>window.HMR_WEBSOCKET_URL</code> string, allowing the client-side browser to open hot reloading pipes.
                </li>
                <li>
                  <strong>Advanced Error Recovery Hook (<code>onError</code>):</strong> If an SSR compiler or runtime crash is intercepted:
                  <ul className="pl-4 mt-1 space-y-1 list-disc">
                    <li><strong>Stdout Detaching:</strong> The child immediately detaches the active stream from <code>process.stdout</code> and destroys it to prevent corrupted layouts from reaching the browser.</li>
                    <li><strong>Custom Error Boundary:</strong> It resolves the project's custom <code>error.tsx</code> component via <code>getErrorJSX()</code>. If found, it status-codes the request to 500 and renders the boundary, injecting metadata logs (<code>__DINOU_ERROR_MESSAGE__</code>, <code>__DINOU_ERROR_STACK__</code>) to the browser window.</li>
                    <li><strong>Hard Fallback Exit:</strong> If no custom template exists or rendering the error component fails, it writes the raw stack trace template (<code>formatErrorHtml</code>) and exits the process via <code>process.exit(1)</code>.</li>
                  </ul>
                </li>
              </ul>

              <hr className="my-6" />

              <h3>6. Self-Executing Startup Hook</h3>
              <p>
                At the very end of <code>render-html.js</code>, the script parses the command line arguments passed by the parent fork call and executes <code>renderToStream()</code> immediately:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{STARTUP_HOOK_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CUSTOMIZATION INSTRUCTIONS */}
            <section id="customizations">
              <h2>🛠️ Common Tweak Recipes</h2>
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 space-y-3 not-prose text-sm">
                <div>
                  <strong>1. Injecting Global Meta Tags or Document Scripts:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can customize the HTML wrapper document envelope by editing the template generator in <code>core/render-app-to-html.js</code> to include analytics, font preloads, or custom headers.
                  </p>
                </div>
                <div>
                  <strong>2. Customizing Fallback Error Styles:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tweak the CSS structure in <code>formatErrorHtml()</code> inside <code>core/render-html.js</code> to brand development crash screens to match your project aesthetic.
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
