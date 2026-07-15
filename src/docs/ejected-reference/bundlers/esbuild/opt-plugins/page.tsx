"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Cpu, RefreshCw, Key, FileCode } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "stable-chunks", title: "⚙️ 1. stable-chunk-names-and-maps-plugin.mjs", level: 2 },
  { id: "babel-compiler", title: "⚛️ 2. babel-react-compiler-plugin.mjs", level: 2 },
  { id: "skip-missing", title: "🛡️ 3. skip-missing-entry-points-plugin.mjs", level: 2 },
  { id: "write-metafile", title: "📋 4. write-metafile-plugin.mjs", level: 2 },
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
                5. Optimization Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the compile optimization filters, chunk hash stabilizers, and error silencers inside the compiler setup.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Analyzed:</strong> <br />
              • Hash stabilizer: <code>./dinou/esbuild/plugins-esbuild/stable-chunk-names-and-maps-plugin.mjs</code> <br />
              • React compiler: <code>./dinou/esbuild/plugins-esbuild/babel-react-compiler-plugin.mjs</code> <br />
              • Missing entries handler: <code>./dinou/esbuild/plugins-esbuild/skip-missing-entry-points-plugin.mjs</code> <br />
              • Bundle auditor: <code>./dinou/esbuild/plugins-esbuild/write-metafile-plugin.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou registers multiple plugins during compile phases to handle chunk hash naming collisions, suppress transient errors during page modifications, and export bundle statistics.
              </p>
            </section>

            <hr className="my-8" />

            {/* STABLE CHUNKS */}
            <section id="stable-chunks">
              <h2>⚙️ 1. <code>stable-chunk-names-and-maps-plugin.mjs</code></h2>
              <p>
                This plugin ensures chunk filenames stay deterministic. When esbuild bundles files with code splitting enabled, it generates shared chunks (such as <code>chunk-A1B2.js</code>). By default, these hashes can change between incremental rebuilds, leading to caching conflicts.
              </p>
              <p>
                The plugin intercepts compile outputs (<code>build.onEnd</code>), reads chunk dependency structures, generates a deterministic signature based on module contents, and renames the files:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`build.onEnd(async (result) => {
  // 1. Traverse metafile outputs to trace chunk graphs
  // 2. Generate a stable hash signature from content inputs
  // 3. Rename chunk files on disk and update internal manifests
});`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* BABEL COMPILER */}
            <section id="babel-compiler">
              <h2>⚛️ 2. <code>babel-react-compiler-plugin.mjs</code></h2>
              <p>
                Integrates the React Compiler (React Forget) to compile components. It intercepts JSX/TSX loaders and applies Babel transformations to optimize hooks, insert memoization, and reduce component render weights automatically:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`build.onLoad({ filter: /\\.[jt]sx?$/ }, async (args) => {
  const source = await fs.readFile(args.path, "utf8");
  const result = await babel.transformAsync(source, {
    plugins: ["babel-plugin-react-compiler"]
  });
  return { contents: result.code, loader: "js" };
});`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SKIP MISSING */}
            <section id="skip-missing">
              <h2>🛡️ 3. <code>skip-missing-entry-points-plugin.mjs</code></h2>
              <p>
                In local development, if you rename or delete a routing directory (e.g. <code>src/app/about/page.tsx</code>), Chokidar detects the change and triggers a rebuild, but esbuild can throw an error because the target entry point no longer exists on disk.
              </p>
              <p>
                This plugin intercepts esbuild resolution hooks, checks if the target file exists, and removes the entry point from the active compiler options if it is missing, preventing build failures.
              </p>
            </section>

            <hr className="my-8" />

            {/* WRITE METAFILE */}
            <section id="write-metafile">
              <h2>📋 4. <code>write-metafile-plugin.mjs</code></h2>
              <p>
                After compilation, this plugin writes a detailed JSON report (<code>metafile.json</code>) detailing input sizes, dependencies, and chunk relationships. This metadata is useful for bundle auditing and visualization tools.
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
