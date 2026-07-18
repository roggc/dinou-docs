"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Zap, Link2, Tags, FolderSearch, ShieldAlert } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "engine-flow", title: "📊 Revalidation Flow", level: 2 },
  { id: "path-revalidation", title: "⚡ Path Invalidation (revalidatePath)", level: 2 },
  { id: "tag-revalidation", title: "🏷️ Tag Invalidation (revalidateTag)", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const CACHE_REVALIDATE_DIAGRAM = `graph TD
    Start[On-Demand Revalidation Trigger] --> PathTrigger[revalidatePath /path]
    Start --> TagTrigger[revalidateTag cms-tag]
    
    PathTrigger --> NormalizePath[Normalize path URI]
    NormalizePath --> Backup[Backup stale files]
    Backup --> BuildStatic[buildStaticPage & generateStaticRSC & generateStaticPage]
    BuildStatic --> Commit[safeRename commit]
    Commit --> Done[Done / Stop]
    
    TagTrigger --> WalkDirs[Walk dist2/ folders & read metadata.json]
    WalkDirs --> MatchCheck{Does tags array match?}
    MatchCheck -->|Yes| CallPath[Call revalidatePath matchedPath]
    MatchCheck -->|No| Skip[Skip]
    CallPath --> PromiseAll[Promise.all Execution / Await all revalidations]
    PromiseAll --> Done`;

const CACHE_REVALIDATE_CODE = `const path = require("path");
const fs = require("fs").promises;
const { existsSync, copyFileSync } = require("fs");
const generateStaticPage = require("./generate-static-page");
const { buildStaticPage } = require("./build-static-pages");
const generateStaticRSC = require("./generate-static-rsc");
const { safeRename } = require("./safe-rename");
const { updateStatus } = require("./status-manifest");

const { getContext } = require("./request-context");
const { resolveRelativeUrl } = require("./url-resolver");

// 1. Recursive helper to scan cache folder
async function walkMetadataFiles(dir, fileList = []) {
  try {
    const files = await fs.readdir(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = await fs.stat(filePath);
      if (stat.isDirectory()) {
        await walkMetadataFiles(filePath, fileList);
      } else if (file === "metadata.json") {
        fileList.push(filePath);
      }
    }
  } catch (err) {
    // Ignore read errors for individual folders/files
  }
  return fileList;
}

// 2. Invalidate individual paths instantly
async function revalidatePath(reqPath) {
  let targetPath = reqPath;

  // Resolve relative paths if the request context is active
  if (targetPath && !targetPath.startsWith("/") && !targetPath.includes("://")) {
    const ctx = getContext();
    let currentPathname = "/";
    if (ctx && ctx.req) {
      const referer = ctx.req.headers?.referer;
      if (referer) {
        try {
          currentPathname = new URL(referer).pathname;
        } catch (e) {}
      } else {
        currentPathname = ctx.req.path || "/";
      }
    }
    targetPath = resolveRelativeUrl(targetPath, currentPathname);
  }

  let cleanPath = targetPath;
  if (!cleanPath.startsWith("/")) {
    cleanPath = "/" + cleanPath;
  }
  if (cleanPath !== "/" && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }

  const dist2Folder = path.resolve(process.cwd(), "dist2");
  const reqPathWithSlash = cleanPath.endsWith("/") ? cleanPath : cleanPath + "/";

  // Backup current pages to avoid blank reads
  try {
    if (existsSync(path.join(dist2Folder, reqPathWithSlash, "index.html"))) {
      copyFileSync(
        path.join(dist2Folder, reqPathWithSlash, "index.html"),
        path.join(dist2Folder, reqPathWithSlash, "index._old.html")
      );
    }
    if (existsSync(path.join(dist2Folder, reqPathWithSlash, "rsc.rsc"))) {
      copyFileSync(
        path.join(dist2Folder, reqPathWithSlash, "rsc.rsc"),
        path.join(dist2Folder, reqPathWithSlash, "rsc._old.rsc")
      );
    }
  } catch (e) {
    // Ignore copy errors
  }

  console.log(\`[Revalidate] Starting on-demand revalidation for \${cleanPath}...\`);
  try {
    const isDynamic = {};
    await buildStaticPage(cleanPath, isDynamic);
    if (isDynamic.value) {
      console.log(\`[Revalidate] Bailout detected for \${cleanPath}. Switching to dynamic.\`);
      return;
    }

    const rscResult = await generateStaticRSC(cleanPath);
    if (!rscResult.success) {
      console.warn(\`⚠️ [Revalidate] RSC generation failed for \${cleanPath}.\`);
      if (rscResult.tempPath && existsSync(rscResult.tempPath)) {
        await fs.unlink(rscResult.tempPath).catch(() => {});
      }
      return;
    }

    await safeRename(rscResult.tempPath, rscResult.finalPath);

    const pageResult = await generateStaticPage(cleanPath);
    if (pageResult.success) {
      await safeRename(pageResult.tempPath, pageResult.finalPath);
      updateStatus(cleanPath, pageResult.status);
      console.log(\`✅ [Revalidate] Successfully revalidated \${cleanPath} (Status: \${pageResult.status})\`);
    } else {
      console.warn(\`⚠️ [Revalidate] HTML generation failed for \${cleanPath}.\`);
      if (pageResult.tempPath && existsSync(pageResult.tempPath)) {
        await fs.unlink(pageResult.tempPath).catch(() => {});
      }
    }
  } catch (e) {
    console.warn(\`⚠️ [Revalidate] Failed to revalidate \${cleanPath}:\`, e.message || e);
  }
}

// 3. Invalidate pages matching a specific cache tag
async function revalidateTag(tag) {
  console.log(\`[Revalidate] Starting on-demand revalidation for tag: "\${tag}"...\`);
  const dist2Folder = path.resolve(process.cwd(), "dist2");
  if (!existsSync(dist2Folder)) return;

  const metadataFiles = await walkMetadataFiles(dist2Folder);
  const revalidatePromises = [];

  for (const fileOfMeta of metadataFiles) {
    try {
      const content = await fs.readFile(fileOfMeta, "utf8");
      const metadata = JSON.parse(content);
      if (metadata && Array.isArray(metadata.tags) && metadata.tags.includes(tag)) {
        // Resolve cache folder back to URL route
        const relative = path.relative(dist2Folder, path.dirname(fileOfMeta));
        const reqPath = "/" + relative.replace(/\\\\/g, "/");
        revalidatePromises.push(revalidatePath(reqPath));
      }
    } catch (err) {
      console.error(\`[Revalidate] Error reading tags from \${fileOfMeta}:\`, err);
    }
  }

  // Await all invalidations in parallel
  await Promise.all(revalidatePromises);
}

module.exports = {
  revalidatePath,
  revalidateTag,
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-6 w-6 text-primary animate-pulse" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                On-Demand Purge Engine (cache-revalidate.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the immediate, webhook-driven cache invalidation API for paths and custom database tags.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/cache-revalidate.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                While Background ISR updates pages lazily on user visits, <strong>On-Demand Revalidation</strong> allows developers to force-purge and rebuild page caches immediately. This is crucial for blogs, e-commerce stores, and CMS integrations where database updates must reflect instantly to visitors without waiting for cache timers to tick down.
              </p>
            </section>

            <hr className="my-8" />

            {/* REVALIDATION FLOW */}
            <section id="engine-flow">
              <h2>📊 Revalidation Flow</h2>
              <p>
                The diagram below illustrates how path-based updates differ from the recursive tag-based invalidation search:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="700px">{CACHE_REVALIDATE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PATH REVALIDATION */}
            <section id="path-revalidation">
              <h2>⚡ Path Invalidation (<code>revalidatePath</code>)</h2>
              <p>
                Invoking <code>revalidatePath("/some/route")</code> normalizes the target path and immediately runs the build sequence:
              </p>
              <ul>
                <li>
                  <strong>Relative Path Resolution:</strong> If the path is relative (e.g. <code>"./details"</code>), the engine accesses <code>getContext()</code>. It inspects the HTTP <code>Referer</code> header to resolve the caller's active location and translates the path into an absolute system route.
                </li>
                <li>
                  <strong>Bailout Checking:</strong> The builder renders the path inside a compiler context. If the page performs database calls that read dynamic headers or cookies during this run, a bailout triggers, and static output generation skips.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* TAG REVALIDATION */}
            <section id="tag-revalidation">
              <h2>🏷️ Tag Invalidation (<code>revalidateTag</code>)</h2>
              <p>
                Often, a database item spans multiple pages (e.g. a product card appears in the homepage, catalog, and product page). Tag-based invalidation allows purging all related pages with a single identifier:
              </p>
              <ol>
                <li>
                  <strong>Fs Meta-Walking:</strong> The <code>walkMetadataFiles()</code> function crawls the <code>dist2/</code> directory recursively, collecting all <code>metadata.json</code> files.
                </li>
                <li>
                  <strong>Tag Validation:</strong> For each file, it checks if the <code>tags</code> array (generated during static compilation) contains the queried tag string.
                </li>
                <li>
                  <strong>Path Extraction & Build:</strong> Resolves the folder path of matches back to system routes and triggers <code>revalidatePath()</code>.
                </li>
                <li>
                  <strong>Concurred Awaiting:</strong> Promisifies all rebuild tasks and resolves them in parallel using <code>Promise.all()</code>.
                </li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>cache-revalidate.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{CACHE_REVALIDATE_CODE}</CodeBlock>
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
