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
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Layers,
  AlertCircle,
  SearchX,
  Flag,
  CheckCircle2,
  XCircle,
  Info,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "layouts", title: "Layouts (`layout.jsx`)", level: 2 },
  { id: "error-handling", title: "Error Handling (`error.jsx`)", level: 2 },
  { id: "not-found", title: "Not Found (`not_found.jsx`)", level: 2 },
  {
    id: "advanced-control",
    title: "Advanced Layout Control (Flags)",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Layouts & Hierarchical Rendering
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dinou uses a nested routing system. Layouts, error pages, and not
              found pages cascade down the directory hierarchy, persisting
              across navigations.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="layouts">
              <h2>Layouts (`layout.jsx`)</h2>
              <p>
                Layouts wrap pages and child layouts. They persist across
                navigation, preserving state and preventing unnecessary
                re-renders.
              </p>
              <p>
                A layout receives <code>children</code>, <code>params</code>,
                and any parallel slots (e.g., <code>sidebar</code>) as props.
                Note: <code>searchParams</code> are not passed to layouts.
              </p>
              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/dashboard/layout.jsx
export default async function Layout({ children, params, sidebar }) {
  return (
    <div className="dashboard-grid">
      <aside>{sidebar}</aside>
      <main>
        <h1>Dashboard for {params.teamId}</h1>
        {children}
      </main>
    </div>
  );
}`}
              </CodeBlock>
              <p className="mt-4">
                Layouts are nested by default. For example, a page at{" "}
                <code>src/dashboard/settings/page.jsx</code> would be wrapped by
                the root layout and the dashboard layout.
              </p>
              <Alert className="not-prose mt-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Fetching Data in Layouts</AlertTitle>
                <AlertDescription>
                  Use <code>getProps</code> in <code>page_functions.ts</code> to
                  inject data into the root layout for a specific page.
                </AlertDescription>
              </Alert>
            </section>

            <section id="error-handling">
              <h2>Error Handling (`error.jsx`)</h2>
              <p>
                Define an <code>error.jsx</code> file to handle errors in a
                route segment. Dinou renders the closest <code>error.jsx</code>{" "}
                bubbling up the hierarchy.
              </p>
              <p>
                It receives <code>error</code> (object) and <code>params</code>{" "}
                as props. Error pages can be Server or Client Components.
              </p>
              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`"use client"; // Optional: Can be Server Component too

export default function ErrorPage({ error, params }) {
  return (
    <div>
      <h2>Something went wrong in {params.slug}!</h2>
      <p>{${"`${error.name}: ${error.message}`"}}</p>
      {error.stack && (
        <pre style={{ background: "#eee", padding: "1rem" }}>{error.stack}</pre>
      )}
    </div>
  );
}`}
              </CodeBlock>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <span>Error Stack</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <code>error.stack</code> is only available in development, not
                  production.
                </p>
              </div>
            </section>

            <section id="not-found">
              <h2>Not Found (`not_found.jsx`)</h2>
              <p>
                Define a <code>not_found.jsx</code> file to customize the 404
                UI. Dinou renders the closest <code>not_found.jsx</code>{" "}
                traversing up from the requested URL.
              </p>
              <p>
                It receives <code>params</code> as a prop. Use{" "}
                <code>useSearchParams()</code> for search parameters.
              </p>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <SearchX className="h-5 w-5 text-yellow-500" />
                  <span>404 Handling</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Like errors, not found pages cascade through the hierarchy for
                  consistent UX.
                </p>
              </div>
            </section>

            <section id="advanced-control">
              <h2>Advanced Layout Control (Flags)</h2>
              <p>
                Use empty "flag files" (no extension) to control layout
                behavior, such as breaking out of the nested hierarchy.
              </p>
              <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Flag File</th>
                      <th className="p-4">Applies To</th>
                      <th className="p-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-mono text-xs">reset_layout</td>
                      <td className="p-4 font-mono text-xs">layout.jsx</td>
                      <td className="p-4 text-xs">
                        Resets the layout tree. This layout becomes the new
                        root, ignoring parents.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs">no_layout</td>
                      <td className="p-4 font-mono text-xs">
                        page.jsx, error.jsx, not_found.jsx
                      </td>
                      <td className="p-4 text-xs">
                        Prevents any layout from wrapping this component.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs">no_layout_error</td>
                      <td className="p-4 font-mono text-xs">error.jsx</td>
                      <td className="p-4 text-xs">
                        Prevents layouts for the error page only.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-xs">
                        no_layout_not_found
                      </td>
                      <td className="p-4 font-mono text-xs">not_found.jsx</td>
                      <td className="p-4 text-xs">
                        Prevents layouts for the not found page only.
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
                      <span>Example: Isolate Landing Page</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm font-mono">
                    src/marketing/layout.jsx
                    <br />
                    src/marketing/reset_layout (empty file)
                    <br />
                    Result: Ignores global root layout.
                  </CardContent>
                </Card>
                <Card className="border-red-500/20 bg-red-50/50 dark:bg-red-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-semibold">
                      <XCircle className="h-5 w-5" />
                      <span>Use Cases</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Perfect for separating marketing pages from app pages
                    without shared layouts.
                  </CardContent>
                </Card>
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
