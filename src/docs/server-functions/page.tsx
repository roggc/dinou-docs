"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  Zap,
  Server,
  Sparkles,
  ArrowRightLeft,
  ShieldCheck,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "server-functions", title: "Server Functions", level: 2 },
  { id: "suspense-integration", title: "Suspense Integration", level: 2 },
  { id: "server-actions", title: "Server Actions (Forms)", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Server Functions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Call server-side logic directly from components with RPC-like
              functions. Dinou uniquely allows Server Functions to return
              rendered Components, not just JSON data.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* SECTION 1: SERVER FUNCTIONS */}
            <section id="server-functions">
              <h2>
                Server Functions (<code>"use server"</code>)
              </h2>
              <p>
                Define functions with the <code>"use server"</code> directive to
                execute server-side logic directly from your components. Unlike
                traditional RPC, these functions can return fully rendered React
                Components.
              </p>
              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/server-functions/get-post.jsx
"use server";
import db from "./db";
import Post from "@/components/post.jsx";

export async function getPost(postId) {
  const data = await db.query("SELECT * FROM posts WHERE id = ?", [postId]);
  
  // 🪄 Returns a rendered Component, not just JSON
  return <Post post={data} />;
}`}
              </CodeBlock>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-purple-500/20 bg-purple-50/50 dark:bg-purple-900/10">
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Sparkles className="h-5 w-5" />
                      <span>Component Returns</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Server Functions can return both Server and Client
                    Components, enabling powerful rendering patterns.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Server className="h-5 w-5 text-blue-500" />
                      <span>Direct Database Access</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm">
                    Access databases, APIs, and sensitive logic securely on the
                    server without exposing it to the client.
                  </CardContent>
                </Card>
              </div>
              <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <span>Server-Side Execution Guarantee</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Server Functions always execute on the server, even when
                  called from Client Components. This keeps sensitive logic and
                  database credentials secure.
                </p>
              </div>
            </section>
            {/* SECTION: SUSPENSE INTEGRATION */}
            <section id="suspense-integration" className="mt-12 pt-8 border-t">
              <h2>Suspense Integration</h2>
              <p>
                Dinou provides built-in integration with <code>react-enhanced-suspense</code> to handle loading fallbacks and data-fetching states smoothly when calling Server Functions.
              </p>

              <h3>1. In Server Components (Direct Promise)</h3>
              <p>
                Inside Server Components, you can call the Server Function directly and pass the returned promise as the child of the <code>Suspense</code> component. Since <code>react-enhanced-suspense</code> behaves identically to React's native <code>Suspense</code> when it is used exactly like it—meaning, without any props besides <code>children</code> and <code>fallback</code>, and without <code>children</code> being a function—it will suspend and render the component once the promise resolves.
              </p>
              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/post-section/page.jsx
// Server Component
import Suspense from "react-enhanced-suspense";
import { getPost } from "@/server-functions/get-post";

export default function Page() {
  return (
    <section>
      <h1>Latest Post</h1>
      
      {/* Pass the promise directly as a child */}
      <Suspense fallback={<p>Loading post on the server...</p>}>
        {getPost("post-1")}
      </Suspense>
    </section>
  );
}`}
              </CodeBlock>

              <h3>2. In Client Components (with <code>resourceId</code>)</h3>
              <p>
                Inside Client Components, to prevent component re-execution loops and allow interactive state updates or refreshes, you must provide a unique <code>resourceId</code> prop to <code>Suspense</code> and pass the function call wrapped inside a callback function as its child.
              </p>
              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/post-viewer/page.jsx
"use client";
import { useState } from "react";
import Suspense from "react-enhanced-suspense";
import { getPost } from "@/server-functions/get-post";

export default function Page() {
  const [postId, setPostId] = useState("post-1");

  return (
    <div>
      <button onClick={() => setPostId("post-2")}>Load Next Post</button>

      {/* Wrap function call in a callback and specify resourceId */}
      <Suspense
        fallback={<p>Loading post on the client...</p>}
        resourceId={\`post-viewer-\${postId}\`}
      >
        {() => getPost(postId)}
      </Suspense>
    </div>
  );
}`}
              </CodeBlock>
            </section>

            {/* SECTION 2: SERVER ACTIONS (NEW) */}
            <section id="server-actions" className="mt-12 pt-8 border-t">
              <h2>Server Actions (Form Mutations)</h2>
              <p>
                Server Functions can also be used as{" "}
                <strong>Server Actions</strong> by passing them to the{" "}
                <code>action</code> prop of a <code>&lt;form&gt;</code>. This
                allows you to handle form submissions and data mutations
                directly on the server without creating API endpoints manually.
              </p>

              <div className="grid gap-4 md:grid-cols-3 not-prose my-6">
                <div className="p-4 rounded-lg border bg-card">
                  <div className="font-semibold flex items-center gap-2 mb-2">
                    <Server className="h-4 w-4 text-blue-500" />
                    Automatic FormData
                  </div>
                  <p className="text-sm text-muted-foreground">
                    The function receives a <code>FormData</code> object
                    containing input values automatically.
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <div className="font-semibold flex items-center gap-2 mb-2">
                    <Zap className="h-4 w-4 text-yellow-500" />
                    Progressive Enhancement
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Forms work natively even before JavaScript loads on the
                    client.
                  </p>
                </div>
                <div className="p-4 rounded-lg border bg-card">
                  <div className="font-semibold flex items-center gap-2 mb-2">
                    <ArrowRightLeft className="h-4 w-4 text-green-500" />
                    Easy Redirects
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Use <code>getContext</code> to redirect the user after a
                    successful mutation.
                  </p>
                </div>
              </div>

              <h3>1. Define the Action</h3>
              <p>
                Create a Server Function that extracts data from{" "}
                <code>FormData</code> and performs the mutation.
              </p>

              <CodeBlock
                language="javascript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/actions/create-post.js
"use server";
import { getContext } from "dinou";
import { addPost } from "@/db/posts.js";

export async function createPost(formData) {
  const context = getContext();
  
  // 1. Extract data
  const title = formData.get("title");
  const content = formData.get("content");

  // 2. Mutate (Save to DB)
  await addPost({ title, content });

  // 3. Redirect
  context?.res?.redirect("/posts");
}`}
              </CodeBlock>

              <h3>2. Use in Client Components</h3>
              <p>
                Pass the function to the form action. You can use the new React
                19 <code>useFormStatus</code> hook to show pending states.
              </p>

              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/new-post/page.jsx
"use client";
import { useFormStatus } from "react-dom";
import { createPost } from "@/actions/create-post";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Saving..." : "Create Post"}
    </button>
  );
}

export default function Page() {
  return (
    <form action={createPost} className="flex flex-col gap-4">
      {/* The 'name' attribute is required for FormData extraction */}
      <input name="title" placeholder="Title" required className="input" />
      <textarea name="content" placeholder="Content" required className="textarea" />

      <SubmitButton />
    </form>
  );
}`}
              </CodeBlock>

              <h3 className="flex items-center gap-3">
                3. Use in Server Components
                <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">
                  v5.0.3+
                </span>
              </h3>
              <p>
                Dinou introduces full native support for using Server Actions inside <strong>Server Components</strong> (without the <code>"use client"</code> directive). This provides progressive enhancement out of the box—the form submits and processes the action on the server even if JavaScript is disabled in the browser.
              </p>

              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/new-post-server/page.jsx
// Note: This is a Server Component (no "use client" directive)
import { createPost } from "@/actions/create-post";

export default function Page() {
  return (
    <form action={createPost} className="flex flex-col gap-4">
      <input name="title" placeholder="Title" required className="input" />
      <textarea name="content" placeholder="Content" required className="textarea" />
      <button type="submit" className="btn-primary">
        Create Post
      </button>
    </form>
  );
}`}
              </CodeBlock>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
