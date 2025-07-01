"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import { Info } from "lucide-react";

const tocItems = [
  { id: "suspense", title: "Fetching with Suspense", level: 2 },
  {
    id: "server-without-suspense",
    title: "Server Fetching without Suspense",
    level: 2,
  },
  { id: "ssg-considerations", title: "SSG Considerations", level: 2 },
  { id: "static-route", title: "Static Route", level: 3 },
  { id: "dynamic-route", title: "Dynamic Route", level: 3 },
  { id: "optional-dynamic-route", title: "Optional Dynamic Route", level: 3 },
  { id: "catch-all-dynamic-route", title: "Catch-All Dynamic Route", level: 3 },
  {
    id: "optional-catch-all-dynamic-route",
    title: "Optional Catch-All Dynamic Route",
    level: 3,
  },
];

export default function DataFetchingPage() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8">
        <div className="container max-w-4xl">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">Data Fetching</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to fetch data in dinou using Suspense and server-side
              methods.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="suspense">
              <h2>Fetching data with Suspense</h2>
              <p>
                We have already seen that data can be fetched on the server with
                the <code>getProps</code> function or within the body of a
                Server Component, but this needs to be accompanied of a
                mechanism of SSG of the page/s to not increase the FCP.
              </p>
              <p>
                There is an alternative that do not increase FCP even when
                rendering dynamically and that is to use <code>Suspense</code>{" "}
                for data fetching, either in the server and in the client.
              </p>

              <h3>Post Component</h3>
              <CodeBlock language="typescript">
                {`// src/posts/post.tsx

"use client";

export type PostType = {
  title: string;
  content: string;
};

export default function Post({ post }: { post: PostType }) {
  return (
    <>
      <h1>{post.title}</h1>
      <div>{post.content}</div>
    </>
  );
}`}
              </CodeBlock>

              <h3>Server Function</h3>
              <CodeBlock language="typescript">
                {`// src/posts/get-post.tsx

"use server";

import Post from "./post";
import type { PostType } from "./post";

export async function getPost() {
  const post = await new Promise<PostType>((r) =>
    setTimeout(
      () => r({ title: "Post Title", content: "Post content" }),
      1000
    )
  );

  return <Post post={post} />;
}`}
              </CodeBlock>

              <h3>Page with Suspense</h3>
              <CodeBlock language="typescript">
                {`// src/posts/page.tsx

"use client";

import { Suspense } from "react";
import { getPost } from "./get-post";
import Post from "./post";
import type { PostType } from "./post";

export default function Page({ data }: { data: string }) {
  const getPost2 = async () => {
    const post = await new Promise<PostType>((r) =>
      setTimeout(
        () => r({ title: "Post Title2", content: "Post content2" }),
        1000
      )
    );

    return <Post post={post} />;
  };

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>{getPost()}</Suspense>
      <Suspense fallback={<div>Loading2...</div>}>{getPost2()}</Suspense>
    </>
  );
}`}
              </CodeBlock>

              <p>
                The same can be done with <code>page.tsx</code> being a Server
                Component.
              </p>
            </section>

            <section id="server-without-suspense">
              <h2>Fetching data in the server without Suspense (revisited)</h2>

              <Alert className="not-prose">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This option is useful for SSG (Static Site Generated) pages.{" "}
                  <strong>
                    When used with dynamic rendering (no SSG) it increases the
                    FCP (First Contentful Paint), that is, when the user sees
                    something rendered on the page
                  </strong>
                  .
                </AlertDescription>
              </Alert>

              <p>
                The recommended way to use it is with <code>page.tsx</code>{" "}
                being a Client Component and defining a{" "}
                <strong>
                  <code>page_functions.ts</code>
                </strong>{" "}
                with{" "}
                <strong>
                  <code>getProps</code>
                </strong>{" "}
                function defined and exported. The other option is to use a
                Server Component for <code>page.tsx</code> instead of a Client
                Component and do the fetch in the body of the Server Component (
                <code>async</code> function) or, what is equivalent, use the{" "}
                <code>getProps</code> function defined and exported in{" "}
                <code>page_functions.ts</code> too.
              </p>

              <p>
                Pages in <strong>static routes</strong> (e.g.{" "}
                <code>/some/route</code>) are statically generated (SSG) if no{" "}
                <code>dynamic</code> function returning <code>true</code> is
                defined and exported in a <code>page_functions.ts</code>.
                Therefore, statically generated pages for static routes will be
                served if no query params are present in the request.{" "}
                <strong>
                  If there are query params pages will be served dynamically
                </strong>
                .
              </p>

              <p>
                Pages in <strong>dynamic routes</strong> (e.g.{" "}
                <code>/[id]</code>, or <code>/[[id]]</code>,{" "}
                <code>[...id]</code>, <code>[[...id]]</code>) are statically
                generated (SSG) if no <code>dynamic</code> function returning{" "}
                <code>true</code> is defined and exported in a{" "}
                <code>page_functions.ts</code>, for those values of the dynamic
                param returned by function <code>getStaticPaths</code> defined
                and exported in <code>page_functions.ts</code>. Again, if{" "}
                <strong>query params</strong> are used in the request of the
                page, then it will be <strong>rendered dynamically</strong>,
                affecting the FCP (increasing it). Or those requests using
                dynamic params not returned by <code>getStaticPaths</code> will
                also be rendered dynamically.
              </p>
            </section>

            <section id="ssg-considerations">
              <h2>SSG Considerations</h2>
              <section id="static-route">
                <h3>Static Route Example</h3>
                <CodeBlock language="typescript" containerClassName="mb-2">
                  {`// src/static/page.tsx

"use client";

export default function Page({ data }: { data: string }) {
  return <>{data}</>;
}`}
                </CodeBlock>

                <CodeBlock language="typescript">
                  {`// src/static/page_functions.ts

export async function getProps() {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(\`data\`), 2000)
  );

  return { page: { data }, layout: { title: data } };
}`}
                </CodeBlock>

                <p>
                  In this case the static generated route will be{" "}
                  <code>/static</code>. If query params are passed to the route
                  (e.g. <code>/static?some-param</code>) the route will be
                  rendered dynamically, increasing the FCP by 2 secs (2000 ms)
                  in this particular case.
                </p>
              </section>
              <section id="dynamic-route">
                <h3>Dynamic Route Example</h3>
                <CodeBlock language="typescript" containerClassName="mb-2">
                  {`// src/dynamic/[name]/page.tsx

"use client";

export default function Page({
  params: { name },
  data,
}: {
  params: { name: string };
  data: string;
}) {
  return (
    <>
      {name}
      {data}
    </>
  );
}`}
                </CodeBlock>

                <CodeBlock language="typescript">
                  {`// src/dynamic/[name]/page_functions.ts

export async function getProps(params: { name: string }) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(\`Hello \${params.name}\`), 2000)
  );

  return { page: { data }, layout: { title: data } };
}

export function getStaticPaths() {
  return ["albert", "johan", "roger", "alex"];
}`}
                </CodeBlock>

                <p>
                  In this case statically generated routes will be{" "}
                  <code>/dynamic/albert</code>, <code>/dynamic/johan</code>,{" "}
                  <code>/dynamic/roger</code>, and <code>/dynamic/alex</code>.{" "}
                  <code>/dynamic</code> will render <code>not_found.tsx</code>{" "}
                  page (the more nested one existing in the route hierarchy) if
                  no <code>page.tsx</code> is defined in this route. Any other
                  route as <code>/dynamic/other-name</code> will be rendered
                  dynamically, increasing the FCP by 2 secs (2000 ms) in this
                  particular case.
                </p>
              </section>
              <section id="optional-dynamic-route">
                <h3>Optional Dynamic Route Example</h3>

                <CodeBlock language="typescript" containerClassName="mb-2">
                  {`// src/optional/[[name]]/page.tsx

"use client";

export default function Page({
  params: { name },
  data,
}: {
  params: { name: string };
  data: string;
}) {
  return (
    <>
      {name}
      {data}
    </>
  );
}`}
                </CodeBlock>

                <CodeBlock language="typescript">
                  {`// src/optional/[[name]]/page_functions.ts

export async function getProps(params: { name: string }) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(\`Hello \${params.name ?? ""}\`), 2000)
  );

  return { page: { data }, layout: { title: data } };
}

export function getStaticPaths() {
  return ["albert", "johan", "roger", "alex"];
}`}
                </CodeBlock>

                <p>
                  In this case, statically generated routes will be{" "}
                  <code>/optional</code>, <code>/optional/albert</code>,{" "}
                  <code>/optional/johan</code>, <code>/optional/roger</code>,
                  and <code>/optional/alex</code>. Any other route like{" "}
                  <code>/optional/other-name</code> will be rendered dynamically
                  at request time, increasing the FCP by 2 seconds (2000 ms) in
                  this example.
                </p>

                <Alert className="not-prose mt-2">
                  <AlertDescription>
                    Unlike non-optional dynamic routes, the base route{" "}
                    <code>/optional</code> also renders the same page component.
                    The <code>name</code> param will be <code>undefined</code>{" "}
                    in that case.
                  </AlertDescription>
                </Alert>

                <Alert className="not-prose mt-2">
                  <AlertDescription>
                    This pattern works equally well with Server Components in{" "}
                    <code>page.tsx</code>. Use <code>async</code> directly in
                    the component if needed.
                  </AlertDescription>
                </Alert>
              </section>
              <section id="catch-all-dynamic-route">
                <h3>Catch-All Dynamic Route Example</h3>

                <CodeBlock language="typescript" containerClassName="mb-2">
                  {`// src/catch-all/[...names]/page.tsx

"use client";

export default function Page({
  params: { names },
  data,
}: {
  params: { names: string[] };
  data: string;
}) {
  return (
    <>
      {names}
      {data}
    </>
  );
}`}
                </CodeBlock>

                <CodeBlock language="typescript">
                  {`// src/catch-all/[...names]/page_functions.ts

export async function getProps(params: { names: string[] }) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(\`Hello \${params.names.join(",")}\`), 2000)
  );

  return { page: { data }, layout: { title: data } };
}

export function getStaticPaths() {
  return [["albert"], ["johan"], ["roger"], ["alex"], ["albert", "johan"]];
}`}
                </CodeBlock>

                <p>
                  In this case, statically generated routes will be{" "}
                  <code>/catch-all/albert</code>, <code>/catch-all/johan</code>,{" "}
                  <code>/catch-all/roger</code>, <code>/catch-all/alex</code>,
                  and <code>/catch-all/albert/johan</code>. Any other route that
                  starts with <code>/catch-all/</code> will be rendered
                  dynamically at request time, increasing the FCP by 2 seconds
                  (2000 ms) in this example.
                </p>

                <Alert className="not-prose mt-2">
                  <AlertDescription>
                    If the user visits <code>/catch-all</code> (i.e., with no
                    segments), the
                    <code>not_found.tsx</code> page will be rendered instead —
                    the most nested one available in the route hierarchy.
                  </AlertDescription>
                </Alert>

                <Alert className="not-prose mt-2">
                  <AlertDescription>
                    This pattern works seamlessly with Server Components in{" "}
                    <code>page.tsx</code>. Use <code>async</code> directly if
                    you need to fetch data from the server.
                  </AlertDescription>
                </Alert>
              </section>
              <section id="optional-catch-all-dynamic-route">
                <h3>Optional Catch-All Dynamic Route Example</h3>

                <CodeBlock language="typescript" containerClassName="mb-2">
                  {`// src/catch-all-optional/[[..names]]/page.tsx

"use client";

export default function Page({
  params: { names },
  data,
}: {
  params: { names: string[] };
  data: string;
}) {
  return (
    <>
      {names}
      {data}
    </>
  );
}`}
                </CodeBlock>

                <CodeBlock language="typescript">
                  {`// src/catch-all-optional/[[..names]]/page_functions.ts

export async function getProps(params: { names: string[] }) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(\`Hello \${params.names.join(",")}\`), 2000)
  );

  return { page: { data }, layout: { title: data } };
}

export function getStaticPaths() {
  return [["albert"], ["johan"], ["roger"], ["alex"], ["albert", "johan"]];
}`}
                </CodeBlock>

                <p>
                  In this case, statically generated routes will be{" "}
                  <code>/catch-all-optional</code>,{" "}
                  <code>/catch-all-optional/albert</code>,{" "}
                  <code>/catch-all-optional/johan</code>,{" "}
                  <code>/catch-all-optional/roger</code>,{" "}
                  <code>/catch-all-optional/alex</code>, and{" "}
                  <code>/catch-all-optional/albert/johan</code>. Any other route
                  starting with <code>/catch-all-optional/</code> will be
                  rendered dynamically, increasing the FCP by 2 seconds (2000
                  ms) in this example.
                </p>

                <Alert className="not-prose mt-2">
                  <AlertDescription>
                    Unlike regular catch-all routes, this variant also handles
                    the base path <code>/catch-all-optional</code> by rendering
                    the page instead of a <code>not_found.tsx</code> fallback.
                    The <code>params.names</code> array will be empty in that
                    case.
                  </AlertDescription>
                </Alert>

                <Alert className="not-prose mt-2">
                  <AlertDescription>
                    This setup also works with <code>page.tsx</code> as a Server
                    Component. Use <code>async</code> directly if you need to
                    fetch data on the server side.
                  </AlertDescription>
                </Alert>
              </section>
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
