"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "manifest-flow", title: "📊 Manifest Generator Flow", level: 2 },
  { id: "consumers", title: "🎯 Manifest Consumers", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const MANIFEST_GENERATOR_DIAGRAM = `graph TD
    Start[ManifestGeneratorPlugin.apply: processAssets] --> LoopChunks[Loop compilation.chunks]
    LoopChunks --> Filter[Filter chunks with names]
    Filter --> LoopFiles[Loop chunk.files]
    
    LoopFiles --> Match[Matches .js format?]
    Match -->|Yes| Map[Map chunk.name.js to compiled file path]
    Match -->|No| Skip[Skip file]
    
    Map --> Emit[Emit manifest.json asset]`;

const MANIFEST_CODE = `// manifest-generator-plugin.js
class ManifestGeneratorPlugin {
  constructor() {
    this.manifestData = {}; // same as in Rollup
  }

  apply(compiler) {
    const pluginName = "ManifestGeneratorPlugin";

    compiler.hooks.thisCompilation.tap(pluginName, (compilation) => {
      const { Compilation } = compiler.webpack;

      // Run when all assets are ready
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_ANALYSE,
        },
        (assets) => {
          // Traverse chunks to generate manifest
          for (const chunk of compilation.chunks) {
            if (!chunk.name) continue; // only chunks with a name

            for (const file of chunk.files) {
              if (file.endsWith(".js")) {
                const cleanName = chunk.name + ".js"; // same as Rollup
                this.manifestData[cleanName] = file; // hashed JS file
              }
            }
          }

          // Emit manifest.json
          const json = JSON.stringify(this.manifestData, null, 2);

          compilation.emitAsset(
            "manifest.json",
            new compiler.webpack.sources.RawSource(json)
          );
        }
      );
    });
  }
}

module.exports = new ManifestGeneratorPlugin();`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-primary text-cyan-600 dark:text-cyan-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Manifest Plugin
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the asset maps builder and Webpack chunk trackers used to compile file dependency manifests.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/webpack/plugins/manifest-generator-plugin.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To resolve hashed javascript paths (e.g. <code>main.a1b2c3d4.js</code>) during page rendering and server function postbacks, the loader needs to keep compile mappings in sync. This plugin crawls Webpack compilation outputs to build a chunk dependency index.
              </p>
              <p>
                The plugin hooks into Webpack's asset analysis step (<code>PROCESS_ASSETS_STAGE_ANALYSE</code>). It traverses all output chunks, resolves their names, matches them to output filenames on disk, and writes them to the manifest data:
              </p>
            </section>

            <hr className="my-8" />

            {/* MANIFEST FLOW */}
            <section id="manifest-flow">
              <h2>📊 Manifest Generator Flow</h2>
              <p>
                The flowchart below shows how compilation chunks are crawled and output mapped to <code>manifest.json</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{MANIFEST_GENERATOR_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CONSUMERS */}
            <section id="consumers">
              <h2>🎯 Manifest Consumers</h2>
              <p>
                The emitted <code>manifest.json</code> file is consumed by core subsystems to resolve cache-busted filenames:
              </p>
              <ul>
                <li>
                  <strong>HTML SSR Renderer (<code>render-html.js</code>)</strong>: When compiling the initial HTML response, the server imports the <code>getAssetFromManifest</code> helper to map logical assets (like <code>main.js</code> and <code>error.js</code>) to the compiled, hashed file names on disk.
                </li>
                <li>
                  <strong>Webpack Plugins (<code>ServerFunctionsPlugin</code>)</strong>: During building, plugins read the in-memory object <code>manifestGeneratorPlugin.manifestData</code> to replace temporary placeholders (like <code>__SERVER_FUNCTION_PROXY__</code>) with their finalized production hashes.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full code of the Webpack manifest generator plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{MANIFEST_CODE}</CodeBlock>
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
