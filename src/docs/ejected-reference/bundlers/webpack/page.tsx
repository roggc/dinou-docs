"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Settings, FileCode, Cpu, Shield, Zap } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "webpack-config", title: "🛠️ 1. webpack.config.js Options", level: 2 },
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
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-cyan-600 dark:text-cyan-500">
                1. Webpack Overview & Config
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the architecture of Webpack's compilation pipeline and the base config files used to resolve module entry points.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Sub-Folder Location:</strong> <code>./dinou/webpack/</code> <br />
              <strong>Focus Files:</strong> <code>webpack.config.js</code>, <code>postcss.config.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Webpack provides the official loader and compiler implementation from the React team for React Server Components. Dinou configures Webpack to split files into lazy modules and generate manifest files.
              </p>
            </section>

            <hr className="my-8" />

            {/* WEBPACK CONFIG */}
            <section id="webpack-config">
              <h2>🛠️ 1. <code>webpack.config.js</code> Options</h2>
              <p>
                The <code>webpack.config.js</code> file configures loaders for JSX/TSX compilation and binds React's official plugins:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");
const ServerFunctionsPlugin = require("./plugins/server-functions-plugin.js");
const ManifestGeneratorPlugin = require("./plugins/manifest-generator-plugin.js");

module.exports = {
  entry: {
    main: "dinou/core/client-webpack.jsx", // Client entry point
  },
  output: {
    path: path.resolve(__dirname, "../public"),
    filename: "assets/[name].[contenthash:8].js",
    chunkFilename: "assets/[name].[contenthash:8].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" },
          { loader: path.resolve(__dirname, "./loaders/server-functions-loader.js") }
        ]
      },
      {
        test: /\\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new ReactServerWebpackPlugin({
      isServer: false,
      clientManifestPath: "public/react-client-manifest.json",
    }),
    new ServerFunctionsPlugin(),
    new ManifestGeneratorPlugin()
  ]
};`}</CodeBlock>
              </div>
              <p>
                <strong>Key Details:</strong>
              </p>
              <ul>
                <li><strong><code>ReactServerWebpackPlugin</code></strong>: Webpack plugin from the React team. It maps client-side chunks to server components, outputting reference hashes to <code>react-client-manifest.json</code>.</li>
                <li><strong><code>server-functions-loader.js</code></strong>: Strips code bodies from server action files and generates client fetch proxies.</li>
                <li><strong><code>chunkFilename: "assets/[name].[contenthash:8].chunk.js"</code></strong>: Generates hashed names for lazy components to enable browser caching.</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* POSTCSS CONFIG */}
            <section id="postcss-config">
              <h2>🎨 2. <code>postcss.config.js</code> Options</h2>
              <p>
                Configures the PostCSS rules used by <code>postcss-loader</code> to compile stylesheets:
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
