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
  Layers,
  Zap,
  ShieldCheck,
  Compass,
  CheckCircle2,
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
  { id: "context-and-slots", title: "getContext & DinouCacheSlot", level: 3 },
  { id: "cache-invalidation", title: "On-Demand Invalidation", level: 3 },

  { id: "decision-matrix", title: "6. Decision Matrix: When to Use What", level: 2 },
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
                Directories inside <code>src/app/</code> directly map to URL paths. Standardized file names define UI leaves, layout shells, and decoupled server contracts.
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
                          Primary UI component rendered for the route segment. Receives server props returned by <code>getProps</code>.
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
                          Persistent UI wrapper wrapping child segments. Preserves client state across child navigations.
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
                          Error UI rendered when an unhandled server or client exception occurs within this route subtree.
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
                          Rendered when a segment does not exist or when <code>validateParams()</code> returns <code>false</code>. Receives <code>params</code> and any server props returned by <code>getProps</code> if <code>page_functions</code> is present.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          page_functions.{`{ts,js}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Page Server Lifecycle</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Server Only
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Decoupled server contract for <code>page.tsx</code>: <code>getProps</code>, <code>revalidate</code>, <code>ppr</code>, <code>getStaticPaths</code>, <code>getCacheTags</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          layout_functions.{`{ts,js}`}
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Layout Server Lifecycle</td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                            Server Only
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Decoupled server contract for <code>layout.tsx</code>: independent <code>getProps</code> and <code>ppr</code> execution.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border rounded-lg p-3 bg-muted/30 not-prose mt-3 flex items-start gap-2.5 text-xs text-muted-foreground">
                  <FolderTree className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-foreground">Hierarchical Bubble-Up:</span> Dinou bubbles unhandled errors and 404s upward to the closest ancestor handler. A nested <code>src/app/blog/[slug]/not_found.tsx</code> intercepts 404s before the root <code>src/app/not_found.tsx</code>.
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
                          <strong>Resets the layout stack.</strong> Discards all ancestor layouts; this folder's <code>layout.tsx</code> becomes the isolated new Root Layout for this branch.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">no_layout_error</td>
                        <td className="py-2.5 px-3.5 font-mono">error.tsx</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Renders the segment's 500 error page without any surrounding layout shells.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">no_layout_not_found</td>
                        <td className="py-2.5 px-3.5 font-mono">not_found.tsx</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Renders the segment's 404 not found page without any surrounding layout shells.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="route-escaping" className="scroll-mt-20 mt-8">
                <h3>Route Escaping (<code>_prefix</code>)</h3>
                <p>
                  Any directory prefixed with an underscore (<code>_folder</code>) is completely ignored by the route compiler.
                </p>
                <Alert className="not-prose mt-3 border-border/80 bg-muted/40">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-xs font-semibold">
                    When to use Underscore Folders
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    Standard project folders (e.g. <code>components/</code>, <code>hooks/</code>, <code>utils/</code>) do <strong>NOT</strong> require an underscore prefix; Dinou only treats a folder as a route if it contains a <code>page.*</code> file. Use <code>_</code> exclusively to quarantine legacy or backup folders containing <code>page.*</code> files (e.g., <code>src/app/_archived-v1/page.tsx</code>).
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
                        <td className="py-2.5 px-3.5 font-mono text-primary font-semibold">{`{ slug?: string[] }`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Optional catch-all. Matches 0 or more trailing segments.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/dash/[[tab]]</td>
                        <td className="py-2.5 px-3.5 font-mono">/dash, /dash/billing</td>
                        <td className="py-2.5 px-3.5 font-mono text-primary font-semibold">{`{ tab?: string }`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Optional single parameter.</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">/(auth)/login</td>
                        <td className="py-2.5 px-3.5 font-mono">/login</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`{}`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">Route group. Organizes files without adding a URL segment.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="type-helpers" className="scroll-mt-20 mt-8">
                <h3>Type-Safe Routing Helpers (<code>dinou</code>)</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-muted/70 text-muted-foreground font-semibold uppercase tracking-wider border-b border-border">
                      <tr>
                        <th className="py-2.5 px-3.5">Helper Type</th>
                        <th className="py-2.5 px-3.5">TypeScript Signature</th>
                        <th className="py-2.5 px-3.5">Purpose</th>
                        <th className="py-2.5 px-3.5 text-right">API Ref</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          PageProps&lt;T&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ params: RouteParams<T>, searchParams: ... }`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Type signature for <code>page.tsx</code> default export component.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#pageprops" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          LayoutProps&lt;T&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ children: React.ReactNode, params: RouteParams<T> }`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Type signature for <code>layout.tsx</code> default export component.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#layoutprops" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          ErrorProps&lt;T&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`{ error: Error, params: RouteParams<T> }`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Type signature for <code>error.tsx</code> page component.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#errorprops" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          RouteParams&lt;T&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          Extracted parameter dictionary based on string literal pattern
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Typed params argument for <code>getProps</code>, <code>getCacheTags</code>, or <code>validateParams</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#routeparams" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          DinouRoute
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          Union of concrete path strings: <code>"/about" | "/contact" | ...</code>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Level 1 type safety: powers IDE autocomplete &amp; link validation for <code>&lt;Link href="..."&gt;</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#dinouroute" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          DinouRoutePattern
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          Union of parameterized patterns: <code>"/blog/[slug]" | ...</code>
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Level 2 type safety: generic constraint for route contract functions and props.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#dinouroutepattern" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
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
                          Cache TTL in seconds. <code>0</code> = SSR (dynamic), <code>&gt;= 1</code> = ISR, <code>false</code> = Static SSG.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidate" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
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
                          false
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Enables Partial Prerendering: static shell built at build time, dynamic holes stream via React Suspense.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#ppr" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          getCacheTags(params)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (params) =&gt; string[] | Promise&lt;string[]&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          []
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Associates cache tags with the route for targeted on-demand invalidation via <code>revalidateTag(tag)</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#getcachetags" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          getStaticPaths()
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          () =&gt; StaticPathItem[] | Promise&lt;...&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          []
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Pre-generates dynamic parameter combinations during build time for SSG rendering.
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
                          true
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          When <code>true</code>, ungenerated paths render on-demand on first visit. When <code>false</code>, ungenerated paths return 404.
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
                          (params) =&gt; boolean | Promise&lt;boolean&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          () =&gt; true
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Route parameter gatekeeper. Returning <code>false</code> immediately terminates with a 404 before calling <code>getProps</code>.
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
                          Evaluated fresh on every HTTP request. Never cached in static storage.
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
                          Served from cache for N seconds. Next visit serves stale cache and triggers background re-generation.
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
                          Prerendered at build time and cached indefinitely until purged via on-demand invalidation.
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
                          {`href, fresh?, prefetch?, replace?, target?`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          SPA navigation component. Prevents full reloads. Set <code>fresh</code> to bypass client cache.
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
                          {`to: string, replace?: boolean`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Declarative redirect rendered inside component tree during render phase.
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
                          (path: string, status?: number) =&gt; never
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          HTTP 307 on server (pre-header flush) or SPA client replace if streaming/client.
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
                          Imperative programmatic navigation, page refreshes, and slot updates.
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
                          string (e.g. <code>"/dashboard"</code>)
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Active navigation highlights, breadcrumbs, and layout route branching.
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
                          ReadonlyURLSearchParams (<code>.get()</code>, <code>.has()</code>)
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Reading query strings (<code>?q=react&amp;sort=asc</code>) in Server or Client components.
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
                          Global top loading bar or spinner indicators during pending transitions.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#usenavigationloading" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          refreshSlot(slotId)
                        </td>
                        <td className="py-2.5 px-3.5">
                          <span className="inline-flex items-center rounded px-1.5 py-0.5 text-[10px] font-medium bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20">
                            Client
                          </span>
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (slotId: string) =&gt; Promise&lt;void&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Re-fetches a specific <code>&lt;DinouCacheSlot&gt;</code> without refreshing the rest of the page.
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
                <h3>getContext &amp; DinouCacheSlot</h3>
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
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          () =&gt; ServerContext | null
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Synchronous HTTP access via AsyncLocalStorage: <code>req.cookies</code>, <code>req.headers</code>, <code>res.cookie()</code>, <code>res.setHeader()</code>.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#getcontext" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          &lt;DinouCacheSlot&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou/server</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          {`id, revalidate?, tag?, tags?`}
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Micro-ISR server component. Caches an independent sub-tree without re-evaluating parent layouts or siblings.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#dinoucacheslot" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          defineConfig(config)
                        </td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">dinou</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (config: DinouConfig) =&gt; DinouConfig
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Type helper for <code>dinou.config.js</code> (reactStrictMode, ppr, storage, plugins).
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#defineconfig" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
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
                          MemoryStorage, RedisStorage
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          ISR storage engines for single server or distributed multi-instance clusters.
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
                          revalidateTag(tag)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Tags (Pages &amp; Slots)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (tag: string) =&gt; Promise&lt;void&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Purges all pages and <code>&lt;DinouCacheSlot&gt;</code> components tagged with the identifier across the cluster.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidatetag" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          revalidatePath(path)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Exact Route Path</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (path: string) =&gt; Promise&lt;void&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Purges the cached HTML and data for a specific pathname and triggers background re-generation.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidatepath" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
                            Docs <ExternalLink className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          revalidatePage(pattern)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Route Pattern</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">
                          (pattern: string) =&gt; Promise&lt;void&gt;
                        </td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Purges all compiled cache instances matching a route pattern or page component.
                        </td>
                        <td className="py-2.5 px-3.5 text-right">
                          <Link href="/docs/api-reference#revalidatepage" className="text-primary hover:underline inline-flex items-center gap-1 font-medium">
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
            {/* SECTION 6: DECISION MATRIX */}
            {/* ================================================================= */}
            <section id="decision-matrix" className="scroll-mt-20 mt-12 pt-8 border-t border-border">
              <h2 className="flex items-center gap-3">
                6. Decision Matrix: When to Use What
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
                          revalidateTag(tag)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server (Action / Webhook / API)</td>
                        <td className="py-2.5 px-3.5">Multi-page &amp; multi-slot cluster</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Recommended for shared data models:</strong> when updating a database record (e.g., product or article) that appears across lists, detail pages, and sidebar widgets.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          revalidatePath(path)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server (Action / Webhook / API)</td>
                        <td className="py-2.5 px-3.5">Single static route path</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          When you know the exact URL that changed and want to purge its HTML/JSON (e.g. <code>"/pricing"</code> or <code>"/about"</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-sky-600 dark:text-sky-400">
                          refreshSlot(slotId)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Client Component (Browser)</td>
                        <td className="py-2.5 px-3.5">Single targeted slot on current page</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Zero layout re-render:</strong> when an interactive client widget updates (e.g. cart badge counter or mini ticker) without touching the rest of the page.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-sky-600 dark:text-sky-400">
                          router.refresh()
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Client Component (Browser)</td>
                        <td className="py-2.5 px-3.5">Entire active page</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          When a client action needs fresh server props for the whole page without losing client state or scrolling to top.
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
                          redirect(path) in getProps
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server (page_functions.ts)</td>
                        <td className="py-2.5 px-3.5">Real HTTP 307 Response</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          <strong>Fastest &amp; cleanest:</strong> Auth guards, permission checks, or missing data redirects executed before any HTML or component rendering begins.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-violet-600 dark:text-violet-400">
                          redirect(path) in Component
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5">HTTP 307 if headers unsent; SPA navigation if stream started</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          When redirection criteria depend on intermediate component tree logic.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-sky-600 dark:text-sky-400">
                          &lt;ClientRedirect to="..." /&gt;
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Client Component (JSX render)</td>
                        <td className="py-2.5 px-3.5">Client-side router push/replace</td>
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
                          Post-submission redirect where clicking browser "Back" should not re-submit the action (e.g. login form, payment checkout).
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
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`RouteParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Shared navigation headers, dynamic breadcrumbs, or sidebars that wrap child segments for that parameter.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                          params in getProps(params)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Server Only (page_functions.ts)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`RouteParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Fetching database records or querying external APIs based on dynamic route IDs before rendering.
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          params in not_found.tsx (PageProps)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`RouteParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Scoped 404 views displaying the missing item ID (e.g. <code>Item "{`{params.slug}`}" not found</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-3.5 font-mono font-semibold text-primary">
                          params in error.tsx (ErrorProps)
                        </td>
                        <td className="py-2.5 px-3.5 font-medium">Universal (Server or Client)</td>
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">{`RouteParams<Pattern>`}</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Scoped 500 error pages showing diagnostic context or retry options for that specific resource.
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
                        <td className="py-2.5 px-3.5 font-mono text-muted-foreground">ReadonlyURLSearchParams</td>
                        <td className="py-2.5 px-3.5 text-muted-foreground">
                          Reading query string parameters (filters, pagination, search keywords) in either server or client components.
                        </td>
                      </tr>
                    </tbody>
                  </table>
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
