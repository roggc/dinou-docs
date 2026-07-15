"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Settings, FileCode, Cpu, Layers } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "assets-plugin", title: "🖼️ 1. assets-plugin.mjs", level: 2 },
  { id: "css-processor-plugin", title: "🎨 2. css-processor-plugin.mjs", level: 2 },
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
                4. Style & Asset Plugins
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Analyze the inner mechanics of Dinou's esbuild extensions for processing CSS Modules and hashing binary media files.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Analyzed:</strong> <br />
              • Asset Loader: <code>./dinou/esbuild/plugins-esbuild/assets-plugin.mjs</code> <br />
              • Style Loader: <code>./dinou/esbuild/plugins-esbuild/css-processor-plugin.mjs</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Because esbuild lacks built-in support for processing CSS Modules and hashing referenced images, Dinou implements custom loaders to handle these tasks during build steps.
              </p>
            </section>

            <hr className="my-8" />

            {/* ASSETS PLUGIN */}
            <section id="assets-plugin">
              <h2>🖼️ 1. <code>assets-plugin.mjs</code></h2>
              <p>
                This plugin intercepts media assets (such as PNGs, SVGs, JPGs, WOFF2s) imported inside scripts, copies them to the public assets directory, and returns their final hashed filenames:
              </p>
              
              <h3>Key Steps</h3>
              <ol>
                <li><strong>Namespace assignment:</strong> In <code>build.onResolve</code>, it intercepts imports matching the media extension regex and tags them under the <code>dinou-asset</code> namespace.</li>
                <li><strong>OnLoad intercept:</strong> Reads the raw binary file from the disk and feeds it to esbuild's file loader.</li>
                <li><strong>Post-Build Hash Syncing:</strong> In <code>build.onEnd</code>, it reads <code>metafile.outputs</code>, computes scoped hashes using <code>createScopedName</code> (the same hash logic used by the Node require hook), and updates the filenames. This prevents naming mismatches between client bundles and server execution.</li>
              </ol>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`build.onResolve({ filter: include }, (args) => {
  const resolvedAlias = getAbsPathWithExt(args.path, {
    parentURL: pathToFileURL(args.importer).href,
  });
  return { path: resolvedAlias, namespace: "dinou-asset" };
});

build.onLoad({ filter: /.*/, namespace: "dinou-asset" }, async (args) => {
  const contents = await fs.readFile(args.path);
  return { contents, loader: "file" }; // instructs esbuild to copy the file
});`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CSS PROCESSOR PLUGIN */}
            <section id="css-processor-plugin">
              <h2>🎨 2. <code>css-processor-plugin.mjs</code></h2>
              <p>
                Extracts and compiles CSS styles using PostCSS.
              </p>
              
              <h3>Features</h3>
              <ul>
                <li><strong>PostCSS Imports Resolution:</strong> Resolves CSS imports (such as <code>@import "./vars.css"</code>) inside stylesheets.</li>
                <li><strong>Tailwind & Autoprefixer:</strong> Runs CSS compilation plugins during the build step.</li>
                <li><strong>CSS Modules Support:</strong> For files ending in <code>.module.css</code>, it uses <code>postcss-modules</code> to scope class names and returns a JSON map module to the client:
                  <div className="not-prose my-2">
                    <CodeBlock language="javascript">{`build.onLoad({ filter: /\\.css$/ }, async (args) => {
  // ... run postcss with postcss-modules plugin
  if (args.path.endsWith(".module.css")) {
    return {
      contents: \`export default \${JSON.stringify(map)};\`, // returns classname maps
      loader: "js"
    };
  }
});`}</CodeBlock>
                  </div>
                </li>
                <li><strong>Styles Extraction:</strong> Integrates a custom PostCSS extractor to compile CSS content from all files and write it to <code>public/styles.css</code>, ensuring client bundles only receive lightweight classname maps.</li>
              </ul>
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
