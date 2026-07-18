"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Globe, ArrowRight, Zap, RefreshCw, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "proxy-structure", title: "📊 Physical File Structure", level: 2 },
  { id: "proxy-factory", title: "⚛️ 1. Proxy Factory & Request Formatting", level: 2 },
  { id: "redirect-security", title: "🛡️ 2. Redirections & Security Checks", level: 2 },
  { id: "stream-processing", title: "⚙️ 3. RSC & Hybrid Stream Processing", level: 2 },
  { id: "webpack-variant", title: "📦 Webpack Variant (server-function-proxy-webpack.js)", level: 2 },
];

const PROXY_STRUCTURE_DIAGRAM = `graph TD
    subgraph server-function-proxy.js Code Structure
        Redirects[1. Safe URL Redirect Handlers<br/>isSafeRedirect: Blocks open redirects<br/>executeRedirect: SPA Router or window.location]
        ProxyFactory[2. createServerFunctionProxy<br/>Wraps 'use server' calls in JavaScript Proxy]
        Formatter[3. Request Formatter<br/>FormData: Appends func_id, serializes args<br/>JSON: Serializes JSON payload. POSTs to server]
        Processor[4. Response Stream Processor<br/>Intercepts redirects & cookie updates. Passes component stream chunks to React createFromFetch]
    end
    
    Redirects --> ProxyFactory
    ProxyFactory --> Formatter
    Formatter --> Processor`;

const PROXY_FACTORY_CODE = `export function createServerFunctionProxy(id) {
  return new Proxy(() => {}, {
    apply: async (_target, _thisArg, args) => {
      let body;
      const headers = {
        "x-server-function-call": "1",
      };

      if (args[0] instanceof FormData) {
        const formData = args[0];
        formData.append("__dinou_func_id", id);
        if (args.length > 1) {
          formData.append("__dinou_args", JSON.stringify(args.slice(1)));
        }
        body = formData;
      } else {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({ id, args });
      }

      const res = await fetch("/____server_function____", {
        method: "POST",
        headers,
        body,
      });

      if (!res.ok) throw new Error("Server function failed");
      // ... process response ...
    }
  });
}`;

const PROXY_REDIRECT_CODE = `function isSafeRedirect(url) {
  return typeof url === "string" && url.startsWith("/") && !url.startsWith("//");
}

function executeRedirect(url) {
  const safeUrl = isSafeRedirect(url) ? url : "/";
  const isInternal = safeUrl.startsWith("/") && !safeUrl.startsWith("//");
  if (isInternal && typeof window !== "undefined" && window.__DINOU_ROUTER_NAVIGATE__) {
    window.__DINOU_ROUTER_NAVIGATE__(safeUrl);
  } else if (typeof window !== "undefined") {
    window.location.href = safeUrl;
  }
}`;

const PROXY_STREAM_CODE = `// Inside response handling, if contentType is "text/x-component" (RSC Flight stream):
const reader = res.body.getReader();
const decoder = new TextDecoder();
const encoder = new TextEncoder();

const readableStream = new ReadableStream({
  async start(controller) {
    let buffer = ""; // Persistent state across chunk reads
    let isRedirecting = false;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          // Process final trailing data in buffer...
          break;
        }

        buffer += decoder.decode(value, { stream: true });

        // Process complete lines separated by newlines
        const lastNewlineIndex = buffer.lastIndexOf("\\n");
        if (lastNewlineIndex !== -1) {
          const completeChunk = buffer.slice(0, lastNewlineIndex + 1);
          buffer = buffer.slice(lastNewlineIndex + 1);

          const lines = completeChunk.split("\\n");
          let cleanChunk = "";

          for (const line of lines) {
            if (line.startsWith("D:")) {
              // Intercept Dinou streaming command packet
              const payload = JSON.parse(line.slice(2));
              if (payload.type === "redirect") {
                isRedirecting = true;
                executeRedirect(payload.url);
              } else if (payload.type === "cookie") {
                document.cookie = payload.cookie; // Write cookie on client JIT
              }
            } else {
              cleanChunk += line + "\\n";
            }
          }
          if (cleanChunk) controller.enqueue(encoder.encode(cleanChunk));
        }
      }
      controller.close();
    } catch (err) {
      controller.error(err);
    }
  },
});

return createFromFetch(Promise.resolve(new Response(readableStream)));`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Actions Connection (server-function-proxy.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore how Dinou handles client-side Server Action invocations, request serialization, safe redirection execution, and live streaming command parsing.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/server-function-proxy.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Server Actions (functions tagged with the <code>"use server"</code> directive) reside on the backend. When client components invoke these functions, they need a proxy layer to translate parameters into HTTP network calls and parse incoming streaming responses. The <code>server-function-proxy.js</code> module manages this bridge.
              </p>
            </section>

            <hr className="my-8" />

            {/* STRUCTURE */}
            <section id="proxy-structure">
              <h2>📊 Physical File Structure</h2>
              <p>
                The file layout splits request serialization, redirect filtering, and stream line parsers:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{PROXY_STRUCTURE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PROXY FACTORY */}
            <section id="proxy-factory">
              <h2>⚛️ 1. Proxy Factory & Request Formatting</h2>
              <p>
                The <code>createServerFunctionProxy(id)</code> helper instantiates a JavaScript <code>Proxy</code> wrap. When invoked, it intercepts the argument list and normalizes the request structure:
              </p>
              <ul>
                <li>
                  <strong>Form Data check:</strong> If the first argument is a <code>FormData</code> instance (from a native form submit), the proxy appends <code>__dinou_func_id</code> (the Action ID) and serializes extra args into <code>__dinou_args</code>, submitting it as a multipart request body.
                </li>
                <li>
                  <strong>JSON check:</strong> For direct JS calls, it sets headers to <code>application/json</code> and POSTs serialized &#123; id, args &#125;.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PROXY_FACTORY_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* REDIRECT SECURITY */}
            <section id="redirect-security">
              <h2>🛡️ 2. Redirections & Security Checks</h2>
              <p>
                Actions might trigger redirect operations on completion. The proxy handles redirections securely:
              </p>
              <ul>
                <li>
                  <strong>Open Redirect prevention:</strong> The helper <code>isSafeRedirect(url)</code> asserts that redirection targets start with a single slash (<code>/</code>) and not a double slash (<code>//</code>). This prevents malicious actors from hijacking redirects to arbitrary external domains.
                </li>
                <li>
                  <strong>SPA transitions:</strong> If the target path is internal, it calls <code>window.__DINOU_ROUTER_NAVIGATE__</code> to trigger a smooth SPA path change instead of reloading the page.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PROXY_REDIRECT_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* STREAM PROCESSING */}
            <section id="stream-processing">
              <h2>⚙️ 3. RSC & Hybrid Stream Processing</h2>
              <p>
                If the server Action returns React node updates, the response carries a <code>text/x-component</code> header representing the RSC Flight stream. The proxy reads this incrementally:
              </p>
              <ul>
                <li>
                  <strong>Line-by-line parsing:</strong> The stream chunk reader buffers incoming binaries, splitting them into text lines.
                </li>
                <li>
                  <strong>Streaming Commands (<code>D:</code> prefix):</strong> If a line begins with <code>D:</code> (e.g. <code>D:&#123;"type":"cookie", "cookie":"..."&#125;</code>), the proxy intercepts it immediately. It parses the JSON command and executes the metadata operation on the client:
                  <ul className="pl-4 mt-1 list-disc space-y-1">
                    <li>Writes cookies to the document context (<code>document.cookie = payload.cookie</code>).</li>
                    <li>Invokes safe SPA redirects (<code>executeRedirect(payload.url)</code>).</li>
                  </ul>
                </li>
                <li>
                  <strong>Flight Stream piping:</strong> Non-command lines are forwarded to a custom <code>ReadableStream</code>, which is then parsed by React's <code>createFromFetch()</code> to stream UI changes directly.
                </li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PROXY_STREAM_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* WEBPACK VARIANT */}
            <section id="webpack-variant">
              <h2>📦 Webpack Variant (<code>server-function-proxy-webpack.js</code>)</h2>
              <p>
                When Webpack is active, the bundler maps imports to <code>server-function-proxy-webpack.js</code>.
              </p>
              <p>
                <strong>The Difference:</strong> The Webpack variant imports deserialization functions from the Webpack package:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`import { createFromFetch } from "react-server-dom-webpack/client";`}</CodeBlock>
              </div>
              <p>
                It executes the exact same request format checks, safe redirect gates, and hybrid stream line interceptors.
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
