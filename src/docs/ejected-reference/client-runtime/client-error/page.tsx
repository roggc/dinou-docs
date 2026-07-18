"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Globe, ArrowRight, Zap, RefreshCw, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "client-structure", title: "📊 Physical File Structure", level: 2 },
  { id: "imports-core", title: "🔗 1. Imports & Core Modules", level: 2 },
  { id: "global-state", title: "💾 2. Global Module State", level: 2 },
  { id: "pure-helpers", title: "⚙️ 3. Pure Helpers & Error Hydration", level: 2 },
  { id: "router-component", title: "🚏 4. The Router Component", level: 2 },
  { id: "webpack-variant", title: "📦 Webpack Variant (client-error-webpack.jsx)", level: 2 },
];

const CLIENT_STRUCTURE_DIAGRAM = `graph TD
    subgraph Client-Error.jsx Code Structure
        Imports[1. Imports & Core Modules<br/>Identical to client.jsx React, hydrateRoot, RouterContext, server-function-proxy]
        GlobalState[2. Global Module State & Variables<br/>cache, scrollCache, getCurrentRoute<br/>isInitialErrorLoad = true: Flag to identify first load after crash]
        Helpers[3. Pure Helper Functions & Error-Hydration Fetching<br/>isHashChangeOnly: Detects hash navigation<br/>getRSCPayload: Intercepts initial load. If crash, POSTs crash details to /____rsc_payload_error____. Else normal GET<br/>getErrorRSCPayload: Handles subsequent navigations error rendering]
        RouterComp[4. ErrorBoundary & Router Layout Components<br/>ErrorBoundary, Router component mount, transitions, popstate observers, scroll restore, and hydrateRoot bootstrapping]
    end
    
    Imports --> GlobalState
    GlobalState --> Helpers
    Helpers --> RouterComp`;

const CLIENT_ERROR_IMPORTS_CODE = `import {
  use,
  useState,
  useEffect,
  useTransition,
  useLayoutEffect,
  useMemo,
  Component,
} from "react";
import { createFromFetch } from "@roggc/react-server-dom-esm/client";
import { hydrateRoot } from "react-dom/client";
import { RouterContext } from "./navigation.js";
import { resolveUrl, isExternalUrl } from "./navigation-utils.js";
import { createServerFunctionProxy } from "./server-function-proxy.js";`;

const CLIENT_ERROR_GLOBAL_STATE_CODE = `const cache = new Map();
const scrollCache = new Map();

const getCurrentRoute = () => window.location.pathname + window.location.search;

// CRITICAL FLAG: Identifies first render hydration after a crash
let isInitialErrorLoad = true;`;

const CLIENT_ERROR_PURE_HELPERS_CODE = `const isHashChangeOnly = (finalPath) => {
  const targetUrl = new URL(finalPath, window.location.origin);
  const normalize = (p) => p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
  const targetPath = normalize(targetUrl.pathname);
  const currentPath = normalize(window.location.pathname);

  return (
    targetPath + targetUrl.search === currentPath + window.location.search &&
    targetUrl.hash !== ""
  );
};

const getRSCPayload = (rscKey, isPrefetch = false) => {
  const url = rscKey.split("::")[0];
  if (cache.has(url)) return cache.get(url);

  let promise;
  // --- ⚠️ Initial Load POST Interception
  if (isInitialErrorLoad && url === getCurrentRoute()) {
    isInitialErrorLoad = false;
    const payloadUrl = "/____rsc_payload_error____" + url;
    promise = createFromFetch(
      fetch(payloadUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          error: {
            message: window.__DINOU_ERROR_MESSAGE__ || "Unknown Error",
            stack: window.__DINOU_ERROR_STACK__,
            name: window.__DINOU_ERROR_NAME__,
          },
        }),
      }).then((res) => {
        if (res.headers.has("x-rsc-redirect")) {
          const redirectUrl = res.headers.get("x-rsc-redirect");
          cache.delete(url);
          if (!isPrefetch) {
            if (window.__DINOU_ROUTER_NAVIGATE__) {
              window.__DINOU_ROUTER_NAVIGATE__(redirectUrl, { replace: true });
            } else {
              window.location.href = redirectUrl;
            }
          }
          return new Promise(() => {});
        }
        return res;
      }),
      {
        callServer: async (id, args) => createServerFunctionProxy(id)(...args)
      }
    );
  } else {
    // --- 🟢 Recovery Complete: Fallback to standard GET requests on navigation
    let payloadUrl = "/____rsc_payload____" + url;
    const buildId = window.__DINOU_BUILD_ID__;
    if (buildId) {
      payloadUrl += (payloadUrl.includes("?") ? "&" : "?") + "buildId=" + buildId;
      window.__DINOU_BUILD_ID__ = undefined;
    }

    promise = createFromFetch(
      fetch(payloadUrl).then((res) => {
        if (res.headers.has("x-rsc-redirect")) {
          const redirectUrl = res.headers.get("x-rsc-redirect");
          cache.delete(url);
          if (!isPrefetch) {
            if (window.__DINOU_ROUTER_NAVIGATE__) {
              window.__DINOU_ROUTER_NAVIGATE__(redirectUrl, { replace: true });
            } else {
              window.location.href = redirectUrl;
            }
          }
          return new Promise(() => {});
        }
        return res;
      }),
      {
        callServer: async (id, args) => createServerFunctionProxy(id)(...args)
      }
    );
  }

  cache.set(url, promise);
  return promise;
};`;

const CLIENT_ERROR_ROUTER_COMPONENT_CODE = `// Structure matches client.jsx Router component:
function Router() {
  const [route, setRoute] = useState(getCurrentRoute());
  const [isPopState, setIsPopState] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [version, setVersion] = useState(0);
  const [navError, setNavError] = useState(null);

  // navigate(), context bindings, scroll restorers...
  // RSC payload resolve routing content:
  const rscKey = route + "::" + version;
  const content = navError ? getErrorRSCPayload(route, navError) : getRSCPayload(rscKey);

  return (
    <RouterContext.Provider value={contextValue}>
      <ErrorBoundary key={navError ? "error" : "normal"} onError={setNavError}>
        {use(content)}
      </ErrorBoundary>
    </RouterContext.Provider>
  );
}

hydrateRoot(document, <Router />);`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Recovery Hydration (client-error.jsx)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand how Dinou bootstraps client-side error recovery using POST payload intercepts, allowing developers to inspect trace overlays without losing SPA transition contexts.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/client-error.jsx</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                The <code>client-error.jsx</code> entrypoint targets the compilation of the <code>error.js</code> client script. When the server crashes during initial HTML rendering, it streams fallback error layouts, registers exception details, and registers the <code>error.js</code> file as the hydration runtime.
              </p>
            </section>

            <hr className="my-8" />

            {/* STRUCTURE */}
            <section id="client-structure">
              <h2>📊 Physical File Structure</h2>
              <p>
                The module layout structures error-initialization flags and intercept routines:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="1200px">{CLIENT_STRUCTURE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* IMPORTS & CORE */}
            <section id="imports-core">
              <h2>🔗 1. Imports & Core Modules</h2>
              <p>
                The module imports core modules identical to the standard hydration client:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_ERROR_IMPORTS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* GLOBAL STATE */}
            <section id="global-state">
              <h2>💾 2. Global Module State</h2>
              <p>
                In addition to <code>cache</code> and <code>scrollCache</code> maps, the global scope defines an error gate:
              </p>
              <ul>
                <li>
                  <strong><code>isInitialErrorLoad</code>:</strong> A boolean flag initialized to <code>true</code>. It ensures that the initial request payload is intercepted and processed as a POST request to send server-rendered crash data.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_ERROR_GLOBAL_STATE_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PURE HELPERS */}
            <section id="pure-helpers">
              <h2>⚙️ 3. Pure Helpers & Error Hydration</h2>
              <p>
                The <code>getRSCPayload()</code> function is customized to intercept initial loading on crashed routes:
              </p>
              <ul>
                <li>
                  <strong>The POST Interception:</strong> If <code>isInitialErrorLoad</code> is true and the target path equals the current URL, the function immediately sets <code>isInitialErrorLoad = false</code>. Instead of a normal GET request, it fires an HTTP POST request to <code>/____rsc_payload_error____</code>, packaging the error details from global window states (<code>window.__DINOU_ERROR_MESSAGE__</code>, etc.) into the request body.
                </li>
                <li>
                  <strong>Standard GET Fallback:</strong> If the user navigates away by clicking a links or history popstates, the flag evaluates to <code>false</code>. Subsequent network operations resolve using standard GET paths to <code>/____rsc_payload____</code>, restoring smooth SPA flows.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_ERROR_PURE_HELPERS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ROUTER COMPONENT */}
            <section id="router-component">
              <h2>🚏 4. The Router Component</h2>
              <p>
                Bootstraps the application similarly to the primary router, mounting custom contexts and hydration hooks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_ERROR_ROUTER_COMPONENT_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* WEBPACK VARIANT */}
            <section id="webpack-variant">
              <h2>📦 Webpack Variant (<code>client-error-webpack.jsx</code>)</h2>
              <p>
                Like standard hydration, when the Webpack build tool is active, the bundler maps input targets to <code>client-error-webpack.jsx</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// In client-error-webpack.jsx
import { createFromFetch } from "react-server-dom-webpack/client";
import { createServerFunctionProxy } from "./server-function-proxy-webpack.js";`}</CodeBlock>
              </div>
              <p>
                It retains the exact same POST body payload overrides and <code>isInitialErrorLoad</code> gates while resolving Client Component symbols using Webpack's module registers.
              </p>
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
