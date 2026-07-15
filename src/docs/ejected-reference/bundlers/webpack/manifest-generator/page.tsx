"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Cpu, Settings } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "analyse-phase", title: "⚙️ 1. PROCESS_ASSETS_STAGE_ANALYSE chunk trace", level: 2 },
  { id: "output-format", title: "📋 2. manifest.json structure", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-cyan-600 dark:text-cyan-500">
                4. Manifest Plugin
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the asset maps builder and Webpack chunk trackers used to compile file dependency manifests.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Focus File:</strong> <code>./dinou/webpack/plugins/manifest-generator-plugin.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To resolve hashed javascript paths (e.g. <code>main.a1b2c3d4.js</code>) during page rendering and action postbacks, the loader needs to keep compile mappings in sync. This plugin crawls Webpack compilation outputs to build a chunk dependency index.
              </p>
            </section>

            <hr className="my-8" />

            {/* ANALYSE PHASE */}
            <section id="analyse-phase">
              <h2>⚙️ 1. <code>PROCESS_ASSETS_STAGE_ANALYSE</code> chunk trace</h2>
              <p>
                The plugin hooks into Webpack's asset analysis step (<code>PROCESS_ASSETS_STAGE_ANALYSE</code>). It traverses all output chunks, resolves their names, matches them to output filenames on disk, and writes them to the manifest data:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`compilation.hooks.processAssets.tap(
  {
    name: "ManifestGeneratorPlugin",
    stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
  },
  (assets) => {
    for (const chunk of compilation.chunks) {
      if (!chunk.name) continue;

      for (const file of chunk.files) {
        if (file.endsWith(".js")) {
          const cleanName = chunk.name + ".js";
          this.manifestData[cleanName] = file; // Maps chunk name to hashed output
        }
      }
    }
  }
);`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* OUTPUT FORMAT */}
            <section id="output-format">
              <h2>📋 2. <code>manifest.json</code> structure</h2>
              <p>
                Finally, the plugin writes the chunk mapping manifest:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="json">{`{
  "main.js": "assets/main.a1b2c3d4.js",
  "serverFunctionProxy.js": "assets/serverFunctionProxy.h7y8u9i0.js"
}`}</CodeBlock>
              </div>
              <p>
                Other Webpack plugins and loaders read this file to replace temporary placeholders (such as <code>__SERVER_FUNCTION_PROXY__</code>) with their finalized production URLs.
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
