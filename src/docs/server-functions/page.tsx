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
            <h1 className="text-3xl font-bold mb-2">Server Functions</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to define and use Server Functions in Dinou.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Server Functions in Dinou are functions executed on the server.
                To define one, use the <code>"use server";</code> directive at
                the top of the file where the function is declared.
              </p>
              <p>
                Server Functions can be invoked from both Server Components and
                Client Components, and they can even{" "}
                <strong>return Client Components</strong>.
              </p>

              <h3>Example</h3>
              <CodeBlock language="typescript" containerClassName="mb-2">
                {`"use server";

export async function doSomething(myParam, { req, res }) {
  // Access Express request and response objects
  console.log(req.cookies);
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: true,
  });

  // Perform server-side logic
  return \`Received: \${myParam}\`;
}`}
              </CodeBlock>

              <p>
                In the example above, the <code>doSomething</code> function is a
                Server Function. It should be called only with{" "}
                <code>myParam</code> as its argument. The additional{" "}
                <code>{`{ req, res }`}</code> parameter is automatically
                provided by Dinou as the last argument.
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
