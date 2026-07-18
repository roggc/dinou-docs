"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Hammer, Settings } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "assets-flow", title: "📊 Assets Plugin Flow", level: 2 },
  { id: "manifest-flow", title: "📊 Manifest Generator Flow", level: 2 },
  { id: "code-assets", title: "⚙️ dinou-asset-plugin.js Walkthrough", level: 2 },
  { id: "code-manifest", title: "⚙️ manifest-generator-plugin.js Walkthrough", level: 2 },
];

const ASSETS_FLOW_DIAGRAM = `graph TD
    Start[File loaded by Rollup] --> Check{Is static asset?}
    Check -->|No| Pass[Pass through / Return null]
    Check -->|Yes| Read[fs.promises.readFile contents]
    Read --> Hash[createScopedName signature]
    Hash --> Emit[this.emitFile as asset]
    Emit --> Return[Return client-side asset path import code]`;

const MANIFEST_FLOW_DIAGRAM = `graph TD
    Start[generateBundle hook] --> Loop[Iterate bundle files]
    Loop --> Check{Is it a JS chunk?}
    Check -->|Yes| Map[Map original chunk name to compiled filename]
    Check -->|No| Skip[Skip]
    Map --> Emit[Emit manifest.json asset]`;

const ASSETS_CODE = `const fs = require("fs");
const path = require("path");
const createScopedName = require("../../core/createScopedName.js");
const { regex } = require("../../core/asset-extensions.js");

function dinouAssetPlugin({ include = regex } = {}) {
  return {
    name: "dinou-asset-plugin",
    async load(id) {
      if (!include.test(id)) return null;

      const source = await fs.promises.readFile(id);

      const base = path.basename(id, path.extname(id));
      const scoped = createScopedName(base, id);
      const ext = path.extname(id);

      const fileName = \`assets/\${scoped}\${ext}\`;

      this.emitFile({
        type: "asset",
        fileName,
        source,
      });

      return \`export default '/assets/\${scoped}\${ext}';\`;
    },
  };
}

module.exports = dinouAssetPlugin;`;

const MANIFEST_CODE = `let manifestData = {};

function manifestGeneratorPlugin() {
  return {
    name: "manifest-generator",
    generateBundle(options, bundle) {
      for (const [fileName, info] of Object.entries(bundle)) {
        if (info.type === "chunk" && info.name) {
          const cleanName = info.name + ".js";
          manifestData[cleanName] = fileName;
        }
      }

      this.emitFile({
        type: "asset",
        fileName: "manifest.json",
        source: JSON.stringify(manifestData, null, 2),
      });
    },
  };
}

manifestGeneratorPlugin.manifestData = manifestData;

module.exports = manifestGeneratorPlugin;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Hammer className="h-6 w-6 text-primary text-orange-600 dark:text-orange-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Asset & Helpers Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the static asset loader and SSR require manifest builder files inside the Rollup setup.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Location:</strong> <br />
              • Asset Loader: <code>./dinou/rollup/rollup-plugins/dinou-asset-plugin.js</code> <br />
              • Chunk Mapper: <code>./dinou/rollup/rollup-plugins/manifest-generator-plugin.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In a custom React Server Component framework, assets (like images or stylesheets) must be copied to the public directory and mapped appropriately.
              </p>
              <p>
                The asset plugin intercepts asset imports, copies them to the final build location with a content hash, and changes imports to return the public path string. The manifest generator outputs mapping metadata files so that references can be dynamically reconstructed on client runs.
              </p>
            </section>

            <hr className="my-8" />

            {/* ASSETS FLOW */}
            <section id="assets-flow">
              <h2>📊 Assets Plugin Flow</h2>
              <p>
                The flowchart below shows how static files are intercepted, scoped, and resolved from JavaScript chunks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="650px">{ASSETS_FLOW_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* MANIFEST FLOW */}
            <section id="manifest-flow">
              <h2>📊 Manifest Generator Flow</h2>
              <p>
                The flowchart below shows how entrypoint names are mapped to final hashed filenames in the build manifest:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="650px">{MANIFEST_FLOW_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH ASSETS */}
            <section id="code-assets">
              <h2>⚙️ dinou-asset-plugin.js Walkthrough</h2>
              <p>
                Below is the full code of the Rollup assets extraction plugin:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{ASSETS_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH MANIFEST */}
            <section id="code-manifest">
              <h2>⚙️ manifest-generator-plugin.js Walkthrough</h2>
              <p>
                Below is the full code of the build manifest generator plugin:
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
