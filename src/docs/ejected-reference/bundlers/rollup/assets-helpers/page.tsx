"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Cpu, Settings } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "asset-plugin", title: "🖼️ 1. dinou-asset-plugin.js", level: 2 },
  { id: "manifest-generator", title: "📋 2. manifest-generator-plugin.js", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orange-600 dark:text-orange-500">
                4. Asset & Helpers Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the static asset loader and SSR require manifest builder files inside the Rollup setup.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Analyzed:</strong> <br />
              • Asset Loader: <code>./dinou/rollup/rollup-plugins/dinou-asset-plugin.js</code> <br />
              • Chunk Mapper: <code>./dinou/rollup/rollup-plugins/manifest-generator-plugin.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To complete client bundle builds, Rollup copies dynamic media assets and outputs chunk mapping manifests for server-side require resolvers.
              </p>
            </section>

            <hr className="my-8" />

            {/* ASSET PLUGIN */}
            <section id="asset-plugin">
              <h2>🖼️ 1. <code>dinou-asset-plugin.js</code></h2>
              <p>
                Copies images, fonts, and other binary files imported inside React component trees to the build folder with a hash signature:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function dinouAssetPlugin() {
  return {
    name: "dinou-asset-plugin",
    async load(id) {
      if (!assetInclude.test(id)) return null;

      const source = await fs.readFile(id);
      const ext = path.extname(id);
      const base = path.basename(id, ext);

      // 1. Generate unique deterministic scoped names
      const hashName = createScopedName(base, id);
      const assetFileName = \`assets/\${hashName}\${ext}\`;

      // 2. Emit the asset file into Rollup's compilation tree
      const referenceId = this.emitFile({
        type: "asset",
        name: base + ext,
        fileName: assetFileName,
        source: source
      });

      // 3. Return the static URL path to the bundle
      return \`export default "/\${assetFileName}";\`;
    }
  };
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* MANIFEST GENERATOR */}
            <section id="manifest-generator">
              <h2>📋 2. <code>manifest-generator-plugin.js</code></h2>
              <p>
                Aggregates compiled chunk IDs and exports the SSR require manifest mapping file: <code>react-ssr-manifest.json</code>.
              </p>
              <p>
                When a page renders on the server, the Node SSR engine reads this file to locate and load compiled layout modules, keeping paths synchronized across client builds and server execution:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="json">{`{
  "./src/app/page.tsx": {
    "id": "./src/app/page.tsx",
    "chunks": [
      "/chunks/page-h1a2.js"
    ]
  }
}`}</CodeBlock>
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
