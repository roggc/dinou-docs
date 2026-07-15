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
                In development, when you edit a React Component, the bundler updates the client build and outputs a new <code>react-client-manifest.json</code>.
              </p>
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

              <h3>HMR Mechanics:</h3>
              <ol>
                <li>Chokidar monitors the manifest folder.</li>
                <li>When <code>react-client-manifest.json</code> updates, it parses the new keys.</li>
                <li>It recursively walks up the dependency tree, calling <code>clearRequireCache</code> for modified client and server components under your <code>src/</code> folder.</li>
                <li>Subsequent requests dynamically reload the updated code.</li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* 5. CONTEXT STATE & COOKIE INJECTION */}
            <section id="context-wrappers">
              <h2>🛡️ 5. Context State & Cookie Injection</h2>
              <p>
                Dinou provides components and server actions with a request/response context using AsyncLocalStorage (in <code>request-context.js</code>). The context is built through two primary wrappers:
              </p>

              <h3>A. Standard Request Context (<code>getContext</code>)</h3>
              <p>
                Constructs cookies, search params, and request headers. It features a safe redirect wrapper (<code>safeResCall</code>) that normalizes status codes and filters URLs to prevent open-redirect vulnerabilities.
              </p>

              <h3>B. Server Function Context (<code>getContextForServerFunctionEndpoint</code>)</h3>
              <p>
                Server actions run during POST requests, which might already be streaming HTML when you try to write a cookie. To support setting cookies at any point in the lifecycle, Dinou implements a <strong>hybrid cookie manager</strong>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`cookie: (name, value, options) => {
  // Scenario A: Headers not sent yet. Write standard cookie header.
  if (!res.headersSent) {
    res.setHeader("Content-Type", "text/x-component");
    res.cookie(name, value, options);
    return;
  }

  // Scenario B: Headers already sent (Streaming active).
  // Block HttpOnly because JavaScript running in the browser cannot write HttpOnly cookies.
  if (options && options.httpOnly) {
    console.error(\`Cannot set HttpOnly cookie '\${name}'... streaming started.\`);
    return;
  }

  // Inject a special command text block directly into the active flight stream
  const cookieStr = constructCookieString(name, value, options);
  res.write(\`D:{"type":"cookie","cookie":\${JSON.stringify(cookieStr)}}\\n\`);
}`}</CodeBlock>
              </div>

              <p>
                If headers are already flushed, standard HTTP headers cannot be set. Dinou bypasses this by streaming a custom command packet (<code>{'D:{"type":"cookie",...}'}</code>) which the client-side runtime intercepts to write document cookies programmatically.
              </p>
            </section>

            <hr className="my-8" />

            {/* 6. ROUTING & RSC ENDPOINTS */}
            <section id="routing-endpoints">
              <h2>🚀 6. Routing & RSC Endpoints</h2>
              <p>
                The Express application registers specific endpoints to orchestrate Server Actions and serve rendering streams:
              </p>

              <h3>A. Serving RSC Payloads (<code>serveRSCPayload</code>)</h3>
              <p>
                Triggered on navigation requests (e.g. <code>/____rsc_payload____</code>). It routes requests to the SSG build files (<code>rsc.rsc</code> or <code>rsc._old.rsc</code> in production) or resolves dynamic pages on-the-fly. If an ISR static build page has expired, it triggers background regeneration asynchronously.
              </p>

              <h3>B. Executing Actions (<code>POST /</code>)</h3>
              <p>
                Handles server functions triggered from the client. It:
              </p>
              <ol>
                <li>Reads the <code>x-rsc-action</code> header containing the unique action ID.</li>
                <li>Validates the action ID against the <code>serverFunctionsManifest</code> in production.</li>
                <li>Dynamically imports the target component/action module.</li>
                <li>Invokes the function within the active <code>requestStorage</code> context, passing parsed form data or JSON parameters.</li>
                <li>Streams the action return value and the updated React Server Component tree back to the client.</li>
              </ol>
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
