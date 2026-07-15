"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Boxes, FileCode, Cpu, Settings } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "config-setup", title: "⚙️ 1. webpack.config.js Orchestration", level: 2 },
  { id: "helpers", title: "🛠️ 2. Helpers (helpers/)", level: 2 },
  { id: "loaders", title: "🔌 3. Webpack Loaders (loaders/)", level: 2 },
  { id: "plugins", title: "🔌 4. Custom Plugins (plugins/)", level: 2 },
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
                Webpack Integration Guide
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              An exhaustive file-by-file breakdown of the build configuration, custom loaders, and plugins inside the <code>dinou/webpack/</code> directory.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Folder Path:</strong> <code>./dinou/webpack/</code> <br />
              <strong>Role:</strong> Bundles client-side assets and resolves React Server Components graphs using React 19's official Webpack plugins.
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Webpack integrates natively with the React team's official Server Components compilation plugins (<code>react-server-dom-webpack</code>). When using the Webpack bundler setup, Dinou uses these plugins to map Server Components and Client boundaries during development and production builds.
              </p>
            </section>

            <hr className="my-8" />

            {/* CONFIG SETUP */}
            <section id="config-setup">
              <h2>⚙️ 1. webpack.config.js Orchestration</h2>
              <p>
                The <code>webpack.config.js</code> file defines Webpack's client-side and server-side configurations. It binds React's official plugins:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");

module.exports = {
  entry: {
    main: "dinou/core/client-webpack.jsx", // Webpack-specific client loader
  },
  plugins: [
    // Webpack plugin linking client-side bundles to server-side RSC elements
    new ReactServerWebpackPlugin({
      isServer: false,
      clientManifestPath: "public/react-client-manifest.json",
    }),
    new ServerFunctionsPlugin(),
    new ManifestGeneratorPlugin(),
  ],
};`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* HELPERS */}
            <section id="helpers">
              <h2>🛠️ 2. Helpers (<code>helpers/</code>)</h2>
              <p>
                Utility files to calculate compilation targets:
              </p>
              <ul>
                <li>
                  <strong><code>helpers/get-webpack-entries.js</code>:</strong> Scans the directory structure under <code>src/app/</code>, analyzes route paths, and dynamic segments, and returns a key-value mapping of entry points for Webpack's compiler.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* LOADERS */}
            <section id="loaders">
              <h2>🔌 3. Webpack Loaders (<code>loaders/</code>)</h2>
              <p>
                Webpack uses loaders to transform source files. Dinou implements a specialized loader for Server Functions:
              </p>
              <ul>
                <li>
                  <strong><code>loaders/server-functions-loader.js</code>:</strong> Scans modules for the <code>"use server"</code> directive, parses the exported actions, and registers their signatures to allow clients to send action requests to the server.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* PLUGINS */}
            <section id="plugins">
              <h2>🔌 4. Custom Plugins (<code>plugins/</code>)</h2>
              <p>
                The custom Webpack plugins manage HMR state and RSC manifests:
              </p>
              
              <div className="space-y-4 not-prose my-6 text-sm">
                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-cyan-600 dark:text-cyan-400">plugins/server-functions-plugin.js</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Aggregates action IDs resolved during compilation and outputs `server-functions-manifest.json`. This manifest acts as a whitelist on the production server to reject unauthorized or malformed action payloads.
                  </p>
                </div>

                <div className="border p-4 rounded-lg bg-card">
                  <strong className="text-cyan-600 dark:text-cyan-400">plugins/manifest-generator-plugin.js</strong>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Combines Webpack's client bundle outputs and maps the module ids inside the hydration files: `react-client-manifest.json` and `react-ssr-manifest.json`.
                  </p>
                </div>
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
