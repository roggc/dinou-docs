"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Split,
  Layers,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  FolderTree,
  ShieldAlert,
  Ghost,
  Info,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "route-types", title: "Route Types", level: 2 },
  { id: "optional-segments", title: "Optional Segments Rules", level: 2 },
  { id: "advanced-routing", title: "Advanced Routing", level: 2 },
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
                Routing
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou uses a file-system based router. Your file structure defines
              your URL paths.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Any file named <code>page.jsx</code>, <code>page.tsx</code>,{" "}
                <code>page.js</code>, or <code>page.ts</code> inside the{" "}
                <code>src</code> directory automatically becomes a public route.
              </p>
              <div className="not-prose bg-muted/50 rounded-lg p-4 border border-border flex items-center gap-4">
                <FolderTree className="h-10 w-10 text-muted-foreground" />
                <div className="text-sm font-mono">
                  <div>
                    src/page.tsx &rarr;{" "}
                    <span className="text-blue-600 dark:text-blue-400">/</span>
                  </div>
                  <div>
                    src/blog/page.tsx &rarr;{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      /blog
                    </span>
                  </div>
                  <div>
                    src/blog/[slug]/page.tsx &rarr;{" "}
                    <span className="text-blue-600 dark:text-blue-400">
                      /blog/hello-world
                    </span>
                  </div>
                </div>
              </div>
            </section>

            <section id="route-types">
              <h2>Basic & Dynamic Routes</h2>
              <p>
                Dinou supports various pattern matching strategies for dynamic
                routing:
              </p>

              <div className="not-prose overflow-x-auto rounded-lg border border-border">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Pattern</th>
                      <th className="p-4">File Path</th>
                      <th className="p-4">URL Example</th>
                      <th className="p-4">
                        Params (<code>params</code>)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-semibold">Static</td>
                      <td className="p-4 font-mono text-xs">src/page.jsx</td>
                      <td className="p-4 font-mono text-xs">/</td>
                      <td className="p-4 font-mono text-xs text-muted-foreground">
                        {"{}"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Dynamic</td>
                      <td className="p-4 font-mono text-xs">
                        src/blog/[slug]/page.jsx
                      </td>
                      <td className="p-4 font-mono text-xs">/blog/hello</td>
                      <td className="p-4 font-mono text-xs text-blue-600">
                        {"{ slug: 'hello' }"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Optional</td>
                      <td className="p-4 font-mono text-xs">
                        src/blog/[[slug]]/page.jsx
                      </td>
                      <td className="p-4 font-mono text-xs">/blog</td>
                      <td className="p-4 font-mono text-xs text-blue-600">
                        {"{ slug: undefined }"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Catch-all</td>
                      <td className="p-4 font-mono text-xs">
                        src/blog/[...slug]/page.jsx
                      </td>
                      <td className="p-4 font-mono text-xs">/blog/a/b/c</td>
                      <td className="p-4 font-mono text-xs text-purple-600">
                        {"{ slug: ['a','b','c'] }"}
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-semibold">Optional Catch-all</td>
                      <td className="p-4 font-mono text-xs">
                        src/blog/[[...slug]]/page.jsx
                      </td>
                      <td className="p-4 font-mono text-xs">/blog</td>
                      <td className="p-4 font-mono text-xs text-purple-600">
                        {"{ slug: [] }"}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <Alert className="not-prose mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Note</AlertTitle>
                <AlertDescription>
                  Route parameters are passed as the <code>params</code> prop to{" "}
                  <code>page</code>, <code>layout</code>, <code>error</code>,
                  <code>not_found</code>, and slot pages. Query parameters
                  (e.g., <code>?q=hello</code>) are <strong>NOT</strong> passed
                  as props; use the <code>useSearchParams()</code> hook instead.
                </AlertDescription>
              </Alert>
            </section>

            <section id="optional-segments">
              <h2>Optional Segments Rules</h2>
              <p>
                Dinou enforces a strict <strong>No-Gap Rule</strong> when using
                deep nested optional segments like{" "}
                <code>[[warehouse]]/[[aisle]]</code>.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-green-500/20 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Allowed: Trailing Omission</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2">
                      You can omit optional segments only if they are at the{" "}
                      <strong>end</strong> of the URL.
                    </p>
                    <div className="font-mono bg-background/50 p-2 rounded text-xs">
                      /inventory/main/a1 ✅<br />
                      /inventory/main ✅<br />
                      /inventory ✅
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-red-500/20 bg-red-50/50 dark:bg-red-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                      <XCircle className="h-5 w-5" />
                      <span>Forbidden: Intercalated Gaps</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <p className="mb-2">
                      You cannot skip an earlier segment and define a later one.
                    </p>
                    <div className="font-mono bg-background/50 p-2 rounded text-xs">
                      (Goal: Skip warehouse, set aisle)
                      <br />❌ Impossible to represent in URL
                    </div>
                  </CardContent>
                </Card>
              </div>

              <h3>Catch-all Constraints</h3>
              <p>
                Because Catch-all segments (<code>[...slug]</code>) consume the
                rest of the URL, they must always be the{" "}
                <strong>terminal (last) segment</strong> of a route definition.
                You cannot place other static or dynamic folders inside a
                Catch-all folder.
              </p>
            </section>

            <section id="advanced-routing">
              <h2>Advanced Routing</h2>

              <div className="space-y-10">
                {/* ROUTE GROUPS */}
                <div>
                  <h3 className="flex items-center gap-2">
                    <Layers className="h-5 w-5" />
                    Route Groups <code>(folder)</code>
                  </h3>

                  <p>
                    Folders wrapped in parentheses are <strong>omitted</strong>{" "}
                    from the URL path.
                  </p>
                  <ul className="list-none space-y-2 font-mono text-sm bg-muted p-4 rounded-lg ml-0!">
                    <li>
                      src/(auth)/login/page.jsx &rarr;{" "}
                      <span className="font-bold">/login</span>
                    </li>
                    <li>
                      src/(marketing)/about/page.jsx &rarr;{" "}
                      <span className="font-bold">/about</span>
                    </li>
                    <li>
                      src/(marketing)/(nested)/about/page.jsx &rarr;{" "}
                      <span className="font-bold">/about</span>
                    </li>
                  </ul>
                  <p className="mt-4">
                    <strong>Why use them?</strong>
                    <br />
                    Route Groups allow you to keep your project structure
                    logical (e.g., grouping all authentication-related routes
                    together) without affecting the public URL structure.
                  </p>
                </div>

                {/* PARALLEL ROUTES */}
                <div>
                  <h3 className="flex items-center gap-2">
                    <Split className="h-5 w-5" />
                    Parallel Routes <code>@slot</code>
                  </h3>
                  <p>
                    You can define slots (e.g., <code>@sidebar</code>,{" "}
                    <code>@header</code>) to render multiple pages in the same
                    layout simultaneously.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose">
                    <div className="bg-card border rounded-lg p-3 text-sm">
                      <div className="font-semibold mb-1">File Structure</div>
                      <ul className="space-y-1 text-muted-foreground font-mono text-xs">
                        <li>src/dashboard/@sidebar/page.jsx</li>
                        <li>src/dashboard/(group-a)/@bottom/page.jsx</li>
                        <li>src/dashboard/layout.jsx</li>
                      </ul>
                    </div>
                    <div className="bg-card border rounded-lg p-3 text-sm">
                      <div className="font-semibold mb-1">Layout Props</div>
                      <p className="text-muted-foreground text-xs">
                        The <code>layout.jsx</code> receives the slots as props
                        alongside children:
                      </p>
                      <code className="text-xs bg-muted p-1 rounded mt-1 block">
                        {"function Layout({ children, sidebar, bottom })"}
                      </code>
                    </div>
                  </div>

                  <Alert className="not-prose my-4">
                    <Info className="h-4 w-4" />
                    <AlertTitle>Requirement</AlertTitle>
                    <AlertDescription>
                      Slots must be located in the{" "}
                      <strong>same logical folder</strong> as the layout they
                      serve.
                    </AlertDescription>
                  </Alert>

                  <h4 className="mt-6 mb-2">Why use them?</h4>
                  <p>
                    Parallel routes allow independent UI sections and,
                    crucially, <strong>Error Containment</strong>. If one
                    section fails, it doesn't have to break the entire page.
                  </p>

                  <h4 className="mt-6 mb-4">Error Containment Behavior</h4>
                  <div className="grid gap-4 md:grid-cols-3 not-prose">
                    {/* Scenario 1 */}
                    <Card className="border-l-4 border-l-blue-500">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <ShieldAlert className="h-4 w-4 text-blue-500" />
                          Server Component with error.tsx
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 text-xs text-muted-foreground">
                        If the slot fails, only that{" "}
                        <strong>specific slot</strong> renders its error UI. The
                        rest of the page remains interactive.
                      </CardContent>
                    </Card>

                    {/* Scenario 2 */}
                    <Card className="border-l-4 border-l-orange-500">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <Ghost className="h-4 w-4 text-orange-500" />
                          Server Component w/o error.tsx
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 text-xs text-muted-foreground">
                        If the slot fails and has no error page, it safely
                        renders <strong>null</strong>. The slot disappears, but
                        the page works.
                      </CardContent>
                    </Card>

                    {/* Scenario 3 */}
                    <Card className="border-l-4 border-l-red-500">
                      <CardHeader className="p-4 pb-2">
                        <div className="flex items-center gap-2 font-bold text-sm">
                          <XCircle className="h-4 w-4 text-red-500" />
                          Client Component
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-2 text-xs text-muted-foreground">
                        Without an explicit React Error Boundary, an unhandled
                        error here will <strong>crash the entire page</strong>.
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
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
