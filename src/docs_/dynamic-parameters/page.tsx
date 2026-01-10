"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Route, Code, Info } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "basic-dynamic", title: "Basic Dynamic Routes", level: 2 },
  { id: "optional-dynamic", title: "Optional Dynamic Routes", level: 2 },
  { id: "catch-all", title: "Catch-All Routes", level: 2 },
  { id: "optional-catch-all", title: "Optional Catch-All Routes", level: 2 },
  { id: "query-parameters", title: "Query Parameters", level: 2 },
  { id: "usage-examples", title: "Usage Examples", level: 2 },
];

export default function DynamicParametersPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Dynamic Parameters</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to work with dynamic route parameters and query strings
              in Dinou.
            </p>
          </div>

          <div className="prose">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Dinou components (<code>page.tsx</code>, <code>layout.tsx</code>
                , and <code>not_found.tsx</code>) automatically receive two
                props:
              </p>
              <ul>
                <li>
                  <code>params</code> - Contains dynamic parameters from the
                  route
                </li>
                <li>
                  <code>query</code> - Contains query parameters from the URL
                </li>
              </ul>

              <Alert className="not-prose">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  Both <code>params</code> and <code>query</code> are
                  automatically passed to your components. You don't need to
                  extract them manually.
                </AlertDescription>
              </Alert>
            </section>

            <section id="basic-dynamic">
              <h2>Basic Dynamic Routes</h2>
              <p>
                Dynamic routes use square brackets <code>[param]</code> in
                folder names. The parameter value is extracted from the URL and
                passed as <code>params.param</code>.
              </p>

              <div className="not-prose mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Route className="h-4 w-4" />
                      Route: <code>/blog/[id]</code>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">
                      File: <code>src/blog/[id]/page.tsx</code>
                    </p>
                    <p className="text-sm">
                      URL <code>/blog/123</code> →{" "}
                      <code>{`{ params: { id: "123" } }`}</code>
                    </p>
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
  return (
    <article>
      <h1>Blog Post ID: {params.id}</h1>
      <p>This is blog post number {params.id}</p>
    </article>
  );
}`}</CodeBlock>

              <h3>Multiple Dynamic Parameters</h3>
              <CodeBlock language="typescript">{`// src/blog/[category]/[id]/page.tsx
"use client";

export default function BlogPost({ 
  params 
}: { 
  params: { category: string; id: string } 
}) {
  return (
    <article>
      <h1>Post {params.id} in {params.category}</h1>
      <p>Category: {params.category}</p>
      <p>Post ID: {params.id}</p>
    </article>
  );
}`}</CodeBlock>
              <p>
                URL <code>/blog/tech/123</code> →{" "}
                <code>{`{ params: { category: "tech", id: "123" } }`}</code>
              </p>
            </section>

            <section id="optional-dynamic">
              <h2>Optional Dynamic Routes</h2>
              <p>
                Optional dynamic routes use double square brackets{" "}
                <code>[[param]]</code> and match both with and without the
                parameter.
              </p>

              <div className="not-prose mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Route className="h-4 w-4" />
                      Route: <code>/blog/[[category]]</code>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p>
                        URL <code>/blog</code> →{" "}
                        <code>{`{ params: { category: undefined } }`}</code>
                      </p>
                      <p>
                        URL <code>/blog/tech</code> →{" "}
                        <code>{`{ params: { category: "tech" } }`}</code>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <CodeBlock language="typescript">{`// src/blog/[[category]]/page.tsx
"use client";

export default function BlogCategory({ 
  params 
}: { 
  params: { category?: string } 
}) {
  return (
    <div>
      <h1>
        {params.category 
          ? \`Category: \${params.category}\` 
          : 'All Blog Posts'
        }
      </h1>
      {params.category ? (
        <p>Showing posts in {params.category}</p>
      ) : (
        <p>Showing all blog posts</p>
      )}
    </div>
  );
}`}</CodeBlock>
            </section>

            <section id="catch-all">
              <h2>Catch-All Routes</h2>
              <p>
                Catch-all routes use <code>[...param]</code> and capture all
                remaining URL segments as an array.
              </p>

              <div className="not-prose mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Route className="h-4 w-4" />
                      Route: <code>/wiki/[...slug]</code>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p>
                        URL <code>/wiki/a</code> →{" "}
                        <code>{`{ params: { slug: ["a"] } }`}</code>
                      </p>
                      <p>
                        URL <code>/wiki/a/b</code> →{" "}
                        <code>{`{ params: { slug: ["a", "b"] } }`}</code>
                      </p>
                      <p>
                        URL <code>/wiki/a/b/c</code> →{" "}
                        <code>{`{ params: { slug: ["a", "b", "c"] } }`}</code>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <CodeBlock language="typescript">{`// src/wiki/[...slug]/page.tsx
"use client";

export default function WikiPage({ 
  params 
}: { 
  params: { slug: string[] } 
}) {
  const path = params.slug.join('/');
  
  return (
    <div>
      <h1>Wiki: {path}</h1>
      <nav>
        <ol>
          {params.slug.map((segment, index) => (
            <li key={index}>
              {index > 0 && ' > '}
              {segment}
            </li>
          ))}
        </ol>
      </nav>
      <p>Full path: /{path}</p>
    </div>
  );
}`}</CodeBlock>
            </section>

            <section id="optional-catch-all">
              <h2>Optional Catch-All Routes</h2>
              <p>
                Optional catch-all routes use <code>[[...param]]</code> and
                match both the parent route and any nested paths.
              </p>

              <div className="not-prose mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Route className="h-4 w-4" />
                      Route: <code>/docs/[[...slug]]</code>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p>
                        URL <code>/docs</code> →{" "}
                        <code>{`{ params: { slug: [] } }`}</code>
                      </p>
                      <p>
                        URL <code>/docs/getting-started</code> →{" "}
                        <code>{`{ params: { slug: ["getting-started"] } }`}</code>
                      </p>
                      <p>
                        URL <code>/docs/api/reference</code> →{" "}
                        <code>{`{ params: { slug: ["api", "reference"] } }`}</code>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <CodeBlock language="typescript">{`// src/docs/[[...slug]]/page.tsx
"use client";

export default function DocsPage({ 
  params 
}: { 
  params: { slug: string[] } 
}) {
  const isHomePage = params.slug.length === 0;
  const currentPath = params.slug.join('/');
  
  return (
    <div>
      {isHomePage ? (
        <h1>Documentation Home</h1>
      ) : (
        <>
          <h1>Docs: {currentPath}</h1>
          <nav>
            <a href="/docs">← Back to Docs</a>
          </nav>
        </>
      )}
      
      <div>
        <h2>Current Path Segments:</h2>
        {params.slug.length === 0 ? (
          <p>No path segments (home page)</p>
        ) : (
          <ul>
            {params.slug.map((segment, index) => (
              <li key={index}>{index + 1}. {segment}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}`}</CodeBlock>
            </section>

            <section id="query-parameters">
              <h2>Query Parameters</h2>
              <p>
                Query parameters from the URL are automatically passed to your
                components as the <code>query</code> prop.
              </p>

              <div className="not-prose mb-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Code className="h-4 w-4" />
                      Query Parameter Examples
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-1 text-sm">
                      <p>
                        URL <code>/search?q=react</code> →{" "}
                        <code>{`{ query: { q: "react" } }`}</code>
                      </p>
                      <p>
                        URL <code>/blog?category=tech&sort=date</code> →{" "}
                        <code>{`{ query: { category: "tech", sort: "date" } }`}</code>
                      </p>
                      <p>
                        URL <code>/products?page=2&limit=10</code> →{" "}
                        <code>{`{ query: { page: "2", limit: "10" } }`}</code>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <CodeBlock language="typescript">{`// src/search/page.tsx
"use client";

export default function SearchPage({ 
  query 
}: { 
  query: { 
    q?: string; 
    category?: string; 
    sort?: string; 
  } 
}) {
  return (
    <div>
      <h1>Search Results</h1>
      {query.q && <p>Searching for: "{query.q}"</p>}
      {query.category && <p>Category: {query.category}</p>}
      {query.sort && <p>Sort by: {query.sort}</p>}
      
      {!query.q && (
        <p>Enter a search term to get started</p>
      )}
    </div>
  );
}`}</CodeBlock>

              <h3>Combining Params and Query</h3>

              <CodeBlock language="typescript">{`// src/blog/[id]/page.tsx
"use client";

export default function BlogPost({ 
  params,
  query 
}: { 
  params: { id: string };
  query: { 
    comment?: string; 
    highlight?: string; 
  };
}) {
  return (
    <article>
      <h1>Blog Post: {params.id}</h1>
      
      {query.highlight && (
        <div className="bg-yellow-100 p-2 rounded">
          <p>Highlighting: {query.highlight}</p>
        </div>
      )}
      
      {query.comment && (
        <div className="bg-blue-100 p-2 rounded">
          <p>Jump to comment: {query.comment}</p>
        </div>
      )}
      
      <div>Blog post content...</div>
    </article>
  );
}`}</CodeBlock>
              <p>
                URL <code>/blog/123?highlight=react&comment=5</code> will show
                both the post and highlight/comment information.
              </p>
            </section>

            <section id="usage-examples">
              <h2>Usage Examples</h2>

              <h3>E-commerce Product Page</h3>

              <CodeBlock language="typescript">{`// src/products/[category]/[id]/page.tsx
"use client";

export default function ProductPage({ 
  params,
  query 
}: { 
  params: { category: string; id: string };
  query: { 
    variant?: string; 
    size?: string; 
    color?: string; 
  };
}) {
  return (
    <div>
      <nav>
        <a href="/products">Products</a> > 
        <a href={\`/products/\${params.category}\`}>{params.category}</a>
      </nav>
      
      <h1>Product {params.id}</h1>
      <p>Category: {params.category}</p>
      
      {query.variant && <p>Variant: {query.variant}</p>}
      {query.size && <p>Size: {query.size}</p>}
      {query.color && <p>Color: {query.color}</p>}
    </div>
  );
}`}</CodeBlock>

              <h3>Documentation with Nested Paths</h3>

              <CodeBlock language="typescript">{`// src/docs/[[...path]]/page.tsx
"use client";

export default function DocsPage({ 
  params,
  query 
}: { 
  params: { path: string[] };
  query: { 
    search?: string; 
    version?: string; 
  };
}) {
  const isHome = params.path.length === 0;
  const currentSection = params.path[0];
  const currentPage = params.path.slice(1).join('/');
  
  return (
    <div>
      <header>
        <h1>
          {isHome ? 'Documentation' : \`Docs: \${params.path.join(' > ')}\`}
        </h1>
        {query.version && (
          <span className="badge">Version: {query.version}</span>
        )}
      </header>
      
      {query.search && (
        <div className="search-highlight">
          <p>Search results for: "{query.search}"</p>
        </div>
      )}
      
      <nav>
        {!isHome && (
          <a href="/docs">← Back to Documentation</a>
        )}
      </nav>
      
      <main>
        {isHome ? (
          <p>Welcome to the documentation</p>
        ) : (
          <div>
            <p>Section: {currentSection}</p>
            {currentPage && <p>Page: {currentPage}</p>}
          </div>
        )}
      </main>
    </div>
  );
}`}</CodeBlock>

              <h3>User Profile with Optional Sections</h3>

              <CodeBlock language="typescript">{`// src/users/[id]/[[...section]]/page.tsx
"use client";

export default function UserPage({ 
  params,
  query 
}: { 
  params: { id: string; section?: string[] };
  query: { tab?: string; edit?: string };
}) {
  const currentSection = params.section?.[0] || 'profile';
  const subsection = params.section?.slice(1).join('/');
  
  return (
    <div>
      <h1>User {params.id}</h1>
      
      <nav>
        <a href={\`/users/\${params.id}\`}>Profile</a>
        <a href={\`/users/\${params.id}/posts\`}>Posts</a>
        <a href={\`/users/\${params.id}/settings\`}>Settings</a>
      </nav>
      
      <main>
        <h2>Current Section: {currentSection}</h2>
        {subsection && <p>Subsection: {subsection}</p>}
        {query.tab && <p>Active Tab: {query.tab}</p>}
        {query.edit && <p>Edit Mode: {query.edit}</p>}
      </main>
    </div>
  );
}`}</CodeBlock>
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
