"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [{ id: "overview", title: "Overview", level: 2 }];

export default function Page() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Client Components</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to properly define Client Components in Dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Client Components in Dinou must begin with the{" "}
                <code>"use client";</code> directive at the top of the file if
                they are not imported by other client components.
              </p>
              <p>
                This applies to files like <strong>pages</strong>,{" "}
                <strong>layouts</strong>, <strong>not_found.tsx</strong>, and{" "}
                <strong>error.tsx</strong>, since they are entry points and not
                imported by other components directly.
              </p>
              <p>
                <strong>
                  To avoid surprises, it's recommended to include the{" "}
                  <code>"use client";</code> directive in all client components.
                </strong>
              </p>

              <h3>Example</h3>
              <CodeBlock language="typescript" containerClassName="mb-2">
                {`// Client Component page
"use client";

export default function Page() {
  const handleClick = () => {
    alert("This is a client component!");
  };

  return (
    <div>
      <h1>Client Component</h1>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}`}
              </CodeBlock>

              <CodeBlock language="typescript">
                {`// Client Component imported by another client component
"use client";

export function Button({ label }: { label: string }) {
  return <button>{label}</button>;
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
