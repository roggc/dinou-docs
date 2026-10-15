import { Link } from "dinou";
import { DocsPager } from "@/docs/components/docs-pager";
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
import { CodeBlock } from "@/docs/components/code-block";
import {
  Compass,
  RefreshCcw,
  Terminal,
  Zap,
  Globe,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Route,
  RefreshCw,
  Layers,
  MousePointerClick,
  Info,
  Clock,
  Database,
  Server,
  Loader2,
  Sparkles,
} from "lucide-react";

// Pure React Server Component (no 'use client')
const tocItems = [
  { id: "overview", title: "1. Navigation Overview", level: 2 },
  { id: "link-component", title: "2. The <Link> Component & Prefetching", level: 2 },
  { id: "programmatic-navigation", title: "3. Programmatic Navigation (useRouter)", level: 2 },
  { id: "router-cache-fresh", title: "4. Client Router Cache & The fresh Prop", level: 2 },
  { id: "use-navigation-loading", title: "5. Route Transitions (useNavigationLoading)", level: 2 },
  { id: "relative-routing", title: "6. Relative Routing Rules", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Client Navigation & Transitions | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Master Dinou's client-side SPA navigation: smooth soft transitions, automatic hover prefetching, and the Client Router Cache lifecycle."
      />
      <link rel="canonical" href="https://dinou.dev/docs/navigation" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Client Runtime
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou v7 Complete Guide
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Client Navigation &amp; Transitions
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master Dinou&apos;s client-side SPA navigation: smooth soft transitions, automatic hover prefetching, the Client Router Cache lifecycle, cache busting with the <code>fresh</code> prop, imperative <code>useRouter</code> controls, and Directory-First relative routing.
            </p>

            {/* Type-Safe Routing Callout */}
            <div className="not-prose rounded-xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-950/20 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 my-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                    Looking for Type-Safe Navigation?
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Dinou generates automatic route types so <code>&lt;Link href=&quot;...&quot;&gt;</code> and <code>router.push(&quot;...&quot;)</code> provide zero-runtime autocomplete and compile-time error checking.
                  </p>
                </div>
              </div>
              <Link
                href="/docs/type-safe-routing"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0"
              >
                <span>Type-Safe Guide</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words space-y-12">
            {/* Section 1: Overview */}
            <section id="overview" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                1. Navigation Overview
              </h2>
              <p>
                In Dinou, navigating between routes does <strong>not</strong> trigger a full browser refresh. Instead, Dinou operates as a high-performance single-page application (SPA):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose my-6 min-w-0">
                <Card className="min-w-0">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <MousePointerClick className="h-4 w-4 text-blue-500" />
                      Soft Navigation
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                    Only modified layout layers and page components re-render. Existing client React state, scroll positions, and parent layouts are preserved.
                  </CardContent>
                </Card>

                <Card className="min-w-0">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Zap className="h-4 w-4 text-amber-500" />
                      Automatic Prefetching
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                    When a user hovers over a link, Dinou silently prefetches the code and data in the background for near-instant transitions upon click.
                  </CardContent>
                </Card>

                <Card className="min-w-0">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2 font-bold text-xs">
                      <Clock className="h-4 w-4 text-emerald-500" />
                      Concurrent Transitions
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                    Backed by React 19 concurrent transitions: UI remains fully responsive while asynchronous server components stream in.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Section 2: <Link> Component */}
            <section id="link-component" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                2. The &lt;Link&gt; Component &amp; Prefetching
              </h2>
              <p>
                The primary way to navigate between pages is the <code>&lt;Link&gt;</code> component imported from <code>&quot;dinou&quot;</code>. It intercepts click events, prevents hard reloads, and handles background prefetching:
              </p>

              <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                {`import { Link } from "dinou";

export function NavigationBar() {
  return (
    <nav className="flex gap-4">
      {/* ✅ Type-Safe href: autocompleted in your IDE via DinouRoute */}
      <Link href="/dashboard">Dashboard</Link>

      {/* ✅ Dynamic interpolation typed against registered routes */}
      <Link href={\`/blog/\${post.slug}\`}>Post</Link>

      {/* Disable prefetch for heavy routes or rarely visited pages */}
      <Link href="/analytics" prefetch={false}>
        Analytics
      </Link>

      {/* ❌ TypeScript compile error on invalid/dead links when using type-safe routing */}
      {/* <Link href="/broken-link">Broken</Link> */}
    </nav>
  );
}`}
              </CodeBlock>

              <Alert className="not-prose my-4">
                <Globe className="h-4 w-4" />
                <AlertTitle>Native HTML &lt;a&gt; Anchor Elements</AlertTitle>
                <AlertDescription className="text-xs">
                  Standard HTML <code>&lt;a&gt;</code> tags also trigger client-side soft navigation via global event delegation in Dinou. However, they lack smart features like hover prefetching and the <code>fresh</code> prop provided by the <code>&lt;Link&gt;</code> component.
                </AlertDescription>
              </Alert>
            </section>

            {/* Section 3: Programmatic Navigation (useRouter) */}
            <section id="programmatic-navigation" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                3. Programmatic Navigation (useRouter)
              </h2>
              <p>
                To navigate imperatively from event handlers, timers, or form submissions, use the <code>useRouter()</code> hook inside <strong>Client Components</strong> (<code>&quot;use client&quot;</code>):
              </p>

              <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                {`"use client";

import { useRouter } from "dinou";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    await loginUser();
    
    // Navigate programmatically
    router.push("/dashboard");
    
    // Or force fresh data after mutation:
    // router.push("/dashboard", { fresh: true });
  };

  return <button onClick={handleLogin}>Log In</button>;
}`}
              </CodeBlock>

              <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm mt-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 w-48">Method</th>
                      <th className="p-3.5">Behavior &amp; Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card text-xs sm:text-sm">
                    <tr>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        router.push(href, options)
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        Navigates to the route and adds a new entry to the browser history stack. Supports <code>&#123; fresh: true &#125;</code>.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        router.replace(href, options)
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        Navigates to the route, replacing the current history entry without pushing a new history state. Supports <code>&#123; fresh: true &#125;</code>.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        router.back()
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        Navigates back to the previous page in history (equivalent to clicking the browser Back button).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        router.forward()
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        Navigates forward to the next page in the history stack.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-semibold">
                        router.refresh()
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        <strong>Soft Reload:</strong> Re-fetches the current route data from the server and updates server components without losing client React state or scroll position.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-semibold">
                        router.refreshSlot(slotId)
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        Re-fetches and updates an individual <code>&lt;DinouCacheSlot&gt;</code> component without re-rendering the surrounding page.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Section 4: Client Router Cache & fresh Prop */}
            <section id="router-cache-fresh" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Client Router Cache &amp; The fresh Prop
              </h2>
              <p>
                To deliver instant page transitions without unnecessary server requests, Dinou features an in-memory <strong>Client Router Cache</strong>. Understanding how this cache operates is key to knowing when and why to use the <code>fresh</code> prop.
              </p>

              <div className="space-y-4 my-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Database className="h-5 w-5 text-indigo-500" />
                  4.1. How the Client Router Cache Works
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  During client execution, Dinou maintains three dedicated in-memory caches in the browser tab:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose min-w-0">
                  <Card className="border-l-4 border-l-blue-500 min-w-0">
                    <CardHeader className="p-4 pb-2">
                      <div className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                        pageCache
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                      Stores streaming promises for RSC page payloads, keyed by <code>pathname + search</code>.
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500 min-w-0">
                    <CardHeader className="p-4 pb-2">
                      <div className="font-mono font-bold text-xs text-purple-600 dark:text-purple-400">
                        layoutCache
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                      Caches layout shell payloads independently. Navigating between child pages within the same layout never re-fetches the layout.
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-emerald-500 min-w-0">
                    <CardHeader className="p-4 pb-2">
                      <div className="font-mono font-bold text-xs text-emerald-600 dark:text-emerald-400">
                        scrollCache
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                      Records scroll positions for each visited route, enabling instant, pixel-accurate restoration on browser Back/Forward (<code>popstate</code>).
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 rounded-xl border bg-muted/50 not-prose space-y-3 text-xs leading-relaxed text-muted-foreground">
                  <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    The Prefetch-to-Navigate Pipeline:
                  </div>
                  <ol className="list-decimal pl-5 space-y-1.5">
                    <li>
                      <strong>On Hover:</strong> When the mouse enters a <code>&lt;Link href=&quot;/pricing&quot;&gt;</code>, Dinou automatically prefetches the route payload in the background and stores the pending RSC promise directly into <code>pageCache</code>.
                    </li>
                    <li>
                      <strong>On Click:</strong> The router initiates navigation to <code>&quot;/pricing&quot;</code>. Because the payload was already prefetched into <code>pageCache</code>, the transition renders <strong>instantly with 0ms network latency</strong>.
                    </li>
                    <li>
                      <strong>On Back / Forward:</strong> Browser <code>popstate</code> events read from <code>pageCache</code> and restore the previous scroll position from <code>scrollCache</code> without making any network requests.
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-blue-500" />
                  4.2. Cache Invalidation with the fresh Prop
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  While caching provides instantaneous navigation, pages with volatile data or pages visited immediately after a mutation (e.g., checkout, profile updates, or inventory counters) need fresh server state. The <code>fresh</code> prop provides explicit, predictable cache busting:
                </p>

                <div className="space-y-2">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    What happens under the hood when fresh is true:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 not-prose text-xs min-w-0">
                    <div className="p-3.5 rounded-lg border bg-card min-w-0">
                      <span className="font-bold text-rose-600 dark:text-rose-400 block mb-1">1. Bypasses Prefetch</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Hovering over a <code>&lt;Link fresh&gt;</code> does <strong>not</strong> prefetch potentially stale data before the user actually clicks.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border bg-card min-w-0">
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">2. Evicts Cache Entry</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Upon navigation, the router explicitly runs <code>pageCache.delete(targetUrl)</code>, removing any prior cached RSC promise.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border bg-card min-w-0">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">3. Live Server Render</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Issues a fresh HTTP request directly to the server, re-executing server components and page functions with latest data.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-4">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    Usage Examples:
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose min-w-0">
                    <div className="min-w-0">
                      <div className="text-xs font-mono text-blue-600 dark:text-blue-400 font-semibold mb-1.5 break-words">
                        Declarative: &lt;Link fresh&gt;
                      </div>
                      <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                        {`// Ideal for live feeds, stock tickers, or carts
<Link href="/live-feed" fresh>
  Live Feed
</Link>`}
                      </CodeBlock>
                    </div>

                    <div className="min-w-0">
                      <div className="text-xs font-mono text-purple-600 dark:text-purple-400 font-semibold mb-1.5 break-words">
                        Imperative: router.push(url, &#123; fresh: true &#125;)
                      </div>
                      <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                        {`// Navigate after a mutation to force fresh server data
const handleUpdate = async () => {
  await updateProfile(data);
  router.push("/profile", { fresh: true });
};`}
                      </CodeBlock>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 mt-6">
                  <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                    4.3. Comparison: When to use which mechanism
                  </h4>
                  <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                        <tr>
                          <th className="p-3.5 w-52">Mechanism / Scope</th>
                          <th className="p-3.5">Cache Behavior</th>
                          <th className="p-3.5">Network Request</th>
                          <th className="p-3.5">Typical Use Case</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-xs sm:text-sm">
                        <tr>
                          <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                            Standard &lt;Link&gt;
                          </td>
                          <td className="p-3.5 text-muted-foreground">Uses <code>pageCache</code> if prefetched or visited</td>
                          <td className="p-3.5 text-muted-foreground">0ms if in cache; single request on first visit</td>
                          <td className="p-3.5 text-muted-foreground">General navigation, blogs, docs, marketing pages</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-semibold">
                            &lt;Link fresh&gt; / &#123; fresh: true &#125;
                          </td>
                          <td className="p-3.5 text-muted-foreground">Purges <code>pageCache.delete(url)</code></td>
                          <td className="p-3.5 text-muted-foreground">Always fetches live RSC payload from server</td>
                          <td className="p-3.5 text-muted-foreground">Post-mutation redirects, active carts, volatile feeds</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            router.refresh()
                          </td>
                          <td className="p-3.5 text-muted-foreground">Purges <code>pageCache.delete(currentPath)</code></td>
                          <td className="p-3.5 text-muted-foreground">Re-fetches current route in-place</td>
                          <td className="p-3.5 text-muted-foreground">Polling, server function response handling, reload button</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-slate-500 font-semibold">
                            Hard Reload (F5)
                          </td>
                          <td className="p-3.5 text-muted-foreground">Destroys all memory (all caches lost)</td>
                          <td className="p-3.5 text-muted-foreground">Full HTML document download + re-hydration</td>
                          <td className="p-3.5 text-muted-foreground">Emergency fallback; loses all client state</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 5: Route Transitions (useNavigationLoading) */}
            <section id="use-navigation-loading" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Route Transitions (useNavigationLoading)
              </h2>
              <p>
                In Dinou, all client-side navigations execute concurrently inside React 19&apos;s <code>startTransition</code>. This ensures that the current view remains fully interactive and visible while the target page&apos;s Server Components stream in from the server.
              </p>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
                To inform users that a transition is occurring behind the scenes, Dinou provides the <code>useNavigationLoading()</code> hook:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6 text-xs min-w-0">
                <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-50/30 dark:bg-blue-950/20 space-y-2 min-w-0">
                  <div className="font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Reactive Transition State
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Returns <code>true</code> while a route payload is actively streaming or preparing in the background, and resets to <code>false</code> the moment React 19 commits the new page tree.
                  </p>
                </div>

                <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-50/30 dark:bg-emerald-950/20 space-y-2 min-w-0">
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" />
                    Hydration-Safe Default
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Evaluates to <code>false</code> during server-side rendering (SSR), preventing hydration mismatches and flickering when the document first mounts.
                  </p>
                </div>
              </div>

              <div className="space-y-3 mt-6">
                <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-amber-500" />
                  Example: Global Top Navigation Progress Bar
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Mount a client loading indicator in your root layout to provide visual feedback (similar to GitHub or YouTube) whenever a route transition is pending:
                </p>

                <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                  {`"use client";

import { useNavigationLoading } from "dinou";

export function NavigationProgressBar() {
  const isNavigating = useNavigationLoading();

  if (!isNavigating) return null;

  return (
    <div
      role="progressbar"
      aria-label="Page loading"
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-blue-500/20 overflow-hidden pointer-events-none"
    >
      <div className="h-full bg-blue-600 dark:bg-blue-400 animate-pulse w-full transition-all duration-300" />
    </div>
  );
}`}
                </CodeBlock>

                <p className="text-xs text-muted-foreground leading-relaxed">
                  Because prefetched links resolve instantly in 0ms directly from <code>pageCache</code>, this progress bar only surfaces on fresh fetches (such as navigation with <code>fresh: true</code> or un-prefetched dynamic routes), keeping transitions ultra snappy.
                </p>
              </div>
            </section>

            {/* Section 6: Relative Routing Rules */}
            <section id="relative-routing" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Relative Routing Rules
              </h2>
              <p>
                Dinou resolves relative navigation paths (such as <code>about</code>, <code>./about</code>, or <code>../dashboard</code>) using a <strong>Directory-First Convention</strong>. This provides intuitive navigation that accurately mirrors your file system.
              </p>

              <div className="border border-indigo-500/20 bg-indigo-50/40 dark:bg-indigo-950/20 rounded-xl p-4 my-4 not-prose space-y-2">
                <div className="flex items-center gap-2 font-semibold text-xs text-indigo-700 dark:text-indigo-400">
                  <Globe className="h-4 w-4" />
                  Directory-First Resolution Explained
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  In a standard web browser, a URL like <code>/blog/hello</code> (without a trailing slash) treats <code>hello</code> as a file name, so a link to <code>about</code> resolves to <code>/blog/about</code>.
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  <strong>In Dinou, every route is treated as a directory</strong> because physically, each page is a folder containing a <code>page.tsx</code> component (e.g. <code>src/blog/hello/page.tsx</code>). Resolving relatively from a page navigates relative to that route&apos;s folder:
                </p>
              </div>

              <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm mt-4">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 w-1/3">Current Path</th>
                      <th className="p-3.5 w-1/3">Relative Target</th>
                      <th className="p-3.5 w-1/3">Resolved Path</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card font-mono text-xs">
                    <tr>
                      <td className="p-3.5">/blog/hello</td>
                      <td className="p-3.5 text-indigo-600 dark:text-indigo-400">about</td>
                      <td className="p-3.5 font-bold text-slate-800 dark:text-slate-100">/blog/hello/about</td>
                    </tr>
                    <tr>
                      <td className="p-3.5">/blog/hello</td>
                      <td className="p-3.5 text-indigo-600 dark:text-indigo-400">./about</td>
                      <td className="p-3.5 font-bold text-slate-800 dark:text-slate-100">/blog/hello/about</td>
                    </tr>
                    <tr>
                      <td className="p-3.5">/blog/hello</td>
                      <td className="p-3.5 text-purple-600 dark:text-purple-400">../about</td>
                      <td className="p-3.5 font-bold text-slate-800 dark:text-slate-100">/blog/about</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                This rule applies uniformly across all navigation methods, including the <code>&lt;Link&gt;</code> component and programmatic calls like <code>router.push()</code>.
              </p>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
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
