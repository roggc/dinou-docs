"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { RefreshCw, FileCode, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "hmr-plugin", title: "⚡ 1. esm-hmr-plugin.mjs", level: 2 },
  { id: "refresh-runtime", title: "⚛️ 2. react-refresh-runtime.mjs", level: 2 },
  { id: "refresh-boundary", title: "🔍 3. is-react-refresh-boundary.mjs", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-yellow-600 dark:text-yellow-500">
                6. ESM React Refresh (HMR)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Analyze the inner mechanics of Dinou's hot module replacement engine and official React Refresh hooks.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Analyzed:</strong> <br />
              • HMR core loader: <code>./dinou/esbuild/react-refresh/esm-hmr-plugin.mjs</code> <br />
              • Mount wrapper: <code>./dinou/esbuild/react-refresh/react-refresh-runtime.mjs</code> <br />
              • Boundary inspector: <code>./dinou/esbuild/react-refresh/is-react-refresh-boundary.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To provide a modern developer experience, Dinou supports **Hot Module Replacement (HMR)**. When you edit a component in your IDE, the updates are pushed to the browser immediately, preserving state and scroll position without triggering a full page reload.
              </p>
            </section>

            <hr className="my-8" />

            {/* HMR PLUGIN */}
            <section id="hmr-plugin">
              <h2>⚡ 1. <code>esm-hmr-plugin.mjs</code></h2>
              <p>
                This plugin acts as the bridge between esbuild's watch loop and the browser's runtime. It performs three critical operations:
              </p>

              <h3>1. Bootstrap WebSocket Server</h3>
              <p>
                During startup, the plugin boots a local WebSocket server on port <code>3001</code> to establish a real-time push channel to all connected browsers:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`if (!serverStarted) {
  const server = createServer();
  hmrEngine.value = new EsmHmrEngine({ server });
  server.listen(3001);
  serverStarted = true;
}`}</CodeBlock>
              </div>

              <h3>2. Inject HMR Context into Root Entries</h3>
              <p>
                For the client's entry points (such as <code>client.jsx</code>), the loader injects the hot module bootstrap script at the beginning of the file, exposing <code>window.__hotContext</code> to the DOM context:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`let injectCode = \`import { createHotContext } from "/__hmr_client__.js";\\n\`;
injectCode += \`window.__hotContext = createHotContext;\\n\`;
return { contents: injectCode + source, loader: "jsx" };`}</CodeBlock>
              </div>

              <h3>3. SWC Fast Refresh Transform</h3>
              <p>
                For user-created components, the plugin transpiles JSX using `@swc/core` and injects React's refresh signature hooks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const { code } = transformSync(source, {
  jsc: {
    transform: {
      react: { refresh: true } // Injects $RefreshReg$ and $RefreshSig$
    }
  }
});`}</CodeBlock>
              </div>
              <p>
                Finally, it appends HMR registration code to compile hot boundaries, allowing components to accept hot updates:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`let hmrCode = \`
  import.meta.hot.accept((newModule) => {
    // Hot swap registered React components...
  });
\`;`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* REFRESH RUNTIME */}
            <section id="refresh-runtime">
              <h2>⚛️ 2. <code>react-refresh-runtime.mjs</code></h2>
              <p>
                Establishes official React Refresh runtimes in the browser. It overrides React's global mount points (<code>$GPU_ReactRefreshRuntime$</code>), captures component instantiation nodes, and schedules atomic DOM re-render passes when hot chunks load.
              </p>
            </section>

            <hr className="my-8" />

            {/* REFRESH BOUNDARY */}
            <section id="refresh-boundary">
              <h2>🔍 3. <code>is-react-refresh-boundary.mjs</code></h2>
              <p>
                Determines whether a module is a safe React Refresh boundary. It parses module export lists: if a module exports only React components, it is safe to hot-swap. If it exports raw constants or utilities used outside rendering loops, it triggers a full browser reload to prevent state inconsistencies.
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
