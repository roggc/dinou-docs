"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Zap, RefreshCw, Terminal, Play } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "build", title: "📦 build.mjs (Production Compiler)", level: 2 },
  { id: "dev", title: "🔧 dev.mjs (Development Server & HMR)", level: 2 },
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
                2. Build & Dev Runners
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dissect the execution flow of Dinou's build scripts, explaining production packaging and development hot-reload loops.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Analyzed:</strong> <br />
              • Production compiler: <code>./dinou/esbuild/build.mjs</code> <br />
              • Dev watch server: <code>./dinou/esbuild/dev.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Runners coordinate compilation. They determine which files are built, clear old output directories, resolve dynamic page entry points, and start file watching systems during local runs.
              </p>
            </section>

            <hr className="my-8" />

            {/* BUILD.MJS */}
            <section id="build">
              <h2>📦 <code>build.mjs</code> (Production Compiler)</h2>
              <p>
                The production runner executes a single compilation build. When you run <code>npm run build</code>, the compiler performs the following actions:
              </p>

              <h3>Step 1: Directory Cleanup</h3>
              <p>
                It synchronously clears previously compiled files to prevent serving outdated assets:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`await fs.rm("dist3", { recursive: true, force: true });
await fs.rm("react_client_manifest", { recursive: true, force: true });
await fs.rm("server_functions_manifest", { recursive: true, force: true });`}</CodeBlock>
              </div>

              <h3>Step 2: Collect Entry Points</h3>
              <p>
                It combines internal framework modules (hydration scripts, client routing wrappers, React Refresh helpers) with project routes resolved by <code>getEsbuildEntries()</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const [esbuildEntries, detectedCSSEntries, detectedAssetEntries] =
  await getEsbuildEntries({ manifest });

const entryPoints = {
  ...frameworkEntryPoints,
  ...componentEntryPoints, // Scraped client component entries
  ...cssEntryPoints,
  ...assetEntryPoints
};`}</CodeBlock>
              </div>

              <h3>Step 3: Trigger Compiler Build</h3>
              <p>
                It starts the esbuild build with production options, producing minified assets in <code>dist3/</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`await esbuild.build(
  getConfigEsbuildProd({ entryPoints, manifest, outdir: "dist3" })
);`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* DEV.MJS */}
            <section id="dev">
              <h2>🔧 <code>dev.mjs</code> (Development Server & HMR)</h2>
              <p>
                The development runner coordinates watches and builds to enable hot-reloading. The process flow is detailed below:
              </p>

              <h3>1. Persistent File Watcher</h3>
              <p>
                It starts a <strong>Chokidar</strong> watcher to monitor additions, modifications, or deletions under the <code>src/</code> directory:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const watcher = chokidar.watch("src", {
  ignoreInitial: true,
  ignored: /node_modules|dist/,
});

watcher.on("all", async (event, filePath) => {
  // Re-run getEsbuildEntries to detect route updates
  await updateEntriesAndComponents();
  // Trigger esbuild rebuilds
});`}</CodeBlock>
              </div>

              <h3>2. WebSocket HMR Event Broadcast</h3>
              <p>
                It starts a local WebSocket server (port <code>3001</code>). When esbuild finishes rebuilding modified files, the server broadcasts reload events to the client:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const wsServer = new WebSocketServer({ port: 3001 });

wsServer.on("connection", (socket) => {
  // Send active client hooks...
});

// Broadcast changes
function notifyClients(payload) {
  wsServer.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  });
}`}</CodeBlock>
              </div>
              <p>
                If a modified file contains client component exports, the server broadcasts an HMR payload containing the file URL. The client's React Refresh runtime then hot-swaps the component state without reloading the browser page. If a server file changes, it triggers a page reload instead.
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
