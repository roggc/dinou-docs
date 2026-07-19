"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Terminal, Settings, LayoutGrid } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "register-flow", title: "📊 Bootstrapping Flow", level: 2 },
  { id: "why-register", title: "⚡ Module Resolution Mapping", level: 2 },
  { id: "calling-contexts", title: "🎯 Integration & Calling Processes", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const REGISTER_DIAGRAM = `graph TD
    Start[getConfigFileIfExists] --> TSConfigCheck{Verify tsconfig.json exists?}
    
    TSConfigCheck -->|Yes| ReturnTS[Return tsconfig.json path]
    TSConfigCheck -->|No| JSConfigCheck{Verify jsconfig.json exists?}
    
    JSConfigCheck -->|Yes| ReturnJS[Return jsconfig.json path]
    JSConfigCheck -->|No| ReturnNull[Return null]
    
    ReturnTS --> ConfigCheck{ConfigFile Found?}
    ReturnJS --> ConfigCheck
    ReturnNull --> ConfigCheck
    
    ConfigCheck -->|No| NoOp[Skip / No-op]
    ConfigCheck -->|Yes| LoadConfig[Require config & Read compilerOptions]
    LoadConfig --> RegisterPaths[tsconfigPaths.register Injects alias registry]`;

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
              Understand how Dinou reads tsconfig.json or jsconfig.json to register custom path aliases, allowing the server to resolve absolute imports like @/components.
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
                <CodeBlock language="mermaid" minWidth="700px">{REGISTER_DIAGRAM}</CodeBlock>
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

              <div className="my-6 border border-amber-500/20 bg-amber-50/30 dark:bg-amber-950/10 rounded-lg p-4 not-prose space-y-2 text-sm text-muted-foreground">
                <h4 className="font-semibold text-foreground">💡 Node.js Resolution: Why both register-paths.js and babel-esm-loader.js?</h4>
                <p>
                  Dinou runs as a hybrid server environment supporting both legacy CommonJS (using <code>require()</code>) and modern native ESM (using <code>import</code>):
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>
                    <strong>tsconfig-paths (register-paths.js):</strong> Hooks into Node's CommonJS module system (<code>Module._resolveFilename</code>). It allows the parent Express web server and other ejected scripts utilizing <code>require()</code> to load alias-mapped files.
                  </li>
                  <li>
                    <strong>babel-esm-loader.js:</strong> Hooks into Node's native ESM loader pipeline. It intercepts native <code>import</code> or dynamic <code>import()</code> statements when transpiling React Server Components (RSC) on-the-fly.
                  </li>
                </ul>
                <p>
                  Having only one loader would result in resolution crashes: <code>tsconfig-paths</code> cannot intercept ESM <code>import</code> calls, and <code>babel-esm-loader</code> cannot intercept CommonJS <code>require()</code> calls.
                </p>
              </div>
            </section>

            <hr className="my-8" />

            {/* CALLING CONTEXTS */}
            <section id="calling-contexts">
              <h2>🎯 Integration & Calling Processes</h2>
              <p>
                In Dinou's dual-process architecture, Node.js runs two isolated processes. Since both require access to typescript path aliases (like <code>@/</code>) inside their CommonJS execution threads, <code>register-paths.js</code> is required by both entry files:
              </p>
              <ul className="list-disc pl-6 mt-4 space-y-3">
                <li>
                  <a href="/docs/ejected-reference/server"><strong><code>server.js</code> (Parent Web Server):</strong></a> Loads <code>register-paths.js</code> at startup to allow parsing aliases inside middleware, route handlers, and configuration modules run directly on the main thread.
                </li>
                <li>
                  <a href="/docs/ejected-reference/render-html"><strong><code>render-html.js</code> (Child HTML Renderer):</strong></a> Runs in an isolated sub-process spawned to pre-render the pages. It imports <code>register-paths.js</code> to resolve absolute paths when constructing layout modules and page trees.
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
