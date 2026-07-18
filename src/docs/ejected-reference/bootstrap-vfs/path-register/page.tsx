"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Terminal, Settings, LayoutGrid } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "register-flow", title: "📊 Bootstrapping Flow", level: 2 },
  { id: "why-register", title: "⚡ Module Resolution Mapping", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const REGISTER_DIAGRAM = `                           getConfigFileIfExists()
                                      │
                                      ▼
                        [Verify tsconfig.json exists]
                                ├── Yes ──► Return tsconfig.json path
                                └── No  ──► [Verify jsconfig.json exists]
                                                ├── Yes ──► Return jsconfig.json path
                                                └── No  ──► Return null
                                                                │
                                                                ▼
                                                       [ConfigFile Found?]
                                                                ├── No  ──► Skip (No-op)
                                                                └── Yes ──► Require config
                                                                            Read compilerOptions
                                                                                │
                                                                                ▼
                                                                     tsconfigPaths.register()
                                                                     Injects alias registry`;

const REGISTER_CODE = `const tsconfigPaths = require("tsconfig-paths");
const path = require("path");
const fs = require("fs");

function getConfigFileIfExists() {
  const tsconfigPath = path.resolve(process.cwd(), "tsconfig.json");
  const jsconfigPath = path.resolve(process.cwd(), "jsconfig.json");

  if (fs.existsSync(tsconfigPath)) return tsconfigPath;
  if (fs.existsSync(jsconfigPath)) return jsconfigPath;

  return null;
}

const configFile = getConfigFileIfExists();

if (configFile) {
  const config = require(configFile);
  const { baseUrl, paths } = config.compilerOptions || {};

  // 1. If baseUrl and custom paths configurations are declared, register them
  if (baseUrl && paths) {
    tsconfigPaths.register({
      baseUrl: path.resolve(process.cwd(), baseUrl),
      paths,
    });
  }
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <LayoutGrid className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Path Aliases Register (register-paths.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the tsconfig paths resolver, runtime import hook registry, and development configuration detectors.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/register-paths.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                TypeScript and Javascript tools allow importing files using clean path aliases (e.g. <code>import Button from "@/components/Button"</code> instead of <code>../../components/Button</code>). While compilers resolve these patterns at build time, executing raw Node.js script entrypoints (such as serving pages on-demand or launching revalidation daemons) will trigger <code>MODULE_NOT_FOUND</code> errors, as Node.js is unaware of the <code>@/</code> alias.
              </p>
              <p>
                The <code>register-paths.js</code> utility resolves this at startup by reading <code>tsconfig.json</code> or <code>jsconfig.json</code> and registering path aliases dynamically inside Node's module resolution pipeline.
              </p>
            </section>

            <hr className="my-8" />

            {/* BOOTSTRAPPING FLOW */}
            <section id="register-flow">
              <h2>📊 Bootstrapping Flow</h2>
              <p>
                The flowchart below traces the path alias registration sequence during server initialization:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{REGISTER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* WHY REGISTER */}
            <section id="why-register">
              <h2>⚡ Module Resolution Mapping</h2>
              <p>
                The registration script performs several key runtime checks:
              </p>
              <ul>
                <li>
                  <strong>Config Auto-Detection:</strong> Looks for <code>tsconfig.json</code> first (for TypeScript setups) and falls back to <code>jsconfig.json</code> (for plain JavaScript setups).
                </li>
                <li>
                  <strong>Safe Bypasses:</strong> If no configuration file exists or the compiler options do not define a <code>baseUrl</code> and <code>paths</code> registry, it exits silently to prevent runtime crashes.
                </li>
                <li>
                  <strong>Module Interception:</strong> Registers resolution handlers with the <code>tsconfig-paths</code> library, intercepting standard <code>require()</code> calls and mapping alias paths to their physical disk locations.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>register-paths.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{REGISTER_CODE}</CodeBlock>
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
