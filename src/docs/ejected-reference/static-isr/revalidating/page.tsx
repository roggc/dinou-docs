"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { RefreshCw, Clock, Lock, FileCopy, ShieldAlert } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "lifecycle-diagram", title: "📊 Revalidation Lifecycle", level: 2 },
  { id: "lock-mechanism", title: "🔒 Mutex Lock & Concurrency Control", level: 2 },
  { id: "invocation", title: "🎯 Invocation & SWR Serving", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
  { id: "stale-backup", title: "💾 Backup & Double-buffer Commit", level: 2 },
];

const ISR_LIFECYCLE_DIAGRAM = `graph TD
    Start["🌐 Browser GET Request"] --> CacheCheck{"Exists in Cache?"}
    
    CacheCheck -->|"No"| RenderDynamic["Render dynamically from Server"]
    CacheCheck -->|"Yes"| ServeHTML["Serve index.html (Instant Load)"]
    
    ServeHTML --> ExpiryCheck{"Verify Expiration:<br/>Date.now() > generatedAt + revalidate?"}
    ExpiryCheck -->|"No"| Done["Done / Stop"]
    ExpiryCheck -->|"Yes"| LockCheck{"Mutex Lock Active?"}
    
    LockCheck -->|"Yes"| Skip["Skip / Wait"]
    LockCheck -->|"No"| RunReval["1. Set Lock<br/>2. Back up Stale Files<br/>3. Compile new payloads<br/>4. Commit via safeRename<br/>5. Release Lock"]`;

const REVALIDATING_CODE = `const path = require("path");
const fs = require("fs").promises;
const { existsSync, copyFileSync } = require("fs");
const generateStaticPage = require("./generate-static-page");
const { buildStaticPage } = require("./build-static-pages");
const generateStaticRSC = require("./generate-static-rsc");
const { safeRename } = require("./safe-rename");
const { updateStatus } = require("./status-manifest");

const regenerating = new Set(); // Mutex pool to prevent duplicate builders

function revalidating(reqPath, isDynamicFromServer) {
  const dist2Folder = path.resolve(process.cwd(), "dist2");
  const metadataPath = path.join(dist2Folder, reqPath, "metadata.json");

  // 1. Concurrency Check
  if (regenerating.has(reqPath)) return;

  fs.readFile(metadataPath, "utf8")
    .then((content) => {
      const metadata = JSON.parse(content);
      const { revalidate, generatedAt } = metadata;

      // 2. Expiration Check (Compare timestamps against metadata.json)
      const isExpired =
        typeof revalidate === "number" &&
        revalidate > 0 &&
        Date.now() > generatedAt + revalidate;

      if (isExpired && !regenerating.has(reqPath)) {
        try {
          // 3. Back up the current page to avoid blank reads during compile
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
          console.error("[ISR] copyFileSync error:", e);
        }

        // 4. Lock path segment to block concurrent compilation loops
        regenerating.add(reqPath);

        (async () => {
          try {
            console.log(\`[ISR] Starting regeneration for \${reqPath}...\`);
            const isDynamic = {};
            
            // Re-render Page & Layout components
            await buildStaticPage(reqPath, isDynamic);
            
            // Dynamic Bailout evaluation
            if (isDynamic.value) {
              isDynamicFromServer.value = true;
              console.log(\`[ISR] Bailout detected for \${reqPath}. Switching to Dynamic.\`);
              return;
            }

            // Generate RSC payload to temp folder
            const rscResult = await generateStaticRSC(reqPath);
            if (!rscResult.success) {
              console.warn(\`⚠️ [ISR] RSC generation failed for \${reqPath}. Aborting.\`);
              await fs.unlink(rscResult.tempPath).catch(() => {});
              return;
            }

            // Commit RSC payload first (required for HTML compiler)
            await safeRename(rscResult.tempPath, rscResult.finalPath);

            // Generate static HTML
            const pageResult = await generateStaticPage(reqPath);
            if (pageResult.success) {
              await safeRename(pageResult.tempPath, pageResult.finalPath);
              updateStatus(reqPath, pageResult.status);
              isDynamicFromServer.value = false;
              console.log(\`✅ [ISR] Successfully committed \${reqPath} (Status: \${pageResult.status})\`);
            } else {
              console.warn(\`⚠️ [ISR] HTML generation failed for \${reqPath}. Aborting commit.\`);
              await fs.unlink(pageResult.tempPath).catch(() => {});
            }
          } catch (e) {
            console.error(\`[ISR] Critical error regenerating \${reqPath}:\`, e);
          } finally {
            // 5. Release Lock regardless of outcome
            regenerating.delete(reqPath);
          }
        })();
      }
    })
    .catch((err) => {});
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <RefreshCw className="h-6 w-6 text-primary animate-spin-slow" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Background ISR Engine (revalidating.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore how Dinou handles background cache updates (ISR) when pages expire, using locks to prevent duplicate rendering tasks.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/revalidating.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Incremental Static Regeneration (ISR) enables you to keep your site static without rebuilding the entire application. When a user requests an expired route, the server immediately serves the <strong>stale</strong> page from disk (eliminating TTFB latency) and schedules an asynchronous compilation task in the background to refresh the cache.
              </p>
            </section>

            <hr className="my-8" />

            {/* REVALIDATION LIFECYCLE */}
            <section id="lifecycle-diagram">
              <h2>📊 Revalidation Lifecycle</h2>
              <p>
                The flowchart below shows how checks are run in parallel to the user response loop to trigger background builds:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="700px">{ISR_LIFECYCLE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* LOCK MECHANISM */}
            <section id="lock-mechanism">
              <h2>🔒 Mutex Lock & Concurrency Control</h2>
              <p>
                If an expired page experiences high concurrent traffic (e.g. thousands of request hits in a single second), running a background render task for each request would crash the CPU.
              </p>
              <p>
                Dinou prevents this via a shared Mutex Lock pool:
              </p>
              <ul>
                <li>
                  <strong>Lock Registration:</strong> The engine registers a <code>Set</code> structure called <code>regenerating</code>.
                </li>
                <li>
                  <strong>Check and Block:</strong> Before starting compilation, the engine evaluates <code>regenerating.has(reqPath)</code>. If it returns true, the task exits immediately, bypassing parallel execution.
                </li>
                <li>
                  <strong>Cleanup:</strong> Inside a <code>finally</code> block, the lock is released using <code>regenerating.delete(reqPath)</code>, enabling the next cache pass when expiration occurs.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* INVOCATION & SWR SERVING */}
            <section id="invocation">
              <h2>🎯 Invocation & SWR Serving (Where is it called?)</h2>
              <p>
                The <code>revalidating</code> function is imported and called by the main web server (<a href="/docs/ejected-reference/server"><code>core/server.js</code></a>) inside the request routing middleware when intercepting GET requests.
              </p>
              <p>
                To implement the <strong>Stale-While-Revalidate (SWR)</strong> pattern, the server checks the route conditions, triggers the background compilation, and immediately serves the cached file (meaning the client doesn't wait for compilation):
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// Inside core/server.js:
if (!isDevelopment && !dynamicState.value && pagePath && !isPathBlocked) {
  revalidating(reqPath, dynamicState); // Calls the background SWR engine

  let htmlPathOld;
  if (regenerating.has(reqPath)) {
    // If compilation is currently active, fall back to the backup stale file
    htmlPathOld = path.join("dist2", reqPath, "index._old.html");
  }
  const htmlPath = path.join("dist2", reqPath, "index.html");
  const fileToRead = htmlPathOld || htmlPath;

  // Instantly serve the cached file to the user
  if (existsSync(fileToRead) && !dynamicState.value) {
    res.setHeader("Content-Type", "text/html");
    res.statusCode = getStatus(reqPath) || 200;
    return fs.createReadStream(fileToRead).pipe(res);
  }
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>revalidating.js</code> responsible for checking timestamps and rebuilding routes:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{REVALIDATING_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* STALE BACKUP */}
            <section id="stale-backup">
              <h2>💾 Backup & Double-buffer Commit</h2>
              <p>
                To avoid files being corrupt or partially written during compilation:
              </p>
              <ol>
                <li>
                  <strong>Copy to Stale:</strong> The engine copies current files to <code>index._old.html</code> and <code>rsc._old.rsc</code>. If a request hits during compilation, the Express server falls back to serve these files.
                </li>
                <li>
                  <strong>Double-buffered compilation:</strong> Builders render HTML and RSC payloads to <strong>temporary files</strong> (e.g., <code>index.html.tmp</code>).
                </li>
                <li>
                  <strong>Atomic Commit:</strong> Once compilation completes successfully, <code>safeRename()</code> executes a native file rename operation (which is atomic at OS-level), replacing the old file without page downtime.
                </li>
              </ol>
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
