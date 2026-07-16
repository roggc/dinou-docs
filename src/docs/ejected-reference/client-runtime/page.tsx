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
              • Hydration entries: <code>./dinou/core/client.jsx</code> / <code>client-error.jsx</code> (and Webpack variants) <br />
              • Navigation Hooks: <code>./dinou/core/navigation.js</code> / <code>navigation-utils.js</code> <br />
              • Anchor elements: <code>./dinou/core/link.jsx</code> <br />
              • Call proxy: <code>./dinou/core/server-function-proxy.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou provides a <strong>Single Page Application (SPA)</strong> user experience. On the initial request, the browser receives static, server-rendered HTML. Once loaded, standard JavaScript hydration bootstraps interactive React states, attaches global event listeners to hijack link clicks, and manages history states dynamically to stream incremental React Server Component (RSC) trees.
              </p>
            </section>

            <hr className="my-8" />

            {/* HYDRATION ENTRY */}
            <section id="hydration-entry">
              <h2>⚛️ 1. Hydration Entry (<code>client.jsx</code> & <code>client-error.jsx</code>)</h2>
              <p>
                Dinou hydrates the <strong>entire</strong> HTML document context (including <code>&lt;html&gt;</code>, <code>&lt;head&gt;</code>, and <code>&lt;body&gt;</code> tags) compiled during SSR. To optimize client bundle sizes, Dinou isolates successful flows and error recovery flows into two separate entrypoint runtimes. 
              </p>
              <blockquote>
                <strong>Source vs. Compiled Bundles:</strong><br />
                • <code>client.jsx</code> is the source file compiled by the bundler (Rollup/Webpack) to generate the production-ready client bundle <code>main.js</code>.<br />
                • <code>client-error.jsx</code> is the source file compiled by the bundler to generate the recovery client bundle <code>error.js</code>.
              </blockquote>

              <h3>A. Success Hydration Bundle (<code>client.jsx</code> / <code>main.js</code>)</h3>
              <p>
                For standard browser loads where components compile successfully on the server, Dinou injects the compiled <code>main.js</code> hydration script. This bootstrap file uses the standard GET route to retrieve initial RSC payloads:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// In client.jsx - standard RSC fetch
const payloadUrl = "/____rsc_payload____" + url;
const promise = createFromFetch(fetch(payloadUrl));`}</CodeBlock>
              </div>

              <h3>B. Error Recovery Hydration Bundle (<code>client-error.jsx</code> / <code>error.js</code>)</h3>
              <p>
                If the server crashes or encounters rendering exceptions during SSR, it streams a fallback error wrapper layout to the browser and hooks the compiled <code>error.js</code> hydration bundle.
              </p>
              <p>
                Because no valid RSC binary exists on disk for a crashed route, the error runtime cannot perform a standard GET request. Instead, it reads the error details injected by the server into global window objects and sends them back to the server using a <strong>POST request</strong> to compile the error component:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// In client-error.jsx - error payload hydration
let isInitialErrorLoad = true;

const getRSCPayload = (rscKey) => {
  const url = rscKey.split("::")[0];
  if (cache.has(url)) return cache.get(url);

  let promise;
  if (isInitialErrorLoad && url === getCurrentRoute()) {
    isInitialErrorLoad = false;
    const payloadUrl = "/____rsc_payload_error____" + url;
    
    promise = createFromFetch(
      fetch(payloadUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: {
            message: window.__DINOU_ERROR_MESSAGE__ || "Unknown Error",
            stack: window.__DINOU_ERROR_STACK__,
            name: window.__DINOU_ERROR_NAME__,
          },
        }),
      })
    );
  } else {
    // Falls back to standard GET payloads if the user navigates away
    promise = createFromFetch(fetch("/____rsc_payload____" + url));
  }
  
  cache.set(url, promise);
  return promise;
};`}</CodeBlock>
              </div>
              <p>
                <strong>The <code>isInitialErrorLoad</code> Gate:</strong> This flag ensures the POST request is only triggered once to hydrate the initial crash view. If the user subsequently clicks a link to navigate away, the flag evaluates to <code>false</code>, causing the runtime to fall back to the standard GET behavior, restoring SPA transitions.
              </p>

              <h3>C. Why Separate the Runtimes? (The Tradeoffs of a Single-File Approach)</h3>
              <p>
                Technically, Dinou could have combined both runtimes into a single <code>client.jsx</code> file using runtime conditionals (e.g., checking for the presence of <code>window.__DINOU_ERROR_MESSAGE__</code>). However, doing so introduces several significant drawbacks:
              </p>
              <ul>
                <li>
                  <strong>Production Bundle Bloat:</strong> If unified, every single successful visit would download, parse, and evaluate logic dedicated exclusively to server crash recovery (such as handling POST bodies for error streams and mapping stack traces). In modern web performance, keeping the primary bundle (<code>main.js</code>) free of dead code is critical.
                </li>
                <li>
                  <strong>Separation of Concerns (SoC):</strong> The two files manage fundamentally different lifecycles. <code>client.jsx</code> handles dynamic cookies from Server Actions, smooth SPA page transitions, and ISR cache revalidations. Conversely, <code>client-error.jsx</code> is dedicated to reporting server exceptions, POSTing crash details to <code>/____rsc_payload_error____</code>, and mounting the visual error overlay.
                </li>
                <li>
                  <strong>Hydration Mismatch Prevention:</strong> React 19 expects the server-rendered HTML nodes to match the client-side JSX structure exactly during hydration. Combining both runtimes would require complex synchronous checks before calling <code>hydrateRoot</code> to determine the active DOM layout. Any delay or failure in this check would trigger a React Hydration Mismatch, forcing the browser to discard the server HTML and repaint the UI from scratch.
                </li>
                <li>
                  <strong>Security & Environment Boundaries:</strong> In production, detailed stack traces should be suppressed to prevent database or directory schema leaks. Separating the runtimes allows the framework to build a stripped-down, secure version of <code>error.js</code> for production environments while keeping <code>main.js</code> unaffected.
                </li>
              </ul>

              <h3>D. Bundler Entrypoint Mapping</h3>
              <p>
                Both <code>main.js</code> and <code>error.js</code> files are generated directly by Dinou's build plugins. In <code>rollup.config.js</code> and <code>esbuild/build.mjs</code>, the framework defines separate input entrypoints:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// rollup.config.js
input: {
  main: path.resolve(__dirname, "../core/client.jsx"),
  error: path.resolve(__dirname, "../core/client-error.jsx"),
},
output: {
  dir: outputDirectory, // e.g. dist3
  format: "esm",
  entryFileNames: isDevelopment ? "[name].js" : "[name]-[hash].js",
}`}</CodeBlock>
              </div>
              <p>
                <strong>Build Output Mapping:</strong>
              </p>
              <ul>
                <li>The entry key <code>main</code> compiles <code>client.jsx</code> (standard app mounting) to <code>main.js</code> (or <code>main-[hash].js</code> in production).</li>
                <li>The entry key <code>error</code> compiles <code>client-error.jsx</code> (error payload loader) to <code>error.js</code> (or <code>error-[hash].js</code> in production).</li>
              </ul>
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
                When you navigate, the client router fetches the binary <strong>RSC Flight Stream</strong> rather than request a full HTML document reload:
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
                To prevent rendering stutters or white screens, route changes are wrapped inside React 19's <strong>Transitions</strong>:
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
