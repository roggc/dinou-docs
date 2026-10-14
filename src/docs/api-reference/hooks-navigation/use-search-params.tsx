"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import { Server, AlertTriangle, CheckCircle2, Sliders } from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

export function UseSearchParamsSection() {
  return (
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
  );
}
