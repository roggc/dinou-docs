"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Globe, ArrowRight, Zap, RefreshCw, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "client-structure", title: "📊 Physical File Structure", level: 2 },
  { id: "imports-core", title: "🔗 1. Imports & Core Modules", level: 2 },
  { id: "global-state", title: "💾 2. Global Module State", level: 2 },
  { id: "pure-helpers", title: "⚙️ 3. Pure Helpers & RSC Fetches", level: 2 },
  { id: "router-component", title: "🚏 4. The Router Component", level: 2 },
  { id: "webpack-variant", title: "📦 Webpack Variant (client-webpack.jsx)", level: 2 },
];

const CLIENT_STRUCTURE_DIAGRAM = `graph TD
    subgraph Client.jsx Code Structure
        Imports[1. Imports & Core Modules<br/>React hooks, hydrateRoot, RouterContext, resolveUrl/isExternalUrl, serverFunctionProxy<br/>ESM vs Webpack client libraries]
        GlobalState[2. Global Module State & Variables<br/>cache: Cache map for RSC payload promises<br/>scrollCache: Map storing vertical scroll position coordinates<br/>getCurrentRoute: Helper returning path & query]
        Helpers[3. Pure Helper Functions<br/>isHashChangeOnly: Detects hash navigation<br/>getRSCPayload: Fetches RSC stream, handles redirects<br/>getErrorRSCPayload: POST to fetch error layout flight stream]
        ErrorBound[4. ErrorBoundary Component<br/>Catches client-side rendering exceptions<br/>Renders styled traceback overlay or message]
        RouterComp[5. Router Component & Hydration Entry<br/>useState trackers: route, isPopState, version, navError<br/>navigate: startTransition SPA transition enforcer<br/>popstate / click listeners, scroll restoration<br/>hydrateRoot entry point]
    end
    
    Imports --> GlobalState
    GlobalState --> Helpers
    Helpers --> ErrorBound
    ErrorBound --> RouterComp`;

const CLIENT_IMPORTS_CODE = `import {
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

const CLIENT_GLOBAL_STATE_CODE = `const cache = new Map();
const scrollCache = new Map();

const getCurrentRoute = () => window.location.pathname + window.location.search;`;

const CLIENT_PURE_HELPERS_CODE = `const isHashChangeOnly = (finalPath) => {
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

  let payloadUrl;
  if (window.__DINOU_USE_OLD_RSC__ || window.__DINOU_USE_STATIC__) {
    payloadUrl = window.__DINOU_USE_OLD_RSC__
      ? window.__DINOU_USE_STATIC__
        ? "/____rsc_payload_old_static____" + url
        : "/____rsc_payload_old____" + url
      : window.__DINOU_USE_STATIC__
        ? "/____rsc_payload_static____" + url
        : "/____rsc_payload____" + url;
    window.__DINOU_USE_OLD_RSC__ = false;
    window.__DINOU_USE_STATIC__ = false;
  } else {
    payloadUrl = "/____rsc_payload____" + url;
  }

  const buildId = window.__DINOU_BUILD_ID__;
  if (buildId) {
    payloadUrl += (payloadUrl.includes("?") ? "&" : "?") + "buildId=" + buildId;
    window.__DINOU_BUILD_ID__ = undefined;
  }

  const promise = createFromFetch(
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
  cache.set(url, promise);
  return promise;
};`;

const CLIENT_ROUTER_COMPONENT_CODE = `function Router() {
  const [route, setRoute] = useState(getCurrentRoute());
  const [isPopState, setIsPopState] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [version, setVersion] = useState(0);
  const [navError, setNavError] = useState(null);

  const navigate = (href, options = {}) => {
    const finalPath = resolveUrl(href, window.location.pathname);
    if (isHashChangeOnly(finalPath)) {
      if (options.replace) history.replaceState(null, "", finalPath);
      else history.pushState(null, "", finalPath);
      const hash = new URL(finalPath, window.location.origin).hash;
      const element = document.getElementById(hash.replace("#", ""));
      if (element) element.scrollIntoView({ behavior: "auto" });
      return;
    }
    if (options.fresh) cache.delete(finalPath);

    scrollCache.set(window.location.pathname + window.location.search, window.scrollY);
    if (options.replace) history.replaceState(null, "", finalPath);
    else history.pushState(null, "", finalPath);

    startTransition(() => {
      setIsPopState(false);
      setRoute(finalPath);
      setNavError(null);
    });
  };

  // Expose hooks & Hijack click/popstate...
  // Scroll Restoration useLayoutEffect logic...
  
  const rscKey = route + "::" + version;
  const content = navError ? getErrorRSCPayload(route, navError) : getRSCPayload(rscKey);

  const contextValue = useMemo(() => ({
    url: route, navigate, back: () => history.back(), forward: () => history.forward(),
    refresh: () => { cache.delete(route); startTransition(() => setVersion(v => v + 1)); },
    isPending
  }), [route, isPending]);

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
                SPA Hydration (client.jsx)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore the core client hydration entrypoint that bootstraps the Dinou SPA router and handles transition animations, scroll restoration, and cache mappings.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/client.jsx</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                The <code>client.jsx</code> module is the browser-side application loader. It hydrates the React component tree over the pre-rendered HTML document, initializes the dynamic client router context, listens for browser navigation events, and coordinates Server Functions executions.
              </p>
            </section>

            <hr className="my-8" />

            {/* STRUCTURE */}
            <section id="client-structure">
              <h2>📊 Physical File Structure</h2>
              <p>
                The file defines helper cache stores, RSC fetch wrappers, and the hydration entry:
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
                The script pulls in core React hydration hooks, the RSC stream deserializer <code>createFromFetch</code>, the global <code>RouterContext</code> context, path utility helper functions, and the remote Function proxy binder:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_IMPORTS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* GLOBAL STATE */}
            <section id="global-state">
              <h2>💾 2. Global Module State</h2>
              <p>
                To coordinate transitions without memory leaks or duplicate rendering cycles, several static cache variables are initialized at the module-level scope:
              </p>
              <ul>
                <li>
                  <strong><code>cache</code>:</strong> A map storing the URL path strings to active Flight payload request promises. This is key to preventing React from launching infinite network loops on component evaluation.
                </li>
                <li>
                  <strong><code>scrollCache</code>:</strong> Stores the vertical scroll offset pixel coordinate for each visited path. This allows the layout engine to recover scroll coordinates on browser history PopState movements.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_GLOBAL_STATE_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PURE HELPERS */}
            <section id="pure-helpers">
              <h2>⚙️ 3. Pure Helpers & RSC Fetches</h2>
              <p>
                Defines helper methods that analyze URL paths and construct fetch requests:
              </p>
              <ul>
                <li>
                  <strong><code>isHashChangeOnly(finalPath)</code>:</strong> Compares the target path to the current URL pathname and search parameters. If only the hash (anchor fragment id) changes, it bypasses network actions, allowing standard browser scroll behavior.
                </li>
                <li>
                  <strong><code>getRSCPayload(rscKey, isPrefetch)</code>:</strong> Performs the GET request to <code>/____rsc_payload____</code> to fetch the server-rendered component Flight binary. It parses special headers like <code>x-rsc-redirect</code> (triggering redirection replacements) and wraps the response with React's <code>createFromFetch</code> parser.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_PURE_HELPERS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ROUTER COMPONENT */}
            <section id="router-component">
              <h2>🚏 4. The Router Component</h2>
              <p>
                The root component mounts the <code>RouterContext.Provider</code>, coordinates navigation transitions, intercepts click captures, and triggers DOM hydration:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CLIENT_ROUTER_COMPONENT_CODE}</CodeBlock>
              </div>

              <h4>Core Router Mechanics</h4>
              <ul>
                <li>
                  <strong>Click hijacking:</strong> Registers a global listener that captures left-clicks on standard links, checking if they are relative workspace routes. If valid, it invokes <code>preventDefault()</code> and forwards the path to the <code>navigate()</code> handler.
                </li>
                <li>
                  <strong>React Transitions:</strong> Path updates are wrapped in React 19's <code>startTransition</code>. While the new Flight stream compiles, the layout states remain active (reducing visual stutters).
                </li>
                <li>
                  <strong>Hydration Bootstrap:</strong> Calls React's <code>hydrateRoot(document, &lt;Router /&gt;)</code> to take ownership of the DOM root without requiring parent wrap tags.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* WEBPACK VARIANT */}
            <section id="webpack-variant">
              <h2>📦 Webpack Variant (<code>client-webpack.jsx</code>)</h2>
              <p>
                When using Webpack instead of Rollup/ESM as the bundle builder, Dinou swaps the hydration entry to <code>client-webpack.jsx</code>.
              </p>
              <p>
                <strong>The Only Difference:</strong> While <code>client.jsx</code> loads React Server DOM ESM modules, the Webpack variant loads Webpack's client parser bindings:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// In client-webpack.jsx
import { createFromFetch } from "react-server-dom-webpack/client";
import { createServerFunctionProxy } from "./server-function-proxy-webpack.js";`}</CodeBlock>
              </div>
              <p>
                This ensures compatibility with Webpack's module ID resolve matrices while preserving the exact same layout tree, routing transition, and scroll caching logic.
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
