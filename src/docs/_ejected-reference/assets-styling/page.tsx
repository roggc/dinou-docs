"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Palette, FileCode, Zap, Settings, RefreshCw } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "css-hook", title: "🎨 1. CSS Modules Hook (css-require-hook.js)", level: 2 },
  { id: "postcss-plugin", title: "⚙️ 2. PostCSS Selector Parser", level: 2 },
  { id: "global-local-scopes", title: "🔒 3. Hashing Scopes (:global & :local)", level: 2 },
  { id: "asset-hook", title: "🖼️ 4. Media Asset Hook (asset-require-hook.js)", level: 2 },
  { id: "loader-utils-interpolation", title: "🔗 5. Hashed URL Interpolation", level: 2 },
  { id: "customizations", title: "🛠️ Common Tweak Recipes", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Styles & Assets Loading Hooks
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Analyze the inner mechanics of Dinou's CommonJS require hooks for on-the-fly CSS Modules compilation with PostCSS and binary static asset loaders.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Involved:</strong> <br />
              • CSS Modules hook: <code>./dinou/core/css-require-hook.js</code> <br />
              • Asset extensions list: <code>./dinou/core/asset-extensions.js</code> <br />
              • Hashed assets hook: <code>./dinou/core/asset-require-hook.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In standard Node.js applications, attempting to <code>require("./styles.css")</code> or <code>require("./image.png")</code> throws a runtime exception because Node's compiler only expects valid JavaScript source files.
              </p>
              <p>
                To enable importing stylesheets and media assets directly inside React Server Components and server-side layouts, Dinou installs **custom require extension hooks** at startup. These hooks preprocess imported style files and media paths synchronously, mimicking browser bundler behaviors at the Node process level.
              </p>
            </section>

            <hr className="my-8" />

            {/* CSS MODULES HOOK */}
            <section id="css-hook">
              <h2>🎨 1. CSS Modules Hook (<code>css-require-hook.js</code>)</h2>
              <p>
                The <code>css-require-hook.js</code> file defines the loader for stylesheets. When registered, it overrides Node's default extension resolver for <code>.css</code> targets:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function registerCSSRequireHook() {
  require.extensions[".css"] = function (module, filename) {
    const cssContent = fs.readFileSync(filename, "utf8");
    const jsonResult = {};

    // 1. Process stylesheet content via PostCSS rules
    postcss([plugin]).process(cssContent, { from: filename }).css;

    // 2. Export the hashed classnames dictionary as a CJS module exports object
    module.exports = jsonResult;
  };
}`}</CodeBlock>
              </div>
              <p>
                This hook intercepts the file import, reads the raw CSS string, processes it, and returns a key-value mapping object (e.g. <code>{'{ container: "scoped_container_xyz" }'}</code>).
              </p>
            </section>

            <hr className="my-8" />

            {/* POSTCSS SELECTOR PARSER */}
            <section id="postcss-plugin">
              <h2>⚙️ 2. PostCSS Selector Parser</h2>
              <p>
                To extract and scope class names, the require hook runs a custom, synchronous **PostCSS plugin**:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const plugin = {
  postcssPlugin: "extract-classes",
  Rule(rule) {
    // Ignore keyframes animation tags
    if (rule.parent && rule.parent.name === "keyframes") return;

    const selector = rule.selector;
    const classRegex = /\.([_a-zA-Z0-9-]+)/g; // Match selector class tokens
    let match;

    while ((match = classRegex.exec(selector)) !== null) {
      const className = match[1];
      
      // Calculate scopes (:global vs :local) and register names deterministically
      if (!jsonResult[className]) {
        jsonResult[className] = createScopedName(className, filename);
      }
    }
  }
};`}</CodeBlock>
              </div>
              <p>
                The compiler runs the plugin synchronously. The class names are fed into <code>createScopedName.js</code>, which returns a hashed string based on the class name and the file's path, guaranteeing that selectors don't leak across modules.
              </p>
            </section>

            <hr className="my-8" />

            {/* GLOBAL & LOCAL SCOPES */}
            <section id="global-local-scopes">
              <h2>🔒 3. Hashing Scopes (<code>:global</code> & <code>:local</code>)</h2>
              <p>
                Sometimes you need to declare global stylesheet rules that must bypass module scoping. Dinou supports scoping rules natively:
              </p>
              <ul>
                <li>
                  <strong>Local Scopes (Default):</strong> Every class selector is hashed by default (e.g. <code>.title</code> becomes <code>.title_a1b2c</code>).
                </li>
                <li>
                  <strong>Global Scopes (<code>:global</code>):</strong> Class names wrapped in <code>:global(...)</code> or declared below a <code>:global</code> block preserve their original names:
                  <div className="not-prose my-2">
                    <CodeBlock language="css">{`/* Scoped CSS Module */
.container {
  padding: 20px; /* Scoped class */
}

:global(.btn-active) {
  background-color: blue; /* Unscoped class */
}`}</CodeBlock>
                  </div>
                </li>
              </ul>
              <p>
                The PostCSS parser checks if a matched selector is prefixed by <code>:global</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const lastGlobal = before.lastIndexOf(":global");
const lastLocal = before.lastIndexOf(":local");

if (lastGlobal > lastLocal) {
  // If global keyword overrides local scope, skip hashing
  jsonResult[className] = className;
  continue;
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* MEDIA ASSET HOOK */}
            <section id="asset-hook">
              <h2>🖼️ 4. Media Asset Hook (<code>asset-require-hook.js</code>)</h2>
              <p>
                Dinou registers require extensions for static media formats defined in <code>asset-extensions.js</code> (such as <code>.png</code>, <code>.jpg</code>, <code>.svg</code>, <code>.gif</code>, <code>.woff2</code>):
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function hook(extension, compile) {
  require.extensions[extension] = function (module, file) {
    try {
      const url = compile(file); // Generates static public url with hashed content
      module._compile("module.exports = " + JSON.stringify(url), file);
    } catch (err) {
      throw err;
    }
  };
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* HASHED URL INTERPOLATION */}
            <section id="loader-utils-interpolation">
              <h2>🔗 5. Hashed URL Interpolation</h2>
              <p>
                To generate cache-friendly assets in production, Dinou uses webpack's <code>loader-utils</code> library to calculate deterministic hash names:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`var interpolateName = require("loader-utils").interpolateName;

var result = interpolateName(context, resolvedName, {
  content: content, // File binary buffer
  regExp: options.regExp,
});

if (options.publicPath) {
  result = options.publicPath + result; // Returns e.g. "/assets/logo.a1b2c3d4.png"
}`}</CodeBlock>
              </div>
              <p>
                When you import an image inside a component, the require hook copies the asset to the public assets build folder and returns the static asset url string (<code>"/assets/[name].[hash].[ext]"</code>).
              </p>
            </section>

            <hr className="my-8" />

            {/* CUSTOMIZATIONS */}
            <section id="customizations">
              <h2>🛠️ Common Tweak Recipes</h2>
              <div className="border rounded-lg p-4 bg-slate-50 dark:bg-slate-900/50 space-y-3 not-prose text-sm">
                <div>
                  <strong>1. Adding Preprocessor support (SASS/Less):</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can support SASS Modules by modifying <code>core/css-require-hook.js</code>. Install <code>sass</code>, register <code>require.extensions[".scss"]</code>, compile the scss code to CSS first, and pass the resulting string to the PostCSS compiler.
                  </p>
                </div>
                <div>
                  <strong>2. Changing Asset Path Scopes:</strong>
                  <p className="text-xs text-muted-foreground mt-1">
                    You can change the public directory structure or naming hashes by modifying the <code>publicPath</code> configuration or the hash layout inside <code>core/server.js</code> and the corresponding loaders.
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
