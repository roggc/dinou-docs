"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Database,
  ShieldCheck,
  AlertTriangle,
  Layers,
  CheckCircle2,
  Boxes,
  Code2,
} from "lucide-react";

export function GetStaticPathsContract() {
  return (
    <section id="getstaticpaths" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>getStaticPaths</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Static Generation (SSG)
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          StaticPathsResult
        </span>
        <span className="inline-flex items-center rounded-md bg-slate-500/10 px-2 py-0.5 text-xs font-medium text-slate-600 dark:text-slate-400 ring-1 ring-inset ring-slate-500/20">
          page_functions.ts &amp; layout_functions.ts
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Defines the parameter list for dynamic routes (e.g. <code>[slug]</code>, <code>[[category]]</code>, <code>[category]/[id]</code>, or <code>[...catchall]</code>) to be pre-rendered during build time (SSG). Dinou iterates over the returned paths, executes the component rendering pipeline, and saves the generated HTML and RSC payloads into storage for instant edge delivery.
      </p>

      {/* Supported Data Shapes Table */}
      <div className="not-prose my-4 border rounded-lg overflow-hidden bg-card">
        <div className="px-4 py-2.5 bg-muted/50 border-b flex items-center gap-2 font-semibold text-xs text-foreground">
          <Database className="h-4 w-4 text-emerald-500" />
          <span>Supported Path Item Shapes</span>
        </div>
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b bg-muted/20 text-muted-foreground">
              <th className="p-3 font-medium">Route Segment Type</th>
              <th className="p-3 font-medium">Valid Return Formats</th>
              <th className="p-3 font-medium">Example Value</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/60">
            <tr>
              <td className="p-3 font-semibold text-foreground align-top">
                Single Dynamic Segment (<code>[slug]</code> or <code>[id]</code>)
              </td>
              <td className="p-3 font-mono text-primary align-top">
                <code>string[]</code>, <code>number[]</code>, or <code>Record&lt;string, string&gt;[]</code>
              </td>
              <td className="p-3 font-mono text-muted-foreground align-top">
                <code>[&quot;v7-release&quot;, &quot;migration&quot;]</code> or <code>[&#123; slug: &quot;v7-release&quot; &#125;]</code>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-foreground align-top">
                Optional Single Segment (<code>[[category]]</code>)
              </td>
              <td className="p-3 font-mono text-primary align-top">
                <code>(string | number | undefined)[]</code> or <code>Record&lt;string, string | number | undefined&gt;[]</code>
              </td>
              <td className="p-3 font-mono text-muted-foreground align-top">
                <code>[undefined, &quot;electronics&quot;]</code> (undefined pre-renders the root path)
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-foreground align-top">
                Multi-Segment Hierarchy (<code>[category]/[id]</code>)
              </td>
              <td className="p-3 font-mono text-primary align-top">
                <code>Record&lt;string, string | number&gt;[]</code>
              </td>
              <td className="p-3 font-mono text-muted-foreground align-top">
                <code>[&#123; category: &quot;tech&quot;, id: &quot;42&quot; &#125;]</code>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-foreground align-top">
                Catch-all Dynamic Route (<code>[...slug]</code>)
              </td>
              <td className="p-3 font-mono text-primary align-top">
                <code>string[][]</code> or <code>&#123; slug: string[] &#125;[]</code>
              </td>
              <td className="p-3 font-mono text-muted-foreground align-top">
                <code>[[&quot;docs&quot;, &quot;getting-started&quot;]]</code>
              </td>
            </tr>
            <tr>
              <td className="p-3 font-semibold text-foreground align-top">
                Optional Catch-all (<code>[[...slug]]</code>)
              </td>
              <td className="p-3 font-mono text-primary align-top">
                <code>(string[] | undefined)[]</code> or <code>&#123; slug: string[] &#125;[]</code>
              </td>
              <td className="p-3 font-mono text-muted-foreground align-top">
                <code>[[], [&quot;features&quot;]]</code> (empty array represents root index)
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Integration with allowISG Alert */}
      <Alert className="not-prose my-4">
        <ShieldCheck className="h-4 w-4 text-emerald-500" />
        <AlertTitle>Perimeter Coordination with allowISG</AlertTitle>
        <AlertDescription>
          <code>getStaticPaths</code> works in direct coordination with <code>allowISG</code>. When <code>allowISG: true</code> (the default), paths defined in <code>getStaticPaths</code> are pre-generated during build time, while unlisted dynamic paths requested by visitors are generated on-demand via Incremental Static Generation (ISG). When <code>allowISG: false</code>, any request for a path not pre-rendered by <code>getStaticPaths</code> immediately triggers a 404 response without executing server rendering.
        </AlertDescription>
      </Alert>

      {/* No-Gap Rule & Runtime Guarantees Alert */}
      <Alert className="not-prose my-4">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertTitle>No-Gap Rule and Runtime Parameter Guarantees</AlertTitle>
        <AlertDescription className="space-y-1.5 text-xs">
          <div>
            <strong>The No-Gap Rule.</strong> An optional dynamic segment (<code>[[format]]</code> or <code>[[...tags]]</code>) can be set to <code>undefined</code> only if all subsequent segments along the URL path are also <code>undefined</code>. Specifying an undefined segment followed by a defined segment (e.g. <code>[undefined, &quot;something&quot;]</code>) creates an illegal URL gap and causes Dinou to skip the invalid route during build generation.
          </div>
          <div>
            <strong>Optional Single Segments (<code>[[category]]</code>).</strong> When visiting the root path, <code>params.category</code> is strictly <code>undefined</code> rather than an empty string or <code>null</code>. This allows JavaScript ES6 default destructuring to apply cleanly in <code>page.tsx</code>.
          </div>
          <div>
            <strong>Optional Catch-all Routes (<code>[[...slug]]</code>).</strong> <code>params.slug</code> is guaranteed to always be an array (<code>string[]</code>). For the root path, Dinou supplies an empty array <code>[]</code> instead of <code>undefined</code>, allowing safe execution of array operations such as <code>params.slug.join(&quot;/&quot;)</code> without defensive guards. In <code>getStaticPaths</code>, pre-render the root route by passing <code>[]</code>, never <code>[undefined]</code>.
          </div>
        </AlertDescription>
      </Alert>

      {/* Nested Routes & Propagation Grid */}
      <div className="not-prose my-4 grid gap-3 sm:grid-cols-2">
        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-emerald-500" />
              <CardTitle className="text-sm font-semibold">Pass-Through vs Chain of Responsibility</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
            <p>
              <strong>Pass-Through Segments.</strong> When intermediate dynamic folders lack their own <code>page.tsx</code>, the terminal leaf <code>page_functions.ts</code> supplies parameter objects mapping all dynamic keys at once.
            </p>
            <p>
              <strong>Chain of Responsibility.</strong> When both parent and child folders contain a <code>page.tsx</code>, the parent acts as a gatekeeper. If the parent returns an empty array <code>[]</code>, traversal stops and child pages are not built. When both return paths, Dinou automatically pre-renders their Cartesian product.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm font-semibold">Downward Propagation and Terminal Constraints</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed space-y-1.5">
            <p>
              <strong>Downward Route Propagation.</strong> Parameter combinations generated by <code>getStaticPaths</code> automatically cascade to nested static subpages (such as <code>/blog/[slug]/details</code>) without requiring duplicated exports.
            </p>
            <p>
              <strong>Terminal Catch-all Constraint.</strong> Because catch-all segments (<code>[...slug]</code> and <code>[[...slug]]</code>) greedily consume all remaining URL path tokens, they must always be declared as the final terminal segment of a directory path.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Architectural Roles of getStaticPaths in layout_functions.ts */}
      <Alert className="not-prose my-4">
        <Layers className="h-4 w-4 text-emerald-500" />
        <AlertTitle>Architectural Roles of getStaticPaths in layout_functions.ts</AlertTitle>
        <AlertDescription className="space-y-1.5 text-xs">
          <div>
            In Dinou, defining <code>getStaticPaths</code> in <code>layout_functions.ts</code> is essential whenever a layout resides in a dynamic directory segment (such as <code>/[lang]/layout.tsx</code>, <code>/docs/[version]/layout.tsx</code>, or <code>/[category]/layout.tsx</code>). It fulfills three critical engine functions.
          </div>
          <div>
            <strong>1. Hierarchical Propagation to Child Pages.</strong> During build-time static discovery, Dinou traverses the route tree. When a layout exports <code>getStaticPaths</code>, Dinou automatically injects those parameter combinations into all nested child pages (such as <code>/[lang]/page.tsx</code>, <code>/[lang]/about/page.tsx</code>, and <code>/[lang]/contact/page.tsx</code>). Child pages do not need to duplicate <code>getStaticPaths</code> exports to inherit layout parameters.
          </div>
          <div>
            <strong>2. Standalone layout.rsc Segment Pre-Rendering.</strong> Dinou preserves layouts as independent server component artifacts in storage. Defining <code>getStaticPaths</code> in <code>layout_functions.ts</code> instructs the build pipeline to pre-render every variant (such as <code>es/layout.rsc</code>, <code>en/layout.rsc</code>, and <code>fr/layout.rsc</code>) into the storage adapter. During client-side navigation, the browser fetches the pre-rendered layout stream instantly without invoking server execution.
          </div>
          <div>
            <strong>3. Source of Truth for Closed Enclaves (allowISG false).</strong> When <code>allowISG</code> is set to <code>false</code> in a layout, Dinou compiles the layout&apos;s <code>getStaticPaths</code> into a strict perimeter set. Incoming requests containing unknown layout parameter values (such as an uncompiled language <code>/de/pricing</code>) are blocked immediately with a 404 response at the layout perimeter before child pages or database operations are executed.
          </div>
        </AlertDescription>
      </Alert>

      {/* The Golden Rule: Where to Define getStaticPaths */}
      <Alert className="not-prose my-4">
        <Boxes className="h-4 w-4 text-primary" />
        <AlertTitle>The Golden Rule: Where to Define getStaticPaths</AlertTitle>
        <AlertDescription className="space-y-2 text-xs">
          <div>
            Define <code>getStaticPaths</code> at the exact directory level where the dynamic bracket segment (<code>[param]</code>) is introduced in the filesystem.
          </div>
          <div className="space-y-1.5">
            <div>
              <strong>Scenario 1: Page-Exclusive Parameter (page_functions.ts).</strong> When the dynamic parameter belongs solely to a leaf page (such as <code>/blog/[slug]/page.tsx</code> where <code>/blog/layout.tsx</code> is static), declare <code>getStaticPaths</code> in <code>page_functions.ts</code>. The layout remains shared across all articles, and the parameter maps directly to individual posts.
            </div>
            <div>
              <strong>Scenario 2: Section-Wide Branch Parameter (layout_functions.ts).</strong> When a dynamic bracket segment encloses an entire layout branch with multiple static child pages (such as <code>/[lang]/layout.tsx</code> with <code>/about</code> and <code>/contact</code>), declare <code>getStaticPaths</code> in <code>layout_functions.ts</code>. Dinou automatically cascades the defined languages to all nested routes without duplicating exports.
            </div>
            <div>
              <strong>Scenario 3: Nested Dynamic Segments (Both layout_functions.ts and page_functions.ts).</strong> When both the layout and child pages introduce dynamic brackets (such as <code>/[category]/layout.tsx</code> and <code>/[category]/[product]/page.tsx</code>), declare <code>getStaticPaths</code> in both locations. The layout declares valid categories and pre-renders their shells, while the page defines specific product items within those categories.
            </div>
          </div>
          <div className="overflow-x-auto rounded border border-border/60 my-2">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-muted/50 border-b border-border/60 text-muted-foreground">
                <tr>
                  <th className="p-2 font-medium">Route Structure</th>
                  <th className="p-2 font-medium">Declaration Location</th>
                  <th className="p-2 font-medium">Returned Parameter Scope</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40 text-muted-foreground">
                <tr>
                  <td className="p-2 font-mono text-foreground">/blog/[slug]</td>
                  <td className="p-2 font-mono text-primary">[slug]/page_functions.ts</td>
                  <td className="p-2 font-mono">&#123; slug: string &#125;</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono text-foreground">/[lang]/about</td>
                  <td className="p-2 font-mono text-primary">[lang]/layout_functions.ts</td>
                  <td className="p-2 font-mono">&#123; lang: string &#125; (cascades to /about)</td>
                </tr>
                <tr>
                  <td className="p-2 font-mono text-foreground">/[category]/[item]</td>
                  <td className="p-2 font-mono text-primary">Both layout_functions and page_functions</td>
                  <td className="p-2 font-mono">Layout &#123; category &#125; and Page &#123; category, item &#125;</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            TypeScript route generics (<code>PageFunctions&lt;Route&gt;</code> and <code>LayoutFunctions&lt;Route&gt;</code>) enforce parameter shapes automatically and raise compile-time type errors if an unexpected parameter is declared at the wrong hierarchy level.
          </div>
        </AlertDescription>
      </Alert>

      {/* Tabbed Code Block */}
      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Code2 className="h-4 w-4 text-emerald-500" />
          <span>Static Path Generation Patterns</span>
        </div>
        <TabbedCodeBlock
          defaultTab="single-segment"
          tabs={[
            {
              id: "single-segment",
              label: "blog/[slug]/page_functions.ts",
              language: "typescript",
              code: `// src/app/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";
import { cmsClient } from "@/lib/cms";

// Asynchronous loader fetching dynamic slugs from an external CMS
export const getStaticPaths: PageFunctions<"/blog/[slug]">["getStaticPaths"] = async () => {
  const articles = await cmsClient.getAllArticleSlugs();

  // Return an array of strings or parameter objects
  return articles.map((article) => ({
    slug: article.slug,
  }));
};`,
            },
            {
              id: "optional-single",
              label: "products/[[category]]/page_functions.ts",
              language: "typescript",
              code: `// src/app/products/[[category]]/page_functions.ts
import type { PageFunctions } from "dinou";

// Optional single segment: pre-renders root /products and category variations
export const getStaticPaths: PageFunctions<"/products/[[category]]">["getStaticPaths"] = [
  undefined, // Pre-renders /products (category is undefined)
  "electronics", // Pre-renders /products/electronics
  "fashion", // Pre-renders /products/fashion
];`,
            },
            {
              id: "multi-segment",
              label: "shop/[category]/[id]/page_functions.ts",
              language: "typescript",
              code: `// src/app/shop/[category]/[id]/page_functions.ts
import type { PageFunctions } from "dinou";

// Parameter objects mapping multiple dynamic segments
export const getStaticPaths: PageFunctions<"/shop/[category]/[id]">["getStaticPaths"] = [
  { category: "electronics", id: "pro-laptop" },
  { category: "electronics", id: "wireless-mouse" },
  { category: "apparel", id: "hoodie" },
];`,
            },
            {
              id: "catchall",
              label: "docs/[...slug]/page_functions.ts",
              language: "typescript",
              code: `// src/app/docs/[...slug]/page_functions.ts
import type { PageFunctions } from "dinou";
import { getAllDocPaths } from "@/lib/content";

// Catch-all segment returning nested string arrays
export const getStaticPaths: PageFunctions<"/docs/[...slug]">["getStaticPaths"] = async () => {
  const docRoutes = await getAllDocPaths();

  // Example: [["installation"], ["routing", "pages"], ["api", "reference"]]
  return docRoutes.map((route) => route.split("/"));
};`,
            },
            {
              id: "layout-paths",
              label: "org/[tenant]/layout_functions.ts",
              language: "typescript",
              code: `// src/app/org/[tenant]/layout_functions.ts
import type { LayoutFunctions } from "dinou";
import { db } from "@/lib/database";

// Pre-render static paths at the layout level for multi-tenant segments
export const getStaticPaths: LayoutFunctions<"/org/[tenant]">["getStaticPaths"] = async () => {
  const tenants = await db.tenants.findMany({ select: { slug: true } });
  return tenants.map((t) => ({ tenant: t.slug }));
};`,
            },
          ]}
        />
      </div>
    </section>
  );
}
