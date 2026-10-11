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
import {
  RedirectSection,
  UseSearchParamsSection,
  UsePathnameSection,
  UseRouterSection,
  RefreshSlotSection,
  UseNavigationLoadingSection,
} from "./hooks-navigation";
import {
  GetContextSection,
  DefineConfigSection,
  DinouPluginSection,
} from "./server-context-config";
import {
  DinouCacheSlotSection,
  RevalidatePageSection,
  RevalidatePathSection,
  RevalidateTagSection,
  StorageAdaptersSection,
} from "./server-storage";
import {
  GetPropsContract,
  RevalidateContract,
  PprContract,
  GetCacheTagsContract,
  GetStaticPathsContract,
  AllowIsgContract,
  ValidateParamsContract,
} from "./contracts";

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
  { id: "revalidatepage", title: "revalidatePage()", level: 3 },
  { id: "revalidatepath", title: "revalidatePath()", level: 3 },
  { id: "revalidatetag", title: "revalidateTag()", level: 3 },
  { id: "dinoucacheslot", title: "<DinouCacheSlot>", level: 3 },
  { id: "dinoucacheslot-props", title: "Props & Micro-ISR", level: 4 },
  { id: "dinoucacheslot-examples", title: "Production Slot Patterns", level: 4 },
  { id: "storage-adapters", title: "Storage Adapters", level: 3 },
  { id: "storage-adapters-list", title: "Built-In Adapters", level: 4 },
  { id: "storage-adapters-interface", title: "StorageAdapter Interface", level: 4 },
  { id: "storage-adapters-custom", title: "Custom StorageAdapter", level: 4 },
  { id: "route-segment-contracts", title: "5. Route Segment Contracts", level: 2 },
  { id: "getprops", title: "getProps()", level: 3 },
  { id: "revalidate-config", title: "revalidate", level: 3 },
  { id: "ppr-config", title: "ppr", level: 3 },
  { id: "getcachetags", title: "getCacheTags", level: 3 },
  { id: "getstaticpaths", title: "getStaticPaths", level: 3 },
  { id: "allowisg", title: "allowISG", level: 3 },
  { id: "validateparams", title: "validateParams()", level: 3 },
  { id: "type-safe-routing", title: "6. Type-Safe Routing (dinou)", level: 2 },
  { id: "pageprops", title: "PageProps<T>", level: 3 },
  { id: "layoutprops", title: "LayoutProps<T>", level: 3 },
  { id: "pagefunctions", title: "PageFunctions & LayoutFunctions", level: 3 },
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

              <RedirectSection />
              <UseSearchParamsSection />
              <UsePathnameSection />
              <UseRouterSection />
              <RefreshSlotSection />
              <UseNavigationLoadingSection />
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

              <GetContextSection />
              <DefineConfigSection />
              <DinouPluginSection />
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

              <RevalidatePageSection />
              <RevalidatePathSection />
              <RevalidateTagSection />
              <DinouCacheSlotSection />
              <StorageAdaptersSection />
            </section>

            {/* ================================================================= */}
            {/* SECTION 5: ROUTE SEGMENT CONTRACTS */}
            {/* ================================================================= */}
            <section id="route-segment-contracts" className="scroll-mt-20 mt-12 pt-8 border-t">
              <h2 className="flex items-center gap-3">
                5. Route Segment Contracts
                <span className="inline-flex items-center rounded-md bg-amber-500/10 px-2 py-0.5 text-xs font-medium text-amber-600 dark:text-amber-400 ring-1 ring-inset ring-amber-500/20">
                  page_functions.ts &amp; layout_functions.ts
                </span>
              </h2>
              <p>
                Dinou strictly decouples UI components from server-side lifecycle contracts. Route lifecycles are declared in parallel <code>page_functions.ts</code> (or <code>layout_functions.ts</code>) files.
              </p>

              <GetPropsContract />
              <RevalidateContract />
              <PprContract />
              <GetCacheTagsContract />
              <GetStaticPathsContract />
              <AllowIsgContract />
              <ValidateParamsContract />

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

              {/* PageFunctions & LayoutFunctions */}
              <section id="pagefunctions" className="scroll-mt-20 mt-8">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="m-0">
                    <code>PageFunctions&lt;TParams, TProps&gt;</code> &amp; <code>LayoutFunctions&lt;TParams, TProps&gt;</code>
                  </h3>
                  <span className="inline-flex items-center rounded-md bg-blue-500/10 px-2 py-0.5 text-xs font-medium text-blue-600 dark:text-blue-400 ring-1 ring-inset ring-blue-500/20">
                    TypeScript Generics
                  </span>
                  <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
                    Server Lifecycle Contracts
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  Canonical TypeScript interfaces for typing server lifecycle files (<code>page_functions.ts</code> and <code>layout_functions.ts</code>). Both interfaces accept either a route pattern string directly (e.g. <code>&quot;/blog/[slug]&quot;</code>) or a direct parameters dictionary, providing complete compile-time type safety, IDE autocompletion, and index-access typing (e.g. <code>PageFunctions[&quot;revalidate&quot;]</code>) without boilerplate.
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`import type { PageFunctions, LayoutFunctions } from "dinou";

// 1. Direct route string pattern (automatically infers route parameters)
export const getProps: PageFunctions<
  "/blog/[slug]",
  { postTitle: string }
>["getProps"] = async (params) => {
  return { postTitle: \`Article: \${params.slug}\` };
};

// 2. Strict index-access typing for layout_functions.ts
export const ppr: LayoutFunctions["ppr"] = true;
export const revalidate: LayoutFunctions["revalidate"] = 3600;`}
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
                  A standalone utility type representing the inferred parameters dictionary of a given route pattern. While <code>PageProps</code> and <code>PageFunctions</code> resolve route strings directly, <code>RouteParams</code> is ideal for typing Server Actions, services, or error boundary components that do not inherit framework props automatically.
                </p>

                <CodeBlock
                  language="typescript"
                  containerClassName="w-full overflow-hidden rounded-lg my-3"
                >
                  {`import type { RouteParams } from "dinou";

// 1. In Server Actions or external services
export async function getAuthorBio(params: RouteParams<"/blog/[slug]">) {
  return fetchBioBySlug(params.slug);
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
