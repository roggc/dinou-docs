"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { ArrowRightLeft, Cpu, Terminal, ShieldCheck } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "proxy-flow", title: "📊 IPC Context Flow", level: 2 },
  { id: "ipc-mechanism", title: "⚡ Inter-Process Communication", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const PROXY_DIAGRAM = `                  React Server Component (Child Process)
                            │
              (Sets cookie or redirect prop)
                            │
                            ▼
           ┌────────────────────────────────────────┐
           │            createResponseProxy()       │
           ├────────────────────────────────────────┤
           │ Intercepts: cookie(), redirect(), etc. │
           └───────────────────┬────────────────────┘
                               │
                       sendCommand(cmd, args)
                               │
                               ▼
                    [process.send() (IPC)]
                               │
      👤 Parent Process (Express Main Thread) ──► Apply changes to real res headers`;

const PROXY_CODE = `// core/context-proxy.js

/**
 * Creates a proxy object that intercepts response method calls
 * and sends them to the parent process (Express Handler) through IPC.
 * @returns {object} The proxy object that simulates the Express response.
 */
function createResponseProxy() {
  // Central function to send commands to the parent process
  function sendCommand(command, args) {
    if (typeof process.send === "function") {
      process.send({
        type: "DINOU_CONTEXT_COMMAND",
        command,
        args,
      });
    } else {
      console.warn(
        \`[Dinou] Attempted to run context command "\${command}" outside of a child process.\`
      );
    }
  }

  return {
    // 1. Proxy to delete cookies
    clearCookie: (name, options) => {
      sendCommand("clearCookie", [name, options]);
    },

    // 2. Proxy to set cookies
    cookie: (name, value, options) => {
      sendCommand("cookie", [name, value, options]);
    },

    // 3. Proxy to set headers
    setHeader: (name, value) => {
      sendCommand("setHeader", [name, value]);
    },

    // 4. Proxy to redirect
    redirect: (arg1, arg2) => {
      if (arg2) {
        sendCommand("redirect", [arg1, arg2]); // [status, url]
      } else {
        sendCommand("redirect", [arg1]); // [url]
      }
    },

    // 5. Proxy for status code
    status: (code) => {
      sendCommand("status", [code]);
    },
  };
}

module.exports = {
  createResponseProxy,
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <ArrowRightLeft className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Context Proxy (context-proxy.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the isolated process response mock, inter-process communication bindings, and header synchronization.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/context-proxy.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To isolate routing environments and dynamic page compilation, Dinou spins up rendering tasks in separate Node.js child processes. Because these processes run in an isolated memory space, Server Components cannot modify the HTTP response object of the parent Express server.
              </p>
              <p>
                The <code>context-proxy.js</code> utility resolves this separation. It returns a mock response object that exposes standard Express methods (e.g. <code>res.cookie()</code>, <code>res.redirect()</code>). When invoked inside a component, these methods serialize the inputs and send them to the parent process via IPC.
              </p>
            </section>

            <hr className="my-8" />

            {/* PROXY FLOW */}
            <section id="proxy-flow">
              <h2>📊 IPC Context Flow</h2>
              <p>
                The diagram below traces the communication path between worker threads and the main server:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{PROXY_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* IPC MECHANISM */}
            <section id="ipc-mechanism">
              <h2>⚡ Inter-Process Communication</h2>
              <p>
                When a Server Component sets a cookie (e.g. `cookies().set('session', id)`), the context proxy intercepts the call and executes the following steps:
              </p>
              <ol>
                <li>
                  <strong>Serialize Arguments:</strong> Converts options (like cookie expiry, secure flag, domain path) and arguments into a serializable JSON payload.
                </li>
                <li>
                  <strong>Send Message:</strong> Checks if <code>process.send</code> is defined. If so, it dispatches an IPC message with type <code>DINOU_CONTEXT_COMMAND</code>.
                </li>
                <li>
                  <strong>Parent Application:</strong> The main Express process listens for message events on the child process instance. Upon receiving a command, it applies the changes to the real <code>res</code> headers before completing the client response.
                </li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>context-proxy.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PROXY_CODE}</CodeBlock>
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
