"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Compass, Rocket, Lock, Settings, ShieldAlert } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "engine-flow", title: "📊 Compilation Lifecycle", level: 2 },
  { id: "lazy-promotion", title: "🚀 Lazy Static Promotion", level: 2 },
  { id: "mutex-sharing", title: "🔒 Mutex Sharing & Lock Pools", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const ISG_COMPILATION_DIAGRAM = `graph TD
    Start[🌐 User GET /posts/42 Not Cached] --> DiskCheck{Does file exist on disk?}
    
    DiskCheck -->|Yes| ServeStatic[Serve Static index.html / Skip]
    DiskCheck -->|No| CallISG[Call generatingISG path]
    
    CallISG --> MutexCheck{Mutex Lock Pool Active?}
    MutexCheck -->|Yes| Exit[Exit / Skip]
    MutexCheck -->|No| RunISG[1. Set Mutex Lock<br/>2. Run buildStaticPage]
    
    RunISG --> BailCheck{Is dynamic bailout?}
    BailCheck -->|Yes| SSR[Switch to dynamic Server-Side Render isDynamic=true]
    BailCheck -->|No| SaveCache[1. Compile RSC & safeRename<br/>2. Compile HTML & safeRename<br/>3. updateStatus to cached<br/>4. Release Mutex Lock]`;

const GENERATING_ISG_CODE = `const fs = require("fs").promises;
const path = require("path");
const { existsSync, copyFileSync } = require("fs");
const generateStaticPage = require("./generate-static-page");
const generateStaticRSC = require("./generate-static-rsc");
const { buildStaticPage } = require("./build-static-pages");
const { regenerating } = require("./revalidating"); // Shares the Mutex Set
const { safeRename } = require("./safe-rename");
const { updateStatus } = require("./status-manifest");

function generatingISG(reqPath, isDynamicFromServer) {
  const dist2Folder = path.resolve(process.cwd(), "dist2");
  
  // 1. Concurrency Protection
  if (regenerating.has(reqPath)) return;
  
  try {
    if (existsSync(path.join(dist2Folder, reqPath, "index.html")))
      copyFileSync(
        path.join(dist2Folder, reqPath, "index.html"),
        path.join(dist2Folder, reqPath, "index._old.html")
      );
    if (existsSync(path.join(dist2Folder, reqPath, "rsc.rsc")))
      copyFileSync(
        path.join(dist2Folder, reqPath, "rsc.rsc"),
        path.join(dist2Folder, reqPath, "rsc._old.rsc")
      );
  } catch (e) {
    /* Ignore copy errors */
  }

  // 2. Set Lock in the shared registry
  regenerating.add(reqPath);

  (async () => {
    try {
      console.log(\`[ISG] Promoting new page to static: \${reqPath}...\`);
      const isDynamic = {};
      
      // A. Build Data (Runs compiler with Proxy spies)
      await buildStaticPage(reqPath, isDynamic);

      // B. Dynamic check bailout
      if (isDynamic.value) {
        isDynamicFromServer.value = true;
        console.log(\`[ISG] Skipped \${reqPath}: is dynamic\`);
        return; // Exit compiler - route compiles as dynamic SSR going forward
      }

      // C. Generate and commit RSC Flight payload
      const rscResult = await generateStaticRSC(reqPath);
      if (!rscResult.success) {
        console.warn(\`⚠️ [ISG] RSC generation failed for \${reqPath}. Aborting.\`);
        await fs.unlink(rscResult.tempPath).catch(() => {});
        return;
      }

      await safeRename(rscResult.tempPath, rscResult.finalPath);

      // D. Generate and commit static HTML page
      const pageResult = await generateStaticPage(reqPath);
      if (pageResult.success) {
        await safeRename(pageResult.tempPath, pageResult.finalPath);
        updateStatus(reqPath, pageResult.status);
        isDynamicFromServer.value = false;
        console.log(\`✅ [ISG] Successfully promoted \${reqPath} to static.\`);
      } else {
        await fs.unlink(pageResult.tempPath).catch(() => {});
        console.warn(\`⚠️ [ISG] HTML generation failed for \${reqPath}. Aborting commit.\`);
      }

    } catch (e) {
      console.error(\`[ISG] Critical error promoting \${reqPath}:\`, e);
    } finally {
      // 3. Clear Lock state
      regenerating.delete(reqPath);
    }
  })();
}

module.exports = { generatingISG };`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Rocket className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                ISG Pre-render Engine (generating-isg.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore dynamic incremental static generation, lazy pre-rendering, and runtime cache promotion.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/generating-isg.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Incremental Static Generation (ISG) resolves a classic build scaling dilemma: if your application contains millions of dynamic pages (e.g. e-commerce products), rendering them all at build time would lead to hours of build latency.
              </p>
              <p>
                Instead, Dinou compiles only the most popular pages at build time. For all remaining routes (e.g., <code>/posts/[id]</code> paths that weren't crawled initially), the server runs <code>generating-isg.js</code> on their first request. It lazy-promotes the page into a static file, ensuring subsequent loads skip compilation entirely.
              </p>
            </section>

            <hr className="my-8" />

            {/* LIFECYCLE FLOW */}
            <section id="engine-flow">
              <h2>📊 Compilation Lifecycle</h2>
              <p>
                Below is the lifecycle of an incoming request on a non-compiled path:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{ISG_COMPILATION_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* LAZY PROMOTION */}
            <section id="lazy-promotion">
              <h2>🚀 Lazy Static Promotion</h2>
              <p>
                When the Express routing middleware intercepts a request and detects that the route exists in your dynamic files (e.g. <code>src/posts/[id]/page.tsx</code>) but has no pre-compiled index in the <code>dist2/</code> cache, it triggers the ISG thread:
              </p>
              <ul>
                <li>
                  <strong>Bailout Checking:</strong> The engine renders the component tree. If the page is marked as dynamic (e.g., calls <code>cookies()</code>), it sets <code>isDynamicFromServer.value = true</code> and exits. The server continues to render this path dynamically.
                </li>
                <li>
                  <strong>Cache Promotion:</strong> If the run completes without bailouts, the engine compiles the RSC stream and HTML document. Once successfully saved to disk, subsequent page views bypass the React compiler entirely and are served as static files by Express.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* MUTEX SHARING */}
            <section id="mutex-sharing">
              <h2>🔒 Mutex Sharing & Lock Pools</h2>
              <p>
                To save resources and avoid race conditions, the ISG engine does not maintain its own lock pool.
              </p>
              <p>
                Instead, it shares the exact same <code>Set</code> lock registry imported from <code>revalidating.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const { regenerating } = require("./revalidating");`}</CodeBlock>
              </div>
              <p>
                This ensures that if a background ISR task is already updating a page, the ISG thread cannot attempt to create a parallel compilation task for the same path, and vice versa.
              </p>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>generating-isg.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{GENERATING_ISG_CODE}</CodeBlock>
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
