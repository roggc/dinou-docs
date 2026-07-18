"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Compass, Route, Link, PackageOpen } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "architecture-diagram", title: "📊 Flow Architecture", level: 2 },
  { id: "files", title: "📂 Module Directory", level: 2 },
];

const ROUTING_RESOLVERS_OVERVIEW = `                 🌐 Inbound Request URL: /posts/42/details
                                  │
                                  ▼
           ┌──────────────────────────────────────────────┐
           │     get-file-path-and-dynamic-params.js      │
           ├──────────────────────────────────────────────┤
           │  • Parses segments: ["posts", "42", "details"]│
           │  • Matches dynamic folders: [id] -> id: 42   │
           │  • Crawls layout.tsx & @slots recursively    │
           └──────────────────────┬───────────────────────┘
                                  │
                  ┌───────────────┼───────────────┐
                  ▼                               ▼
      ┌───────────────────────┐       ┌───────────────────────┐
      │   url-resolver.js     │       │get-asset-from-manifest│
      ├───────────────────────┤       ├───────────────────────┤
      │ • Normalizes relative │       │ • Maps bundle imports │
      │   URIs from context.  │       │   to output hashes    │
      │ • standard URL resolve│       │   using manifest.json │
      └───────────────────────┘       └───────────────────────┘`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Compass className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Routing & Path Resolvers
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Discover the dynamic routing engine, layout resolution crawlers, relative link translators, and compiled asset manifest binders.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Group Summary:</strong> <br />
              • Filesystem route resolver: <a href="/docs/ejected-reference/routing-resolvers/path-resolver"><code>./dinou/core/get-file-path-and-dynamic-params.js</code></a> <br />
              • Relative URI resolver: <a href="/docs/ejected-reference/routing-resolvers/url-resolver"><code>./dinou/core/url-resolver.js</code></a> <br />
              • Asset hash resolver: <a href="/docs/ejected-reference/routing-resolvers/asset-resolver"><code>./dinou/core/get-asset-from-manifest.js</code></a>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                A modern framework must map abstract HTTP request paths (such as <code>/docs/routing</code>) into concrete server-side files (like <code>src/docs/routing/page.tsx</code>), resolve nested slot structures (such as <code>@sidebar</code>), handle query/referer state, and resolve dynamic hashes for compiled client bundles.
              </p>
              <p>
                The **Routing & Path Resolvers** group gathers the core utilities responsible for executing these path translations in the background.
              </p>
            </section>

            <hr className="my-8" />

            {/* FLOW DIAGRAM */}
            <section id="architecture-diagram">
              <h2>📊 Flow Architecture</h2>
              <p>
                The following diagram outlines the routing lifecycle:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{ROUTING_RESOLVERS_OVERVIEW}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* FILE SUB-GROUPS */}
            <section id="files">
              <h2>📂 Module Directory</h2>
              <p>
                Explore each component file in detail:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose mt-4">
                <a href="/docs/ejected-reference/routing-resolvers/path-resolver" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <Route className="h-6 w-6 text-blue-500 mb-3" />
                    <h3 className="font-bold text-base my-0">Route Mapper</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Dynamic filesystem route parser, catch-all evaluator, and parallel slot crawler.
                    </p>
                  </div>
                  <span className="text-xs text-blue-500 font-semibold mt-4">View Docs →</span>
                </a>

                <a href="/docs/ejected-reference/routing-resolvers/url-resolver" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <Link className="h-6 w-6 text-purple-500 mb-3" />
                    <h3 className="font-bold text-base my-0">URL Resolver</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Translates relative links (e.g. `./edit`) into absolute system URIs using headers context.
                    </p>
                  </div>
                  <span className="text-xs text-purple-500 font-semibold mt-4">View Docs →</span>
                </a>

                <a href="/docs/ejected-reference/routing-resolvers/asset-resolver" className="border rounded-xl p-5 hover:bg-muted/50 transition-colors flex flex-col justify-between">
                  <div>
                    <PackageOpen className="h-6 w-6 text-emerald-500 mb-3" />
                    <h3 className="font-bold text-base my-0">Asset Loader</h3>
                    <p className="text-xs text-muted-foreground mt-2">
                      Translates internal asset names to hashed bundle paths served by Express.
                    </p>
                  </div>
                  <span className="text-xs text-emerald-500 font-semibold mt-4">View Docs →</span>
                </a>
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
