"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Cpu, Settings } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "ast-parsing", title: "⚙️ 1. Babel AST parsing & Scanners", level: 2 },
  { id: "recursive-resolve", title: "🔄 2. Recursive Dependency Resolver", level: 2 },
  { id: "manifest-structure", title: "📋 3. react-client-manifest.json structure", level: 2 },
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
                2. Rollup RSC Manifest Plugin
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the recursive dependency scanning, Babel AST parsing, and manifest generation hooks inside Rollup.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Focus File:</strong> <code>./dinou/rollup/rollup-plugins/rollup-plugin-react-client-manifest.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                To render Server Components, the parent server needs to know where client-side components are bundled. This plugin parses your components, resolves imports recursively, and builds the hydration manifest mapping.
              </p>
            </section>

            <hr className="my-8" />

            {/* AST PARSING */}
            <section id="ast-parsing">
              <h2>⚙️ 1. Babel AST parsing & Scanners</h2>
              <p>
                Instead of using regular expressions (which can fail on complex files), this plugin uses <code>@babel/parser</code> and <code>@babel/traverse</code> to parse your code into an AST and identify exports:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function getDefaultExportName(code) {
  let name = null;
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });
  traverse(ast, {
    ExportDefaultDeclaration(p) {
      const decl = p.node.declaration;
      if (decl.type === "Identifier") {
        name = decl.name;
      } else if (
        (decl.type === "FunctionDeclaration" || decl.type === "ClassDeclaration") &&
        decl.id
      ) {
        name = decl.id.name; // captures the export name
      }
    },
  });
  return name;
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* RECURSIVE RESOLVE */}
            <section id="recursive-resolve">
              <h2>🔄 2. Recursive Dependency Resolver</h2>
              <p>
                The plugin uses a recursive dependency resolver (<code>getImportsAndAssetsAndCsss()</code>) to trace imports starting from your pages. This scans imported sub-modules and gathers CSS styles and image assets into compilation trees:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`async function getImportsAndAssetsAndCsss(code, baseFilePath, visited = new Set(), pluginContext) {
  if (visited.has(baseFilePath)) return { imports: [], assets: [], csss: [] };
  visited.add(baseFilePath);

  const ast = parser.parse(code, { sourceType: "module", plugins: ["jsx", "typescript"] });
  const importNodes = [];
  traverse(ast, {
    ImportDeclaration(nodePath) { importNodes.push(nodePath); }
  });

  for (const nodePath of importNodes) {
    const source = nodePath.node.source.value;
    const absImportPathWithExt = getAbsPathWithExt(source, {
      parentURL: pathToFileURL(baseFilePath).href,
    });
    // recursively trace sub-module dependencies...
  }
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* MANIFEST STRUCTURE */}
            <section id="manifest-structure">
              <h2>📋 3. <code>react-client-manifest.json</code> structure</h2>
              <p>
                Once resolution completes, the plugin outputs the hydration mapping file. The production server reads this to determine which script tags to load:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="json">{`{
  "file:///c:/project/src/components/Header.tsx": {
    "id": "./src/components/Header.tsx",
    "chunks": "default",
    "name": "default"
  }
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
