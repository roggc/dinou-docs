import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Shield,
  Key,
  Database,
  Fingerprint,
  Zap,
  CheckCircle2,
  Lock,
} from "lucide-react";

const tocItems = [
  { id: "concept", title: "1. Core Concept", level: 2 },
  { id: "installation", title: "2. Installation & Environment", level: 2 },
  { id: "plugin-setup", title: "3. The Dinou v7 Clerk Plugin", level: 2 },
  { id: "rsc-usage", title: "4. Usage in Pages & Server Functions", level: 2 },
  { id: "clerk-server-actions", title: "4.1 Securing Server Functions", level: 3 },
  { id: "clerk-page-functions", title: "4.2 Option A: Server Component (Direct await)", level: 3 },
  { id: "clerk-page-view", title: "4.3 Option B: Client Component (getProps)", level: 3 },
  { id: "client-setup", title: "5. Client Setup (DinouClerkProvider)", level: 2 },
  { id: "clerk-root-layout", title: "5.1 Wrapping Root Layout", level: 3 },
  { id: "webhooks", title: "6. Webhooks & Database Sync", level: 2 },
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
                Clerk Authentication
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Integrate Clerk into your Dinou v7 application to handle user authentication, route protection, and database synchronization via the Web Standards plugin system.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>In Dinou v7, Clerk integrates seamlessly via the Web Standards Plugin System (<code>dinou.config.mjs</code>). There is no need to eject the framework: the plugin intercepts incoming requests, verifies session tokens cryptographically, exposes auth state to <code>getContext()</code>, and handles webhooks directly.</strong>
            </blockquote>

            <hr className="my-8" />

            {/* CONCEPT */}
            <section id="concept">
              <h2>1. Core Concept</h2>
              <p>
                Clerk integration in Dinou v7 is structured around three main pillars:
              </p>
              <div className="grid gap-6 md:grid-cols-3 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Fingerprint className="h-5 w-5" />
                      <span>Web Standards Middleware</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Clerk's backend SDK verifies incoming session JWTs on standard Web <code>Request</code> objects inside Dinou's <code>onRequest</code> plugin hook.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Shield className="h-5 w-5" />
                      <span>Server Context (getContext)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    The authenticated <code>userId</code> and auth claims are attached to Dinou's <code>RequestContextStore</code>, directly accessible in Server Components and Server Functions via <code>getContext()</code>.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <Database className="h-5 w-5" />
                      <span>Database Sync (Webhooks)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Secure webhook endpoints verify Clerk signatures using <code>svix</code> and synchronize user profile events to your database by short-circuiting in the plugin.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 1. INSTALLATION */}
            <section id="installation">
              <h2>2. Installation &amp; Environment</h2>
              <p>
                First, install Clerk's backend SDK, React client SDK, localization packages, and Svix (for webhook signature verification):
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="bash">{`npm install @clerk/backend @clerk/react @clerk/localizations svix`}</CodeBlock>
              </div>

              <p>
                Add your Clerk API credentials to your local <code>.env</code> file:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="env">{`CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...`}</CodeBlock>
              </div>
            </section>

            {/* 2. PLUGIN SETUP */}
            <section id="plugin-setup">
              <h2>3. The Dinou v7 Clerk Plugin (<code>dinou.config.mjs</code>)</h2>
              <p>
                In <strong>Dinou v7</strong>, plugins hook directly into the request lifecycle using the <code>onRequest(request, context)</code> hook. Create a reusable Clerk plugin to authenticate incoming requests and propagate session claims to <code>context</code>:
              </p>

              <TabbedCodeBlock
                tabs={[
                  {
                    id: "plugin-file",
                    label: "plugins/clerk.ts",
                    language: "typescript",
                    code: `// plugins/clerk.ts
import type { DinouPlugin } from "dinou";
import { createClerkClient } from "@clerk/backend";

const clerk = createClerkClient({
  secretKey: process.env.CLERK_SECRET_KEY,
  publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
});

export function clerkPlugin(): DinouPlugin {
  return {
    name: "clerk-auth",
    async onRequest(request, context) {
      // Cryptographically verify session token using standard Web Request
      const requestState = await clerk.authenticateRequest(request);
      const auth = requestState.toAuth();

      // Attach verified credentials to context (AsyncLocalStorage)
      context.userId = auth?.userId ?? null;
      context.auth = auth;
    },
  };
}`,
                  },
                  {
                    id: "config-file",
                    label: "dinou.config.mjs",
                    language: "javascript",
                    code: `// dinou.config.mjs
import { defineConfig } from "dinou";
import { clerkPlugin } from "./plugins/clerk";

export default defineConfig({
  ppr: true,
  plugins: [
    clerkPlugin(),
  ],
});`,
                  },
                ]}
              />

              <div className="my-4">
                <Alert>
                  <Lock className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <AlertTitle>Security Notice: Cryptographic Verification</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    Never manually decode the <code>__session</code> cookie using raw Base64 decoders for authorization decisions. Always rely on Clerk's official verified bindings (<code>authenticateRequest</code>), which cryptographically validate the JWT token signature using your <code>CLERK_SECRET_KEY</code>.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* 4. USAGE IN PAGES & SERVER FUNCTIONS */}
            <section id="rsc-usage">
              <h2>4. Usage in Pages &amp; Server Functions</h2>
              <p>
                With the plugin registered, any Server Component, Page Function, or Server Action can read <code>userId</code> directly from <code>getContext()</code>:
              </p>

              <h3 id="clerk-server-actions">4.1 Securing Server Functions (Server Actions)</h3>
              <p>
                Server Functions run mutations on the server. You can protect them by fetching <code>userId</code> directly from the context:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/actions.ts (Server Function)
"use server";

import { getContext } from "dinou";

export async function createPost(title: string, content: string) {
  const context = getContext();
  const userId = context?.userId;

  // Security Check
  if (!userId) {
    throw new Error("Unauthorized access. Invalid session.");
  }

  // Session is valid, save record to database
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorClerkId: userId,
    },
  });

  return post;
}`}</CodeBlock>
              </div>

              <div className="not-prose my-6">
                <Alert>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <AlertTitle>Server Component vs. Client Component Architecture</AlertTitle>
                  <AlertDescription className="text-xs leading-relaxed text-muted-foreground mt-1">
                    In Dinou, components are <strong>Server Components by default</strong>. They can execute queries with top-level <code>await</code> directly inside the component body and read <code>getContext()</code> with <strong>zero need for <code>getProps</code></strong>.
                    <br /><br />
                    <code>getProps</code> in <code>page_functions.ts</code> is specifically designed for the <strong>Client-First Model</strong>, where <code>page.tsx</code> is an interactive Client Component (<code>&quot;use client&quot;</code>) that cannot query databases or access server secrets directly.
                  </AlertDescription>
                </Alert>
              </div>

              <h3 id="clerk-page-functions">4.2 Option A: Server Component (Zero Boilerplate with Direct <code>await</code>)</h3>
              <p>
                If your dashboard page does not require client-side React hooks (like <code>useState</code>), keep it as a Server Component. Declare <code>export const revalidate = 0;</code> inside <code>src/dashboard/page_functions.ts</code> to enforce dynamic execution at request-time, and query Prisma directly inside <code>src/dashboard/page.tsx</code> with native <code>async/await</code>:
              </p>
              <div className="not-prose my-4">
                <TabbedCodeBlock
                  tabs={[
                    {
                      id: "clerk-server-page-functions-file",
                      label: "src/dashboard/page_functions.ts",
                      language: "typescript",
                      code: `// src/dashboard/page_functions.ts

// Force on-demand SSR at request-time to load dynamic session
export const revalidate = 0;`,
                    },
                    {
                      id: "clerk-server-page-file",
                      label: "src/dashboard/page.tsx",
                      language: "tsx",
                      code: `// src/dashboard/page.tsx (Server Component)
import { getContext, redirect } from "dinou";
import { prisma } from "@/lib/prisma";

export default async function DashboardPage() {
  const context = getContext();
  const userId = context?.userId;

  // Protect route
  if (!userId) {
    return redirect("/login");
  }

  // Direct database query on Node.js / Edge without getProps
  const posts = await prisma.post.findMany({
    where: { authorClerkId: userId },
  });

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Authenticated as: {userId}</p>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{post.content}</p>
          </article>
        ))}
      </div>
    </main>
  );
}`,
                    },
                  ]}
                />
              </div>

              <h3 id="clerk-page-view">4.3 Option B: Client Component (<code>&quot;use client&quot;</code> with <code>getProps</code>)</h3>
              <p>
                When <code>page.tsx</code> is an interactive Client Component (e.g. managing UI state with <code>useState</code> or using Clerk client hooks like <code>useUser()</code>), it runs in the browser and cannot connect to your database directly.
              </p>
              <p>
                In this case, use <code>getProps()</code> in <code>page_functions.ts</code> to fetch data on the server, which Dinou automatically passes into your Client Component as initial props:
              </p>

              <div className="not-prose my-4">
                <TabbedCodeBlock
                  tabs={[
                    {
                      id: "clerk-page-functions-file",
                      label: "src/dashboard/page_functions.ts",
                      language: "typescript",
                      code: `// src/dashboard/page_functions.ts
import { getContext, redirect } from "dinou";
import { prisma } from "@/lib/prisma";

// Force on-demand SSR at request-time to load dynamic session
export const revalidate = 0;

export async function getProps() {
  const context = getContext();
  const userId = context?.userId;

  if (!userId) {
    return redirect("/login");
  }

  const posts = await prisma.post.findMany({
    where: { authorClerkId: userId },
  });

  return {
    posts,
    userId,
  };
}`,
                    },
                    {
                      id: "clerk-client-page-file",
                      label: "src/dashboard/page.tsx",
                      language: "tsx",
                      code: `// src/dashboard/page.tsx
"use client";

import type { PageProps } from "dinou";
import { useState } from "react";

interface DashboardProps extends PageProps<"/dashboard"> {
  posts: Array<{ id: string; title: string; content: string }>;
  userId: string;
}

export default function DashboardPage({ posts: initialPosts, userId }: DashboardProps) {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <main className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard (Client Component)</h1>
      <p className="text-muted-foreground">Authenticated as: {userId}</p>

      <div className="space-y-4">
        {posts.map((post) => (
          <article key={post.id} className="p-4 rounded-lg border bg-card">
            <h2 className="text-xl font-semibold">{post.title}</h2>
            <p className="text-sm text-muted-foreground mt-1">{post.content}</p>
          </article>
        ))}
      </div>
    </main>
  );
}`,
                    },
                  ]}
                />
              </div>
            </section>

            {/* 5. CLIENT SETUP */}
            <section id="client-setup">
              <h2>5. Client Setup (DinouClerkProvider)</h2>
              <p>
                To enable smooth Client-side SPA navigation and dynamic language changes in Clerk's built-in login forms, create a custom wrapper around <code>ClerkProvider</code> using Dinou's <code>useRouter()</code> hook:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/components/DinouClerkProvider.tsx
"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/react";
import { useRouter } from "dinou";
import { esES, enUS } from "@clerk/localizations";

// Customize localization text to match your app's brand
const customEnUS = {
  ...enUS,
  formFieldLabel__emailAddress: "Email address (only sign in)",
  signIn: {
    ...enUS.signIn,
    start: {
      ...enUS.signIn.start,
      title: "Sign in / up",
      subtitle: "to continue to your app",
    },
  },
};

const customEsES = {
  ...esES,
  formFieldLabel__emailAddress: "Correo electrónico (solo iniciar sesión)",
  signIn: {
    ...esES.signIn,
    start: {
      ...esES.signIn.start,
      title: "Iniciar sesión / Registro",
      subtitle: "para continuar a tu app",
    },
  },
};

const clerkLocales = {
  es: customEsES,
  en: customEnUS,
};

export function DinouClerkProvider({
  children,
  publishableKey,
  locale = "en",
}: {
  children: ReactNode;
  publishableKey: string;
  locale?: "en" | "es";
}) {
  const router = useRouter();

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      // Integrate with Dinou client router for smooth SPA soft transitions
      navigate={(to) => router.push(to)}
      // Dynamically select custom translations mapping the active locale
      localization={clerkLocales[locale]}
      appearance={{
        elements: {
          footerAction: { display: "none" }, // Optional: Hide sign up link
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}`}</CodeBlock>
              </div>

              <h3 id="clerk-root-layout">5.1 Wrapping the Root Layout</h3>
              <p>
                In your root <code>src/layout.tsx</code>, wrap the children tree with your custom provider:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/layout.tsx
import { DinouClerkProvider } from "@/components/DinouClerkProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <DinouClerkProvider
          publishableKey={process.env.CLERK_PUBLISHABLE_KEY || ""}
        >
          {children}
        </DinouClerkProvider>
      </body>
    </html>
  );
}`}</CodeBlock>
              </div>
            </section>

            {/* 6. WEBHOOKS */}
            <section id="webhooks">
              <h2>6. Webhooks &amp; Database Sync (Plugin Pattern)</h2>
              <p>
                In <strong>Dinou v7</strong>, webhook endpoints are handled directly inside plugins using the <strong>Short-Circuit Pattern</strong>. When a plugin returns a Web <code>Response</code>, Dinou returns that response immediately and bypasses React Server Component rendering entirely:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// plugins/clerk-webhook.ts
import type { DinouPlugin } from "dinou";
import { Webhook } from "svix";

export function clerkWebhookPlugin(): DinouPlugin {
  return {
    name: "clerk-webhook",
    async onRequest(request) {
      const url = new URL(request.url);

      // Intercept incoming Clerk webhook requests
      if (url.pathname === "/api/webhooks/clerk" && request.method === "POST") {
        const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;
        const svix_id = request.headers.get("svix-id");
        const svix_timestamp = request.headers.get("svix-timestamp");
        const svix_signature = request.headers.get("svix-signature");

        if (!WEBHOOK_SECRET || !svix_id || !svix_timestamp || !svix_signature) {
          return new Response("Missing svix signature headers", { status: 400 });
        }

        // Web Standards: request.text() reads the unparsed raw UTF-8 body
        const payload = await request.text();
        const wh = new Webhook(WEBHOOK_SECRET);
        let evt: any;

        try {
          evt = wh.verify(payload, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
          });
        } catch (err) {
          return Response.json({ error: "Invalid signature" }, { status: 400 });
        }

        const { id } = evt.data;
        const eventType = evt.type;

        if (eventType === "user.created") {
          const email = evt.data.email_addresses[0]?.email_address || \`\${id}@no-email.com\`;
          await prisma.user.upsert({
            where: { clerkId: id },
            update: { email },
            create: { clerkId: id, email },
          });
        }

        if (eventType === "user.deleted") {
          await prisma.user.delete({ where: { clerkId: id } }).catch(() => {});
        }

        // Short-circuit: return HTTP 200 JSON directly to Clerk
        return Response.json({ received: true });
      }
    },
  };
}`}</CodeBlock>
              </div>

              <div className="not-prose my-4">
                <Alert className="border-emerald-500/20 bg-emerald-50/40 dark:bg-emerald-950/20">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <AlertTitle className="text-emerald-700 dark:text-emerald-300 font-bold text-xs">
                    Web Standards Advantage: No Body-Parser Issues
                  </AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground leading-relaxed mt-1">
                    Because standard Web <code>Request.text()</code> yields the pristine, untouched body string, cryptographic signature verification with <code>svix</code> succeeds reliably out of the box. You no longer need to worry about Express raw buffer middleware order or server ejection.
                  </AlertDescription>
                </Alert>
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
