"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Layers, Database, ShieldAlert, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "context-flow", title: "📊 Context Scope Flow", level: 2 },
  { id: "als-explained", title: "⚡ AsyncLocalStorage & Isolation", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const CONTEXT_DIAGRAM = `                             Incoming HTTP Request
                                       │
                                       ▼
                       ┌───────────────────────────────┐
                       │     requestStorage (ALSC)     │
                       ├───────────────────────────────┤
                       │  • Run callback in storage    │
                       │  • Store context: {req, res}  │
                       └───────────────┬───────────────┘
                                       │
                                       ▼
                              [Server Components]
                       (Execute nested child functions)
                                       │
                                       ▼
                                 getContext()
                                       │
                                       ▼
                            [Return {req, res} Map]`;

const CONTEXT_CODE = `// dinou/core/request-context.js

const DINOU_CONTEXT_KEY = Symbol.for("dinou.request.context.storage");
let requestStorage;

// 1. Initialize AsyncLocalStorage only on Server side
if (typeof window === "undefined") {
  const nodeRequire =
    typeof module !== "undefined" && typeof module.require === "function"
      ? module.require.bind(module)
      : null;

  if (nodeRequire) {
    const { AsyncLocalStorage } = nodeRequire("node:async_hooks");

    // Persist storage globally to prevent hot-reload wipes
    if (!global[DINOU_CONTEXT_KEY]) {
      global[DINOU_CONTEXT_KEY] = new AsyncLocalStorage();
    }

    requestStorage = global[DINOU_CONTEXT_KEY];
  }
} else {
  // 2. Client Side Fallback Mock: prevents errors during build/hydration passes
  requestStorage = {
    run: (store, callback) => callback(),
    getStore: () => undefined,
  };
}

function getContext() {
  if (typeof window !== "undefined") {
    console.error(
      "[Dinou] ❌ You are calling getContext() inside a Client Component running in the browser. " +
      "This function is Server-Only. Pass the data as props from a Server Component instead."
    );
    return {};
  }
  if (!requestStorage) return undefined;
  
  // 3. Retrieve the context map associated with the active execution thread
  const store = requestStorage.getStore();
  return store;
}

module.exports = {
  requestStorage,
  getContext,
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Request Context Store (request-context.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the server thread context isolation manager, AsyncLocalStorage bindings, and client-side safe mocks.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/request-context.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Unlike Client Components (which query the active tab url or browser storage), Server Components compile on-demand for incoming requests. A component deep inside the React tree might need to query cookie tokens or headers without passing parameters through props from top-level layouts.
              </p>
              <p>
                The <code>request-context.js</code> file provides this functionality. It leverages Node's <code>AsyncLocalStorage</code> to store request-scoped data (like headers, search params, and cookies), exposing a clean <code>getContext()</code> accessor.
              </p>
            </section>

            <hr className="my-8" />

            {/* CONTEXT FLOW */}
            <section id="context-flow">
              <h2>📊 Context Scope Flow</h2>
              <p>
                The flowchart below shows how request contexts are isolated and retrieved:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{CONTEXT_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ALS EXPLAINED */}
            <section id="als-explained">
              <h2>⚡ AsyncLocalStorage & Isolation</h2>
              <p>
                In standard Node.js scripts, global variables are shared across all requests. Under high traffic, storing request data in globals would cause **cross-talk bugs** (e.g. User A receives User B's private account data).
              </p>
              <p>
                Dinou prevents this via <code>AsyncLocalStorage</code>:
              </p>
              <ul>
                <li>
                  <strong>Thread Isolation:</strong> Associates request state maps (<code>{`{ req, res }`}</code>) with asynchronous execution chains. When a Server Component executes an async operation, Node carries the context along automatically.
                </li>
                <li>
                  <strong>Global Persistency:</strong> Binds storage instances using <code>Symbol.for()</code> on the global scope. This preserves request contexts during Hot Module Replacement (HMR) reloads.
                </li>
                <li>
                  <strong>Safe Client Bypasses:</strong> Mocks execution APIs in browser threads, rendering warnings to developers if <code>getContext()</code> is called in Client Components.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>request-context.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CONTEXT_CODE}</CodeBlock>
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
