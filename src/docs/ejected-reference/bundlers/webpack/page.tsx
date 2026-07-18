"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Boxes, Settings } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "webpack-pipeline", title: "📊 Webpack Build Pipeline", level: 2 },
  { id: "webpack-config", title: "🛠️ 1. webpack.config.js Options", level: 2 },
  { id: "postcss-config", title: "🎨 2. postcss.config.js Options", level: 2 },
];

const WEBPACK_PIPELINE_DIAGRAM = `graph TD
    Start[webpack.config.js] --> Clean[Clean target outdir public/ or dist3/]
    Clean --> Crawl[getCSSEntries:<br/>Scan src/ folder for CSS stylesheets]
    Crawl --> Entry[Webpack entry points config:<br/>main, error, serverFunctionProxy, cssEntries]
    Entry --> Loader[module.rules loaders:<br/>babel-loader & server-functions-loader]
    Loader --> Scoping[css-loader:<br/>createScopedName scoping]
    Scoping --> Plugins[Webpack plugins:<br/>ReactServerWebpackPlugin<br/>& CopyWebpackPlugin<br/>& MiniCssExtractPlugin<br/>& manifestGeneratorPlugin<br/>& ServerFunctionsPlugin]
    Plugins --> Optimization[splitChunks optimization:<br/>reactVendor & defaultVendors split]
    Optimization --> Output[dist3/ or public/]`;

const WEBPACK_CONFIG_CODE = `require("dotenv/config");
const path = require("path");
const fs = require("fs");
const ReactServerWebpackPlugin = require("react-server-dom-webpack/plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const createScopedName = require("../core/createScopedName");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const manifestGeneratorPlugin = require("./plugins/manifest-generator-plugin");
const ServerFunctionsPlugin = require("./plugins/server-functions-plugin");
const webpack = require("webpack");
const { regex } = require("../core/asset-extensions");
const getCSSEntries = require("./helpers/get-webpack-entries");

const isDevelopment = process.env.NODE_ENV !== "production";
const outputDirectory = isDevelopment ? "public" : "dist3";

function getConfigFileIfExists() {
  const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
  const jsconfigPath = path.resolve(process.cwd(), "jsconfig.json");

  if (fs.existsSync(tsconfigPath)) return tsconfigPath;
  if (fs.existsSync(jsconfigPath)) return jsconfigPath;

  return null;
}

const configFile = getConfigFileIfExists();
const localDinouPath = path.resolve(process.cwd(), "dinou");
const isEjected = fs.existsSync(localDinouPath);

const projectRoot = process.cwd();
const outputDirs = [
  path.resolve(projectRoot, "public"),
  path.resolve(projectRoot, "dist3"),
];

function cleanDir(dir) {
  if (fs.existsSync(dir)) {
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const fullPath = path.join(dir, file);
        fs.rmSync(fullPath, { recursive: true, force: true });
      }
    } catch (e) {
      try {
        fs.rmSync(dir, { recursive: true, force: true });
      } catch (err) {}
    }
  }
}

module.exports = async () => {
  const outputDir = path.resolve(process.cwd(), outputDirectory);

  cleanDir(outputDir);
  const [cssEntries] = await getCSSEntries();

  return {
    performance: {
      hints: isDevelopment ? false : "warning",
      maxEntrypointSize: 512000,
      maxAssetSize: 512000,
    },
    cache: false,
    mode: isDevelopment ? "development" : "production",
    entry: {
      main: [path.resolve(__dirname, "../core/client-webpack.jsx")].filter(
        Boolean,
      ),
      error: [
        path.resolve(__dirname, "../core/client-error-webpack.jsx"),
      ].filter(Boolean),
      serverFunctionProxy: path.resolve(
        __dirname,
        "../core/server-function-proxy-webpack.js",
      ),
      dinouClientRedirect: path.resolve(
        __dirname,
        "../core/client-redirect.jsx",
      ),
      dinouLink: path.resolve(__dirname, "../core/link.jsx"),
      ...[...cssEntries].reduce(
        (acc, cssEntry) => ({
          ...acc,
          [cssEntry.outfileName]: cssEntry.absPath,
        }),
        {},
      ),
    },
    experiments: {
      outputModule: true,
    },
    output: {
      path: path.resolve(process.cwd(), outputDirectory),
      filename: "[name]-[contenthash].js",
      publicPath: "/",
      clean: true,
      library: {
        type: "module",
      },
      environment: {
        module: true,
      },
      chunkFormat: "module",
    },
    module: {
      rules: [
        {
          test: /\\.[jt]sx?$/,
          exclude: [/node_modules\\/(?!dinou)/, ...outputDirs],
          use: [
            {
              loader: "babel-loader",
              options: {
                presets: [
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
                plugins: [
                  "babel-plugin-react-compiler",
                  "@babel/plugin-syntax-import-meta",
                ].filter(Boolean),
              },
            },
            {
              loader: path.resolve(
                __dirname,
                "./loaders/server-functions-loader.js"
              ),
            },
          ],
        },
        {
          test: /\\.module\\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                defaultExport: true,
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  getLocalIdent: (context, localIdentName, localName) => {
                    return createScopedName(localName, context.resourcePath);
                  },
                },
                importLoaders: 1,
              },
            },
            "postcss-loader",
          ],
        },
        {
          test: /\\.css$/,
          exclude: /\\.module\\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, "postcss.config.js"),
                },
              },
            },
          ],
        },
        {
          test: regex,
          type: "asset/resource",
          generator: {
            filename: (pathData) => {
              const resourcePath =
                pathData.module.resourceResolveData?.path ||
                pathData.module.resource;

              const base = path.basename(
                resourcePath,
                path.extname(resourcePath)
              );
              const scoped = createScopedName(base, resourcePath);

              return \`/assets/\${scoped}[ext]\`;
            },
            publicPath: "",
          },
        },
      ],
    },
    plugins: [
      new ReactServerWebpackPlugin({ isServer: false }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "favicons",
            to: ".",
            noErrorOnMissing: true,
          },
        ],
      }),
      new MiniCssExtractPlugin({
        filename: "[name].css",
      }),
      manifestGeneratorPlugin,
      new webpack.IgnorePlugin({
        checkResource(resource, context) {
          if (!context) return false;

          return outputDirs.some((dir) => context.startsWith(dir));
        },
      }),
      new ServerFunctionsPlugin({
        manifest: manifestGeneratorPlugin.manifestData,
      }),
    ].filter(Boolean),
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"],
      modules: ["src", "node_modules"],
      extensionAlias: {
        ".js": [".js", ".ts", ".tsx"],
        ".jsx": [".jsx", ".tsx"],
      },
      alias: {
        ...(isEjected ? { dinou: localDinouPath } : {}),
      },
      plugins: configFile
        ? [
          new TsconfigPathsPlugin({
            configFile,
            extensions: [".js", ".jsx", ".ts", ".tsx"],
          }),
        ]
        : [],
    },
    optimization: {
      runtimeChunk: "single",
      splitChunks: {
        chunks: "all",
        cacheGroups: {
          reactVendor: {
            test: /[\\\\/]node_modules[\\\\/](react|react-dom|react-server-dom-webpack|scheduler)[\\\\/]/,
            name: "vendor-react",
            priority: 40,
            chunks: "all",
            enforce: true,
          },
          styles: {
            name: "styles",
            type: "css/mini-extract",
            chunks: "all",
            enforce: true,
          },
          defaultVendors: {
            test: /[\\\\/]node_modules[\\\\/]/,
            name: false,
            priority: 20,
            chunks: "all",
            reuseExistingChunk: true,
          },
        },
      },
    },
    watchOptions: {
      ignored: outputDirs.map((dir) => \`\${dir}/**\`),
    },
    stats: "normal",
    infrastructureLogging: {
      level: "info",
    },
    ...(isDevelopment
      ? {
        devServer: {
          port: 3001,
          hot: false,
          devMiddleware: {
            index: false,
            writeToDisk: true,
          },
          proxy: [
            {
              context: () => true,
              target: "http://localhost:3000",
              changeOrigin: true,
            },
          ],
          client: false,
        },
      }
      : {}),
  };
};`;

const POSTCSS_CONFIG_CODE = `module.exports = {
  plugins: [
    require("@tailwindcss/postcss"),
    require("autoprefixer"),
  ],
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Boxes className="h-6 w-6 text-primary text-cyan-600 dark:text-cyan-500" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Webpack Overview & Config
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the architecture of Webpack's compilation pipeline and the base config files used to resolve module entry points.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Folder Location:</strong> <code>./dinou/webpack/</code> <br />
              <strong>Focus Files:</strong> <code>webpack.config.js</code>, <code>postcss.config.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou provides <strong>Webpack</strong> as an alternative compilation system, integrating the official loader and compiler implementation from the React team for React Server Components.
              </p>
              <p>
                In ejected applications, Webpack coordinates custom loaders (for stripping Server Actions), splits vendors chunks to optimize cache hits, extracts CSS modules with content-hashed names, and outputs client-hydration manifests.
              </p>
            </section>

            <hr className="my-8" />

            {/* PIPELINE */}
            <section id="webpack-pipeline">
              <h2>📊 Webpack Build Pipeline</h2>
              <p>
                The flowchart below shows the sequence of plugins and loaders executed during Webpack compiles:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{WEBPACK_PIPELINE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* WEBPACK CONFIG */}
            <section id="webpack-config">
              <h2>🛠️ 1. <code>webpack.config.js</code> Options</h2>
              <p>
                This script manages JSX/TSX loaders, imports dynamic CSS paths, and registers optimization cache splits:
              </p>
              
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{WEBPACK_CONFIG_CODE}</CodeBlock>
              </div>
              <p>
                <strong>Key Details:</strong>
              </p>
              <ul>
                <li><strong><code>ReactServerWebpackPlugin</code></strong>: Manages React Server Components, mapping client component chunks and generating hydration paths.</li>
                <li><strong><code>splitChunks.cacheGroups.reactVendor</code></strong>: Gathers React, ReactDOM, and schedulers into a single <code>vendor-react</code> file to improve browser caching.</li>
                <li><strong><code>experiments.outputModule: true</code></strong>: Configures Webpack to emit final bundle chunks as native EcmaScript modules (ESM).</li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* POSTCSS CONFIG */}
            <section id="postcss-config">
              <h2>🎨 2. <code>postcss.config.js</code> Options</h2>
              <p>
                Defines the PostCSS rules used by <code>postcss-loader</code> to compile stylesheets:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{POSTCSS_CONFIG_CODE}</CodeBlock>
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
