"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  FileCode,
  FolderTree,
  Layers,
  RefreshCw,
  Zap,
  Cpu,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Settings,
  Database,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "page-configuration",
    title: "Page Configuration (page_functions.ts)",
    level: 2,
  },
  {
    id: "getprops",
    title: "1. getProps (Static/Layout Data Injection)",
    level: 3,
  },
  {
    id: "getstaticpaths",
    title: "2. getStaticPaths (Static Generation)",
    level: 3,
  },
  { id: "return-formats", title: "Return Format", level: 4 },
  { id: "simple-routes", title: "Simple Dynamic Routes", level: 4 },
  { id: "catch-all-routes", title: "Catch-all Routes", level: 4 },
  {
    id: "route-propagation",
    title: "Automatic Route Propagation (Recursion)",
    level: 4,
  },
  {
    id: "chain-of-responsibility",
    title: "Nested Pages & The 'Chain of Responsibility'",
    level: 4,
  },
  {
    id: "nested-complex-routes",
    title: "Nested & Complex Routes (Pass-through Segments)",
    level: 4,
  },
  { id: "normalization-guarantee", title: "Normalization Guarantee", level: 4 },
  { id: "async-support", title: "Async Support", level: 4 },
  { id: "revalidate", title: "3. revalidate (ISR)", level: 3 },
  { id: "dynamic", title: "4. dynamic (Force SSR)", level: 3 },
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
                Page Functions (<code>page_functions.ts</code>)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              For advanced control over rendering behavior, data fetching, and
              static generation, you can create a <code>page_functions.ts</code>{" "}
              (or <code>.js</code>) file next to your <code>page.tsx</code>.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="getprops">
              <h3>
                1. <code>getProps</code> (Static/Layout Data Injection)
              </h3>
              <p>
                Use this function to fetch data based on the{" "}
                <strong>route parameters</strong> and inject it into your Page
                and Root Layout.
              </p>

              <Alert className="not-prose mt-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Design Note</AlertTitle>
                <AlertDescription>
                  <code>getProps</code> only receives <code>params</code>. To
                  use request-specific data like <code>searchParams</code> or{" "}
                  <code>cookies</code>, fetch data directly inside your
                  components using <code>Suspense</code> and Server Functions to
                  avoid blocking the initial HTML render.
                </AlertDescription>
              </Alert>

              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <FileCode className="h-5 w-5 text-blue-500" />
                  <span>Function Signature</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    <strong>Arguments:</strong> <code>{"{ params }"}</code> (The
                    dynamic route parameters)
                  </li>
                  <li>
                    <strong>Returns:</strong> An object with <code>page</code>{" "}
                    and <code>layout</code> keys containing the props
                  </li>
                </ul>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
                {`// src/blog/[slug]/page_functions.ts

export async function getProps({ params }) {
  // 1. Fetch data based on the URL path (e.g., /blog/my-post)
  const post = await db.getPost(params.slug);

  // 2. Return data.
  // 'page' props go to page.jsx
  // 'layout' props go to layout.jsx (Root Layout)
  return {
    page: { post },
    layout: { title: post.title },
  };
}`}
              </CodeBlock>
            </section>

            <section id="getstaticpaths">
              <h3>
                2. <code>getStaticPaths</code> (Static Generation)
              </h3>
              <p>
                Defines which dynamic paths should be pre-rendered at server
                start (SSG).
              </p>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Zap className="h-5 w-5 text-amber-500" />
                  <span>ISG (Incremental Static Generation)</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Paths not returned here will be generated on-demand when
                  requested for the first time.
                </p>
              </div>

              <section id="return-formats">
                <h4>Return Format</h4>
                <p>
                  Dinou is flexible with the return format depending on the
                  complexity of your route:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Route Type</th>
                        <th className="p-4">Best Format</th>
                        <th className="p-4">Example Return</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Simple</strong> (<code>[id]</code>)
                        </td>
                        <td className="p-4 font-mono text-xs">
                          Array&lt;string&gt;
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>["1", "2"]</code>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Catch-all</strong> (<code>[...slug]</code>)
                        </td>
                        <td className="p-4 font-mono text-xs">
                          Array&lt;Array&lt;string&gt;&gt;
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>
                            [[&quot;a&quot;, &quot;b&quot;], [&quot;c&quot;]]
                          </code>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          <strong>Nested / Complex</strong>
                        </td>
                        <td className="p-4 font-mono text-xs">
                          Array&lt;Object&gt;
                        </td>
                        <td className="p-4 font-mono text-xs">
                          <code>
                            [{"{"}
                            &quot;id&quot;: &quot;1&quot;, &quot;category&quot;:
                            &quot;tech&quot;
                            {"}"}]
                          </code>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="simple-routes">
                <h4>Simple Dynamic Routes</h4>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/blog/[id]/page_functions.ts
export function getStaticPaths() {
  return ["1", "2", "hello"];
  // Generates: /blog/1, /blog/2, /blog/hello
}`}
                </CodeBlock>
              </section>

              <section id="catch-all-routes">
                <h4>Catch-all Routes</h4>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/docs/[...slug]/page_functions.ts
export function getStaticPaths() {
  return [
    ["intro"], // /docs/intro
    ["api", "v1", "auth"], // /docs/api/v1/auth
  ];
}`}
                </CodeBlock>
              </section>

              <section id="route-propagation">
                <h4>Automatic Route Propagation (Recursion)</h4>
                <p>
                  One of Dinou's most powerful features is that{" "}
                  <strong>static parameters propagate downwards</strong>. If you
                  define values for a segment, Dinou will automatically generate
                  all static sub-pages nested within that segment.
                </p>

                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <FolderTree className="h-5 w-5 text-green-500" />
                    <span>Example Structure</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="font-mono">
                      - <code>src/blog/[slug]/page.tsx</code> (+{" "}
                      <code>page_functions.ts</code>)
                    </div>
                    <div className="font-mono">
                      - <code>src/blog/[slug]/details/page.tsx</code> (Nested
                      static page)
                    </div>
                    <p className="mt-2">
                      If <code>getStaticPaths</code> in <code>blog/[slug]</code>{" "}
                      returns{" "}
                      <code>[&quot;post-a&quot;, &quot;post-b&quot;]</code>,
                      Dinou generates <strong>4 pages</strong>:
                    </p>
                    <ol className="list-decimal pl-4 space-y-1">
                      <li>
                        <code>/blog/post-a</code>
                      </li>
                      <li>
                        <code>/blog/post-a/details</code>
                      </li>
                      <li>
                        <code>/blog/post-b</code>
                      </li>
                      <li>
                        <code>/blog/post-b/details</code>
                      </li>
                    </ol>
                  </div>
                </div>
              </section>

              <section id="chain-of-responsibility">
                <h4>Nested Pages & The &quot;Chain of Responsibility&quot;</h4>
                <p>
                  When nesting routes,{" "}
                  <strong>dependency flows downwards</strong>. If an
                  intermediate segment (whether static or dynamic) contains a
                  <code>page.tsx</code>, it becomes a required step in the
                  generation chain.
                </p>
                <p>
                  If a parent page fails to define its own paths (e.g., returns
                  an empty array), <strong>the generator stops there</strong>.
                  It will never reach the child pages, regardless of whether the
                  children have valid <code>getStaticPaths</code> defined.
                </p>

                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Layers className="h-5 w-5 text-blue-500" />
                    <span>Scenario</span>
                  </div>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <div className="font-mono break-words">
                      - <code>src/case3/[slug]/page.tsx</code> (Parent Page)
                    </div>
                    <div className="font-mono break-words">
                      - <code>src/case3/[slug]/[id]/page.tsx</code> (Child Page)
                    </div>
                    <p>
                      In this structure, <code>[id]</code> depends physically on{" "}
                      <code>[slug]</code> existing first.
                    </p>
                  </div>
                </div>

                {/* Grid con scroll horizontal en móvil */}
                <div className="flex flex-col md:grid md:grid-cols-2 md:gap-6 not-prose my-6">
                  {/* Primera tarjeta - Broken Chain */}
                  <div className="w-full mb-6 md:mb-0">
                    <Card className="border-red-500/20 bg-red-50/50 dark:bg-red-900/10 h-full">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                          <XCircle className="h-5 w-5 flex-shrink-0" />
                          <span className="break-words">❌ Broken Chain</span>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="break-words">
                          If <code>src/case3/[slug]/page_functions.ts</code>{" "}
                          returns <code>[]</code> (no paths):
                        </p>

                        <ol className="list-decimal pl-4 mt-2 space-y-1 break-words">
                          <li>
                            Dinou tries to build <code>/case3/[slug]</code>.
                          </li>
                          <li>
                            No paths are returned. No folders are created.
                          </li>
                          <li>
                            <strong>Result:</strong> The build process never
                            attempts to generate <code>[id]</code>.
                          </li>
                        </ol>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Segunda tarjeta - Functional Chain */}
                  <div className="w-full">
                    <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10 h-full">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                          <span className="break-words">
                            ✅ Functional Chain
                          </span>
                        </div>
                      </CardHeader>
                      <CardContent className="text-sm">
                        <p className="break-words">
                          The parent must resolve its own level for the children
                          to run:
                        </p>

                        <div className="mt-2 overflow-x-auto">
                          <div className="min-w-[280px]">
                            {" "}
                            {/* Ancho mínimo para el código */}
                            <CodeBlock
                              language="typescript"
                              containerClassName="w-full overflow-hidden rounded-lg text-xs"
                              hideHeader
                            >
                              {`// src/case3/[slug]/page_functions.ts
export function getStaticPaths() {
  // 1. Defines the parent folders
  return ["foo", "bar"];
}

// src/case3/[slug]/[id]/page_functions.ts
export function getStaticPaths() {
  // 2. Now runs inside /case3/foo/ and /case3/bar/
  return ["100", "200"];
}`}
                            </CodeBlock>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <Alert className="not-prose">
                  <ArrowRight className="h-4 w-4" />
                  <AlertTitle>Rule of Thumb</AlertTitle>
                  <AlertDescription className="break-words">
                    Every <code>page.tsx</code> in the hierarchy is responsible
                    for &quot;opening the door&quot; to its children.
                  </AlertDescription>
                </Alert>
              </section>

              <section id="nested-complex-routes">
                <h4>Nested & Complex Routes (Pass-through Segments)</h4>
                <p>
                  When you have multiple dynamic segments in a path{" "}
                  <strong>without intermediate pages</strong>, you must return
                  an <strong>Object</strong> to map values to all parameter
                  names involved.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// Structure: src/shop/[category]/[...specs]/[[brand]]/page_functions.ts
// (Assuming [category] and [...specs] do NOT have their own page.tsx)

export function getStaticPaths() {
  return [
    {
      category: "electronics",
      specs: ["m3", "16gb"],
      brand: "apple",
    },
    {
      category: "clothing",
      specs: ["cotton", "white"],
      brand: undefined, // Valid: optional and at the end of the route
    },
  ];
}`}
                </CodeBlock>
                <Alert className="not-prose mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Reminder: No-Gap Rule</AlertTitle>
                  <AlertDescription>
                    According to the <strong>No-Gap Rule</strong>, you can use{" "}
                    <code>undefined</code> for an intermediate optional segment{" "}
                    <strong>
                      only if all subsequent segments are also{" "}
                      <code>undefined</code>
                    </strong>
                    . You cannot leave a &quot;gap&quot; (an undefined segment
                    followed by a defined one).
                  </AlertDescription>
                </Alert>
              </section>

              <section id="normalization-guarantee">
                <h4>Normalization Guarantee</h4>
                <p>
                  Dinou ensures that <code>params</code> are consistent between
                  SSG and SSR:
                </p>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Cpu className="h-5 w-5 text-blue-500" />
                        <span>Catch-all Segments</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Will always be an <code>Array</code> (e.g.,{" "}
                      <code>undefined</code> becomes <code>[]</code>,{" "}
                      <code>&quot;val&quot;</code> becomes{" "}
                      <code>[&quot;val&quot;]</code>).
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Settings className="h-5 w-5 text-purple-500" />
                        <span>Optional Single Segments</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Remain <code>undefined</code> if omitted.
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="async-support">
                <h4>Async Support</h4>
                <p>
                  <code>getStaticPaths</code> can be an <strong>async</strong>{" "}
                  function. This allows you to fetch data from a database or API
                  during the build process to determine which paths to render.
                </p>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Database className="h-5 w-5 text-indigo-500" />
                    <span>Database Integration</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Perfect for generating product pages, blog posts, or
                    categories based on your CMS content.
                  </p>
                </div>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg mt-4"
                >
                  {`// src/products/[id]/page_functions.ts

export async function getStaticPaths() {
  // Only generate the top 10 products at build time
  const topProducts = await db.getTopProducts(10);
  
  return topProducts.map(p => p.id);
  
  // Any ID not in this list will be generated 
  // on-demand when a user visits /products/999
}`}
                </CodeBlock>
              </section>
            </section>

            <section id="revalidate">
              <h3>
                3. <code>revalidate</code> (ISR)
              </h3>
              <p>
                Enables Incremental Static Regeneration. Defines the cache
                lifetime of a static page in milliseconds.
              </p>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <RefreshCw className="h-5 w-5 text-amber-500" />
                  <span>Return Values</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    <strong>Returns:</strong> <code>number</code> (milliseconds)
                  </li>
                  <li>
                    If it returns <code>0</code> (or is not defined), the page
                    remains static indefinitely (unless rebuilt)
                  </li>
                </ul>
              </div>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
                {`// src/dashboard/page_functions.ts
export function revalidate() {
  return 60000; // Regenerate at most once every 60 seconds
}`}
              </CodeBlock>
            </section>

            <section id="dynamic">
              <h3>
                4. <code>dynamic</code> (Force SSR)
              </h3>
              <p>
                Forces a page to be rendered dynamically (Server-Side Rendering)
                on every request, bypassing static generation.
              </p>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Zap className="h-5 w-5 text-purple-500" />
                  <span>Function Signature</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    <strong>Returns:</strong> <code>boolean</code>
                  </li>
                </ul>
              </div>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg mt-4"
              >
                {`// src/profile/page_functions.ts
export function dynamic() {
  return true; // Always render on demand (SSR)
}`}
              </CodeBlock>
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
