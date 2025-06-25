import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "programmatic", title: "Programmatic Navigation", level: 2 },
  { id: "anchor-tags", title: "Anchor Tags", level: 2 },
];

export default function NavigationPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Navigation</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to navigate between pages in dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="programmatic">
              <h2>Programmatic Navigation</h2>
              <p>To navigate programmatically between pages you do:</p>

              <CodeBlock language="typescript">
                {`// src/route/page.tsx
"use client";

export default function Page() {
  const handleNavigate = () => {
    window.location.assign("/route-2?foo=bar");
  };

  return (
    <div>
      <button onClick={handleNavigate}>Go to /route-2</button>
    </div>
  );
}`}
              </CodeBlock>
            </section>

            <section id="anchor-tags">
              <h2>Anchor Tags</h2>
              <p>Use anchor tags to allow the user navigate between pages:</p>

              <CodeBlock language="typescript">
                {`// src/page.tsx
export default async function Page() {
  return (
    <>
      <a href="/route-1?foo=bar">go to route-1</a>
    </>
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
