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

const PIPELINE_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '16px' }}}%%
graph TD
    Start["🚀 Express server.js<br/>(Initiates request handling via renderAppToHtml)"] --> Fork["Parent Process Handler: render-app-to-html.js<br/>(Spawns & orchestrates child worker process)"]
    Fork --> ParentActions["RSC Pipeline Execution (Parent)<br/>1. Evaluates React Server Component tree<br/>2. Serializes binary RSC Flight payload"]
    
    ParentActions -->|"Pipes RSC Flight stream via fd 4"| Child["render-html.js Child Process<br/>(Isolated Client SSR execution environment)"]
    
    subgraph ChildEnv["⚙️ Child Process SSR Environment"]
        Child --> ReadFlight["a. Read Flight Stream<br/>(Consumes binary RSC stream from fd 4)"]
        ReadFlight --> Reconstruct["b. Reconstruct JSX Tree<br/>(createFromNodeStream with SSR manifest)"]
        Reconstruct --> SSR["c. React 19 SSR Engine<br/>(renderToPipeableStream compiles JSX to HTML)"]
        SSR --> WriteHTML["d. Stream HTML Output<br/>(Pipes final HTML chunks to stdout)"]
    end
    
    WriteHTML -->|"Pipes stdout HTML stream"| ExpressRes["🌐 Express HTTP Response<br/>(Streams HTML chunks to client browser)"]`;

const PARENT_STRUCTURE_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '16px' }}}%%
graph TD
    subgraph Structure["📦 render-app-to-html.js Code Structure & Sequence"]
        direction TB
        Deps["1. Dependencies & Module Imports<br/>(child_process fork, fs, path, url, getJSX, requestStorage)"]
        Helpers["2. Global Helper Functions<br/>(getManifest: parses client manifest & toFileUrl: path resolver)"]
        ResponseWrapper["3. createParentResponseWrapper<br/>(IPC command listener for cookies, redirects & status codes)"]
        Export["4. Main Export: renderAppToHtml<br/>(Flight cache check, child process stdio/fd:4 orchestration & stdout piping)"]

        Deps --> Helpers
        Helpers --> ResponseWrapper
        ResponseWrapper --> Export
    end`;

const PARENT_IMPORTS_CODE = `const path = require("path");
const { fork } = require("child_process");
const url = require("url");
const fs = require("fs");
const getJSX = require("./get-jsx.js");
const { requestStorage } = require("./request-context.js");

const isDevelopment = process.env.NODE_ENV !== "production";
const isWebpack = process.env.DINOU_BUILD_TOOL === "webpack";

const { renderToPipeableStream } = isWebpack
  ? require("react-server-dom-webpack/server")
  : require("@roggc/react-server-dom-esm/server");`;

const PARENT_GLOBAL_HELPERS_CODE = `const manifestPath = path.resolve(
  process.cwd(),
  isWebpack
    ? (isDevelopment ? "public/react-client-manifest.json" : "dist3/react-client-manifest.json")
    : "react_client_manifest/react-client-manifest.json"
);

let cachedManifest = null;
function getManifest() {
  if (!isDevelopment && cachedManifest) return cachedManifest;
  try {
    const content = fs.readFileSync(manifestPath, "utf8");
    const parsed = JSON.parse(content);
    if (parsed && Object.keys(parsed).length > 0) {
      cachedManifest = parsed;
    }
    return cachedManifest || parsed;
  } catch (e) {
    if (cachedManifest) {
      console.warn("Using cached client manifest due to read error:", e.message);
      return cachedManifest;
    }
    console.error("Error reading client manifest:", e);
    return {};
  }
}

function toFileUrl(p) {
  return url.pathToFileURL(p).href;
}

const registerLoaderPath = toFileUrl(
  path.join(__dirname, "register-loader.mjs"),
);
const renderHtmlPath = path.resolve(__dirname, "render-html.js");

const ESSENTIAL_NODE_ARGS = [];
const loaderArg = \`--import=\${registerLoaderPath}\`;
const childExecArgv = ESSENTIAL_NODE_ARGS.concat(loaderArg);

const { resolveRelativeUrl } = require("./url-resolver");`;

const PARENT_RESPONSE_WRAPPER_CODE = `function createParentResponseWrapper(reqPath, res, child) {
  let hasRedirected = false;

  const safeRedirect = (targetUrl) => {
    if (hasRedirected) return;
    hasRedirected = true;

    const resolvedUrl = resolveRelativeUrl(targetUrl, reqPath);
    let finalUrl = "/";
    if (
      typeof resolvedUrl === "string" &&
      resolvedUrl.startsWith("/") &&
      !resolvedUrl.startsWith("//")
    ) {
      finalUrl = resolvedUrl;
    } else {
      console.warn(
        \`[Dinou Security] Blocked unsafe redirect to: \${targetUrl}\`,
      );
    }

    if (res.headersSent) {
      console.log(
        \`[Dinou] Streaming active. Redirecting via JavaScript to: \${finalUrl}\`,
      );
      const safeUrl = JSON.stringify(finalUrl);
      res.write(\`<script>window.location.href = \${safeUrl};</script>\`);
      res.end();
      child.stdout.unpipe(res);
      child.kill();
    } else {
      res.redirect(302, finalUrl);
      child.stdout.unpipe(res);
      child.kill();
    }
  };

  return {
    setHeader: (name, value) => {
      if (res.headersSent) {
        console.warn(
          \`[Dinou Warning] Cannot set header '\${name}' because streaming started.\`,
        );
      } else {
        res.setHeader(name, value);
      }
    },
    cookie: (name, value, options) => {
      if (res.headersSent) {
        if (options && options.httpOnly) {
          console.error(
            \`[Dinou Error] Cannot set HttpOnly cookie '\${name}' because streaming has already started.\`,
          );
          return;
        }
        console.log(
          \`[Dinou] Streaming active. Setting cookie '\${name}' via JS.\`,
        );
        let cookieStr = \`\${name}=\${encodeURIComponent(value)}\`;
        if (options) {
          if (options.path) cookieStr += \`; path=\${options.path}\`;
          if (options.domain) cookieStr += \`; domain=\${options.domain}\`;
          if (options.maxAge) cookieStr += \` max-age=\${options.maxAge}\`;
          if (options.expires)
            cookieStr += \`; expires=\${new Date(options.expires).toUTCString()}\`;
          if (options.secure) cookieStr += \`; secure\`;
          if (options.sameSite)
            cookieStr += \`; samesite=\${options.sameSite}\`;
        }
        const safeCookieStr = JSON.stringify(cookieStr);
        res.write(\`<script>document.cookie = \${safeCookieStr};</script>\`);
      } else {
        res.cookie(name, value, options);
      }
    },
    clearCookie: (name, options) => {
      if (res.headersSent) {
        console.log(
          \`[Dinou] Streaming active. Clearing cookie '\${name}' via JS.\`,
        );
        let cookieStr = \`\${name}=; Max-Age=0\`;
        const path = options?.path || "/";
        cookieStr += \`; path=\${path}\`;
        if (options) {
          if (options.domain) cookieStr += \`; domain=\${options.domain}\`;
          if (options.secure) cookieStr += \`; secure\`;
          if (options.sameSite) cookieStr += \`; samesite=\${options.sameSite}\`;
        }
        cookieStr += ";";
        const safeCookieStr = JSON.stringify(cookieStr);
        res.write(\`<script>document.cookie = \${safeCookieStr};</script>\`);
      } else {
        res.clearCookie(name, options);
      }
    },
    redirect: (arg1, arg2) => {
      const url = arg2 || arg1;
      safeRedirect(url);
    },
    status: (code) => {
      if (res.headersSent) {
        console.warn(
          \`[Dinou Warning] HTTP status '\${code}' ignored because streaming started.\`,
        );
      } else {
        res.status(code);
      }
    },
  };
}`;

const PARENT_MAIN_EXPORT_CODE = `function renderAppToHtml(
  reqPath,
  paramsString,
  contextForChild,
  res,
  capturedStatus = null,
  isDynamic = false,
  forceNotFound = false,
) {
  // Spawns the child process renderer: fork(renderHtmlPath, [args], { stdio: [..., fd:4] })
  const child = fork(
    renderHtmlPath,
    [
      reqPath,
      paramsString,
      contextForChild ? JSON.stringify(contextForChild) : JSON.stringify({}),
      isDynamic ? "true" : "false",
    ],
    {
      execArgv: childExecArgv,
      stdio: ["ignore", "pipe", "pipe", "ipc", "pipe"], // fd 4 is the RSC stream pipe
    },
  );

  const query = JSON.parse(paramsString || "{}");
  const rscPath = path.resolve(process.cwd(), "dist2", reqPath.replace(/^\\//, ""), "rsc.rsc");
  const hasStaticRsc = !isDynamic && fs.existsSync(rscPath);

  if (hasStaticRsc) {
    // IF CACHED: pipes compiled static dist2/rsc.rsc directly into fd 4
    try {
      const rscBuffer = fs.readFileSync(rscPath);
      child.stdio[4].write(rscBuffer);
      child.stdio[4].end();
    } catch (err) {
      console.error(\`[Dinou] Failed to read static RSC from \${rscPath}:\`, err.message);
      if (child.stdio[4]) child.stdio[4].destroy();
    }
  } else {
    // IF DYNAMIC: renders Server Components (RSC) to binary Flight payload stream
    const isNotFound = {};
    const parentRes = createParentResponseWrapper(reqPath, res, child);
    const context = {
      req: contextForChild ? contextForChild.req : {},
      res: parentRes,
    };
    requestStorage.run(context, () => {
      getJSX(reqPath, query, isNotFound, isDevelopment, forceNotFound)
        .then((jsx) => {
          if (isNotFound.value) {
            parentRes.status(404);
          }
          const manifest = getManifest();
          const { pipe } = isWebpack
            ? renderToPipeableStream(jsx, manifest)
            : renderToPipeableStream(jsx, url.pathToFileURL(process.cwd()).href + "/");
          pipe(child.stdio[4]);
        })
        .catch((err) => {
          console.error("Error rendering JSX in parent renderAppToHtml:", err);
          if (child.stdio[4]) child.stdio[4].destroy();
        });
    });
  }

  // Sets up IPC message listener: child.on("message", createParentResponseWrapper proxy)
  child.on("message", (message) => {
    // ... handles message commands
  });

  // Streams output: child.stdout.pipe(res)
  return child.stdout;
}`;

const PARENT_IPC_MESSAGE_CODE = `child.on("message", (message) => {
  if (message && message.type === "DINOU_CONTEXT_COMMAND") {
    const { command, args } = message;
    if (
      command === "setHeader" ||
      command === "clearCookie" ||
      command === "cookie" ||
      command === "status" ||
      command === "redirect"
    ) {
      // SCENARIO 1: STREAMING ALREADY STARTED (Headers sent)
      if (res.headersSent) {
        if (command === "redirect") {
          const rawUrl = args.length === 1 ? args[0] : args[1];
          const resolvedUrl = resolveRelativeUrl(rawUrl, reqPath);
          let finalUrl = resolvedUrl.startsWith("/") && !resolvedUrl.startsWith("//") ? resolvedUrl : "/";
          res.write(\`<script>window.location.href = \${JSON.stringify(finalUrl)};</script>\`);
          res.end();
          child.stdout.unpipe(res);
          child.kill();
          return;
        }
        if (command === "cookie") {
          const [name, value, options] = args;
          if (options && options.httpOnly) return;
          let cookieStr = \`\${name}=\${encodeURIComponent(value)}\`;
          // ... constructs options ...
          res.write(\`<script>document.cookie = \${JSON.stringify(cookieStr)};</script>\`);
          return;
        }
        // ...
      }

      // SCENARIO 2: HEADERS NOT YET SENT (Normal Express usage)
      if (typeof res[command] === "function") {
        if (command === "redirect") {
          let status = args.length === 2 ? args[0] : 302;
          let rawUrl = args.length === 2 ? args[1] : args[0];
          const resolvedUrl = resolveRelativeUrl(rawUrl, reqPath);
          let finalUrl = resolvedUrl.startsWith("/") && !resolvedUrl.startsWith("//") ? resolvedUrl : "/";
          res.redirect(status, finalUrl);
          child.stdout.unpipe(res);
          child.kill();
          return;
        }
        res[command].apply(res, args);
      }
    }
  }
});`;

const IPC_FLOW_DIAGRAM = `sequenceDiagram
    participant Parent as Master Express Server
    participant Child as Child Process (render-html)
    
    Parent->>Child: Fork child process
    Note over Parent: Check Cache:<br/>Exists? Read dist2/rsc.rsc<br/>Missing? Compile JSX to Flight
    Parent->>Child: Pipe Flight data (fd 4) (createFromNodeStream)
    Child->>Parent: Stream HTML chunks (stdout) (renderToPipeableStream)
    Child->>Parent: IPC command message (res.cookie / redirect)
    Note over Parent: Headers Sent?<br/>Yes: write script cookie/redirect<br/>No: call native Express headers`;

const CHILD_STRUCTURE_DIAGRAM = `graph TD
    subgraph render-html.js Code Structure
        Mocks[1. Webpack Runtime Global Mocks<br/>global.__webpack_require__: Resolves mapped Client Component IDs using require<br/>global.__webpack_chunk_load__: Instantly resolves chunk load promises]
        Setup[2. Core Environment Setup & Require Hooks<br/>@babel/register, css-require-hook, asset-require-hook, Module._resolveFilename]
        Errors[3. Error Rendering Functions<br/>formatErrorHtml: Development stack overlays<br/>formatErrorHtmlProduction: Sanitized logs<br/>writeErrorOutput: Writes error HTML to stdout & exits]
        ImportMaps[4. Manifest & Import Map Utilities<br/>getImportMapHtml: Returns ESM import map script tag<br/>getSsrManifest: Reads & caches client / SSR dependency mappings]
        Render[5. Main Render Implementation: renderToStream<br/>Reads fd 4 Flight payload & reconstructs JSX tree<br/>renderToPipeableStream to process.stdout<br/>ESM import maps, HMR WebSockets, onError recovery]
        Startup[6. Self-Executing Startup Hook<br/>Reads CLI arguments & invokes renderToStream]
    end
    
    Mocks --> Setup
    Setup --> Errors
    Errors --> ImportMaps
    ImportMaps --> Render
    Render --> Startup`;

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
              
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="800px">{PIPELINE_DIAGRAM}</CodeBlock>
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
                <CodeBlock language="mermaid" minWidth="800px">{PARENT_STRUCTURE_DIAGRAM}</CodeBlock>
              </div>

              <h3>1. Dependencies & Module Imports</h3>
              <p>
                The orchestrator imports core Node.js modules like <code>child_process</code> (specifically <code>fork</code>), <code>fs</code>, <code>path</code>, and <code>url</code>. In addition, it imports project utilities such as <code>getJSX</code> and <code>requestStorage</code> (for <code>AsyncLocalStorage</code> request context tracking).
              </p>
              <p>
                Depending on the build tool configuration (Webpack vs. ESM), the parent dynamically imports the corresponding React server rendering engine:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PARENT_IMPORTS_CODE}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>2. Global Helper Functions</h3>
              <p>
                Two key helpers are defined at the module scope to load manifests and format URLs:
              </p>
              <ul>
                <li>
                  <strong><code>getManifest()</code>:</strong> Synchronously reads the client build manifest (<code>react-client-manifest.json</code>) from the current distribution directory. In production builds, this manifest is cached in memory (<code>cachedManifest</code>) to minimize filesystem overhead.
                </li>
                <li>
                  <strong><code>toFileUrl(p)</code>:</strong> Converts absolute physical files paths to absolute <code>file://</code> URLs required by dynamic ESM loaders.
                </li>
              </ul>
              <p>
                Additionally, the script resolves paths for loader hooks and standard render modules, and imports URL resolver helpers:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PARENT_GLOBAL_HELPERS_CODE}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>3. <code>createParentResponseWrapper(reqPath, res, child)</code></h3>
              <p>
                This function returns a mocked response helper object. When Server Components execute in the parent process under an <code>AsyncLocalStorage</code> execution context (<code>requestStorage.run</code>), any mutations on headers, cookies, redirects, or HTTP status codes are intercepted by this wrapper:
              </p>
              <ul>
                <li>
                  <strong>Headers Clean (Headers not sent yet):</strong> Calls are forwarded directly to Express's native response methods (e.g. <code>res.cookie</code> or <code>res.setHeader</code>).
                </li>
                <li>
                  <strong>Headers Sent (Streaming started):</strong> Since HTTP headers cannot be altered once streaming to the client has begun, the wrapper falls back to injecting inline JavaScript <code>&lt;script&gt;</code> blocks directly into the HTML response stream to apply changes client-side (such as updating <code>document.cookie</code> or changing <code>window.location.href</code>).
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PARENT_RESPONSE_WRAPPER_CODE}</CodeBlock>
              </div>

              <hr className="my-6" />

              <h3>4. Main Export: <code>renderAppToHtml(...)</code></h3>
              <p>
                This is the entry point invoked by the Express server. It handles cache optimization, process spawning, IPC communication setup, and output streaming:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PARENT_MAIN_EXPORT_CODE}</CodeBlock>
              </div>

              <h4>Detailed Steps of the Render Lifecycle</h4>
              <ul>
                <li>
                  <strong>Child Process Spawning:</strong> The parent forks <code>render-html.js</code> to run standard React SSR in a clean sandbox. The <code>stdio</code> array is mapped with a custom file descriptor:
                  <ul className="pl-4 mt-1 space-y-1 list-disc">
                    <li><code>stdio[1] (stdout)</code>: Set to <code>"pipe"</code> to read the compiled HTML chunks back from the child.</li>
                    <li><code>stdio[3] (ipc)</code>: Set to <code>"ipc"</code> to establish the bidirectional command channel.</li>
                    <li><code>stdio[4] (pipe)</code>: Mapped to a custom write stream (<code>child.stdio[4]</code>) dedicated to piping the RSC flight binary data.</li>
                  </ul>
                </li>
                <li>
                  <strong>Cache Resolution (RSC Cache Bypass):</strong>
                  <ul className="pl-4 mt-1 space-y-1 list-disc">
                    <li><strong>If Static RSC is cached:</strong> Reads the pre-built <code>dist2/../rsc.rsc</code> buffer and writes it directly to the child's RSC file descriptor <code>stdio[4]</code>, completely bypassing dynamic rendering.</li>
                    <li><strong>If Dynamic RSC is requested:</strong> Invokes <code>getJSX()</code> within the request context to render Server Components, compiling them into a pipeable Flight stream which is written to <code>stdio[4]</code>.</li>
                  </ul>
                </li>
                <li>
                  <strong>IPC Command Listener:</strong> It registers a listener on the <code>"message"</code> event from the child. When the child performs actions that change response metadata, they are processed through the IPC channel:
                  <div className="not-prose my-4">
                    <CodeBlock language="javascript">{PARENT_IPC_MESSAGE_CODE}</CodeBlock>
                  </div>
                </li>
              </ul>

              <div className="my-6">
                <p className="text-sm font-semibold mb-2">IPC & Process Pipeline Flow Diagram:</p>
                <div className="not-prose">
                  <CodeBlock language="mermaid" minWidth="800px">{IPC_FLOW_DIAGRAM}</CodeBlock>
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
                <CodeBlock language="mermaid" minWidth="1400px">{CHILD_STRUCTURE_DIAGRAM}</CodeBlock>
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
