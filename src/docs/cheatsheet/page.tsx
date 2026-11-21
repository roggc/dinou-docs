import { Link } from "dinou";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Badge } from "@/docs/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  FolderTree,
  AlertCircle,
  ExternalLink,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const tocItems = [
  { id: "file-conventions", title: "1. File Conventions", level: 2 },
  { id: "route-components", title: "Route Components & Lifecycles", level: 3 },
  { id: "layout-flags", title: "Layout Control Flags", level: 3 },
  { id: "route-escaping", title: "Route Escaping (_folder)", level: 3 },

  { id: "route-syntax", title: "2. Route Syntax & Types", level: 2 },
  { id: "route-patterns", title: "Route Patterns & Inferred Params", level: 3 },
  { id: "type-helpers", title: "Type-Safe Routing Helpers", level: 3 },

  { id: "server-contracts", title: "3. Server Lifecycle Contracts", level: 2 },
  { id: "lifecycle-contracts", title: "page_functions & layout_functions", level: 3 },
  { id: "revalidate-modes", title: "Revalidation Modes (SSR, ISR, SSG)", level: 3 },

  { id: "navigation-hooks", title: "4. Client Navigation & Hooks", level: 2 },
  { id: "client-primitives", title: "Link & Redirection", level: 3 },
  { id: "location-hooks", title: "Router & Navigation Hooks", level: 3 },

  { id: "server-primitives", title: "5. Server Primitives & Cache", level: 2 },
  { id: "context-and-slots", title: "Context, Config & Cache Slots", level: 3 },
  { id: "cache-invalidation", title: "On-Demand Invalidation", level: 3 },

  { id: "cli-execution-modes", title: "6. CLI & Execution Modes", level: 2 },
  { id: "cli-commands", title: "Core CLI Commands", level: 3 },
  { id: "cli-vendor-modes", title: "Vendorized vs. Unvendorized (-u)", level: 3 },

  { id: "decision-matrix", title: "7. Decision Matrix: When to Use What", level: 2 },
  { id: "matrix-cache", title: "Cache Invalidation Matrix", level: 3 },
  { id: "matrix-redirects", title: "Redirection Strategy Matrix", level: 3 },
  { id: "matrix-params", title: "Route Parameter Access Matrix", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Cheatsheet | Dinou Docs</title>
      <meta
        name="description"
        content="At-a-glance high-density desktop reference for file conventions, dynamic route syntax, server lifecycle contracts, and client navigation hooks."
      />
      <link rel="canonical" href="https://dinou.dev/docs/cheatsheet" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Executive Reference
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                ⚡ Dinou Complete Cheatsheet
              </h1>
            </div>
            <p className="text-lg text-muted-foreground leading-relaxed">
              At-a-glance high-density desktop reference for file conventions, dynamic route syntax, server lifecycle contracts, client navigation hooks, and architectural decision matrices.
            </p>

            {/* Quick Link to Detailed API Reference */}
            <div className="flex items-center justify-between p-4 rounded-lg border border-primary/20 bg-primary/5 not-prose">
              <div className="flex items-center gap-3">
                <BookOpen className="h-5 w-5 text-primary shrink-0" />
                <div className="text-sm">
                  <span className="font-semibold text-foreground">Need deep-dive signatures and multi-line snippets?</span>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    This cheatsheet provides concise signatures and decision tables. Full implementations are documented in the API Reference.
                  </p>
                </div>
              </div>
              <Link
                href="/docs/api-reference"
                className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                <span>API Reference</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* ================================================================= */}
            {/* SECTION 1: FILE CONVENTIONS */}
            {/* ================================================================= */}
            <section id="file-conventions" className="scroll-mt-20">
              <h2 className="flex items-center gap-3">
                1. File Conventions Cheatsheet
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Filesystem
                </span>
              </h2>
              <p>
                Directories inside <code>src/</code> directly map to URL paths. Standardized file names define UI leaves, layout shells, and decoupled server contracts.
              </p>

              <section id="route-components" className="scroll-mt-20">
                <h3>Route Components &amp; Lifecycles</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Filename</th>
                        <th className="py-2.5 px-3.5">Role</th>
                        <th className="py-2.5 px-3.5">Scope</th>
                        <th className="py-2.5 px-3.5">Key Responsibility</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          page.{`{tsx,jsx,ts,js}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Route Page UI</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Primary UI component rendered for the route segment. Receives <code>params</code> and any props returned by <code>page_functions</code> <code>getProps()</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          layout.{`{tsx,jsx,ts,js}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Layout Shell</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Persistent UI wrapper preserving client state across child navigations. Receives <code>children</code>, <code>params</code>, sibling <code>@slot</code> props, and <code>layout_functions</code> <code>getProps()</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          @slot/page.{`{tsx,jsx,ts,js}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Parallel Slot UI</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Parallel route rendered concurrently and injected as the named <code>slot</code> prop into the sibling <code>layout.tsx</code>. Supports isolated <code>@slot/error.tsx</code> containment.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          error.{`{tsx,jsx,ts,js}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">500 Error Page</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Error UI rendered when an unhandled exception occurs within this route or <code>@slot</code> subtree. Receives <code>{`{ error, params }`}</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          not_found.{`{tsx,jsx,ts,js}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">404 Page</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Rendered when no route matches, <code>validateParams()</code> returns <code>false</code>, or <code>allowISG = false</code> rejects an ungenerated path. Receives <code>params</code> and optional sibling <code>getProps()</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          page_functions.{`{ts,js,tsx,jsx,mjs}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Page Server Lifecycle</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Server Only
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Decoupled server contract for <code>page.tsx</code>: <code>getProps</code>, <code>revalidate</code>, <code>ppr</code>, <code>getStaticPaths</code>, <code>getCacheTags</code>, <code>allowISG</code>, <code>validateParams</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          layout_functions.{`{ts,js,tsx,jsx,mjs}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Layout Server Lifecycle</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Server Only
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Decoupled server contract for <code>layout.tsx</code>: independent <code>getProps</code>, <code>revalidate</code>, <code>ppr</code>, <code>getStaticPaths</code>, <code>getCacheTags</code>, <code>allowISG</code>, and <code>validateParams</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          dinou.config.{`{ts,mjs,js,cjs}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Project Config (Root)</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Build / Server
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          AOT-bundled global config via <code>defineConfig()</code> (<code>reactCompiler</code>, <code>reactStrictMode</code>, <code>ppr</code>, <code>allowISG</code>, <code>storage</code>, <code>setupFiles</code>, <code>assetExtensions</code>, <code>plugins</code>). Optional root <code>dinou.setup.{`{ts,mjs,js}`}</code> runs pre-boot polyfills.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border rounded-lg p-3 bg-muted/30 not-prose mt-3 flex items-start gap-2.5 text-xs text-muted-foreground">
                  <FolderTree className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Hierarchical Bubble-Up:</span> Dinou bubbles unhandled errors and 404s upward to the closest ancestor handler. A nested <code>src/blog/[slug]/not_found.tsx</code> intercepts 404s before the root <code>src/not_found.tsx</code>.
                  </div>
                </div>
              </section>

              <section id="layout-flags" className="scroll-mt-20 mt-8">
                <h3>Layout Control Flags (Empty Files)</h3>
                <p>
                  Create these <strong>empty files</strong> (zero bytes, no extension) inside a route directory to modify layout inheritance without writing custom wrapper logic:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Flag File</th>
                        <th className="py-2.5 px-3.5">Target</th>
                        <th className="py-2.5 px-3.5">Architectural Effect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">no_layout</td>
                        <td className="py-2.5 px-3.5 font-mono">page.tsx</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Renders the page completely bare, bypassing all parent layouts. Ideal for print templates, popups, or embeddable iframes.
                        </td>
                      </tr>
                      <tr className="bg-amber-50/40 dark:bg-amber-950/20">
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-amber-700 dark:text-amber-400">reset_layout</td>
                        <td className="py-2.5 px-3.5 font-mono">layout.tsx</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Resets the layout stack.</strong> Discards all ancestor layouts; this folder&apos;s <code>layout.tsx</code> becomes the isolated new Root Layout for this branch.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">no_layout_error</td>
                        <td className="py-2.5 px-3.5 font-mono">error.tsx</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Renders the segment&apos;s 500 error page without any surrounding layout shells.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">no_layout_not_found</td>
                        <td className="py-2.5 px-3.5 font-mono">not_found.tsx</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Renders the segment&apos;s 404 not found page without any surrounding layout shells.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="route-escaping" className="scroll-mt-20 mt-8">
                <h3>Route Escaping (<code>_prefix</code>)</h3>
                <p>
                  Any directory prefixed with an underscore (<code>_folder</code>) is completely ignored by Dinou&apos;s router, bundlers, and route type generator.
                </p>
                <Alert className="not-prose mt-3 border-border/80 bg-muted/40">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-xs font-semibold">
                    When to use Underscore Folders
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    Standard project folders (e.g. <code>components/</code>, <code>hooks/</code>, <code>utils/</code>) do <strong>NOT</strong> require an underscore prefix; Dinou only treats a folder as a route if it contains a <code>page.*</code> file. Use <code>_</code> exclusively to quarantine legacy or backup folders containing <code>page.*</code> files (e.g., <code>src/_archived-v1/page.tsx</code>).
                  </AlertDescription>
                </Alert>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 2: ROUTE SYNTAX & TYPES */}
            {/* ================================================================= */}
            <section id="route-syntax" className="scroll-mt-20 mt-12 pt-8 border-t border-border">
              <h2 className="flex items-center gap-3">
                2. Route Syntax &amp; Types
                <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  Type Safety
                </span>
              </h2>
              <p>
                Dinou provides zero-runtime type safety by inferring route parameter types directly from folder bracket naming conventions.
              </p>

              <section id="route-patterns" className="scroll-mt-20">
                <h3>Route Patterns &amp; Inferred Params</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Folder Pattern</th>
                        <th className="py-2.5 px-3.5">Example URL</th>
                        <th className="py-2.5 px-3.5">Inferred <code>params</code> Type</th>
                        <th className="py-2.5 px-3.5">Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/about</td>
                        <td className="py-2.5 px-3.5 font-mono">/about</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`{}`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Static segment. Exactly matches literal path.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/blog/[slug]</td>
                        <td className="py-2.5 px-3.5 font-mono">/blog/hello-world</td>
                        <td className="py-2.5 px-3.5 font-mono text-primary font-semibold">{`{ slug: string }`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Single required dynamic parameter.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/docs/[...slug]</td>
                        <td className="py-2.5 px-3.5 font-mono">/docs/api/routing</td>
                        <td className="py-2.5 px-3.5 font-mono text-primary font-semibold">{`{ slug: string[] }`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Catch-all. Matches 1 or more trailing segments.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/shop/[[...slug]]</td>
                        <td className="py-2.5 px-3.5 font-mono">/shop, /shop/shoes/nike</td>
                        <td className="py-2.5 px-3.5 font-mono text-primary font-semibold">{`{ slug: string[] }`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Optional catch-all. Matches 0+ segments; normalized to <code>[]</code> at root (input <code>params</code> in <code>&lt;Link&gt;</code>/<code>getStaticPaths</code> stays optional).</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/dash/[[tab]]</td>
                        <td className="py-2.5 px-3.5 font-mono">/dash, /dash/billing</td>
                        <td className="py-2.5 px-3.5 font-mono text-primary font-semibold">{`{ tab?: string }`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Optional single parameter (strict No-Gap rule for chained optional segments).</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/(auth)/login</td>
                        <td className="py-2.5 px-3.5 font-mono">/login</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`{}`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Route group. Organizes files and scoped layouts without adding a URL segment.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/dash/@analytics</td>
                        <td className="py-2.5 px-3.5 font-mono">/dash (injected slot)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">Inherits ancestor params</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Parallel slot. Rendered into sibling <code>layout.tsx</code> as <code>analytics?: ReactNode</code>.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="type-helpers" className="scroll-mt-20 mt-8">
                <h3>Type-Safe Routing Helpers (<code>dinou</code> &amp; <code>./dinou</code>)</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Helper / Import</th>
                        <th className="py-2.5 px-3.5">TypeScript Signature</th>
                        <th className="py-2.5 px-3.5">Purpose</th>
                        <th className="py-2.5 px-3.5 text-right">API Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          PageProps&lt;T, TProps?&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ params: RouteParams<T> } & TProps`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Props for <code>page.tsx</code> (merges <code>getProps()</code> return via <code>TProps</code>). Query params use <code>useSearchParams()</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#pageprops" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          LayoutProps&lt;T, TProps?&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ children: ReactNode; params: LayoutParams<T> } & LayoutSlots<T> & TProps`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Props for <code>layout.tsx</code> (including intermediate layouts); auto-injects sibling <code>@slot</code> props and <code>layout_functions</code> props.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#layoutprops" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          SlotProps&lt;T&gt; &amp; NotFoundProps&lt;T, TProps?&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ params: SlotParams<T> } / { params: RouteParams<T> } & TProps`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Dedicated types for <code>@slot/page.tsx</code> parallel slots and scoped <code>not_found.tsx</code> boundaries.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#slot-notfound-props" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          ErrorProps&lt;T&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ error: Error; params: ErrorParams<T> }`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Props for <code>error.tsx</code> and <code>@slot/error.tsx</code> boundaries (runtime delivers sanitized error details).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#errorprops" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          PageFunctions / LayoutFunctions
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`PageFunctions<T, TProps?> / LayoutFunctions<T, TProps?>`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Typed contract interfaces for <code>page_functions.ts</code> and <code>layout_functions.ts</code> exports (<code>getProps</code>, <code>getStaticPaths</code>, etc.).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#pagefunctions" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          RouteParams&lt;T&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          Extracted parameter dictionary from generated registry or literal pattern
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Typed <code>params</code> argument for <code>getProps</code>, <code>getCacheTags</code>, or <code>validateParams</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#routeparams" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          DinouRoute &amp; DinouLinkTarget
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          Concrete routes + dynamic patterns (<code>"/blog/[slug]"</code>) + relative <code>from</code>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Level 1 type safety: IDE autocomplete &amp; validation for <code>&lt;Link&gt;</code>, <code>router.push()</code>, and <code>params</code> interpolation.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#dinouroute" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          DinouRoutePattern &amp; Segments
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          <code>DinouRoutePattern</code>, <code>DinouLayoutPattern</code>, <code>DinouSlotPattern</code>, <code>DinouErrorPattern</code>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Level 2 type safety: generic pattern constraints across pages, layouts, parallel slots, and error/404 boundaries.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#dinouroutepattern" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr className="bg-purple-50/40 dark:bg-purple-950/20">
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-purple-700 dark:text-purple-400">
                          Contextual &quot;./dinou&quot;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          <code>import {`{ PageProps, LayoutProps, Link, useRouter }`} from &quot;./dinou&quot;</code>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Zero-boilerplate (Recommended):</strong> auto-binds route <code>params</code>, sibling <code>@slots</code>, and relative <code>from</code> origin to the current folder.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#contextual-dinou" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 3: SERVER LIFECYCLE CONTRACTS */}
            {/* ================================================================= */}
            <section id="server-contracts" className="scroll-mt-20 mt-12 pt-8 border-t border-border">
              <h2 className="flex items-center gap-3">
                3. Server Lifecycle Contracts
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Server Only
                </span>
              </h2>
              <p>
                Contracts declared in <code>page_functions.ts</code> (or <code>layout_functions.ts</code>). Executed exclusively on the server, completely decoupled from React render passes.
              </p>

              <section id="lifecycle-contracts" className="scroll-mt-20">
                <h3>Exported Contracts Table</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Exported Contract</th>
                        <th className="py-2.5 px-3.5">Signature</th>
                        <th className="py-2.5 px-3.5">Default</th>
                        <th className="py-2.5 px-3.5">Execution &amp; Purpose</th>
                        <th className="py-2.5 px-3.5 text-right">API Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          getProps(params)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (params) =&gt; Promise&lt;T&gt; | T
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{}`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Server data loader. Return value is directly passed as props to <code>page.tsx</code> or <code>layout.tsx</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#getprops" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          revalidate
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          number | false | (() =&gt; ...)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          false (SSG)
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Cache TTL in seconds. <code>0</code> (or <code>&lt; 1</code>) = Dynamic SSR, <code>&gt;= 1</code> = ISR, <code>false</code> / omitted = Static SSG.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidate-config" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          ppr
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          boolean | (() =&gt; boolean | Promise&lt;boolean&gt;)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          config.ppr ?? false
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Segment-isolated Partial Prerendering: pre-renders static shell and streams <code>&lt;Suspense&gt;</code> holes (does not inherit from parent layouts).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#ppr-config" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          getCacheTags
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          string[] | ((params?) =&gt; string[] | Promise&lt;string[]&gt;)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          []
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Associates cache tags (constant array or function) with the route or layout for targeted invalidation via <code>revalidateTag(tag)</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#getcachetags" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          getStaticPaths
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          StaticPathItem[] | (() =&gt; StaticPathsResult)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          []
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Pre-generates dynamic parameter values/objects at build time (constant array or function) across <code>page_functions</code> and <code>layout_functions</code> (<code>[p]</code>, <code>[[p]]</code>, <code>[...s]</code>, <code>[[...s]]</code>).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#getstaticpaths" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          allowISG
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          boolean | (() =&gt; boolean | Promise&lt;boolean&gt;)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          config.allowISG ?? true
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          When <code>true</code>, ungenerated dynamic paths render on-demand (ISG). When <code>false</code>, ungenerated paths return 404 on both HTML and SPA RSC fetches.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#allowisg" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          validateParams(params)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (params?) =&gt; boolean | Promise&lt;boolean&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          () =&gt; true
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Authoritative root-to-child gatekeeper. Returning <code>false</code> vetoes cached HTML/RSC and terminates with 404 before <code>getProps()</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#validateparams" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="revalidate-modes" className="scroll-mt-20 mt-8">
                <h3>Revalidation Modes (SSR vs ISR vs SSG)</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Export Value</th>
                        <th className="py-2.5 px-3.5">Rendering Mode</th>
                        <th className="py-2.5 px-3.5">Cache Behavior</th>
                        <th className="py-2.5 px-3.5">Ideal Use Case</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-blue-600 dark:text-blue-400">
                          export const revalidate = 0;
                        </td>
                        <td className="py-2.5 px-3.5 font-semibold text-blue-600 dark:text-blue-400">Dynamic SSR</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Evaluated fresh on every HTTP request (any value <code>&lt; 1</code>). Never cached in static storage.
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          User accounts, checkout pages, real-time analytics.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          export const revalidate = 60;
                        </td>
                        <td className="py-2.5 px-3.5 font-semibold text-emerald-600 dark:text-emerald-400">ISR (Regeneration)</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Served from cache for N seconds (<code>&gt;= 1</code>). Next visit serves stale cache and triggers background re-generation.
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          E-commerce product pages, news feeds, search result pages.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-purple-600 dark:text-purple-400">
                          export const revalidate = false;
                        </td>
                        <td className="py-2.5 px-3.5 font-semibold text-purple-600 dark:text-purple-400">Static (SSG)</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Default when omitted. Prerendered at build time and cached indefinitely until purged via on-demand invalidation.
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Marketing landing pages, documentation, blog posts.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 4: CLIENT NAVIGATION & HOOKS */}
            {/* ================================================================= */}
            <section id="navigation-hooks" className="scroll-mt-20 mt-12 pt-8 border-t border-border">
              <h2 className="flex items-center gap-3">
                4. Client Navigation &amp; Hooks
                <span className="inline-flex items-center rounded-md bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-600 dark:text-sky-400 ring-1 ring-inset ring-sky-500/20">
                  dinou
                </span>
              </h2>
              <p>
                Declarative navigation components and reactive client hooks for routing state and micro-ISR slot manipulation.
              </p>

              <section id="client-primitives" className="scroll-mt-20">
                <h3>Link &amp; Redirection Primitives</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Export</th>
                        <th className="py-2.5 px-3.5">Scope</th>
                        <th className="py-2.5 px-3.5">Signature / Props</th>
                        <th className="py-2.5 px-3.5">Behavior</th>
                        <th className="py-2.5 px-3.5 text-right">API Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          &lt;Link&gt;
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`href? | to?, params?, from?, prefetch?, fresh?, ...<a>`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          SPA navigation component (<code>prefetch</code> defaults to <code>true</code>). Supports dynamic <code>params</code>, relative <code>from</code>, and <code>fresh</code> cache bypass. External URLs, <code>target</code>, and <code>download</code> use native browser behavior.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#link" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          &lt;ClientRedirect&gt;
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                            Client
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`to: string`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Declarative client-side <code>replace</code> redirect triggered immediately upon mount. Renders <code>null</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#clientredirect" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          redirect()
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (destination: string) =&gt; ReactNode
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          HTTP 302 on SSR (or <code>x-rsc-redirect</code> on SPA) if headers unsent; returns <code>&lt;ClientRedirect&gt;</code> fallback if streaming/client. Always use <code>return redirect(...)</code> in components.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#redirect" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="location-hooks" className="scroll-mt-20 mt-8">
                <h3>Router &amp; Navigation Hooks</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Hook / Helper</th>
                        <th className="py-2.5 px-3.5">Scope</th>
                        <th className="py-2.5 px-3.5">Returned Interface</th>
                        <th className="py-2.5 px-3.5">Common Use Case</th>
                        <th className="py-2.5 px-3.5 text-right">API Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          useRouter()
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                            Client
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ push, replace, refresh, refreshSlot, back, forward }`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Memoized imperative router supporting <code>{`{ fresh, params, from }`}</code>, external URLs, <code>refresh({`{ layout: true }`})</code>, and slot updates.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#userouter" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          usePathname()
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          string (normalized, e.g. <code>"/dashboard"</code>)
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Active navigation highlights, breadcrumbs, and layout route branching (strips query/hash and trailing slash except <code>&quot;/&quot;</code>).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#usepathname" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          useSearchParams()
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/20">
                            Universal
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          URLSearchParams (<code>.get()</code>, <code>.has()</code>, <code>.getAll()</code>)
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Reads query strings (<code>?q=react&amp;sort=asc</code>). Server usage triggers dynamic SSR bailout; Client usage preserves SSG/ISR/PPR/static-export cleanly.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#usesearchparams" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          useNavigationLoading()
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                            Client
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          boolean
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Global top loading bar or spinner indicators during pending SPA transitions (always <code>false</code> during SSR).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#usenavigationloading" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          refreshSlot(slotId, options?)
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                            Client
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (slotId: string, options?: &#123; fresh?: boolean &#125;) =&gt; Promise&lt;void&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Awaitable surgical refresh of a specific <code>&lt;DinouCacheSlot&gt;</code> (by <code>id</code>, <code>tag</code>, or <code>&quot;*&quot;</code> wildcard) without refreshing the page.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#refreshslot" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 5: SERVER PRIMITIVES & CACHE */}
            {/* ================================================================= */}
            <section id="server-primitives" className="scroll-mt-20 mt-12 pt-8 border-t border-border">
              <h2 className="flex items-center gap-3">
                5. Server Primitives &amp; Cache
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  dinou &amp; dinou/server
                </span>
              </h2>
              <p>
                Server-side context providers, micro-ISR slot primitives, and cluster cache purge APIs.
              </p>

              <section id="context-and-slots" className="scroll-mt-20">
                <h3>Context, Config, Plugins &amp; Cache Slots</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Export</th>
                        <th className="py-2.5 px-3.5">Package</th>
                        <th className="py-2.5 px-3.5">Signature</th>
                        <th className="py-2.5 px-3.5">Purpose &amp; Mechanics</th>
                        <th className="py-2.5 px-3.5 text-right">API Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          getContext()
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou, dinou/server, dinou/config</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          () =&gt; RequestContextStore
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Synchronous AsyncLocalStorage access (never <code>null</code>): <code>req</code> (<code>cookies</code>, <code>headers</code>, <code>path</code>, <code>rawPath</code>, <code>isRscRequest</code>), <code>res</code>, unified <code>env</code> (<code>DinouEnv</code> + KV/D1/R2), and <code>ctx</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right whitespace-nowrap space-x-2">
                          <Link href="/docs/request-context" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Guide <ExternalLink className="h-3 w-3" />
                          </Link>
                          <Link href="/docs/api-reference#getcontext" className="text-muted-foreground hover:text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            API <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          &lt;DinouCacheSlot&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou/server</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`id?, revalidate?: number | false, tag?, tags?, children`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Micro-ISR server component. Caches an independent sub-tree (merges <code>tag</code> + <code>tags</code>; <code>id</code> defaults to first tag; <code>children</code> accepts JSX or async render fn).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#dinoucacheslot" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          noDynamic()
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou, dinou/server, dinou/config</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          () =&gt; void
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Call synchronously before first <code>await</code> to opt an enclosing <code>&lt;Suspense&gt;</code> boundary out of becoming a dynamic PPR hole, baking it into <code>shell.html</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#nodynamic" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          defineConfig(config)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou, dinou/config</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (config: DinouConfig) =&gt; DinouConfig
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Type helper for <code>dinou.config.{`{ts,mjs,js,cjs}`}</code> (<code>reactCompiler</code>, <code>reactStrictMode</code>, <code>ppr</code>, <code>allowISG</code>, <code>storage</code>, <code>setupFiles</code>, <code>assetExtensions</code>, <code>plugins</code>).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#defineconfig" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          DinouPlugin
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou, dinou/config</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ name?, setupFiles?, onRequest?, configureServer? }`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Universal request middleware (<code>onRequest</code> runs ahead of static/ISR/PPR caches and translates SPA redirects) + Node HTTP hooks (<code>configureServer</code>).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#dinouplugin" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          Storage Adapters
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou/server</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          FileSystemStorage, RedisStorage, CloudflareKVStorage, DenoKVStorage, MemoryStorage
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Pluggable ISR/ISG/PPR cache backends plus <code>StorageAdapter</code> base class, <code>getStorageAdapter()</code>, and <code>setStorageAdapter()</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#storage-adapters-list" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="cache-invalidation" className="scroll-mt-20 mt-8">
                <h3>On-Demand Cache Invalidation (<code>dinou/server</code>)</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Function</th>
                        <th className="py-2.5 px-3.5">Target</th>
                        <th className="py-2.5 px-3.5">Signature</th>
                        <th className="py-2.5 px-3.5">Purge Effect</th>
                        <th className="py-2.5 px-3.5 text-right">API Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          revalidatePage(path)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Page Component Only</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (path: string) =&gt; Promise&lt;void&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Regenerates only the page&apos;s <code>page.rsc</code> and <code>index.html</code> (or <code>shell.html</code>), leaving parent <code>layout.rsc</code> untouched.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidatepage" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          revalidateLayout(path)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Layout Segment Only (O(1))</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (path: string) =&gt; Promise&lt;boolean&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Regenerates only <code>layout.rsc</code> in O(1) time (0 child pages executed); child <code>index.html</code> files lazily re-compose on demand.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidatelayout" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          revalidatePath(path)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Segment Layout + Page</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (path: string) =&gt; Promise&lt;void&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Regenerates both the segment&apos;s <code>layout.rsc</code> (if present) and its <code>page.rsc</code> + <code>index.html</code> (<code>revalidateLayout</code> + <code>revalidatePage</code>).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidatepath" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          revalidateTag(tag)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Tags (Pages, Layouts &amp; Slots)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (tag: string) =&gt; Promise&lt;void&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Purges and regenerates all pages, layouts (O(1)), and <code>&lt;DinouCacheSlot&gt;</code> fragments tagged with the identifier (including <code>id</code>-only slots) across the cluster. All path-based helpers also accept relative paths (<code>&quot;./&quot;</code>, <code>&quot;../...&quot;</code>) inside Server Functions.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidatetag" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 6: CLI & EXECUTION MODES */}
            {/* ================================================================= */}
            <section id="cli-execution-modes" className="scroll-mt-20 mt-12 pt-8 border-t border-border">
              <h2 className="flex items-center gap-3">
                6. CLI &amp; Execution Modes
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  dinou CLI
                </span>
              </h2>
              <p>
                Unified CLI for multi-bundler development, multi-runtime AOT production builds, static export, type generation, ejection, and dual-mode additive vendoring.
              </p>

              <section id="cli-commands" className="scroll-mt-20">
                <h3>Core CLI Commands (<code>dinou</code>)</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Command</th>
                        <th className="py-2.5 px-3.5">Output / Runtime</th>
                        <th className="py-2.5 px-3.5">Purpose</th>
                        <th className="py-2.5 px-3.5 text-right">Guide</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          dinou dev[:esbuild|:rollup|:webpack]
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          In-memory VFS (Node.js)
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Starts the dev server with HMR, live route typegen, and hot <code>.env</code> / alias / config reload (defaults to Esbuild).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/bundlers" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          dinou build[:node[:bundler]] &amp; dinou start
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          .dinou/dist{`{1,2,3}`} (Node.js)
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Compiles AOT Dual-Bundle server artifacts, SSG/PPR pages, and hashed public assets; starts production HTTP server.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/deployment" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          dinou build:{`{netlify|cloudflare|bun|deno}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          Edge / Serverless / Binaries
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Multi-runtime production builds (supports <code>:esbuild</code>, <code>:rollup</code>, <code>:webpack</code>, <code>:pure</code> Bun, and <code>:compile[:linux|:linux_arm|:mac|:win]</code>).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/deployment" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          dinou export-static[:bundler]
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          out/ (Static CDN)
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Exports self-contained static HTML, segmented RSC payloads, and assets for CDN/GitHub Pages hosting with SPA navigation.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/rendering" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          dinou typegen
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          .dinou/types &amp; .dinou/routes
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Regenerates <code>routes.d.ts</code> and contextual <code>&quot;./dinou&quot;</code> modules from <code>src/</code> (ideal for CI typechecks before <code>tsc --noEmit</code>).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/type-safe-routing" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          dinou eject / dinou uneject [version]
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          ./dinou/ ↔ node_modules
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Copies full framework source into <code>./dinou</code> (<code>--force</code>, <code>--skip-install</code>) or reverts transactionally back to npm (<code>-y</code>, <code>--keep-dinou</code>).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/eject" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="cli-vendor-modes" className="scroll-mt-20 mt-8">
                <h3>Vendorized (Default) vs. Unvendorized (<code>-u</code>)</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Command / Env Var</th>
                        <th className="py-2.5 px-3.5">Active Mode</th>
                        <th className="py-2.5 px-3.5">Resolution Target</th>
                        <th className="py-2.5 px-3.5">When to Use</th>
                        <th className="py-2.5 px-3.5 text-right">Guide</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          npm run dev / npm run build
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Vendorized (Default)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          dinou/compiled/
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Daily development and production builds with instant cold starts and zero upstream dependency drift.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/bundlers#dual-mode-vendoring" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-blue-600 dark:text-blue-400">
                          npm run dev -- -u
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Unvendorized (<code>-u</code> / <code>--unvendorized</code>)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          node_modules/
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Debugging upstream packages, testing local patches, or running upgraded dependencies directly from <code>node_modules</code> (works on Node.js and Bun).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/bundlers#unvendorized-mode" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-blue-600 dark:text-blue-400">
                          DINOU_UNVENDORIZED=true
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Unvendorized (Env)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          node_modules/
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          CI/CD pipelines or Docker containers where environment variables are preferred over CLI flags.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/bundlers#unvendorized-mode" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          npm run build:vendors
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Vendor Compiler (Ejected Only)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          ./dinou/compiled/
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Recompiles the 31 standalone ESM vendor bundles in ~5s after bumping dependencies in an ejected project.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/eject#ejected-vendoring" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 7: DECISION MATRIX */}
            {/* ================================================================= */}
            <section id="decision-matrix" className="scroll-mt-20 mt-12 pt-8 border-t border-border">
              <h2 className="flex items-center gap-3">
                7. Decision Matrix: When to Use What
                <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                  Architectural Guide
                </span>
              </h2>
              <p>
                Quick comparative decision tables to help you pick the right primitive for caching, navigation, and state access without trial and error.
              </p>

              {/* Matrix 1: Cache Invalidation */}
              <section id="matrix-cache" className="scroll-mt-20">
                <h3>Cache Invalidation: Which method should you call?</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Method</th>
                        <th className="py-2.5 px-3.5">Caller Environment</th>
                        <th className="py-2.5 px-3.5">Scope of Impact</th>
                        <th className="py-2.5 px-3.5">When to Choose It</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          revalidatePage(path)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server (Action / Webhook / API)</td>
                        <td className="py-2.5 px-3.5">Single route page only (<code>page.rsc</code> + <code>index.html</code>)</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Default for single-page edits:</strong> when updating content on a known URL (e.g. <code>&quot;/blog/post-1&quot;</code>) without touching shared layouts.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          revalidateLayout(path)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server (Action / Webhook / API)</td>
                        <td className="py-2.5 px-3.5">Single layout shell in O(1) (<code>layout.rsc</code>)</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Shared layout updates:</strong> when updating a sidebar, header, or navigation menu (e.g. <code>&quot;/docs&quot;</code> or <code>&quot;/&quot;</code>); child routes lazily re-compose their HTML on demand.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          revalidatePath(path)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server (Action / Webhook / API)</td>
                        <td className="py-2.5 px-3.5">Segment layout + index page at <code>path</code></td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          When a mutation updates <strong>both</strong> a section&apos;s layout and its index landing page simultaneously (e.g. <code>&quot;/store&quot;</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          revalidateTag(tag)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server (Action / Webhook / API)</td>
                        <td className="py-2.5 px-3.5">Multi-page, layout &amp; slot cluster</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Recommended for shared data models:</strong> when updating a database record (e.g., product or article) that appears across lists, detail pages, and <code>&lt;DinouCacheSlot&gt;</code> widgets.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-sky-600 dark:text-sky-400">
                          refreshSlot(slotId, {`{ fresh? }`})
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Client Component (Browser)</td>
                        <td className="py-2.5 px-3.5">Single targeted slot (or <code>&quot;*&quot;</code>) on current page</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Zero layout/page re-render:</strong> when an interactive client widget updates (e.g. cart badge counter or mini ticker) without touching the rest of the page; pass <code>{`{ fresh: true }`}</code> to bypass slot cache.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-sky-600 dark:text-sky-400">
                          router.refresh({`{ layout? }`})
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Client Component (Browser)</td>
                        <td className="py-2.5 px-3.5">Active page (or page + layout with <code>{`{ layout: true }`}</code>)</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          When a client action needs fresh server props for the route without losing client state or scrolling to top.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Matrix 2: Redirection Strategies */}
              <section id="matrix-redirects" className="scroll-mt-20 mt-8">
                <h3>Redirection: Which redirection strategy should you use?</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Strategy</th>
                        <th className="py-2.5 px-3.5">Context / Location</th>
                        <th className="py-2.5 px-3.5">HTTP / Browser Mechanism</th>
                        <th className="py-2.5 px-3.5">When to Choose It</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          Response.redirect() in onRequest
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server Plugin (dinou.config.ts)</td>
                        <td className="py-2.5 px-3.5">HTTP 3xx on SSR; auto-translated to <code>x-rsc-redirect</code> on SPA</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Global edge/auth gates:</strong> Runs ahead of cached SSG/ISR/PPR pages before any route module executes.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          redirect(path) in getProps
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server (page_functions / layout_functions)</td>
                        <td className="py-2.5 px-3.5">Real HTTP 302 Response (or <code>x-rsc-redirect</code> on SPA)</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Fastest route-level guard:</strong> Auth checks or missing-record redirects that short-circuit rendering before JSX execution begins.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-violet-600 dark:text-violet-400">
                          return redirect(path) in Component
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5">HTTP 302 / <code>x-rsc-redirect</code> if headers unsent; <code>&lt;ClientRedirect&gt;</code> SPA replace if stream started or on client</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          When redirection criteria depend on intermediate component tree logic (always <code>return</code> its value).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-sky-600 dark:text-sky-400">
                          &lt;ClientRedirect to="..." /&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Client Component (JSX render)</td>
                        <td className="py-2.5 px-3.5">Client-side <code>replace</code> navigation on mount</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Declarative fallback rendering in client tabs, wizard step redirections, or empty states.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-sky-600 dark:text-sky-400">
                          router.replace(url)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Client Event Handler</td>
                        <td className="py-2.5 px-3.5">History replace without entry</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Post-submission redirect where clicking browser &quot;Back&quot; should not re-submit the action (e.g. login form, payment checkout).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* Matrix 3: Route Parameters */}
              <section id="matrix-params" className="scroll-mt-20 mt-8">
                <h3>Route Parameter Access: Where should you read route data?</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Access Pattern</th>
                        <th className="py-2.5 px-3.5">Environment</th>
                        <th className="py-2.5 px-3.5">Return Type</th>
                        <th className="py-2.5 px-3.5">When to Choose It</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          params in page.tsx (PageProps)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`RouteParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Directly rendering route tokens in the page view (e.g. <code>&lt;h1&gt;Product #{`{params.id}`}&lt;/h1&gt;</code>) with compile-time type validation.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          params in layout.tsx (LayoutProps)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`LayoutParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Shared navigation headers, dynamic breadcrumbs, or sidebars wrapping child segments (also auto-injects sibling <code>@slot</code> props).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          params in @slot/page.tsx (SlotProps)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`SlotParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Parallel slots consuming cumulative ancestor dynamic params alongside the main page.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          params in getProps(params)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server Only (page_functions / layout_functions)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`RouteParams<Pattern> / LayoutParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Fetching database records or querying external APIs based on dynamic route IDs before rendering.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          params in not_found.tsx (NotFoundProps)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`RouteParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Scoped 404 views displaying the missing item ID (e.g. <code>Item &quot;{`{params.slug}`}&quot; not found</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          params in error.tsx (ErrorProps)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`ErrorParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Scoped 500 error pages (and <code>@slot/error.tsx</code>) showing diagnostic context or retry options for that resource.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          usePathname()
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">string</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Navigation bars, sidebars, or layout components that need to detect the current URL path without relying on child props.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          useSearchParams()
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">URLSearchParams</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Reading query string parameters (filters, pagination, search). Prefer Client Components on static/ISR/PPR pages to avoid dynamic SSR bailout.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border rounded-lg p-3 bg-purple-50/40 dark:bg-purple-950/20 border-purple-500/20 not-prose mt-3 flex items-start gap-2.5 text-xs text-muted-foreground">
                  <Sparkles className="h-4 w-4 text-purple-600 dark:text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Zero-Boilerplate Contextual Tip:</span> Import <code>PageProps</code>, <code>LayoutProps</code>, <code>SlotProps</code>, <code>NotFoundProps</code>, <code>ErrorProps</code>, <code>PageFunctions</code>, <code>LayoutFunctions</code>, <code>Link</code>, and <code>useRouter</code> from <code>&quot;./dinou&quot;</code> inside any route directory to skip explicit <code>&lt;Pattern&gt;</code> generics and <code>from</code> props completely.
                  </div>
                </div>
              </section>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Sticky Desktop Navigation */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
