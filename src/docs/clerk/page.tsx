"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
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
} from "lucide-react";

const tocItems = [
  { id: "concept", title: "💡 Core Concept", level: 2 },
  { id: "installation", title: "📦 1. Installation & Env", level: 2 },
  { id: "server-setup", title: "🌐 2. Express Server Setup", level: 2 },
  { id: "rsc-usage", title: "🔑 3. Usage in RSC & Server Functions", level: 2 },
  { id: "client-setup", title: "⚛️ 4. Client Setup (DinouClerkProvider)", level: 2 },
  { id: "webhooks", title: "🔄 5. Handling Clerk Webhooks", level: 2 },
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
              Integrate Clerk into your ejected Dinou application to handle user authentication, route protection, and database synchronization.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Since Dinou is fully ejectable, you have complete control over the Express server. You can integrate Clerk's official Express middleware directly, propagate session context, and sync events via webhooks.</strong>
            </blockquote>

            <hr className="my-8" />

            {/* CONCEPT */}
            <section id="concept">
              <h2>💡 Core Concept</h2>
              <p>
                Clerk integration in Dinou is structured around three main components:
              </p>
              <div className="grid gap-6 md:grid-cols-3 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Fingerprint className="h-5 w-5" />
                      <span>Middleware Authentication</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Clerk's official middleware verifies session JWT tokens. A smart decryption fallback reading the <code>__session</code> cookie manually ensures the user ID is reliably extracted even in dynamic compiling child processes.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Shield className="h-5 w-5" />
                      <span>Server-Side Context</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    The extracted Clerk User ID is passed into the Dinou request context (AsyncLocalStorage). Both Server Components and Server Functions can check it via <code>getContext().req.userId</code> to secure actions.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <Database className="h-5 w-5" />
                      <span>Database Synchronization</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Secure Webhook endpoints verify Clerk signatures using <code>svix</code> and synchronize Clerk user profile events (like creation and deletion) to your local database.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* 1. INSTALLATION */}
            <section id="installation">
              <h2>📦 1. Installation & Env</h2>
              <p>
                First, install Clerk's Express SDK, React SDK, localization assets, and the Svix package (necessary to verify signature headers of incoming Clerk webhooks):
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="bash">{`npm install @clerk/express @clerk/react @clerk/localizations svix`}</CodeBlock>
              </div>

              <p>
                Add your Clerk credentials to your local <code>.env</code> file:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="env">{`CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...`}</CodeBlock>
              </div>
            </section>

            {/* 2. EXPRESS SERVER SETUP */}
            <section id="server-setup">
              <h2>🌐 2. Express Server Setup</h2>
              <p>
                Once ejected, open your local <code className="text-amber-500">dinou/core/server.js</code> file.
              </p>

              <h3>Importing and Initializing Clerk</h3>
              <p>
                Import the Clerk middleware and initializers using CommonJS at the top of the server file:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const { clerkMiddleware, getAuth } = require("@clerk/express");`}</CodeBlock>
              </div>

              <h3>Adding Verified User ID Helper</h3>
              <p>
                To extract the authenticated user ID safely, we define a helper that retrieves the User ID exclusively from Clerk's cryptographically verified request objects.
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`app.use(clerkMiddleware());

// 🛡️ Helper: Extracts userId only if verified cryptographically by Clerk
function getUserIdFallback(req) {
  // Returns the ID verified by Clerk's middleware
  return req.auth?.userId || getAuth(req)?.userId || null;
}`}</CodeBlock>
              </div>

              <div className="my-4">
                <Alert>
                  <AlertTitle>🔒 Security Notice: Cryptographic Verification</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    Never manually decode the <code>__session</code> cookie using raw Base64 decoders for authorization decisions. An attacker can easily forge a cookie with any User ID. Always rely on Clerk's official verified bindings (<code>req.auth</code> or <code>getAuth</code>), which cryptographically validate the token signature using your <code>CLERK_SECRET_KEY</code>.
                  </AlertDescription>
                </Alert>
              </div>

              <h3>Context Propagation</h3>
              <p>
                Expose the active <code>userId</code> inside the request context. In <code className="text-amber-500">server.js</code>, update <code>getContext</code> and <code>getContextForServerFunctionEndpoint</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function getContext(req, res) {
  return {
    req: {
      cookies: { ...req.cookies },
      headers: { ... },
      query: { ...req.query },
      path: req.path,
      method: req.method,
      userId: getUserIdFallback(req), // 👈 Expose Clerk user ID
    },
    res: { ... }
  };
}

function getContextForServerFunctionEndpoint(req, res) {
  return {
    req: {
      cookies: { ...req.cookies },
      headers: { ... },
      query: { ...req.query },
      path: req.path,
      method: req.method,
      userId: getUserIdFallback(req), // 👈 Expose Clerk user ID
    },
    res: { ... }
  };
}`}</CodeBlock>
              </div>

              <p>
                Also, propagate this ID in the Express wildcard GET handler (<code>app.get(/^\/.*\/?$/)</code>) inside <code>contextForChild</code> for Server Component rendering:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`const contextForChild = {
  req: {
    query: { ...req.query },
    cookies: { ...req.cookies },
    headers: { ... },
    path: req.path,
    method: req.method,
    userId: getUserIdFallback(req), // 👈 Propagate userId here
  },
};`}</CodeBlock>
              </div>
            </section>

            {/* 3. USAGE IN RSC & SERVER FUNCTIONS */}
            <section id="rsc-usage">
              <h2>🔑 3. Usage in RSC & Server Functions</h2>
              <p>
                Now, you can check the session from any Server Component, Page Function, or Server Function:
              </p>

              <h3>Securing Server Functions</h3>
              <p>
                Server Functions run mutations on the server. You can protect them by fetching <code>userId</code> directly from the context:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/actions.ts (Server Function)
"use server";

import { getContext } from "dinou";

export async function createPost(title: string, content: string) {
  const context = getContext();
  const userId = context?.req?.userId;

  // 🚨 Security Check
  if (!userId) {
    throw new Error("Unauthorized access. Invalid session.");
  }

  // Session is valid, save record to database
  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorClerkId: userId
    }
  });

  return post;
}`}</CodeBlock>
              </div>

              <h3>Fetching User Data in Page Functions</h3>
              <p>
                Load user-specific data from your database inside <code>page_functions.ts</code> before compiling the page:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/dashboard/page_functions.ts
import { getContext } from "dinou";

export function dynamic() {
  return true; // Force SSR at request-time to load dynamic session
}

export async function getProps() {
  const context = getContext();
  const userId = context?.req?.userId;

  if (!userId) {
    return {
      redirect: {
        destination: "/login",
      }
    };
  }

  const posts = await prisma.post.findMany({
    where: { authorClerkId: userId }
  });

  return {
    page: {
      posts,
      userId
    }
  };
}`}</CodeBlock>
              </div>
            </section>

            {/* 4. CLIENT SETUP */}
            <section id="client-setup">
              <h2>⚛️ 4. Client Setup (DinouClerkProvider)</h2>
              <p>
                To enable smooth Client-side SPA navigation and dynamic language changes in Clerk's built-in login forms, create a custom wrapper around <code>ClerkProvider</code>:
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

              <h3>Wrapping the Root Layout</h3>
              <p>
                In your root <code>layout.tsx</code>, retrieve the locale from context and wrap the tree with your custom provider:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/layout.tsx
import { getContext } from "dinou";
import { DinouClerkProvider } from "@/components/DinouClerkProvider";

export default function Layout({ children }) {
  const context = getContext();
  const locale = context?.req?.locale || "en";

  return (
    <html lang={locale}>
      <body>
        <DinouClerkProvider
          publishableKey={process.env.CLERK_PUBLISHABLE_KEY || ""}
          locale={locale}
        >
          {children}
        </DinouClerkProvider>
      </body>
    </html>
  );
}`}</CodeBlock>
              </div>
            </section>

            {/* 5. WEBHOOKS */}
            <section id="webhooks">
              <h2>🔄 5. Handling Clerk Webhooks</h2>
              <p>
                To synchronize Clerk users with your local database (e.g. Prisma), create a POST webhook endpoint in <code className="text-amber-500">dinou/core/server.js</code>. Use the <code>svix</code> SDK to verify the authenticity of Clerk's payload signature:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`import { Webhook } from "svix";

// Endpoint to receive webhook events from Clerk (e.g. user.created)
app.post("/api/webhooks/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing CLERK_WEBHOOK_SECRET in .env");
    return res.status(500).send("Server Error");
  }

  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return res.status(400).send("Missing Svix headers");
  }

  // Clerk webhook verification expects raw string payload
  const payloadString = req.body.toString("utf8");
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  try {
    evt = wh.verify(payloadString, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Clerk Webhook verification failed:", err.message);
    return res.status(400).json({ error: "Invalid signature" });
  }

  const { id } = evt.data;
  const eventType = evt.type;

  if (eventType === "user.created") {
    const email = evt.data.email_addresses[0]?.email_address || \`\${id}@no-email.com\`;

    try {
      // Sync user to local Prisma database
      await prisma.user.upsert({
        where: { clerkId: id },
        update: { email },
        create: {
          clerkId: id,
          email,
        },
      });
    } catch (dbErr) {
      console.error("Database user sync failed:", dbErr.message);
      return res.status(500).send("Database Error");
    }
  }

  if (eventType === "user.deleted") {
    try {
      // Remove user from local database
      await prisma.user.delete({
        where: { clerkId: id },
      });
    } catch (dbErr) {
      // Ignore error if user does not exist
    }
  }

  res.status(200).json({ received: true });
});`}</CodeBlock>
              </div>
              <Alert className="my-4">
                <AlertTitle>⚠️ Raw Request Body Notice</AlertTitle>
                <AlertDescription className="text-xs text-muted-foreground mt-1">
                  Ensure the webhook endpoint is declared <strong>before</strong> any global body parsers (like <code>app.use(express.json())</code>) or uses local middleware like <code>express.raw()</code>. This keeps the raw request buffer untouched for cryptographic Svix signature verification.
                </AlertDescription>
              </Alert>
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
