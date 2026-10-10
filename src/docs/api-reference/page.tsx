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
  ShieldCheck,
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
  ArrowRightLeft,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";

const tocItems = [
  { id: "components", title: "1. Components (dinou)", level: 2 },
  { id: "link", title: "<Link>", level: 3 },
  { id: "clientredirect", title: "<ClientRedirect>", level: 3 },
  { id: "hooks-navigation", title: "2. Hooks & Navigation (dinou)", level: 2 },
  { id: "redirect", title: "redirect()", level: 3 },
  { id: "usesearchparams", title: "useSearchParams()", level: 3 },
  { id: "usesearchparams-server", title: "in Server Components", level: 4 },
  { id: "usesearchparams-client", title: "in Client Components", level: 4 },
  { id: "usepathname", title: "usePathname()", level: 3 },
  { id: "usepathname-server", title: "in Server Components", level: 4 },
  { id: "usepathname-client", title: "in Client Components", level: 4 },
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
  { id: "type-safe-routing", title: "6. Type-Safe Routing (dinou)", level: 2 },
  { id: "pageprops", title: "PageProps<T>", level: 3 },
  { id: "layoutprops", title: "LayoutProps<T>", level: 3 },
  { id: "routeparams", title: "RouteParams<T>", level: 3 },
  { id: "dinouroute", title: "DinouRoute", level: 3 },
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
                        <td className="p-4 font-mono text-xs">DinouRoute (string)</td>
                        <td className="p-4 font-mono text-xs">—</td>
                        <td className="p-4 text-xs">
                          Target route path. Strictly typed with <code>DinouRoute</code> for instant IDE autocomplete and dead-link detection. Supports absolute (<code>/dashboard</code>), relative (<code>./child</code>, <code>../sibling</code>), query strings, and external URLs.
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
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Universal & Client Hooks
                </span>
              </h2>

              <section id="redirect" className="scroll-mt-20">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="m-0 text-xl font-bold font-mono">
                    redirect(destination: string): ReactNode
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Universal Primitive
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Returns: &lt;ClientRedirect /&gt;
                  </span>
                </div>

                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                  Dinou&apos;s universal, polymorphic redirection primitive. It safely interrupts the current execution pipeline and redirects the browser or crawler to the destination path. Rather than relying on rigid browser-only APIs or uncatchable exceptions, <code>redirect()</code> automatically adapts its underlying transport mechanism to the active runtime context (Initial SSR, Active Streaming, RSC Flight, Server Functions, or Client Components).
                </p>

                {/* Always Return Pattern Callout */}
                <div className="my-6 rounded-lg border border-amber-500/30 bg-amber-500/5 p-4 not-prose">
                  <div className="flex items-center gap-2 font-semibold text-amber-700 dark:text-amber-300 text-sm">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400" />
                    <span>Architectural Contract: Always Use the &quot;return redirect(...)&quot; Pattern</span>
                  </div>
                  <div className="mt-2 text-xs text-muted-foreground space-y-2 leading-relaxed">
                    <p>
                      Rather than throwing an internal JavaScript exception to abruptly interrupt execution, Dinou&apos;s <code>redirect(destination)</code> <strong>returns a valid React element</strong> (<code>&lt;ClientRedirect to=&#123;destination&#125; /&gt;</code> of type <code>ReactNode</code>).
                    </p>
                    <p>
                      Because it does not throw an exception, calling <code>redirect(&quot;/path&quot;)</code> without <code>return</code> will <strong>not</strong> stop subsequent lines of code from executing. You must always precede it with <code>return</code>:
                    </p>
                    <div className="grid sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
                      <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-700 dark:text-rose-300">
                        <span className="font-bold">❌ Incorrect:</span>
                        <div className="mt-1 text-muted-foreground">
                          <code>redirect(&quot;/login&quot;);</code>
                          <br />
                          <code>// Subsequent code STILL runs!</code>
                        </div>
                      </div>
                      <div className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300">
                        <span className="font-bold">✅ Correct:</span>
                        <div className="mt-1 text-muted-foreground">
                          <code>return redirect(&quot;/login&quot;);</code>
                          <br />
                          <code>// Exits immediately &amp; returns ReactNode</code>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 text-[11px] text-muted-foreground space-y-1.5">
                      <p className="font-semibold text-foreground">Why this design?</p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          <strong>Clean TypeScript types:</strong> Satisfies <code>Promise&lt;ReactNode&gt;</code> in async Server Components without requiring type assertions or casting.
                        </li>
                        <li>
                          <strong>Safe inside <code>try/catch</code>:</strong> Because it is a normal declarative element and not an unhandled exception, your application error boundaries and <code>catch</code> blocks won&apos;t accidentally intercept or cancel the navigation.
                        </li>
                        <li>
                          <strong>Works inside <code>&lt;Suspense&gt;</code>:</strong> When an async component redirects after the HTTP stream has already started (<code>200 OK</code>), Dinou safely streams <code>&lt;ClientRedirect /&gt;</code> down to the browser to navigate upon hydration, avoiding unexpected Error Boundary crashes.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* 5 Runtime Execution Modes */}
                <div className="my-6 space-y-4 not-prose">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <ArrowRightLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>The 5 Polymorphic Runtime Execution Modes</span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    {/* Mode 1 */}
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <Globe className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>1. Initial SSR &amp; Pre-flight (Headers Unsent)</span>
                        </div>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                          HTTP 302
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Occurs when called inside <code>getProps()</code> in <code>page_functions.ts</code>, at the top level of the root <code>page.tsx</code> Server Component (before stream initialization), or inside a global plugin hook (<code>onRequest</code>).
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Because zero HTML bytes have reached the wire (<code>headersSent === false</code>), Dinou issues an immediate <strong>HTTP 302 Found</strong> with a <code>Location</code> header. <strong>Critical for SEO crawlers and search indexers.</strong>
                      </p>
                    </div>

                    {/* Mode 2 */}
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <Zap className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>2. RSC Flight Navigation</span>
                        </div>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                          x-rsc-redirect
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Occurs during client-side SPA route transitions when the client browser requests a React Server Component flight payload via Dinou&apos;s internal flight endpoint.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Dinou responds with an <code>x-rsc-redirect: /dest</code> header with status <code>200 OK</code>. Dinou&apos;s client router intercepts this header and transitions to the target route smoothly without destroying client application state.
                      </p>
                    </div>

                    {/* Mode 3 */}
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <Server className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>3. Server Functions (<code>&quot;use server&quot;</code>)</span>
                        </div>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                          Soft SPA Navigation
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Invoked from browser form actions or event handlers via a dedicated HTTP <code>POST</code> request.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        The server executes the mutation and returns redirection metadata. The client RPC proxy intercepts it and drives an SPA router transition (<code>router.replace()</code>) <strong>without a full page reload</strong>, preserving client state and scroll position.
                      </p>
                    </div>

                    {/* Mode 4 */}
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <Layers className="h-3.5 w-3.5 text-amber-600 dark:text-amber-400" />
                          <span>4. Deferred Streaming SSR (&lt;Suspense&gt;)</span>
                        </div>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 font-medium">
                          Hydration Fallback
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Occurs when an async component wrapped in <code>&lt;Suspense&gt;</code> redirects after React has already opened the HTTP connection with status <code>200 OK</code> to stream the document shell.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Because an open <code>200 OK</code> stream cannot turn into a <code>302</code>, Dinou injects <code>&lt;ClientRedirect /&gt;</code> into the stream and writes an inline script fallback, completing the transition upon browser mount without aborting the connection.
                      </p>
                    </div>

                    {/* Mode 5 (Full Width) */}
                    <div className="md:col-span-2 p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-foreground flex items-center gap-1.5">
                          <Code2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                          <span>5. Client Components In-Render (0ms Client Dispatch)</span>
                        </div>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                          router.replace() (0ms)
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When called inside a Client Component during browser rendering, no network roundtrip is initiated. Dinou returns <code>&lt;ClientRedirect /&gt;</code> whose <code>useEffect</code> hook immediately invokes <code>router.replace()</code> in the client SPA router, updating the view instantaneously.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Server Component Equivalence Principle & Security Sandbox */}
                <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
                  <div className="p-4 rounded-lg bg-emerald-500/5 border border-emerald-500/20 space-y-2 text-xs">
                    <div className="font-semibold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>The Equivalence Principle in Server Components</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Calling <code>redirect()</code> directly inside a Server Component vs. calling an imported Server Function (e.g. <code>await requireAuth()</code>) from that Server Component is <strong>functionally identical</strong>.
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Because both execute inside the exact same Node.js SSR worker during the same request lifecycle, they share the identical <code>AsyncLocalStorage</code> context store and streaming pipeline.
                    </p>
                  </div>

                  <div className="p-4 rounded-lg bg-card border border-border space-y-2 text-xs">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Shield className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                      <span>Built-in Open-Redirect Protection</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Dinou&apos;s runtime includes automatic path sanitization. Target paths must resolve to a valid internal route (starting with a single <code>/</code>).
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      Protocol-relative targets (e.g. <code>//evil.com</code>) or unauthorized external schemes are sanitized, safeguarding your application against open-redirect phishing vulnerabilities.
                    </p>
                  </div>
                </div>

                {/* Full Execution Reference Matrix */}
                <div className="not-prose my-6 space-y-2">
                  <div className="font-semibold text-sm text-foreground">
                    Runtime Execution Reference Matrix
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-border bg-card">
                    <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Invocation Context</th>
                          <th className="p-3">Headers Sent?</th>
                          <th className="p-3">HTTP Status / Header</th>
                          <th className="p-3">Client Transition</th>
                          <th className="p-3">Best Used For</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-muted-foreground">
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">
                            Root SSR / <code>page_functions.ts</code> / Plugin
                          </td>
                          <td className="p-3 align-top">
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">No</span>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            HTTP 302 Found<br />
                            <span className="text-muted-foreground font-sans">Location: /url</span>
                          </td>
                          <td className="p-3 align-top">
                            Full browser navigation (hard reload)
                          </td>
                          <td className="p-3 align-top">
                            Auth walls, root route guards, SEO canonicals
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">
                            RSC Flight Navigation
                          </td>
                          <td className="p-3 align-top">
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">No</span>
                          </td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            HTTP 200 OK<br />
                            <span className="text-muted-foreground font-sans">x-rsc-redirect: /url</span>
                          </td>
                          <td className="p-3 align-top">
                            Soft SPA navigation (zero full reload)
                          </td>
                          <td className="p-3 align-top">
                            Client-side Link clicks to guarded server routes
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">
                            Server Functions (<code>&quot;use server&quot;</code>)
                          </td>
                          <td className="p-3 align-top">
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">No</span> (dedicated POST)
                          </td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            HTTP 200 OK<br />
                            <span className="text-muted-foreground font-sans">RPC redirect payload</span>
                          </td>
                          <td className="p-3 align-top">
                            Soft SPA navigation (<code>router.replace</code>)
                          </td>
                          <td className="p-3 align-top">
                            Form mutations, cart checkout, login actions
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">
                            Deferred SSR (Inside <code>&lt;Suspense&gt;</code>)
                          </td>
                          <td className="p-3 align-top">
                            <span className="font-mono text-amber-600 dark:text-amber-400 font-semibold">Yes</span> (200 stream open)
                          </td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            HTTP 200 OK (Chunked)<br />
                            <span className="text-muted-foreground font-sans">&lt;ClientRedirect /&gt;</span>
                          </td>
                          <td className="p-3 align-top">
                            SPA transition upon browser hydration
                          </td>
                          <td className="p-3 align-top">
                            Late permission checks inside streamed async UI
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">
                            Client Components (In-render)
                          </td>
                          <td className="p-3 align-top">
                            <span className="font-mono text-muted-foreground">N/A</span> (in-browser)
                          </td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            None (0ms local dispatch)
                          </td>
                          <td className="p-3 align-top">
                            Immediate <code>router.replace()</code>
                          </td>
                          <td className="p-3 align-top">
                            Declarative client state gates, wizard step navigation
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Practical Implementation Examples */}
                <div className="not-prose my-6 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Code2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Implementation Examples Across Architectures</span>
                  </div>
                  <TabbedCodeBlock
                    defaultTab="server-component"
                    tabs={[
                      {
                        id: "server-component",
                        label: "page.tsx (Server Component)",
                        language: "tsx",
                        code: `// src/admin/page.tsx (React Server Component)
import { Suspense } from "react";
import { redirect, getContext } from "dinou";

// 1. Root pre-flight check (Headers unsent -> HTTP 302 for crawlers)
export default async function AdminPage() {
  const { req } = getContext();
  if (!req.cookies.auth_token) {
    return redirect("/login");
  }

  return (
    <div>
      <h1>Admin Management</h1>
      <Suspense fallback={<p>Verifying advanced permissions...</p>}>
        <RestrictedMetrics />
      </Suspense>
    </div>
  );
}

// 2. Deferred check inside Suspense (Headers already sent -> <ClientRedirect />)
async function RestrictedMetrics() {
  const hasAccess = await checkSuperAdmin();
  if (!hasAccess) {
    return redirect("/admin/insufficient-permissions");
  }
  return <div>Superadmin Metrics Content</div>;
}`,
                      },
                      {
                        id: "server-function",
                        label: "actions.ts (Server Function)",
                        language: "typescript",
                        code: `// src/actions/checkout.ts
"use server";

import { redirect } from "dinou";
import db from "@/lib/db";

export async function processPayment(formData: FormData) {
  const cartId = formData.get("cartId") as string;
  const order = await db.orders.charge(cartId);

  // Dedicated POST mutation:
  // Dinou returns redirect metadata; client executes a smooth SPA transition
  // without losing React state or reloading the entire browser window!
  return redirect(\`/orders/\${order.id}/confirmed\`);
}`,
                      },
                      {
                        id: "page-functions",
                        label: "page_functions.ts (getProps)",
                        language: "typescript",
                        code: `// src/settings/page_functions.ts
import { redirect, getContext } from "dinou";

export async function getProps() {
  const { req } = getContext();

  // Evaluated before any JSX rendering begins:
  // Short-circuits the pipeline with an immediate HTTP 302 Found
  if (!req.cookies.session_id) {
    return redirect("/login?from=/settings");
  }

  const profile = await fetchUserProfile(req.cookies.session_id);
  return { profile };
}`,
                      },
                      {
                        id: "client-component",
                        label: "client-guard.tsx (Client Component)",
                        language: "tsx",
                        code: `// src/components/client-guard.tsx
"use client";

import { redirect } from "dinou";

interface GuardProps {
  isAuthenticated: boolean;
  children: React.ReactNode;
}

export function ClientAuthGuard({ isAuthenticated, children }: GuardProps) {
  if (!isAuthenticated) {
    // Evaluates in browser render: dispatches router.replace() in 0ms!
    return redirect("/auth/sign-in");
  }

  return <>{children}</>;
}`,
                      },
                      {
                        id: "custom-status",
                        label: "dinou.config.mjs (Custom 301 / Plugin)",
                        language: "javascript",
                        code: `// dinou.config.mjs (Global Plugin / Middleware)
import { defineConfig } from "dinou/config";

export default defineConfig({
  plugins: [
    {
      name: "legacy-redirects",
      // Universal Web Standards hook (runs on Edge, Workers, Node & Bun)
      async onRequest(request, context) {
        const url = new URL(request.url);

        // Permanent 301 SEO redirection for legacy URLs
        if (url.pathname === "/old-docs" || url.pathname.startsWith("/docs/v1")) {
          return Response.redirect(new URL("/docs", request.url), 301);
        }

        // Temporary 307 redirect preserving HTTP method
        if (url.pathname === "/legacy-api/upload") {
          return Response.redirect(new URL("/api/v2/upload", request.url), 307);
        }
      },
    },
  ],
});`,
                      },
                    ]}
                  />
                </div>

                {/* Response.redirect vs context.res.redirect Callout */}
                <div className="border rounded-lg p-4 bg-card not-prose mt-4 text-xs space-y-2 border-border">
                  <div className="flex items-center gap-2 font-semibold text-foreground text-sm">
                    <ArrowRightLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Choosing the Right Redirection Mechanism</span>
                  </div>
                  <div className="text-muted-foreground space-y-1.5 leading-relaxed">
                    <p>
                      <strong>In Plugins &amp; Middlewares (<code>onRequest</code> in <code>dinou.config.mjs</code>):</strong> Return a native Web Standards <code>Response.redirect(url, status)</code>. Dinou detects <code>result instanceof Response</code> and terminates the request immediately (&lt;1ms) before route matching, file I/O, or React rendering starts.
                    </p>
                    <p>
                      <strong>In Server Components &amp; <code>page_functions.ts</code>:</strong> Use the universal <code>return redirect(&quot;/path&quot;)</code> helper (which automatically defaults to HTTP 302 on unsent headers). If you require an explicit status code (such as a permanent <code>301 Moved Permanently</code> for SEO canonical URLs), obtain the context via <code>const &#123; res &#125; = getContext();</code> and invoke <code>res.redirect(301, &quot;/path&quot;)</code>.
                    </p>
                  </div>
                </div>
              </section>

              <section id="usesearchparams" className="scroll-mt-20 mt-8">
                <div className="flex items-center gap-2">
                  <h3 className="m-0">
                    <code>useSearchParams()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Universal Hook
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Returns a standard Web <code>URLSearchParams</code> instance representing the active query string. In Dinou, <code>useSearchParams()</code> is a <strong>universal hook</strong> that operates across both backend and browser execution environments without prop drilling.
                </p>

                {/* ============================================================= */}
                {/* SUBSECTION 1: SERVER COMPONENTS */}
                {/* ============================================================= */}
                <div id="usesearchparams-server" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-500" />
                      <span>useSearchParams() in Server Components</span>
                    </h4>
                    <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                      Server-Side (0 KB Bundle)
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    In Server Components, <code>useSearchParams()</code> resolves synchronously from the active HTTP request context (via Node.js / V8 <code>AsyncLocalStorage</code>) during SSR and deferred <code>&lt;Suspense&gt;</code> streams. In Dinou, query parameters are <strong>not passed via component props</strong>, eliminating props drilling across server component trees.
                  </p>

                  <div className="overflow-x-auto my-3 border rounded-lg border-border not-prose">
                    <table className="w-full text-xs text-left border-collapse">
                      <tbody className="divide-y divide-border/50 text-muted-foreground">
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground w-1/3">Execution Environment</td>
                          <td className="py-2 px-3">100% backend (Node.js, Bun, Cloudflare Workers, Edge).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Client Bundle Impact</td>
                          <td className="py-2 px-3"><strong>0 KB</strong> (logic and DB/ORM dependencies are never sent to the browser).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Data Origin</td>
                          <td className="py-2 px-3">HTTP request store via <code>AsyncLocalStorage</code> (<code>ctx.req.query</code>).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Primary Purpose</td>
                          <td className="py-2 px-3"><strong>Data Fetching:</strong> Direct DB/ORM queries and private APIs with credentials.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Static Caching (SSG)</td>
                          <td className="py-2 px-3">Empty at build time; requires dynamic SSR (<code>revalidate = 0</code>) or PPR (<code>ppr = true</code> with <code>&lt;Suspense&gt;</code>).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Props Drilling</td>
                          <td className="py-2 px-3">None. Query parameters are not passed via component props in Dinou.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <CodeBlock language="tsx" containerClassName="w-full overflow-hidden rounded-lg my-3">
                    {`// src/products/page.tsx (Server Component)
import { useSearchParams } from "dinou";
import { db } from "@/lib/db"; // Direct DB / ORM query executed on backend

export default async function ProductsPage() {
  // Directly resolves the active request query string
  const searchParams = useSearchParams();
  const category = searchParams.get("category");

  // Query runs safely on backend with secrets protected and 0 KB client JS
  const products = await db.products.findMany({
    where: category ? { category } : undefined,
  });

  return (
    <div>
      <h1>Products: {category || "All"}</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>{p.name}</li>
        ))}
      </ul>
    </div>
  );
}`}
                  </CodeBlock>

                  <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 border border-border/60 space-y-2">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                      <span>Handling Query Parameters on the Server (SSG, SSR &amp; PPR):</span>
                    </p>
                    <p>
                      Because static pre-rendering (SSG) compiles HTML at build time when no client query string exists, <code>searchParams</code> evaluates with empty parameters during build. If your Server Component requires live, per-visitor query parameters, choose one of two server strategies in <code>page_functions.ts</code>:
                    </p>
                    <ul className="list-disc pl-4 space-y-1">
                      <li>
                        <strong>Dynamic SSR:</strong> Set <code>export const revalidate = 0;</code> to execute and render the entire page dynamically per request on the server.
                      </li>
                      <li>
                        <strong>Partial Prerendering (PPR):</strong> Set <code>export const ppr = true;</code> and wrap the query-dependent component in React <code>&lt;Suspense&gt;</code> to deliver an instant static shell from Edge CDN (0ms TTFB) while streaming the dynamic query results live over the open HTTP connection.
                      </li>
                    </ul>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 2: CLIENT COMPONENTS */}
                {/* ============================================================= */}
                <div id="usesearchparams-client" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-emerald-500" />
                      <span>useSearchParams() in Client Components</span>
                    </h4>
                    <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                      "use client"
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    In Client Components, <code>useSearchParams()</code> lets you read and react to URL query parameters directly in the browser. It is fully reactive: whenever the URL changes (via <code>router.push()</code>, <code>&lt;Link&gt;</code>, or browser Back/Forward buttons), your component automatically re-renders with the latest values.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    Because client navigation is smooth and does not trigger a full page reload, your local component state (such as <code>useState</code> values, form input focus, and scroll position) is preserved, while any server data on the page refreshes seamlessly in the background.
                  </p>

                  <div className="overflow-x-auto my-3 border rounded-lg border-border not-prose">
                    <table className="w-full text-xs text-left border-collapse">
                      <tbody className="divide-y divide-border/50 text-muted-foreground">
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground w-1/3">Execution Environment</td>
                          <td className="py-2 px-3">Browser runtime (with initial server-side SSR hydration).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Client Bundle Impact</td>
                          <td className="py-2 px-3">Included in client JavaScript bundle.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Data Origin</td>
                          <td className="py-2 px-3">Live browser URL (synchronized with client navigation).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Primary Purpose</td>
                          <td className="py-2 px-3"><strong>UI Interactivity:</strong> Inputs, visual tabs, filter toggles, triggering navigations via <code>router.push()</code>.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Static Caching (SSG)</td>
                          <td className="py-2 px-3"><strong>Preserves SSG;</strong> page remains 100% static HTML cached at CDN edge.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">State Preservation</td>
                          <td className="py-2 px-3">Local component state (<code>useState</code>, input focus) preserved during navigation transitions.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <CodeBlock language="tsx" containerClassName="w-full overflow-hidden rounded-lg my-3">
                    {`// src/components/search-filter.tsx (Client Component)
"use client";

import { useSearchParams, useRouter } from "dinou";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";

  const handleSearch = (newQuery: string) => {
    const params = new URLSearchParams(searchParams);
    if (newQuery) {
      params.set("q", newQuery);
    } else {
      params.delete("q");
    }

    // Updates the URL seamlessly without a full page reload
    router.push(\`?\${params.toString()}\`);
  };

  return (
    <div>
      <input
        type="search"
        defaultValue={currentQuery}
        placeholder="Search products..."
        onChange={(e) => handleSearch(e.target.value)}
      />
      <p>Active query: {currentQuery}</p>
    </div>
  );
}`}
                  </CodeBlock>

                  <Alert className="not-prose mt-4 border-amber-200 bg-amber-50 dark:bg-amber-950/20 dark:border-amber-900">
                    <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertTitle className="text-amber-800 dark:text-amber-300 font-semibold text-xs">
                      SSG Hydration Best Practice
                    </AlertTitle>
                    <AlertDescription className="text-amber-800 dark:text-amber-300 text-xs space-y-2 mt-1">
                      <p>
                        On statically pre-rendered routes (SSG), HTML is generated at build time when no client query string is known (rendering with empty params). If a Client Component immediately renders query-dependent HTML on initial load, a React hydration mismatch error can occur.
                      </p>
                      <p>
                        To resolve this, choose one of the following two patterns:
                      </p>
                      <ul className="list-disc pl-4 space-y-1">
                        <li>
                          <strong>Pattern A (Deferred Hydration via useEffect):</strong> Keep the page 100% static on CDN Edge. Render deterministic markup initially, then synchronize the query parameters after mounting:
                        </li>
                      </ul>
                      <CodeBlock language="tsx" containerClassName="mt-2 rounded-md">
                        {`"use client";
import { useSearchParams } from "dinou";
import { useState, useEffect } from "react";

export default function SafeSearchClient() {
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
                          <strong>Pattern B (Dynamic SSR):</strong> If the initial server HTML must include the query parameter (e.g. for SEO or instant visual rendering without waiting for hydration), switch the route to dynamic SSR by setting <code>export const revalidate = 0;</code> in <code>page_functions.ts</code>. On dynamic routes, SSR has direct access to the visitor's request query, preventing hydration mismatches entirely.
                        </li>
                      </ul>
                    </AlertDescription>
                  </Alert>
                </div>
              </section>

              <section id="usepathname" className="scroll-mt-20 mt-8">
                <div className="flex items-center gap-2">
                  <h3 className="m-0">
                    <code>usePathname()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Universal Hook
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Returns the normalized URL pathname of the active request or current browser location as a string (e.g. <code>&quot;/docs/api-reference&quot;</code>). In Dinou, <code>usePathname()</code> is a <strong>universal hook</strong> that operates across both backend and browser execution environments with automatic trailing slash normalization and query/hash sanitization.
                </p>

                {/* Normalization & Sanitization Callout */}
                <div className="grid md:grid-cols-2 gap-3 my-4 not-prose text-xs">
                  <div className="p-3.5 rounded-lg bg-card border border-border space-y-1.5">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Trailing Slash Normalization</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Dinou automatically normalizes incoming paths by stripping trailing slashes (e.g. <code>/dashboard/</code> becomes <code>&quot;/dashboard&quot;</code>). The root route always remains <code>&quot;/&quot;</code>.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-lg bg-card border border-border space-y-1.5">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Query &amp; Hash Sanitization</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      All query strings (<code>?tab=preview</code>) and URL fragments (<code>#section-1</code>) are stripped from the return value. To read query parameters, use <code>useSearchParams()</code>.
                    </p>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 1: SERVER COMPONENTS */}
                {/* ============================================================= */}
                <div id="usepathname-server" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-500" />
                      <span>usePathname() in Server Components</span>
                    </h4>
                    <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-[11px] font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                      Server-Side (0 KB Bundle)
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    In Server Components, <code>usePathname()</code> resolves synchronously from the active HTTP request context (via <code>AsyncLocalStorage</code>) during SSR, streaming, and static site generation (SSG). This eliminates the need to pass route paths or active segments as props down through layout hierarchies and nested server components.
                  </p>

                  <div className="overflow-x-auto my-3 border rounded-lg border-border not-prose">
                    <table className="w-full text-xs text-left border-collapse">
                      <tbody className="divide-y divide-border/50 text-muted-foreground">
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground w-1/3">Execution Environment</td>
                          <td className="py-2 px-3">100% backend (Node.js, Bun, Cloudflare Workers, Edge).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Client Bundle Impact</td>
                          <td className="py-2 px-3"><strong>0 KB</strong> (evaluated during SSR or build time; zero client JavaScript).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Data Origin</td>
                          <td className="py-2 px-3">HTTP request store via <code>AsyncLocalStorage</code> (<code>ctx.req.path</code>).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Primary Purpose</td>
                          <td className="py-2 px-3"><strong>Layout Architecture:</strong> Conditional headers/sidebars, server-rendered breadcrumb shells, canonical meta tags, and route section boundaries.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Static Caching (SSG)</td>
                          <td className="py-2 px-3"><strong>100% Deterministic;</strong> route path is known at build time per page segment. Zero hydration mismatch risk.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Props Drilling</td>
                          <td className="py-2 px-3">None. Deeply nested server components and layouts read the pathname directly.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <CodeBlock language="tsx" containerClassName="w-full overflow-hidden rounded-lg my-3">
                    {`// src/components/server-header.tsx (Server Component)
import { usePathname } from "dinou";

export default async function ServerHeader() {
  // Resolves synchronously from the active request context during SSR or SSG
  const pathname = usePathname();
  const isAdminSection = pathname.startsWith("/admin");

  return (
    <header className="border-b px-6 py-4 flex items-center justify-between">
      <div className="font-bold text-lg">Acme Cloud</div>

      {/* Conditionally renders server UI based on the active route segment */}
      {isAdminSection ? (
        <span className="text-xs bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium">
          Admin Console
        </span>
      ) : (
        <span className="text-xs text-muted-foreground">
          Public Area &bull; {pathname}
        </span>
      )}
    </header>
  );
}`}
                  </CodeBlock>

                  <div className="text-xs text-muted-foreground bg-muted/40 rounded-lg p-3 border border-border/60 space-y-1.5">
                    <p className="font-semibold text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-blue-500" />
                      <span>Zero Hydration Mismatch in SSG:</span>
                    </p>
                    <p>
                      Unlike URL query parameters (which are unknown when pre-generating static pages at build time), the route pathname is completely deterministic. When Dinou pre-renders static HTML for <code>/blog/post-1</code>, <code>usePathname()</code> resolves to <code>&quot;/blog/post-1&quot;</code> during the build and hydrates with the exact same value in the browser.
                    </p>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 2: CLIENT COMPONENTS */}
                {/* ============================================================= */}
                <div id="usepathname-client" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-emerald-500" />
                      <span>usePathname() in Client Components</span>
                    </h4>
                    <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                      "use client"
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    In Client Components, <code>usePathname()</code> is a reactive hook that provides the current URL pathname in the browser. Whenever the user navigates to a new route (via <code>&lt;Link&gt;</code>, <code>router.push()</code>, or browser Back/Forward buttons), any Client Component calling <code>usePathname()</code> re-renders immediately with the updated pathname.
                  </p>

                  <div className="overflow-x-auto my-3 border rounded-lg border-border not-prose">
                    <table className="w-full text-xs text-left border-collapse">
                      <tbody className="divide-y divide-border/50 text-muted-foreground">
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground w-1/3">Execution Environment</td>
                          <td className="py-2 px-3">Browser runtime (with initial server-side SSR hydration).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Client Bundle Impact</td>
                          <td className="py-2 px-3">Included in client bundle (lightweight hook shared with client router).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Data Origin</td>
                          <td className="py-2 px-3">Active browser URL pathname (synchronized with client navigation).</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Primary Purpose</td>
                          <td className="py-2 px-3"><strong>UI Reactivity:</strong> Active navigation link styling, breadcrumb bars, collapsible sidebar highlights, and client-side pageview analytics.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Static Caching (SSG)</td>
                          <td className="py-2 px-3"><strong>100% SSG Compatible;</strong> initial server-rendered HTML matches browser location without flashes or shifts.</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3 font-semibold text-foreground">Reactivity</td>
                          <td className="py-2 px-3">Subscribes to client navigation transitions; triggers instantaneous component re-renders.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <CodeBlock language="tsx" containerClassName="w-full overflow-hidden rounded-lg my-3">
                    {`// src/components/nav-link.tsx (Client Component)
"use client";

import { usePathname, Link } from "dinou";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  exact?: boolean;
}

export function NavLink({ href, children, exact = false }: NavLinkProps) {
  const pathname = usePathname();

  // Determine active state: exact match for root/items or prefix match for sections
  const isActive = exact
    ? pathname === href
    : pathname === href || pathname.startsWith(\`\${href}/\`);

  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={\`px-3 py-2 rounded-md text-sm font-medium transition-colors \${
        isActive
          ? "bg-primary text-primary-foreground font-semibold shadow-sm"
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
      }\`}
    >
      {children}
    </Link>
  );
}`}
                  </CodeBlock>

                  <div className="p-3.5 rounded-lg bg-card border border-border text-xs not-prose space-y-2 mt-4">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                      <span>Best Practice: Active Link Matching Logic</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      When styling navigation links, use exact comparison (<code>pathname === href</code>) for the homepage (<code>/</code>) to avoid matching every route. For nested sections (e.g. <code>/docs</code>), use <code>pathname.startsWith(href + &quot;/&quot;)</code> so parent navigation tabs remain highlighted when users view sub-pages (such as <code>/docs/api-reference</code>).
                    </p>
                  </div>
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
                        <td className="p-4 font-mono text-xs">(href: DinouRoute, options?: NavigationOptions) =&gt; void</td>
                        <td className="p-4 text-xs">
                          Navigates to <code>href</code> (autocompleted via <code>DinouRoute</code>) and pushes a new entry onto the browser history stack. Pass <code>&#123; fresh: true &#125;</code> to bypass the client cache.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4 font-mono text-xs font-semibold text-primary">replace</td>
                        <td className="p-4 font-mono text-xs">(href: DinouRoute, options?: NavigationOptions) =&gt; void</td>
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
                        <td className="p-4 font-mono text-xs">(options?: &#123; layout?: boolean &#125;) =&gt; void</td>
                        <td className="p-4 text-xs">
                          Triggers a soft reload: invalidates client cache for the current route, refetches the server RSC payload, and updates the DOM without destroying client state. Pass <code>&#123; layout: true &#125;</code> to also re-render layouts.
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

            {/* ================================================================= */}
            {/* SECTION 6: TYPE-SAFE ROUTING */}
            {/* ================================================================= */}
            <section id="type-safe-routing" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                6. Type-Safe Routing (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                  Zero-Runtime Type System
                </span>
              </h2>
              <p>
                Dinou v7 introduces zero-runtime type safety with auto-generated declaration files and seamless IDE autocompletion for routes and parameters.
              </p>

              {/* PageProps */}
              <section id="pageprops" className="scroll-mt-20 mt-8">
                <h3>
                  <code>PageProps&lt;T&gt;</code>
                </h3>
                <p>
                  Official TypeScript interface for typing React Page components (<code>page.tsx</code>). Takes the route pattern string as a generic parameter and automatically infers the strongly typed <code>params</code> object.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import type { PageProps } from "dinou";

// Trigger Ctrl + Space inside "" to pick from all registered routes
export default function BlogPost({ params }: PageProps<"/blog/[slug]">) {
  // ✅ params.slug is strongly typed as string
  return <h1>Post: {params.slug}</h1>;
}`}
                </CodeBlock>
              </section>

              {/* LayoutProps */}
              <section id="layoutprops" className="scroll-mt-20 mt-8">
                <h3>
                  <code>LayoutProps&lt;T&gt;</code>
                </h3>
                <p>
                  Official TypeScript interface for typing React Layout components (<code>layout.tsx</code>). In addition to inferred <code>params</code>, it strictly types <code>children: React.ReactNode</code>.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import type { LayoutProps } from "dinou";

export default function BlogLayout({ children, params }: LayoutProps<"/blog/[slug]">) {
  return (
    <section>
      <header>Category: {params.slug}</header>
      <main>{children}</main>
    </section>
  );
}`}
                </CodeBlock>
              </section>

              {/* RouteParams */}
              <section id="routeparams" className="scroll-mt-20 mt-8">
                <h3>
                  <code>RouteParams&lt;T&gt;</code>
                </h3>
                <p>
                  A standalone utility type representing the inferred parameters dictionary of a given route pattern. Ideal for server functions, services, and error boundary components that do not receive standard React page props.
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import type { RouteParams } from "dinou";

// 1. In server-side page_functions.ts
export async function getProps(params: RouteParams<"/blog/[slug]">) {
  return {
    postTitle: \`Title for \${params.slug}\`,
  };
}

// 2. In error.tsx boundaries
interface ErrorProps {
  error: Error;
  params: RouteParams<"/blog/[slug]">;
}`}
                </CodeBlock>
              </section>

              {/* DinouRoute */}
              <section id="dinouroute" className="scroll-mt-20 mt-8">
                <h3>
                  <code>DinouRoute</code>
                </h3>
                <p>
                  A union type representing all valid destinations in the application. Powers <code>&lt;Link href&gt;</code> and <code>router.push(href)</code>, and can be imported to type custom navigation components.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg"
                >
                  {`import type { DinouRoute } from "dinou";
import { Link } from "dinou";

// Typing reusable navigation buttons with project-wide autocompletion
interface NavButtonProps {
  href: DinouRoute;
  label: string;
}

export function NavButton({ href, label }: NavButtonProps) {
  return <Link href={href}>{label}</Link>;
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
