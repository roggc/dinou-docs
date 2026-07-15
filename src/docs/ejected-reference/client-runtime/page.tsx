"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Globe, ArrowRight, Zap, RefreshCw, Cpu, Star, Settings } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "hydration-entry", title: "⚛️ 1. Hydration Entry (client.jsx)", level: 2 },
  { id: "spa-router", title: "🚏 2. Client Router & Transitions", level: 2 },
  { id: "scroll-restoration", title: "↕️ 3. Scroll Restoration & Hash Anchors", level: 2 },
  { id: "router-context", title: "📂 4. Router Navigation Context & Links", level: 2 },
  { id: "action-proxies", title: "🚀 5. Server Actions Proxy", level: 2 },
  { id: "hybrid-cookies", title: "🍪 6. Streaming Cookie Receiver", level: 2 },
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
                Client SPA & Routing
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dissect the inner mechanics of the browser-side runtime, including client hydration, history enforcers, scroll preservation, and remote action proxies.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              • Hydration entry: <code>./dinou/core/client.jsx</code> / <code>client-webpack.jsx</code> <br />
              • Navigation Hooks: <code>./dinou/core/navigation.js</code> / <code>navigation-utils.js</code> <br />
              • Anchor elements: <code>./dinou/core/link.jsx</code> <br />
              • Call proxy: <code>./dinou/core/server-function-proxy.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou provides a **Single Page Application (SPA)** user experience. On the initial request, the browser receives static, server-rendered HTML. Once loaded, standard JavaScript hydration bootstraps interactive React states, attaches global event listeners to hijack link clicks, and manages history states dynamically to stream incremental React Server Component (RSC) trees.
              </p>
            </section>

            <hr className="my-8" />

            {/* HYDRATION ENTRY */}
            <section id="hydration-entry">
              <h2>⚛️ 1. Hydration Entry (<code>client.jsx</code>)</h2>
              <p>
                The browser's entry bundling script (defined in <code>client.jsx</code>) mounts React onto the document:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`import { hydrateRoot } from "react-dom/client";

hydrateRoot(document, <Router />);`}</CodeBlock>
              </div>
              <p>
                Unlike standard client-only React mounts (which look for a single empty <code>&lt;div id="root"&gt;</code>), Dinou mounts and hydrates the **entire** HTML document context (including the <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code> tags) compiled during SSR. This ensures metadata, style assets, and scripts stay synced seamlessly.
              </p>
            </section>

            <hr className="my-8" />

            {/* SPA ROUTER */}
            <section id="spa-router">
              <h2>🚏 2. Client Router & Transitions</h2>
              <p>
                Dinou maintains a global routing state within the hydrated <code>&lt;Router /&gt;</code> component.
              </p>

              <h3>A. Fetching RSC Payload Streams</h3>
              <p>
                When you navigate, the client router fetches the binary **RSC Flight Stream** rather than request a full HTML document reload:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const getRSCPayload = (rscKey) => {
  const url = rscKey.split("::")[0];
  if (cache.has(url)) return cache.get(url); // Return memoized promise

  const payloadUrl = "/____rsc_payload____" + url;
  const promise = createFromFetch(fetch(payloadUrl), {
    callServer: async (id, args) => createServerFunctionProxy(id)(...args)
  });
  
  cache.set(url, promise); // Cache key to avoid redundant loops
  return promise;
};`}</CodeBlock>
              </div>
              <p>
                By calling <code>createFromFetch()</code> (from the RSC client runtime), the fetch stream is read incrementally, letting React stream new UI elements onto the screen.
              </p>

              <h3>B. Seamless Navigation Transitions</h3>
              <p>
                To prevent rendering stutters or white screens, route changes are wrapped inside React 19's **Transitions**:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const [isPending, startTransition] = useTransition();

const navigate = (to, options = {}) => {
  startTransition(() => {
    // 1. Evict cache if force reloading
    if (options.replace) history.replaceState(null, "", to);
    else history.pushState(null, "", to);
    
    setRoute(getCurrentRoute()); // Triggers RSC fetch
  });
};`}</CodeBlock>
              </div>
              <p>
                While the new route payload is streaming in the background, <code>isPending</code> switches to <code>true</code>. The existing page remains fully responsive and visible, allowing you to show custom progress bars or loaders until the transition finishes.
              </p>
            </section>

            <hr className="my-8" />

            {/* SCROLL RESTORATION */}
            <section id="scroll-restoration">
              <h2>↕️ 3. Scroll Restoration & Hash Anchors</h2>
              <p>
                Dinou implements manual scroll state controls inside <code>client.jsx</code>:
              </p>
              <ul>
                <li>
                  <strong>Page Resets:</strong> On regular forward navigation, the layout engine resets scroll heights to the top of the viewport (<code>window.scrollTo(0, 0)</code>).
                </li>
                <li>
                  <strong>PopState Restoration:</strong> When users navigate backward or forward using browser history keys, the router reads the scroll cache (<code>scrollCache.get(route)</code>) and restores the pixel coordinate position:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`useLayoutEffect(() => {
  requestAnimationFrame(() => {
    if (window.location.hash) return;
    if (isPopState) {
      const savedY = scrollCache.get(route);
      if (savedY !== undefined) window.scrollTo(0, savedY);
    } else {
      window.scrollTo(0, 0);
    }
  });
}, [route, isPopState]);`}</CodeBlock>
                  </div>
                </li>
                <li>
                  <strong>Hash Anchors Navigation:</strong> If the target path contains a hash identifier (e.g. <code>#overview</code>), it bypasses scroll restoration, locates the element, and scrolls it into view:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`useEffect(() => {
  const hash = window.location.hash;
  if (!hash) return;
  const id = hash.replace("#", "");
  const element = document.getElementById(id);
  if (element) element.scrollIntoView({ behavior: "auto" });
}, [route]);`}</CodeBlock>
                  </div>
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* ROUTER CONTEXT */}
            <section id="router-context">
              <h2>📂 4. Router Navigation Context & Links</h2>
              <p>
                Navigation APIs and component binds reside in <code>navigation.js</code> and <code>link.jsx</code>:
              </p>

              <h3>A. Navigation Context Provider</h3>
              <p>
                The enrutador provides a React Context containing the routing states:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`export const RouterContext = createContext({
  url: "/",
  navigate: () => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  isPending: false,
});`}</CodeBlock>
              </div>

              <h3>B. Global Interception Link Element</h3>
              <p>
                The <code>&lt;Link&gt;</code> component outputs standard HTML anchor tags (<code>&lt;a&gt;</code>) to preserve SEO crawling structures. In the browser, the global click listener intercepts clicks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const onNavigate = (e) => {
  const anchor = e.target.closest("a");
  if (!anchor || anchor.target || e.metaKey || e.ctrlKey) return; // Allow default keys (cmd/ctrl click)

  const href = anchor.getAttribute("href");
  if (isExternalUrl(href)) return; // Let browser handle external paths

  e.preventDefault(); // Intercept navigation
  navigate(href);
};`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ACTION PROXIES */}
            <section id="action-proxies">
              <h2>🚀 5. Server Actions Proxy (<code>server-function-proxy.js</code>)</h2>
              <p>
                Server Actions are defined with the <code>"use server"</code> directive. When a client triggers an action, it invokes a local proxy representing the remote method.
              </p>
              <p>
                The client-side proxy intercepts parameter values and POSTs requests to the action endpoint:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`export function createServerFunctionProxy(id) {
  return new Proxy(() => {}, {
    apply: async (_target, _thisArg, args) => {
      let body;
      const headers = { "x-server-function-call": "1" };

      if (args[0] instanceof FormData) {
        // Enforce form data serialization
        const formData = args[0];
        formData.append("__dinou_func_id", id);
        if (args.length > 1) formData.append("__dinou_args", JSON.stringify(args.slice(1)));
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({ id, args });
      }

      const res = await fetch("/____server_function____", { method: "POST", headers, body });
      // Processes response streams...
    }
  });
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* HYBRID COOKIES */}
            <section id="hybrid-cookies">
              <h2>🍪 6. Streaming Cookie Receiver</h2>
              <p>
                If a Server Action changes state or logs in a user, it may need to set credentials in a cookie. Since the action response is returned as a stream, HTTP headers might already have been sent.
              </p>
              <p>
                To handle this, Dinou's proxy reads the streamed response incrementally. If the stream contains a packet prefixed with `D:`, the proxy parses it:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`if (buffer.startsWith("D:")) {
  const payload = JSON.parse(buffer.slice(2));
  if (payload.type === "redirect") {
    executeRedirect(payload.url);
  } else if (payload.type === "cookie") {
    document.cookie = payload.cookie; // Programmatic cookie write on client
  }
}`}</CodeBlock>
              </div>
              <p>
                This allows the server to write cookies dynamically by appending instruction packets into the active stream, which the client-side proxy immediately intercepts to update browser cookies.
              </p>
            </section>

            <hr className="my-8" />

            {/* CUSTOMIZATIONS */}
            <section id="customizations">
              <h2>🛠️ Common Tweak Recipes</h2>
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 space-y-3 not-prose text-sm">
                <div>
                  <strong>1. Adjusting Scroll Transition Behavior:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can modify the scroll effect behavior in <code>core/client.jsx</code> to add smooth scrolling animations (<code>behavior: "smooth"</code>) or delay scroll resets.
                  </p>
                </div>
                <div>
                  <strong>2. Adding Custom Transition Spinners:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    Consume the <code>isPending</code> property exposed by <code>useRouter()</code> in your page components to render progress loaders or global spinners during slow RSC fetches.
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
