"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { ArrowRight, HelpCircle, Server, GitMerge } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "redirect-flow", title: "📊 Redirect Engine Flow", level: 2 },
  { id: "suspense-redirects", title: "⚡ React Suspense Redirects", level: 2 },
  { id: "code-walkthrough-server", title: "⚙️ Server Code (redirect.jsx)", level: 2 },
  { id: "code-walkthrough-client", title: "⚙️ Client Code (client-redirect.jsx)", level: 2 },
];

const REDIRECT_DIAGRAM = `graph TD
    Start[redirect destination] --> ServerCheck{Are we on the Server?}
    ServerCheck -->|Yes| ContextCheck[Get requestContext]
    ContextCheck --> HeadersCheck{Headers already sent?}
    HeadersCheck -->|No| RedirectExpress[res.redirect Express 307]
    HeadersCheck -->|Yes| FallbackClient[Return ClientRedirect component]
    ServerCheck -->|No| FallbackClient
    RedirectExpress --> FallbackClient
    FallbackClient --> BrowserCheck{Are we in the Browser?}
    BrowserCheck -->|Yes| Navigate[window.__DINOU_ROUTER_NAVIGATE__]
    Navigate --> Suspense[React Suspense Intercept: throw pending Promise]`;

const REDIRECT_SERVER_CODE = `import { ClientRedirect } from "./client-redirect.jsx";

/**
 * Universal redirection function.
 * Use it with 'return': return redirect('/login');
 */
export function redirect(destination) {
  // 1. If executing on the Server-side
  if (typeof window === "undefined") {
    const dynamicRequire =
      typeof __dinou_require__ !== "undefined"
        ? __dinou_require__
        : typeof module !== "undefined" && typeof module.require === "function"
          ? module.require.bind(module)
          : null;
          
    if (dynamicRequire) {
      const { getContext } = dynamicRequire("./request-context.js");
      const ctx = getContext();

      // 2. If HTTP headers have NOT been sent yet, trigger a native 302/307 redirect.
      // This is optimal for SEO crawls and hard navigations.
      if (ctx && ctx.res) {
        ctx.res.redirect(destination);
        return <ClientRedirect to={destination} />;
      }
    }
  }

  // 3. Fallback: If headers are already sent, or if executing on the client,
  // return the ClientRedirect component.
  return <ClientRedirect to={destination} />;
}`;

const REDIRECT_CLIENT_CODE = `// dinou/core/client-redirect.jsx
"use client";

import { useRouter } from "./navigation.js";

export function ClientRedirect({ to }) {
  const router = useRouter();

  if (typeof window !== "undefined") {
    // 1. Queue navigation task in a microtask
    Promise.resolve().then(() => {
      if (window.__DINOU_ROUTER_NAVIGATE__) {
        window.__DINOU_ROUTER_NAVIGATE__(to, { replace: true });
      } else {
        router.replace(to);
      }
    });
    
    // 2. Suspends React to prevent rendering intermediate stale page states
    throw new Promise(() => {});
  }

  return null;
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <ArrowRight className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Redirect Engine (redirect.jsx / client-redirect.jsx)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the server HTTP redirection handler, client SPA router interceptors, and React Suspense render block triggers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • Server Redirect: <code>./dinou/core/redirect.jsx</code> <br />
              • Client Redirect: <code>./dinou/core/client-redirect.jsx</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Redirecting users is an essential feature of routing systems. In hybrid architectures (combining Server Components and Single Page Application clients), redirection must be handled at both levels:
              </p>
              <ul>
                <li><strong>On the Server:</strong> If the user performs a hard load (e.g. hitting an authorized URL without log cookies), the server should return a native <code>302/307 Redirect</code> header instantly.</li>
                <li><strong>During Hydration or Navigation:</strong> If a component redirects dynamically after headers have been sent, the framework must trigger client-side SPA routing without reloading the browser.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* REDIRECT FLOW */}
            <section id="redirect-flow">
              <h2>📊 Redirect Engine Flow</h2>
              <p>
                The flowchart below traces the redirect resolution checks from server context detection to client suspense interception:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{REDIRECT_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SUSPENSE REDIRECTS */}
            <section id="suspense-redirects">
              <h2>⚡ React Suspense Redirects</h2>
              <p>
                A challenge in client-side redirections is preventing React from committing a half-rendered, broken page layout during the route swap.
              </p>
              <p>
                Dinou solves this using **React Suspense Interception**:
              </p>
              <ol>
                <li>
                  <strong>Queue Router Task:</strong> Invokes <code>router.replace(to)</code> inside a microtask (<code>Promise.resolve().then(...)</code>) to trigger client-side navigation.
                </li>
                <li>
                  <strong>Suspend Render:</strong> Immediately executes <code>throw new Promise(() =&gt; {})</code>. Because a pending promise is thrown, React suspends rendering of this branch.
                </li>
                <li>
                  <strong>Page Transition:</strong> React stops rendering the current route and waits. The queued microtask fires, changing the router state and mounting the target page cleanly without displaying layout flicker.
                </li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH SERVER */}
            <section id="code-walkthrough-server">
              <h2>⚙️ Server Code (redirect.jsx)</h2>
              <p>
                Below is the code for the server-side orchestrator <code>redirect.jsx</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{REDIRECT_SERVER_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH CLIENT */}
            <section id="code-walkthrough-client">
              <h2>⚙️ Client Code (client-redirect.jsx)</h2>
              <p>
                Below is the code for the client-side component <code>client-redirect.jsx</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{REDIRECT_CLIENT_CODE}</CodeBlock>
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
