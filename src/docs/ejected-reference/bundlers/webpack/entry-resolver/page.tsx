"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Globe, FileCode, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "crawling-routes", title: "⚙️ 1. crawling src/app/ Route Trees", level: 2 },
  { id: "dependency-tracing", title: "🔄 2. Recursive Dependency Tracing", level: 2 },
  { id: "output-format", title: "📋 3. Dynamic Webpack Entry Maps", level: 2 },
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
                2. Dynamic Entry Resolver
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the layout crawling systems and custom import graph builders used to construct Webpack entrypoints.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Focus File:</strong> <code>./dinou/webpack/helpers/get-webpack-entries.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Webpack builds dependency graphs from set entry points. Since Dinou's routes and components are created dynamically by developers, this helper scans the workspace to configure Webpack's entry points automatically.
              </p>
            </section>

            <hr className="my-8" />

            {/* CRAWLING ROUTES */}
            <section id="crawling-routes">
              <h2>⚙️ 1. Crawling <code>src/app/</code> Route Trees</h2>
              <p>
                The resolver uses <code>fast-glob</code> to recursively scan directories and list pages and layouts:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const entries = glob.sync("src/app/**/page.{tsx,jsx,ts,js}");
const layouts = glob.sync("src/app/**/layout.{tsx,jsx,ts,js}");`}</CodeBlock>
              </div>
              <p>
                It maps these file paths to calculate URL paths and route configurations for the build.
              </p>
            </section>

            <hr className="my-8" />

            {/* DEPENDENCY TRACING */}
            <section id="dependency-tracing">
              <h2>🔄 2. Recursive Dependency Tracing</h2>
              <p>
                The resolver runs a recursive dependency tracer (<code>getImportsAndAssetsAndCsss()</code>) over server components. It uses <code>@babel/parser</code> and <code>@babel/traverse</code> to parse import statements:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`async function getImportsAndAssetsAndCsss(code, baseFilePath, visited = new Set(), isTopLevelClientComponent = false) {
  if (visited.has(baseFilePath)) return;
  visited.add(baseFilePath);

  const ast = parser.parse(code, { sourceType: "module", plugins: ["jsx", "typescript"] });
  const importNodes = [];
  traverse.default(ast, {
    ImportDeclaration(nodePath) { importNodes.push(nodePath); }
  });
  
  // Recursively trace sub-module dependencies...
}`}</CodeBlock>
              </div>
              <p>
                To isolate graphs, the tracer stops scanning when it encounters a client component boundary (<code>"use client"</code>) or a server action (<code>"use server"</code>). This splits client hydration bundles from server execution scopes.
              </p>
            </section>

            <hr className="my-8" />

            {/* OUTPUT FORMAT */}
            <section id="output-format">
              <h2>📋 3. Dynamic Webpack Entry Maps</h2>
              <p>
                Finally, the helper maps these modules to configure entry points for Webpack's compiler:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`module.exports = {
  entry: {
    main: "dinou/core/client-webpack.jsx", // Client bootstrapper
    "components/Header": "./src/components/Header.tsx", // Scraped client component
    "pages/about": "./src/app/about/page.tsx" // Scraped route component
  }
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
