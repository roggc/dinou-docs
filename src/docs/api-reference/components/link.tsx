"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Link as LinkIcon, Zap, Flame, Code2 } from "lucide-react";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";

export function LinkSection() {
  return (
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
              <td className="p-3 font-mono text-[11px] text-foreground align-top">DinouLinkTarget</td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">—</td>
              <td className="p-3 align-top leading-relaxed">
                Primary destination URL. Strongly typed for compile-time route validation and <code>Ctrl + Space</code> IDE autocomplete across static routes (<code>/dashboard</code>), dynamic route patterns (<code>/blog/[slug]</code> with <code>params</code>), relative paths when paired with <code>from</code> (<code>security</code>, <code>./security</code>, <code>../billing</code>), query/hash suffixes, and external URLs.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">to</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">DinouLinkTarget</td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">—</td>
              <td className="p-3 align-top leading-relaxed">
                Alias for <code>href</code> with identical type safety and autocomplete (evaluated as <code>href || to</code>).
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">params</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">Record&lt;string, ...&gt;</td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">—</td>
              <td className="p-3 align-top leading-relaxed">
                Conditionally required parameter dictionary whenever <code>href</code> or <code>to</code> contains dynamic <code>[param]</code> or <code>[...param]</code> placeholders (optional when all placeholders are <code>[[optional]]</code>). Values are interpolated and URL-encoded via <code>encodeURIComponent</code>.
              </td>
            </tr>
            <tr>
              <td className="p-3 font-mono font-semibold text-primary align-top">from</td>
              <td className="p-3 font-mono text-[11px] text-foreground align-top">DinouFromRoute</td>
              <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">—</td>
              <td className="p-3 align-top leading-relaxed">
                Source route pattern (e.g. <code>&quot;/dashboard/settings&quot;</code>) anchoring relative navigation in <code>href</code> / <code>to</code>. Enables strict compile-time validation and autocomplete for bare (<code>&quot;security&quot;</code>), dot-slash (<code>&quot;./security&quot;</code>), and parent (<code>&quot;../billing&quot;</code>) paths, and safely slices deeper browser pathnames when rendered inside a parent layout or <code>@slot</code>. <em>Tip:</em> Importing <code>&#123; Link &#125;</code> from route-contextual <code>&quot;./dinou&quot;</code> inside a route folder pre-binds <code>from</code> automatically so you can omit it!
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
              <strong>Relative Child (<code>details</code> or <code>./details</code>):</strong> With <code>from=&quot;/products&quot;</code>, both <code>details</code> and <code>./details</code> autocomplete and resolve under that route directory to <code>/products/details</code>.
            </li>
            <li>
              <strong>Relative Sibling / Parent (<code>../</code>):</strong> With <code>from=&quot;/users/settings&quot;</code>, navigating to <code>../profile</code> resolves up one directory level to <code>/users/profile</code>.
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
      {/* Strict Relative Child navigation ("security" or "./security"): resolves to /dashboard/settings/security */}
      <Link
        from="/dashboard/settings"
        href="security"
        onClick={handleAuditClick}
        className="text-sm font-medium"
      >
        Security Settings
      </Link>

      {/* Strict Relative Sibling navigation: resolves to /dashboard/billing */}
      <Link
        from="/dashboard/settings"
        href="../billing"
        className="text-sm text-muted-foreground"
      >
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
  );
}
