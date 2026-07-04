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
  DraftingCompass,
  ShieldCheck,
  FileCode,
  Layers,
  AlertCircle,
  HelpCircle,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "page-functions", title: "1. Page Functions arguments", level: 2 },
  { id: "react-components", title: "2. React Components properties", level: 2 },
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
                Route Parameters
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand how dynamic URL segments (params) are propagated as arguments and props throughout the Dinou lifecycle.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                When a dynamic route containing bracket notation (e.g. <code>src/blog/[slug]/page.tsx</code>) is visited, Dinou extracts the dynamic segments from the URL path. 
                The parsed parameters dictionary is then passed down to two main entry points: <strong>Page Functions</strong> (server-side data fetching and validation functions) and <strong>React Components</strong> (props during the rendering cycle).
              </p>
            </section>

            <section id="page-functions" className="mt-12 pt-8 border-t">
              <h2>1. As arguments to Page Functions (<code>page_functions.ts</code>)</h2>
              <p>
                Inside a route's <code>page_functions.ts</code> (or <code>.js</code>) file, the <code>params</code> object is passed as the <strong>first and only argument</strong> to both data-fetching and validation functions.
              </p>

              <div className="space-y-6 mt-6">
                <Card className="min-w-0 w-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <DraftingCompass className="h-5 w-5 text-blue-500" />
                      <span>getProps(params)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Retrieves data on the server before the page component mounts. The returned props are merged and passed to the Page.
                    </p>
                    <CodeBlock language="typescript" hideHeader>
                      {`// src/blog/[slug]/page_functions.ts
export async function getProps(params) {
  // params is the raw object: { slug: "my-post" }
  const post = await db.getPost(params.slug);
  return {
    page: { post }
  };
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>

                <Card className="min-w-0 w-full">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-100">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <span>validateParams(params)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      Validates route parameters at request time or build time. Returning <code>false</code> aborts rendering and returns a 404 response.
                    </p>
                    <CodeBlock language="typescript" hideHeader>
                      {`// Validate that ID is strictly numeric
export function validateParams(params) {
  return /^\\d+$/.test(params.id);
}`}
                    </CodeBlock>
                  </CardContent>
                </Card>
              </div>

              <Alert className="not-prose mt-6">
                <AlertCircle className="h-4 w-4 text-indigo-500" />
                <AlertTitle>Strict Signature Rule</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground mt-1">
                  Because Dinou passes the parameters dictionary directly as the first argument, <strong>do not</strong> destructure it as <code>&#123; params &#125;</code> (e.g. <code>getProps(&#123; params &#125;)</code> is invalid and will throw undefined errors). Use <code>getProps(params)</code>.
                </AlertDescription>
              </Alert>
            </section>

            <section id="react-components" className="mt-12 pt-8 border-t">
              <h2>2. As Component properties (<code>props.params</code>)</h2>
              <p>
                During the rendering phase, Dinou injects the <code>params</code> dictionary directly into the props of the active route components:
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <FileCode className="h-4 w-4 text-blue-500" />
                      Pages (<code>page.tsx</code>)
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      The page component receives the params as a prop. Accessible in both Server and Client Components:
                    </p>
                    <code className="block bg-muted p-2 rounded font-mono text-[10px] whitespace-pre overflow-x-auto w-full">
                      {`export default function Page({ params }) {
  return <h1>Post: {params.slug}</h1>;
}`}
                    </code>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <Layers className="h-4 w-4 text-green-500" />
                      Layouts (<code>layout.tsx</code>)
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Layouts also receive <code>params</code>, enabling layouts to read dynamic segments belonging to their route branch:
                    </p>
                    <code className="block bg-muted p-2 rounded font-mono text-[10px] whitespace-pre overflow-x-auto w-full">
                      {`export default function Layout({ children, params }) {
  return <section>{children}</section>;
}`}
                    </code>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      Errors (<code>error.tsx</code>)
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Error boundaries receive <code>params</code> to present helpful contextual debugging information to users:
                    </p>
                    <code className="block bg-muted p-2 rounded font-mono text-[10px] whitespace-pre overflow-x-auto w-full">
                      {`export default function Error({ error, params }) {
  return <p>Failed loading post {params.id}</p>;
}`}
                    </code>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-sm">
                      <HelpCircle className="h-4 w-4 text-yellow-500" />
                      Not Found (<code>not_found.tsx</code>)
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground space-y-2">
                    <p>
                      Allows rendering customized 404 pages using the parameters extracted from the unmatched path:
                    </p>
                    <code className="block bg-muted p-2 rounded font-mono text-[10px] whitespace-pre overflow-x-auto w-full">
                      {`export default function NotFound({ params }) {
  return <p>User {params.userId} does not exist</p>;
}`}
                    </code>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
