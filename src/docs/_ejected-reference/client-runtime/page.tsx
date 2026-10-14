"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Globe, ArrowRight, Zap, RefreshCw, Cpu, Star, Settings, FileText } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "files-architecture", title: "📂 Subsystem Files & Architecture", level: 2 },
  { id: "success-vs-error", title: "⚖️ Success vs. Error Hydration", level: 2 },
  { id: "why-separate", title: "❓ Why Separate Hydration Entries?", level: 2 },
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
                Client & Routing Overview
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand how Dinou handles the browser-side SPA runtime, routing pipelines, navigation states, and the separation of success and error hydration lifecycles.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Client Subsystem Paths:</strong> <br />
              • Success Hydration Entry: <code>./dinou/core/client.jsx</code> / <code>client-webpack.jsx</code> <br />
              • Recovery Hydration Entry: <code>./dinou/core/client-error.jsx</code> / <code>client-error-webpack.jsx</code> <br />
              • Router Context & Hooks: <code>./dinou/core/navigation.js</code> / <code>navigation-utils.js</code> <br />
              • Link Click Hijacking: <code>./dinou/core/link.jsx</code> <br />
              • Server Functions Connection: <code>./dinou/core/server-function-proxy.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou provides a <strong>Single Page Application (SPA)</strong> user experience. When a browser requests a page, the server streams pre-rendered HTML. Once loaded, browser-side JavaScript hydrates the document nodes, hooks the router navigation context, intercepts anchor clicks to bypass browser reloads, and fetches incremental React Server Component (RSC) Flight streams dynamically to update the viewport.
              </p>
              <p>
                To maintain optimized performance and avoid hydration mismatches, Dinou separates standard client operations from crash recovery flows using two distinct runtime systems:
              </p>
              <ul>
                <li>
                  <strong>SPA Hydration (<code>client.jsx</code>)</strong>: Bootstrapped on successful page loads. It handles normal navigation transitions, scroll restoration, history state tracking, and Server Functions proxies.
                </li>
                <li>
                  <strong>Recovery Hydration (<code>client-error.jsx</code>)</strong>: Bootstrapped only when the server encounters a crash or compilation error during SSR. It displays the crash stack overlay, posts trace details back to the compiler, and provides mechanisms to safely navigate back to working states.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* FILES ARCHITECTURE */}
            <section id="files-architecture">
              <h2>📂 Subsystem Files & Architecture</h2>
              <p>
                The Client & Routing subsystem consists of several tightly integrated files:
              </p>

              <div className="space-y-4 my-6">
                <div className="border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/40">
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <FileText className="h-4 w-4 text-blue-500" />
                    1. Hydration Entries (<code>client.jsx</code> & <code>client-error.jsx</code>)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    These serve as the main compilation targets for bundlers, outputting <code>main.js</code> and <code>error.js</code> respectively. They invoke React 19's <code>hydrateRoot</code> to take ownership of the DOM.
                  </p>
                </div>

                <div className="border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/40">
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Globe className="h-4 w-4 text-emerald-500" />
                    2. Navigation context (<code>navigation.js</code> & <code>navigation-utils.js</code>)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Defines the <code>RouterContext</code> that propagates the current route path and transition state down the React component tree. It exports standard hooks like <code>useRouter()</code>, <code>usePathname()</code>, <code>useSearchParams()</code>, and <code>useNavigationLoading()</code>.
                  </p>
                </div>

                <div className="border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/40">
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Zap className="h-4 w-4 text-amber-500" />
                    3. Click interceptor (<code>link.jsx</code>)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Defines the client-side <code>&lt;Link&gt;</code> element that renders plain HTML anchors (<code>&lt;a&gt;</code>) for SEO crawlers but intercepts left-clicks in the browser to perform smooth SPA route transitions.
                  </p>
                </div>

                <div className="border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/40">
                  <h4 className="text-sm font-semibold flex items-center gap-2 text-foreground">
                    <Cpu className="h-4 w-4 text-purple-500" />
                    4. Server Functions Connection (<code>server-function-proxy.js</code>)
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    Intercepts invocations to functions containing the <code>"use server"</code> directive, serializing argument arrays or form data into HTTP POST requests sent to the server Function endpoint (<code>/____server_function____</code>).
                  </p>
                </div>
              </div>
            </section>

            <hr className="my-8" />

            {/* SUCCESS VS ERROR HYDRATION */}
            <section id="success-vs-error">
              <h2>⚖️ Success vs. Error Hydration</h2>
              <p>
                Although both files boot the client app, their initialization pathways and payload request methods diverge significantly:
              </p>

              <table className="w-full text-sm my-4 border-collapse border border-slate-200 dark:border-slate-800">
                <thead>
                  <tr className="bg-slate-100 dark:bg-slate-900">
                    <th className="border border-slate-200 dark:border-slate-800 p-2 text-left">Feature</th>
                    <th className="border border-slate-200 dark:border-slate-800 p-2 text-left">SPA Hydration (client.jsx)</th>
                    <th className="border border-slate-200 dark:border-slate-800 p-2 text-left">Recovery Hydration (client-error.jsx)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-800 p-2 font-semibold">Initial Load URL</td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2"><code>/____rsc_payload____ + route</code></td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2"><code>/____rsc_payload_error____ + route</code></td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-800 p-2 font-semibold">HTTP Method</td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2"><code>GET</code></td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2"><code>POST</code></td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-800 p-2 font-semibold">Initial Body</td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2">None</td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2">JSON error details (message, name, stack)</td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-800 p-2 font-semibold">Global Window States</td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2">None required</td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2">Reads <code>window.__DINOU_ERROR_MESSAGE__ / STACK</code></td>
                  </tr>
                  <tr>
                    <td className="border border-slate-200 dark:border-slate-800 p-2 font-semibold">Compilation Trigger</td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2">Reads static or dynamic RSC</td>
                    <td className="border border-slate-200 dark:border-slate-800 p-2">Compiles error component boundary JIT</td>
                  </tr>
                </tbody>
              </table>
            </section>

            <hr className="my-8" />

            {/* WHY SEPARATE */}
            <section id="why-separate">
              <h2>❓ Why Separate Hydration Entries?</h2>
              <p>
                Dinou isolates <code>client.jsx</code> from <code>client-error.jsx</code> during build compilation rather than merging them into a single file with conditional branches. This decision addresses key performance and structural requirements:
              </p>
              <ul>
                <li>
                  <strong>Production Bundle Optimization:</strong> If combined, every successful user visit would download, parse, and evaluate scripts dedicated exclusively to compiling error stacks and managing crash states. Keeping the primary <code>main.js</code> bundle free of recovery code ensures fast load times.
                </li>
                <li>
                  <strong>Clean Separation of Concerns:</strong> <code>client.jsx</code> handles dynamic cookies, transition indicators, scroll preservation, and Actions streaming. <code>client-error.jsx</code> has a single focus: displaying error diagnostics to developers and POSTing traceback metadata to compile recovery pages.
                </li>
                <li>
                  <strong>Avoiding Hydration Mismatches:</strong> React 19 expects the server-rendered HTML nodes to align exactly with the initial client-side virtual DOM during hydration. When a page has crashed, the server outputs error layouts. Using separate entry scripts prevents React from attempting to hydrate standard components over a crashed HTML container, which would trigger mismatch faults and repaint cycles.
                </li>
                <li>
                  <strong>Security Boundaries:</strong> In production environments, verbose error traces should be hidden to prevent path leaks. Isolating the recovery runtime lets the bundler generate a secure, stripped-down <code>error.js</code> while keeping dev stack trace overlays separated.
                </li>
              </ul>
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

