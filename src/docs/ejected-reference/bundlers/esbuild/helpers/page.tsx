"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Settings, FileCode, Cpu, Layers } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "get-entries", title: "📂 1. get-esbuild-entries.mjs", level: 2 },
  { id: "update-manifest", title: "📋 2. update-manifest-for-module.mjs", level: 2 },
  { id: "write-helper", title: "💾 3. write.mjs", level: 2 },
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
                7. Entry & File Helpers
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the helper utilities inside <code>helpers-esbuild/</code> that crawl project directories, compile entries, and handle file writes.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Analyzed:</strong> <br />
              • Entry compiler: <code>./dinou/esbuild/helpers-esbuild/get-esbuild-entries.mjs</code> <br />
              • Manifest loader: <code>./dinou/esbuild/helpers-esbuild/update-manifest-for-module.mjs</code> <br />
              • Writer concurrency utility: <code>./dinou/esbuild/helpers-esbuild/write.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou exposes helper utilities to configure and execute builds. These scripts resolve entrypoints, update manifests, and handle concurrent file-write conflicts.
              </p>
            </section>

            <hr className="my-8" />

            {/* GET ENTRIES */}
            <section id="get-entries">
              <h2>📂 1. <code>get-esbuild-entries.mjs</code></h2>
              <p>
                Dynamically crawls project directories to configure build entry points.
              </p>
              
              <h3>Features</h3>
              <ul>
                <li><strong>Crawl App Router Pages:</strong> Recursively scans <code>src/app/</code> for layout files (<code>layout.tsx</code>), page views (<code>page.tsx</code>), and custom error hooks.</li>
                <li><strong>Resolve Client & Server Files:</strong> Scans target directories, processes typescript formats, and determines compilation targets.</li>
                <li><strong>Separate Styles & Assets:</strong> Extracts CSS stylesheets and assets into separate compiling passes:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`const [esbuildEntries, detectedCSSEntries, detectedAssetEntries] = 
  await getEsbuildEntries({ manifest });`}</CodeBlock>
                  </div>
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* UPDATE MANIFEST */}
            <section id="update-manifest">
              <h2>📋 2. <code>update-manifest-for-module.mjs</code></h2>
              <p>
                Dynamically registers client component maps. When the watcher registers changes in framework components (like <code>link.jsx</code> or <code>client-redirect.jsx</code>), it reads the file, parses exports, and inserts the target mappings into the active client manifest:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`export function updateManifestForModule(absPath, code, isFramework, manifest) {
  const exports = parseExports(code);
  const fileUrl = pathToFileURL(absPath).href;
  
  for (const exp of exports) {
    const key = exp === "default" ? fileUrl : \`\${fileUrl}#\${exp}\`;
    manifest[key] = {
      id: isFramework ? "/main.js" : getHashedBundlePath(absPath),
      name: exp,
      chunks: []
    };
  }
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* WRITE HELPER */}
            <section id="write-helper">
              <h2>💾 3. <code>write.mjs</code></h2>
              <p>
                During fast local incremental rebuilds, multiple processes can write changes to the same files (like manifest updates) at the same time, leading to write conflicts.
              </p>
              <p>
                <code>write.mjs</code> wraps standard file write operations (<code>fs.writeFile</code>) in a concurrency lock queue, ensuring that file writes are queued and executed sequentially.
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
