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
  Server,
  Shield,
  AlertTriangle,
  FileText,
  Replace,
  Zap,
  Database,
  Layers,
  Settings,
  CheckCircle2,
  Code2,
  Boxes,
  Flame,
  Globe,
  Sliders,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "components", title: "1. Components (dinou)", level: 2 },
  { id: "link", title: "<Link>", level: 3 },
  { id: "clientredirect", title: "<ClientRedirect>", level: 3 },
  { id: "hooks-navigation", title: "2. Hooks & Navigation (dinou)", level: 2 },
  { id: "redirect", title: "redirect()", level: 3 },
  { id: "usesearchparams", title: "useSearchParams()", level: 3 },
  { id: "usepathname", title: "usePathname()", level: 3 },
  { id: "userouter", title: "useRouter()", level: 3 },
  { id: "refreshslot", title: "refreshSlot()", level: 3 },
  { id: "usenavigationloading", title: "useNavigationLoading()", level: 3 },
  { id: "server-context-config", title: "3. Server Context & Config (dinou)", level: 2 },
  { id: "getcontext", title: "getContext()", level: 3 },
  { id: "defineconfig", title: "defineConfig() & DinouConfig", level: 3 },
  { id: "dinouplugin", title: "DinouPlugin & onRequest", level: 3 },
  { id: "server-primitives-storage", title: "4. Server & Storage (dinou/server)", level: 2 },
  { id: "dinoucacheslot", title: "<DinouCacheSlot>", level: 3 },
  { id: "revalidatepath", title: "revalidatePath()", level: 3 },
  { id: "revalidatetag", title: "revalidateTag()", level: 3 },
  { id: "storage-adapters", title: "Storage Adapters", level: 3 },
  { id: "route-segment-contracts", title: "5. Route Contracts (page_functions)", level: 2 },
  { id: "getprops", title: "getProps()", level: 3 },
  { id: "revalidate-config", title: "revalidate", level: 3 },
  { id: "ppr-config", title: "ppr", level: 3 },
  { id: "getstaticpaths", title: "getStaticPaths", level: 3 },
  { id: "getcachetags", title: "getCacheTags", level: 3 },
  { id: "validateparams-isg", title: "validateParams & allowISG", level: 3 },
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
                📚 Complete API Reference
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Definitive TypeScript API reference for Dinou v7. Covers universal components,
              client hooks, server-only contexts, micro-ISR primitives, storage adapters,
              and route segment contracts.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* ================================================================= */}
            {/* SECTION 1: COMPONENTS */}
            {/* ================================================================= */}
            <section id="components" className="scroll-mt-20">
              <h2 className="flex items-center gap-3">
                1. Components (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Universal / Client
                </span>
              </h2>

              <section id="link" className="scroll-mt-20">
                <h3>
                  <code>&lt;Link&gt;</code>
                </h3>
                <p>
                  The primary navigation component in Dinou. Renders a native HTML <code>&lt;a&gt;</code> tag with SPA soft navigation, automatic background prefetching on hover, and optional cache bypassing.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { Link } from "dinou";

// Absolute navigation
<Link href="/dashboard">Dashboard</Link>

// Relative navigation (child route: /docs -> /docs/routing)
<Link href="./routing">Routing Guide</Link>

// Relative navigation (sibling route: /docs/routing -> /docs/rendering)
<Link href="../rendering">Rendering</Link>

// Forced cache-busting navigation (fresh server data)
<Link href="/orders" fresh prefetch={false}>
  Live Orders
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
                        <td className="p-4 font-mono text-xs text-primary font-semibold">href</td>
                        <td className="p-4 font-mono text-xs">string</td>
                        <td className="p-4 font-mono text-xs">—</td>
                        <td className="p-4 text-xs">
                          Target route path. Supports absolute (<code>/dashboard</code>) and relative (<code>./child</code>, <code>../sibling</code>) resolution.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs text-primary font-semibold">prefetch</td>
                        <td className="p-4 font-mono text-xs">boolean</td>
                        <td className="p-4 font-mono text-xs">true</td>
                        <td className="p-4 text-xs">
                          Automatically preloads the route code and RSC payload in the background when hovered or enters viewport.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs text-primary font-semibold">fresh</td>
                        <td className="p-4 font-mono text-xs">boolean</td>
                        <td className="p-4 font-mono text-xs">false</td>
                        <td className="p-4 text-xs">
                          Bypasses the client-side RSC cache on click, forcing a fresh round-trip to the server.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs text-primary font-semibold">...props</td>
                        <td className="p-4 font-mono text-xs">AnchorHTMLAttributes</td>
                        <td className="p-4 font-mono text-xs">—</td>
                        <td className="p-4 text-xs">
                          All standard HTML anchor attributes (<code>className</code>, <code>target</code>, <code>rel</code>, <code>onClick</code>, etc.).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <Alert className="not-prose mt-4">
                  <LinkIcon className="h-4 w-4" />
                  <AlertTitle>Filesystem Path Resolution</AlertTitle>
                  <AlertDescription>
                    Dinou resolves route links analogously to standard filesystem navigation:
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>
                        <strong>Absolute:</strong> Starts with <code>/</code> (e.g., <code>/dashboard</code>). Always resolves from the application root.
                      </li>
                      <li>
                        <strong>Relative Child:</strong> Starts with <code>./</code> or route name (e.g., <code>./details</code> from <code>/products</code> resolves to <code>/products/details</code>).
                      </li>
                      <li>
                        <strong>Relative Sibling:</strong> Starts with <code>../</code> (e.g., <code>../settings</code> from <code>/users/profile</code> resolves to <code>/users/settings</code>).
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </section>

              <section id="clientredirect" className="scroll-mt-20 mt-8">
                <h3>
                  <code>&lt;ClientRedirect&gt;</code>
                </h3>
                <p>
                  A client-side navigation component that performs an immediate router replace upon mounting in the browser.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { ClientRedirect } from "dinou";

export default function ForbiddenView() {
  // Triggers immediate client-side redirect to /login
  return <ClientRedirect to="/login" />;
}`}
                </CodeBlock>
                <div className="border rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2">
                    <Replace className="h-5 w-5 text-amber-500" />
                    <span>Best Practice Recommendation</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    While <code>&lt;ClientRedirect&gt;</code> is useful in purely declarative client scenarios, in Server Components, Server Functions, or <code>getProps</code> it is always recommended to use the universal <code>redirect()</code> function instead.
                  </p>
                </div>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 2: HOOKS & NAVIGATION */}
            {/* ================================================================= */}
            <section id="hooks-navigation" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                2. Hooks & Navigation (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                  Universal & Client Hooks
                </span>
              </h2>

              <section id="redirect" className="scroll-mt-20">
                <h3>
                  <code>redirect(destination: string)</code>
                </h3>
                <p>
                  A universal, polymorphic redirect utility. It terminates execution and navigates the user to a target URL. Intelligently adapts its behavior according to the current runtime execution context:
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Execution Context</th>
                        <th className="p-4">Runtime Mechanism</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold">Initial SSR (Headers Unsent)</td>
                        <td className="p-4 text-xs">
                          Issues an instant HTTP 307 Temporary Redirect response header directly from the server. Ideal for search engine bots, authentication walls, and initial entry points.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold">Active Streaming SSR / Client-side</td>
                        <td className="p-4 text-xs">
                          Yields a client redirect element (<code>&lt;ClientRedirect&gt;</code>) that instructs the browser router to replace the current route without a full page reload.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold">Server Functions (<code>"use server"</code>)</td>
                        <td className="p-4 text-xs">
                          Serializes a navigation command back across the Flight stream to immediately navigate the client UI upon action completion.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold"><code>page_functions.ts</code> (<code>getProps</code>)</td>
                        <td className="p-4 text-xs">
                          Short-circuits page rendering during static generation or server requests, shielding protected resources.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { redirect } from "dinou";

// 1. In a Server Component
export default async function AdminDashboard() {
  const session = await getSession();
  if (!session?.isAdmin) {
    return redirect("/unauthorized");
  }
  return <div>Admin Portal</div>;
}

// 2. In page_functions.ts (getProps)
export async function getProps() {
  const user = await authenticate();
  if (!user) {
    return redirect("./login"); // Relative redirect
  }
  return { user };
}

// 3. In a Server Function ("use server")
export async function logoutAction() {
  "use server";
  await destroySession();
  return redirect("/login");
}`}
                </CodeBlock>
              </section>

              <section id="usesearchparams" className="scroll-mt-20 mt-8">
                <h3>
                  <code>useSearchParams()</code>
                  <span className="ml-2 text-xs font-normal text-muted-foreground">(Client Only)</span>
                </h3>
                <p>
                  Returns a read-only instance of the standard Web <code>URLSearchParams</code> object to read query parameters inside Client Components. Automatically triggers re-renders when the query string changes.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";
import { useSearchParams } from "dinou";

export default function SearchBar() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";

  return <div>Active Search Query: {query}</div>;
}`}
                </CodeBlock>

                <Alert className="not-prose mt-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertTitle className="text-amber-800 dark:text-amber-300">
                    SSG Hydration Best Practice
                  </AlertTitle>
                  <AlertDescription className="text-amber-800 dark:text-amber-300 text-xs space-y-2 mt-1">
                    <p>
                      On statically pre-rendered routes (SSG), HTML is generated at build time when no client query string is known (rendering with empty params). If a Client Component immediately renders query-dependent HTML on initial load, a React hydration mismatch error can occur.
                    </p>
                    <p>
                      To guarantee seamless hydration, apply one of the following two patterns:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Pattern A (Deferred Hydration via useEffect):</strong> Keep initial render deterministic, then synchronize params after mounting:
                      </li>
                    </ul>
                    <CodeBlock language="tsx" containerClassName="mt-2 rounded-md">
                      {`"use client";
import { useSearchParams } from "dinou";
import { useState, useEffect } from "react";

export default function SearchComponent() {
  const rawParams = useSearchParams();
  const [query, setQuery] = useState("");

  useEffect(() => {
    // Synchronizes query strictly in the client after hydration
    setQuery(rawParams.get("q") ?? "");
  }, [rawParams]);

  return <div>Query: {query}</div>;
}`}
                    </CodeBlock>
                    <ul className="list-disc pl-4 space-y-1 mt-2">
                      <li>
                        <strong>Pattern B (Dynamic SSR):</strong> If the page fundamentally requires query parameters to render its initial HTML, switch the segment to dynamic SSR by setting <code>export const revalidate = 0;</code> in its <code>page_functions.ts</code>.
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>
              </section>

              <section id="usepathname" className="scroll-mt-20 mt-8">
                <h3>
                  <code>usePathname()</code>
                  <span className="ml-2 text-xs font-normal text-muted-foreground">(Client Only)</span>
                </h3>
                <p>
                  Returns the active URL pathname as a string (e.g., <code>"/docs/api-reference"</code>) inside Client Components. Re-evaluates when route transitions occur.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";
import { usePathname } from "dinou";

export default function Breadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex space-x-2 text-sm text-muted-foreground">
      <span>Home</span>
      {segments.map((segment) => (
        <span key={segment}>/ {segment}</span>
      ))}
    </nav>
  );
}`}
                </CodeBlock>
                <div className="border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/10 rounded-lg p-4 bg-card not-prose mt-4">
                  <div className="flex items-center gap-2 font-semibold mb-2 text-blue-600 dark:text-blue-400">
                    <Server className="h-5 w-5 text-blue-500" />
                    <span>Server Components Alternative</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    In Server Components, Client hooks cannot execute. Instead, access the current pathname synchronously through the server request context:
                  </p>
                  <CodeBlock language="tsx" containerClassName="mt-2 rounded-md">
                    {`import { getContext } from "dinou";

export default async function ServerPage() {
  const ctx = getContext();
  const currentPath = ctx?.req.path;
  return <div>Rendered at: {currentPath}</div>;
}`}
                  </CodeBlock>
                </div>
              </section>

              <section id="userouter" className="scroll-mt-20 mt-8">
                <h3>
                  <code>useRouter()</code>
                  <span className="ml-2 text-xs font-normal text-muted-foreground">(Client Only)</span>
                </h3>
                <p>
                  Provides imperative navigation and cache refreshing methods inside Client Components.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";
import { useRouter } from "dinou";

export default function NavigationControls() {
  const router = useRouter();

  return (
    <div className="flex gap-2">
      <button onClick={() => router.push("/catalog")}>Push</button>
      <button onClick={() => router.replace("/catalog")}>Replace</button>
      <button onClick={() => router.push("/orders", { fresh: true })}>Fresh Fetch</button>
      <button onClick={() => router.back()}>Back</button>
      <button onClick={() => router.forward()}>Forward</button>
      <button onClick={() => router.refresh()}>Soft Refresh</button>
      <button onClick={() => router.refreshSlot("user-cart")}>Refresh Cart Slot</button>
    </div>
  );
}`}
                </CodeBlock>

                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Method</th>
                        <th className="p-4">Signature</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">push</td>
                        <td className="p-4 font-mono text-xs">(href: string, options?: NavigationOptions) =&gt; void</td>
                        <td className="p-4 text-xs">
                          Navigates to <code>href</code> and pushes a new entry onto the browser history stack. Pass <code>&#123; fresh: true &#125;</code> to bypass the client cache.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">replace</td>
                        <td className="p-4 font-mono text-xs">(href: string, options?: NavigationOptions) =&gt; void</td>
                        <td className="p-4 text-xs">
                          Replaces the current history entry without pushing a new one. Supports <code>&#123; fresh: true &#125;</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">back</td>
                        <td className="p-4 font-mono text-xs">() =&gt; void</td>
                        <td className="p-4 text-xs">Navigates back to the previous entry in browser history.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">forward</td>
                        <td className="p-4 font-mono text-xs">() =&gt; void</td>
                        <td className="p-4 text-xs">Navigates forward to the next entry in browser history.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">refresh</td>
                        <td className="p-4 font-mono text-xs">() =&gt; void</td>
                        <td className="p-4 text-xs">
                          Triggers a soft reload: invalidates client cache for the current route, refetches the server RSC payload, and updates the DOM without destroying client state or performing a hard reload.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">refreshSlot</td>
                        <td className="p-4 font-mono text-xs">(slotId: string, options?: &#123; fresh?: boolean &#125;) =&gt; void</td>
                        <td className="p-4 text-xs">
                          Refetches and updates a specific <code>&lt;DinouCacheSlot&gt;</code> without re-rendering or refetching the surrounding page components.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="refreshslot" className="scroll-mt-20 mt-8">
                <h3>
                  <code>refreshSlot(slotId: string, options?: &#123; fresh?: boolean &#125;)</code>
                </h3>
                <p>
                  A standalone client-side helper exported directly from <code>"dinou"</code>. Allows any event handler or client utility to trigger targeted revalidation of a specific <code>&lt;DinouCacheSlot&gt;</code> by its ID or tag without having to instantiate the <code>useRouter()</code> hook.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { refreshSlot } from "dinou";

// Triggered from an independent analytics or websocket listener
function onStockUpdate(stockSymbol: string) {
  refreshSlot(\`stock-\${stockSymbol}\`, { fresh: true });
}`}
                </CodeBlock>
              </section>

              <section id="usenavigationloading" className="scroll-mt-20 mt-8">
                <h3>
                  <code>useNavigationLoading()</code>
                  <span className="ml-2 text-xs font-normal text-muted-foreground">(Client Only)</span>
                </h3>
                <p>
                  A hook that returns a boolean indicating whether an asynchronous SPA client-side route transition is currently pending.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`"use client";
import { useNavigationLoading } from "dinou";

export default function TopProgressBar() {
  const isNavigating = useNavigationLoading();

  if (!isNavigating) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-500 animate-pulse z-50" />
  );
}`}
                </CodeBlock>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 3: SERVER CONTEXT & CONFIG */}
            {/* ================================================================= */}
            <section id="server-context-config" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                3. Server Context &amp; Config (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-600 dark:text-green-400 ring-1 ring-inset ring-green-500/20">
                  Server-Side Execution
                </span>
              </h2>

              <section id="getcontext" className="scroll-mt-20">
                <h3>
                  <code>getContext(): RequestContextStore | undefined</code>
                </h3>
                <p>
                  Synchronously accesses the active HTTP request and response context via Node.js / V8 <code>AsyncLocalStorage</code>. Accessible inside <strong>Server Components</strong>, <strong>Server Functions (<code>"use server"</code>)</strong>, and <strong><code>page_functions.ts</code></strong> lifecycle hooks.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { getContext } from "dinou";

export default async function UserProfile() {
  const ctx = getContext();
  if (!ctx) {
    return <div>Static Build Context</div>;
  }

  // Reading request properties
  const authCookie = ctx.req.cookies.auth_token;
  const userAgent = ctx.req.headers["user-agent"];
  const clientIp = ctx.req.headers["x-forwarded-for"] || "127.0.0.1";
  const queryParam = ctx.req.query.tab;

  // Writing response properties
  ctx.res.setHeader("X-Custom-Engine", "Dinou-v7");
  ctx.res.cookie("last_visit", new Date().toISOString(), { httpOnly: true, secure: true });

  return <div>Welcome back! Active tab: {queryParam}</div>;
}`}
                </CodeBlock>

                <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <span>Request Store (<code>ctx.req</code>)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs font-mono space-y-1">
                      <div><strong>query:</strong> Record&lt;string, string | string[]&gt;</div>
                      <div><strong>cookies:</strong> Record&lt;string, string&gt;</div>
                      <div><strong>headers:</strong> IncomingHttpHeaders</div>
                      <div><strong>path:</strong> string (URL pathname)</div>
                      <div><strong>method:</strong> &quot;GET&quot; | &quot;POST&quot; | string</div>
                      <div><strong>env:</strong> Platform host env (Cloudflare, D1, KV)</div>
                      <div><strong>ctx:</strong> Execution context (waitUntil)</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2 font-semibold">
                        <Server className="h-5 w-5 text-green-500" />
                        <span>Response Proxy (<code>ctx.res</code>)</span>
                      </div>
                    </CardHeader>
                    <CardContent className="text-xs font-mono space-y-1">
                      <div><strong>cookie(name, value, options?):</strong> Set cookie</div>
                      <div><strong>clearCookie(name, options?):</strong> Expire cookie</div>
                      <div><strong>setHeader(name, value):</strong> Set HTTP header</div>
                      <div><strong>status(code):</strong> Set HTTP response code</div>
                      <div><strong>redirect(status?, url):</strong> Native HTTP redirect</div>
                    </CardContent>
                  </Card>
                </div>

                <Alert className="not-prose mt-4 border-red-200 bg-red-50 dark:bg-red-950/20 dark:border-red-900">
                  <Shield className="h-4 w-4 text-red-600 dark:text-red-400" />
                  <AlertTitle className="text-red-800 dark:text-red-300">
                    Security Warning: Never Call `getContext` in Client Components
                  </AlertTitle>
                  <AlertDescription className="text-red-800 dark:text-red-300 text-xs">
                    While <code>getContext()</code> is technically accessible during initial SSR in Client Component code, any secrets, session tokens, or sensitive headers read there are serialized into the public HTML and client JavaScript bundle. Always read confidential values in <strong>Server Components</strong> or <strong><code>getProps</code></strong>, sanitize them, and pass only safe props to Client Components.
                  </AlertDescription>
                </Alert>
              </section>

              <section id="defineconfig" className="scroll-mt-20 mt-8">
                <h3>
                  <code>defineConfig(config: DinouConfig): DinouConfig</code>
                </h3>
                <p>
                  Type-safe configuration helper for your project&apos;s root configuration file (<code>dinou.config.mjs</code> or <code>dinou.config.js</code>).
                </p>
                <CodeBlock
                  language="javascript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { defineConfig } from "dinou";
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

export default defineConfig({
  // React 19 StrictMode in dev (defaults to true in v7)
  reactStrictMode: true,

  // Global Partial Prerendering default (can be overridden per route)
  ppr: false,

  // Distributed storage adapter for ISR cache across server clusters
  storage: new RedisStorage(new Redis(process.env.REDIS_URL)),

  // Universal Web Standards request plugins
  plugins: [
    {
      name: "auth-guard",
      async onRequest(req, ctx) {
        if (req.url.includes("/api/secure") && !req.headers.get("authorization")) {
          return new Response("Unauthorized", { status: 401 });
        }
      },
    },
  ],
});`}
                </CodeBlock>

                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Property</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Default</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">reactStrictMode</td>
                        <td className="p-4 font-mono text-xs">boolean</td>
                        <td className="p-4 font-mono text-xs">true</td>
                        <td className="p-4 text-xs">
                          Enables React StrictMode double-rendering in development mode to catch side-effects and guarantee identical execution semantics with React Compiler production builds.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">ppr</td>
                        <td className="p-4 font-mono text-xs">boolean</td>
                        <td className="p-4 font-mono text-xs">false</td>
                        <td className="p-4 text-xs">
                          Global flag enabling Partial Prerendering across all static-eligible routes. Subroutes and layouts can override this setting.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">storage</td>
                        <td className="p-4 font-mono text-xs">StorageAdapter</td>
                        <td className="p-4 font-mono text-xs">FileSystemStorage</td>
                        <td className="p-4 text-xs">
                          Custom storage adapter instance used for ISR HTML and RSC payload persistence.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">plugins</td>
                        <td className="p-4 font-mono text-xs">DinouPlugin[]</td>
                        <td className="p-4 font-mono text-xs">[]</td>
                        <td className="p-4 text-xs">
                          Array of middleware plugins executed on every incoming HTTP request before React rendering.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="dinouplugin" className="scroll-mt-20 mt-8">
                <h3>
                  <code>DinouPlugin</code> &amp; <code>onRequest</code>
                </h3>
                <p>
                  Plugins run on the web server entrypoint for every HTTP request before React renders. If <code>onRequest</code> returns a standard Web <code>Response</code>, Dinou terminates the request immediately. If it returns nothing (<code>void</code>), execution proceeds to React, and any values attached to <code>context</code> are preserved and accessible anywhere via <code>getContext()</code>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import type { DinouPlugin } from "dinou";

export const telemetryPlugin: DinouPlugin = {
  name: "telemetry",
  async onRequest(request: Request, context) {
    const start = Date.now();
    
    // Attach custom properties to the AsyncLocalStorage context
    context.userIp = request.headers.get("cf-connecting-ip") || "unknown";

    // Fast-path edge responses (e.g. Health checks)
    if (new URL(request.url).pathname === "/healthz") {
      return new Response(JSON.stringify({ status: "ok", latency: Date.now() - start }), {
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};`}
                </CodeBlock>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 4: SERVER PRIMITIVES & STORAGE */}
            {/* ================================================================= */}
            <section id="server-primitives-storage" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                4. Server Primitives &amp; Storage (<code>dinou/server</code>)
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Micro-ISR &amp; Invalidation
                </span>
              </h2>

              <section id="dinoucacheslot" className="scroll-mt-20">
                <h3>
                  <code>&lt;DinouCacheSlot&gt;</code>
                </h3>
                <p>
                  The foundational primitive for <strong>Micro-ISR (Vertical 2D Segmentation)</strong>. Allows caching and revalidating independent component sub-trees inside a page without re-evaluating the parent page, re-fetching unchanged database records, or tearing down the client state.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { DinouCacheSlot } from "dinou/server";
import { TrendingSidebar } from "./trending";
import { StockTicker } from "./ticker";

export default async function FinancialDashboard() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <main className="col-span-3">
        {/* Main dashboard content */}
      </main>

      {/* Cached for 60 seconds independently */}
      <DinouCacheSlot id="trending-news" revalidate={60} tag="news">
        <TrendingSidebar />
      </DinouCacheSlot>

      {/* Invalidated on-demand via revalidateTag("stock-aapl") or refreshSlot("ticker-aapl") */}
      <DinouCacheSlot id="ticker-aapl" tags={["stocks", "stock-aapl"]}>
        <StockTicker symbol="AAPL" />
      </DinouCacheSlot>
    </div>
  );
}`}
                </CodeBlock>

                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Prop</th>
                        <th className="p-4">Type</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">id</td>
                        <td className="p-4 font-mono text-xs">string</td>
                        <td className="p-4 text-xs">
                          Unique identifier for targeted client-side slot refreshing via <code>refreshSlot(id)</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">tag / tags</td>
                        <td className="p-4 font-mono text-xs">string | string[]</td>
                        <td className="p-4 text-xs">
                          Cache tag(s) associated with this slot for server-side on-demand invalidation via <code>revalidateTag(tag)</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">revalidate</td>
                        <td className="p-4 font-mono text-xs">number</td>
                        <td className="p-4 text-xs">
                          Time-based TTL in seconds. Automatically refreshes the slot in the background once expired.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">children</td>
                        <td className="p-4 font-mono text-xs">ReactNode</td>
                        <td className="p-4 text-xs">
                          The Server Component sub-tree to isolate and cache.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="revalidatepath" className="scroll-mt-20 mt-8">
                <h3>
                  <code>revalidatePath(path: string): Promise&lt;void&gt;</code>
                </h3>
                <p>
                  Purges the cached static HTML and RSC payload for the target route and schedules immediate background regeneration.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { revalidatePath } from "dinou/server";

// 1. Revalidate an absolute route
await revalidatePath("/products");

// 2. Revalidate a dynamic parameterized route
await revalidatePath("/blog/announcing-v7");

// 3. Revalidate relative to current route
await revalidatePath("./");`}
                </CodeBlock>
              </section>

              <section id="revalidatetag" className="scroll-mt-20 mt-8">
                <h3>
                  <code>revalidateTag(tag: string): Promise&lt;void&gt;</code>
                </h3>
                <p>
                  Purges and marks for regeneration all routes and all <code>&lt;DinouCacheSlot&gt;</code> instances that match the given cache tag.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import { revalidateTag } from "dinou/server";

export async function updateProduct(productId: string) {
  "use server";
  await db.products.update(productId, { ... });

  // Invalidate every page and slot tagged with "products" or specific ID
  await revalidateTag("products");
  await revalidateTag(\`product-\${productId}\`);
}`}
                </CodeBlock>
              </section>

              <section id="storage-adapters" className="scroll-mt-20 mt-8">
                <h3>
                  Storage Adapters (<code>StorageAdapter</code>)
                </h3>
                <p>
                  Dinou separates caching logic from storage media. All static pre-rendered pages, ISR payloads, and slot fragments are read and written through a unified <code>StorageAdapter</code> interface.
                </p>

                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Adapter Class</th>
                        <th className="p-4">Constructor Signature</th>
                        <th className="p-4">Target Environment</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">FileSystemStorage</td>
                        <td className="p-4 font-mono text-xs">new FileSystemStorage(baseDir?: string)</td>
                        <td className="p-4 text-xs">Local development, single-node Docker, VPS servers (default).</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">RedisStorage</td>
                        <td className="p-4 font-mono text-xs">new RedisStorage(redisClient: any, prefix?: string)</td>
                        <td className="p-4 text-xs">Multi-container Kubernetes clusters, AWS ECS, Google Cloud Run.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">CloudflareKVStorage</td>
                        <td className="p-4 font-mono text-xs">new CloudflareKVStorage(kvNamespace: any)</td>
                        <td className="p-4 text-xs">Cloudflare Workers &amp; Pages at edge scale.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">DenoKVStorage</td>
                        <td className="p-4 font-mono text-xs">new DenoKVStorage(kvInstance?: any)</td>
                        <td className="p-4 text-xs">Deno Deploy &amp; distributed edge runtimes.</td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">MemoryStorage</td>
                        <td className="p-4 font-mono text-xs">new MemoryStorage()</td>
                        <td className="p-4 text-xs">Unit tests, ephemeral preview environments.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import {
  StorageAdapter,
  StorageItem,
  setStorageAdapter,
  getStorageAdapter,
} from "dinou/server";

// Inspect or replace the storage engine programmatically at runtime
const currentAdapter = getStorageAdapter();
console.log("Active storage engine:", currentAdapter.constructor.name);`}
                </CodeBlock>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 5: ROUTE SEGMENT CONTRACTS */}
            {/* ================================================================= */}
            <section id="route-segment-contracts" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                5. Route Segment Contracts (<code>page_functions</code>)
                <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                  page_functions.ts &amp; layout_functions.ts
                </span>
              </h2>
              <p>
                Dinou strictly decouples UI components from server-side lifecycle contracts. Route lifecycles are declared in parallel <code>page_functions.ts</code> (or <code>layout_functions.ts</code>) files.
              </p>

              <section id="getprops" className="scroll-mt-20">
                <h3>
                  <code>getProps(params?: TParams): Promise&lt;TProps&gt; | TProps</code>
                </h3>
                <p>
                  The server-side data loader. Returns an object of props passed directly to the corresponding <code>Page</code> or <code>Layout</code> component.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/app/products/[id]/page_functions.ts
import { redirect } from "dinou";
import type { PageFunctions } from "dinou";

interface ProductProps {
  product: { id: string; title: string; price: number };
}

export const getProps: PageFunctions<{ id: string }, ProductProps>["getProps"] = async (params) => {
  const product = await fetchProductById(params.id);
  
  if (!product) {
    return redirect("/404");
  }

  // Directly returned object becomes the Page component's props
  return { product };
};`}
                </CodeBlock>
              </section>

              <section id="revalidate-config" className="scroll-mt-20 mt-8">
                <h3>
                  <code>revalidate: number | false | (() =&gt; number | false | Promise&lt;number | false&gt;)</code>
                </h3>
                <p>
                  The single source of truth for page rendering and caching modes in seconds.
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Value</th>
                        <th className="p-4">Rendering Strategy</th>
                        <th className="p-4">Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary"><code>0</code> (or &lt; 1)</td>
                        <td className="p-4 font-semibold text-xs text-blue-600 dark:text-blue-400">Dynamic SSR</td>
                        <td className="p-4 text-xs">
                          Renders on every single request. Completely bypasses the static cache.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary"><code>&gt;= 1</code> (e.g. <code>60</code>)</td>
                        <td className="p-4 font-semibold text-xs text-green-600 dark:text-green-400">ISR (Incremental Static Regeneration)</td>
                        <td className="p-4 text-xs">
                          Cached for the specified duration in seconds. The next request after expiration triggers a background revalidation.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary"><code>false</code> (or omitted)</td>
                        <td className="p-4 font-semibold text-xs text-purple-600 dark:text-purple-400">Static (SSG)</td>
                        <td className="p-4 text-xs">
                          Pre-rendered and cached indefinitely until manually purged using <code>revalidatePath</code> or <code>revalidateTag</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="ppr-config" className="scroll-mt-20 mt-8">
                <h3>
                  <code>ppr: boolean | (() =&gt; boolean | Promise&lt;boolean&gt;)</code>
                </h3>
                <p>
                  Enables <strong>Partial Prerendering (PPR)</strong> for the route segment or layout. When enabled, Dinou generates an instant static HTML shell and streams dynamic Suspense holes concurrently.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/app/dashboard/layout_functions.ts
export const ppr = true; // Enables PPR for /dashboard and all child routes`}
                </CodeBlock>
              </section>

              <section id="getstaticpaths" className="scroll-mt-20 mt-8">
                <h3>
                  <code>getStaticPaths: StaticPathItem[] | (() =&gt; StaticPathsResult)</code>
                </h3>
                <p>
                  Defines the parameter list for dynamic routes (e.g., <code>[slug]</code>, <code>[id]</code>, or <code>[...catchall]</code>) to be pre-rendered during build time (SSG). Supports strings, numbers, arrays, or parameter objects.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// 1. Array of primitives (for single param [slug])
export const getStaticPaths = ["announcing-v7", "migration-guide"];

// 2. Array of objects (for multiple params [category]/[id])
export const getStaticPaths = [
  { category: "tech", id: "1" },
  { category: "design", id: "2" },
];

// 3. Async function (fetching from CMS/Database)
export async function getStaticPaths() {
  const articles = await fetchAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}`}
                </CodeBlock>
              </section>

              <section id="getcachetags" className="scroll-mt-20 mt-8">
                <h3>
                  <code>getCacheTags: string[] | ((params?: TParams) =&gt; string[] | Promise&lt;string[]&gt;)</code>
                </h3>
                <p>
                  Assigns cache tags to the route for invalidation via <code>revalidateTag(tag)</code>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`export function getCacheTags(params) {
  return ["articles", \`article-\${params.slug}\`];
}`}
                </CodeBlock>
              </section>

              <section id="validateparams-isg" className="scroll-mt-20 mt-8">
                <h3>
                  <code>validateParams</code> &amp; <code>allowISG</code>
                </h3>
                <p>
                  Fine-grained route perimeter guards and static generation controls:
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-muted text-muted-foreground font-medium">
                      <tr>
                        <th className="p-4">Export Hook</th>
                        <th className="p-4">Signature</th>
                        <th className="p-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">validateParams</td>
                        <td className="p-4 font-mono text-xs">(params?: TParams) =&gt; boolean | Promise&lt;boolean&gt;</td>
                        <td className="p-4 text-xs">
                          Validates dynamic route parameters before execution. Returning <code>false</code> immediately terminates the request with a clean 404 Not Found without invoking <code>getProps</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">allowISG</td>
                        <td className="p-4 font-mono text-xs">boolean | (() =&gt; boolean | Promise&lt;boolean&gt;)</td>
                        <td className="p-4 text-xs">
                          Controls whether dynamic routes not pre-rendered during build time by <code>getStaticPaths</code> can be generated on-demand (ISG) on the first visitor request. Default: <code>true</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`// src/app/users/[id]/page_functions.ts
export function validateParams(params) {
  // Only allow numeric user IDs
  return /^[0-9]+$/.test(params.id);
}

// Disallow on-demand generation; only paths defined in getStaticPaths exist
export const allowISG = false;`}
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
