"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Shield, Key, FileCode } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "loader", title: "⚙️ 1. server-functions-loader.js Options", level: 2 },
  { id: "plugin", title: "🔄 2. server-functions-plugin.js Execution", level: 2 },
  { id: "manifest-structure", title: "📋 3. server-functions-manifest.json", level: 2 },
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
                3. Webpack Server Functions Loader & Plugin
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Analyze the inner workings of Webpack's module transforms for parsing Server Actions and compiling secure whitelist manifests.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key Files Analyzed:</strong> <br />
              • Loader transform: <code>./dinou/webpack/loaders/server-functions-loader.js</code> <br />
              • Aggregation plugin: <code>./dinou/webpack/plugins/server-functions-plugin.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To support Server Actions, Dinou implements a two-step compilation process in Webpack: a loader strips server-side code and replaces it with dynamic proxies, and a plugin compiles the whitelisted actions.
              </p>
            </section>

            <hr className="my-8" />

            {/* LOADER */}
            <section id="loader">
              <h2>⚙️ 1. <code>server-functions-loader.js</code> Options</h2>
              <p>
                When Webpack parses JSX/TSX source files, the loader intercepts files containing the <code>"use server"</code> directive.
              </p>
              
              <h3>Dynamic Lazy Imports</h3>
              <p>
                To prevent Webpack from resolving the proxy path (<code>"__SERVER_FUNCTION_PROXY__"</code>) as a static import (which would throw a compilation error), the loader uses a dynamic constructor wrapper:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const loadProxy = new Function('return import("/"+"__SERVER_FUNCTION_PROXY__")');`}</CodeBlock>
              </div>
              <p>
                It then wraps all action exports in dynamic handlers that resolve the proxy and invoke <code>createServerFunctionProxy()</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`export const loginUser = (...args) =>
  loadProxy().then(mod => 
    (mod.default ?? mod ?? window.__SERVER_FUNCTION_PROXY_LIB__)
      .createServerFunctionProxy("file:///src/actions/users.ts#loginUser")(...args)
  );`}</CodeBlock>
              </div>
              <p>
                Finally, the loader calls Webpack's <code>emitFile</code> helper to write a temporary metadata file containing the actions found:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`this.emitFile(
  \`server-functions/\${normalizedPath}.json\`,
  JSON.stringify(manifestEntry, null, 2)
);`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PLUGIN */}
            <section id="plugin">
              <h2>🔄 2. <code>server-functions-plugin.js</code> Execution</h2>
              <p>
                Hooks into Webpack's <code>PROCESS_ASSETS_STAGE_REPORT</code> phase to process the emitted files:
              </p>
              <ol>
                <li><strong>Replace Path Placeholders:</strong> Replaces <code>__SERVER_FUNCTION_PROXY__</code> with the actual compiled filename.</li>
                <li><strong>Aggregate Actions:</strong> Reads all temporary JSON metadata files emitted under <code>server-functions/*.json</code>, compiles the whitelisted actions, and deletes the temporary files.</li>
                <li><strong>Emit Whitelist:</strong> Writes the finalized <code>server-functions-manifest.json</code> to the build output.</li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* MANIFEST STRUCTURE */}
            <section id="manifest-structure">
              <h2>📋 3. <code>server-functions-manifest.json</code></h2>
              <p>
                The output whitelist manifest file structure:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="json">{`{
  "src/actions/users.ts": [
    "loginUser",
    "logoutUser"
  ]
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
