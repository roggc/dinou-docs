"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "setup", title: "Setup", level: 2 },
];

export default function EnvironmentPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Environment Variables</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to use environment variables in Dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Dinou is ready to manage env vars in the code that runs on the
                Server side (Server Functions, Server Components, and{" "}
                <code>getProps</code> function).
              </p>
            </section>

            <section id="setup">
              <h2>Setup</h2>
              <p>
                Create an <code>.env</code> file in your project (and add it to
                your <code>.gitignore</code> file to not expose sensitive data
                to the public) and define there your env variables:
              </p>

              <CodeBlock language="bash">
                {`# .env
# define here your env vars
MY_VAR=my_value`}
              </CodeBlock>

              <h3>Usage Example</h3>
              <CodeBlock language="typescript">
                {`// In Server Components, Server Functions, or getProps
export async function getProps() {
  const myVar = process.env.MY_VAR;
  
  return {
    page: { myVar },
    layout: { title: "My App" }
  };
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
