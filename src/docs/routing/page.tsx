"use client";

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
  { id: "base-directory", title: "Base Directory", level: 2 },
  { id: "static-routes", title: "Static Routes", level: 2 },
  { id: "dynamic-routes", title: "Dynamic Routes", level: 2 },
  { id: "optional-routes", title: "Optional Dynamic Routes", level: 2 },
  { id: "catch-all", title: "Catch-All Routes", level: 2 },
  { id: "layouts", title: "Layouts", level: 2 },
  { id: "parallel-routes", title: "Parallel Routes (Slots)", level: 2 },
  { id: "not-found", title: "Not Found Pages", level: 2 },
  { id: "error-handling", title: "Error Handling", level: 2 },
  { id: "route-groups", title: "Route Groups", level: 2 },
];

export default function RoutingPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Routing System</h1>
            <p className="text-xl text-muted-foreground">
              Learn about Dinou's file-based routing system and how to create
              different types of routes.
            </p>
          </div>

          <div className="prose">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Dinou uses a file-based routing system where routes are defined
                by creating <code>page.tsx</code> files in folders. The routing
                system supports:
              </p>
              <ul>
                <li>Static routes</li>
                <li>Dynamic routes with parameters</li>
                <li>Optional dynamic routes</li>
                <li>Catch-all routes</li>
                <li>Nested layouts</li>
                <li>Custom not found pages</li>
                <li>Custom error pages</li>
                <li>Parallel routes (slots)</li>
                <li>Route groups</li>
              </ul>
            </section>

            <section id="base-directory">
              <h2>Base Directory</h2>
              <p>
                All routing in <strong>Dinou</strong> is defined relative to the{" "}
                <code>src/</code> directory. The structure and naming of files
                inside <code>src/</code> determine how routes are resolved and
                rendered.
              </p>

              <p>Here's a summary of the special files used in routing:</p>

              <ul>
                <li>
                  <strong>
                    <code>page.tsx</code>
                  </strong>
                  : Defines a route. The file path corresponds to the route
                  path.
                </li>
                <li>
                  <strong>
                    <code>layout.tsx</code>
                  </strong>
                  : Wraps a page or nested pages/layouts. Used for persistent UI
                  such as headers, footers, sidebars, etc, or for defining the
                  html document.
                </li>
                <li>
                  <strong>
                    <code>not_found.tsx</code>
                  </strong>
                  : Defines a custom "not found" page for unmatched routes.
                </li>
                <li>
                  <strong>
                    <code>error.tsx</code>
                  </strong>
                  : Defines an error page for the route. It receives{" "}
                  <code>params</code>, <code>query</code>, and{" "}
                  <code>error</code> props.
                </li>
                <li>
                  <strong>Slots</strong>: Folders starting with <code>@</code>,
                  such as <code>@sidebar</code>, define parallel content and
                  must contain a <code>page.tsx</code> file.
                </li>
              </ul>

              <CodeBlock language="bash">{`src/
├── page.tsx              # Route: /
├── layout.tsx            # Layout for /
├── not_found.tsx         # 404 page for /
├── error.tsx             # Error page for /
├── about/
│   └── page.tsx          # Route: /about
└── @sidebar/
    └── page.tsx          # Slot for sidebar content
`}</CodeBlock>

              <p>
                This convention keeps your routing declarative and consistent
                while supporting advanced use cases like nested layouts and
                error boundaries.
              </p>
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
                Each <code>page.tsx</code> file exports a React component
                (client or server component):
              </p>
              <CodeBlock language="typescript">{`// src/about/page.tsx
"use client";

export default function Page() {
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

export default function Page({ 
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
                <code>[[param]]</code> and match both with and without the
                parameter:
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

export default function Page({ 
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

export default function Page({ 
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
                <code>layout.tsx</code> file in any folder to define a layout:
              </p>

              <CodeBlock language="typescript">{`// src/blog/layout.tsx
"use client";

import type { ReactNode } from "react";

export default function Layout({ 
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

              <Alert className="not-prose mt-2">
                <AlertDescription>
                  Layouts automatically wrap all pages in their folder and
                  subfolders. You can skip layouts by adding a{" "}
                  <code>no_layout</code> file (without extension) in the same
                  folder as your page.
                </AlertDescription>
              </Alert>
              <Alert className="not-prose mt-2">
                <AlertDescription>
                  You can add a <code>reset_layout</code> file (without
                  extension) in the same folder as your nested layout to make it
                  the first applied. This is useful for example when you have a
                  landing page in <code>/</code>.
                </AlertDescription>
              </Alert>
            </section>

            <section id="parallel-routes">
              <h2>Parallel Routes (Slots)</h2>
              <p>
                Parallel routes, also known as <strong>slots</strong>, are
                defined using directory names that start with <code>@</code>,
                such as <code>@sidebar</code>. These slots{" "}
                <strong>are passed into layouts as props</strong>, allowing you
                to render multiple parts of a page in parallel.
              </p>

              <CodeBlock language="tsx">{`// File structure:
src/@sidebar/page.tsx
src/page.tsx
src/layout.tsx`}</CodeBlock>

              <p>
                The content from <code>@sidebar/page.tsx</code> is passed into{" "}
                <code>layout.tsx</code> as <code>props.sidebar</code>. You can
                render the slot in your layout like this:
              </p>

              <CodeBlock language="tsx">{`"use client";

import type { ReactNode } from "react";

export default function Layout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Dinou app</title>
      </head>
      <body>
        {sidebar}
        {children}
      </body>
    </html>
  );
}`}</CodeBlock>

              <p>
                Slots are especially useful when rendering persistent UI
                components like sidebars, headers, or other parallel content
                areas that accompany the main page content.
              </p>

              <Alert className="not-prose mt-2">
                <AlertDescription>
                  Slots receive query and dynamic parameters as the rest of
                  pages (layouts, pages, not found pages, and error pages).
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

export default function Page() {
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
              <Alert className="not-prose mt-2">
                <AlertDescription>
                  Layouts are applied to not found pages too, unless a{" "}
                  <code>no_layout</code> or <code>no_layout_not_found</code>{" "}
                  file (without extension) is found in the same folder as your
                  not found page.
                </AlertDescription>
              </Alert>
            </section>

            <section id="error-handling">
              <h2>Error Handling</h2>
              <p>
                Create custom error pages by adding <code>error.tsx</code>{" "}
                files:
              </p>

              <CodeBlock language="typescript">{`// src/error.tsx
"use client";

export default function Page({
  error: { message, stack },
}: {
  error: Error;
}) {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-red-600">Error</h1>
        <p className="text-lg text-gray-700">
          An unexpected error has occurred. Please try again later.
        </p>
        <a
          href="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Go to Home
        </a>
      </div>
      <div className="mt-6 text-sm text-gray-500">
        <pre className="whitespace-pre-wrap break-words">{message}</pre>
        <pre className="whitespace-pre-wrap break-words">{stack}</pre>
      </div>
    </main>
  );
}`}</CodeBlock>

              <p>
                The most nested <code>error.tsx</code> file in a route hierarchy
                will be used. In production, if no error page is present, the
                error will be written to the console. In development, a default
                debug error page is shown.
              </p>

              <Alert className="not-prose mt-2">
                <AlertDescription>
                  Layouts are applied to error pages unless a{" "}
                  <code>no_layout</code> or <code>no_layout_error</code> file
                  (without extension) is present in the same folder as the{" "}
                  <code>error.tsx</code> page.
                </AlertDescription>
              </Alert>

              <Alert className="not-prose mt-2">
                <AlertDescription>
                  Avoid using <strong>async functions</strong> (server
                  components) and fetching data directly in{" "}
                  <code>error.tsx</code> pages. These are rendered dynamically
                  and delaying rendering is discouraged. Use{" "}
                  <code>Suspense</code> if needed.
                </AlertDescription>
              </Alert>

              {/* <Alert className="not-prose mt-2">
                <AlertDescription>
                  There is no <code>error_functions.ts</code> file. You can't
                  use <code>getProps</code> for error pages. Use{" "}
                  <code>Suspense</code> to fetch data if necessary.
                </AlertDescription>
              </Alert> */}

              <p>
                The error page receives three props: <code>params</code>,{" "}
                <code>query</code>, and <code>error</code>. The{" "}
                <code>error</code> object contains a <code>message</code> and a{" "}
                <code>stack</code>, both strings.
              </p>
            </section>

            <section id="route-groups">
              <h2>Route Groups</h2>
              <p>
                Route groups are defined using directory names wrapped in
                parentheses, such as <code>(group)</code>. They allow you to
                organize routes in your filesystem without affecting the URL
                structure.
              </p>

              <CodeBlock language="tsx">{`// src/(auth)/login/page.tsx → "/login"
// src/(auth)/signup/page.tsx → "/signup"`}</CodeBlock>

              <p>
                The directory name <code>(auth)</code> is ignored in the final
                URL, so both pages above will be rendered at the root level:
                <code>/login</code> and <code>/signup</code>.
              </p>

              <p>
                This is useful for grouping related pages (like
                authentication-related routes) together in the codebase without
                adding a prefix to the URL path.
              </p>

              <Alert className="not-prose mt-2">
                <AlertDescription>You can nest route groups.</AlertDescription>
              </Alert>
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
