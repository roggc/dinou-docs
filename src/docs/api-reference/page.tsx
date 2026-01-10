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
import {
  Link as LinkIcon,
  Search,
  MapPin,
  Navigation,
  Loader,
  Server,
  Shield,
  AlertTriangle,
  Code,
  FileText,
  Replace,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "components", title: "1. Components (dinou)", level: 2 },
  { id: "link", title: "<Link>", level: 3 },
  { id: "clientredirect", title: "<ClientRedirect>", level: 3 },
  { id: "hooks-utilities", title: "2. Hooks & Utilities (dinou)", level: 2 },
  { id: "redirect", title: "redirect()", level: 3 },
  { id: "usesearchparams", title: "useSearchParams()", level: 3 },
  { id: "usepathname", title: "usePathname()", level: 3 },
  { id: "userouter", title: "useRouter()", level: 3 },
  { id: "usenavigationloading", title: "useNavigationLoading()", level: 3 },
  {
    id: "server-utilities",
    title: "3. Server-Only Utilities (dinou)",
    level: 2,
  },
  { id: "getcontext", title: "getContext()", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw] overflow-x-hidden">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                📚 API Reference: Components & Utilities
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive reference for Dinou's built-in components, hooks,
              and utilities available in both server and client environments.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <section id="components">
              <h2>1. Components (`dinou`)</h2>

              <section id="link">
                <h3>
                  <code>&lt;Link&gt;</code>
                </h3>
                <p>
                  The primary way to navigate between pages with client-side
                  transitions, automatic prefetching, and cache control.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { Link } from "dinou";

// Absolute path
<Link href="/dashboard">Home</Link>

// Relative path (go deeper)
<Link href="./settings">Settings</Link>

// Relative path (sibling)
<Link href="../profile">Profile</Link>

// With options
<Link href="/volatile-data" fresh prefetch={false}>
  Live Status
</Link>`}
                </CodeBlock>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Prop</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Default</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs">href</td>
                        <td className="p-4 font-mono text-xs">string</td>
                        <td className="p-4 font-mono text-xs">—</td>
                        <td className="p-4 text-xs">
                          Target path. Supports absolute and relative paths.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">prefetch</td>
                        <td className="p-4 font-mono text-xs">boolean</td>
                        <td className="p-4 font-mono text-xs">true</td>
                        <td className="p-4 text-xs">
                          Preload code and data on hover/viewport
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">fresh</td>
                        <td className="p-4 font-mono text-xs">boolean</td>
                        <td className="p-4 font-mono text-xs">false</td>
                        <td className="p-4 text-xs">
                          Bypass client-side cache, fetch fresh data
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">...props</td>
                        <td className="p-4 font-mono text-xs">HTMLAnchor</td>
                        <td className="p-4 font-mono text-xs">—</td>
                        <td className="p-4 text-xs">
                          Standard anchor attributes (className, target, etc.)
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Alert className="not-prose mt-4">
                  <LinkIcon className="h-4 w-4" />
                  <AlertTitle>Path Resolution</AlertTitle>
                  <AlertDescription>
                    Dinou resolves paths like a file system:
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>
                        <strong>Absolute:</strong> Starts with <code>/</code>{" "}
                        (e.g.
                        <code>/about</code>)
                      </li>
                      <li>
                        <strong>Relative (Child):</strong> No slash or{" "}
                        <code>./</code> (e.g., <code>team</code> from{" "}
                        <code>/about</code> → <code>/about/team</code>)
                      </li>
                      <li>
                        <strong>Relative (Sibling):</strong> Starts with{" "}
                        <code>../</code> (e.g., <code>../contact</code> from{" "}
                        <code>/about/team</code> → <code>/about/contact</code>)
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </section>

              <section id="clientredirect">
                <h3>
                  <code>&lt;ClientRedirect&gt;</code>
                </h3>
                <p>
                  Utility component that triggers immediate client-side
                  navigation when rendered. Recommended to use{" "}
                  <code>redirect()</code> helper instead for better server-side
                  handling.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { ClientRedirect } from "dinou";

// Forces navigation to home
return <ClientRedirect to="/" />;`}
                </CodeBlock>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Replace className="h-5 w-5 text-amber-500" />
                    <span>Use Case</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Useful when you need to trigger navigation from within
                    component rendering logic, but <code>redirect()</code> is
                    generally preferred.
                  </p>
                </div>
              </section>
            </section>

            <section id="hooks-utilities">
              <h2>2. Hooks & Utilities (`dinou`)</h2>
              <p>Functions available in both Server and Client environments.</p>

              <section id="redirect">
                <h3>
                  <code>redirect(destination)</code>
                </h3>
                <p>
                  Stops execution and redirects the user. Works on both server
                  (sets HTTP 307) and client (renders{" "}
                  <code>&lt;ClientRedirect&gt;</code>).
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { redirect } from "dinou";

// In a Server Component or Server Function
if (!user) {
  return redirect("/login");
}`}
                </CodeBlock>
              </section>

              <section id="usesearchparams">
                <h3>
                  <code>useSearchParams()</code>
                </h3>
                <p>
                  Returns a standard <code>URLSearchParams</code> object to read
                  query string parameters.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { useSearchParams } from "dinou";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  return <div>Result: {query}</div>;
}`}
                </CodeBlock>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Component Type</th>
                        <th className="p-4">Build Behavior</th>
                        <th className="p-4">Result</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          Server Component
                        </td>
                        <td className="p-4 text-xs">Triggers Static Bailout</td>
                        <td className="p-4 text-xs">
                          Switches to Dynamic Rendering (SSR)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">
                          Client Component
                        </td>
                        <td className="p-4 text-xs">No Bailout</td>
                        <td className="p-4 text-xs">
                          Remains Static (SSG). Initial HTML has empty params.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <Alert className="not-prose mt-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>⚠️ Hydration Warning</AlertTitle>
                  <AlertDescription>
                    In Client Components on static pages, server renders with
                    empty params (build time). For UI that depends heavily on
                    params, pass them as props from a Server Component.
                  </AlertDescription>
                </Alert>
              </section>

              <section id="usepathname">
                <h3>
                  <code>usePathname()</code>
                </h3>
                <p>
                  Returns the current URL pathname as a string (e.g.,{" "}
                  <code>/blog/post-1</code>).
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { usePathname } from "dinou";

export default function Navigation() {
  const pathname = usePathname();
  return <div>Current path: {pathname}</div>;
}`}
                </CodeBlock>
              </section>

              <section id="userouter">
                <h3>
                  <code>useRouter()</code> (Client Only)
                </h3>
                <p>
                  Provides programmatic navigation methods inside Client
                  Components.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";
import { useRouter } from "dinou";

export default function Controls() {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.push("/home")}>Push</button>
      <button onClick={() => router.replace("/home")}>Replace</button>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.forward()}>Forward</button>
      <button onClick={() => router.refresh()}>Refresh Data</button>
    </div>
  );
}`}
                </CodeBlock>
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Method</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs">push(href)</td>
                        <td className="p-4 text-xs">
                          Navigates to new URL (adds to history)
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">replace(href)</td>
                        <td className="p-4 text-xs">
                          Replaces current URL in history
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">back()</td>
                        <td className="p-4 text-xs">Goes back in history</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">forward()</td>
                        <td className="p-4 text-xs">Goes forward in history</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs">refresh()</td>
                        <td className="p-4 text-xs">
                          Soft reload: refetches server data without browser
                          refresh
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="usenavigationloading">
                <h3>
                  <code>useNavigationLoading()</code> (Client Only)
                </h3>
                <p>
                  Returns a boolean indicating if a client-side navigation is in
                  progress.
                </p>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";
import { useNavigationLoading } from "dinou";

export default function Header() {
  const isLoading = useNavigationLoading();
  return (
    <header>
      {isLoading && <div className="loading-bar" />}
      <nav>...</nav>
    </header>
  );
}`}
                </CodeBlock>
              </section>
            </section>

            <section id="server-utilities">
              <h2>3. Server-Only Utilities (`dinou`)</h2>

              <section id="getcontext">
                <h3>
                  <code>getContext()</code>
                </h3>
                <p>
                  Retrieves the request/response context.{" "}
                  <strong>Server Components Only</strong>.
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { getContext } from "dinou";

export default async function Profile() {
  const ctx = getContext();
  // Access request data
  const token = ctx.req.cookies.session_token;
  const userAgent = ctx.req.headers["user-agent"];
  
  // Set response headers
  ctx.res.setHeader("Cache-Control", "public, max-age=3600");
  
  return <div>...</div>;
}`}
                </CodeBlock>
                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span>Request Object</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm font-mono text-xs">
                      <div>headers, cookies, query,</div>
                      <div>path, method, body</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Server className="h-5 w-5 text-green-500" />
                        <span>Response Object</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-sm font-mono text-xs">
                      <div>status(), setHeader(),</div>
                      <div>redirect(), cookie()</div>
                    </CardContent>
                  </Card>
                </div>
                <Alert className="not-prose mt-4 border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-900">
                  <Shield className="h-4 w-4 text-red-600" />
                  <AlertTitle className="text-red-600">
                    ⚠️ Security Warning: `getContext` in Client Components
                  </AlertTitle>
                  <AlertDescription className="text-red-800 dark:text-red-300">
                    While technically available in Client Components during SSR,
                    <strong className="font-bold">
                      {" "}
                      never use it directly
                    </strong>
                    . Any data read gets serialized into public HTML. Fetch
                    sensitive data in Server Components and pass safe props to
                    Client Components.
                  </AlertDescription>
                </Alert>
                <CodeBlock
                  language="jsx"
                  containerClassName="w-full overflow-hidden rounded-lg mt-4"
                  highlightLines={[3, 9]}
                >
                  {`"use client";
import { getContext } from "dinou";

// ❌ DANGEROUS PATTERN - Data leaks to HTML!
export default function UserProfile() {
  const ctx = getContext(); // Runs on server during SSR
  return <div>{ctx.req.headers["authorization"]}</div>;
  // ⚠️ The sensitive header is now visible in page source!
}

// ✅ CORRECT PATTERN
// Fetch in Server Component, pass safe props
export default function Page() {
  const ctx = getContext();
  const safeUser = { name: ctx.req.cookies.username };
  return <ClientProfile user={safeUser} />;
}`}
                </CodeBlock>
              </section>
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
