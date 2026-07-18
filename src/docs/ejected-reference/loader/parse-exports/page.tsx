"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Cpu, HelpCircle, HardDrive } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "parser-flow", title: "📊 AST Traversal Flow", level: 2 },
  { id: "ast-parsing", title: "⚡ AST Analysis & Compilation Hooks", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const PARSER_DIAGRAM = `graph TD
    Start[parseExports code] --> Babel[Babel Parser parse AST]
    Babel --> Traverse[Traverse AST Nodes]
    
    Traverse --> DefaultCheck{ExportDefaultDeclaration?}
    DefaultCheck -->|Yes| DefaultAdd[Add 'default' to exports list]
    
    Traverse --> NamedCheck{ExportNamedDeclaration?}
    NamedCheck -->|Yes| TypeCheck{Declaration Type}
    
    TypeCheck -->|Function/Class| FnClass[Add identifier name]
    TypeCheck -->|Variable| Var[Loop variable identifiers]
    TypeCheck -->|Specifiers| Spec[Loop export specifiers]
    
    DefaultAdd --> ReturnArray[Return unique exports array]
    FnClass --> ReturnArray
    Var --> ReturnArray
    Spec --> ReturnArray`;

const PARSER_CODE = `const parser = require("@babel/parser");
const traverse = require("@babel/traverse");

function parseExports(code) {
  // 1. Parse JavaScript/TypeScript source code into Abstract Syntax Tree (AST)
  const ast = parser.parse(code, {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  });

  const exports = new Set();

  // 2. Traverse the AST tree nodes and collect export identifiers
  traverse.default(ast, {
    ExportDefaultDeclaration() {
      exports.add("default");
    },
    ExportNamedDeclaration(p) {
      if (p.node.declaration) {
        // Collect exported functions/classes: export function foo()
        if (
          p.node.declaration.type === "FunctionDeclaration" ||
          p.node.declaration.type === "ClassDeclaration"
        ) {
          exports.add(p.node.declaration.id.name);
        // Collect exported variable constants: export const bar = 1, baz = 2
        } else if (p.node.declaration.type === "VariableDeclaration") {
          p.node.declaration.declarations.forEach((d) => {
            if (d.id.type === "Identifier") {
              exports.add(d.id.name);
            }
          });
        }
      } else if (p.node.specifiers) {
        // Collect named export statements: export { foo, bar }
        p.node.specifiers.forEach((s) => {
          if (s.type === "ExportSpecifier") {
            exports.add(s.exported.name);
          }
        });
      }
    },
  });

  // 3. Return unique exports list array
  return [...exports];
}

module.exports = parseExports;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Cpu className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Exports Parser (parse-exports.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the abstract syntax tree exports parser, module reflection tools, and custom compiler proxies.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/parse-exports.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In React Server Components (RSC), the loader must determine which functions are exported by Client Components (files starting with <code>"use client"</code>) and Server Actions (files starting with <code>"use server"</code>). This allows the compiler to generate proxy wrappers that bridge process and network boundaries.
              </p>
              <p>
                The <code>parse-exports.js</code> utility handles this by parsing the file into an Abstract Syntax Tree (AST) and extracting all exported identifiers.
              </p>
            </section>

            <hr className="my-8" />

            {/* AST TRAVERSAL FLOW */}
            <section id="parser-flow">
              <h2>📊 AST Traversal Flow</h2>
              <p>
                The flowchart below shows how different export structures are traversed and collected:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="800px">{PARSER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* AST PARSING */}
            <section id="ast-parsing">
              <h2>⚡ AST Analysis & Compilation Hooks</h2>
              <p>
                The utility handles export collection using targeted AST traversal:
              </p>
              <ul>
                <li>
                  <strong>Babel AST Parser:</strong> Parses code containing JSX and TypeScript type notations into a semantic node tree.
                </li>
                <li>
                  <strong>Export Identification:</strong> Traverses named and default exports, variable declarations, and custom specifiers to collect all exported modules.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>parse-exports.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{PARSER_CODE}</CodeBlock>
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
