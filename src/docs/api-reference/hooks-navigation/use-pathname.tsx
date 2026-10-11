"use client";

import { Server, CheckCircle2, Sliders } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

export function UsePathnameSection() {
  return (
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
  );
}
