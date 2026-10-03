"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import {
  Zap,
  Server,
  Sparkles,
  ArrowRightLeft,
  ShieldCheck,
  Lock,
  Cookie,
  RefreshCw,
  CheckCircle2,
  FileCode,
  ArrowRight,
  Send,
  Sliders,
  Layers,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "overview",
    title: "Overview & 'use server' Directive",
    level: 2,
  },
  {
    id: "component-vs-data",
    title: "1. Returning JSX Components vs Data",
    level: 2,
  },
  {
    id: "suspense-integration",
    title: "2. React 19 Suspense & use() Integration",
    level: 2,
  },
  {
    id: "server-components-usage",
    title: "2.1. In Server Components (Async / Await)",
    level: 3,
  },
  {
    id: "client-components-usage",
    title: "2.2. In Client Components (with use())",
    level: 3,
  },
  {
    id: "server-actions",
    title: "3. Server Actions & Form Mutations",
    level: 2,
  },
  {
    id: "progressive-enhancement",
    title: "3.1. Native Progressive Enhancement",
    level: 3,
  },
  {
    id: "react-19-form-hooks",
    title: "3.2. React 19 Hooks: useActionState & useFormStatus",
    level: 3,
  },
  {
    id: "optimistic-updates",
    title: "3.3. Optimistic Updates with useOptimistic",
    level: 3,
  },
  {
    id: "request-context",
    title: "4. Request Context, Cookies & Headers (getContext)",
    level: 2,
  },
  {
    id: "reading-request",
    title: "4.1. Reading Query, Headers & Cookies",
    level: 3,
  },
  {
    id: "mutating-cookies",
    title: "4.2. Setting & Clearing Cookies",
    level: 3,
  },
  {
    id: "redirects",
    title: "5. Redirections (redirect)",
    level: 2,
  },
  {
    id: "cache-revalidation",
    title: "6. Cache Revalidation (revalidatePath & revalidateTag)",
    level: 2,
  },
  {
    id: "security-best-practices",
    title: "7. Security & Input Validation",
    level: 2,
  },
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
                Server Functions &amp; Actions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Execute asynchronous server logic directly from your components
              with seamless Flight RPC. Dinou uniquely allows Server Functions
              to return live, rendered React components as well as serializable
              data, with native React 19 primitives and progressive enhancement.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview &amp; &quot;use server&quot; Directive</h2>
              <p>
                Server Functions are asynchronous JavaScript/TypeScript functions
                that run exclusively in the Node.js server runtime. You declare
                them by adding the <code>&quot;use server&quot;</code> directive at
                the top of an action file or within an async function scope.
              </p>

              <div className="grid gap-6 md:grid-cols-3 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <Server className="h-5 w-5" />
                      <span>Zero API Boilerplate</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    No manual route handlers, <code>fetch()</code> boilerplate,
                    or JSON serializing required. Dinou generates typed RPC
                    endpoints automatically.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-purple-600 dark:text-purple-400">
                      <Sparkles className="h-5 w-5" />
                      <span>JSX &amp; Data Returns</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Unlike standard RPCs that only return JSON, Dinou Server
                    Functions can return fully rendered React components streamed
                    over the wire.
                  </CardContent>
                </Card>

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20">
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                      <ShieldCheck className="h-5 w-5" />
                      <span>Security &amp; Secrets</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Secret keys, database connections, and ORM calls are never
                    bundled into the client-side JavaScript chunk.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 1. Component vs Data */}
            <section
              id="component-vs-data"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                1. Returning JSX Components vs Data
              </h3>
              <p>
                Dinou provides the flexibility to return either raw serializable
                data (for form state and mutations) or rendered JSX component trees
                (for on-demand UI streaming):
              </p>

              <div className="space-y-6">
                <div>
                  <h4 className="text-base font-semibold mb-2">
                    Pattern A: Returning a Rendered React Component (UI Streaming)
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    The server performs database queries, renders the component
                    tree with Server and Client components, and returns a live RSC
                    payload:
                  </p>
                  <CodeBlock
                    language="tsx"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`// src/actions/get-post-card.tsx
"use server";

import db from "@/lib/db";
import { PostCard } from "@/components/post-card";

export async function getPostCard(postId: string) {
  const post = await db.posts.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");

  // Returns a rendered JSX component directly over Flight RPC!
  return <PostCard post={post} />;
}`}
                  </CodeBlock>
                </div>

                <div>
                  <h4 className="text-base font-semibold mb-2">
                    Pattern B: Returning Serializable Data (Mutations &amp; State)
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Useful for form mutations, validation results, and status
                    messages:
                  </p>
                  <CodeBlock
                    language="typescript"
                    containerClassName="w-full overflow-hidden rounded-lg"
                  >
{`// src/actions/subscribe.ts
"use server";

import db from "@/lib/db";

export async function subscribeNewsletter(email: string) {
  if (!email || !email.includes("@")) {
    return { success: false, error: "Invalid email address" };
  }

  await db.subscribers.create({ data: { email } });
  return { success: true, message: "Welcome to the newsletter!" };
}`}
                  </CodeBlock>
                </div>
              </div>
            </section>

            {/* 2. Suspense Integration */}
            <section
              id="suspense-integration"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                2. React 19 Suspense &amp; <code>use()</code> Integration
              </h3>
              <p>
                Dinou relies entirely on pure <strong>React 19 primitives</strong>{" "}
                (<code>&lt;Suspense&gt;</code> and <code>use()</code>) without
                requiring heavy external state management libraries for async data
                fetching.
              </p>

              {/* 2.1 In Server Components */}
              <section
                id="server-components-usage"
                className="mt-6 scroll-mt-20"
              >
                <h4>2.1. In Server Components (Async / Await)</h4>
                <p>
                  In Server Components, you can directly <code>await</code> Server
                  Functions inside an async component wrapped in React&apos;s
                  native <code>&lt;Suspense&gt;</code>. React streams HTML
                  progressively as promises resolve:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/blog/page.tsx
import { Suspense } from "react";
import { getPostCard } from "@/actions/get-post-card";

async function PostSlot({ id }: { id: string }) {
  // Directly awaited on the server
  return await getPostCard(id);
}

export default function BlogPage() {
  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Featured Story</h1>
      
      {/* Native React 19 Suspense fallback */}
      <Suspense fallback={<div className="skeleton h-48 w-full rounded" />}>
        <PostSlot id="post-101" />
      </Suspense>
    </section>
  );
}`}
                </CodeBlock>
              </section>

              {/* 2.2 In Client Components */}
              <section
                id="client-components-usage"
                className="mt-8 scroll-mt-20"
              >
                <h4>2.2. In Client Components (with <code>use()</code>)</h4>
                <p>
                  When calling Server Functions from Client Components, the call
                  returns a standard JavaScript Promise over Flight RPC. In React
                  19, you read this promise with the native <code>use()</code>{" "}
                  hook inside a <code>&lt;Suspense&gt;</code> boundary:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/post-viewer.tsx
"use client";

import { useState, use, Suspense } from "react";
import { getPostCard } from "@/actions/get-post-card";

function PostStream({ promise }: { promise: Promise<React.ReactNode> }) {
  // Pure React 19 'use()' unrolls the promise within Suspense
  const content = use(promise);
  return <>{content}</>;
}

export default function PostViewer() {
  const [postId, setPostId] = useState("post-1");
  const [postPromise, setPostPromise] = useState(() => getPostCard("post-1"));

  const loadPost = (id: string) => {
    setPostId(id);
    setPostPromise(getPostCard(id));
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => loadPost("post-1")} className="btn">Post 1</button>
        <button onClick={() => loadPost("post-2")} className="btn">Post 2</button>
      </div>

      {/* Re-suspends cleanly on promise update */}
      <Suspense key={postId} fallback={<p>Streaming post from server...</p>}>
        <PostStream promise={postPromise} />
      </Suspense>
    </div>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 3. Server Actions */}
            <section
              id="server-actions"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                3. Server Actions &amp; Form Mutations
              </h3>
              <p>
                Server Functions passed to the <code>action</code> prop of a{" "}
                <code>&lt;form&gt;</code> or <code>formAction</code> of a button
                act as <strong>Server Actions</strong>.
              </p>

              {/* 3.1 Progressive Enhancement */}
              <section
                id="progressive-enhancement"
                className="mt-6 scroll-mt-20"
              >
                <h4>3.1. Native Progressive Enhancement</h4>
                <p>
                  Dinou supports Server Actions in both <strong>Server Components</strong>{" "}
                  and <strong>Client Components</strong>. When defined in a Server
                  Component, forms submit and mutate data via standard HTTP POST
                  even if JavaScript is disabled or still downloading in the browser:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/newsletter/page.tsx
// Server Component (No "use client" needed!)
import { subscribeNewsletter } from "@/actions/subscribe";

export default function NewsletterPage() {
  async function action(formData: FormData) {
    "use server";
    const email = formData.get("email") as string;
    await subscribeNewsletter(email);
  }

  return (
    <form action={action} className="flex gap-2">
      <input name="email" type="email" placeholder="name@domain.com" required className="input" />
      <button type="submit" className="btn-primary">Subscribe</button>
    </form>
  );
}`}
                </CodeBlock>
              </section>

              {/* 3.2 React 19 Hooks */}
              <section
                id="react-19-form-hooks"
                className="mt-8 scroll-mt-20"
              >
                <h4>
                  3.2. React 19 Hooks: <code>useActionState</code> &amp;{" "}
                  <code>useFormStatus</code>
                </h4>
                <p>
                  For rich interactive forms with validation feedback and loading
                  spinners, use React 19&apos;s standard hooks:
                </p>

                <div className="grid gap-6 md:grid-cols-2 not-prose my-4">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                        <Sliders className="h-5 w-5" />
                        <span>useActionState (React 19)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Captures the returned state (errors, success payload) and
                      pending status of the Server Action across submissions.
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
                        <Zap className="h-5 w-5" />
                        <span>useFormStatus (react-dom)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm text-muted-foreground">
                      Reads the pending submission status of the parent{" "}
                      <code>&lt;form&gt;</code> without prop drilling.
                    </CardContent>
                  </Card>
                </div>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg mt-4"
                >
{`// src/components/create-post-form.tsx
"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { createPostAction, type FormState } from "@/actions/posts";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn-primary">
      {pending ? "Saving..." : "Publish Post"}
    </button>
  );
}

const initialState: FormState = { success: false, message: "" };

export function CreatePostForm() {
  const [state, formAction, isPending] = useActionState(createPostAction, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      {state.message && (
        <div className={state.success ? "text-green-500" : "text-red-500"}>
          {state.message}
        </div>
      )}

      <input name="title" placeholder="Post title" required className="input" />
      <textarea name="content" placeholder="Write content..." required className="textarea" />
      
      <SubmitButton />
    </form>
  );
}`}
                </CodeBlock>
              </section>

              {/* 3.3 Optimistic Updates */}
              <section
                id="optimistic-updates"
                className="mt-8 scroll-mt-20"
              >
                <h4>3.3. Optimistic Updates with <code>useOptimistic</code></h4>
                <p>
                  With React 19&apos;s <code>useOptimistic</code>, you can update
                  the user interface immediately before the server responds:
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/components/like-button.tsx
"use client";

import { useOptimistic, useTransition } from "react";
import { toggleLikeAction } from "@/actions/likes";

export function LikeButton({ postId, initialLikes }: { postId: string; initialLikes: number }) {
  const [isPending, startTransition] = useTransition();
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(
    initialLikes,
    (current, update: number) => current + update
  );

  const handleClick = () => {
    startTransition(async () => {
      setOptimisticLikes(1); // Optimistically increment
      await toggleLikeAction(postId);
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending} className="btn-like">
      ❤️ {optimisticLikes}
    </button>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 4. Request Context */}
            <section
              id="request-context"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                4. Request Context, Cookies &amp; Headers (<code>getContext</code>)
              </h3>
              <p>
                Dinou provides <code>getContext()</code> (exported from{" "}
                <code>&quot;dinou&quot;</code>) to access the underlying request
                and response lifecycle synchronously within any Server Function
                or SSR component.
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-6">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <Cookie className="h-5 w-5 text-amber-500" />
                  <span>RequestContextStore API</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 list-disc pl-4">
                  <li>
                    <code>context.req.cookies</code>: Dictionary of incoming
                    client cookies (e.g. <code>cookies[&quot;auth_token&quot;]</code>).
                  </li>
                  <li>
                    <code>context.req.headers</code>: Incoming HTTP headers
                    dictionary.
                  </li>
                  <li>
                    <code>context.req.query</code>: URL search parameters.
                  </li>
                  <li>
                    <code>context.res.cookie(name, value, options)</code>: Sets an
                    HTTP cookie with options (<code>httpOnly</code>,{" "}
                    <code>secure</code>, <code>maxAge</code>, etc.).
                  </li>
                  <li>
                    <code>context.res.clearCookie(name, options)</code>: Clears a
                    cookie from the client.
                  </li>
                </ul>
              </div>

              {/* 4.1 Reading */}
              <section id="reading-request" className="mt-6 scroll-mt-20">
                <h4>4.1. Reading Query, Headers &amp; Cookies</h4>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/actions/auth-check.ts
"use server";

import { getContext } from "dinou";

export async function getCurrentUser() {
  const context = getContext();
  if (!context) return null;

  const sessionToken = context.req.cookies["session_token"];
  const userAgent = context.req.headers["user-agent"];

  if (!sessionToken) return null;
  return await verifySession(sessionToken);
}`}
                </CodeBlock>
              </section>

              {/* 4.2 Mutating Cookies */}
              <section id="mutating-cookies" className="mt-8 scroll-mt-20">
                <h4>4.2. Setting &amp; Clearing Cookies</h4>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
{`// src/actions/login.ts
"use server";

import { getContext } from "dinou";

export async function loginAction(formData: FormData) {
  const context = getContext();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const session = await authenticateUser(email, password);

  // Set secure HTTP-only session cookie
  context?.res.cookie("session_token", session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7 days in seconds
    path: "/",
  });

  return { success: true };
}

export async function logoutAction() {
  const context = getContext();
  // Clear the cookie upon logout
  context?.res.clearCookie("session_token", { path: "/" });
  return { success: true };
}`}
                </CodeBlock>
              </section>
            </section>

            {/* 5. Redirects */}
            <section id="redirects" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                5. Redirections (<code>redirect</code>)
              </h3>
              <p>
                Dinou provides a universal <code>redirect(destination)</code>{" "}
                utility exported from <code>&quot;dinou&quot;</code>:
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-6">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <ArrowRightLeft className="h-5 w-5 text-indigo-500" />
                  <span>Dual Execution Behavior</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  <li>
                    <strong>Hard HTTP Redirect (307):</strong> If headers have
                    not yet been sent during Server Component rendering or a Server
                    Action POST request, Dinou performs an HTTP 307 redirect.
                  </li>
                  <li>
                    <strong>Soft SPA Navigation:</strong> If response streaming
                    has already started or the call executes in a client context,
                    it returns a lightweight client-side navigation component
                    that transitions without a full page reload.
                  </li>
                </ul>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/actions/checkout.ts
"use server";

import { redirect } from "dinou";
import db from "@/lib/db";

export async function completeOrder(orderId: string) {
  await db.orders.updateStatus(orderId, "PAID");

  // Redirect user to the confirmation page
  return redirect(\`/checkout/\${orderId}/success\`);
}`}
              </CodeBlock>
            </section>

            {/* 6. Cache Revalidation */}
            <section
              id="cache-revalidation"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                6. Cache Revalidation (<code>revalidatePath</code> &amp;{" "}
                <code>revalidateTag</code>)
              </h3>
              <p>
                When a Server Action mutates data in a database, static SSG pages
                and ISR caches might still hold stale content. Dinou provides
                on-demand invalidation utilities exported from{" "}
                <code>&quot;dinou/server&quot;</code>:
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-blue-600 dark:text-blue-400">
                      <FileCode className="h-5 w-5" />
                      <span>revalidatePath(path)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Purges the cached HTML and RSC payload for a specific route
                    path (e.g. <code>/blog</code> or <code>/products/12</code>),
                    forcing it to regenerate.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
                      <RefreshCw className="h-5 w-5" />
                      <span>revalidateTag(tag)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Purges all routes and <code>&lt;DinouCacheSlot&gt;</code>{" "}
                    components associated with that tag (defined via{" "}
                    <code>getCacheTags</code>).
                  </CardContent>
                </Card>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/actions/update-product.ts
"use server";

import { revalidatePath, revalidateTag } from "dinou/server";
import db from "@/lib/db";

export async function updateProductPrice(id: string, newPrice: number) {
  // 1. Mutate database
  await db.products.update({ where: { id }, data: { price: newPrice } });

  // 2. Invalidate specific product path
  await revalidatePath(\`/products/\${id}\`);

  // 3. Invalidate all catalog pages tagged with "catalog"
  await revalidateTag("catalog");

  return { success: true };
}`}
              </CodeBlock>
            </section>

            {/* 7. Security Best Practices */}
            <section
              id="security-best-practices"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                7. Security &amp; Input Validation
              </h3>
              <p>
                Server Functions are exposed as HTTP POST endpoints over the
                network. Always treat them with the same security rigor as
                traditional REST or GraphQL APIs:
              </p>

              <div className="space-y-4 my-6">
                <div className="border rounded-lg p-4 bg-card not-prose">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Lock className="h-5 w-5 text-red-500" />
                    <span>1. Always Authenticate &amp; Authorize</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Never rely on client-side state. Verify session cookies via{" "}
                    <code>getContext()</code> inside the Server Function before
                    executing any sensitive mutation.
                  </p>
                </div>

                <div className="border rounded-lg p-4 bg-card not-prose">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <ShieldCheck className="h-5 w-5 text-emerald-500" />
                    <span>2. Schema Validation (Zod / Valibot)</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Validate all input parameters against a schema validator.
                    Never trust raw values from <code>formData.get(...)</code>.
                  </p>
                </div>
              </div>

              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
{`// src/actions/safe-post-action.ts
"use server";

import { getContext } from "dinou";
import { z } from "zod";
import db from "@/lib/db";

const PostSchema = z.object({
  title: z.string().min(5).max(120),
  content: z.string().min(10),
});

export async function createPostSecure(formData: FormData) {
  // 1. Verify Authentication
  const context = getContext();
  const token = context?.req.cookies["session_token"];
  const user = await verifyUser(token);
  if (!user) {
    return { success: false, error: "Unauthorized access" };
  }

  // 2. Validate Inputs
  const parsed = PostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }

  // 3. Perform mutation securely
  const post = await db.posts.create({
    data: { ...parsed.data, authorId: user.id },
  });

  return { success: true, postId: post.id };
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
