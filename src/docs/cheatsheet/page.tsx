"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  FileCode,
  FileText,
  Layers,
  RefreshCw,
  Zap,
  Settings,
  FolderTree,
  AlertCircle,
  CheckCircle2,
  XCircle,
  File,
  ShieldCheck,
  Compass,
  Database,
  Sliders,
  Sparkles,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "file-conventions", title: "1. File Conventions Cheatsheet", level: 2 },
  { id: "route-components", title: "Route Components & Lifecycles", level: 3 },
  { id: "layout-flags", title: "Layout Control Flags (Empty Files)", level: 3 },
  { id: "route-escaping", title: "Route Escaping (_prefix)", level: 3 },
  { id: "route-contracts", title: "2. Route Contracts (page_functions)", level: 2 },
  { id: "getprops-ref", title: "getProps(params)", level: 3 },
  { id: "revalidate-ref", title: "revalidate (seconds)", level: 3 },
  { id: "ppr-ref", title: "ppr (Partial Prerendering)", level: 3 },
  { id: "getstaticpaths-ref", title: "getStaticPaths()", level: 3 },
  { id: "getcachetags-ref", title: "getCacheTags(params)", level: 3 },
  { id: "validateparams-ref", title: "validateParams(params)", level: 3 },
  { id: "allowisg-ref", title: "allowISG()", level: 3 },
  { id: "hooks-navigation", title: "3. Navigation & Hooks Cheatsheet", level: 2 },
  { id: "link-ref", title: "<Link> & redirect()", level: 3 },
  { id: "router-ref", title: "useRouter() & refreshSlot()", level: 3 },
  { id: "location-hooks", title: "usePathname() & useSearchParams()", level: 3 },
  { id: "type-safe-ref", title: "Type-Safe Routing (Level 1 & 2)", level: 3 },
  { id: "server-api-cheatsheet", title: "4. Server & Cache Cheatsheet", level: 2 },
  { id: "getcontext-ref", title: "getContext() (req/res)", level: 3 },
  { id: "cacheslot-ref", title: "<DinouCacheSlot> (Micro-ISR)", level: 3 },
  { id: "revalidation-ref", title: "revalidatePath & revalidateTag", level: 3 },
  { id: "config-ref", title: "dinou.config.mjs & defineConfig", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                ⚡ Dinou v7 Complete Cheatsheet
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              High-density reference for file conventions, route contracts, client navigation hooks,
              server context, and micro-ISR cache primitives in Dinou v7.
            </p>
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
                Dinou maps directories inside <code>src/app/</code> directly to URL routes, using standardized filenames for UI components and server lifecycle contracts.
              </p>

              <section id="route-components" className="scroll-mt-20">
                <h3>Route Components &amp; Lifecycles</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Filename</th>
                        <th className="p-4">Role</th>
                        <th className="p-4">Environment</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">
                          page.{`{jsx,tsx,js,ts}`}
                        </td>
                        <td className="p-4 text-xs font-medium">Page UI</td>
                        <td className="p-4 text-xs">Server or Client</td>
                        <td className="p-4 text-xs">
                          The unique leaf UI component rendered for this route segment.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">
                          layout.{`{jsx,tsx,js,ts}`}
                        </td>
                        <td className="p-4 text-xs font-medium">Layout UI</td>
                        <td className="p-4 text-xs">Server or Client</td>
                        <td className="p-4 text-xs">
                          Shared shell wrapping this segment and all descendant child pages. Preserves state across navigations.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">
                          page_functions.{`{ts,js}`}
                        </td>
                        <td className="p-4 text-xs font-medium">Page Lifecycle</td>
                        <td className="p-4 text-xs font-semibold text-green-600 dark:text-green-400">Server Only</td>
                        <td className="p-4 text-xs">
                          Decoupled server contract for <code>page.tsx</code> (<code>getProps</code>, <code>revalidate</code>, <code>ppr</code>, <code>getStaticPaths</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">
                          layout_functions.{`{ts,js}`}
                        </td>
                        <td className="p-4 text-xs font-medium">Layout Lifecycle</td>
                        <td className="p-4 text-xs font-semibold text-green-600 dark:text-green-400">Server Only</td>
                        <td className="p-4 text-xs">
                          Decoupled server contract for <code>layout.tsx</code> (independent <code>getProps</code>, <code>ppr</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">
                          error.{`{jsx,tsx,js,ts}`}
                        </td>
                        <td className="p-4 text-xs font-medium">Error Boundary</td>
                        <td className="p-4 text-xs">Server or Client</td>
                        <td className="p-4 text-xs">
                          UI rendered when an unhandled 500 error occurs within this route segment.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">
                          not_found.{`{jsx,tsx,js,ts}`}
                        </td>
                        <td className="p-4 text-xs font-medium">404 Handler</td>
                        <td className="p-4 text-xs">Server or Client</td>
                        <td className="p-4 text-xs">
                          UI rendered when a route does not exist or when <code>validateParams</code> returns <code>false</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <FolderTree className="h-5 w-5 text-purple-500" />
                    <span>Hierarchical Resolution</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Dinou traverses upward to the nearest matching error or 404 handler. A localized <code>src/app/blog/[slug]/not_found.tsx</code> takes precedence over the root <code>src/app/not_found.tsx</code>.
                  </p>
                </div>
              </section>

              <section id="layout-flags" className="scroll-mt-20 mt-8">
                <h3>Layout Control Flags (Empty Files)</h3>
                <p>
                  Create these <strong>empty files</strong> (no extension) in a route folder to modify the layout inheritance hierarchy without writing imperative wrappers:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Flag File</th>
                        <th className="p-4">Applies To</th>
                        <th className="p-4">Effect</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">no_layout</td>
                        <td className="p-4 font-mono text-xs">page.tsx</td>
                        <td className="p-4 text-xs">
                          Renders the page completely bare, bypassing all parent layouts. Ideal for print views, popups, or standalone embeds.
                        </td>
                      </tr>
                      <tr className="bg-amber-50/50 dark:bg-amber-900/10">
                        <td className="p-4 font-mono text-xs font-semibold text-primary">reset_layout</td>
                        <td className="p-4 font-mono text-xs">layout.tsx</td>
                        <td className="p-4 text-xs">
                          <strong>Resets the layout stack.</strong> Discards all higher-level parent layouts; this folder's <code>layout.tsx</code> becomes the new isolated Root Layout.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">no_layout_error</td>
                        <td className="p-4 font-mono text-xs">error.tsx</td>
                        <td className="p-4 text-xs">
                          Renders the segment's 500 error boundary without any surrounding layout shells.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">no_layout_not_found</td>
                        <td className="p-4 font-mono text-xs">not_found.tsx</td>
                        <td className="p-4 text-xs">
                          Renders the segment's 404 handler without any surrounding layout shells.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="route-escaping" className="scroll-mt-20 mt-8">
                <h3>Route Escaping (<code>_prefix</code>)</h3>
                <p>
                  Any directory prefixed with an underscore (<code>_folder</code>) is completely ignored by the Dinou route scanner.
                </p>
                <Alert className="not-prose mt-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                  <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-800 dark:text-amber-300">
                    Important: When to use Underscore Folders
                  </AlertTitle>
                  <AlertDescription className="text-amber-800 dark:text-amber-300 text-xs space-y-2 mt-1">
                    <p>
                      In Dinou, normal project directories like <code>components/</code>, <code>hooks/</code>, <code>utils/</code>, or <code>services/</code> do <strong>NOT</strong> require an underscore prefix. They never generate routes unless they explicitly contain a <code>page.{`{jsx,tsx}`}</code> file.
                    </p>
                    <p>
                      The <strong>only purpose</strong> of the <code>_</code> prefix is to escape legacy, backup, or archived code folders that already contain a <code>page.jsx</code>/<code>page.tsx</code> file that you do not want Dinou to register in the application routing table (e.g. <code>src/app/_archived-v1/page.tsx</code>).
                    </p>
                  </AlertDescription>
                </Alert>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 2: ROUTE CONTRACTS */}
            {/* ================================================================= */}
            <section id="route-contracts" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                2. Route Contracts (<code>page_functions</code>)
                <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">
                  Server Lifecycles
                </span>
              </h2>
              <p>
                Server-side contracts exported from <code>page_functions.ts</code> (or <code>layout_functions.ts</code>). Fully decoupled from React components.
              </p>

              <section id="getprops-ref" className="scroll-mt-20">
                <h3>
                  <code>getProps(params): Promise&lt;TProps&gt; | TProps</code>
                </h3>
                <p>
                  Server-side loader that fetches data and delivers props directly to the corresponding component.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/app/products/[id]/page_functions.ts
export async function getProps(params: { id: string }) {
  const product = await db.products.findById(params.id);
  // Directly returned object becomes props for page.tsx!
  return { product };
}`}
                </CodeBlock>
              </section>

              <section id="revalidate-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>revalidate</code> (Caching Strategy in Seconds)
                </h3>
                <p>
                  The single source of truth for segment caching modes. Specified in <strong>seconds</strong> as a number, <code>false</code>, or a function.
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Value</th>
                        <th className="p-4">Rendering Mode</th>
                        <th className="p-4">Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary"><code>0</code> (or &lt; 1)</td>
                        <td className="p-4 font-semibold text-xs text-blue-600 dark:text-blue-400">Dynamic SSR</td>
                        <td className="p-4 text-xs">
                          Re-rendered dynamically on every single HTTP request. Bypasses static cache entirely.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary"><code>&gt;= 1</code> (e.g. <code>60</code>)</td>
                        <td className="p-4 font-semibold text-xs text-green-600 dark:text-green-400">ISR (Incremental Static Regeneration)</td>
                        <td className="p-4 text-xs">
                          Cached for N seconds. The next request after expiration serves stale content and triggers background regeneration.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary"><code>false</code> (or omitted)</td>
                        <td className="p-4 font-semibold text-xs text-purple-600 dark:text-purple-400">Static (SSG)</td>
                        <td className="p-4 text-xs">
                          Pre-rendered at build time and cached indefinitely until purged via <code>revalidatePath</code> or <code>revalidateTag</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// Static SSG (cached indefinitely)
export const revalidate = false;

// Dynamic SSR (every request)
export const revalidate = 0;

// ISR (regenerate after 60 seconds)
export const revalidate = 60;

// Dynamic calculation based on time or environment
export function revalidate() {
  return process.env.NODE_ENV === "development" ? 0 : 3600;
}`}
                </CodeBlock>
              </section>

              <section id="ppr-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>ppr: boolean | (() =&gt; boolean | Promise&lt;boolean&gt;)</code>
                </h3>
                <p>
                  Enables <strong>Partial Prerendering (PPR)</strong>. Pre-renders the static HTML shell at build time while streaming dynamic Suspense holes concurrently.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/app/dashboard/page_functions.ts
export const ppr = true; // Enables PPR for this page`}
                </CodeBlock>
              </section>

              <section id="getstaticpaths-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>getStaticPaths: StaticPathItem[] | (() =&gt; StaticPathsResult)</code>
                </h3>
                <p>
                  Defines the parameter paths for dynamic routes to be pre-rendered during build time (SSG). Supports strings, numbers, catch-all arrays, or parameter objects.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// 1. Single param ([slug])
export const getStaticPaths = ["announcing-v7", "getting-started"];

// 2. Catch-all param ([...slug])
export const getStaticPaths = [["docs", "intro"], ["docs", "routing"]];

// 3. Multi-param objects ([category]/[id])
export const getStaticPaths = [
  { category: "books", id: "42" },
  { category: "tech", id: "99" },
];

// 4. Async database loader
export async function getStaticPaths() {
  const posts = await db.posts.findMany();
  return posts.map(p => ({ slug: p.slug }));
}`}
                </CodeBlock>
              </section>

              <section id="getcachetags-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>getCacheTags(params): string[] | Promise&lt;string[]&gt;</code>
                </h3>
                <p>
                  Associates cache tags with the route segment for on-demand invalidation via <code>revalidateTag(tag)</code>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`export function getCacheTags(params: { id: string }) {
  return ["catalog", \`product-\${params.id}\`];
}`}
                </CodeBlock>
              </section>

              <section id="validateparams-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>validateParams(params): boolean | Promise&lt;boolean&gt;</code>
                </h3>
                <p>
                  Parameter boundary guard. Returning <code>false</code> aborts the request immediately with a 404 response before executing <code>getProps</code> or rendering components.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`export function validateParams(params: { id: string }) {
  return /^[0-9]+$/.test(params.id); // Only numbers permitted
}`}
                </CodeBlock>
              </section>

              <section id="allowisg-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>allowISG: boolean | (() =&gt; boolean | Promise&lt;boolean&gt;)</code>
                </h3>
                <p>
                  Controls whether dynamic route parameters not generated at build time can be generated on-demand by the first visitor. Defaults to <code>true</code>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// Only paths defined in getStaticPaths exist; all others return 404
export const allowISG = false;`}
                </CodeBlock>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 3: NAVIGATION & HOOKS */}
            {/* ================================================================= */}
            <section id="hooks-navigation" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                3. Navigation &amp; Hooks Cheatsheet (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  Client &amp; Universal
                </span>
              </h2>

              <section id="link-ref" className="scroll-mt-20">
                <h3>
                  <code>&lt;Link&gt;</code> &amp; <code>redirect()</code>
                </h3>
                <p>
                  Soft client navigation and universal server/client redirections.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { Link, redirect } from "dinou";

// Declarative Link with prefetch & cache bypass
<Link href="/dashboard" fresh prefetch={true}>
  Go to Dashboard
</Link>

// Universal Redirect (HTTP 307 if headers unsent, SPA replace if streaming/client)
export default async function Page() {
  if (!isAuthenticated()) {
    return redirect("/login");
  }
  return <div>Welcome!</div>;
}`}
                </CodeBlock>
              </section>

              <section id="router-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>useRouter()</code> &amp; <code>refreshSlot()</code>
                </h3>
                <p>
                  Imperative client-side router controls and targeted micro-slot updates.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";
import { useRouter, refreshSlot } from "dinou";

export default function Controls() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/orders")}>Push</button>
      <button onClick={() => router.replace("/orders")}>Replace</button>
      <button onClick={() => router.push("/live", { fresh: true })}>Fresh Fetch</button>
      <button onClick={() => router.refresh()}>Soft Refresh Page</button>
      <button onClick={() => router.refreshSlot("user-cart")}>Refresh Cart Slot</button>
      
      {/* Standalone refreshSlot can also be called without useRouter */}
      <button onClick={() => refreshSlot("stock-ticker")}>Update Ticker</button>
    </div>
  );
}`}
                </CodeBlock>
              </section>

              <section id="location-hooks" className="scroll-mt-20 mt-8">
                <h3>
                  <code>usePathname()</code> &amp; <code>useSearchParams()</code>
                </h3>
                <p>
                  Client hooks for reading route paths and URL query string parameters.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";
import { usePathname, useSearchParams, useNavigationLoading } from "dinou";

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isLoading = useNavigationLoading();

  const query = searchParams.get("q");

  return (
    <nav>
      {isLoading && <div className="loading-bar" />}
      <span>Current Path: {pathname}</span>
      <span>Search Query: {query}</span>
    </nav>
  );
}`}
                </CodeBlock>
              </section>

              <section id="type-safe-ref" className="scroll-mt-20 mt-8">
                <h3>
                  Type-Safe Routing (Level 1 &amp; Level 2)
                </h3>
                <p>
                  Zero-runtime type safety with auto-generated declaration files and IDE autocomplete.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import type { PageProps, LayoutProps, RouteParams, DinouRoute } from "dinou";
import { Link, useRouter } from "dinou";

// 1. Level 2: Typed Page Component
export default function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  return <h1>Post: {params.slug}</h1>; // params.slug is strongly typed string
}

// 2. Level 2: Typed Layout Component
export function BlogLayout({ children, params }: LayoutProps<"/blog/[slug]">) {
  return <section><header>{params.slug}</header>{children}</section>;
}

// 3. Level 2: Typed Server Function
export async function getProps(params: RouteParams<"/blog/[slug]">) {
  return { title: \`Post \${params.slug}\` };
}

// 4. Level 1: Typed Navigation (<Link> and useRouter)
export function NavBar() {
  const router = useRouter();
  return (
    <nav>
      {/* ✅ Autocompleted in IDE & dead links caught at compile-time */}
      <Link href="/about">About</Link>
      <Link href={\`/blog/\${post.slug}\`}>Post</Link>
      <button onClick={() => router.push("/dashboard")}>Dashboard</button>
    </nav>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 4: SERVER & CACHE */}
            {/* ================================================================= */}
            <section id="server-api-cheatsheet" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                4. Server &amp; Cache Cheatsheet
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  dinou &amp; dinou/server
                </span>
              </h2>

              <section id="getcontext-ref" className="scroll-mt-20">
                <h3>
                  <code>getContext()</code> (Request &amp; Response Context)
                </h3>
                <p>
                  Synchronous access to HTTP request and response proxy via <code>AsyncLocalStorage</code>. Usable inside Server Components, Server Functions (<code>"use server"</code>), and <code>page_functions</code>.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { getContext } from "dinou";

export default async function ProfilePage() {
  const ctx = getContext();
  if (!ctx) return null;

  // Read request parameters
  const token = ctx.req.cookies.session_id;
  const userAgent = ctx.req.headers["user-agent"];
  const query = ctx.req.query;
  const path = ctx.req.path;

  // Set response headers / cookies
  ctx.res.setHeader("X-Custom-Header", "Dinou-v7");
  ctx.res.cookie("visited", "true", { httpOnly: true });

  return <div>Welcome User!</div>;
}`}
                </CodeBlock>
              </section>

              <section id="cacheslot-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>&lt;DinouCacheSlot&gt;</code> (Micro-ISR Component)
                </h3>
                <p>
                  Caches and invalidates independent sub-trees within a page without re-evaluating parent layouts or sibling components.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { DinouCacheSlot } from "dinou/server";
import { SidebarTrending } from "./trending";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <main>{children}</main>

      {/* Cached for 60 seconds; invalidatable via tag or slot ID */}
      <DinouCacheSlot id="trending-feed" revalidate={60} tag="trending">
        <SidebarTrending />
      </DinouCacheSlot>
    </div>
  );
}`}
                </CodeBlock>
              </section>

              <section id="revalidation-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>revalidatePath</code> &amp; <code>revalidateTag</code>
                </h3>
                <p>
                  On-demand cache purging primitives imported from <code>"dinou/server"</code>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { revalidatePath, revalidateTag } from "dinou/server";

// Purge a specific path (and schedule background regeneration)
await revalidatePath("/products/electronics");

// Purge all pages and <DinouCacheSlot> components tagged with "catalog"
await revalidateTag("catalog");`}
                </CodeBlock>
              </section>

              <section id="config-ref" className="scroll-mt-20 mt-8">
                <h3>
                  <code>dinou.config.mjs</code> &amp; <code>defineConfig</code>
                </h3>
                <p>
                  Root configuration file for compiler options, StrictMode, global PPR, and storage engines.
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { defineConfig } from "dinou";
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

export default defineConfig({
  // React 19 StrictMode in dev (defaults to true in v7)
  reactStrictMode: true,

  // Global Partial Prerendering default
  ppr: false,

  // Pluggable distributed ISR cache adapter
  storage: new RedisStorage(new Redis(process.env.REDIS_URL)),

  // Universal Web Standards request plugins
  plugins: [
    {
      name: "auth-guard",
      async onRequest(request, context) {
        if (request.url.includes("/admin") && !context.req.cookies.admin_token) {
          return new Response(null, { status: 302, headers: { Location: "/login" } });
        }
      },
    },
  ],
});`}
                </CodeBlock>
              </section>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
