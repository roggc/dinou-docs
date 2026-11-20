import { Link } from "dinou";
import { DocsPager } from "@/docs/components/docs-pager";
import { TableOfContents } from "@/docs/components/table-of-contents";
import { Badge } from "@/docs/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/docs/components/ui/card";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { CodeBlock } from "@/docs/components/code-block";
import {
  RefreshCcw,
  Zap,
  Globe,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  MousePointerClick,
  Clock,
  Database,
  Loader2,
  Sparkles,
  Search,
  CornerDownRight,
} from "lucide-react";

// Pure React Server Component (no 'use client')
const tocItems = [
  { id: "overview", title: "1. Navigation Overview", level: 2 },
  { id: "link-component", title: "2. The <Link> Component & Prefetching", level: 2 },
  { id: "programmatic-navigation", title: "3. Programmatic Navigation (useRouter)", level: 2 },
  { id: "url-hooks", title: "4. Reading the URL (usePathname & useSearchParams)", level: 2 },
  { id: "universal-redirect", title: "5. Universal Redirection (redirect)", level: 2 },
  { id: "router-cache-fresh", title: "6. Client Router Cache & The fresh Prop", level: 2 },
  { id: "use-navigation-loading", title: "7. Route Transitions (useNavigationLoading)", level: 2 },
  { id: "relative-routing", title: "8. Relative Routing Rules", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Navigation &amp; URL Hooks | Dinou Docs</title>
      <meta
        name="description"
        content="Master Dinou's universal and client-side SPA navigation: soft transitions, automatic hover prefetching, URL hooks (usePathname & useSearchParams), universal redirects, and the Client Router Cache."
      />
      <link rel="canonical" href="https://dinou.dev/docs/navigation" />

      <div className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border-blue-200 dark:border-blue-900"
              >
                Universal &amp; Client Runtime
              </Badge>
              <Badge variant="outline" className="font-mono text-xs">
                Dinou Complete Guide
              </Badge>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Navigation &amp; URL Hooks
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Master Dinou&apos;s navigation system: smooth SPA soft transitions, automatic hover prefetching, universal URL hooks (<code>usePathname</code> &amp; <code>useSearchParams</code>), universal <code>redirect()</code>, the Client Router Cache lifecycle with <code>fresh</code>, imperative <code>useRouter</code> controls, and Directory-First relative routing.
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
                    Dinou generates automatic route types and contextual <code>&quot;./dinou&quot;</code> helpers so <code>&lt;Link&gt;</code> and <code>router.push()</code> provide zero-runtime autocomplete and compile-time error checking.
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
                    When a user hovers over a link, Dinou silently prefetches both any uncached target layout and the page RSC payload in the background for near-instant transitions on click.
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
                The primary way to navigate between pages is the <code>&lt;Link&gt;</code> component imported from <code>&quot;dinou&quot;</code> (or from contextual <code>&quot;./dinou&quot;</code> inside route folders when using relative links). It intercepts standard left-clicks, preserves modifier clicks (<code>Cmd</code>/<code>Ctrl</code>/<code>Shift</code>/<code>Alt</code>) and middle/right clicks, respects <code>target</code> (e.g. <code>target=&quot;_blank&quot;</code>) and <code>download</code>, skips external URLs and local <code>#hash</code> anchors, and prefetches internal routes on hover:
              </p>

              <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                {`// src/components/navigation-bar.tsx
import { Link } from "dinou";

export function NavigationBar({ post }: { post: { slug: string } }) {
  return (
    <nav className="flex gap-4">
      {/* ✅ Type-Safe absolute href (or use the equivalent \`to\` prop alias) */}
      <Link href="/dashboard">Dashboard</Link>

      {/* ✅ Dynamic route pattern (Ctrl + Space autocompleted) with typed params */}
      <Link href="/blog/[slug]" params={{ slug: post.slug }}>
        Post
      </Link>

      {/* ✅ Or direct template string interpolation (without params) */}
      <Link href={\`/blog/\${post.slug}\`}>Post (Template)</Link>

      {/* Disable hover prefetch for heavy routes or rarely visited pages */}
      <Link href="/analytics" prefetch={false}>
        Analytics
      </Link>

      {/* ❌ TypeScript compile error on invalid/dead links */}
      {/* <Link href="/broken-link">Broken</Link> */}
    </nav>
  );
}`}
              </CodeBlock>

              <p className="text-xs text-muted-foreground mt-3">
                <strong>Prop note:</strong> <code>&lt;Link&gt;</code> accepts both <code>href</code> and <code>to</code> interchangeably (alongside all standard HTML <code>&lt;a&gt;</code> attributes), plus <code>params</code>, <code>from</code>, <code>prefetch</code> (defaults to <code>true</code>), and <code>fresh</code> (defaults to <code>false</code>).
              </p>

              <Alert className="not-prose my-4">
                <Globe className="h-4 w-4" />
                <AlertTitle>Native HTML &lt;a&gt; Anchor Elements</AlertTitle>
                <AlertDescription className="text-xs">
                  Standard internal HTML <code>&lt;a&gt;</code> tags also trigger client-side soft navigation via global click delegation in Dinou (while respecting <code>target</code>, <code>download</code>, modifier keys, non-left clicks, and external URLs). However, they do not provide compile-time route validation, hover prefetching, parameter interpolation, or the <code>fresh</code> prop offered by <code>&lt;Link&gt;</code>.
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
                {`// src/components/login-button.tsx
"use client";

import { useRouter } from "dinou";

export default function LoginButton() {
  const router = useRouter();

  const handleLogin = async () => {
    await loginUser();

    // Navigate programmatically
    router.push("/dashboard");

    // Or force fresh server data after a mutation:
    // router.push("/dashboard", { fresh: true });
  };

  return <button onClick={handleLogin}>Log In</button>;
}`}
              </CodeBlock>

              <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm mt-6">
                <table className="w-full text-sm text-left">
                  <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                    <tr>
                      <th className="p-3.5 w-56">Method</th>
                      <th className="p-3.5">Behavior &amp; Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-card text-xs sm:text-sm">
                    <tr>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        router.push(href, options?)
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        Navigates to the target route and pushes a new entry onto the browser history stack. Supports <code>&#123; fresh: true &#125;</code>, <code>&#123; params &#125;</code> for dynamic patterns (e.g. <code>&quot;/blog/[slug]&quot;</code>), <code>&#123; from &#125;</code> for relative paths, <code>#hash</code> scrolling, and external URLs (falling back cleanly to <code>window.location.assign()</code>).
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-blue-600 dark:text-blue-400 font-semibold">
                        router.replace(href, options?)
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        Navigates to the route, replacing the current history entry without pushing a new state. Supports <code>&#123; fresh: true &#125;</code>, <code>&#123; params &#125;</code>, <code>&#123; from &#125;</code>, <code>#hash</code> fragments, and external URLs (via <code>window.location.replace()</code>).
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
                        router.refresh(options?)
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        <strong>Soft Reload:</strong> Evicts <code>pageCache</code> for the current route and re-fetches server components without losing client React state or scroll position. Pass <code>&#123; layout: true &#125;</code> to also purge <code>layoutCache</code> and re-render the active layout shell.
                      </td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-semibold">
                        router.refreshSlot(slotId, options?)
                      </td>
                      <td className="p-3.5 text-muted-foreground">
                        Re-fetches and updates matching <code>&lt;DinouCacheSlot&gt;</code> boundaries (by <code>id</code>, <code>tag</code>, or <code>&quot;*&quot;</code> wildcard) without re-rendering the surrounding page, returning a <code>Promise&lt;void&gt;</code> that resolves once settled. Pass <code>&#123; fresh: true &#125;</code> to bypass server-side slot cache. Also exported standalone as <code>refreshSlot(slotId, options?)</code>.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                <strong>Referential Stability:</strong> The object returned by <code>useRouter()</code> (both from <code>&quot;dinou&quot;</code> and contextual <code>&quot;./dinou&quot;</code>) is memoized against router context, making it safe to include in <code>useEffect</code> or <code>useCallback</code> dependency arrays without triggering re-render loops.
              </p>
            </section>

            {/* Section 4: Reading the URL (usePathname & useSearchParams) */}
            <section id="url-hooks" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                4. Reading the URL (usePathname &amp; useSearchParams)
              </h2>
              <p>
                Dinou provides two <strong>universal</strong> URL hooks exported from <code>&quot;dinou&quot;</code> that work seamlessly in both <strong>Server Components</strong> (reading from the active <code>AsyncLocalStorage</code> request context during SSR) and <strong>Client Components</strong> (subscribing to <code>RouterContext</code> and re-rendering automatically on soft navigation):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6 min-w-0">
                <Card className="min-w-0">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2 font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                      <Globe className="h-4 w-4" />
                      usePathname(): string
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                    Returns the normalized current pathname (e.g. <code>&quot;/docs/navigation&quot;</code>) stripped of query strings, hashes, and trailing slashes. Ideal for highlighting active navigation links.
                  </CardContent>
                </Card>

                <Card className="min-w-0">
                  <CardHeader className="p-4 pb-2">
                    <div className="flex items-center gap-2 font-mono font-bold text-xs text-indigo-600 dark:text-indigo-400">
                      <Search className="h-4 w-4" />
                      useSearchParams(): URLSearchParams
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                    Returns a standard <code>URLSearchParams</code> instance for the current query string. Calling it in a <strong>Server Component</strong> triggers dynamic SSR bailout (or registers a <strong>Dynamic PPR Hole</strong> when wrapped in <code>&lt;Suspense&gt;</code> on a <code>ppr = true</code> route), while calling it in a <strong>Client Component</strong> preserves SSG, ISR, PPR, and <code>export-static</code> (hydrating with an empty <code>URLSearchParams</code> first before syncing live query params with zero hydration mismatch).
                  </CardContent>
                </Card>
              </div>

              <p className="text-xs text-muted-foreground mb-4">
                See full Server &amp; Client signatures in <Link href="/docs/api-reference#usepathname" className="text-blue-500 hover:underline font-medium">API Reference: <code>usePathname()</code></Link> and <Link href="/docs/api-reference#usesearchparams" className="text-blue-500 hover:underline font-medium"><code>useSearchParams()</code></Link>. For cookies, HTTP headers, response mutations, or server env bindings, see <Link href="/docs/request-context" className="text-blue-500 hover:underline font-medium">Request Context (<code>getContext</code>)</Link>.
              </p>

              <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                {`// src/components/filter-tabs.tsx
"use client";

import { Link, usePathname, useSearchParams } from "dinou";

export function FilterTabs() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSort = searchParams.get("sort") ?? "latest";

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-muted-foreground">Path: {pathname}</span>
      <Link
        href="?sort=latest"
        className={activeSort === "latest" ? "font-bold underline" : ""}
      >
        Latest
      </Link>
      <Link
        href="?sort=popular"
        className={activeSort === "popular" ? "font-bold underline" : ""}
      >
        Popular
      </Link>
    </div>
  );
}`}
              </CodeBlock>
            </section>

            {/* Section 5: Universal Redirection (redirect) */}
            <section id="universal-redirect" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                5. Universal Redirection (redirect)
              </h2>
              <p>
                To redirect declaratively from a Server Component or Client Component, use <code>redirect(destination)</code> from <code>&quot;dinou&quot;</code>. Unlike frameworks where <code>redirect()</code> throws an internal exception, in Dinou <code>redirect()</code> returns a <code>ReactNode</code>—always <strong>return</strong> its result:
              </p>

              <CodeBlock language="tsx" containerClassName="w-full rounded-lg">
                {`// src/dashboard/page.tsx
import { getContext, redirect } from "dinou";

export default async function DashboardPage() {
  const ctx = getContext();
  const sessionToken = ctx.req.cookies.session;

  if (!sessionToken) {
    // ✅ Always use \`return redirect(...)\`
    return redirect("/login");
  }

  const profile = await fetchUserProfile(sessionToken);
  return <h1>Welcome back, {profile.name}</h1>;
}`}
              </CodeBlock>

              <Alert className="not-prose my-4">
                <CornerDownRight className="h-4 w-4 text-blue-500" />
                <AlertTitle>Adaptive HTTP 302 vs. Client SPA Fallback</AlertTitle>
                <AlertDescription className="text-xs space-y-1">
                  <p>
                    <strong>Before headers are sent (Server):</strong> <code>redirect(&quot;/login&quot;)</code> issues a native <strong>HTTP 302</strong> redirect on initial document requests (optimal for SEO and zero-flash redirects) or sets <code>x-rsc-redirect</code> during soft RSC navigation. Calling <code>redirect()</code> inside <code>page_functions.ts</code> or <code>layout_functions.ts</code> (<code>getProps</code>) immediately short-circuits rendering before any JSX executes.
                  </p>
                  <p>
                    <strong>After streaming starts or on the Client:</strong> If React has already flushed headers inside a streamed <code>&lt;Suspense&gt;</code> boundary—or if called on the client—Dinou automatically renders <code>&lt;ClientRedirect to=&quot;/login&quot; /&gt;</code> to replace the route seamlessly in the browser.
                  </p>
                </AlertDescription>
              </Alert>
            </section>

            {/* Section 6: Client Router Cache & fresh Prop */}
            <section id="router-cache-fresh" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                6. Client Router Cache &amp; The fresh Prop
              </h2>
              <p>
                To deliver instant page transitions without unnecessary server requests, Dinou features an in-memory <strong>Client Router Cache</strong>. Understanding how this cache operates is key to knowing when and why to use the <code>fresh</code> prop.
              </p>

              <div className="space-y-4 my-6">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Database className="h-5 w-5 text-indigo-500" />
                  6.1. How the Client Router Cache Works
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
                      Stores streaming promises for RSC page payloads, keyed by <code>pathname + search</code> (with any <code>#hash</code> fragment stripped cleanly from cache keys and wire fetches).
                    </CardContent>
                  </Card>

                  <Card className="border-l-4 border-l-purple-500 min-w-0">
                    <CardHeader className="p-4 pb-2">
                      <div className="font-mono font-bold text-xs text-purple-600 dark:text-purple-400">
                        layoutCache
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-1 text-xs text-muted-foreground leading-relaxed">
                      Caches layout shell payloads independently (keyed by <code>layoutKey + search</code>). Navigating between child pages within the same layout never re-fetches the layout unless <code>router.refresh(&#123; layout: true &#125;)</code> is called.
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
                      <strong>On Hover:</strong> When the pointer enters a <code>&lt;Link href=&quot;/pricing&quot;&gt;</code>, Dinou prefetches any uncached target layout into <code>layoutCache</code> and stores the streaming page RSC promise directly into <code>pageCache</code>.
                    </li>
                    <li>
                      <strong>On Click:</strong> The router initiates navigation to <code>&quot;/pricing&quot;</code>. Because the payload was already prefetched into <code>pageCache</code>, the transition renders <strong>instantly with 0ms network latency</strong>.
                    </li>
                    <li>
                      <strong>On Back / Forward:</strong> Browser <code>popstate</code> events read from <code>pageCache</code> and restore the previous scroll position from <code>scrollCache</code> without making network requests.
                    </li>
                  </ol>
                </div>
              </div>

              <div className="space-y-4 mt-8">
                <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <RefreshCcw className="h-5 w-5 text-blue-500" />
                  6.2. Cache Invalidation with the fresh Prop
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  While caching provides instantaneous navigation, pages with volatile data or pages visited immediately after a mutation (e.g., checkout, profile updates, or inventory counters) need fresh server state. The <code>fresh</code> prop provides explicit, deterministic cache busting:
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
                      <span className="font-bold text-amber-600 dark:text-amber-400 block mb-1">2. Evicts Cache &amp; Versions</span>
                      <p className="text-muted-foreground leading-relaxed">
                        On navigation, the router runs <code>pageCache.delete(finalPath)</code> and increments a monotonic version counter (<code>____v____</code>) so in-flight prefetches never overwrite fresh state.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-lg border bg-card min-w-0">
                      <span className="font-bold text-emerald-600 dark:text-emerald-400 block mb-1">3. Live no-store Fetch</span>
                      <p className="text-muted-foreground leading-relaxed">
                        Issues a live <code>fetch(..., &#123; cache: &quot;no-store&quot; &#125;)</code> RSC request to the server, bypassing browser HTTP caches and re-executing server components.
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
                    6.3. Comparison: When to use which mechanism
                  </h4>
                  <div className="not-prose overflow-x-auto rounded-xl border border-border shadow-sm">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-muted text-muted-foreground font-medium text-xs uppercase tracking-wider">
                        <tr>
                          <th className="p-3.5 w-56">Mechanism / Scope</th>
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
                          <td className="p-3.5 text-muted-foreground">Uses <code>pageCache</code> &amp; <code>layoutCache</code> if prefetched or visited</td>
                          <td className="p-3.5 text-muted-foreground">0ms if in cache; single request on first visit</td>
                          <td className="p-3.5 text-muted-foreground">General navigation, blogs, docs, marketing pages</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-purple-600 dark:text-purple-400 font-semibold">
                            &lt;Link fresh&gt; / &#123; fresh: true &#125;
                          </td>
                          <td className="p-3.5 text-muted-foreground">Purges <code>pageCache.delete(url)</code> + version bump</td>
                          <td className="p-3.5 text-muted-foreground">Always fetches live <code>no-store</code> RSC payload</td>
                          <td className="p-3.5 text-muted-foreground">Post-mutation redirects, active carts, volatile feeds</td>
                        </tr>
                        <tr>
                          <td className="p-3.5 font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
                            router.refresh(options?)
                          </td>
                          <td className="p-3.5 text-muted-foreground">Purges <code>pageCache</code> (and <code>layoutCache</code> when <code>&#123; layout: true &#125;</code>)</td>
                          <td className="p-3.5 text-muted-foreground">Re-fetches current route (and optional layout) in-place</td>
                          <td className="p-3.5 text-muted-foreground">Polling, server function updates, header/session refresh</td>
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

            {/* Section 7: Route Transitions (useNavigationLoading) */}
            <section id="use-navigation-loading" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                7. Route Transitions (useNavigationLoading)
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

            {/* Section 8: Relative Routing Rules */}
            <section id="relative-routing" className="scroll-mt-20">
              <h2 className="text-2xl font-bold tracking-tight border-b pb-2 mb-4">
                8. Relative Routing Rules
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
                This rule applies uniformly across all navigation methods, including <code>&lt;Link&gt;</code> (both <code>href</code> and <code>to</code>) and programmatic calls like <code>router.push()</code> and <code>router.replace()</code>.
              </p>

              <Alert className="not-prose mt-4">
                <ShieldCheck className="h-4 w-4 text-blue-500" />
                <AlertTitle>Type-Safe Relative Navigation: Contextual <code>&quot;./dinou&quot;</code> or Explicit <code>from</code></AlertTitle>
                <AlertDescription className="space-y-2">
                  <p>
                    Inside any route folder, import <code>&#123; Link, useRouter &#125;</code> from <code>&quot;./dinou&quot;</code> to get automatic zero-boilerplate relative autocomplete and strict compile-time validation without writing <code>from</code>—or pass <code>from</code> explicitly when importing from global <code>&quot;dinou&quot;</code>. Both bare child paths (<code>&quot;about&quot;</code>) and dot-prefixed paths (<code>&quot;./about&quot;</code>, <code>&quot;../about&quot;</code>) autocomplete while typos like <code>&quot;./abouts&quot;</code> are rejected immediately:
                  </p>
                  <div className="font-mono text-xs bg-muted/80 p-2.5 rounded border border-border/60 space-y-1">
                    <div className="text-muted-foreground">// Option A: Zero-boilerplate route-contextual "./dinou"</div>
                    <div>import &#123; Link, useRouter &#125; from &quot;./dinou&quot;;</div>
                    <div>&lt;Link href=&quot;about&quot;&gt;Read More&lt;/Link&gt;</div>
                    <div>router.push(&quot;../about&quot;);</div>
                    <div className="text-muted-foreground pt-1">// Option B: Global "dinou" with explicit from</div>
                    <div>&lt;Link from=&quot;/blog/hello&quot; href=&quot;./about&quot;&gt;Read More&lt;/Link&gt;</div>
                    <div>router.push(&quot;../about&quot;, &#123; from: &quot;/blog/hello&quot; &#125;);</div>
                  </div>
                </AlertDescription>
              </Alert>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </div>

      {/* Sidebar TOC - Visible on Desktop */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
