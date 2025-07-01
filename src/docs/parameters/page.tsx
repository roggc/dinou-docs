"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Fragment } from "react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "examples", title: "Examples", level: 2 },
  { id: "route-patterns", title: "Route Patterns Overview", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Dynamic and Query Parameters
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn how the <code>params</code> and <code>query</code> props
              work in Dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Pages, layouts, and not found components in Dinou receive{" "}
                <code>params</code> and <code>query</code> props.
              </p>
              <ul>
                <li>
                  <strong>params</strong> contains dynamic route segments like{" "}
                  <code>{`{ id: "123" }`}</code> for <code>/blog/[id]</code>.
                </li>
                <li>
                  <strong>query</strong> contains query parameters from the URL
                  such as <code>{`?sort=asc`}</code>.
                </li>
              </ul>
            </section>

            <section id="examples">
              <h2>Examples</h2>

              <h3>
                Dynamic Parameters (<code>params</code>)
              </h3>
              <ul>
                <li>
                  <code>/blog/[id]/page.tsx</code> → <code>/blog/123</code>{" "}
                  passes <code>{`{ params: { id: "123" } }`}</code>.
                </li>
                <li>
                  <code>/wiki/[...slug]/page.tsx</code> → <code>/wiki/a/b</code>{" "}
                  passes <code>{`{ params: { slug: ["a", "b"] } }`}</code>.
                </li>
                <li>
                  <code>/blog/[[category]]/page.tsx</code>:
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
                </li>
                <li>
                  <code>/wiki/[[...slug]]/page.tsx</code>:
                  <ul>
                    <li>
                      <code>/wiki</code> →{" "}
                      <code>{`{ params: { slug: [] } }`}</code>
                    </li>
                    <li>
                      <code>/wiki/a/b</code> →{" "}
                      <code>{`{ params: { slug: ["a", "b"] } }`}</code>
                    </li>
                  </ul>
                </li>
              </ul>

              <h3>
                Query Parameters (<code>query</code>)
              </h3>
              <ul>
                <li>
                  <code>/blog/123?category=tech</code> →{" "}
                  <code>{`{ query: { category: "tech" }, params: { id: "123" } }`}</code>
                </li>
                <li>
                  <code>/search?term=react&page=2</code> →{" "}
                  <code>{`{ query: { term: "react", page: "2" }, params: {} }`}</code>
                </li>
                <li>
                  <code>/blog/tech?sort=asc</code> →{" "}
                  <code>{`{ query: { sort: "asc" }, params: { category: "tech" } }`}</code>
                </li>
                <li>
                  <code>/wiki/a/b?lang=en</code> →{" "}
                  <code>{`{ query: { lang: "en" }, params: { slug: ["a", "b"] } }`}</code>
                </li>
              </ul>

              <h3>Example Usage</h3>
              <CodeBlock language="typescript">
                {`// src/blog/[id]/page.tsx
"use client";

export default function Page({
  params,
  query,
}: {
  params: { id: string };
  query: { category: string | undefined; sort: string | undefined };
}) {
  return (
    <div>
      <h1>Blog ID: {params.id}</h1>
      <h2>Category: {query.category ?? "none"}</h2>
      <p>Sort Order: {query.sort ?? "default"}</p>
    </div>
  );
}`}
              </CodeBlock>
            </section>
            <section id="route-patterns" className="mt-10">
              <h2 className="text-2xl font-semibold mb-4">
                Route Patterns Overview
              </h2>
              <p className="mb-4">
                This grid summarizes how <code>params</code> and{" "}
                <code>query</code> are populated depending on the route and the
                accessed URL.
              </p>

              <div className="overflow-x-auto">
                <div className="grid min-w-[640px] grid-cols-4 text-sm border-t border-border">
                  <div className="font-semibold py-2 px-2 border-b border-border">
                    Route Pattern
                  </div>
                  <div className="font-semibold py-2 px-2 border-b border-border">
                    Example URL
                  </div>
                  <div className="font-semibold py-2 px-2 border-b border-border">
                    params
                  </div>
                  <div className="font-semibold py-2 px-2 border-b border-border">
                    query
                  </div>

                  {[
                    {
                      route: "/blog/[id]",
                      url: "/blog/123",
                      params: `{ id: "123" }`,
                      query: `{}`,
                    },
                    {
                      route: "/blog/[id]",
                      url: "/blog/123?category=tech",
                      params: `{ id: "123" }`,
                      query: `{ category: "tech" }`,
                    },
                    {
                      route: "/wiki/[...slug]",
                      url: "/wiki/a/b",
                      params: `{ slug: ["a", "b"] }`,
                      query: `{}`,
                    },
                    {
                      route: "/wiki/[...slug]",
                      url: "/wiki/a/b?lang=en",
                      params: `{ slug: ["a", "b"] }`,
                      query: `{ lang: "en" }`,
                    },
                    {
                      route: "/blog/[[category]]",
                      url: "/blog",
                      params: `{ category: undefined }`,
                      query: `{}`,
                    },
                    {
                      route: "/blog/[[category]]",
                      url: "/blog/tech?sort=asc",
                      params: `{ category: "tech" }`,
                      query: `{ sort: "asc" }`,
                    },
                    {
                      route: "/wiki/[[...slug]]",
                      url: "/wiki",
                      params: `{ slug: [] }`,
                      query: `{}`,
                    },
                    {
                      route: "/wiki/[[...slug]]",
                      url: "/wiki/a/b",
                      params: `{ slug: ["a", "b"] }`,
                      query: `{}`,
                    },
                    {
                      route: "/search",
                      url: "/search?term=react&page=2",
                      params: `{}`,
                      query: `{ term: "react", page: "2" }`,
                    },
                    {
                      route: "/search",
                      url: "/search",
                      params: `{}`,
                      query: `{}`,
                    },
                  ].map((row, idx) => (
                    <Fragment key={idx}>
                      <div className="border-b border-border py-2 px-2 font-mono break-words">
                        {row.route}
                      </div>
                      <div className="border-b border-border py-2 px-2 font-mono break-words">
                        {row.url}
                      </div>
                      <div className="border-b border-border py-2 px-2 font-mono break-words">
                        {row.params}
                      </div>
                      <div className="border-b border-border py-2 px-2 font-mono break-words">
                        {row.query}
                      </div>
                    </Fragment>
                  ))}
                </div>
              </div>
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
