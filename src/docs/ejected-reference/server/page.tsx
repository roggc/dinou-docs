"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Server, Layers, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "process-model", title: "📊 Dual-Process Architecture", level: 2 },
  { id: "files", title: "📂 Module Directory", level: 2 },
];

const PROCESS_FLOW_DIAGRAM = `graph TD
    Parent["Parent Web Server (server.js)"] -->|Spawns via fork| Child["Child HTML Renderer (render-html.js)"]
    Parent -->|Routes HTTP GET requests| RouteCheck{"Check static metadata"}
    RouteCheck -->|Static/ISR hit| ServeCache["Serve index.html directly (no runtime cost)"]
    RouteCheck -->|Bailout / Dynamic route| RunSSR["Execute dynamic request handler"]
    RunSSR -->|Requests Flight serialization| Child
    Child -->|Generates HTML & RSC payload| Parent
    Parent -->|Streams response| Client["Browser Client SPA"]`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Server className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Server & SSR Architecture
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand Dinou's dual-process architecture: the parent web server (server.js) that generates the RSC Flight payload, and the child process (render-html.js) that performs HTML Server-Side Rendering (SSR).
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              • Main parent server: <a href="/docs/ejected-reference/server/main-server"><code>./dinou/server.js</code></a> <br />
              • Child HTML renderer: <a href="/docs/ejected-reference/server/render-html"><code>./dinou/core/render-html.js</code></a>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou separates the tasks of handling browser traffic, executing Server Components, and generating the RSC Flight payload from the CPU-heavy tasks of HTML string rendering and hydration bootstrapping.
              </p>
              <p>
                By isolating these environments into a <strong>dual-process model</strong>, the parent web server remains highly responsive while offloading HTML Server-Side Rendering (SSR) to a dedicated child process.
              </p>

              <div className="my-6 border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/10 rounded-lg p-4 not-prose space-y-2 text-sm text-muted-foreground">
                <h4 className="font-semibold text-foreground flex items-center gap-2">
                  ⚙️ Technical Constraint: Node.js Environment Conditions
                </h4>
                <p>
                  This dual-process separation is not just a performance design; it is <strong>technically forced by Node's environment conditions</strong>:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>The Parent Server:</strong> Must run with Node's <code>--conditions=react-server</code> flag to load React's Server Component runtime (which provides <code>renderToPipeableStream</code> from <code>react-server-dom-esm/server</code>).
                  </li>
                  <li>
                    <strong>The Child Renderer:</strong> Must run <em>without</em> the <code>react-server</code> flag to load the standard client/SSR runtime (which provides <code>renderToReadableStream</code> or equivalent from <code>react-dom/server</code>).
                  </li>
                </ul>
                <p>
                  In Node.js, these two runtimes are mutually exclusive within a single process. Attempting to load both in the same process leads to duplicate React instances, context conflicts, and runtime crashes.
                </p>
              </div>
            </section>

            <hr className="my-8" />

            {/* PROCESS MODEL */}
            <section id="process-model">
              <h2>📊 Dual-Process Architecture</h2>
              <p>
                The flowchart below demonstrates how the parent web server communicates with the child HTML renderer to compile and stream page responses:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{PROCESS_FLOW_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* FILE DIRECTORY */}
            <section id="files">
              <h2>📂 Module Directory</h2>
              <p>
                Explore the core modules of this group:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                <a href="/docs/ejected-reference/server/main-server" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <Server className="h-6 w-6 text-blue-500 mb-3" />
                    <h3 className="font-bold text-base my-0">Main Server (server.js)</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Bootstraps the Express application, controls hot module replacement (HMR), handles request middleware, and serves cached or dynamic pages.
                    </p>
                  </div>
                  <span className="text-xs text-blue-500 font-semibold mt-4">View Docs →</span>
                </a>

                <a href="/docs/ejected-reference/server/render-html" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <Cpu className="h-6 w-6 text-purple-500 mb-3" />
                    <h3 className="font-bold text-base my-0">HTML Renderer (render-html.js)</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Spawns in a sub-process, receives JSX descriptors, pre-renders React Server Components layout trees, and pipes compiled HTML back to the main server.
                    </p>
                  </div>
                  <span className="text-xs text-purple-500 font-semibold mt-4">View Docs →</span>
                </a>
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
