"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Zap,
  Server,
  RefreshCw,
  Cpu,
} from "lucide-react";

const tocItems = [
  { id: "philosophy", title: "💡 Philosophy", level: 2 },
  { id: "three-points", title: "🎯 The Three Crucial Points", level: 2 },
  { id: "consumption", title: "⚡ Consuming Context in React", level: 2 },
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
                Context Propagation Pattern
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the core pattern for propagating custom Express.js request context (sessions, locales, tenant databases) down into React Server Components and Server Functions.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>In Dinou, there are no black boxes. When you eject the framework, the Express server is completely yours. Propagating custom request metadata down to your React application is simple, structured, and consistent.</strong>
            </blockquote>

            <hr className="my-8" />

            {/* PHILOSOPHY */}
            <section id="philosophy">
              <h2>💡 Philosophy</h2>
              <p>
                In standard full-stack applications, you frequently need to access request-specific information within your UI components (like the authenticated user session, active language locales, custom subdomains, or tenant databases).
              </p>
              <p>
                Dinou provides an elegant <code>getContext()</code> API backed by Node's <code>AsyncLocalStorage</code>. By populating the request context at the Express level, you make these values instantly accessible anywhere in your server-side React code with zero prop-drilling.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Server className="h-5 w-5" />
                      <span>Express to React Bridge</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Intercept request values in standard Express middlewares (like auth cookies or path prefixes) and register them into Dinou's request context stores.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Cpu className="h-5 w-5" />
                      <span>Consistent Consumption</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Access values consistently in Server Components, Page Functions (<code>getProps</code>), and Server Functions (mutations) using the native <code>getContext()</code> API.
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="my-8" />

            {/* THREE POINTS */}
            <section id="three-points">
              <h2>🎯 The Three Crucial Points</h2>
              <p>
                To propagate any request variable (such as <code>req.locale</code> for internationalization or <code>req.userId</code> for Clerk Authentication) from Express to React, you must map it in <strong>exactly three specific locations</strong> inside your ejected <code className="text-amber-500">dinou/core/server.js</code> file:
              </p>

              <h3>1. Standard Page Context: getContext()</h3>
              <p>
                This function builds the request context used during initial HTML server-side rendering (SSR) and client-side RSC data fetches. Add your custom properties directly to the return object:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/server.js
function getContext(req, res) {
  return {
    req: {
      cookies: { ...req.cookies },
      headers: { ... },
      query: { ...req.query },
      path: req.path,
      method: req.method,
      
      // 🌐 1. Propagate custom properties here:
      locale: req.locale,
      userId: req.userId,
    },
    res: { ... }
  };
}`}</CodeBlock>
              </div>

              <h3>2. Server Function Context: getContextForServerFunctionEndpoint()</h3>
              <p>
                This function builds the context for <strong>React Server Functions (Server Actions)</strong> executed inside forms or interactive client-side events. Ensure the same variables are propagated here to protect and authorize database mutations:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/server.js
function getContextForServerFunctionEndpoint(req, res) {
  return {
    req: {
      cookies: { ...req.cookies },
      headers: { ... },
      query: { ...req.query },
      path: req.path,
      method: req.method,
      
      // 🌐 2. Propagate custom properties here:
      locale: req.locale,
      userId: req.userId,
    },
    res: { ... }
  };
}`}</CodeBlock>
              </div>

              <h3>3. HTML Compiler Subprocess Context: contextForChild</h3>
              <p>
                During initial page loads, Dinou spawns a background child process to pre-render the dynamic HTML stream. To prevent React hydration mismatches on the client, the child process must receive the exact same request context as the parent process. 
              </p>
              <p>
                Locate the Express wildcard GET handler (<code>app.get(/^\/.*\/?$/)</code>) and serialize your variables inside the <code>contextForChild.req</code> object:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// In server.js wildcard route handler: app.get(/^\/.*\/?$/)
const contextForChild = {
  req: {
    query: { ...req.query },
    cookies: { ...req.cookies },
    headers: { ... },
    path: req.path,
    method: req.method,
    
    // 🌐 3. Propagate custom properties here:
    locale: req.locale,
    userId: req.userId,
  },
};`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CONSUMPTION */}
            <section id="consumption">
              <h2>⚡ Consuming Context in React</h2>
              <p>
                Once registered in the three points, you can consume the variables cleanly in any server-side React code:
              </p>

              <h3>In Page Functions (page_functions.ts)</h3>
              <p>
                Enable request-time dynamic evaluation by returning <code>dynamic() {`{ return true; }`}</code>, then fetch variables to load specific user details or localized content:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`import { getContext } from "dinou";

export function dynamic() {
  return true; // Evaluate route dynamically at request-time
}

export async function getProps() {
  const context = getContext();
  
  // Safely consume context variables
  const locale = context?.req?.locale || "en";
  const userId = context?.req?.userId;

  return {
    page: {
      locale,
      userId
    }
  };
}`}</CodeBlock>
              </div>

              <h3>In Server Functions (Actions)</h3>
              <p>
                Verify identity and authorize mutations directly within actions:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`"use server";

import { getContext } from "dinou";

export async function saveProfileData(data: any) {
  const context = getContext();
  const userId = context?.req?.userId;

  if (!userId) {
    throw new Error("Unauthorized: Invalid session token.");
  }

  // Update record in database
  await prisma.user.update({
    where: { clerkId: userId },
    data
  });
}`}</CodeBlock>
              </div>
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
