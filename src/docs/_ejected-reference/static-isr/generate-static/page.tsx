"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Play, Trash2, Hammer, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "engine-flow", title: "📊 Build Cycle Sequence", level: 2 },
  { id: "pipeline", title: "🏗️ Pipeline Orchestration", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const ORCHESTRATOR_DIAGRAM = `graph TD
    Start["generateStatic()"] --> Clean["Clean output folder:<br/>Deletes dist2/ directory"]
    Clean --> BuildStatic["buildStaticPages():<br/>Scans src/ for static route files"]
    BuildStatic --> GetPaths["getStaticPaths():<br/>Retrieves list of crawled paths"]
    GetPaths --> GenRSCs["generateStaticRSCs(routes):<br/>Generates rsc.rsc payloads"]
    GenRSCs --> GenPages["generateStaticPages(routes):<br/>Renders static index.html pages"]`;

const ORCHESTRATOR_CODE = `const path = require("path");
const { existsSync, rmSync } = require("fs");
const generateStaticRSCs = require("./generate-static-rscs");
const generateStaticPages = require("./generate-static-pages");
const { buildStaticPages, getStaticPaths } = require("./build-static-pages");

async function generateStatic() {
  const distFolder2 = path.resolve(process.cwd(), "dist2");

  // 1. Clean build directory to prune outdated/deleted routes
  if (existsSync(distFolder2)) {
    rmSync(distFolder2, { recursive: true, force: true });
    console.log("Deleted existing dist2 folder");
  }

  // 2. Crawl filesystem and resolve static configurations
  await buildStaticPages();
  const routes = getStaticPaths();
  console.log("Static paths:", routes);

  // 3. Serialize RSC flight stream files in parallel
  await generateStaticRSCs(routes);

  // 4. Render HTML static pages
  await generateStaticPages(routes);
}

module.exports = generateStatic;`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Play className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Orchestrator Entry (generate-static.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the main orchestrator script that cleans the build cache, crawls static paths, and triggers the RSC and HTML rendering pipelines.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/generate-static.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                When building a website, there must be a single entry point that manages the lifecycle of the static compilation phase. In Dinou, <code>generate-static.js</code> handles this role. It clears previous builds, runs the route crawler, and triggers the RSC and HTML rendering streams.
              </p>
            </section>

            <hr className="my-8" />

            {/* PIPELINE CYCLE */}
            <section id="engine-flow">
              <h2>📊 Build Cycle Sequence</h2>
              <p>
                The flowchart below traces the steps executed when running the compiler:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid">{ORCHESTRATOR_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PIPELINE ORCHESTRATION */}
            <section id="pipeline">
              <h2>🏗️ Pipeline Orchestration</h2>
              <p>
                The compilation pipeline follows a strict dependency order:
              </p>
              <ol>
                <li>
                  <strong>Clean (Pruning):</strong> Deletes the cache folder (<code>dist2/</code>) using <code>rmSync()</code> to ensure deleted source pages are pruned from output builds.
                </li>
                <li>
                  <strong>Crawl & Map:</strong> Runs <code>buildStaticPages()</code> to find routes and evaluate parameters.
                </li>
                <li>
                  <strong>RSC Phase:</strong> Executes <code>generateStaticRSCs()</code> to serialize react elements. This must run first, as the subsequent HTML compilation relies on loading these output payloads.
                </li>
                <li>
                  <strong>HTML Phase:</strong> Executes <code>generateStaticPages()</code> to parse RSC outputs and output static HTML files.
                </li>
              </ol>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>generate-static.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{ORCHESTRATOR_CODE}</CodeBlock>
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
