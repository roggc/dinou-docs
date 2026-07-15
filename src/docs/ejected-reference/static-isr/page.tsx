"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { RefreshCw, FileText, Zap, Shield, Key } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "ssg-build", title: "💾 1. SSG Static Builder (build-static-pages.js)", level: 2 },
  { id: "isr-revalidation", title: "🔄 2. Background Revalidation (revalidating.js)", level: 2 },
  { id: "on-demand-revalidation", title: "⚡ 3. On-Demand Revalidation (cache-revalidate.js)", level: 2 },
  { id: "isg-generation", title: "🚀 4. Dynamic Pre-render (generating-isg.js)", level: 2 },
  { id: "stale-while-revalidate", title: "⏱️ 5. Stale-While-Revalidate Lifecycle", level: 2 },
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
                Static & ISR Engines
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the pre-rendering builders, background revalidation pools, and on-demand cache purging controllers that run inside the ejected framework core.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              • Production compiler: <code>./dinou/core/build-static-pages.js</code> <br />
              • Background engine: <code>./dinou/core/revalidating.js</code> <br />
              • On-demand revalidator: <code>./dinou/core/cache-revalidate.js</code> <br />
              • Dynamic ISG builder: <code>./dinou/core/generating-isg.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou provides three types of rendering outputs for pages:
              </p>
              <ul>
                <li><strong>Static Site Generation (SSG):</strong> Pages compile at build time and serve instantly from the disk.</li>
                <li><strong>Incremental Static Regeneration (ISR):</strong> Expired pages re-generate asynchronously in the background.</li>
                <li><strong>Incremental Static Generation (ISG):</strong> Dynamic routes render on the first browser query and cache immediately.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* SSG BUILDER */}
            <section id="ssg-build">
              <h2>💾 1. SSG Static Builder (<code>build-static-pages.js</code>)</h2>
              <p>
                When you execute <code>npm run build</code>, the compiler runs the static page crawler script:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`async function buildStaticPages() {
  const routes = await crawlStaticRoutes(); // Crawls project routes index

  for (const route of routes) {
    const isDynamic = {};
    await buildStaticPage(route, isDynamic); // Renders the RSC Flight output
    
    if (!isDynamic.value) {
      await generateStaticRSC(route);  // Saves rsc.rsc output
      await generateStaticPage(route); // Saves index.html output
    }
  }
}`}</CodeBlock>
              </div>
              <p>
                It iterates through crawled paths, evaluates the Server Components tree, outputs the RSC Flight payload, and triggers the child process renderer to compile the final static HTML. If a page calls dynamic features (like reading request headers), the builder detects the bailout and skips writing.
              </p>
            </section>

            <hr className="my-8" />

            {/* BACKGROUND REVALIDATION */}
            <section id="isr-revalidation">
              <h2>🔄 2. Background Revalidation (<code>revalidating.js</code>)</h2>
              <p>
                When a user visits a stale cached route, Dinou serves the current cached file immediately (Stale-While-Revalidate) and triggers a background regeneration hook:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const regenerating = new Set(); // Execution mutex locks

function revalidating(reqPath, isDynamicFromServer) {
  if (regenerating.has(reqPath)) return; // Avoid concurrent compile conflicts

  // Read metadata.json to verify expiration states
  fs.readFile(metadataPath, "utf8").then((content) => {
    const { revalidate, generatedAt } = JSON.parse(content);
    const isExpired = Date.now() > generatedAt + revalidate;

    if (isExpired) {
      // Serve stale files while compiling
      copyFileSync("index.html", "index._old.html");
      copyFileSync("rsc.rsc", "rsc._old.rsc");

      regenerating.add(reqPath); // Acquire compile lock
      (async () => {
        try {
          await buildStaticPage(reqPath);
          await generateStaticRSC(reqPath);
          await generateStaticPage(reqPath);
        } finally {
          regenerating.delete(reqPath); // Release lock
        }
      })();
    }
  });
}`}</CodeBlock>
              </div>
              <p>
                The <code>regenerating</code> set is a lock that blocks subsequent requests from starting parallel build forks for the same page, preventing server overload.
              </p>
            </section>

            <hr className="my-8" />

            {/* ON-DEMAND REVALIDATION */}
            <section id="on-demand-revalidation">
              <h2>⚡ 3. On-Demand Revalidation (<code>cache-revalidate.js</code>)</h2>
              <p>
                Dinou provides an API endpoint to purge and rebuild cached routes immediately (e.g., when a headless CMS webhook fires). Calling <code>revalidatePath(path)</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`async function revalidatePath(reqPath) {
  const cleanPath = normalizeRoutePath(reqPath);
  
  // 1. Back up current pages to old
  copyCurrentToOld(cleanPath);

  // 2. Re-compile immediately
  await buildStaticPage(cleanPath);
  await generateStaticRSC(cleanPath);
  await generateStaticPage(cleanPath);
}`}</CodeBlock>
              </div>
              <p>
                Unlike background ISR (which triggers on browser visits), on-demand revalidation rebuilds resources immediately, ensuring users see CMS updates instantly.
              </p>
            </section>

            <hr className="my-8" />

            {/* DYNAMIC ISG GENERATION */}
            <section id="isg-generation">
              <h2>🚀 4. Dynamic Pre-render (<code>generating-isg.js</code>)</h2>
              <p>
                When you request a route that doesn't exist at build time, the server triggers the ISG engine:
              </p>
              <ol>
                <li>Checks if the path matches a dynamic route template (e.g. <code>/posts/[id]</code>).</li>
                <li>Forks a compilation task to evaluate the layout and dynamic params.</li>
                <li>Generates and commits the <code>rsc.rsc</code> and <code>index.html</code> files dynamically to the disk cache.</li>
                <li>Subsequent visits bypass compilation entirely and serve the cached static file directly.</li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* STALE-WHILE-REVALIDATE LIFECYCLE */}
            <section id="stale-while-revalidate">
              <h2>⏱️ 5. Stale-While-Revalidate Lifecycle</h2>
              <p>
                The diagram below outlines the cache check and background regeneration flow:
              </p>

              <div className="not-prose my-6 border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50 overflow-x-auto">
                <pre className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre">{`    🌐 Browser Request (GET /route)
               │
               ▼
      [Exists in Cache?]
        ├── Yes ──► serve index.html (instantly) ──► [Is Cache Expired?]
        │                                                ├── No  ──► Done
        │                                                └── Yes ──► revalidating()
        │                                                                │
        │                                                [Already Compile-Locked?]
        │                                                    ├── Yes ──► Skip (Wait)
        │                                                    └── No  ──► 1. Set Lock
        │                                                                2. Run background fork
        │                                                                3. Commit page
        │                                                                4. Release Lock
        ▼
    [ISG Engine] ──► Generate, Cache, and Serve`}</pre>
              </div>
            </section>

            <hr className="my-8" />

            {/* CUSTOMIZATIONS */}
            <section id="customizations">
              <h2>🛠️ Common Tweak Recipes</h2>
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 space-y-3 not-prose text-sm">
                <div>
                  <strong>1. Adjusting Default Cache Timeouts:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can override revalidation intervals globally or per route pattern by adjusting metadata properties generated inside <code>core/build-static-pages.js</code>.
                  </p>
                </div>
                <div>
                  <strong>2. Implementing Custom Cache Storage (e.g., Redis):</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    By default, Dinou writes cache files to the server's disk space. You can redirect these checks by replacing file read/write operations (<code>fs.readFile</code>, <code>fs.writeFile</code>) in <code>core/revalidating.js</code> with Redis or S3 client connections.
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
