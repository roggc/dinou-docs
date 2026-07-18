"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Atom, Cpu, ShieldAlert, GitBranch, ArrowRightLeft } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "architecture-diagram", title: "📊 Flow Architecture", level: 2 },
  { id: "files", title: "📂 Module Directory", level: 2 },
];

const RSC_CONTEXT_DIAGRAM = `                                🌐 Client Request
                                        │
                                        ▼
                           ┌─────────────────────────┐
                           │   concurrency-manager   │
                           │   (Limit active renders)│
                           └────────────┬────────────┘
                                        │
                                        ▼
                           ┌─────────────────────────┐
                           │    context-proxy.js     │
                           │  (IPC cookie/redirect)  │
                           └────────────┬────────────┘
                                        │
                                        ▼
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
   ┌───────────────────┐                                 ┌───────────────────┐
   │  render-jsx-to... │                                 │  get-error-jsx.js │
   │ (Compiles React   │ ───────[Caught render crash]───►│ (Crawls error.tsx │
   │ Server Components)│                                 │ and nested slots) │
   └───────────────────┘                                 └───────────────────┘`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Atom className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                RSC Render & Context Utilities
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover the React Server Components compiler, multi-process IPC context proxies, render queue managers, and slot-level error boundary resolvers.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Group Summary:</strong> <br />
              • Core RSC compiler: <a href="/docs/ejected-reference/rsc-context/jsx-compiler"><code>./dinou/core/render-jsx-to-client-jsx.js</code></a> <br />
              • Multi-process IPC proxy: <a href="/docs/ejected-reference/rsc-context/context-proxy"><code>./dinou/core/context-proxy.js</code></a> <br />
              • Concurrency controller: <a href="/docs/ejected-reference/rsc-context/concurrency-manager"><code>./dinou/core/concurrency-manager.js</code></a> <br />
              • Error boundary crawls: <a href="/docs/ejected-reference/rsc-context/error-handler"><code>./dinou/core/get-error-jsx.js</code></a>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                React Server Components run in isolated Node.js child processes. This isolation introduces distinct challenges:
              </p>
              <ul>
                <li><strong>Render Queueing:</strong> Multiple incoming connections can spawn child processes that exhaust server RAM.</li>
                <li><strong>Process Bridging:</strong> Server components cannot manipulate the parent Express process's HTTP headers (such as setting cookies) directly.</li>
                <li><strong>Custom JSX Compiling:</strong> React element trees must be parsed, executed, and compiled into flight payloads (Flight format) on the fly.</li>
                <li><strong>Parallel Slot Crashes:</strong> A crash in a sub-layout or parallel page slot should be isolated, allowing adjacent page slots to render correctly.</li>
              </ul>
              <p>
                The **RSC Render & Context Utilities** group contains the core framework modules responsible for managing these lifecycles.
              </p>
            </section>

            <hr className="my-8" />

            {/* FLOW DIAGRAM */}
            <section id="architecture-diagram">
              <h2>📊 Flow Architecture</h2>
              <p>
                The diagram below shows the processing lifecycle of client requests as they pass through concurrency checks, context proxies, compile streams, and error boundaries:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{RSC_CONTEXT_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* FILE SUB-GROUPS */}
            <section id="files">
              <h2>📂 Module Directory</h2>
              <p>
                Explore each component file in detail:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 not-prose mt-4">
                <a href="/docs/ejected-reference/rsc-context/jsx-compiler" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <Cpu className="h-6 w-6 text-blue-500 mb-3" />
                    <h3 className="font-bold text-base my-0">JSX Compiler</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Custom compiler that executes Server Components and serializes React elements to transitional client structures.
                    </p>
                  </div>
                  <span className="text-xs text-blue-500 font-semibold mt-4">View Docs →</span>
                </a>

                <a href="/docs/ejected-reference/rsc-context/context-proxy" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <ArrowRightLeft className="h-6 w-6 text-purple-500 mb-3" />
                    <h3 className="font-bold text-base my-0">Context Proxy</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Simulates the Express Response API inside child processes, proxying cookie and redirect commands via IPC.
                    </p>
                  </div>
                  <span className="text-xs text-purple-500 font-semibold mt-4">View Docs →</span>
                </a>

                <a href="/docs/ejected-reference/rsc-context/concurrency-manager" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <GitBranch className="h-6 w-6 text-emerald-500 mb-3" />
                    <h3 className="font-bold text-base my-0">Concurrency Manager</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Queues concurrent rendering tasks to match physical CPU cores and protect system memory limits.
                    </p>
                  </div>
                  <span className="text-xs text-emerald-500 font-semibold mt-4">View Docs →</span>
                </a>

                <a href="/docs/ejected-reference/rsc-context/error-handler" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <ShieldAlert className="h-6 w-6 text-red-500 mb-3" />
                    <h3 className="font-bold text-base my-0">Error Boundary Handler</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Crawl-based layout error boundaries resolver that isolates crashes to individual parallel page slots.
                    </p>
                  </div>
                  <span className="text-xs text-red-500 font-semibold mt-4">View Docs →</span>
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
