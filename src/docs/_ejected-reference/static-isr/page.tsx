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

const SWR_LIFECYCLE_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '20px' }}}%%
graph TD
    Start["Browser Request: GET /route<br/>(Incoming HTTP request)"] --> CacheCheck{"Exists in Cache?<br/>(Check disk static files)"}
    
    CacheCheck -->|"Yes"| ServeCache["Serve Cached Static HTML<br/>(Immediate response to client)"]
    ServeCache --> ExpCheck{"Is Cache Expired?<br/>(Check revalidate timestamp)"}
    
    ExpCheck -->|"No"| Done["Cache is Fresh<br/>(No background regeneration needed)"]
    ExpCheck -->|"Yes"| Reval["revalidating(reqPath)<br/>(Trigger background worker)"]
    
    Reval --> LockCheck{"Already Build-Locked?<br/>(Prevent concurrent rebuilds)"}
    LockCheck -->|"Yes"| Skip["Skip Regeneration<br/>(Rebuild already in progress)"]
    LockCheck -->|"No"| BuildBackground["Background Build Pipeline<br/>(Compile RSC, HTML & safeRename)"]
    
    CacheCheck -->|"No"| ISG["ISG On-Demand Engine<br/>(Compile, cache, and serve dynamic route)"]`;

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
              Understand the static route crawlers, background SWR revalidation engines, and programmatic cache invalidation APIs that run inside the framework core.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2 text-sm not-prose">
                <div className="space-y-1">
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">1. Crawling & Evaluation</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><a href="/docs/ejected-reference/static-isr/build-static-pages" className="text-primary hover:underline"><code>build-static-pages.js</code></a>: Crawls routes and evaluates static/dynamic status.</li>
                    <li><a href="/docs/ejected-reference/static-isr/get-ssg-metadata" className="text-primary hover:underline"><code>get-ssg-metadata.js</code></a>: Resolves side-effect cookies/redirects.</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">2. Orchestrators & Triggers</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><a href="/docs/ejected-reference/static-isr/generate-static" className="text-primary hover:underline"><code>generate-static.js</code></a>: Bulk startup pre-generation entry point.</li>
                    <li><a href="/docs/ejected-reference/static-isr/revalidating" className="text-primary hover:underline"><code>revalidating.js</code></a>: Background ISR expiration revalidator.</li>
                    <li><a href="/docs/ejected-reference/static-isr/generating-isg" className="text-primary hover:underline"><code>generating-isg.js</code></a>: On-demand dynamic route ISG compiler.</li>
                    <li><a href="/docs/ejected-reference/static-isr/cache-revalidate" className="text-primary hover:underline"><code>cache-revalidate.js</code></a>: Programmatic path & tag revalidation API.</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">3. RSC & HTML Generators</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><a href="/docs/ejected-reference/static-isr/generate-static-rsc" className="text-primary hover:underline"><code>generate-static-rsc.js</code></a>: Generates single-route RSC payload.</li>
                    <li><a href="/docs/ejected-reference/static-isr/generate-static-rscs" className="text-primary hover:underline"><code>generate-static-rscs.js</code></a>: Generates bulk-route RSC payloads.</li>
                    <li><a href="/docs/ejected-reference/static-isr/generate-static-page" className="text-primary hover:underline"><code>generate-static-page.js</code></a>: Renders single-route HTML files.</li>
                    <li><a href="/docs/ejected-reference/static-isr/generate-static-pages" className="text-primary hover:underline"><code>generate-static-pages.js</code></a>: Renders bulk-route HTML files.</li>
                  </ul>
                </div>
                <div className="space-y-1">
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">4. Utilities & State</span>
                  <ul className="list-disc pl-4 space-y-1">
                    <li><a href="/docs/ejected-reference/static-isr/safe-rename" className="text-primary hover:underline"><code>safe-rename.js</code></a>: Atomic retry committer for safe disk writes.</li>
                    <li><a href="/docs/ejected-reference/static-isr/status-manifest" className="text-primary hover:underline"><code>status-manifest.js</code></a>: Tracks and synchronizes routing state.</li>
                  </ul>
                </div>
              </div>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou provides four rendering and caching patterns for pages:
              </p>
              <ul>
                <li><strong>Static Site Generation (SSG):</strong> Pages are pre-rendered during production server startup and served instantly from disk.</li>
                <li><strong>Incremental Static Regeneration (ISR):</strong> Expired pages are re-generated asynchronously in the background upon client requests.</li>
                <li><strong>Incremental Static Generation (ISG):</strong> Dynamic parameter routes not resolved at startup are rendered on their first request and cached immediately.</li>
                <li><strong>On-Demand Revalidation:</strong> Specific routes or tag-matched sets are purged and rebuilt immediately using programmatic API calls (such as inside Server Functions or Express endpoints).</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* SSG BUILDER */}
            <section id="ssg-build">
              <h2>💾 1. SSG Static Builder (<code>build-static-pages.js</code>)</h2>
              <p>
                When the production server starts up, it runs the static page crawler script:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// Bulk startup orchestration flow inside generate-static.js
async function generateStatic() {
  // 1. Crawl filesystem and resolve static/dynamic configurations
  await buildStaticPages();
  const routes = getStaticPaths();

  // 2. Generate and write all RSC flight payload files (.rsc) in parallel
  await generateStaticRSCs(routes);

  // 3. Render and write all static HTML files (index.html) in bulk
  await generateStaticPages(routes);
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
          const isDynamic = {};
          await buildStaticPage(reqPath, isDynamic);
          if (isDynamic.value) {
            isDynamicFromServer.value = true;
            return;
          }

          const rscResult = await generateStaticRSC(reqPath);
          await safeRename(rscResult.tempPath, rscResult.finalPath);

          const pageResult = await generateStaticPage(reqPath);
          await safeRename(pageResult.tempPath, pageResult.finalPath);
          updateStatus(reqPath, pageResult.status);
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
  backupStaleFiles(cleanPath);

  // 2. Re-render and write updated files
  const isDynamic = {};
  await buildStaticPage(cleanPath, isDynamic);
  if (isDynamic.value) return;

  const rscResult = await generateStaticRSC(cleanPath);
  await safeRename(rscResult.tempPath, rscResult.finalPath);

  const pageResult = await generateStaticPage(cleanPath);
  await safeRename(pageResult.tempPath, pageResult.finalPath);
  updateStatus(cleanPath, pageResult.status);
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

              <div className="not-prose my-6">
                <CodeBlock language="mermaid" minWidth="850px">{SWR_LIFECYCLE_DIAGRAM}</CodeBlock>
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
