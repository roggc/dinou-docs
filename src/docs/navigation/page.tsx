"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Badge } from "@/docs/components/ui/badge";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  MousePointerClick,
  RefreshCcw,
  Zap,
  ArrowRight,
  Code,
  Globe,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "link-component", title: "<Link> Component", level: 2 },
  { id: "programmatic-navigation", title: "Programmatic Navigation", level: 2 },
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
                Navigation
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Handle client-side transitions between routes using the Link
              component or programmatic hooks.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="link-component">
              <h2>
                The <code>&lt;Link&gt;</code> Component
              </h2>
              <p>
                The <code>&lt;Link&gt;</code> component is the primary way to
                navigate in Dinou. It extends the standard HTML anchor element
                to provide <strong>client-side soft navigation</strong> (SPA
                transitions) and automatic performance optimizations.
              </p>

              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`"use client";
import { Link } from "dinou";

export default function NavBar() {
  return (
    <nav className="flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/about">About</Link>
      
      {/* Opt-in for fresh data */}
      <Link href="/dashboard" fresh>
        Live Dashboard
      </Link>
    </nav>
  );
}`}
              </CodeBlock>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-8">
                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Zap className="h-5 w-5 text-yellow-500" />
                    <span>Automatic Prefetching</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    By default, Dinou prefetches the code and data for the
                    destination route when the user hovers over the link.
                  </p>
                </div>
                <div className="border rounded-lg p-4 bg-card">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <RefreshCcw className="h-5 w-5 text-blue-500" />
                    <span>The "Fresh" Prop</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Passing the <code>fresh</code> prop bypasses the Client
                    Router Cache and forces a fetch of the latest data from the
                    server. Ideal for volatile content.
                  </p>
                </div>
              </div>

              <Alert className="not-prose mt-6">
                <Globe className="h-4 w-4" />
                <AlertTitle>Native Elements</AlertTitle>
                <AlertDescription>
                  Standard HTML <code>&lt;a&gt;</code> tags also trigger
                  client-side soft navigation via global event delegation in
                  Dinou, but they <strong>lack the smart features</strong>{" "}
                  (prefetching, <code>fresh</code> prop) provided by the{" "}
                  <code>&lt;Link&gt;</code> component.
                </AlertDescription>
              </Alert>
            </section>

            <section id="programmatic-navigation">
              <h2>Programmatic Navigation</h2>
              <p>
                To navigate imperatively, use the <code>useRouter</code> hook
                inside <strong>Client Components</strong>.
              </p>

              <CodeBlock
                language="jsx"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`"use client";
import { useRouter } from "dinou";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    await login();
    router.push("/dashboard");
  };

  return <button onClick={handleLogin}>Log in</button>;
}`}
              </CodeBlock>

              <h3 className="mt-8">API Reference</h3>
              <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4 w-40">Method</th>
                      <th className="p-4">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card">
                    <tr>
                      <td className="p-4 font-mono text-blue-600">
                        router.push(href)
                      </td>
                      <td className="p-4">
                        Navigates to the provided route. Adds a new entry to the
                        browser's history stack.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-blue-600">
                        router.replace(href)
                      </td>
                      <td className="p-4">
                        Navigates to the provided route. Replaces the current
                        entry in the browser's history stack.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-blue-600">
                        router.back()
                      </td>
                      <td className="p-4">
                        Navigates back to the previous page in the history.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-blue-600">
                        router.forward()
                      </td>
                      <td className="p-4">
                        Navigates forward to the next page in the history.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-4 font-mono text-purple-600">
                        router.refresh()
                      </td>
                      <td className="p-4">
                        <strong>Soft Reload:</strong> Re-fetches the current
                        route's data from the server and re-renders the page
                        without losing client-side state (like input values or
                        scroll position).
                      </td>
                    </tr>
                  </tbody>
                </table>
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
