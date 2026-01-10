"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Code, Database, Zap, RefreshCw } from "lucide-react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "getprops", title: "getProps Function", level: 2 },
  { id: "getstaticpaths", title: "getStaticPaths Function", level: 2 },
  { id: "dynamic", title: "dynamic Function", level: 2 },
  { id: "revalidate", title: "revalidate Function", level: 2 },
  { id: "usage-examples", title: "Usage Examples", level: 2 },
];

export default function PageFunctionsPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6 prose">
            <h1 className="text-3xl font-bold mb-2">Page Functions</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to use <code>page_functions.ts</code> (or{" "}
              <code>.js</code>) to define route-specific logic in Dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                <code>page_functions.ts</code> is a file for defining four
                different possible functions. These are:
              </p>

              <div className="not-prose grid gap-4 md:grid-cols-2 mb-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Database className="h-5 w-5 text-blue-600" />
                      <CardTitle className="text-base">getProps</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Fetch data in the server and pass this data as props to
                      the page component (Client or Server Component) and root
                      layout.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Code className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-base">
                        getStaticPaths
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Specify the values of dynamic params in the route for
                      which SSG will be applied.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-purple-600" />
                      <CardTitle className="text-base">dynamic</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Control whether a page is rendered dynamically, bypassing
                      SSG.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-5 w-5 text-orange-600" />
                      <CardTitle className="text-base">revalidate</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Specify when to revalidate data fetched in SSG.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="getprops">
              <h2>getProps Function</h2>
              <p>
                A function to fetch data in the server and pass this data as
                props to the page component and the root layout (if exists).
              </p>

              <CodeBlock language="typescript">
                {`// src/dynamic/[name]/page_functions.ts
export async function getProps(
  params: Record<string, string>,
  query: Record<string, string>,
  cookies: Record<string, string>
) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(\`Hello \${params.name}\`), 2000)
  );

  return { page: { data }, layout: { title: data } };
}`}
              </CodeBlock>
            </section>

            <section id="getstaticpaths">
              <h2>getStaticPaths Function</h2>
              <p>
                Function to get the values of a dynamic param in the route for
                which SSG will be applied.{" "}
                <strong>Fetching data in the server</strong> with{" "}
                <code>getProps</code> or within the body of a Server Component{" "}
                <strong>increases the FCP (First Contentful Paint)</strong>,
                that is, when the user sees something on the screen,{" "}
                <strong>when rendering dynamically</strong>, that is, on the
                fly. So this technique must only be used if accompanied by SSG
                (Static Site Generation).
              </p>

              <CodeBlock language="typescript">
                {`// src/dynamic/[name]/page_functions.ts
export function getStaticPaths() {
  return ["albert", "johan", "roger", "alex"];
}`}
              </CodeBlock>
            </section>

            <section id="dynamic">
              <h2>dynamic Function</h2>
              <p>
                This function is for when we want the page to be rendered
                dynamically, bypassing SSG. It must return <code>true</code> to
                render a page dynamically. Otherwise SSG will be used.
              </p>

              <CodeBlock language="typescript">
                {`export function dynamic() {
  return true;
}`}
              </CodeBlock>
            </section>

            <section id="revalidate">
              <h2>revalidate Function</h2>
              <p>
                This function is for when we want to revalidate data fetched in
                SSG.
              </p>

              <CodeBlock language="typescript">
                {`export function revalidate() {
  return 60000; // ms
}`}
              </CodeBlock>
            </section>

            <section id="usage-examples">
              <h2>Usage Examples</h2>

              <h3>Complete Example</h3>
              <CodeBlock language="typescript">
                {`// src/blog/[id]/page_functions.tsx
export function getStaticPaths() {
  // Return an array of possible 'id' values for SSG
  return ["1", "2", "3"];
}

export async function getProps(params: { id: string }) {
  // Fetch data based on the 'id' parameter
  const post = await fetch(\`https://api.example.com/posts/\${params.id}\`).then(
    (res) => res.json()
  );
  return { page: { post }, layout: { title: post.title } };
}

export function dynamic() {
  // Force dynamic rendering (skip SSG) if needed
  return false; // Set to true to bypass SSG
}

export function revalidate() {
  return 60000; // ms
}`}
              </CodeBlock>

              <h3>Usage in Page Component</h3>
              <CodeBlock language="typescript">
                {`// src/blog/[id]/page.tsx
"use client";

export default function Page({
  params,
  post,
}: {
  params: { id: string };
  post: { title: string; content: string };
}) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}`}
              </CodeBlock>

              <h3>Usage in Root Layout</h3>
              <CodeBlock language="typescript">
                {`"use client";

import type { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
  title,
}: {
  children: ReactNode;
  sidebar: ReactNode;
  title: string;
}) {
  return (
    <html lang="en">
      <head>
        <title>{title ?? "react 19 app"}</title>
      </head>
      <body>
        {sidebar}
        {children}
      </body>
    </html>
  );
}`}
              </CodeBlock>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
