"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Settings, FileCode, Cpu, Shield, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "rollup-config", title: "🛠️ 1. rollup.config.js Options", level: 2 },
  { id: "postcss-config", title: "🎨 2. postcss.config.js Options", level: 2 },
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
                1. Rollup Overview & Config
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the architecture of Rollup's compilation pipeline and the base config files used to compile assets for production releases.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Sub-Folder Location:</strong> <code>./dinou/rollup/</code> <br />
              <strong>Focus Files:</strong> <code>rollup.config.js</code>, <code>postcss.config.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Rollup compiles and bundles client-side code for production, resolving page layouts and routing files into lightweight chunks. Ejecting exposes these settings, allowing you to customize post-build hooks and asset bundles.
              </p>
            </section>

            <hr className="my-8" />

            {/* ROLLUP CONFIG */}
            <section id="rollup-config">
              <h2>🛠️ 1. <code>rollup.config.js</code> Options</h2>
              <p>
                Configures output targets, bundles client hydration entries, and runs custom plugins:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import postcss from "rollup-plugin-postcss";
import dinouAssetPlugin from "./rollup-plugins/dinou-asset-plugin.js";
import reactClientManifestPlugin from "./rollup-plugins/rollup-plugin-react-client-manifest.js";

export default {
  input: "dinou/core/client.jsx", // Client entrypoint
  output: {
    dir: "dist3",
    format: "esm",
    entryFileNames: "[name].js",
    chunkFileNames: "chunks/[name]-[hash].js",
  },
  plugins: [
    nodeResolve({ extensions: [".js", ".jsx", ".ts", ".tsx"] }),
    commonjs(),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
      presets: [
        ["@babel/preset-react", { runtime: "automatic" }],
        "@babel/preset-typescript"
      ]
    }),
    postcss({
      extract: "styles.css", // outputs stylesheet
      modules: {
        generateScopedName: (name, filename) => {
          if (!filename.endsWith(".module.css")) return name;
          return createScopedName(name, filename);
        }
      }
    }),
    dinouAssetPlugin(),
    reactClientManifestPlugin()
  ]
};`}</CodeBlock>
              </div>
              <p>
                <strong>Key Details:</strong>
              </p>
              <ul>
                <li><strong><code>input: "dinou/core/client.jsx"</code></strong>: Targets the client hydration entry point. This bootstrapper loads dynamic layout chunks based on active routes.</li>
                <li><strong><code>chunkFileNames: "chunks/[name]-[hash].js"</code></strong>: Directs Rollup to write shared layout chunks and lazy components into a separate sub-folder using deterministic hashes.</li>
                <li><strong><code>postcss() extract</code></strong>: Extracts and compiles CSS Modules stylesheets and exports class maps to components.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* POSTCSS CONFIG */}
            <section id="postcss-config">
              <h2>🎨 2. <code>postcss.config.js</code> Options</h2>
              <p>
                Defines PostCSS rules to apply TailwindCSS transformations and compile vendor prefixes during stylesheet build steps:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`module.exports = {
  plugins: [
    require("@tailwindcss/postcss"),
    require("autoprefixer"),
  ],
};`}</CodeBlock>
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
