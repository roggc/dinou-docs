"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "hmr-flow", title: "📊 HMR WebSocket Flow", level: 2 },
  { id: "refresh-flow", title: "📊 React Refresh Wrap Flow", level: 2 },
  { id: "code-hmr-plugin", title: "⚙️ rollup-plugin-esm-hmr.js", level: 2 },
  { id: "code-wrap", title: "⚙️ react-refresh-wrap-modules.js", level: 2 },
  { id: "code-server", title: "⚙️ esm-hmr/server.js", level: 2 },
  { id: "code-client", title: "⚙️ esm-hmr/client.js", level: 2 },
];

const HMR_SERVER_CLIENT_DIAGRAM = `graph TD
    Start[buildStart: launch HTTP/WebSocket server on 3001] --> RegisterEngine[EsmHmrEngine]
    
    RegisterEngine --> WatchChange[watchChange: track modified file IDs]
    WatchChange --> WriteBundle[writeBundle: check if modified files accept HMR]
    
    WriteBundle -->|Accepts| Queue[Queue HMR updates]
    WriteBundle -->|Doesn't Accept| Reload[Mark full reload]
    
    Queue --> CloseBundle[closeBundle: Broadcast updates or reload via WebSocket]
    Reload --> CloseBundle`;

const REACT_REFRESH_WRAP_DIAGRAM = `graph TD
    Start[renderChunk: inspect file] --> Match[Matches .js/.jsx/.ts/.tsx?]
    Match -->|Yes| Wrap[Prepend import /refresh.js & wrap with window.$RefreshReg$]
    Match -->|No| Skip[Skip module]
    
    Wrap --> AcceptCheck[Append import.meta.hot.accept & debounce perform refresh]`;

const HMR_PLUGIN_CODE = `const fs = require("node:fs");
const path = require("node:path");
const { EsmHmrEngine } = require("./esm-hmr/server");
const { createServer } = require("node:http");

const changedIds = new Set();
const pendingUpdateUrls = new Set();
let needsFullReload = false;

function esmHmrPlugin() {
  let hmrEngine;
  let serverStarted = false;

  return {
    name: "esm-hmr",

    buildStart() {
      if (!serverStarted) {
        const server = createServer();
        hmrEngine = new EsmHmrEngine({ server });
        server.listen(3001, () => {});
        serverStarted = true;
      }
    },

    renderChunk(code, chunk) {
      if (
        !chunk.fileName.endsWith(".js") &&
        !chunk.fileName.endsWith(".jsx") &&
        !chunk.fileName.endsWith(".ts") &&
        !chunk.fileName.endsWith(".tsx")
      ) {
        return null;
      }

      const acceptsHmr = code.includes("import.meta.hot.accept");
      const imports = Array.from(code.matchAll(/import\\s+["'](.+?)["']/g)).map(
        (m) => m[1]
      );
      const normalizedId = chunk.fileName;
      hmrEngine.setEntry(normalizedId, imports, true);

      const isClientEntry = normalizedId === "main.js";

      let injectCode = "";

      if (isClientEntry && !code.includes("/__hmr_client__.js")) {
        injectCode += \`import { createHotContext } from "/__hmr_client__.js";window.__hotContext = createHotContext;\\n\`;
      }

      if (acceptsHmr) {
        const safeId = JSON.stringify(normalizedId);
        injectCode += \`if (!import.meta.hot) import.meta.hot = window.__hotContext?.(\${safeId});\\n\`;
      }

      if (injectCode) {
        code = injectCode + code;
      }

      return {
        code,
        map: null,
      };
    },

    watchChange(id) {
      changedIds.add(id);
    },

    generateBundle(options, bundle) {
      const clientPath = path.resolve(__dirname, "./esm-hmr/client.js");
      this.emitFile({
        type: "asset",
        fileName: "__hmr_client__.js",
        source: fs.readFileSync(clientPath, "utf-8"),
      });
    },

    writeBundle(_options, bundle) {
      for (const [fileName, chunkInfo] of Object.entries(bundle)) {
        for (const modulePath of Object.keys(chunkInfo.modules ?? {})) {
          if (changedIds.has(path.resolve(modulePath))) {
            const entry = hmrEngine.getEntry(fileName);
            if (entry?.isHmrAccepted) {
              pendingUpdateUrls.add(fileName);
            } else {
              needsFullReload = true;
            }
          }
        }
      }
    },

    closeBundle() {
      if (changedIds.size === 0) return;

      if (needsFullReload || pendingUpdateUrls.size === 0) {
        hmrEngine.broadcastMessage({ type: "reload" });
      } else {
        for (const url of pendingUpdateUrls) {
          hmrEngine.broadcastMessage({ type: "update", url });
        }
      }

      changedIds.clear();
      pendingUpdateUrls.clear();
      needsFullReload = false;
    },
  };
}

module.exports = {
  esmHmrPlugin,
};`;

const WRAP_CODE = `function reactRefreshWrapModules() {
  return {
    name: "react-refresh-wrap-modules",
    renderChunk(code, chunk) {
      if (
        !chunk ||
        !/\\.(jsx?|tsx?)$/.test(chunk.fileName) ||
        chunk.fileName.includes("refresh.js") ||
        chunk.fileName.includes("runtime.js") ||
        chunk.fileName.includes("_commonjsHelpers.js")
      ) {
        return null;
      }
      const safeId = JSON.stringify(chunk.fileName);
      const wrappedCode = \`
import RefreshRuntime from "/refresh.js";

let prevRefreshReg = window.$RefreshReg$;
let prevRefreshSig = window.$RefreshSig$;

window.$RefreshReg$ = (type, id) => {
  RefreshRuntime.register(type, \${safeId} + '#' + id);
};
window.$RefreshSig$ = RefreshRuntime?.createSignatureFunctionForTransform;

// --- original code ---
\${code}
// --- end original code ---

window.$RefreshReg$ = prevRefreshReg;
window.$RefreshSig$ = prevRefreshSig;

if (import.meta.hot) {
  import.meta.hot.accept();
  window.__debouncePerformReactRefresh?.();
}
\`;

      return {
        code: wrappedCode,
        map: null,
      };
    },
  };
}

module.exports = reactRefreshWrapModules;`;

const SERVER_CODE = `const WebSocket = require("ws");

const map = new Map();
const set = new Set();

class EsmHmrEngine {
  constructor(options = {}) {
    this.clients = set;
    this.dependencyTree = map;
    const wss = options.server
      ? new WebSocket.Server({ noServer: true })
      : new WebSocket.Server({ port: 3001 });

    if (options.server) {
      options.server.on("upgrade", (req, socket, head) => {
        if (req.headers["sec-websocket-protocol"] !== "esm-hmr") {
          return;
        }
        wss.handleUpgrade(req, socket, head, (client) => {
          wss.emit("connection", client, req);
        });
      });
    }

    wss.on("connection", (client) => {
      this.connectClient(client);
      this.registerListener(client);
    });
  }

  registerListener(client) {
    client.on("message", (data) => {
      const message = JSON.parse(data.toString());
      if (message.type === "hotAccept") {
        const entry = this.getEntry(message.id, true);
        entry.isHmrAccepted = true;
      }
    });
  }

  createEntry(sourceUrl) {
    const newEntry = {
      dependencies: new Set(),
      dependents: new Set(),
      needsReplacement: false,
      isHmrEnabled: false,
      isHmrAccepted: false,
    };
    this.dependencyTree.set(sourceUrl, newEntry);
    return newEntry;
  }

  getEntry(sourceUrl, createIfNotFound = false) {
    const result = this.dependencyTree.get(sourceUrl);
    if (result) return result;
    if (createIfNotFound) return this.createEntry(sourceUrl);
    return null;
  }

  setEntry(sourceUrl, imports, isHmrEnabled = false) {
    const result = this.getEntry(sourceUrl, true);
    const outdatedDependencies = new Set(result.dependencies);
    result.isHmrEnabled = isHmrEnabled;

    for (const importUrl of imports) {
      this.addRelationship(sourceUrl, importUrl);
      outdatedDependencies.delete(importUrl);
    }

    for (const importUrl of outdatedDependencies) {
      this.removeRelationship(sourceUrl, importUrl);
    }
  }

  removeRelationship(sourceUrl, importUrl) {
    const importResult = this.getEntry(importUrl);
    if (importResult) importResult.dependents.delete(sourceUrl);
    const sourceResult = this.getEntry(sourceUrl);
    if (sourceResult) sourceResult.dependencies.delete(importUrl);
  }

  addRelationship(sourceUrl, importUrl) {
    if (importUrl !== sourceUrl) {
      const importResult = this.getEntry(importUrl, true);
      importResult.dependents.add(sourceUrl);
      const sourceResult = this.getEntry(sourceUrl, true);
      sourceResult.dependencies.add(importUrl);
    }
  }

  markEntryForReplacement(entry, state) {
    entry.needsReplacement = state;
  }

  broadcastMessage(data) {
    this.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      } else {
        this.disconnectClient(client);
      }
    });
  }

  connectClient(client) {
    this.clients.add(client);
  }

  disconnectClient(client) {
    client.terminate();
    this.clients.delete(client);
  }

  disconnectAllClients() {
    for (const client of this.clients) {
      this.disconnectClient(client);
    }
  }
}

module.exports = {
  EsmHmrEngine,
};`;

const CLIENT_CODE = `function debug(...args) {
  console.log("[ESM-HMR]", ...args);
}

function reload() {
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

const socketURL =
  window.HMR_WEBSOCKET_URL ||
  (location.protocol === "http:" ? "ws://" : "wss://") + location.host + "/";
const socket = new WebSocket(socketURL, "esm-hmr");

socket.addEventListener("open", () => {
  SOCKET_MESSAGE_QUEUE.forEach(_sendSocketMessage);
  SOCKET_MESSAGE_QUEUE = [];
});

const REGISTERED_MODULES = {};

class HotModuleState {
  constructor(id) {
    this.id = id;
    this.data = {};
    this.isLocked = false;
    this.isDeclined = false;
    this.isAccepted = false;
    this.acceptCallbacks = [];
    this.disposeCallbacks = [];
  }

  lock() {
    this.isLocked = true;
  }

  dispose(callback) {
    this.disposeCallbacks.push(callback);
  }

  invalidate() {
    reload();
  }

  decline() {
    this.isDeclined = true;
  }

  accept(_deps = [], callback = true) {
    if (this.isLocked) {
      return;
    }
    if (!this.isAccepted) {
      sendSocketMessage({ id: this.id, type: "hotAccept" });
      this.isAccepted = true;
    }
    if (!Array.isArray(_deps)) {
      callback = _deps || callback;
      _deps = [];
    }
    if (callback === true) {
      callback = () => {};
    }
    const deps = _deps.map((dep) => {
      const ext = dep.split(".").pop();
      if (!ext) {
        dep += ".js";
      } else if (ext !== "js") {
        dep += ".proxy.js";
      }
      return new URL(dep, \`\${window.location.origin}\${this.id}\`).pathname;
    });
    this.acceptCallbacks.push({
      deps,
      callback,
    });
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
  if (!state || state.isDeclined) {
    return false;
  }

  const acceptCallbacks = state.acceptCallbacks;
  const disposeCallbacks = state.disposeCallbacks;
  state.disposeCallbacks = [];
  state.data = {};

  disposeCallbacks.forEach((callback) => callback());

  const updateID = Date.now();

  for (const { deps, callback: acceptCallback } of acceptCallbacks) {
    const [module, ...depModules] = await Promise.all([
      import(\`/\${id}\` + \`?mtime=\${updateID}\`),
      ...deps.map((d) => import(\`/\${d}\` + \`?mtime=\${updateID}\`)),
    ]);
    acceptCallback({ module, deps: depModules });
  }

  return true;
}

socket.addEventListener("message", ({ data: _data }) => {
  if (!_data) return;

  const data = JSON.parse(_data);

  if (data.type === "reload") {
    reload();
    return;
  }

  if (data.type !== "update") {
    return;
  }

  applyUpdate(data.url)
    .then((ok) => {
      if (!ok) {
        reload();
      }
    })
    .catch((err) => {
      console.error(err);
      reload();
    });
});

debug("listening for file changes...");`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary text-orange-600 dark:text-orange-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                ESM React Refresh & HMR
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the Rollup Hot Module Replacement (HMR) and React Refresh system configurations used in development.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • HMR Compiler: <code>./dinou/rollup/react-refresh/rollup-plugin-esm-hmr.js</code> <br />
              • Module Wrapper: <code>./dinou/rollup/react-refresh/react-refresh-wrap-modules.js</code> <br />
              • HMR WS Server: <code>./dinou/rollup/react-refresh/esm-hmr/server.js</code> <br />
              • HMR WS Client: <code>./dinou/rollup/react-refresh/esm-hmr/client.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou provides rapid hot updates during development using a custom <strong>ESM-HMR</strong> implementation.
              </p>
              <p>
                During compilation in development mode, the bundler wraps JS components with React Refresh tracking hooks and establishes a local WebSocket server (port <code>3001</code>). When you edit files, Rollup rebuilds, detects if the module accepts HMR, and broadcasts hot replacement scripts rather than performing full browser reloads.
              </p>
            </section>

            <hr className="my-8" />

            {/* HMR FLOW */}
            <section id="hmr-flow">
              <h2>📊 HMR WebSocket Flow</h2>
              <p>
                The flowchart below shows how the WebSocket channel propagates code updates from the watcher to the browser:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="650px">{HMR_SERVER_CLIENT_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* REFRESH FLOW */}
            <section id="refresh-flow">
              <h2>📊 React Refresh Wrap Flow</h2>
              <p>
                The flowchart below shows how component files are wrapped with register signatures so React can track and patch state at runtime:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="650px">{REACT_REFRESH_WRAP_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE HMR PLUGIN */}
            <section id="code-hmr-plugin">
              <h2>⚙️ rollup-plugin-esm-hmr.js</h2>
              <p>
                Below is the full code of the Rollup ESM HMR compiler plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{HMR_PLUGIN_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WRAP */}
            <section id="code-wrap">
              <h2>⚙️ react-refresh-wrap-modules.js</h2>
              <p>
                Below is the code of the module wrapper that injects React Refresh boundary declarations:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{WRAP_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE SERVER */}
            <section id="code-server">
              <h2>⚙️ esm-hmr/server.js</h2>
              <p>
                Below is the code of the HMR WebSocket server registry:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{SERVER_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE CLIENT */}
            <section id="code-client">
              <h2>⚙️ esm-hmr/client.js</h2>
              <p>
                Below is the code of the client HMR socket connection and hot module update applying engine:
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
