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
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "file-conventions", title: "File Conventions Cheatsheet", level: 2 },
  { id: "route-components", title: "Route Components", level: 3 },
  { id: "layout-flags", title: "Layout Control Flags (Empty Files)", level: 3 },
  {
    id: "page-config-cheatsheet",
    title: "Page Configuration (`page_functions.ts`) Cheatsheet",
    level: 2,
  },
  { id: "getstaticpaths-ref", title: "getStaticPaths()", level: 3 },
  { id: "getprops-ref", title: "getProps({ params })", level: 3 },
  { id: "revalidate-ref", title: "revalidate()", level: 3 },
  { id: "dynamic-ref", title: "dynamic()", level: 3 },
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
                Cheatsheet: Conventions & Configuration
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Quick reference for file naming conventions and page configuration
              functions in Dinou.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="file-conventions">
              <h2>File Conventions Cheatsheet</h2>
              <p>
                Dinou recognizes specific filenames to build the routing
                hierarchy and control layout behavior.
              </p>

              <section id="route-components">
                <h3>Route Components</h3>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Filename</th>
                        <th className="p-4">Environment</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          page.{`{jsx,tsx,js,ts}`}
                        </td>
                        <td className="p-4 text-xs">Server or Client</td>
                        <td className="p-4 text-xs">
                          The unique UI for a route
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          layout.{`{jsx,tsx,js,ts}`}
                        </td>
                        <td className="p-4 text-xs">Server or Client</td>
                        <td className="p-4 text-xs">
                          Wraps the page and children segments
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          error.{`{jsx,tsx,js,ts}`}
                        </td>
                        <td className="p-4 text-xs">Server or Client</td>
                        <td className="p-4 text-xs">
                          UI for 500 errors within the segment
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          not_found.{`{jsx,tsx,js,ts}`}
                        </td>
                        <td className="p-4 text-xs">Server or Client</td>
                        <td className="p-4 text-xs">
                          UI for 404 not found pages within the segment
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
                    Dinou searches up the directory tree for the closest
                    matching file. A <code>not_found.tsx</code> in{" "}
                    <code>/blog/[slug]/not_found.tsx</code>
                    takes precedence over one in the root for{" "}
                    <code>/blog/not_found.tsx</code>.
                  </p>
                </div>
              </section>

              <section id="layout-flags">
                <h3>Layout Control Flags (Empty Files)</h3>
                <p>
                  Create these <strong>empty files</strong> (no extension) to
                  alter how layouts apply to a specific route directory.
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
                        <td className="p-4 font-mono text-xs">no_layout</td>
                        <td className="p-4 font-mono text-xs">
                          page.tsx, error.tsx, not_found.tsx
                        </td>
                        <td className="p-4 text-xs">
                          Component renders without any layout wrapping
                        </td>
                      </tr>
                      <tr className="bg-amber-50/50 dark:bg-amber-900/10">
                        <td className="p-4 font-mono text-xs">reset_layout</td>
                        <td className="p-4 font-mono text-xs">layout.jsx</td>
                        <td className="p-4 text-xs">
                          <strong>Resets layout hierarchy.</strong> This layout
                          becomes the new Root, ignoring all parent layouts.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          no_layout_error
                        </td>
                        <td className="p-4 font-mono text-xs">error.jsx</td>
                        <td className="p-4 text-xs">
                          Error page renders without any layout
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          no_layout_not_found
                        </td>
                        <td className="p-4 font-mono text-xs">not_found.jsx</td>
                        <td className="p-4 text-xs">
                          Not found page renders without any layout
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Example: Marketing Site</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <code className="block">src/marketing/layout.jsx</code>
                      <code className="block">src/marketing/reset_layout</code>
                      <code className="block">src/marketing/page.jsx</code>
                      <p className="mt-2 text-xs">
                        Result: Marketing pages use only their own layout,
                        ignoring the global root layout.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        <File className="h-5 w-5" />
                        <span>Empty File Creation</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      <code className="block">
                        touch src/marketing/reset_layout
                      </code>
                      <p className="mt-2 text-xs">
                        No content needed. The file's presence alone triggers
                        the behavior.
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Alert className="not-prose mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Layout Isolation Strategy</AlertTitle>
                  <AlertDescription>
                    Use <code>reset_layout</code> to create completely isolated
                    layout systems (e.g., marketing site vs. admin dashboard vs.
                    documentation). Each can have its own navigation, styles,
                    and state management.
                  </AlertDescription>
                </Alert>
              </section>
            </section>

            <section id="page-config-cheatsheet">
              <h2>
                Page Configuration (<code>page_functions.ts</code>) Cheatsheet
              </h2>
              <p>
                Export these functions from{" "}
                <code>page_functions.{`{ts,js}`}</code> to configure the
                associated <code>page.tsx</code>.
              </p>

              <section id="getstaticpaths-ref">
                <h3>
                  <code>getStaticPaths()</code>
                </h3>
                <p>
                  Defines paths for Static Site Generation (SSG). Paths not
                  returned will be generated on-demand (ISG).
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`export function getStaticPaths() {
  // Simple dynamic route
  return ["1", "2", "hello"];
  
  // Catch-all route
  return [["intro"], ["api", "v1", "auth"]];
  
  // Complex nested route
  return [
    { category: "electronics", specs: ["m3", "16gb"], brand: "apple" },
    { category: "clothing", specs: ["cotton", "white"], brand: undefined },
  ];
}`}
                </CodeBlock>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Layers className="h-5 w-5 text-blue-500" />
                    <span>Automatic Route Propagation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Static parameters propagate downwards. If{" "}
                    <code>blog/[slug]/page_functions.ts</code> returns
                    <code>["post-a", "post-b"]</code>, Dinou automatically
                    generates both
                    <code>/blog/post-a</code> and{" "}
                    <code>/blog/post-a/details</code> (if exists).
                  </p>
                </div>
              </section>

              <section id="getprops-ref">
                <h3>
                  <code>getProps({`{ params }`})</code>
                </h3>
                <p>
                  <strong>Async</strong> function to fetch data on the server
                  and pass props to Page and Root Layout.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`export async function getProps({ params }) {
  const data = await db.getItem(params.id);
  return {
    page: { item: data },        // Props for page.tsx
    layout: { title: data.title }, // Props for Root Layout
  };
}`}
                </CodeBlock>
                <Alert className="not-prose mt-4">
                  <FileCode className="h-4 w-4" />
                  <AlertTitle>Single Source of Truth</AlertTitle>
                  <AlertDescription>
                    Use <code>getProps</code> for data that depends only on
                    route parameters. For request-specific data (cookies, search
                    params), fetch directly in Components with Suspense.
                  </AlertDescription>
                </Alert>
              </section>

              <section id="revalidate-ref">
                <h3>
                  <code>revalidate()</code>
                </h3>
                <p>
                  Sets the Incremental Static Regeneration (ISR) time in{" "}
                  <strong>milliseconds</strong>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`export function revalidate() {
  return 60000; // Regenerate every 60 seconds
}`}
                </CodeBlock>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Value: 60000</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      Regeneration is triggered by the first request after 60s.
                    </CardContent>
                  </Card>
                  <Card className="border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
                    <CardHeader>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Value: 0</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm">
                      No revalidation (permanently static unless rebuilt)
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section id="dynamic-ref">
                <h3>
                  <code>dynamic()</code>
                </h3>
                <p>
                  Forces a page to be Server-Side Rendered on every request,
                  bypassing static generation.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`export function dynamic() {
  return true; // Always SSR
}`}
                </CodeBlock>
                <Alert className="not-prose mt-4">
                  <Zap className="h-4 w-4" />
                  <AlertTitle>Automatic Bailout</AlertTitle>
                  <AlertDescription>
                    Dinou is static by default. Only use <code>dynamic()</code>{" "}
                    when you need explicit SSR behavior. The framework
                    automatically switches to dynamic when request-specific APIs
                    are used.
                  </AlertDescription>
                </Alert>
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
