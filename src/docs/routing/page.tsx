import { TableOfContents } from "@/docs/components/table-of-contents";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Folder } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "static-routes", title: "Static Routes", level: 2 },
  { id: "dynamic-routes", title: "Dynamic Routes", level: 2 },
  { id: "optional-routes", title: "Optional Dynamic Routes", level: 2 },
  { id: "catch-all", title: "Catch-All Routes", level: 2 },
  { id: "layouts", title: "Layouts", level: 2 },
  { id: "not-found", title: "Not Found Pages", level: 2 },
];

export default function RoutingPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Routing System</h1>
            <p className="text-xl text-muted-foreground">
              Learn about dinou's file-based routing system and how to create
              different types of routes.
            </p>
          </div>

          <div className="prose">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                dinou uses a file-based routing system where routes are defined
                by creating
                <code>page.tsx</code> files in folders. The routing system
                supports:
              </p>
              <ul>
                <li>Static routes</li>
                <li>Dynamic routes with parameters</li>
                <li>Optional dynamic routes</li>
                <li>Catch-all routes</li>
                <li>Nested layouts</li>
                <li>Custom not found pages</li>
              </ul>
            </section>

            <section id="static-routes">
              <h2>Static Routes</h2>
              <p>
                Static routes are the simplest type of route, defined by folder
                structure:
              </p>

              <div className="not-prose mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Folder className="h-4 w-4" />
                      File Structure
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock language="bash">{`src/
├── page.tsx          # → /
├── about/
│   └── page.tsx      # → /about
└── blog/
    ├── page.tsx      # → /blog
    └── post/
        └── page.tsx  # → /blog/post`}</CodeBlock>
                  </CardContent>
                </Card>
              </div>

              <p>
                Each <code>page.tsx</code> file exports a React component:
              </p>
              <CodeBlock language="typescript">{`// src/about/page.tsx
"use client";

export default function AboutPage() {
  return <h1>About Us</h1>;
}`}</CodeBlock>
            </section>

            <section id="dynamic-routes">
              <h2>Dynamic Routes</h2>
              <p>
                Dynamic routes are created using square brackets in folder
                names. The parameter value is passed to your component as props:
              </p>

              <div className="not-prose mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Dynamic Route Example</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CodeBlock language="bash">{`src/blog/[id]/page.tsx  # → /blog/:id`}</CodeBlock>
                  </CardContent>
                </Card>
              </div>

              <CodeBlock language="typescript">{`// src/blog/[id]/page.tsx
"use client";

export default function BlogPost({ 
  params 
}: { 
  params: { id: string } 
}) {
  return <h1>Blog Post: {params.id}</h1>;
}`}</CodeBlock>

              <p>
                Accessing <code>/blog/123</code> will pass{" "}
                <code>{`{ params: { id: "123" } }`}</code> to the component.
              </p>
            </section>

            <section id="optional-routes">
              <h2>Optional Dynamic Routes</h2>
              <p>
                Optional dynamic routes use double square brackets{" "}
                <code>[[param]]</code>
                and match both with and without the parameter:
              </p>

              <CodeBlock language="bash">{`src/blog/[[category]]/page.tsx`}</CodeBlock>

              <p>This matches both:</p>
              <ul>
                <li>
                  <code>/blog</code> →{" "}
                  <code>{`{ params: { category: undefined } }`}</code>
                </li>
                <li>
                  <code>/blog/tech</code> →{" "}
                  <code>{`{ params: { category: "tech" } }`}</code>
                </li>
              </ul>

              <CodeBlock language="typescript">{`// src/blog/[[category]]/page.tsx
"use client";

export default function BlogCategory({ 
  params 
}: { 
  params: { category?: string } 
}) {
  return (
    <h1>
      {params.category ? \`Category: \${params.category}\` : 'All Posts'}
    </h1>
  );
}`}</CodeBlock>
            </section>

            <section id="catch-all">
              <h2>Catch-All Routes</h2>
              <p>
                Catch-all routes capture multiple path segments as an array:
              </p>

              <h3>
                Catch-All Routes <code>[...param]</code>
              </h3>
              <CodeBlock language="bash">{`src/wiki/[...slug]/page.tsx  # → /wiki/*`}</CodeBlock>
              <p>Examples:</p>
              <ul>
                <li>
                  <code>/wiki/a</code> →{" "}
                  <code>{`{ params: { slug: ["a"] } }`}</code>
                </li>
                <li>
                  <code>/wiki/a/b/c</code> →{" "}
                  <code>{`{ params: { slug: ["a", "b", "c"] } }`}</code>
                </li>
              </ul>

              <h3>
                Optional Catch-All Routes <code>[[...param]]</code>
              </h3>
              <CodeBlock language="bash">{`src/wiki/[[...slug]]/page.tsx  # → /wiki or /wiki/*`}</CodeBlock>
              <p>Examples:</p>
              <ul>
                <li>
                  <code>/wiki</code> → <code>{`{ params: { slug: [] } }`}</code>
                </li>
                <li>
                  <code>/wiki/a/b</code> →{" "}
                  <code>{`{ params: { slug: ["a", "b"] } }`}</code>
                </li>
              </ul>

              <CodeBlock language="typescript">{`// src/wiki/[[...slug]]/page.tsx
"use client";

export default function WikiPage({ 
  params 
}: { 
  params: { slug: string[] } 
}) {
  return (
    <div>
      <h1>Wiki</h1>
      <p>Path: /{params.slug.join('/')}</p>
    </div>
  );
}`}</CodeBlock>
            </section>

            <section id="layouts">
              <h2>Layouts</h2>
              <p>
                Layouts wrap page content and can be nested. Create a{" "}
                <code>layout.tsx</code>
                file in any folder to define a layout:
              </p>

              <CodeBlock language="typescript">{`// src/blog/layout.tsx
"use client";

import type { ReactNode } from "react";

export default function BlogLayout({ 
  children 
}: { 
  children: ReactNode 
}) {
  return (
    <div>
      <nav>Blog Navigation</nav>
      <main>{children}</main>
    </div>
  );
}`}</CodeBlock>

              <Alert className="not-prose">
                <AlertDescription>
                  Layouts automatically wrap all pages in their folder and
                  subfolders. You can skip layouts by adding a{" "}
                  <code>no_layout</code> file (without extension) in the same
                  folder as your page.
                </AlertDescription>
              </Alert>
            </section>

            <section id="not-found">
              <h2>Not Found Pages</h2>
              <p>
                Create custom 404 pages by adding <code>not_found.tsx</code>{" "}
                files:
              </p>

              <CodeBlock language="typescript">{`// src/not_found.tsx
"use client";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  );
}`}</CodeBlock>

              <p>
                If multiple <code>not_found.tsx</code> files exist in a route
                hierarchy, the most nested one will be used.
              </p>
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
