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
  { id: "userouter-methods", title: "Methods Reference", level: 4 },
  { id: "userouter-caching", title: "Client Cache & Options", level: 4 },
  { id: "userouter-examples", title: "Production Patterns", level: 4 },
  { id: "refreshslot", title: "refreshSlot()", level: 3 },
  { id: "refreshslot-parameters", title: "Parameters & Wildcard", level: 4 },
  { id: "refreshslot-architecture", title: "Targeted Revalidation", level: 4 },
  { id: "refreshslot-examples", title: "Production Patterns", level: 4 },
  { id: "usenavigationloading", title: "useNavigationLoading()", level: 3 },
  { id: "usenavigationloading-behavior", title: "Trigger Events & SSR", level: 4 },
  { id: "usenavigationloading-architecture", title: "Non-Blocking Transitions", level: 4 },
  { id: "usenavigationloading-examples", title: "Production Indicators", level: 4 },
  { id: "server-context-config", title: "3. Server Context & Config (dinou)", level: 2 },
  { id: "getcontext", title: "getContext()", level: 3 },
  { id: "getcontext-store", title: "Request & Response Store", level: 4 },
  { id: "getcontext-examples", title: "Production Patterns", level: 4 },
  { id: "defineconfig", title: "defineConfig()", level: 3 },
  { id: "defineconfig-schema", title: "Configuration Schema", level: 4 },
  { id: "defineconfig-examples", title: "Production Configuration", level: 4 },
  { id: "dinouplugin", title: "DinouPlugin", level: 3 },
  { id: "dinouplugin-lifecycle", title: "Lifecycle & Early Exit", level: 4 },
  { id: "dinouplugin-examples", title: "Production Plugins", level: 4 },
  { id: "server-primitives-storage", title: "4. Server & Storage (dinou/server)", level: 2 },
  { id: "dinoucacheslot", title: "<DinouCacheSlot>", level: 3 },
  { id: "dinoucacheslot-props", title: "Props & Micro-ISR", level: 4 },
  { id: "dinoucacheslot-examples", title: "Production Slot Patterns", level: 4 },
  { id: "revalidatepage", title: "revalidatePage()", level: 3 },
  { id: "revalidatepath", title: "revalidatePath()", level: 3 },
  { id: "revalidatetag", title: "revalidateTag()", level: 3 },
  { id: "storage-adapters", title: "Storage Adapters", level: 3 },
  { id: "storage-adapters-list", title: "Built-In Adapters", level: 4 },
  { id: "storage-adapters-custom", title: "Custom StorageAdapter", level: 4 },
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
              Explore all exports across <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded text-lg">dinou</code> and{" "}
              <code className="font-mono text-foreground font-semibold bg-muted px-1.5 py-0.5 rounded text-lg">dinou/server</code> with TypeScript signatures, runtime behavior, and practical usage patterns.
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
                <div className="flex items-center gap-2">
                  <h3 className="m-0">
                    <code>&lt;Link&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    "use client"
                  </span>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Universal Navigation
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The primary declarative navigation primitive in Dinou. Renders a semantic HTML <code>&lt;a&gt;</code> tag enhanced with client-side SPA soft navigation, automatic background prefetching on hover, relative filesystem path resolution, and optional cache bypassing.
                </p>

                {/* Conceptual Feature Cards */}
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                  <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-amber-500" />
                      <span>Soft Navigation &amp; Native Modifiers</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Intercepts clicks to perform seamless client-side page transitions via <code>push()</code> without triggering full browser reloads. If modifier keys (<code>Cmd</code>, <code>Ctrl</code>, <code>Shift</code>, <code>Alt</code>) are pressed or an external destination is specified, it gracefully yields to standard browser navigation (e.g. opening in a new tab).
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Flame className="h-4 w-4 text-orange-500" />
                      <span>Hover Prefetching &amp; Cache Freshness</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      By default, hovering over a link triggers an automatic background prefetch of the destination RSC payload and script chunks. When real-time accuracy is required, passing <code>fresh={true}</code> disables prefetching and forces an on-demand server roundtrip on click.
                    </p>
                  </div>
                </div>

                {/* Props Table */}
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-xs text-left border-collapse min-w-[600px]">
                    <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Prop</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Default</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">href</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">DinouRoute | string</td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">—</td>
                        <td className="p-3 align-top leading-relaxed">
                          Primary destination URL. Strongly typed with <code>DinouRoute</code> for compile-time route validation and IDE autocomplete. Supports absolute paths (<code>/dashboard</code>), relative paths (<code>./settings</code>, <code>../billing</code>), query strings, and external URLs.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">to</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">DinouRoute | string</td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">—</td>
                        <td className="p-3 align-top leading-relaxed">
                          Alias for <code>href</code> provided for compatibility with React Router and Remix codebases (evaluated as <code>href || to</code>).
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">prefetch</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">true</td>
                        <td className="p-3 align-top leading-relaxed">
                          Whether to prefetch the destination RSC payload and code bundle on <code>onMouseEnter</code>. Ignored when <code>fresh={true}</code> or when targeting external URLs.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">fresh</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">false</td>
                        <td className="p-3 align-top leading-relaxed">
                          Forces an on-demand server roundtrip upon navigation, bypassing any client-side router cache. Automatically skips hover prefetching when set to <code>true</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">...props</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">AnchorHTMLAttributes</td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">—</td>
                        <td className="p-3 align-top leading-relaxed">
                          All standard HTML anchor attributes (<code>className</code>, <code>target</code>, <code>rel</code>, <code>style</code>, <code>aria-*</code>, <code>onClick</code>). Custom <code>onClick</code> handlers execute first; calling <code>e.preventDefault()</code> prevents soft navigation.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Path Resolution Guide */}
                <Alert className="not-prose mt-4">
                  <LinkIcon className="h-4 w-4" />
                  <AlertTitle>Filesystem Path Resolution</AlertTitle>
                  <AlertDescription>
                    Dinou resolves route links analogously to standard filesystem directory paths based on the current <code>pathname</code>:
                    <ul className="list-disc pl-4 mt-2 space-y-1">
                      <li>
                        <strong>Absolute (<code>/</code>):</strong> Starts with a forward slash (e.g., <code>/dashboard</code>). Resolves strictly from the application root domain.
                      </li>
                      <li>
                        <strong>Relative Child (<code>./</code>):</strong> Resolves under the current segment (e.g., from <code>/products</code>, navigating to <code>./details</code> resolves to <code>/products/details</code>).
                      </li>
                      <li>
                        <strong>Relative Sibling (<code>../</code>):</strong> Navigates up one directory level (e.g., from <code>/users/settings</code>, navigating to <code>../profile</code> resolves to <code>/users/profile</code>).
                      </li>
                    </ul>
                  </AlertDescription>
                </Alert>

                {/* Practical Implementation Examples */}
                <div className="not-prose my-6 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Code2 className="h-4 w-4 text-emerald-500" />
                    <span>Usage Patterns</span>
                  </div>
                  <TabbedCodeBlock
                    defaultTab="active-nav"
                    tabs={[
                      {
                        id: "active-nav",
                        label: "nav-bar.tsx (Active Links)",
                        language: "tsx",
                        code: `// src/components/nav-bar.tsx (Client Component)
"use client";

import { Link, usePathname } from "dinou";

export function NavigationBar() {
  const pathname = usePathname();

  const navItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/orders", label: "Orders" },
    { href: "/analytics", label: "Analytics" },
    { href: "/settings", label: "Settings" },
  ];

  return (
    <nav className="flex items-center gap-4 p-4 border-b">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(\`\${item.href}/\`);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={\`px-3 py-1.5 rounded-md text-sm font-medium transition-colors \${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }\`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}`,
                      },
                      {
                        id: "fresh-cache-busting",
                        label: "live-orders.tsx (Forced Fresh)",
                        language: "tsx",
                        code: `// src/components/order-actions.tsx (Client Component)
"use client";

import { Link } from "dinou";
import { RefreshCw, ExternalLink } from "lucide-react";

export function OrderQuickActions() {
  return (
    <div className="flex items-center gap-3">
      {/* Normal soft navigation with hover prefetch */}
      <Link
        href="/orders/archive"
        className="text-xs text-muted-foreground hover:underline"
      >
        View Archive
      </Link>

      {/* Forced server round-trip: bypasses client RSC cache */}
      <Link
        href="/orders/live"
        fresh
        prefetch={false}
        className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 text-white text-xs rounded hover:bg-emerald-700"
      >
        <RefreshCw className="h-3.5 w-3.5" />
        <span>Live Monitor (Force Fresh)</span>
      </Link>
    </div>
  );
}`,
                      },
                      {
                        id: "relative-and-events",
                        label: "sub-nav.tsx (Relative & Events)",
                        language: "tsx",
                        code: `// src/app/dashboard/settings/page.tsx
"use client";

import { Link } from "dinou";

export default function SettingsSubNav() {
  const handleAuditClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Custom logging or analytics before navigation
    console.log("Navigating to security audit");
    
    // Calling e.preventDefault() here would cancel the soft navigation
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Relative Child navigation: resolves to /dashboard/settings/security */}
      <Link href="./security" onClick={handleAuditClick} className="text-sm font-medium">
        Security Settings
      </Link>

      {/* Relative Sibling navigation: resolves to /dashboard/billing */}
      <Link href="../billing" className="text-sm text-muted-foreground">
        Billing & Subscriptions
      </Link>

      {/* External Link: automatically falls back to native browser navigation */}
      <Link
        href="https://status.example.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs text-blue-500 underline"
      >
        System Status
      </Link>
    </div>
  );
}`,
                      },
                    ]}
                  />
                </div>
              </section>

              <section id="clientredirect" className="scroll-mt-20 mt-8">
                <div className="flex items-center gap-2">
                  <h3 className="m-0">
                    <code>&lt;ClientRedirect&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    "use client"
                  </span>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Declarative Primitive
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A declarative Client Component that triggers an immediate, seamless route replacement upon mounting in the browser. It renders no DOM markup (<code>null</code>) and executes a soft router replacement (<code>replace: true</code>), ensuring that the redirected URL does not create trap loops in the user&apos;s browser back history.
                </p>

                {/* Declarative Companion & History Replacement Cards */}
                <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                  <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <ArrowRightLeft className="h-4 w-4 text-emerald-500" />
                      <span>Declarative Companion to <code>redirect()</code></span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      While <code>redirect()</code> is the imperative function typically used with early returns (e.g. <code>return redirect(&quot;/login&quot;)</code>), <code>&lt;ClientRedirect&gt;</code> is the underlying JSX component returned by <code>redirect()</code>. It enables you to express redirections declaratively directly inside your JSX element tree.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-blue-500" />
                      <span>History Replacement (<code>replace: true</code>)</span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      When executed, <code>&lt;ClientRedirect&gt;</code> performs a <code>router.replace()</code> rather than a <code>push()</code>. This replaces the current entry in the browser&apos;s history stack so users clicking the browser Back button are not immediately bounced forward again in an infinite redirect loop.
                    </p>
                  </div>
                </div>

                {/* Props Table */}
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-xs text-left border-collapse min-w-[600px]">
                    <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Prop</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Default</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">to</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Required</td>
                        <td className="p-3 align-top leading-relaxed">
                          The destination path to navigate to. Supports absolute internal paths (e.g. <code>&quot;/auth/sign-in&quot;</code>), relative paths (e.g. <code>&quot;./onboarding&quot;</code>), and query parameters (e.g. <code>&quot;/pricing?plan=pro&quot;</code>).
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Practical Implementation Examples */}
                <div className="not-prose my-6 space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
                    <Code2 className="h-4 w-4 text-emerald-500" />
                    <span>Usage Patterns</span>
                  </div>
                  <TabbedCodeBlock
                    defaultTab="declarative-jsx"
                    tabs={[
                      {
                        id: "declarative-jsx",
                        label: "conditional-render.tsx (Declarative JSX)",
                        language: "tsx",
                        code: `// src/components/billing-gate.tsx (Client Component)
"use client";

import { ClientRedirect } from "dinou";

interface BillingGateProps {
  hasActiveSubscription: boolean;
  children: React.ReactNode;
}

export function BillingGate({ hasActiveSubscription, children }: BillingGateProps) {
  // Declarative ternary redirection directly inside JSX
  return hasActiveSubscription ? (
    <>{children}</>
  ) : (
    <ClientRedirect to="/pricing?upgrade=required" />
  );
}`,
                      },
                      {
                        id: "client-guard",
                        label: "client-guard.tsx (Client Auth Guard)",
                        language: "tsx",
                        code: `// src/components/client-guard.tsx (Client Component)
"use client";

import { ClientRedirect } from "dinou";
import { useAuth } from "@/hooks/use-auth";

export function ClientAuthGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div className="p-6 text-sm text-muted-foreground">Loading session...</div>;
  }

  if (!user) {
    // Replaces browser history with /sign-in immediately upon mount
    return <ClientRedirect to="/auth/sign-in?from=/dashboard" />;
  }

  return <>{children}</>;
}`,
                      },
                      {
                        id: "equivalence",
                        label: "guard-comparison.tsx (Equivalence with redirect)",
                        language: "tsx",
                        code: `// Pattern A: Imperative function return (Universal: Server & Client)
import { redirect } from "dinou";

export default function PageA({ isAllowed }: { isAllowed: boolean }) {
  if (!isAllowed) {
    return redirect("/unauthorized");
  }
  return <div>Welcome to Page A</div>;
}

// Pattern B: Declarative JSX Component (Client Component)
import { ClientRedirect } from "dinou";

export function PageB({ isAllowed }: { isAllowed: boolean }) {
  if (!isAllowed) {
    return <ClientRedirect to="/unauthorized" />;
  }
  return <div>Welcome to Page B</div>;
}`,
                      },
                    ]}
                  />
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>redirect()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
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
                <div className="flex items-center gap-2">
                  <h3 className="m-0">
                    <code>useRouter()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    "use client"
                  </span>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Type-Safe Routing
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Provides programmatic navigation, browser history controls, and cache refreshing methods inside Client Components. It enables smooth client-side navigation without full page reloads, letting you redirect users after actions (like form submissions) or refresh server data while keeping your client state intact.
                </p>

                {/* Client-Only Execution Notice */}
                <div className="p-3.5 rounded-lg bg-card border border-border not-prose my-4 space-y-2 text-xs">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Client-Only Execution</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    <code>useRouter()</code> is strictly a <strong>Client Component hook</strong> and must only be used in files with <code>&quot;use client&quot;</code>. Navigation methods (such as <code>push</code> or <code>replace</code>) must be invoked inside browser event handlers (e.g. <code>onClick</code>, <code>onSubmit</code>) or <code>useEffect</code>. To navigate or redirect from <strong>Server Components</strong> or <strong>Server Functions</strong>, use the universal <code>redirect(&quot;/path&quot;)</code> function instead.
                  </p>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 1: METHODS REFERENCE */}
                {/* ============================================================= */}
                <div id="userouter-methods" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-emerald-500" />
                    <span>Methods Reference</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    All navigation methods are fully typed. Routes are autocompleted and validated at compile time via the <code>DinouRoute</code> union type.
                  </p>

                  <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                    <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Method</th>
                          <th className="p-3">Signature</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-muted-foreground">
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">push</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            (href: DinouRoute, options?: NavigationOptions) =&gt; void
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Navigates to <code>href</code> and pushes a new entry onto the browser history stack. Validates route patterns via <code>DinouRoute</code>. Pass <code>&#123; fresh: true &#125;</code> to bypass the client-side memory cache and force a new flight request to the server.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">replace</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            (href: DinouRoute, options?: NavigationOptions) =&gt; void
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Navigates to <code>href</code> by replacing the current browser history entry (preventing the back button from returning to the previous screen). Also supports <code>&#123; fresh: true &#125;</code>.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">back</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            () =&gt; void
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Navigates back to the preceding entry in the browser history stack (equivalent to executing <code>window.history.back()</code> or clicking the browser&apos;s Back button). Restores saved scroll position automatically.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">forward</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            () =&gt; void
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Navigates forward to the next entry in the browser history stack (equivalent to executing <code>window.history.forward()</code>).
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">refresh</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            (options?: &#123; layout?: boolean &#125;) =&gt; void
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Performs a <strong>Soft Reload</strong>: purges the active page from the client memory cache, requests a fresh RSC payload from the server, and reconciles the DOM in a transition without reloading the browser or wiping client <code>useState</code>. Pass <code>&#123; layout: true &#125;</code> to invalidate the layout cache and re-render server layouts as well.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">refreshSlot</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            (slotId: string, options?: &#123; fresh?: boolean &#125;) =&gt; void
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Revalidates an isolated <code>&lt;DinouCacheSlot&gt;</code> on the current page without re-rendering or refetching surrounding components or layouts. Pass <code>&#123; fresh: true &#125;</code> to bypass the slot&apos;s server-side storage cache (ignoring any unexpired revalidate TTL) and force an immediate live re-render on the backend. This method is <strong>completely equivalent</strong> to the standalone <a href="#refreshslot" className="text-primary underline"><code>refreshSlot()</code></a> helper exported directly from <code>&quot;dinou&quot;</code>.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 2: CLIENT CACHE & REFRESH OPTIONS */}
                {/* ============================================================= */}
                <div id="userouter-caching" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>Client Cache &amp; Refresh Architecture</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Dinou maintains an in-memory client-side cache (<code>pageCache</code> and <code>layoutCache</code>) to guarantee instant, 0ms latency when users navigate between previously visited routes. Understanding how to manage this cache is essential when mutating data or building real-time dashboards.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>The <code>&#123; fresh: true &#125;</code> Option</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        By default, navigating to a previously visited URL retrieves its cached RSC flight tree. When a user submits an order, changes their profile, or deletes an item, pass <code>&#123; fresh: true &#125;</code> to <code>router.push()</code> or <code>router.replace()</code>.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        This immediately purges the target route from <code>pageCache</code>, ensuring the client receives updated server-rendered data without relying on stale client memory.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Layers className="h-4 w-4 text-blue-500" />
                        <span>The <code>&#123; layout: true &#125;</code> Option</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        To optimize performance, Dinou reuses parent layout Server Components across page transitions. Calling <code>router.refresh()</code> re-runs page components while keeping the layout intact.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        If your mutation impacts layout-level elements (such as updating an organization switcher, unread message badges in the global navbar, or user profile headers), pass <code>router.refresh(&#123; layout: true &#125;)</code> to re-evaluate and re-render layout Server Components.
                      </p>
                    </div>
                  </div>

                  {/* Soft Reload vs Hard Reload Comparison */}
                  <div className="not-prose rounded-lg border border-border bg-card p-4 text-xs space-y-3">
                    <div className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                      <span>Soft Reload (<code>router.refresh()</code>) vs. Hard Reload (<code>window.location.reload()</code>)</span>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5 bg-emerald-500/5 p-3 rounded border border-emerald-500/20">
                        <div className="font-semibold text-emerald-700 dark:text-emerald-300">
                          router.refresh() (Soft Reload)
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                          <li>Fetches updated RSC stream directly from the server.</li>
                          <li><strong>Preserves React state:</strong> <code>useState</code>, input cursor, and modal open states remain intact.</li>
                          <li>Smooth visual transition without white screen flashes.</li>
                          <li>Maintains client-side scroll position.</li>
                        </ul>
                      </div>
                      <div className="space-y-1.5 bg-muted/40 p-3 rounded border border-border">
                        <div className="font-semibold text-foreground">
                          window.location.reload() (Hard Reload)
                        </div>
                        <ul className="list-disc pl-4 space-y-1 text-muted-foreground">
                          <li>Destroys the entire JavaScript execution context.</li>
                          <li><strong>Wipes all client state:</strong> forms, focused elements, and in-memory caches are lost.</li>
                          <li>Full browser document reload with visible white flash.</li>
                          <li>Re-downloads and re-executes all static assets and bundles.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 3: PRODUCTION PATTERNS */}
                {/* ============================================================= */}
                <div id="userouter-examples" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-emerald-500" />
                    <span>Production Implementation Patterns</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Explore canonical implementations for post-mutation redirection, live polling, and targeted slot revalidation.
                  </p>

                  <div className="not-prose my-4">
                    <TabbedCodeBlock
                      defaultTab="mutation"
                      tabs={[
                        {
                          id: "mutation",
                          label: "post-mutation.tsx (Form Action)",
                          language: "tsx",
                          code: `// src/components/create-product-form.tsx (Client Component)
"use client";

import { useTransition, useState } from "react";
import { useRouter } from "dinou";
import { createProductAction } from "@/actions/products";

export function CreateProductForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      try {
        const result = await createProductAction(formData);
        
        // Navigate with fresh: true to bypass client cache and show live data
        router.push(\`/products/\${result.id}\`, { fresh: true });
      } catch (err: any) {
        setError(err.message || "Failed to create product");
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input name="title" placeholder="Product name..." required />
      <button type="submit" disabled={isPending}>
        {isPending ? "Creating..." : "Create Product"}
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}`,
                        },
                        {
                          id: "polling",
                          label: "live-poller.tsx (Live Dashboard)",
                          language: "tsx",
                          code: `// src/components/live-metrics-header.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "dinou";

export function LiveMetricsHeader() {
  const router = useRouter();
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [searchFilter, setSearchFilter] = useState("");

  useEffect(() => {
    // Polls fresh server data every 30 seconds
    const interval = setInterval(() => {
      // Soft reloads server components: local searchFilter and focus are preserved!
      router.refresh();
      setLastRefreshed(new Date());
    }, 30_000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h2 className="font-semibold text-sm">Real-Time Metrics</h2>
        <span className="text-xs text-muted-foreground">
          Last updated: {lastRefreshed.toLocaleTimeString()}
        </span>
      </div>

      {/* Local state is NOT wiped when router.refresh() runs in the background */}
      <input
        type="search"
        value={searchFilter}
        onChange={(e) => setSearchFilter(e.target.value)}
        placeholder="Filter metrics locally..."
        className="text-xs px-2 py-1 border rounded"
      />

      <button
        onClick={() => {
          router.refresh({ layout: true });
          setLastRefreshed(new Date());
        }}
        className="text-xs bg-secondary px-3 py-1.5 rounded hover:bg-secondary/80"
      >
        Refresh All (Including Layout)
      </button>
    </div>
  );
}`,
                        },
                        {
                          id: "slot-refresh",
                          label: "cart-drawer.tsx (Slot Revalidation)",
                          language: "tsx",
                          code: `// src/components/cart-drawer.tsx (Client Component)
"use client";

import { useRouter } from "dinou";
import { updateQuantityAction } from "@/actions/cart";

export function CartItemRow({ item }: { item: { id: string; qty: number } }) {
  const router = useRouter();

  const handleUpdate = async (delta: number) => {
    await updateQuantityAction(item.id, item.qty + delta);

    // Surgically revalidates only the <DinouCacheSlot id="cart-counter" /> and
    // <DinouCacheSlot id="cart-totals" /> without refetching the full page
    router.refreshSlot("cart-counter", { fresh: true });
    router.refreshSlot("cart-totals", { fresh: true });
  };

  return (
    <div className="flex items-center gap-2">
      <button onClick={() => handleUpdate(-1)}>-</button>
      <span>{item.qty}</span>
      <button onClick={() => handleUpdate(1)}>+</button>
    </div>
  );
}`,
                        },
                      ]}
                    />
                  </div>

                  <div className="p-3.5 rounded-lg bg-card border border-border text-xs not-prose space-y-2 mt-4">
                    <div className="font-semibold text-foreground flex items-center gap-1.5">
                      <Zap className="h-3.5 w-3.5 text-amber-500" />
                      <span>Coordination with <code>useNavigationLoading()</code></span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      Every call to <code>router.push()</code>, <code>router.replace()</code>, or <code>router.refresh()</code> wraps its state updates in React&apos;s transition engine (<code>startTransition</code>). To show global loading spinners or top progress indicators across transitions, subscribe to the <a href="#usenavigationloading" className="text-primary underline"><code>useNavigationLoading()</code></a> hook.
                    </p>
                  </div>
                </div>
              </section>

              <section id="refreshslot" className="scroll-mt-20 mt-8">
                <div className="flex items-center gap-2">
                  <h3 className="m-0">
                    <code>refreshSlot()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    "use client"
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                    Micro-ISR Primitives
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A standalone client-side helper that triggers targeted, isolated revalidation of one or all <code>&lt;DinouCacheSlot&gt;</code> components on the active page. Because it is a pure JavaScript function rather than a React hook, it can be called from anywhere in your client application—including React components, external event listeners, WebSocket handlers, and state management stores.
                </p>

                {/* Equivalence Callout */}
                <div className="p-3.5 rounded-lg bg-card border border-border not-prose my-4 space-y-1.5 text-xs">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>Equivalence with <code>router.refreshSlot()</code></span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    <code>refreshSlot(slotId, options)</code> is <strong>100% equivalent</strong> to <code>router.refreshSlot(slotId, options)</code> from <code>useRouter()</code>. While <code>useRouter()</code> requires a React component context, this standalone export can be called inside global callbacks, timers, or third-party service listeners without instantiating any hooks.
                  </p>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 1: PARAMETERS & WILDCARDS */}
                {/* ============================================================= */}
                <div id="refreshslot-parameters" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-emerald-500" />
                    <span>Parameters &amp; Wildcard Support</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Accepts a specific slot ID or a wildcard string to update multiple slots in parallel.
                  </p>

                  <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                    <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Parameter</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-muted-foreground">
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">slotId</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            string
                          </td>
                          <td className="p-3 align-top leading-relaxed space-y-1">
                            <p>
                              The unique identifier matching the <code>id</code> prop of a mounted <code>&lt;DinouCacheSlot&gt;</code> (e.g. <code>&quot;cart-counter&quot;</code>, <code>&quot;stock-aapl&quot;</code>).
                            </p>
                            <p className="text-[11px] text-foreground font-semibold">
                              Wildcard <code>&quot;*&quot;</code> Support:
                            </p>
                            <p>
                              Passing <code>&quot;*&quot;</code> targets <strong>every active slot</strong> mounted on the current page simultaneously, executing their revalidation in parallel with a single call.
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">options.fresh</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">
                            boolean (optional)
                          </td>
                          <td className="p-3 align-top leading-relaxed space-y-1">
                            <p>
                              Controls whether the server can return cached slot storage:
                            </p>
                            <ul className="list-disc pl-4 space-y-0.5">
                              <li>
                                <strong><code>false</code> (default):</strong> Checks the server-side cache. If the slot&apos;s revalidation TTL has not expired, returns the cached result.
                              </li>
                              <li>
                                <strong><code>true</code>:</strong> Bypasses the server-side cache entirely (even if the TTL is still valid), forces an immediate live re-render on the backend, updates the storage cache, and delivers fresh UI to the client.
                              </li>
                            </ul>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 2: TARGETED REVALIDATION ARCHITECTURE */}
                {/* ============================================================= */}
                <div id="refreshslot-architecture" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Layers className="h-4 w-4 text-purple-500" />
                    <span>Targeted Revalidation Architecture</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    How client-side slot refreshing delivers surgical UI updates without full page or route re-rendering.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <span>Surgical Component-Level Updates</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Unlike full route reloads (which re-run page Server Components), <code>refreshSlot()</code> communicates directly with the specific mounted <code>&lt;DinouCacheSlot&gt;</code> sub-tree.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Surrounding components, parent layouts, and sibling elements are completely untouched. Local client state (input focus, scroll position, and open modals) remains completely stable.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <ArrowRightLeft className="h-4 w-4 text-emerald-500" />
                        <span>Client vs. Server Revalidation</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Server-Side (<code>revalidateTag</code> / <code>revalidatePath</code> / <code>revalidatePage</code>):</strong> Purges cached HTML/JSON in storage during background jobs or server actions. Affects future incoming visits.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        <strong>Client-Side (<code>refreshSlot</code>):</strong> Actively pulls and renders the new UI into the user&apos;s current browser session in real time without refreshing the page.
                      </p>
                    </div>

                    <div className="md:col-span-2 p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-primary" />
                        <span>Why <code>refreshSlot(&quot;*&quot;, &#123; fresh: true &#125;)</code> is Unique</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When you execute a soft route refresh via <code>router.refresh()</code>, Dinou re-runs the outer page Server Component, but any mounted <code>&lt;DinouCacheSlot&gt;</code> continues serving its cached JSX from storage as long as its <code>revalidate</code> TTL has not expired.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Because <code>router.refresh()</code> cannot pass freshness parameters down to individual slot caches, calling <code>refreshSlot(&quot;*&quot;, &#123; fresh: true &#125;)</code> is the only client mechanism available to command every cached slot component on the active page to bypass storage and recalculate live on the server.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 3: PRODUCTION PATTERNS */}
                {/* ============================================================= */}
                <div id="refreshslot-examples" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-emerald-500" />
                    <span>Production Implementation Patterns</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Explore real-world patterns for real-time WebSocket events, wildcard dashboard refreshing, and external state stores.
                  </p>

                  <div className="not-prose my-4">
                    <TabbedCodeBlock
                      defaultTab="websocket"
                      tabs={[
                        {
                          id: "websocket",
                          label: "realtime-socket.ts (Pure JS Listener)",
                          language: "typescript",
                          code: `// src/services/realtime-socket.ts (Pure TypeScript / Non-React)
import { refreshSlot } from "dinou";

// Initialize WebSocket connection outside the React component tree
const socket = new WebSocket("wss://api.example.com/realtime");

socket.onmessage = (event) => {
  const message = JSON.parse(event.data);

  if (message.type === "PRICE_UPDATE") {
    // Surgically revalidates only the specific ticker slot in the active page
    refreshSlot(\`ticker-\${message.symbol.toLowerCase()}\`, { fresh: true });
  }

  if (message.type === "NOTIFICATION_RECEIVED") {
    // Updates the unread counter badge slot
    refreshSlot("notifications-badge", { fresh: true });
  }
};`,
                        },
                        {
                          id: "wildcard",
                          label: "dashboard-toolbar.tsx (Wildcard Refresh)",
                          language: "tsx",
                          code: `// src/components/dashboard-toolbar.tsx (Client Component)
"use client";

import { useState } from "react";
import { refreshSlot } from "dinou";

export function DashboardToolbar() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshAll = () => {
    setIsRefreshing(true);

    // "*" instructs Dinou to revalidate every mounted <DinouCacheSlot> across the page
    refreshSlot("*", { fresh: true });

    setTimeout(() => setIsRefreshing(false), 600);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-card border rounded-lg">
      <h2 className="text-sm font-semibold">Analytics Overview</h2>
      <button
        onClick={handleRefreshAll}
        disabled={isRefreshing}
        className="px-3 py-1.5 text-xs bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
      >
        {isRefreshing ? "Updating all slots..." : "Refresh All Widgets"}
      </button>
    </div>
  );
}`,
                        },
                        {
                          id: "mutation-store",
                          label: "cart-store.ts (State Action)",
                          language: "typescript",
                          code: `// src/stores/cart-store.ts (Client Action / Store)
import { refreshSlot } from "dinou";

export async function onCartItemAdded(productId: string) {
  await fetch(\`/api/cart/items\`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productId, quantity: 1 }),
  });

  // Revalidate the cart summary slot and checkout totals immediately
  refreshSlot("cart-summary", { fresh: true });
  refreshSlot("checkout-totals", { fresh: true });
}`,
                        },
                      ]}
                    />
                  </div>
                </div>
              </section>

              <section id="usenavigationloading" className="scroll-mt-20 mt-8">
                <div className="flex items-center gap-2">
                  <h3 className="m-0">
                    <code>useNavigationLoading()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    "use client"
                  </span>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    React 19 Transitions
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A Client Component hook that returns a boolean indicating whether an asynchronous SPA client-side route navigation or soft refresh is currently in progress. It subscribes to Dinou&apos;s router transition state, allowing you to render sleek progress bars, loading spinners, or disabled button states while the server renders and streams the new route payload.
                </p>

                {/* SSR Safety Callout */}
                <div className="p-3.5 rounded-lg bg-card border border-border not-prose my-4 space-y-1.5 text-xs">
                  <div className="font-semibold text-foreground flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span>SSR Safety &amp; Zero Hydration Mismatch</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    On the server (during SSR and static build generation), <code>useNavigationLoading()</code> unconditionally returns <code>false</code>. This guarantees that initial server-rendered HTML documents are never emitted with flashing progress bars or active loading spinners, eliminating layout shifts and preventing hydration mismatch errors.
                  </p>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 1: TRIGGER EVENTS & RUNTIME BEHAVIOR */}
                {/* ============================================================= */}
                <div id="usenavigationloading-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Code2 className="h-4 w-4 text-emerald-500" />
                    <span>Trigger Events &amp; Scope</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Overview of user actions that activate the transition state versus actions that remain localized.
                  </p>

                  <div className="not-prose overflow-x-auto rounded-lg border border-border mt-3">
                    <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Category</th>
                          <th className="p-3">Trigger Mechanism</th>
                          <th className="p-3">Activates Loading?</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-muted-foreground">
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">Link Navigation</td>
                          <td className="p-3 font-mono text-[11px] align-top">&lt;Link href=&quot;...&quot;&gt;</td>
                          <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">Yes</td>
                          <td className="p-3 align-top leading-relaxed">
                            Internal page transitions via declarative Link components trigger React transitions immediately on click.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">Imperative Navigation</td>
                          <td className="p-3 font-mono text-[11px] align-top">router.push() / router.replace()</td>
                          <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">Yes</td>
                          <td className="p-3 align-top leading-relaxed">
                            Programmatic redirects triggered in form submissions, callbacks, or buttons.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">History Traversal</td>
                          <td className="p-3 font-mono text-[11px] align-top">Browser Back / Forward / popstate</td>
                          <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">Yes</td>
                          <td className="p-3 align-top leading-relaxed">
                            Activating browser history buttons triggers transition state while restoring the destination page.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">Soft Route Reload</td>
                          <td className="p-3 font-mono text-[11px] align-top">router.refresh()</td>
                          <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">Yes</td>
                          <td className="p-3 align-top leading-relaxed">
                            Refetching the active route&apos;s RSC payload runs within a transition, preserving client state.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">Targeted Micro-ISR</td>
                          <td className="p-3 font-mono text-[11px] align-top">refreshSlot()</td>
                          <td className="p-3 align-top font-semibold text-muted-foreground">No</td>
                          <td className="p-3 align-top leading-relaxed">
                            Localized slot revalidation uses its own internal <code>&lt;Suspense&gt;</code> boundary; does not toggle global navigation loading.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-medium text-foreground align-top">Deferred Data Streaming</td>
                          <td className="p-3 font-mono text-[11px] align-top">&lt;Suspense fallback=&#123;...&#125;&gt;</td>
                          <td className="p-3 align-top font-semibold text-muted-foreground">No</td>
                          <td className="p-3 align-top leading-relaxed">
                            Late-arriving streamed chunks inside an active view render their own fallbacks independently.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 2: CONCURRENT TRANSITION ARCHITECTURE */}
                {/* ============================================================= */}
                <div id="usenavigationloading-architecture" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Zap className="h-4 w-4 text-amber-500" />
                    <span>Non-Blocking Concurrent Transitions</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    How React 19 concurrent transitions keep the user interface responsive during flight fetches.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Responsive, Non-Freezing UI</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        In traditional single-page apps, clicking a link often causes the screen to freeze or clear immediately. In Dinou, navigations execute within React&apos;s <code>startTransition</code>.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        The current screen remains fully responsive, interactive, and scrollable while the server computes and streams the destination page in the background.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Layers className="h-4 w-4 text-blue-500" />
                        <span>Atomic Screen Replacement</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Dinou preserves the existing view until the server has streamed enough of the new route to render its initial component shell.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        The transition completes atomically: <code>useNavigationLoading()</code> flips back to <code>false</code> precisely when the new DOM is painted, eliminating blank screen flashes.
                      </p>
                    </div>
                  </div>
                </div>

                {/* ============================================================= */}
                {/* SUBSECTION 3: PRODUCTION INDICATORS */}
                {/* ============================================================= */}
                <div id="usenavigationloading-examples" className="scroll-mt-20 mt-8 pt-4 border-t border-border/60">
                  <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                    <Sliders className="h-4 w-4 text-emerald-500" />
                    <span>Production Implementation Patterns</span>
                  </h4>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Explore real-world patterns for top progress bars, accessible screen readers, and double-click navigation guards.
                  </p>

                  <div className="not-prose my-4">
                    <TabbedCodeBlock
                      defaultTab="progress-bar"
                      tabs={[
                        {
                          id: "progress-bar",
                          label: "top-progress-bar.tsx (Slim Top Bar)",
                          language: "tsx",
                          code: `// src/components/top-progress-bar.tsx (Client Component)
"use client";

import { useNavigationLoading } from "dinou";

export function TopProgressBar() {
  const isNavigating = useNavigationLoading();

  if (!isNavigating) return null;

  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-primary overflow-hidden shadow-[0_0_8px_rgba(59,130,246,0.5)]"
    >
      <div className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
    </div>
  );
}`,
                        },
                        {
                          id: "spinner",
                          label: "global-spinner.tsx (Floating Status)",
                          language: "tsx",
                          code: `// src/components/global-spinner.tsx (Client Component)
"use client";

import { useNavigationLoading } from "dinou";

export function GlobalNavigationIndicator() {
  const isNavigating = useNavigationLoading();

  if (!isNavigating) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 right-4 z-50 flex items-center gap-2 px-3 py-2 bg-card border rounded-full shadow-lg text-xs font-medium text-foreground transition-all"
    >
      <div className="h-3 w-3 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      <span>Loading content...</span>
    </div>
  );
}`,
                        },
                        {
                          id: "guard-button",
                          label: "nav-button.tsx (Double-Click Guard)",
                          language: "tsx",
                          code: `// src/components/nav-button.tsx (Client Component)
"use client";

import { useNavigationLoading, useRouter } from "dinou";

interface NavButtonProps {
  href: string;
  children: React.ReactNode;
}

export function NavButton({ href, children }: NavButtonProps) {
  const router = useRouter();
  const isNavigating = useNavigationLoading();

  return (
    <button
      onClick={() => router.push(href)}
      disabled={isNavigating}
      className="px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
    >
      {isNavigating ? "Navigating..." : children}
    </button>
  );
}`,
                        },
                      ]}
                    />
                  </div>
                </div>
              </section>
            </section>

            {/* ================================================================= */}
            {/* SECTION 3: SERVER CONTEXT & CONFIG */}
            {/* ================================================================= */}
            <section id="server-context-config" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                3. Server Context &amp; Config (<code>dinou</code>)
                <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                  Server-Side Execution
                </span>
              </h2>

              {/* ------------------------------------------------------------- */}
              {/* GETCONTEXT() */}
              {/* ------------------------------------------------------------- */}
              <section id="getcontext" className="scroll-mt-20">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>getContext()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Server-Only Primitive
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Returns: RequestContextStore | undefined
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Synchronously accesses the active HTTP request and response context via Node.js / V8 <code>AsyncLocalStorage</code>. In Dinou, <code>getContext()</code> operates across <strong>Server Components (RSC)</strong>, <strong>Server Functions (<code>&quot;use server&quot;</code>)</strong>, and route segment contracts in <strong><code>page_functions.ts</code></strong> and <strong><code>layout_functions.ts</code></strong> without prop drilling.
                </p>

                {/* Sub-section 1: Request & Response Store Reference */}
                <div id="getcontext-store" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-500" />
                      <span>Request &amp; Response Store Reference</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Overview of the read-only request metadata (<code>ctx.req</code>) and server response mutation proxies (<code>ctx.res</code>).
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                    {/* Request Store */}
                    <div className="p-4 rounded-lg bg-card border border-border space-y-3">
                      <div className="font-semibold text-foreground flex items-center gap-1.5 pb-2 border-b border-border">
                        <FileText className="h-4 w-4 text-blue-500" />
                        <span>Request Store (<code>ctx.req</code>)</span>
                      </div>
                      <div className="space-y-2 text-muted-foreground leading-relaxed">
                        <div>
                          <strong className="text-foreground font-mono">req.query:</strong>
                          <div className="text-[11px]">Parsed URL query parameters (e.g. <code>Record&lt;string, string | string[]&gt;</code>).</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">req.cookies:</strong>
                          <div className="text-[11px]">Incoming client cookies parsed into a key-value record (<code>Record&lt;string, string&gt;</code>).</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">req.headers:</strong>
                          <div className="text-[11px]">Normalized incoming HTTP request headers (<code>IncomingHttpHeaders</code>).</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">req.path:</strong>
                          <div className="text-[11px]">Normalized request URL pathname (e.g. <code>&quot;/dashboard&quot;</code>).</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">req.method:</strong>
                          <div className="text-[11px]">HTTP method (e.g. <code>&quot;GET&quot;</code>, <code>&quot;POST&quot;</code>).</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">req.env:</strong>
                          <div className="text-[11px]">Platform host bindings (Cloudflare D1, KV, R2, environment variables).</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">req.ctx:</strong>
                          <div className="text-[11px]">Execution context for background work (e.g. <code>ctx.waitUntil()</code>).</div>
                        </div>
                      </div>
                    </div>

                    {/* Response Proxy */}
                    <div className="p-4 rounded-lg bg-card border border-border space-y-3">
                      <div className="font-semibold text-foreground flex items-center gap-1.5 pb-2 border-b border-border">
                        <Server className="h-4 w-4 text-emerald-500" />
                        <span>Response Proxy (<code>ctx.res</code>)</span>
                      </div>
                      <div className="space-y-2 text-muted-foreground leading-relaxed">
                        <div>
                          <strong className="text-foreground font-mono">res.cookie(name, val, options?):</strong>
                          <div className="text-[11px]">Sets an outgoing HTTP cookie. Supports <code>httpOnly</code>, <code>secure</code>, <code>sameSite</code>, <code>maxAge</code>, <code>expires</code>, and <code>path</code>.</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">res.clearCookie(name, options?):</strong>
                          <div className="text-[11px]">Expires and clears an existing HTTP cookie.</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">res.setHeader(name, value):</strong>
                          <div className="text-[11px]">Sets an outgoing HTTP header before the initial stream begins.</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">res.status(code):</strong>
                          <div className="text-[11px]">Sets the HTTP response status code (e.g. <code>200</code>, <code>201</code>, <code>404</code>).</div>
                        </div>
                        <div>
                          <strong className="text-foreground font-mono">res.redirect(status?, url):</strong>
                          <div className="text-[11px]">Executes a native HTTP redirect (defaults to status <code>302</code>).</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Plugin Shared State & Direct Host Bindings */}
                  <div className="p-4 rounded-lg bg-card border border-border not-prose text-xs my-4 space-y-2">
                    <div className="font-semibold text-foreground flex items-center gap-1.5 pb-2 border-b border-border">
                      <Layers className="h-4 w-4 text-purple-500" />
                      <span>Plugin Shared State &amp; Direct Platform Bindings</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4 pt-1">
                      <div className="space-y-1.5">
                        <strong className="text-foreground font-mono">ctx[customKey] (Plugin State Sharing):</strong>
                        <p className="text-muted-foreground leading-relaxed">
                          Any custom data attached to <code>context</code> inside a plugin&apos;s <code>onRequest(request, context)</code> hook (such as <code>context.user</code>, <code>context.session</code>, or <code>context.tenant</code>) is preserved across the entire request lifecycle and can be read synchronously via <code>getContext()</code> in any Server Component or Server Function.
                        </p>
                      </div>
                      <div className="space-y-1.5">
                        <strong className="text-foreground font-mono">ctx.env &amp; ctx.ctx (Direct Host Bindings):</strong>
                        <p className="text-muted-foreground leading-relaxed">
                          In addition to <code>ctx.req.env</code>, platform host resources (Cloudflare D1 databases, KV namespaces, R2 buckets) and execution context methods (such as <code>ctx.waitUntil()</code>) are accessible directly at the root of the context object.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Streaming & Headers Timing Callout */}
                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-amber-500" />
                        <span>Streaming &amp; Headers Sent Timing</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        HTTP headers, status codes, and HTTP-only cookies can only be sent before the server flushes the initial response stream. In streaming Server Components or deferred <code>&lt;Suspense&gt;</code> blocks, invoke <code>return redirect(&quot;/path&quot;)</code> to trigger client-side SPA navigation instead of modifying raw headers.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20 space-y-2">
                      <div className="font-semibold text-rose-700 dark:text-rose-300 flex items-center gap-1.5">
                        <Shield className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                        <span>Server-Only Security Sandbox</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Never invoke <code>getContext()</code> directly inside a Client Component running in the browser. In browser environments, Dinou logs an error and returns an empty object. Always read confidential cookies or database records in Server Components or <code>getProps</code>, sanitize the data, and pass only safe props to Client Components.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-section 2: Production Patterns */}
                <div id="getcontext-examples" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-blue-500" />
                      <span>Production Implementation Patterns</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Explore real-world patterns for Server Components, Server Functions, route segment lifecycle hooks, and plugin state retrieval.
                  </p>

                  <div className="not-prose my-4">
                    <TabbedCodeBlock
                      defaultTab="server-component"
                      tabs={[
                        {
                          id: "server-component",
                          label: "profile.tsx (Server Component)",
                          language: "tsx",
                          code: `// src/app/profile/page.tsx (Server Component)
import { getContext, redirect } from "dinou";
import { db } from "@/lib/db";

export default async function ProfilePage() {
  const ctx = getContext();
  if (!ctx) return null;

  // Read authenticated session cookie securely on the server
  const sessionToken = ctx.req.cookies.auth_session;
  if (!sessionToken) {
    return redirect("/login?from=/profile");
  }

  // Extract client IP and user agent for security logging
  const clientIp = ctx.req.headers["x-forwarded-for"] || "127.0.0.1";
  const userAgent = ctx.req.headers["user-agent"] || "unknown";

  const user = await db.users.findByToken(sessionToken);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user.name}</h1>
      <p className="text-sm text-muted-foreground">Session active from IP: {clientIp}</p>
    </div>
  );
}`,
                        },
                        {
                          id: "server-function",
                          label: "theme.ts (Server Function)",
                          language: "typescript",
                          code: `// src/actions/preferences.ts
"use server";

import { getContext } from "dinou";

export async function updateThemePreference(theme: "light" | "dark" | "system") {
  const ctx = getContext();
  if (!ctx) throw new Error("Context unavailable");

  // Mutate an outgoing HTTP response cookie from the server action
  ctx.res.cookie("preferred_theme", theme, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return { success: true, theme };
}`,
                        },
                        {
                          id: "page-functions",
                          label: "page_functions.ts (Route Lifecycle)",
                          language: "typescript",
                          code: `// src/app/dashboard/page_functions.ts
import { getContext, redirect } from "dinou";

// Evaluated before any JSX component rendering begins
export async function getProps() {
  const ctx = getContext();
  if (!ctx) return { tenant: null };

  const tenantSlug = ctx.req.query.tenant as string;
  if (!tenantSlug) {
    return redirect("/onboarding");
  }

  // Read environment variable or platform binding
  const apiSecret = ctx.req.env?.TENANT_API_KEY || process.env.TENANT_API_KEY;

  return {
    tenantSlug,
    hasApiKey: Boolean(apiSecret),
  };
}`,
                        },
                        {
                          id: "plugin-state",
                          label: "plugin-state.tsx (Plugin Injected State)",
                          language: "tsx",
                          code: `// 1. Plugin attaches authenticated user to context (dinou.config.mjs)
export const authPlugin = {
  name: "auth-guard",
  async onRequest(request, context) {
    const token = request.headers.get("Authorization");
    if (token) {
      // Injected directly into the request context store
      context.user = await verifySession(token);
    }
  },
};

// 2. Server Component retrieves plugin state with zero prop-drilling
// src/app/dashboard/page.tsx (Server Component)
import { getContext } from "dinou";

export default async function DashboardPage() {
  const ctx = getContext();
  
  // Directly access custom plugin properties from the store
  const currentUser = ctx?.user;

  return (
    <div>
      <h1>Welcome back, {currentUser?.name || "Guest"}</h1>
      <p>Role: {currentUser?.role || "anonymous"}</p>
    </div>
  );
}`,
                        },
                      ]}
                    />
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------------- */}
              {/* DEFINECONFIG() & DINOUCONFIG */}
              {/* ------------------------------------------------------------- */}
              <section id="defineconfig" className="scroll-mt-20 mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>defineConfig()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                    Configuration Helper
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Root Configuration
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Type-safe configuration helper providing autocomplete, IntelliSense, and schema validation for your application&apos;s root configuration file (<code>dinou.config.mjs</code>, <code>dinou.config.js</code>, or <code>dinou.config.ts</code>).
                </p>

                {/* Sub-section 1: Schema Reference */}
                <div id="defineconfig-schema" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Settings className="h-4 w-4 text-purple-500" />
                      <span>Configuration Schema Reference</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Options accepted by the <code>defineConfig()</code> wrapper.
                  </p>

                  <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                    <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Option</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Default</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-muted-foreground">
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">reactStrictMode</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">true</td>
                          <td className="p-3 align-top leading-relaxed">
                            Enables React 19 StrictMode double-rendering in development mode. Helps detect unexpected side effects and ensures strict concurrent rendering compatibility with React Compiler.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">ppr</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">false</td>
                          <td className="p-3 align-top leading-relaxed">
                            Global default for Partial Prerendering. When enabled, static-eligible routes pre-render an instant static HTML shell while streaming dynamic <code>&lt;Suspense&gt;</code> holes. Can be overridden per route in <code>page_functions.ts</code>.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">storage</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">StorageAdapter</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">FileSystemStorage</td>
                          <td className="p-3 align-top leading-relaxed">
                            Configures the storage backend for ISR HTML pages, RSC flight payloads, and cache slot records. Accepts built-in adapters (such as <code>RedisStorage</code> or <code>MemoryStorage</code>) or custom implementations.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">plugins</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">DinouPlugin[]</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">[]</td>
                          <td className="p-3 align-top leading-relaxed">
                            Array of Web Standards lifecycle middleware plugins executed on every incoming HTTP request before route matching or React rendering.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sub-section 2: Production Configuration */}
                <div id="defineconfig-examples" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-purple-500" />
                      <span>Production Configuration Patterns</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Complete production configuration files for ES Modules and TypeScript projects.
                  </p>

                  <div className="not-prose my-4">
                    <TabbedCodeBlock
                      defaultTab="esm-config"
                      tabs={[
                        {
                          id: "esm-config",
                          label: "dinou.config.mjs (Production ESM)",
                          language: "javascript",
                          code: `// dinou.config.mjs
import { defineConfig } from "dinou";
import { RedisStorage } from "dinou/server";
import Redis from "ioredis";

export default defineConfig({
  // Guarantee concurrent compatibility with React 19 StrictMode in dev
  reactStrictMode: true,

  // Global Partial Prerendering default
  ppr: false,

  // Distributed multi-region ISR cache storage
  storage: new RedisStorage(
    new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      enableReadyCheck: true,
    })
  ),

  // Universal Web Standards request plugins
  plugins: [
    {
      name: "security-headers",
      async onRequest(request, context) {
        // Enforce HTTPS in production environments
        const proto = request.headers.get("x-forwarded-proto");
        if (process.env.NODE_ENV === "production" && proto === "http") {
          const httpsUrl = request.url.replace("http://", "https://");
          return Response.redirect(httpsUrl, 301);
        }
      },
    },
  ],
});`,
                        },
                        {
                          id: "ts-config",
                          label: "dinou.config.ts (TypeScript)",
                          language: "typescript",
                          code: `// dinou.config.ts
import { defineConfig, type DinouPlugin } from "dinou";

const apiAuthPlugin: DinouPlugin = {
  name: "api-guard",
  async onRequest(request, context) {
    const url = new URL(request.url);

    // Fast-path edge authorization for protected API routes
    if (url.pathname.startsWith("/api/protected")) {
      const apiKey = request.headers.get("x-api-key");
      if (!apiKey || apiKey !== process.env.INTERNAL_API_KEY) {
        return Response.json(
          { error: "Unauthorized access: invalid or missing API key" },
          { status: 401 }
        );
      }
    }
  },
};

export default defineConfig({
  reactStrictMode: true,
  ppr: true,
  plugins: [apiAuthPlugin],
});`,
                        },
                      ]}
                    />
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------------- */}
              {/* DINOUPLUGIN */}
              {/* ------------------------------------------------------------- */}
              <section id="dinouplugin" className="scroll-mt-20 mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>DinouPlugin</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Web Standards Middleware
                  </span>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Edge &amp; Node.js Compatible
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Plugins execute sequentially on the web server entrypoint for every incoming HTTP request before React route matching or component rendering begins. Built on standard Web <code>Request</code> and <code>Response</code> primitives, plugins provide unified middleware capabilities across Node.js, Bun, Cloudflare Workers, and Edge platforms.
                </p>

                {/* Interface Properties Table */}
                <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                  <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                    <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Property</th>
                        <th className="p-3">Type</th>
                        <th className="p-3">Required</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">name</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
                        <td className="p-3 align-top leading-relaxed">
                          Descriptive plugin identifier used for telemetry, developer diagnostics, and error reporting in logs.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">onRequest</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">
                          (request: Request, context: RequestContextStore) =&gt; Promise&lt;Response | void&gt; | Response | void
                        </td>
                        <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
                        <td className="p-3 align-top leading-relaxed">
                          Universal Web Standards middleware hook executed sequentially on every incoming HTTP request before React rendering. Returning a standard Web <code>Response</code> aborts the request immediately (&lt;1ms). Returning <code>void</code> continues execution and preserves any custom properties attached to <code>context</code> for downstream Server Components.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Sub-section 1: Lifecycle & Early Exit */}
                <div id="dinouplugin-lifecycle" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4 text-emerald-500" />
                      <span>Execution Lifecycle &amp; Response Contract</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Understanding early exit vs. pipeline pass-through in <code>onRequest</code>.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Early Exit (<code>Response</code> Returned)</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        If <code>onRequest</code> returns an instance of <code>Response</code> (such as <code>Response.redirect()</code>, <code>Response.json()</code>, or a custom <code>Response</code>), Dinou terminates the request immediately (&lt;1ms).
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        It completely bypasses React component rendering, routing matches, and server-side database lookups. This is optimal for authentication walls, health check endpoints, and bot blocking.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Layers className="h-4 w-4 text-blue-500" />
                        <span>Pass-Through &amp; Context Enrichment (<code>void</code>)</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        If <code>onRequest</code> returns nothing (or <code>undefined</code>), execution proceeds seamlessly to the React rendering pipeline.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Any custom properties attached to the <code>context</code> parameter (e.g. <code>context.user = session</code>) are preserved in <code>AsyncLocalStorage</code> and accessible synchronously in Server Components via <code>getContext()</code>.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-section 2: Production Plugins */}
                <div id="dinouplugin-examples" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-emerald-500" />
                      <span>Production Plugin Patterns</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Practical implementations for API security, geolocation enrichment, and server-timing telemetry.
                  </p>

                  <div className="not-prose my-4">
                    <TabbedCodeBlock
                      defaultTab="api-guard"
                      tabs={[
                        {
                          id: "api-guard",
                          label: "auth-guard.ts (Early Exit)",
                          language: "typescript",
                          code: `// src/plugins/auth-guard.ts
import type { DinouPlugin } from "dinou";

export const authGuardPlugin: DinouPlugin = {
  name: "auth-guard",
  async onRequest(request, context) {
    const url = new URL(request.url);

    // Intercept secured API endpoints before React loads
    if (url.pathname.startsWith("/api/admin")) {
      const authHeader = request.headers.get("authorization");
      if (!authHeader || !authHeader.startsWith("Bearer secret_admin_token")) {
        // Fast-path early exit: terminates request in <1ms
        return Response.json(
          { error: "Forbidden: invalid administrative token" },
          { status: 403, headers: { "Cache-Control": "no-store" } }
        );
      }
    }
  },
};`,
                        },
                        {
                          id: "geo-context",
                          label: "geo-enrichment.ts (Context Enrichment)",
                          language: "typescript",
                          code: `// src/plugins/geo-enrichment.ts
import type { DinouPlugin } from "dinou";

export const geoPlugin: DinouPlugin = {
  name: "geo-enrichment",
  async onRequest(request, context) {
    // Extract Edge CDN headers (Cloudflare, Vercel, AWS CloudFront)
    const country = request.headers.get("cf-ipcountry") || "US";
    const city = request.headers.get("cf-ipcity") || "San Francisco";

    // Enrich the request context object with geo metadata
    context.geo = {
      country,
      city,
      isEu: ["DE", "FR", "ES", "IT", "NL"].includes(country),
    };

    // Return nothing (void) -> execution proceeds to React rendering
    // Downstream Server Components can read context.geo via getContext()!
  },
};`,
                        },
                        {
                          id: "server-timing",
                          label: "server-timing.ts (Telemetry & Latency)",
                          language: "typescript",
                          code: `// src/plugins/server-timing.ts
import type { DinouPlugin } from "dinou";

export const telemetryPlugin: DinouPlugin = {
  name: "server-timing",
  async onRequest(request, context) {
    const start = performance.now();

    // Fast-path health check endpoint
    if (new URL(request.url).pathname === "/healthz") {
      const duration = (performance.now() - start).toFixed(2);
      return Response.json({
        status: "healthy",
        uptime: process.uptime ? process.uptime() : 0,
        latencyMs: Number(duration),
      });
    }

    // Attach request start timestamp for downstream telemetry
    context.startTime = start;
  },
};`,
                        },
                      ]}
                    />
                  </div>
                </div>
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

              {/* ------------------------------------------------------------- */}
              {/* DINOUCACHESLOT */}
              {/* ------------------------------------------------------------- */}
              <section id="dinoucacheslot" className="scroll-mt-20">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>&lt;DinouCacheSlot&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Server Primitive
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Returns: ReactNode
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The foundational primitive for <strong>Micro-ISR (Vertical 2D Segmentation)</strong> in React Server Components. Allows isolating, caching, and revalidating independent component subtrees within an active page without re-evaluating the parent page, re-fetching unchanged database queries, or resetting client component state.
                </p>

                {/* Sub-section 1: Props & Micro-ISR Reference */}
                <div id="dinoucacheslot-props" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Layers className="h-4 w-4 text-emerald-500" />
                      <span>Props &amp; Micro-ISR Reference</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Configuring TTL revalidation, cache tags, and targeted slot identifiers.
                  </p>

                  <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                    <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Prop</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Default</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-muted-foreground">
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">id</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Optional</td>
                          <td className="p-3 align-top leading-relaxed">
                            Unique identifier for targeted client-side slot refreshing via <code>refreshSlot(id)</code> or <code>router.refreshSlot(id)</code>.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">revalidate</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">number</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">false (Forever)</td>
                          <td className="p-3 align-top leading-relaxed">
                            Time-based TTL in seconds. Automatically refreshes and persists the slot subtree in the background once the timer expires.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">tag / tags</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">string | string[]</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">undefined</td>
                          <td className="p-3 align-top leading-relaxed">
                            Cache tag or array of tags for server-side on-demand invalidation via <code>revalidateTag(tag)</code>.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">children</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">ReactNode</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Required</td>
                          <td className="p-3 align-top leading-relaxed">
                            The Server Component subtree to isolate, render, and cache independently.
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Architecture Callout */}
                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-emerald-500" />
                        <span>Independent Storage Persistence</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Dinou resolves the slot&apos;s Server Component subtree and serializes it directly to your configured storage adapter. Child components only re-execute when their individual TTL expires or an invalidation command is received.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                        <span>Client State Preservation</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When a slot refreshes (either via time-based micro-ISR or <code>refreshSlot</code>), only that specific subtree updates in the browser DOM. Outer forms, input focus, scroll position, and client React state remain completely undisturbed.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sub-section 2: Production Slot Patterns */}
                <div id="dinoucacheslot-examples" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-emerald-500" />
                      <span>Production Slot Patterns</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Explore real-world patterns for independent TTLs, tag invalidations, and financial tickers.
                  </p>

                  <div className="not-prose my-4">
                    <TabbedCodeBlock
                      defaultTab="ticker-slot"
                      tabs={[
                        {
                          id: "ticker-slot",
                          label: "ticker-slot.tsx (Time-based Micro-ISR)",
                          language: "tsx",
                          code: `// src/components/crypto-ticker-slot.tsx (Server Component)
import { DinouCacheSlot } from "dinou/server";
import { fetchCryptoPrices } from "@/lib/crypto";

export function CryptoTickerSection() {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <h2 className="text-sm font-semibold mb-2">Live Market Watch</h2>
      
      {/* Caches ticker independently for 15 seconds */}
      <DinouCacheSlot id="crypto-ticker" revalidate={15} tag="crypto">
        <LiveCryptoPrices />
      </DinouCacheSlot>
    </div>
  );
}

async function LiveCryptoPrices() {
  const prices = await fetchCryptoPrices();
  return (
    <div className="flex gap-4 font-mono text-xs">
      <span>BTC: \${prices.btc.toLocaleString()}</span>
      <span>ETH: \${prices.eth.toLocaleString()}</span>
      <span>SOL: \${prices.sol.toLocaleString()}</span>
    </div>
  );
}`,
                        },
                        {
                          id: "cart-slot",
                          label: "cart-slot.tsx (Tag Invalidation)",
                          language: "tsx",
                          code: `// src/components/cart-badge-slot.tsx (Server Component)
import { DinouCacheSlot } from "dinou/server";
import { getContext } from "dinou";
import db from "@/lib/db";

export function CartBadgeSlot() {
  const ctx = getContext();
  const userId = ctx?.req.cookies.user_id || "guest";

  return (
    // Cached until a mutation calls revalidateTag(\`cart-\${userId}\`)
    <DinouCacheSlot
      id="header-cart"
      tag={[\`cart-\${userId}\`, "cart"]}
    >
      <CartCounter userId={userId} />
    </DinouCacheSlot>
  );
}

async function CartCounter({ userId }: { userId: string }) {
  const count = await db.cart.getItemCount(userId);
  return <span className="badge font-bold">{count} items</span>;
}`,
                        },
                        {
                          id: "dashboard",
                          label: "dashboard.tsx (Multi-Slot Grid)",
                          language: "tsx",
                          code: `// src/app/dashboard/page.tsx (Server Component)
import { DinouCacheSlot } from "dinou/server";
import { UserMetrics } from "@/components/metrics";
import { GlobalAnnouncements } from "@/components/announcements";
import { ActivityFeed } from "@/components/activity";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Workspace Overview</h1>
      </header>

      {/* Slot A: Global announcements cached for 1 hour */}
      <DinouCacheSlot id="announcements" revalidate={3600} tag="announcements">
        <GlobalAnnouncements />
      </DinouCacheSlot>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content: High-velocity user metrics cached for 30s */}
        <div className="col-span-2">
          <DinouCacheSlot id="metrics" revalidate={30} tag="metrics">
            <UserMetrics />
          </DinouCacheSlot>
        </div>

        {/* Sidebar: Activity feed revalidated on-demand */}
        <div>
          <DinouCacheSlot id="activity" tags={["activity-feed"]}>
            <ActivityFeed />
          </DinouCacheSlot>
        </div>
      </div>
    </div>
  );
}`,
                        },
                      ]}
                    />
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------------- */}
              {/* REVALIDATEPAGE() */}
              {/* ------------------------------------------------------------- */}
              <section id="revalidatepage" className="scroll-mt-20 mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>revalidatePage()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Server Function
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Target: Page Component Only
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Asynchronously invalidates and regenerates **only the targeted page component** (its <code>page.rsc</code> payload and static HTML), while leaving parent and ancestor layouts (<code>layout.rsc</code>) completely untouched.
                </p>

                {/* Sub-section 1: Scope & Behavior */}
                <div id="revalidatepage-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-blue-500" />
                      <span>Page-Only Invalidation Scope</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Why targeted page revalidation saves server compute and bandwidth.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-4 not-prose text-xs">
                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        <span>Preserves Parent Layout Cache</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        When updating an individual blog post or product price, re-rendering global headers, user navigation menus, and shared footer layouts is unnecessary overhead.
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        <code>revalidatePage(path)</code> recalculates strictly the page JSX artifact, maximizing cache reuse for all wrapping layout hierarchies.
                      </p>
                    </div>

                    <div className="p-4 rounded-lg bg-card border border-border space-y-2">
                      <div className="font-semibold text-foreground flex items-center gap-1.5">
                        <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                        <span>Path Normalization</span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">
                        Supports absolute routes (e.g. <code>&quot;/products/laptop-pro&quot;</code>), parameterized URLs, or relative paths (e.g. <code>&quot;./&quot;</code> relative to the active request).
                      </p>
                      <p className="text-muted-foreground leading-relaxed">
                        Trailing slashes are automatically normalized to guarantee consistent cache purging on both Node.js and Edge storage backends.
                      </p>
                    </div>
                  </div>

                  <div className="not-prose my-4">
                    <CodeBlock language="typescript" containerClassName="rounded-lg">
                      {`import { revalidatePage } from "dinou/server";

// Revalidates strictly the page component for this route
await revalidatePage("/blog/announcing-v7");

// Revalidates the page for the current active route
await revalidatePage("./");`}
                    </CodeBlock>
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------------- */}
              {/* REVALIDATEPATH() */}
              {/* ------------------------------------------------------------- */}
              <section id="revalidatepath" className="scroll-mt-20 mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>revalidatePath()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Server Function
                  </span>
                  <span className="inline-flex items-center rounded-md bg-purple-500/10 px-2 py-0.5 text-xs font-medium text-purple-600 dark:text-purple-400 ring-1 ring-inset ring-purple-500/20">
                    Target: Route &amp; Layout
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Asynchronously invalidates and regenerates the targeted page **and its segment layout** (<code>layout.rsc</code>). When invoked with <code>&#123; cascade: true &#125;</code>, it recursively invalidates all child subroutes beneath that route segment.
                </p>

                {/* Sub-section 1: Options & Cascade Behavior */}
                <div id="revalidatepath-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Sliders className="h-4 w-4 text-purple-500" />
                      <span>Parameters &amp; Cascade Hierarchy</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Options accepted by <code>revalidatePath(path, options?)</code>.
                  </p>

                  <div className="not-prose overflow-x-auto rounded-lg border border-border mt-4">
                    <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Parameter</th>
                          <th className="p-3">Type</th>
                          <th className="p-3">Default</th>
                          <th className="p-3">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-muted-foreground">
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">path</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">string</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">Required</td>
                          <td className="p-3 align-top leading-relaxed">
                            The target route path to revalidate (e.g. <code>&quot;/docs&quot;</code> or <code>&quot;/products&quot;</code>).
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">options.cascade</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean</td>
                          <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">false</td>
                          <td className="p-3 align-top leading-relaxed">
                            When <code>true</code>, automatically invalidates all nested subroutes inheriting this segment&apos;s layout (e.g. revalidating <code>/docs</code> with cascade also purges <code>/docs/routing</code>, <code>/docs/rendering</code>, etc.).
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="not-prose my-4">
                    <TabbedCodeBlock
                      defaultTab="single-route"
                      tabs={[
                        {
                          id: "single-route",
                          label: "segment.ts (Standard Revalidation)",
                          language: "typescript",
                          code: `import { revalidatePath } from "dinou/server";

// Revalidates both the /store page and the /store layout
await revalidatePath("/store");`,
                        },
                        {
                          id: "cascade-route",
                          label: "cascade.ts (Cascade Invalidation)",
                          language: "typescript",
                          code: `import { revalidatePath } from "dinou/server";

// Updating global docs sidebar:
// Invalidates /docs layout and cascades to all nested child pages (/docs/*)
await revalidatePath("/docs", { cascade: true });`,
                        },
                      ]}
                    />
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------------- */}
              {/* REVALIDATETAG() */}
              {/* ------------------------------------------------------------- */}
              <section id="revalidatetag" className="scroll-mt-20 mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>revalidateTag()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Server Function
                  </span>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Multi-Target Global Revalidation
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Purges and marks for background regeneration all route pages, layouts, and independent <code>&lt;DinouCacheSlot&gt;</code> instances that match the specified cache tag.
                </p>

                {/* Sub-section 1: Scope & Multi-Tenant Invalidation */}
                <div id="revalidatetag-behavior" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Flame className="h-4 w-4 text-emerald-500" />
                      <span>Multi-Target &amp; Tagged Invalidation</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    How tag-based invalidation synchronizes diverse route segments and micro-ISR cache slots simultaneously.
                  </p>

                  <div className="not-prose my-4">
                    <CodeBlock language="typescript" containerClassName="rounded-lg">
                      {`// src/actions/product-actions.ts
"use server";

import { revalidateTag } from "dinou/server";
import db from "@/lib/db";

export async function updateProduct(productId: string, data: any) {
  await db.products.update(productId, data);

  // 1. Purge all views displaying this specific product
  await revalidateTag(\`product-\${productId}\`);

  // 2. Purge global product collection pages and catalog slots
  await revalidateTag("products");

  return { success: true };
}`}
                    </CodeBlock>
                  </div>
                </div>

                {/* Revalidation Matrix Table */}
                <div className="not-prose my-6 space-y-2">
                  <div className="font-semibold text-sm text-foreground">
                    Server Revalidation Comparison Matrix
                  </div>
                  <div className="overflow-x-auto rounded-lg border border-border bg-card">
                    <table className="w-full text-xs text-left border-collapse min-w-[700px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Function</th>
                          <th className="p-3">Target Scope</th>
                          <th className="p-3">Layout Affected?</th>
                          <th className="p-3">Cascade to Children?</th>
                          <th className="p-3">Best Used For</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border text-muted-foreground">
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">
                            revalidatePage(path)
                          </td>
                          <td className="p-3 align-top">
                            Single route page artifact (<code>index.html</code>, <code>page.rsc</code>)
                          </td>
                          <td className="p-3 align-top font-semibold text-muted-foreground">
                            No
                          </td>
                          <td className="p-3 align-top font-semibold text-muted-foreground">
                            No
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Individual article updates, price adjustments, single-record mutations.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">
                            revalidatePath(path)
                          </td>
                          <td className="p-3 align-top">
                            Page component and route segment layout (<code>layout.rsc</code>)
                          </td>
                          <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">
                            Yes
                          </td>
                          <td className="p-3 align-top">
                            Optional (<code>&#123; cascade: true &#125;</code>)
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Sidebar updates, section navigation changes, category-wide layout updates.
                          </td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">
                            revalidateTag(tag)
                          </td>
                          <td className="p-3 align-top">
                            All pages, layouts, and <code>&lt;DinouCacheSlot&gt;</code> elements with matching tag
                          </td>
                          <td className="p-3 align-top font-semibold text-emerald-600 dark:text-emerald-400">
                            If tagged
                          </td>
                          <td className="p-3 align-top">
                            Optional (<code>&#123; cascade: true &#125;</code>)
                          </td>
                          <td className="p-3 align-top leading-relaxed">
                            Global entity mutations (e.g. updating product affects shop, carts, and sidebars).
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>

              {/* ------------------------------------------------------------- */}
              {/* STORAGE ADAPTERS */}
              {/* ------------------------------------------------------------- */}
              <section id="storage-adapters" className="scroll-mt-20 mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>Storage Adapters</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                    Storage Abstraction
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    dinou/server
                  </span>
                </div>

                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Dinou completely decouples ISR and Micro-ISR caching logic from physical storage media. All static pre-rendered pages, ISR payloads, and slot fragments are read and written through a unified <code>StorageAdapter</code> interface.
                </p>

                {/* Sub-section 1: Built-in Adapters */}
                <div id="storage-adapters-list" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Database className="h-4 w-4 text-amber-500" />
                      <span>Built-In Adapters Reference</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Production storage engines available out of the box.
                  </p>

                  <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                    <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                      <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                        <tr>
                          <th className="p-3">Adapter Class</th>
                          <th className="p-3">Constructor Signature</th>
                          <th className="p-3">Target Environment</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card text-muted-foreground">
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">FileSystemStorage</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">new FileSystemStorage(baseDir?: string)</td>
                          <td className="p-3 align-top leading-relaxed">Local development, single-node Docker, VPS servers (default).</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">RedisStorage</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">new RedisStorage(redisClient: any, prefix?: string)</td>
                          <td className="p-3 align-top leading-relaxed">Multi-container Kubernetes clusters, AWS ECS, Google Cloud Run.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">CloudflareKVStorage</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">new CloudflareKVStorage(kvNamespace: any)</td>
                          <td className="p-3 align-top leading-relaxed">Cloudflare Workers &amp; Pages at edge scale.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">DenoKVStorage</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">new DenoKVStorage(kvInstance?: any)</td>
                          <td className="p-3 align-top leading-relaxed">Deno Deploy &amp; distributed edge runtimes.</td>
                        </tr>
                        <tr>
                          <td className="p-3 font-mono font-semibold text-primary align-top">MemoryStorage</td>
                          <td className="p-3 font-mono text-[11px] text-foreground align-top">new MemoryStorage()</td>
                          <td className="p-3 align-top leading-relaxed">Unit testing, ephemeral CI/CD environments.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Sub-section 2: Custom StorageAdapter Implementation */}
                <div id="storage-adapters-custom" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
                      <Code2 className="h-4 w-4 text-amber-500" />
                      <span>Custom StorageAdapter Implementation</span>
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
                    Implement your own storage backend (e.g. AWS S3, Google Cloud Storage, or SQLite) by extending <code>StorageAdapter</code>.
                  </p>

                  <div className="not-prose my-4">
                    <CodeBlock language="typescript" containerClassName="rounded-lg">
                      {`import { StorageAdapter, setStorageAdapter } from "dinou/server";

export class CustomS3Storage extends StorageAdapter {
  constructor(private s3Client: any, private bucket: string) {
    super();
  }

  async get(key: string) {
    // Return { content: string, metadata?: any } or null
    return this.s3Client.getObject(this.bucket, key);
  }

  async set(key: string, content: string, metadata: any = null) {
    // Persist content and metadata
    await this.s3Client.putObject(this.bucket, key, content, metadata);
  }

  async has(key: string): Promise<boolean> {
    return this.s3Client.headObject(this.bucket, key);
  }

  async delete(key: string): Promise<void> {
    await this.s3Client.deleteObject(this.bucket, key);
  }
}

// Register the custom adapter globally
setStorageAdapter(new CustomS3Storage(myS3Client, "my-app-cache"));`}
                    </CodeBlock>
                  </div>
                </div>
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>getProps()</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                    Route Lifecycle Hook
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Server Data Loader
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The server-side data loader. Returns an object of props passed directly to the corresponding <code>Page</code> or <code>Layout</code> component.
                </p>
                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>revalidate</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                    Rendering Strategy
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    number | false | Function
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  The single source of truth for page rendering and caching modes in seconds.
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                    <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Value</th>
                        <th className="p-3">Rendering Strategy</th>
                        <th className="p-3">Behavior</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top"><code>0</code> (or &lt; 1)</td>
                        <td className="p-3 font-semibold text-xs text-blue-600 dark:text-blue-400 align-top">Dynamic SSR</td>
                        <td className="p-3 align-top leading-relaxed">
                          Renders on every single request. Completely bypasses the static cache.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top"><code>&gt;= 1</code> (e.g. <code>60</code>)</td>
                        <td className="p-3 font-semibold text-xs text-green-600 dark:text-green-400 align-top">ISR (Incremental Static Regeneration)</td>
                        <td className="p-3 align-top leading-relaxed">
                          Cached for the specified duration in seconds. The next request after expiration triggers a background revalidation.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top"><code>false</code> (or omitted)</td>
                        <td className="p-3 font-semibold text-xs text-purple-600 dark:text-purple-400 align-top">Static (SSG)</td>
                        <td className="p-3 align-top leading-relaxed">
                          Pre-rendered and cached indefinitely until manually purged using <code>revalidatePath</code>, <code>revalidatePage</code>, or <code>revalidateTag</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section id="ppr-config" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>ppr</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    Partial Prerendering
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    boolean | Function
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Enables <strong>Partial Prerendering (PPR)</strong> for the route segment or layout. When enabled, Dinou generates an instant static HTML shell and streams dynamic Suspense holes concurrently.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`// src/app/dashboard/layout_functions.ts
export const ppr = true; // Enables PPR for /dashboard and all child routes`}
                </CodeBlock>
              </section>

              <section id="getstaticpaths" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>getStaticPaths</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Static Generation (SSG)
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    StaticPathItem[] | Function
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Defines the parameter list for dynamic routes (e.g. <code>[slug]</code>, <code>[id]</code>, or <code>[...catchall]</code>) to be pre-rendered during build time (SSG). Supports strings, numbers, arrays, or parameter objects.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>getCacheTags</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    On-Demand Invalidation
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    string[] | Function
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Assigns cache tags to the route for invalidation via <code>revalidateTag(tag)</code>.
                </p>
                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`export function getCacheTags(params) {
  return ["articles", \`article-\${params.slug}\`];
}`}
                </CodeBlock>
              </section>

              <section id="validateparams-isg" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>validateParams</code> &amp; <code>allowISG</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400 ring-1 ring-inset ring-rose-500/20">
                    Perimeter Guard
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    ISG &amp; Parameter Validation
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Fine-grained route perimeter guards and static generation controls.
                </p>
                <div className="not-prose overflow-x-auto rounded-lg border border-border my-4">
                  <table className="w-full text-xs text-left border-collapse min-w-[650px]">
                    <thead className="bg-muted/50 border-b border-border text-muted-foreground font-semibold">
                      <tr>
                        <th className="p-3">Export Hook</th>
                        <th className="p-3">Signature</th>
                        <th className="p-3">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card text-muted-foreground">
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">validateParams</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">(params?: TParams) =&gt; boolean | Promise&lt;boolean&gt;</td>
                        <td className="p-3 align-top leading-relaxed">
                          Validates dynamic route parameters before execution. Returning <code>false</code> immediately terminates the request with a clean 404 Not Found without invoking <code>getProps</code>.
                        </td>
                      </tr>
                      <tr>
                        <td className="p-3 font-mono font-semibold text-primary align-top">allowISG</td>
                        <td className="p-3 font-mono text-[11px] text-foreground align-top">boolean | (() =&gt; boolean | Promise&lt;boolean&gt;)</td>
                        <td className="p-3 align-top leading-relaxed">
                          Controls whether dynamic routes not pre-rendered during build time by <code>getStaticPaths</code> can be generated on-demand (ISG) on the first visitor request. Default: <code>true</code>.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>PageProps&lt;T&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    TypeScript Generic
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    page.tsx
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Official TypeScript interface for typing React Page components (<code>page.tsx</code>). Takes the route pattern string as a generic parameter and automatically infers the strongly typed <code>params</code> object.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>LayoutProps&lt;T&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    TypeScript Generic
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    layout.tsx
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Official TypeScript interface for typing React Layout components (<code>layout.tsx</code>). In addition to inferred <code>params</code>, it strictly types <code>children: React.ReactNode</code>.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>RouteParams&lt;T&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    TypeScript Utility
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Params Inference
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A standalone utility type representing the inferred parameters dictionary of a given route pattern. Ideal for server functions, services, and error boundary components that do not receive standard React page props.
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
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
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>DinouRoute</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
                    Union Type
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Zero-Runtime
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  A union type representing all valid destinations in the application. Powers <code>&lt;Link href&gt;</code> and <code>router.push(href)</code>, and can be imported to type custom navigation components.
                </p>

                <CodeBlock
                  language="tsx"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
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
