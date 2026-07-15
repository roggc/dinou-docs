"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Terminal, RefreshCw, Cpu, Layers, MessageSquareWarning, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "architecture", title: "🔄 The Two-Process SSR Pipeline", level: 2 },
  { id: "render-app-parent", title: "⚡ Parent Handler: render-app-to-html.js", level: 2 },
  { id: "render-html-child", title: "⚙️ Child Process: render-html.js", level: 2 },
  { id: "ipc-pipes", title: "🔌 IPC and Pipe Deserialization", level: 2 },
  { id: "html-compilation", title: "⚛️ React 19 HTML Compilation", level: 2 },
  { id: "error-handling", title: "🛡️ Error Isolation & Fallbacks", level: 2 },
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
                HTML Renderer Pipeline
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand how Dinou isolates Server Components rendering from Client SSR through a dual-process bridge using <code>render-app-to-html.js</code> and <code>render-html.js</code>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              • Parent manager: <code>./dinou/core/render-app-to-html.js</code> <br />
              • Child renderer: <code>./dinou/core/render-html.js</code> <br />
              • Helper: <code>./dinou/core/render-jsx-to-client-jsx.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                React 19 separates the execution of Server Components (RSC) and Client Components. The server needs to run under the <code>react-server</code> environment condition, while client-side rendering (SSR) must run under the standard React environment. Attempting to run both in the same Node.js process leads to V8 memory conflicts and duplicate module definitions.
              </p>
              <p>
                Dinou bypasses this boundary limit by executing these tasks in two isolated Node.js processes communicating through an IPC pipe and standard outputs.
              </p>
            </section>

            <hr className="my-8" />

            {/* ARCHITECTURE DIAGRAM */}
            <section id="architecture">
              <h2>🔄 The Two-Process SSR Pipeline</h2>
              <p>
                The lifecycle of an HTML request follows this decoupled execution graph:
              </p>
              
              <div className="not-prose my-6 border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto">
                <pre className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre">{` [Express Server.js] ───────────────► Calling renderAppToHtml()
       │                                     │
       │                                     ▼ [Forking Child Process]
       │                            [render-app-to-html.js] (Parent Environment)
       │                                     │
       │                                     ├─► 1. Evaluates React Server graph
       │                                     ├─► 2. Generates RSC Flight JSON binary
       │                                     │
       ▼ [Piping RSC Flight Stream via fd:4] │
 ┌───────────────────────────────────────────┼───────────────────────────┐
 │ [render-html.js] (Child Process Environment - Standard Client React)   │
 │                                           │                           │
 │   a. Reads flight stream from fd:4 ◄──────┘                           │
 │   b. Reconstructs client-safe JSX via createFromNodeStream()          │
 │   c. Performs React 19 SSR via renderToPipeableStream()               │
 │   d. Writes final HTML chunks to stdout                               │
 └───────────────────┬───────────────────────────────────────────────────┘
                     │
                     ▼ [Piped stdout chunks]
               [Express res] ────────► Browser (HTML Response)`}</pre>
              </div>
            </section>

            <hr className="my-8" />

            {/* PARENT HANDLER */}
            <section id="render-app-parent">
              <h2>⚡ Parent Handler: <code>render-app-to-html.js</code></h2>
              <p>
                This utility is required by `server.js` within the parent process context. When a client requests a page:
              </p>
              <ol>
                <li>
                  It spins up a new isolated child process using Node's <code>fork()</code> to run the renderer file:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`const child = fork(renderHtmlPath, [reqPath, JSON.stringify(query), ...], {
  stdio: ["inherit", "pipe", "inherit", "ipc", "pipe"], // stdout as pipe, fd:4 for data
  execArgv: childExecArgv, // Imports register-loader.mjs
});`}</CodeBlock>
                  </div>
                </li>
                <li>
                  It runs the Server Component tree using <code>renderToPipeableStream</code> from the Server package, producing the **RSC Flight Stream**.
                </li>
                <li>
                  It pipes this Flight stream binary directly into the child process through the custom file descriptor channel <code>fd:4</code>.
                </li>
                <li>
                  It pipes the child's `stdout` (which holds the compiled HTML blocks) back to the client's Express `res` payload.
                </li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* CHILD PROCESS */}
            <section id="render-html-child">
              <h2>⚙️ Child Process: <code>render-html.js</code></h2>
              <p>
                The child process is started as a clean standard React context (without the <code>react-server</code> condition). Its execution flow is defined as:
              </p>
              <ol>
                <li>
                  <strong>Babel Registry Startup:</strong> Just like the server, it initializes <code>@babel/register</code> and require hooks to load TypeScript, JSX, and local stylesheets.
                </li>
                <li>
                  <strong>Arguments Parsing:</strong> Reads arguments passed from the parent process CLI fork call:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`const reqPath = process.argv[2] || "/";
const query = JSON.parse(process.argv[3] || "{}");
const serializedBox = JSON.parse(process.argv[4] || "{}");`}</CodeBlock>
                  </div>
                </li>
                <li>
                  <strong>Stream Reading:</strong> Resolves the RSC Flight stream from the parent process pipe:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`const rscStream = createReadStream(null, { fd: 4 });`}</CodeBlock>
                  </div>
                </li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* IPC AND PIPE DESERIALIZATION */}
            <section id="ipc-pipes">
              <h2>🔌 IPC and Pipe Deserialization</h2>
              <p>
                To turn the raw RSC Flight Stream back into React elements on the client-side server, `render-html.js` uses the deserializer:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const { createFromNodeStream } = require("@roggc/react-server-dom-esm/client");

const jsx = await createFromNodeStream(rscStream, baseUrl, baseUrl);`}</CodeBlock>
              </div>
              <p>
                In a Webpack setup, this utilizes the Webpack resolver client: <code>react-server-dom-webpack/client</code>, passing the generated SSR manifest mapping table (<code>react-ssr-manifest.json</code>) to resolve modular references.
              </p>
            </section>

            <hr className="my-8" />

            {/* HTML COMPILATION */}
            <section id="html-compilation">
              <h2>⚛️ React 19 HTML Compilation</h2>
              <p>
                Once the client-side JSX tree is resolved, the child process compiles it into standard markup:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const stream = renderToPipeableStream(jsx, {
  onShellReady() {
    // Write importmap dynamically for ESM resolution
    const importMapHtml = getImportMapHtml();
    process.stdout.write(importMapHtml);
    
    // Pipe the React HTML output chunks directly to stdout
    stream.pipe(process.stdout);
  },
  bootstrapModules: ["/main.js", "/runtime.js"], // Injected hydration scripts
});`}</CodeBlock>
              </div>
              <p>
                The stdout of the child is hooked directly to the parent's Express response. The browser receives the initial HTML structure, loads the bootstrap script files, and triggers client-side React hydration.
              </p>
            </section>

            <hr className="my-8" />

            {/* ERROR HANDLING */}
            <section id="error-handling">
              <h2>🛡️ Error Isolation & Fallbacks</h2>
              <p>
                A key benefit of the two-process architecture is robust error isolation. If a component fails to render during SSR:
              </p>
              <ul>
                <li>The error is caught inside the child's <code>renderToPipeableStream</code> handler.</li>
                <li>It attempts to fetch the project's custom error component (<code>error.tsx</code>) via <code>getErrorJSX()</code>.</li>
                <li>If found, it renders the custom error component and pipes it to the client with a <code>500</code> status code.</li>
                <li>If the custom error renderer fails or is not declared, it writes a fallback error screen (using `formatErrorHtml`) and exits cleanly.</li>
                <li>It passes the error stack details back to the parent process using <code>process.stderr</code>.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CUSTOMIZATION INSTRUCTIONS */}
            <section id="customizations">
              <h2>🛠️ Common Tweak Recipes</h2>
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 space-y-3 not-prose text-sm">
                <div>
                  <strong>1. Injecting Global Meta Tags or Document Scripts:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can customize the HTML wrapper document envelope by editing the template generator in <code>core/render-app-to-html.js</code> to include analytics, font preloads, or custom headers.
                  </p>
                </div>
                <div>
                  <strong>2. Customizing Fallback Error Styles:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    Tweak the CSS structure in <code>formatErrorHtml()</code> inside <code>core/render-html.js</code> to brand development crash screens to match your project aesthetic.
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
