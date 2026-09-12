"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { Puzzle, Server, RefreshCw, ShieldAlert, Cpu } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "🔌 Overview", level: 2 },
  { id: "configuration", title: "⚙️ Configuration File", level: 2 },
  { id: "plugin-hooks", title: "⚓ Plugin Hooks", level: 2 },
  { id: "on-server-init", title: "1. onServerInit", level: 3 },
  { id: "on-request-context", title: "2. onRequestContext", level: 3 },
  { id: "try-catch-isolation", title: "🛡️ Try-Catch & Fault Isolation", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-3">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Plugin System
              </h1>
              <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-1 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">
                v5.2.0+
              </span>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Extend your Dinou application, register custom Express middlewares or endpoints, and propagate context variables without ejecting.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Dinou's lightweight plugin architecture provides a modular way to plug in third-party integrations (like Clerk, Stripe, or custom i18n routing) while preserving the ability to update the underlying framework engine.</strong>
            </blockquote>

            <hr className="my-8" />

            {/* OVERVIEW */}
            <section id="overview">
              <h2>🔌 Overview</h2>
              <p>
                Before this feature, adding middlewares or customizing the React Server Components context required running <code>npm run eject</code> to directly modify the core Express <code>server.js</code> file.
              </p>
              <p>
                With the new plugin system, you can package Express routing, global request interceptors, and context propagation logic in standard, isolated plugin objects declared inside <code>dinou.config.js</code>.
              </p>
            </section>

            {/* CONFIGURATION */}
            <section id="configuration">
              <h2>⚙️ Configuration File</h2>
              <p>
                To register plugins, create a <code>dinou.config.js</code> file at the root of your project using CommonJS (<code>module.exports</code>). The server dynamically loads this configuration file during startup:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou.config.js
module.exports = {
  plugins: [
    // Register your plugins here
  ]
};`}</CodeBlock>
              </div>
            </section>

            {/* PLUGIN HOOKS */}
            <section id="plugin-hooks">
              <h2>⚓ Plugin Hooks</h2>
              <p>
                A plugin is a standard JavaScript object containing a <code>name</code> and one or more lifecycle hooks:
              </p>

              <section id="on-server-init">
                <h3>1. <code>onServerInit(app)</code></h3>
                <p>
                  Triggers immediately after the Express app and cookie-parser are initialized, but before other default body-parsers or routing handlers.
                </p>
                <div className="border rounded-lg p-4 bg-card not-prose my-4">
                  <div className="flex items-center gap-2 font-semibold mb-2 text-purple-600 dark:text-purple-400">
                    <Server className="h-5 w-5" />
                    <span>Express Middleware & Custom Routing</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Use this hook to mount standard Express middlewares, register custom REST endpoints, or handle raw Webhooks (such as Stripe or Clerk) before they hit the main page routing engine.
                  </p>
                  <CodeBlock language="javascript">{`const customLoggingPlugin = {
  name: "request-logger",
  onServerInit(app) {
    app.use((req, res, next) => {
      console.log(\`[\${req.method}] \${req.path}\`);
      next();
    });
  }
};`}</CodeBlock>
                </div>
              </section>

              <section id="on-request-context">
                <h3>2. <code>onRequestContext(req, res, context)</code></h3>
                <p>
                  Triggers whenever Dinou creates the execution context for React Server Components. This hook executes across three distinct environments:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li><strong>Standard Page Routing</strong>: during dynamic request-time rendering in the main Express process.</li>
                  <li><strong>Server Actions</strong>: during execution of Server Functions (Actions).</li>
                  <li><strong>SSR Child Process</strong>: inside the child process spawned by Dinou to render the React tree to HTML (handling both static path pre-compilation during server startup and initial HTML loads/reloads).</li>
                </ul>
                <div className="border rounded-lg p-4 bg-card not-prose my-4">
                  <div className="flex items-center gap-2 font-semibold mb-2 text-blue-600 dark:text-blue-400">
                    <RefreshCw className="h-5 w-5" />
                    <span>RSC Context Injection</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Modify the <code>context.req</code> object to expose custom variables (like session details or localized language dictionaries) to your page layouts and server functions.
                  </p>
                  <CodeBlock language="javascript">{`const customContextPlugin = {
  name: "custom-context-inject",
  onRequestContext(req, res, context) {
    // Expose a custom variable in RSC context
    context.req.customVal = "hello-from-plugin";
  }
};`}</CodeBlock>
                </div>

                <h3>Consuming Context in Your Application</h3>
                <p>
                  Once a custom property is injected into the context via a plugin, it becomes accessible in any server-side file (including Server Components, <code>getProps</code> inside <code>page_functions.ts</code>, or Server Functions) by calling <code>getContext()</code>:
                </p>
                <div className="not-prose my-4">
                  <CodeBlock language="typescript">{`// src/actions.ts (Server Functions)
"use server";

import { getContext } from "dinou";

export async function myServerAction() {
  const context = getContext();
  const customVal = context?.req?.customVal; // Returns "hello-from-plugin"
  
  if (customVal === "hello-from-plugin") {
    // Perform localized or session-specific logic...
  }
}`}</CodeBlock>
                </div>
              </section>
            </section>

            {/* TRY-CATCH ISOLATION */}
            <section id="try-catch-isolation">
              <h2>🛡️ Try-Catch & Fault Isolation</h2>
              <p>
                Dinou provides built-in try-catch wrappers around all plugin hook calls. This ensures high robustness and keeps your production site alive:
              </p>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold">
                      <Cpu className="h-5 w-5" />
                      <span>Diagnostics</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Plugins are identified by their <code>name</code> field. During startup, Dinou logs each active plugin name. If a hook crashes, Dinou logs a diagnostic error referencing the specific plugin name.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-rose-600 dark:text-rose-400 font-semibold">
                      <ShieldAlert className="h-5 w-5" />
                      <span>Crash Prevention</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    If one plugin throws an error (e.g. attempting to read a missing cookie or performing a failed lookup), it is isolated. Other active plugins and standard route compilation remain completely unaffected.
                  </CardContent>
                </Card>
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
