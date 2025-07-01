"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [{ id: "overview", title: "Overview", level: 2 }];

export default function Page() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Server Components</h1>
            <p className="text-xl text-muted-foreground">
              Learn about Server Components in dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Server Components in this implementation are distinguished by
                the fact they are <code>async</code> functions. So when defining
                them,{" "}
                <strong>
                  make them <code>async</code> always
                </strong>
                , whether or not they use <code>await</code> in their definition
                or function body. This is necessary for the framework to know
                they are Server Components and execute them.
              </p>

              <h3>Example</h3>
              <CodeBlock language="typescript" containerClassName="mb-2">
                {`// Server Component example
export default async function ServerComponent() {
  // This is a Server Component because it's async
  const data = await fetch('https://api.example.com/data');
  const result = await data.json();
  
  return (
    <div>
      <h1>Server Component</h1>
      <p>{result.message}</p>
    </div>
  );
}`}
              </CodeBlock>

              <CodeBlock language="typescript">
                {`// Also a Server Component (even without await)
export default async function AnotherServerComponent() {
  // Still a Server Component because it's async
  return (
    <div>
      <h1>Another Server Component</h1>
    </div>
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
