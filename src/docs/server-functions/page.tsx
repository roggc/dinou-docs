import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { Badge } from "@/docs/components/ui/badge";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
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
  Info,
  Globe,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  {
    id: "overview",
    title: "Overview & 'use server' Directive",
    level: 2,
  },
  {
    id: "ui-component-streaming",
    title: "1. Returning Live React Components (UI Streaming)",
    level: 2,
  },
  {
    id: "server-actions",
    title: "2. Server Actions & Form Mutations",
    level: 2,
  },
  {
    id: "server-form-actions",
    title: "2.1. Server Actions in Forms",
    level: 3,
  },
  {
    id: "react-19-form-hooks",
    title: "2.2. React 19 Hooks: useActionState & useFormStatus",
    level: 3,
  },
  {
    id: "optimistic-updates",
    title: "2.3. Optimistic Updates with useOptimistic",
    level: 3,
  },
  {
    id: "request-context",
    title: "3. Request Context, Cookies & Headers (getContext)",
    level: 2,
  },
  {
    id: "reading-request",
    title: "3.1. Reading Query, Headers & Cookies",
    level: 3,
  },
  {
    id: "mutating-cookies",
    title: "3.2. Setting & Clearing Cookies",
    level: 3,
  },
  {
    id: "redirects",
    title: "4. Redirections (redirect)",
    level: 2,
  },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Server Functions & Actions | Dinou Docs</title>
      <meta
        name="description"
        content="Execute asynchronous server logic directly with Flight RPC. Dinou uniquely allows Server Functions to return live, rendered React component trees."
      />
      <link rel="canonical" href="https://dinou.dev/docs/server-functions" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Flight RPC
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Server Functions &amp; Actions
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Execute asynchronous server logic directly from your components
              with seamless Flight RPC. Dinou uniquely allows Server Functions
              to return live, rendered React components as well as serializable
              data, with native React 19 form actions and hooks.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2>Overview &amp; &quot;use server&quot; Directive</h2>
              <p>
                Server Functions are asynchronous JavaScript/TypeScript functions
                that run exclusively in the server runtime. In Dinou, you declare
                them by adding the <code>&quot;use server&quot;</code> directive at
                the top of a dedicated action file (module-level directive).
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-6 min-w-0">
                <Card className="border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 min-w-0">
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

                <Card className="border-purple-500/20 bg-purple-50/30 dark:bg-purple-950/20 min-w-0">
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

                <Card className="border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 min-w-0">
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

            {/* 1. Returning Live React Components (UI Streaming) */}
            <section
              id="ui-component-streaming"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <div id="component-vs-data" className="scroll-mt-20" />
              <div id="suspense-integration" className="scroll-mt-20" />
              <h3>
                1. Returning Live React Components (UI Streaming)
              </h3>
              <p>
                Dinou uniquely allows Server Functions to return fully rendered React component trees directly over Flight RPC. In Server Components, the component is awaited directly inside native <code>&lt;Suspense&gt;</code>; in Client Components, the returned promise is unwrapped with React 19&apos;s <code>use()</code> hook:
              </p>

              <div className="not-prose my-6">
                <TabbedCodeBlock
                  defaultTab="action"
                  tabs={[
                    {
                      id: "action",
                      label: "actions/get-post-card.tsx (Server Function)",
                      language: "tsx",
                      code: `// src/actions/get-post-card.tsx
"use server"; // 👈 Module-level directive in Dinou

import db from "@/lib/db";
import { PostCard } from "@/components/post-card";

export async function getPostCard(postId: string) {
  const post = await db.posts.findUnique({ where: { id: postId } });
  if (!post) throw new Error("Post not found");

  // Returns a rendered JSX component directly over Flight RPC!
  return <PostCard post={post} />;
}`,
                    },
                    {
                      id: "server-comp",
                      label: "blog/page.tsx (Server Component)",
                      language: "tsx",
                      code: `// src/blog/page.tsx
// Server Component: directly await the Server Function with React 19 Suspense
import { Suspense } from "react";
import { getPostCard } from "@/actions/get-post-card";

async function PostSlot({ id }: { id: string }) {
  // Directly awaited on the server during SSR / streaming
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
}`,
                    },
                    {
                      id: "client-comp",
                      label: "blog/page.tsx (Client Component)",
                      language: "tsx",
                      code: `// src/blog/page.tsx
// Client Component: unwrap the Flight RPC promise with React 19 use()
"use client";

import { useState, use, Suspense } from "react";
import { getPostCard } from "@/actions/get-post-card";

function PostStream({ promise }: { promise: Promise<React.ReactNode> }) {
  // Pure React 19 'use()' unrolls the promise within Suspense
  const content = use(promise);
  return <>{content}</>;
}

export default function BlogPage() {
  const [postId, setPostId] = useState("post-1");
  const [postPromise, setPostPromise] = useState(() => getPostCard("post-1"));

  const loadPost = (id: string) => {
    setPostId(id);
    setPostPromise(getPostCard(id));
  };

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-bold">Featured Story</h1>

      <div className="flex gap-2">
        <button onClick={() => loadPost("post-1")} className="btn">Post 1</button>
        <button onClick={() => loadPost("post-2")} className="btn">Post 2</button>
      </div>

      {/* Re-suspends cleanly on promise update */}
      <Suspense key={postId} fallback={<p>Streaming post from server...</p>}>
        <PostStream promise={postPromise} />
      </Suspense>
    </section>
  );
}`,
                    },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose mt-4 text-xs text-muted-foreground min-w-0">
                <div className="border rounded-lg p-3 bg-muted/20 border-border space-y-1 min-w-0">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Server className="h-4 w-4 text-blue-500" />
                    <span>In Server Components (Async / Await)</span>
                  </div>
                  <p>
                    Directly <code>await</code> the Server Function inside an async component. React streams HTML progressively as promises resolve.
                  </p>
                </div>

                <div className="border rounded-lg p-3 bg-muted/20 border-border space-y-1 min-w-0">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Sparkles className="h-4 w-4 text-amber-500" />
                    <span>In Client Components (with <code>use()</code>)</span>
                  </div>
                  <p>
                    Dispatches Flight RPC returning a Promise. React 19&apos;s native <code>use(promise)</code> unrolls it synchronously inside <code>&lt;Suspense&gt;</code> without external state libraries.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Server Actions */}
            <section
              id="server-actions"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                2. Server Actions &amp; Form Mutations
              </h3>
              <p>
                Server Functions passed to the <code>action</code> prop of a{" "}
                <code>&lt;form&gt;</code> or <code>formAction</code> of a button
                act as <strong>Server Actions</strong>.
              </p>

              {/* 2.1 Server Actions in Forms */}
              <section
                id="server-form-actions"
                className="mt-6 scroll-mt-20"
              >
                <h4>2.1. Server Actions in Forms</h4>
                <p>
                  In Dinou, Server Actions are declared in dedicated server files with the <code>&quot;use server&quot;</code> directive at the top. You can pass them directly to the <code>action</code> attribute of a <code>&lt;form&gt;</code> in both <strong>Server Components</strong> and <strong>Client Components</strong>:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="page"
                    tabs={[
                      {
                        id: "page",
                        label: "newsletter/page.tsx (Server Component)",
                        language: "tsx",
                        code: `// src/newsletter/page.tsx
// Server Component (invoking Server Action directly)
import { subscribeNewsletter } from "@/actions/subscribe";

export default function NewsletterPage() {
  return (
    <form action={subscribeNewsletter} className="flex gap-2">
      <input name="email" type="email" placeholder="name@domain.com" required className="input" />
      <button type="submit" className="btn-primary">Subscribe</button>
    </form>
  );
}`,
                      },
                      {
                        id: "action",
                        label: "actions/subscribe.ts (Server Action)",
                        language: "typescript",
                        code: `// src/actions/subscribe.ts
"use server"; // 👈 Required at the module level in Dinou

import db from "@/lib/db";

export async function subscribeNewsletter(formData: FormData) {
  const email = formData.get("email") as string;
  await db.subscribers.create({ data: { email } });
}`,
                      },
                    ]}
                  />
                </div>

                <div className="border rounded-lg p-3 bg-muted/20 border-border text-xs text-muted-foreground space-y-1">
                  <div className="font-semibold text-foreground">💡 Important: Module-Level Directives &amp; Client Execution</div>
                  <p>
                    Dinou requires the <code>&quot;use server&quot;</code> directive to be placed at the <strong>top of the action file</strong> (not inline within function bodies). When a form submits, Dinou&apos;s client runtime transparently dispatches a Flight RPC request (<code>POST /____server_function____</code>) to execute the server action and receive updated UI state.
                  </p>
                </div>

                <div className="border rounded-lg p-3.5 bg-muted/20 border-border text-xs text-muted-foreground space-y-1.5 mt-3">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>What does <code>subscribeNewsletter</code> return? (Understanding <code>void</code> / <code>undefined</code>)</span>
                  </div>
                  <p className="leading-relaxed">
                    This action returns <code>Promise&lt;void&gt;</code>, which resolves to <strong><code>undefined</code></strong>. In pure React 19 form actions (<code>&lt;form action=&#123;subscribeNewsletter&#125;&gt;</code>), this is completely standard for <em>fire-and-forget</em> mutations: the browser submits the form data, the server executes the database write, and no state payload is needed by the UI.
                  </p>
                  <p className="leading-relaxed">
                    <strong>When should a Server Action return a value?</strong> If your UI needs to display interactive feedback (such as <em>&quot;Subscribed successfully!&quot;</em> or validation errors), the action should return a serializable payload (e.g. <code>&#123; success: true, message: &quot;...&quot; &#125;</code>) and be wired to React 19&apos;s <strong><code>useActionState</code></strong> hook (as explained in Section 2.2 below). Other common patterns include performing a server-side <code>redirect()</code> or calling <code>revalidatePath()</code> before completing.
                  </p>
                </div>
              </section>

              {/* 2.2 React 19 Hooks */}
              <section
                id="react-19-form-hooks"
                className="mt-8 scroll-mt-20"
              >
                <h4>
                  2.2. React 19 Hooks: <code>useActionState</code> &amp;{" "}
                  <code>useFormStatus</code>
                </h4>
                <p>
                  For rich interactive forms with validation feedback and loading
                  spinners, use React 19&apos;s standard hooks:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose my-4 min-w-0">
                  <Card className="min-w-0">
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

                  <Card className="min-w-0">
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

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="client"
                    tabs={[
                      {
                        id: "client",
                        label: "create-post-form.tsx (Client Component)",
                        language: "tsx",
                        code: `// src/components/create-post-form.tsx
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
  // useActionState binds the server action to form state and tracks submission
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
}`,
                      },
                      {
                        id: "server",
                        label: "actions/posts.ts (Server Action)",
                        language: "typescript",
                        code: `// src/actions/posts.ts
"use server"; // 👈 Module-level directive required in Dinou

import db from "@/lib/db";

export type FormState = {
  success: boolean;
  message: string;
};

// Server Action receives (prevState, formData) when bound to useActionState
export async function createPostAction(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = (formData.get("title") as string)?.trim();
  const content = (formData.get("content") as string)?.trim();

  if (!title || title.length < 3) {
    return { success: false, message: "Title must be at least 3 characters." };
  }

  if (!content) {
    return { success: false, message: "Content cannot be empty." };
  }

  await db.posts.create({ data: { title, content } });
  return { success: true, message: "Post published successfully!" };
}`,
                      },
                    ]}
                  />
                </div>
              </section>

              {/* 2.3 Optimistic Updates */}
              <section
                id="optimistic-updates"
                className="mt-8 scroll-mt-20"
              >
                <h4>2.3. Optimistic Updates with <code>useOptimistic</code></h4>
                <p>
                  With React 19&apos;s <code>useOptimistic</code>, you can update
                  the user interface immediately before the server responds:
                </p>

                <div className="not-prose my-4">
                  <TabbedCodeBlock
                    defaultTab="client"
                    tabs={[
                      {
                        id: "client",
                        label: "like-button.tsx (Client Component)",
                        language: "tsx",
                        code: `// src/components/like-button.tsx
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
      setOptimisticLikes(1); // Optimistically increment in 0ms on client
      await toggleLikeAction(postId); // Dispatches Server Action via Flight RPC
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending} className="btn-like">
      ❤️ {optimisticLikes}
    </button>
  );
}`,
                      },
                      {
                        id: "server",
                        label: "actions/likes.ts (Server Action)",
                        language: "typescript",
                        code: `// src/actions/likes.ts
"use server"; // 👈 Module-level directive required in Dinou

import db from "@/lib/db";

export async function toggleLikeAction(postId: string) {
  // Updates like count on the database
  await db.posts.update({
    where: { id: postId },
    data: { likes: { increment: 1 } },
  });

  return { success: true };
}`,
                      },
                    ]}
                  />
                </div>

                <div className="border rounded-lg p-3.5 bg-muted/20 border-border text-xs text-muted-foreground space-y-1.5 mt-3">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <Info className="h-4 w-4 text-blue-500" />
                    <span>Why is there no <code>&lt;Suspense&gt;</code> boundary here?</span>
                  </div>
                  <p className="leading-relaxed">
                    <code>&lt;Suspense&gt;</code> only activates when a component <em>suspends</em> (by throwing a pending Promise, such as with <code>React.use(promise)</code> or an async Server Component).
                  </p>
                  <p className="leading-relaxed">
                    In contrast, <strong><code>useOptimistic</code> does the exact opposite of suspending</strong>: it synchronously paints the temporary new value (e.g. switching immediately from <code>10</code> to <code>11</code>) in <strong>0ms</strong> on the client, avoiding loading spinners or skeleton fallbacks entirely while the Server Action runs in the background. It relies strictly on React 19 transitions (<code>useTransition</code> or Form Actions). If the server call succeeds, React seamlessly commits the real server state; if it fails, React automatically rolls back to the initial value with zero boilerplate.
                  </p>
                </div>
              </section>
            </section>

            {/* 3. Request Context */}
            <section
              id="request-context"
              className="mt-12 pt-8 border-t scroll-mt-20"
            >
              <h3>
                3. Request Context, Cookies &amp; Headers (<code>getContext</code>)
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

              {/* 3.1 Reading */}
              <section id="reading-request" className="mt-6 scroll-mt-20">
                <h4>3.1. Reading Query, Headers &amp; Cookies</h4>
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

              {/* 3.2 Mutating Cookies */}
              <section id="mutating-cookies" className="mt-8 scroll-mt-20">
                <h4>3.2. Setting &amp; Clearing Cookies</h4>
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

            {/* 4. Redirects */}
            <section id="redirects" className="mt-12 pt-8 border-t scroll-mt-20">
              <h3>
                4. Redirections (<code>redirect</code>)
              </h3>
              <p>
                Dinou provides a universal <code>redirect(destination)</code>{" "}
                utility exported from <code>&quot;dinou&quot;</code>:
              </p>

              <div className="border rounded-lg p-4 bg-card not-prose my-6">
                <div className="flex items-center gap-2 font-semibold mb-2">
                  <ArrowRightLeft className="h-5 w-5 text-indigo-500" />
                  <span>Universal Execution Behavior</span>
                </div>
                <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-4">
                  <li>
                    <strong>In Server Functions (Soft SPA Navigation):</strong> When called inside a Server Function (e.g. form mutations or RPC calls), Dinou automatically performs a smooth client-side transition to the destination route via the SPA router <strong>without a full page reload</strong>.
                  </li>
                  <li>
                    <strong>In Server Components (Initial SSR):</strong> If headers have not yet been sent, Dinou issues a clean HTTP 302 redirect for SEO and search engine crawlers. If response streaming has already started, it completes the transition on the client upon hydration.
                  </li>
                  <li>
                    <strong>In Client Components (Declarative Redirects):</strong> When called directly in client components during render, it triggers an immediate client router replacement (<code>router.replace()</code>) without reloading the page.
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

  // Automatically navigates the client router to the success page
  return redirect(\`/checkout/\${orderId}/success\`);
}`}
              </CodeBlock>

              {/* Deep Dive Callout Box */}
              <div className="border rounded-lg p-5 bg-muted/20 not-prose my-6 space-y-4 min-w-0">
                <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                  <Sparkles className="h-4 w-4 text-purple-500" />
                  <span>Deep Dive: When are HTTP Headers Sent vs. Unsent in Dinou?</span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  A foundational question when handling redirects across hybrid architectures is: <em>How does Dinou determine whether <code>redirect()</code> issues an HTTP 302 vs. a client-side transition, and is calling <code>redirect()</code> in a Server Component equivalent to invoking it via a Server Function?</em>
                </p>

                {/* The Equivalence Principle */}
                <div className="p-3.5 rounded-md bg-purple-500/10 border border-purple-500/20 space-y-1.5 text-xs min-w-0">
                  <div className="font-semibold text-purple-700 dark:text-purple-300 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span>The Equivalence Principle in Server Components</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Calling <code>redirect()</code> directly inside a Server Component vs. calling an imported Server Function (e.g., <code>await verifyUser()</code>) from that Server Component is <strong>functionally identical</strong>. Because both run inside the same server Node.js process during the same SSR request lifecycle, they share the exact same request context and streaming state.
                  </p>
                </div>

                {/* 4 Execution Contexts */}
                <div className="space-y-4 text-xs min-w-0">
                  {/* Case 1 */}
                  <div className="p-4 rounded-lg bg-blue-500/5 border border-blue-500/20 space-y-3 min-w-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start min-w-0">
                      <div className="md:col-span-5 space-y-2 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
                            <Globe className="h-4 w-4" />
                            <span>1. SSR: Root / page_functions.ts / Plugin</span>
                          </div>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 font-medium">
                            HTTP 302
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          Occurs inside <code>getProps()</code> in <code>page_functions.ts</code>, at the top level of the root <code>page.tsx</code> Server Component (outside any <code>&lt;Suspense&gt;</code> boundary), or in a global plugin hook (<code>onRequest</code>) in <code>dinou.config.js</code>.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          Because zero HTML bytes have reached the wire (<code>headersSent === false</code>), Dinou issues a clean <strong>HTTP 302</strong> with a <code>Location</code> header. <strong>Crucial for SEO crawlers and search indexers.</strong>
                        </p>
                      </div>
                      <div className="md:col-span-7 min-w-0">
                        <TabbedCodeBlock
                          defaultTab="get-props"
                          tabs={[
                            {
                              id: "get-props",
                              label: "page_functions.ts",
                              language: "typescript",
                              code: `// src/dashboard/page_functions.ts
import { redirect, getContext } from "dinou";

export async function getProps() {
  const { req } = getContext();
  if (!req.cookies.session_token) {
    // Evaluated before page rendering -> HTTP 302 redirect
    return redirect("/login");
  }
  return { user: { name: "Alex" } };
}`,
                            },
                            {
                              id: "server-comp",
                              label: "page.tsx (Server Component)",
                              language: "tsx",
                              code: `// src/dashboard/page.tsx (Server Component root)
import { redirect, getContext } from "dinou";

export default async function DashboardPage() {
  const { req } = getContext();
  if (!req.cookies.session_token) {
    // At root before stream begins -> HTTP 302 redirect
    return redirect("/login");
  }

  return <h1>Welcome to Dashboard</h1>;
}`,
                            },
                            {
                              id: "plugin",
                              label: "dinou.config.js (Plugin)",
                              language: "javascript",
                              code: `// dinou.config.js (Global Plugin Hook)
import { defineConfig } from "dinou/config";

export default defineConfig({
  plugins: [
    {
      name: "auth-guard",
      async onRequest(request, context) {
        const url = new URL(request.url);
        const cookieHeader = request.headers.get("cookie") || "";
        // Runs pre-flight before SSR or route resolution
        if (url.pathname.startsWith("/dashboard") && !cookieHeader.includes("session_token=")) {
          return Response.redirect(new URL("/login", request.url), 302);
        }
      },
    },
  ],
});`,
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Case 2 */}
                  <div className="p-4 rounded-lg bg-amber-500/5 border border-amber-500/20 space-y-3 min-w-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start min-w-0">
                      <div className="md:col-span-5 space-y-2 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
                            <Zap className="h-4 w-4" />
                            <span>2. SSR: Deferred &lt;Suspense&gt;</span>
                          </div>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                            Client Hydration
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          Occurs inside an async child wrapped in <code>&lt;Suspense fallback=&#123;&lt;Skeleton /&gt;&#125;&gt;</code>. React opens the HTTP connection with status <code>200 OK</code> immediately to stream the initial shell.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          At HTTP protocol level, an open <code>200 OK</code> stream cannot turn into a <code>302</code>. Dinou safely emits <code>&lt;ClientRedirect /&gt;</code>, completing the transition upon browser hydration without breaking the stream.
                        </p>
                      </div>
                      <div className="md:col-span-7 min-w-0">
                        <CodeBlock
                          language="tsx"
                          containerClassName="w-full overflow-hidden rounded-md text-xs"
                        >
{`// src/reports/page.tsx (Server Component)
import { Suspense } from "react";
import { redirect } from "dinou";

async function RestrictedReport() {
  const isAllowed = await checkUserAccess();
  if (!isAllowed) {
    // 200 OK stream already open -> <ClientRedirect />
    return redirect("/unauthorized");
  }
  return <div>Financial Metrics</div>;
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading financial report...</p>}>
      <RestrictedReport />
    </Suspense>
  );
}`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>

                  {/* Case 3 */}
                  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-3 min-w-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start min-w-0">
                      <div className="md:col-span-5 space-y-2 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                            <ArrowRightLeft className="h-4 w-4" />
                            <span>3. Server Function from Client</span>
                          </div>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                            Soft SPA Navigation
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          Triggered from browser interactions (form actions or button clicks) via a dedicated <code>POST</code> request.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          Dinou executes the server mutation and intercepts <code>redirect()</code> before streaming (headers unsent), returning redirect metadata. The client proxy navigates via the SPA router <strong>without a full page reload</strong>.
                        </p>
                      </div>
                      <div className="md:col-span-7 min-w-0">
                        <CodeBlock
                          language="typescript"
                          containerClassName="w-full overflow-hidden rounded-md text-xs"
                        >
{`// src/actions/cart.ts
"use server";

import { redirect } from "dinou";
import db from "@/lib/db";

export async function checkoutAction(formData: FormData) {
  const order = await db.orders.create({ ... });

  // Dedicated POST: soft SPA navigation in browser
  return redirect(\`/checkout/\${order.id}/success\`);
}`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>

                  {/* Case 4 */}
                  <div className="p-4 rounded-lg bg-indigo-500/5 border border-indigo-500/20 space-y-3 min-w-0">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start min-w-0">
                      <div className="md:col-span-5 space-y-2 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-semibold text-indigo-700 dark:text-indigo-300 flex items-center gap-1.5">
                            <Sparkles className="h-4 w-4" />
                            <span>4. Client Component In-Render</span>
                          </div>
                          <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-medium">
                            router.replace()
                          </span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                          When called directly inside a client component during browser rendering, no network request is sent to the server.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                          Dinou immediately delegates to <code>router.replace()</code> in the client SPA router, smoothly updating the URL and view in 0ms without a page reload.
                        </p>
                      </div>
                      <div className="md:col-span-7 min-w-0">
                        <CodeBlock
                          language="tsx"
                          containerClassName="w-full overflow-hidden rounded-md text-xs"
                        >
{`// src/components/client-guard.tsx
"use client";

import { redirect } from "dinou";

export function ClientGuard({ isAllowed }: { isAllowed: boolean }) {
  if (!isAllowed) {
    // In-browser render: executes router.replace() in SPA router
    return redirect("/forbidden");
  }

  return <button className="btn">Control Panel</button>;
}`}
                        </CodeBlock>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Reference Table */}
                <div className="border rounded-md overflow-x-auto bg-background w-full min-w-0">
                  <table className="w-full text-left text-xs border-collapse min-w-[760px]">
                    <thead>
                      <tr className="border-b bg-muted/40 font-semibold text-foreground">
                        <th className="p-2.5 w-[22%]">Invocation Context</th>
                        <th className="p-2.5 w-[14%]">Headers Sent?</th>
                        <th className="p-2.5 w-[40%]">Resulting Mechanism</th>
                        <th className="p-2.5 w-[24%]">Recommended For</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border text-muted-foreground">
                      <tr>
                        <td className="p-2.5 font-medium text-foreground align-top">
                          1. SSR Root (page_functions.ts, page.tsx, Plugin)
                        </td>
                        <td className="p-2.5 align-top">
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">No</span>
                        </td>
                        <td className="p-2.5 align-top space-y-1">
                          <div className="font-semibold text-foreground">
                            Hard HTTP Redirect (Status 302)
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            Server issues an <code>HTTP/1.1 302 Found</code> with a <code>Location</code> header. The browser or search crawler intercepts it at the protocol level and fetches the new page as a fresh document.
                          </p>
                        </td>
                        <td className="p-2.5 align-top text-[11px] leading-relaxed">
                          Auth guards (<code>getProps</code>), root guards, global middleware plugins, SEO canonicals
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-foreground align-top">
                          2. SSR: Deferred (&lt;Suspense&gt;)
                        </td>
                        <td className="p-2.5 align-top">
                          <span className="text-amber-600 dark:text-amber-400 font-mono font-medium">Yes</span>
                          <span className="block text-[10px] text-muted-foreground">(200 OK stream open)</span>
                        </td>
                        <td className="p-2.5 align-top space-y-1">
                          <div className="font-semibold text-foreground">
                            Streaming Fallback (<code>&lt;ClientRedirect /&gt;</code>)
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            Because the <code>200 OK</code> chunked stream cannot be rewritten to a <code>302</code>, Dinou injects <code>&lt;ClientRedirect /&gt;</code> into the stream. The browser router transitions upon hydration without aborting the connection.
                          </p>
                        </td>
                        <td className="p-2.5 align-top text-[11px] leading-relaxed">
                          Deferred conditional access, late data-dependent checks inside Suspense
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-foreground align-top">
                          3. Server Function (from Client Action)
                        </td>
                        <td className="p-2.5 align-top">
                          <span className="text-emerald-600 dark:text-emerald-400 font-mono font-medium">No</span>
                          <span className="block text-[10px] text-muted-foreground">(standard POST)</span>
                        </td>
                        <td className="p-2.5 align-top space-y-1">
                          <div className="font-semibold text-foreground">
                            Soft SPA Navigation (Status 200)
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            Server returns HTTP <code>200 OK</code> with redirection metadata. Dinou&apos;s client runtime intercepts it and navigates via the SPA router without a full page reload or loss of client state.
                          </p>
                        </td>
                        <td className="p-2.5 align-top text-[11px] leading-relaxed">
                          Form submissions, shopping cart checkout, stateful mutations
                        </td>
                      </tr>
                      <tr>
                        <td className="p-2.5 font-medium text-foreground align-top">
                          4. Client Component (Render)
                        </td>
                        <td className="p-2.5 align-top">
                          <span className="text-muted-foreground font-mono font-medium">N/A</span>
                          <span className="block text-[10px] text-muted-foreground">(in-browser)</span>
                        </td>
                        <td className="p-2.5 align-top space-y-1">
                          <div className="font-semibold text-foreground">
                            Client Router Replacement (<code>router.replace()</code>)
                          </div>
                          <p className="text-[11px] leading-relaxed">
                            Executes 100% in the browser with zero server roundtrip. Immediately dispatches <code>router.replace()</code> in the client SPA router, updating route and UI in 0ms.
                          </p>
                        </td>
                        <td className="p-2.5 align-top text-[11px] leading-relaxed">
                          Pure UI state redirection, client-side permission gates
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Revalidation Cross-Link Banner */}
              <div className="border rounded-lg p-4 bg-muted/20 not-prose my-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                    <RefreshCw className="h-4 w-4 text-emerald-500" />
                    <span>Looking for Cache Revalidation?</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Learn how to purge stale SSG pages and ISR cache slots on-demand using <code>revalidatePath</code> and <code>revalidateTag</code> in the dedicated guide.
                  </p>
                </div>
                <a
                  href="/docs/revalidation"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:underline whitespace-nowrap px-3 py-1.5 rounded-md border border-border bg-background hover:bg-muted transition-colors flex-shrink-0"
                >
                  <span>Revalidation Guide</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
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
