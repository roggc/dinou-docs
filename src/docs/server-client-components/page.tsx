"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Server,
  Laptop,
  Layers,
  Info,
  CheckCircle2,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "server-components", title: "Server Components", level: 2 },
  { id: "client-components", title: "Client Components", level: 2 },
  { id: "use-client", title: "The 'use client' Directive", level: 2 },
  { id: "props-serialization", title: "Data Serialization Boundary", level: 2 },
  { id: "best-practices", title: "Choosing Your Architecture", level: 2 },
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
                Server vs. Client Components
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand the dual-component architecture of React 19 and how Dinou blends server-side safety with client-side interactivity.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Dinou is built around the <strong>React 19 Server Components (RSC)</strong> model. Instead of treating your application as a purely client-side React app, Dinou splits components into two categories:
              </p>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card className="border-blue-500/20 bg-blue-500/5">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                      <Server className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <CardTitle>Server Components</CardTitle>
                    <CardDescription>The default component type.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Runs exclusively on the server. Zero impact on the browser bundle size, secure by design, with direct backend access.
                  </CardContent>
                </Card>

                <Card className="border-purple-500/20 bg-purple-500/5">
                  <CardHeader>
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                      <Laptop className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <CardTitle>Client Components</CardTitle>
                    <CardDescription>Explicitly marked opt-in.</CardDescription>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Pre-rendered on the server and hydrated in the browser. Allows event listeners, browser APIs, and state hooks.
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="server-components">
              <h2>Server Components</h2>
              <p>
                In Dinou, <strong>every component is a Server Component by default</strong>. They are executed on the server to output a JSON-like representation of the UI (the React Flight payload) which React uses to construct the DOM.
              </p>

              <h3>What they can do:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Direct Database Access:</strong> Fetch data directly using queries or server-side SDKs.</li>
                <li><strong>Secure Execution:</strong> Keep secrets, API tokens, and private logic hidden from client exposure.</li>
                <li><strong>No Bundle Overhead:</strong> Large node packages used inside Server Components are never downloaded by the browser.</li>
              </ul>

              <h3>What they cannot do:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Cannot use state or effect hooks (<code>useState</code>, <code>useEffect</code>, <code>useReducer</code>).</li>
                <li>Cannot access browser-only APIs (<code>window</code>, <code>document</code>, <code>localStorage</code>).</li>
                <li>Cannot add client event listeners (like <code>onClick</code> or <code>onChange</code>).</li>
              </ul>

              <CodeBlock language="tsx" containerClassName="rounded-lg mt-4">
                {`// src/user-list/page.tsx (Server Component by default)
import { getContext } from "dinou";

export default async function Page() {
  // Direct backend context access!
  const query = getContext().req.query;
  const users = await db.users.findMany({ q: query.search });

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
              </CodeBlock>
            </section>

            <section id="client-components">
              <h2>Client Components</h2>
              <p>
                Client Components represent components that have access to client-side interactivity. They are still pre-rendered on the server to HTML for fast initial page load times, but their javascript bundle is sent to the client to hydrate the interactive elements.
              </p>

              <h3>What they can do:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Use state and effects (<code>useState</code>, <code>useActionState</code>, <code>useEffect</code>).</li>
                <li>Interact with the browser (event listeners, access to <code>window</code>, etc.).</li>
                <li>Consume Client-only Context providers.</li>
              </ul>

              <Alert className="not-prose mt-4">
                <Info className="h-4 w-4" />
                <AlertTitle>Server Pre-Rendering Notice</AlertTitle>
                <AlertDescription>
                  Calling them "Client Components" is a bit of a misnomer. They still execute on the server during pre-rendering to construct the initial HTML. Because of this, accessing browser globals (like <code>window</code>) directly in the body of a Client Component will cause server crashes unless deferred inside a <code>useEffect</code> block.
                </AlertDescription>
              </Alert>
            </section>

            <section id="use-client">
              <h2>The "use client" Directive</h2>
              <p>
                To designate a component as a Client Component, add the <code>"use client"</code> directive at the very top of the file, before any import statements.
              </p>

              <CodeBlock language="tsx" containerClassName="rounded-lg mt-4">
                {`"use client"; // Marks this file and all its imports as Client-side

import { useState } from "react";

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`}
              </CodeBlock>

              <p className="mt-4">
                Once a file contains <code>"use client"</code>, a boundary is established. Any file imported by this component is automatically treated as a Client Component as well, without needing the directive.
              </p>
            </section>

            <section id="props-serialization">
              <h2>Data Serialization Boundary</h2>
              <p>
                When passing data across the network boundary from a Server Component to a Client Component, the props must be <strong>serializable</strong>.
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <div className="border border-green-500/20 bg-green-500/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-green-700 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Serializable (Allowed)</span>
                  </div>
                  <ul className="text-xs space-y-1 list-disc pl-4 text-muted-foreground">
                    <li>Primitives (strings, numbers, booleans)</li>
                    <li>Plain Objects &amp; Arrays</li>
                    <li>Promises (passed from server, read via React 19 <code>use()</code> hook)</li>
                  </ul>
                </div>

                <div className="border border-red-500/20 bg-red-500/5 rounded-lg p-4 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-red-700 dark:text-red-400">
                    <XCircle className="h-4 w-4" />
                    <span>Non-Serializable (Blocked)</span>
                  </div>
                  <ul className="text-xs space-y-1 list-disc pl-4 text-muted-foreground">
                    <li>Functions (cannot pass callback event handlers directly)</li>
                    <li>Class instances (prototypes and methods are lost; React throws serialization errors)</li>
                    <li>Browser-only globals and DOM elements (e.g., <code>window</code>, <code>document</code>, HTML nodes)</li>
                  </ul>
                </div>
              </div>

              <Alert className="not-prose border-blue-500/20 bg-blue-500/5">
                <HelpCircle className="h-4 w-4 text-blue-500" />
                <AlertTitle className="text-blue-600 dark:text-blue-400">Passing Promises (React 19 Feature)</AlertTitle>
                <AlertDescription className="text-xs leading-relaxed text-muted-foreground mt-1">
                  React 19 supports passing a <strong>Promise</strong> as a prop from a Server Component to a Client Component. The Client Component can then read the promise using React's new <code>use()</code> hook, suspending the component tree automatically until the promise resolves.
                </AlertDescription>
              </Alert>
            </section>

            <section id="best-practices">
              <h2>Choosing Your Architecture</h2>
              <p>
                Dinou does not force a single "correct" pattern. Depending on your goals and preferences, you can choose the paradigm that best fits your development flow:
              </p>
              
              <div className="space-y-6 mt-6">
                <div>
                  <h4>Pattern A: The Client-First Model (<code>getProps</code> + Client Components)</h4>
                  <p className="text-sm text-muted-foreground">
                    If you prefer the mental simplicity and freedom of standard React, you can build your pages entirely as Client Components and fetch server-side data using the <code>getProps</code> function of <code>page_functions</code>.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-xs text-muted-foreground space-y-1">
                    <li><strong>Freedom &amp; Interactivity:</strong> You write familiar React code with full access to hooks and browser event listeners (like <code>onClick</code>) anywhere in the file.</li>
                    <li><strong>No Mental Splitting:</strong> No need to separate server and client boundaries inside the page file.</li>
                    <li><strong>Secure Data Fetching:</strong> The data in <code>getProps</code> still executes securely on the server (accessing databases/keys) and passes the results as props.</li>
                    <li><em>Trade-off:</em> The JavaScript bundle shipped to the browser includes the component logic and its imports.</li>
                  </ul>
                </div>

                <div>
                  <h4>Pattern B: The Server-First Model (Server Components)</h4>
                  <p className="text-sm text-muted-foreground">
                    If you are building content-heavy pages (like blogs, documentation, or landing pages) and want to minimize the JavaScript payload sent to the client, you can write them as Server Components.
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-xs text-muted-foreground space-y-1">
                    <li><strong>Ultra-Lightweight:</strong> The code for Server Components is never sent to the browser. Only the rendered HTML elements are shipped.</li>
                    <li><strong>Zero Bundle Overhead:</strong> Heavy libraries imported inside Server Components do not inflate the client bundle.</li>
                    <li><em>Trade-off:</em> You must explicitly split interactive elements (like custom buttons or input fields) into separate files marked with <code>"use client"</code>.</li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
