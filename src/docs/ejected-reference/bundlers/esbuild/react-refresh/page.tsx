"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { RefreshCw, Settings, Cpu, HardDrive } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "hmr-loop", title: "📊 Hot Module Replacement Loop", level: 2 },
  { id: "react-refresh-spec", title: "⚡ React Refresh Mechanics", level: 2 },
  { id: "code-plugin", title: "⚙️ esm-hmr-plugin.mjs", level: 2 },
  { id: "code-runtime", title: "⚙️ react-refresh-runtime.mjs", level: 2 },
  { id: "code-boundary", title: "⚙️ is-react-refresh-boundary.mjs", level: 2 },
  { id: "code-client", title: "⚙️ esm-hmr/client.mjs", level: 2 },
];

const HMR_DIAGRAM = `                   [Browser Client]                    [Server Compiler (WS)]
                          │                                      │
                          ├─── Connects to port 3001 WebSocket ──►
                          │                                      │
                   Edit Component                                │
                          │                                      │
                          │                               Recompile modified
                          │                               component with SWC
                          │                               react: {refresh: true}
                          │                                      │
                          ◄─────── Sends "update" event ─────────┤
                          │       (with module URL path)         │
                          │                                      │
                    applyUpdate()                                │
                          │                                      │
             Prune old module bindings                           │
            (Runs .disposeCallbacks())                           │
                          │                                      │
             Bust browser module cache                           │
          import(url + "?mtime=timestamp")                       │
                          │                                      │
             Rerender React Component                            │
          (performReactRefresh() debounced)                      │`;

const PLUGIN_CODE = `import fs from "node:fs/promises";
import path from "node:path";
import { transformSync } from "@swc/core";
import { createServer } from "node:http";
import { EsmHmrEngine } from "./esm-hmr/server.js";
import { fileURLToPath } from "node:url";
import write from "../helpers-esbuild/write.mjs";

const norm = (p) => path.resolve(p).replace(/\\\\/g, "/");
let serverStarted = false;

export default function esmHmrPlugin({
  entryNames = ["main", "error"],
  changedIds,
  hmrEngine,
} = {}) {
  return {
    name: "esm-hmr",
    setup(build) {
      const outdir = build.initialOptions.outdir || "public";
      const entryPoints = build.initialOptions.entryPoints;

      const entrySources = [];
      const entryAbsPaths = [];

      // 1. Initialize HMR WebSocket server on port 3001
      if (!serverStarted) {
        const server = createServer();
        hmrEngine.value = new EsmHmrEngine({ server });
        server.listen(3001);
        serverStarted = true;
      }

      build.onStart(async () => {
        for (const entryName of entryNames) {
          const entryPath = entryPoints?.[entryName];
          if (!entryPath) return;
          const absPath = path.resolve(entryPath);
          entryAbsPaths.push(absPath);
          entrySources.push(await fs.readFile(absPath, "utf8"));
        }
      });

      // 2. Intercept files and wrap them with Fast Refresh hooks via SWC compiler
      build.onLoad({ filter: /.*/ }, async (args) => {
        const abs = path.resolve(args.path);
        const absNorm = norm(abs);

        // Case A: Root entrypoints (client/error)
        const rootIndex = entryAbsPaths.findIndex((e) => norm(e) === absNorm);
        if (rootIndex !== -1) {
          const source = entrySources[rootIndex];
          if (source) {
            let injectCode = \`import { createHotContext } from "/__hmr_client__.js";\\nwindow.__hotContext = createHotContext;\\n\`;
            return { contents: injectCode + source, loader: "jsx" };
          }
          return null;
        }

        // Case B: Component components/pages
        const isAnEntryPoint = Object.values(entryPoints).some((val) => norm(path.resolve(val)) === absNorm);
        if (isAnEntryPoint) {
          const source = await fs.readFile(args.path, "utf8");
          try {
            const { code } = transformSync(source, {
              filename: abs,
              jsc: {
                parser: { syntax: "typescript", tsx: true, dynamicImport: true },
                target: "es2022",
                transform: {
                  react: { refresh: true, development: true, runtime: "automatic" },
                },
              },
            });
            return { contents: code, loader: "js" };
          } catch (e) {
            console.error("SWC compilation error: ", e.message);
          }
        }
        return null;
      });

      // 3. Inject __hmr_client__.js to output files
      build.onEnd(async (result) => {
        if (!result || !result.outputFiles) return;
        const clientPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "./esm-hmr/client.mjs");
        const clientCode = await fs.readFile(clientPath, "utf8");
        result.outputFiles.push({
          path: path.join(outdir, "__hmr_client__.js"),
          contents: new TextEncoder().encode(clientCode),
        });
      });

      // 4. Wrap JS module contents in acceptance checks
      build.onEnd(async (result) => {
        if (!result.metafile) return;
        const bundleFiles = Object.keys(result.metafile.outputs);

        for (const bF of bundleFiles) {
          if (!bF.endsWith(".js")) continue;
          const relPath = bF.replace(/\\\\/g, "/");
          const outputFile = result.outputFiles.find((f) => f.path.replace(/\\\\/g, "/").endsWith(relPath));
          if (!outputFile) continue;

          const baseName = path.basename(bF, ".js");
          const urlId = "/" + baseName + ".js";
          if (["main.js", "error.js", "serverFunctionProxy.js"].includes(baseName + ".js")) continue;

          const source = new TextDecoder().decode(outputFile.contents);
          const imports = Array.from(source.matchAll(/import\\s+["'](.+?)["']/g)).map((m) => m[1]);

          hmrEngine.value.setEntry(urlId, imports, true);
          const wrappedCode = \`
            const RefreshRuntime = window.__reactRefreshRuntime;
            let prevRefreshReg = window.$RefreshReg$;
            let prevRefreshSig = window.$RefreshSig$;
            window.$RefreshReg$ = (type, id) => {
              RefreshRuntime.register(type, \${JSON.stringify(urlId)} + '#' + id);
            };
            window.$RefreshSig$ = RefreshRuntime?.createSignatureFunctionForTransform;
            if (!import.meta.hot) import.meta.hot = window.__hotContext?.(\${JSON.stringify(urlId)});
            
            \${source}
            
            if (import.meta.hot) {
              import.meta.hot.accept(({module}) => {
                if (window.__isReactRefreshBoundary && window.__isReactRefreshBoundary(module)) {
                  window.__debouncePerformReactRefresh();
                } else {
                  import.meta.hot.invalidate();
                }
              });
            }
            window.$RefreshReg$ = prevRefreshReg;
            window.$RefreshSig$ = prevRefreshSig;
          \`;
          outputFile.contents = new TextEncoder().encode(wrappedCode);
        }
      });

      build.onEnd(write);

      // 5. Broadcast updates to client browser over WebSocket connection
      build.onEnd(async (result) => {
        if (!result.metafile || changedIds.size === 0) return;
        const bundleFiles = Object.keys(result.metafile.outputs);
        const pendingUpdateUrls = new Set();
        let needsFullReload = false;

        for (const fileName of bundleFiles) {
          const chunk = result.metafile.outputs[fileName];
          const modules = Object.keys(chunk?.inputs ?? {});

          for (const modulePath of modules) {
            if (changedIds.has(norm(path.resolve(modulePath)))) {
              const url = "/" + path.relative(outdir, fileName);
              const entry = hmrEngine.value.getEntry(url);
              if (entry?.isHmrAccepted) {
                pendingUpdateUrls.add(url);
              } else {
                needsFullReload = true;
              }
            }
          }
        }

        if (needsFullReload || pendingUpdateUrls.size === 0) {
          hmrEngine.value.broadcastMessage({ type: "reload" });
        } else {
          for (const url of pendingUpdateUrls) {
            hmrEngine.value.broadcastMessage({ type: "update", url });
          }
        }
        changedIds.clear();
      });
    },
  };
}`;

const RUNTIME_CODE = `import RefreshRuntime from "/react-refresh-entry.js";
import { isReactRefreshBoundary } from "./is-react-refresh-boundary.mjs";

if (typeof window !== "undefined" && !window.__REACT_REFRESH_RUNTIME_INSTALLED__) {
  // Bind runtime instance into global hook for React development builds
  RefreshRuntime.injectIntoGlobalHook(window);

  window.__reactRefreshRuntime = RefreshRuntime;
  window.$RefreshReg$ = () => { };
  window.$RefreshSig$ = () => (type) => type;
  window.__REACT_REFRESH_RUNTIME_INSTALLED__ = true;

  let refreshTimeout;
  window.performReactRefresh = RefreshRuntime.performReactRefresh;
  
  // Debounce refresh calls to prevent multiple rapid rerenders
  window.__debouncePerformReactRefresh = () => {
    clearTimeout(refreshTimeout);
    refreshTimeout = setTimeout(() => {
      try {
        RefreshRuntime.performReactRefresh();
      } catch (err) {
        console.warn("React Refresh failed:", err);
      }
    }, 30);
  };

  window.__isReactRefreshBoundary = (moduleExports) =>
    isReactRefreshBoundary(RefreshRuntime, moduleExports);
}`;

const BOUNDARY_CODE = `export function isReactRefreshBoundary(RefreshRuntime, moduleExports) {
  if (RefreshRuntime.isLikelyComponentType(moduleExports)) {
    return true;
  }
  if (moduleExports == null || typeof moduleExports !== "object") {
    return false;
  }

  let hasExports = false;
  let areAllExportsComponents = true;
  for (const key in moduleExports) {
    if (key === "__esModule") continue;
    hasExports = true;
    const desc = Object.getOwnPropertyDescriptor(moduleExports, key);
    if (desc && desc.get) return false;

    const exportValue = moduleExports[key];
    if (!RefreshRuntime.isLikelyComponentType(exportValue)) {
      areAllExportsComponents = false;
    }
  }

  return hasExports && areAllExportsComponents;
}`;

const CLIENT_CODE = `function reload() {
  location.reload(true);
}

let SOCKET_MESSAGE_QUEUE = [];
function _sendSocketMessage(msg) {
  socket.send(JSON.stringify(msg));
}

function sendSocketMessage(msg) {
  if (socket.readyState !== socket.OPEN) {
    SOCKET_MESSAGE_QUEUE.push(msg);
  } else {
    _sendSocketMessage(msg);
  }
}

const socketURL = window.HMR_WEBSOCKET_URL || (location.protocol === "http:" ? "ws://" : "wss://") + location.host + "/";
const socket = new WebSocket(socketURL, "esm-hmr");

socket.addEventListener("open", () => {
  SOCKET_MESSAGE_QUEUE.forEach(_sendSocketMessage);
  SOCKET_MESSAGE_QUEUE = [];
});

const REGISTERED_MODULES = {};

class HotModuleState {
  constructor(id) {
    this.id = id;
    this.acceptCallbacks = [];
    this.disposeCallbacks = [];
  }

  lock() { this.isLocked = true; }
  dispose(callback) { this.disposeCallbacks.push(callback); }
  invalidate() { reload(); }
  decline() { this.isDeclined = true; }

  accept(_deps = [], callback = true) {
    if (this.isLocked) return;
    if (!this.isAccepted) {
      sendSocketMessage({ id: this.id, type: "hotAccept" });
      this.isAccepted = true;
    }
    if (!Array.isArray(_deps)) {
      callback = _deps || callback;
      _deps = [];
    }
    this.acceptCallbacks.push({ deps: _deps, callback });
  }
}

export function createHotContext(id) {
  const existing = REGISTERED_MODULES[id];
  if (existing) {
    existing.lock();
    return existing;
  }
  const state = new HotModuleState(id);
  REGISTERED_MODULES[id] = state;
  return state;
}

async function applyUpdate(id) {
  const state = REGISTERED_MODULES[id];
  if (!state || state.isDeclined) return false;

  const acceptCallbacks = state.acceptCallbacks;
  const disposeCallbacks = state.disposeCallbacks;
  state.disposeCallbacks = [];

  disposeCallbacks.forEach((cb) => cb()); // Clean up previous hooks

  const updateID = Date.now();
  for (const { deps, callback: acceptCallback } of acceptCallbacks) {
    const url = \`/\${id.replace(/^\\/+/, "")}?mtime=\${updateID}\`;
    const [module, ...depModules] = await Promise.all([
      import(url),
      ...deps.map((d) => import(\`/\${d.replace(/^\\/+/, "")}?mtime=\${updateID}\`)),
    ]);
    acceptCallback({ module, deps: depModules });
  }
  return true;
}

socket.addEventListener("message", ({ data }) => {
  if (!data) return;
  const msg = JSON.parse(data);
  if (msg.type === "reload") {
    reload();
  } else if (msg.type === "update") {
    applyUpdate(msg.url).then((ok) => { if (!ok) reload(); }).catch(() => reload());
  }
});`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-6 w-6 text-primary text-yellow-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                ESM React Refresh & HMR
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the Hot Module Replacement spec integration, WebSocket communication systems, and React Fast Refresh boundaries.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • esbuild HMR Plugin: <code>./dinou/esbuild/react-refresh/esm-hmr-plugin.mjs</code> <br />
              • Refresh Runtime: <code>./dinou/esbuild/react-refresh/react-refresh-runtime.mjs</code> <br />
              • Boundary Checker: <code>./dinou/esbuild/react-refresh/is-react-refresh-boundary.mjs</code> <br />
              • Client WebSocket: <code>./dinou/esbuild/react-refresh/esm-hmr/client.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Hot Module Replacement (HMR) allows you to update React component definitions live in the browser without performing full window reloads. This preserves state variables (like values inside a form or counter) during design tweaks.
              </p>
            </section>

            <hr className="my-8" />

            {/* HMR LOOP */}
            <section id="hmr-loop">
              <h2>📊 Hot Module Replacement Loop</h2>
              <p>
                The sequence below shows how compilation events flow over WebSocket channels to trigger browser updates:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{HMR_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* REACT REFRESH SPEC */}
            <section id="react-refresh-spec">
              <h2>⚡ React Refresh Mechanics</h2>
              <p>
                Dinou integrates React Fast Refresh at three levels:
              </p>
              <ul>
                <li>
                  <strong>SWC Compiler Instrumentation:</strong> Every React component file is transformed by SWC with Fast Refresh code identifiers, exposing component signatures.
                </li>
                <li>
                  <strong>Module Wrapper:</strong> Chunks are wrapped in a registration boundary that sets up <code>import.meta.hot</code>.
                </li>
                <li>
                  <strong>WebSocket Broadcaster:</strong> When a file changes, the WebSocket channel triggers a live reload or targeted module swap if the file qualifies as a React Refresh Boundary.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE PLUGIN */}
            <section id="code-plugin">
              <h2>⚙️ esm-hmr-plugin.mjs</h2>
              <p>
                Below is the full, complete code of the esbuild HMR compiler orchestrator:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PLUGIN_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE RUNTIME */}
            <section id="code-runtime">
              <h2>⚙️ react-refresh-runtime.mjs</h2>
              <p>
                Below is the full, complete code of the React global hooks runtime builder:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RUNTIME_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE BOUNDARY */}
            <section id="code-boundary">
              <h2>⚙️ is-react-refresh-boundary.mjs</h2>
              <p>
                Below is the full, complete code of the boundary validator:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{BOUNDARY_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE CLIENT */}
            <section id="code-client">
              <h2>⚙️ esm-hmr/client.mjs</h2>
              <p>
                Below is the full, complete code of the client-side WebSocket listener:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_CODE}</CodeBlock>
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
