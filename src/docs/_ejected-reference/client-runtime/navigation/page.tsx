"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Globe, ArrowRight, Zap, RefreshCw, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "navigation-structure", title: "📊 Physical File Structure", level: 2 },
  { id: "router-context", title: "🔗 1. Router Context", level: 2 },
  { id: "client-hooks", title: "⚙️ 2. Custom Client Hooks", level: 2 },
  { id: "ssr-compatibility", title: "🌐 3. Server-Side Rendering (SSR)", level: 2 },
  { id: "navigation-utils", title: "🛠️ 4. Navigation Utilities", level: 2 },
];

const NAVIGATION_STRUCTURE_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '24px' }}}%%
graph TD
    subgraph Navigation.js Code Structure
        DefaultMock["1. RouterContext & Default Mock<br/>Creates RouterContext via createContext<br/>Default mock handles warnings on raw server calls"]
        ClientHooks["2. Custom Client Hooks<br/>useRouter: push/replace/back/forward/refresh delegates<br/>usePathname: Reads from ALS on server, RouterContext on client<br/>useSearchParams: URLSearchParams tracker<br/>useNavigationLoading: active transition pending status"]
        NavUtils["3. Navigation Utilities<br/>isExternalUrl: Detects external/special protocol URLs<br/>resolveUrl: Normalizes relative paths to standardized URL path strings"]
    end
    
    DefaultMock --> ClientHooks
    ClientHooks --> NavUtils`;

const NAVIGATION_CONTEXT_CODE = `export const RouterContext = createContext({
  url: "",
  navigate: (url) => {
    console.warn("navigate called outside Router");
  },
  isPending: false,
});`;

const NAVIGATION_HOOKS_CODE = `export function useRouter() {
  const context = useContext(RouterContext);
  if (!context) {
    return {
      push: () => {},
      replace: () => {},
      back: () => {},
      forward: () => {},
      refresh: () => {},
    };
  }

  return {
    push: (href, options) => context.navigate(href, options),
    replace: (href, options) => context.navigate(href, { replace: true, ...options }),
    back: () => context.back(),
    forward: () => context.forward(),
    refresh: () => context.refresh(),
  };
}

export function useNavigationLoading() {
  if (typeof window === "undefined") return false;
  const context = useContext(RouterContext);
  if (!context || typeof context === "string") return false;
  return context.isPending;
}`;

const NAVIGATION_SSR_CODE = `export function usePathname() {
  // SERVER LOGIC (SSR)
  if (typeof window === "undefined") {
    try {
      const dynamicRequire = typeof __dinou_require__ !== "undefined"
        ? __dinou_require__
        : typeof module !== "undefined" && typeof module.require === "function"
          ? module.require.bind(module)
          : null;
      if (dynamicRequire) {
        const { getContext } = dynamicRequire("./request-context.js");
        const ctx = getContext();
        if (ctx && ctx.req) return normalizePath(ctx.req.path);
      }
    } catch (e) {
      console.log("error getContext usePathname", e);
    }
  }

  // CLIENT LOGIC
  const context = useContext(RouterContext);
  const fullRoute = typeof context === "string" ? context : context.url;
  if (typeof fullRoute !== "string") return "";

  const path = fullRoute.split("?")[0];
  return normalizePath(path);
}`;

const NAVIGATION_UTILS_CODE = `export function isExternalUrl(href) {
  if (!href) return false;
  if (href.startsWith("//")) return true;

  if (href.includes("://")) {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
      const url = new URL(href, origin);
      return url.origin !== origin;
    } catch (e) {
      return true;
    }
  }

  if (/^[a-zA-Z0-9+-.]+:[^//]/.test(href) || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) {
    return true;
  }
  return false;
}

export function resolveUrl(href, currentPathname) {
  if (isExternalUrl(href)) return href;

  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";

  if (href.startsWith("/") || href.includes("://")) {
    const url = new URL(href, origin);
    return normalize(url.pathname + url.search + url.hash);
  }

  let base = currentPathname;
  if (!base.endsWith("/")) base += "/";

  const resolved = new URL(href, origin + base);
  return normalize(resolved.pathname + resolved.search + resolved.hash);
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Router Context & Hooks
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore how Dinou propagates route parameters, exports navigational React hooks, and maintains SSR data compatibility through isolated request context wrappers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              • Core router context & hooks: <code>./dinou/core/navigation.js</code> <br />
              • URL checkers & resolvers: <code>./dinou/core/navigation-utils.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In a Server Components ecosystem, client-side files require clean hooks to request navigation transitions, retrieve active routes, and view query parameters. Dinou implements this using the <code>RouterContext</code> context declared in <code>navigation.js</code>, coupled with helpers in <code>navigation-utils.js</code> to normalize paths and detect boundaries.
              </p>
            </section>

            <hr className="my-8" />

            {/* STRUCTURE */}
            <section id="navigation-structure">
              <h2>📊 Physical File Structure</h2>
              <p>
                The directory separates context bindings from path checkers:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="1400px">{NAVIGATION_STRUCTURE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ROUTER CONTEXT */}
            <section id="router-context">
              <h2>🔗 1. Router Context</h2>
              <p>
                The context stores the active route path string, the navigate action hook, and transition loading states:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{NAVIGATION_CONTEXT_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CLIENT HOOKS */}
            <section id="client-hooks">
              <h2>⚙️ 2. Custom Client Hooks</h2>
              <p>
                Dinou exports dedicated client-side hooks to interact with navigation state:
              </p>
              <ul>
                <li>
                  <strong><code>useRouter()</code>:</strong> Exposes programmatic methods to control history entries (<code>push</code>, <code>replace</code>, <code>back</code>, <code>forward</code>) or soft-reload components without full reloads (<code>refresh</code>).
                </li>
                <li>
                  <strong><code>useNavigationLoading()</code>:</strong> Exposes the boolean state indicating if an RSC Flight payload fetch transition is pending in the background.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{NAVIGATION_HOOKS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SSR COMPATIBILITY */}
            <section id="ssr-compatibility">
              <h2>🌐 3. Server-Side Rendering (SSR) Compatibility</h2>
              <p>
                Hooks like <code>usePathname()</code> and <code>useSearchParams()</code> must function during initial HTML render on the server, before browser window objects or contexts are initialized.
              </p>
              <p>
                Dinou solves this by adding a server-side branch inside hooks. If <code>typeof window === "undefined"</code>, they dynamically require <code>request-context.js</code> to read active route descriptors from the thread's <code>AsyncLocalStorage</code> wrapper:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{NAVIGATION_SSR_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* NAVIGATION UTILS */}
            <section id="navigation-utils">
              <h2>🛠️ 4. Navigation Utilities</h2>
              <p>
                The <code>navigation-utils.js</code> module performs pathname format adjustments and external protocol separation:
              </p>
              <ul>
                <li>
                  <strong><code>isExternalUrl(href)</code>:</strong> Detects if links point outside our application origin, or start with special protocols (such as <code>mailto:</code>, <code>tel:</code>, or <code>javascript:</code>).
                </li>
                <li>
                  <strong><code>resolveUrl(href, base)</code>:</strong> Combines relative and base path strings into absolute relative routes, ensuring trailing slashes are trimmed for matching uniformity.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{NAVIGATION_UTILS_CODE}</CodeBlock>
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
