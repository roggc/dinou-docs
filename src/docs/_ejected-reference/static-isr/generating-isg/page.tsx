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
  { id: "invocation", title: "🎯 Invocation & Conditionals", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const ISG_COMPILATION_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '20px' }}}%%
graph TD
    Start["User GET Request: /posts/42<br/>(Dynamic un-cached route request)"] --> DiskCheck{"Does file exist on disk?<br/>(Check dist2 static cache)"}
    
    DiskCheck -->|"Yes"| ServeStatic["Serve Static index.html<br/>(Instant cache hit / Bypass rendering)"]
    DiskCheck -->|"No"| CallISG["Call generatingISG(path)<br/>(Trigger on-demand pre-render)"]
    
    CallISG --> MutexCheck{"Mutex Lock Pool Active?<br/>(Check regenerating Set pool)"}
    MutexCheck -->|"Yes"| Exit["Skip Compilation<br/>(Another worker is generating)"]
    MutexCheck -->|"No"| RunISG["Run buildStaticPage<br/>(Acquire mutex lock & evaluate route)"]
    
    RunISG --> BailCheck{"Dynamic Bailout Detected?<br/>(e.g., cookies() or headers() access)"}
    BailCheck -->|"Yes"| SSR["Switch to Runtime SSR<br/>(Serve dynamic render / Mark isDynamic)"]
    BailCheck -->|"No"| SaveCache["Commit Static Artifacts<br/>(Compile RSC & HTML, safeRename & release lock)"]`;

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
              Explore how Dinou dynamically generates and caches dynamic routes on their first request at runtime.
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
                Incremental Static Generation (ISG) resolves a classic scaling dilemma: if your application contains thousands or millions of dynamic paths (such as product detail pages), rendering all of them upfront would lead to significant delay and resource consumption.
              </p>
              <p>
                To optimize this, during production server startup, Dinou evaluates which routes should be static. For routes with dynamic segments (e.g., <code>/posts/[id]</code>), it pre-compiles only the paths explicitly returned by the route's <code>getStaticPaths()</code> function. For all other un-precompiled paths, the server executes <code>generating-isg.js</code> on their first request. This dynamic compiler evaluates the route, creates the static cache files (both RSC and HTML) on disk, and promotes the route to static so that subsequent visits bypass rendering entirely.
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
                <CodeBlock language="mermaid" minWidth="950px">{ISG_COMPILATION_DIAGRAM}</CodeBlock>
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

            {/* INVOCATION & CONDITIONALS */}
            <section id="invocation">
              <h2>🎯 Invocation & Conditionals (Where is it called?)</h2>
              <p>
                The <code>generatingISG</code> function is imported and called by the main web server (<a href="/docs/ejected-reference/server/main-server"><code>core/server.js</code></a>) during the handling of wildcard page requests (<code>/*</code>).
              </p>
              <p>
                To avoid slowing down the active user's request, the server executes the compilation as a <strong>"fire-and-forget" background task</strong>. It waits until the response has successfully finished streaming to the client (listening to Express's <code>res.on("finish")</code>) and then checks these conditions:
              </p>
              <ul>
                <li><strong>Production Only (<code>!isDevelopment</code>):</strong> ISG cache files are only compiled and served in production mode.</li>
                <li><strong>Success Status (<code>res.statusCode === 200</code>):</strong> Only promotes the page if it rendered successfully without crashes.</li>
                <li><strong>HTTP GET Method (<code>req.method === "GET"</code>):</strong> Only triggers compilation on standard GET navigations.</li>
                <li><strong>Server Ready (<code>isReady</code>):</strong> Verifies that the initial startup SSG generation of crawled routes has completed.</li>
              </ul>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// Inside core/server.js wildcard route handler:
res.on("finish", () => {
  if (
    !isDevelopment &&
    res.statusCode === 200 &&
    req.method === "GET" &&
    isReady
  ) {
    generatingISG(reqPath, dynamicState); // Triggers background compile
  }
});`}</CodeBlock>
              </div>
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
