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
                <pre className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre">{` [Express Server.js] ───────────────► Calling renderAppToHtml()
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
               [Express res] ────────► Browser (HTML Response)`}</pre>
              </div>
            </section>

            <hr className="my-8" />

            {/* PARENT HANDLER */}
            <section id="render-app-parent">
              <h2>⚡ Parent Handler: <code>render-app-to-html.js</code></h2>
              <p>
                This module acts as the orchestrator running inside the master Express server process. It handles child process lifecycle management, serializes requests across the IPC channel, and manages response streaming.
              </p>

              <h3>1. Spawning the Child Process</h3>
              <p>
                When a user requests a page, the parent spins up a clean, isolated child process using Node's <code>fork()</code> to run the standard React renderer (<code>render-html.js</code>):
              </p>
              <div className="not-prose my-2">
                <CodeBlock language="javascript">{`const child = fork(
  renderHtmlPath,
  [
    reqPath,
    paramsString,
    contextForChild ? JSON.stringify(contextForChild) : JSON.stringify({}),
    isDynamic ? "true" : "false",
  ],
  {
    execArgv: childExecArgv, // Imports register-loader.mjs resolver
    stdio: ["ignore", "pipe", "pipe", "ipc", "pipe"], // fd 4 is the custom RSC stream pipe
  }
);`}</CodeBlock>
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
                <CodeBlock language="javascript">{`const rscPath = path.resolve(process.cwd(), "dist2", reqPath.replace(/^\//, ""), "rsc.rsc");
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
}`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>3. Parent Response Mocking (<code>createParentResponseWrapper</code>)</h3>
              <p>
                During dynamic SSR, the parent runs Server Components inside the <code>requestStorage</code> context using a mocked Express response wrapper. This maps response calls to the child process IPC channel:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function createParentResponseWrapper(reqPath, res, child) {
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
}`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>4. Bidirectional IPC Context Synchronization</h3>
              <p>
                Since Server Components execute in a separate process from the HTML renderer, mutations (such as <code>res.cookie</code> or <code>res.redirect</code>) triggered inside the child process are sent back to the parent as IPC message payloads:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`child.on("message", (message) => {
  if (message && message.type === "DINOU_CONTEXT_COMMAND") {
    const { command, args } = message;
    
    // Scenario 1: Headers already sent (Streaming active)
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
});`}</CodeBlock>
              </div>

              <div className="my-6">
                <p className="text-sm font-semibold mb-2">IPC & Process Pipeline Flow:</p>
                <div className="not-prose">
                  <CodeBlock language="text">{`         [ Master Express Server ]                   [ Child Process (render-html) ]
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
                     │   └─► No : call native Express headers       │`}</CodeBlock>
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

              <h3>1. Global Webpack Polyfills & Mocks</h3>
              <p>
                React Client Components rely on bundler-specific globals to load modules and chunks. Since the child runs in Node.js, it injects these global mocks at startup:
              </p>
              <ul>
                <li>
                  <strong><code>global.__webpack_require__</code>:</strong> Resolves dependencies dynamically. If the module ID is mapped in the active manifest (<code>global.__webpack_require_map__</code>), it delegates the resolution to Node's native <code>require()</code>. If it starts with <code>./</code>, it resolves the path relative to <code>process.cwd()</code>.
                </li>
                <li>
                  <strong><code>global.__webpack_chunk_load__</code>:</strong> Simulates dynamic chunk loading. Since all server-side assets are already resident on disk, this immediately returns a resolved promise (<code>Promise.resolve()</code>).
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`global.__webpack_require__ = function (id) {
  if (global.__webpack_require_map__ && global.__webpack_require_map__[id]) {
    return require(global.__webpack_require_map__[id]);
  }
  if (typeof id === "string" && id.startsWith("./")) {
    id = path.resolve(process.cwd(), id);
  }
  return require(id);
};
global.__webpack_chunk_load__ = () => Promise.resolve();`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>2. Transpilation & CSS/Asset Require Hooks</h3>
              <p>
                To handle modern frontend syntaxes, the child sets up compile-on-the-fly hooks before importing user files:
              </p>
              <ul>
                <li>
                  <strong>Babel Register:</strong> Configures <code>@babel/register</code> to transpile JSX, TypeScript (<code>.ts/.tsx</code>), and ES modules into Node-compatible CommonJS. It ignores <code>node_modules</code> unless the package is part of the <code>dinou</code> framework core.
                </li>
                <li>
                  <strong>Asset Require Hook:</strong> Intercepts static assets (like <code>.png</code> or <code>.svg</code>). Instead of throwing runtime evaluation errors, it returns the public URL path mapped in the build output (e.g., <code>/assets/image.[hash].png</code>).
                </li>
                <li>
                  <strong>CSS Require Hook:</strong> Parses stylesheets and CSS Modules, hashing localized class names (e.g. mapping <code>.title</code> to <code>.title__x3f9</code>) so they align with build outputs.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const babelRegister = require("@babel/register");
babelRegister({
  ignore: [/node_modules[\\/](?!dinou)/],
  presets: [
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: ["@babel/transform-modules-commonjs"],
  extensions: [".js", ".jsx", ".ts", ".tsx"],
});

require("./css-require-hook.js")();
addHook({
  extensions,
  name: (localName, filepath) => createScopedName(localName, filepath) + ".[ext]",
  publicPath: "/assets/",
});`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>3. CLI Arguments Parsing</h3>
              <p>
                Deserializes variables passed down from the parent process CLI fork call:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const reqPath = process.argv[2] || "/";
const query = JSON.parse(process.argv[3] || "{}");
const serializedBox = JSON.parse(process.argv[4] || "{}");
const isDynamic = process.argv[5] === "true";`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>4. SSR Manifest & Require Mapping</h3>
              <p>
                To map Flight serialized hashes back to local JS modules, the helper reads and unifies build manifests:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function getSsrManifest() {
  const ssrManifest = JSON.parse(fs.readFileSync(ssrManifestPath, "utf8"));
  const clientManifest = JSON.parse(fs.readFileSync(clientManifestPath, "utf8"));

  const requireMap = {};
  for (const [fileUrl, entry] of Object.entries(clientManifest)) {
    if (entry && entry.id !== undefined) {
      requireMap[entry.id] = fileURLToPath(fileUrl); // Convert file:// URL to system path
    }
  }
  global.__webpack_require_map__ = requireMap; // Feed the global Webpack polyfill
  return ssrManifest;
}`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>5. IPC and Pipe Deserialization</h3>
              <p>
                The child opens a read-stream pointing directly to descriptor channel <code>fd:4</code>. It reads the incoming binary RSC Flight payload and passes it to the client reconstructor:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const rscStream = createReadStream(null, { fd: 4 });
const { createFromNodeStream } = isWebpack
  ? require("react-server-dom-webpack/client")
  : require("@roggc/react-server-dom-esm/client");

const jsx = isWebpack
  ? await createFromNodeStream(rscStream, getSsrManifest())
  : await createFromNodeStream(rscStream, baseUrl, baseUrl);`}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>6. React 19 HTML Compilation</h3>
              <p>
                The deserialized client JSX tree is compiled into HTML using React 19's server compiler:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const stream = renderToPipeableStream(jsx, {
  onShellReady() {
    // Write importmap dynamically for ESM resolution (ESBuild/Rollup only)
    if (!isWebpack) {
      process.stdout.write(getImportMapHtml());
    }
    stream.pipe(process.stdout); // Write raw HTML chunks to stdout
  },
  bootstrapModules: ["/main.js", "/runtime.js"], // Hydration scripts
  bootstrapScriptContent: isDevelopment ? 'window.HMR_WEBSOCKET_URL="ws://localhost:3001";' : ''
});`}</CodeBlock>
              </div>
              <p>
                The <code>stdout</code> of the process is hooked directly to the master Express response, which streams the HTML back to the browser.
              </p>

              <hr className="my-6" />

              <h3>7. Error Isolation & Recovery</h3>
              <p>
                If a component throws an error during the SSR compilation, the child process implements a robust recovery handler:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`onError(error) {
  process.nextTick(async () => {
    if (stream && !stream.destroyed) {
      stream.unpipe(process.stdout); // Detach stdout immediately to avoid layout corruption
      stream.destroy();
    }
    try {
      const errorJSX = await getErrorJSX(reqPath, query, error, isDevelopment);
      if (!context.res.headersSent) context.res.status(500);

      if (errorJSX === undefined) {
        writeErrorOutput(error, isProd); // Fallback to raw HTML
        process.exit(1);
      }

      // Render custom error.tsx with bootstrap scripts
      const errorStream = renderToPipeableStream(errorJSX, {
        onShellReady() {
          errorStream.pipe(process.stdout);
        },
        bootstrapModules: [getAssetFromManifest("error.js")],
        bootstrapScriptContent: \`window.__DINOU_ERROR_MESSAGE__=\${JSON.stringify(error.message)};\`
      });
    } catch {
      writeErrorOutput(error, isProd);
      process.exit(1);
    }
  });
}`}</CodeBlock>
              </div>
              <ul>
                <li>
                  <strong>Stdout Detaching:</strong> The moment an error is caught in <code>onError</code>, the child detaches the stream from <code>process.stdout</code> and destroys it, preventing broken layout code from reaching the client.
                </li>
                <li>
                  <strong>Custom Error Boundary SSR:</strong> It resolves the user's custom <code>error.tsx</code> component (using <code>getErrorJSX()</code>). If found, it renders it with code 500 and injects error details (message, stack, and HMR socket url) as global variables so the client-side hydration compiles a visual error boundary.
                </li>
                <li>
                  <strong>Hard Fallback Exit:</strong> If no custom component is found or it throws during compile, the script writes a static crash template (<code>formatErrorHtml</code>) and exits with <code>process.exit(1)</code>.
                </li>
              </ul>
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
