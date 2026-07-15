"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Shield, Key, FileCode } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "transform-phase", title: "⚙️ 1. transform() Phase Proxy", level: 2 },
  { id: "bundle-phase", title: "🔄 2. generateBundle() Placeholder Sync", level: 2 },
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
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-orange-600 dark:text-orange-500">
                3. Server Functions Plugin
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the Rollup compiler hooks used to secure database calls and serialize Server Actions during production bundling.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Focus File:</strong> <code>./dinou/rollup/rollup-plugins/rollup-plugin-server-functions.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Server Actions are defined with the <code>"use server"</code> directive. When compiling code for production, this plugin strips server-side code from client bundles and replaces it with fetch proxies.
              </p>
            </section>

            <hr className="my-8" />

            {/* TRANSFORM PHASE */}
            <section id="transform-phase">
              <h2>⚙️ 1. <code>transform()</code> Phase Proxy</h2>
              <p>
                Rollup executes the <code>transform(code, id)</code> hook over every file compilation pass. If the file contains the <code>"use server"</code> directive, the plugin replaces the code body with a client proxy:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`transform(code, id) {
  if (!useServerRegex.test(code.trim())) return null;

  const exports = parseExports(code);
  const relativePath = path.relative(root, id).replace(/\\\\/g, "/");
  serverFunctions.set(relativePath, new Set(exports));

  const fileUrl = \`file:///\${relativePath}\`;

  // Generate proxy imports pointing to the placeholder path
  let proxyCode = \`import { createServerFunctionProxy } from "/__SERVER_FUNCTION_PROXY__";\\n\`;
  for (const exp of exports) {
    const key = exp === "default" ? \`\${fileUrl}#default\` : \`\${fileUrl}#\${exp}\`;
    if (exp === "default") {
      proxyCode += \`export default createServerFunctionProxy(\${JSON.stringify(key)});\n\`;
    } else {
      proxyCode += \`export const \${exp} = createServerFunctionProxy(\${JSON.stringify(key)});\n\`;
    }
  }

  return { code: proxyCode, map: null }; // strip server code completely
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* BUNDLE PHASE */}
            <section id="bundle-phase">
              <h2>🔄 2. <code>generateBundle()</code> Placeholder Sync</h2>
              <p>
                At compilation end (<code>generateBundle</code>), the plugin replaces the temporary placeholder (<code>/__SERVER_FUNCTION_PROXY__</code>) in the compiled files with the actual hashed proxy filename (e.g. <code>/serverFunctionProxy-h1a2.js</code>):
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`async generateBundle(options, bundle) {
  const manifest = manifestGeneratorPlugin.manifestData;
  const hashedPath = "/" + (manifest["serverFunctionProxy.js"] || "serverFunctionProxy.js");

  for (const file of Object.keys(bundle)) {
    const chunk = bundle[file];
    if (chunk.type === "asset" || !chunk.code) continue;
    if (chunk.code.includes("/__SERVER_FUNCTION_PROXY__")) {
      chunk.code = chunk.code.replace(/\\/__SERVER_FUNCTION_PROXY__/g, hashedPath);
    }
  }
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* MANIFEST STRUCTURE */}
            <section id="manifest-structure">
              <h2>📋 3. <code>server-functions-manifest.json</code></h2>
              <p>
                Finally, the plugin writes the whitelisted Server Action mappings to the output directory:
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
