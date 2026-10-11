"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Zap, Shield, Sliders, AlertTriangle, Layers, Code2 } from "lucide-react";

export function AllowIsgContract() {
  return (
    <section id="allowisg" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>allowISG</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-cyan-500/10 px-2 py-0.5 text-xs font-medium text-cyan-600 dark:text-cyan-400 ring-1 ring-inset ring-cyan-500/20">
          Static Generation Control
        </span>
        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-medium text-primary ring-1 ring-inset ring-primary/20">
          boolean | (() =&gt; boolean | Promise&lt;boolean&gt;)
        </span>
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Default: true
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          layout_functions.ts &amp; page_functions.ts
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Controls whether dynamic route segments not pre-rendered during build time by <code>getStaticPaths</code> can be generated on-demand at runtime via Incremental Static Generation (ISG).
      </p>

      <div className="not-prose grid gap-4 md:grid-cols-3 my-6">
        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-cyan-500" />
              <CardTitle className="text-sm font-semibold">1. Open Generation (Default)</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            When enabled or omitted, any dynamic path requested by visitors that was not pre-generated at build time is rendered on-demand during the initial HTTP request and written to the storage adapter for subsequent visitors.
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-rose-500" />
              <CardTitle className="text-sm font-semibold">2. Closed-World Enclave</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Setting <code>allowISG: false</code> restricts accessible dynamic URLs strictly to the finite collection declared in <code>getStaticPaths</code>. Any request for a path outside the pre-rendered set immediately returns 404 Not Found without invoking server renderers.
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Sliders className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">3. Programmatic Evaluation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Accepts a function returning a boolean or a Promise resolving to a boolean. Allows dynamic evaluation according to environment variables, deployment target stages, traffic quotas, or feature flag providers.
          </CardContent>
        </Card>
      </div>

      <Alert className="not-prose my-4">
        <AlertTriangle className="h-4 w-4 text-amber-500" />
        <AlertTitle>Perimeter Coordination with getStaticPaths</AlertTitle>
        <AlertDescription className="space-y-1.5 text-xs">
          <div>
            <strong>Closed Perimeter Requirement.</strong> When setting <code>allowISG: false</code>, ensure that <code>getStaticPaths</code> exports all valid paths. Incoming requests for dynamic paths absent from the static paths collection will immediately return 404 Not Found.
          </div>
          <div>
            <strong>Resource Protection.</strong> Setting <code>allowISG: false</code> protects server infrastructure against denial-of-service attempts that generate infinite random parameter paths to exhaust build CPU or storage capacity.
          </div>
        </AlertDescription>
      </Alert>

      <Alert className="not-prose my-4">
        <Layers className="h-4 w-4 text-cyan-500" />
        <AlertTitle>Branch Enclave and Denial-of-Service Protection in layout_functions.ts</AlertTitle>
        <AlertDescription className="space-y-1.5 text-xs">
          <div>
            <strong>Branch-Level Static Enclave.</strong> When exported in <code>layout_functions.ts</code>, <code>allowISG: false</code> confines accessible layout segments strictly to the collection declared in that layout&apos;s <code>getStaticPaths</code>. Requests containing unlisted layout parameters (such as an unknown version in <code>/docs/[version]/guide</code>) trigger an immediate 404 response before child pages are inspected.
          </div>
          <div>
            <strong>RSC Soft-Navigation Gatekeeper.</strong> During client-side navigation fetching layout payloads directly, Dinou enforces <code>allowISG: false</code> at the layout boundary, preventing ungenerated layout shells from compiling on demand.
          </div>
          <div>
            <strong>Denial-of-Service Prevention.</strong> Protects server build CPU and storage adapters against automated attacks that probe random layout parameter combinations, stopping requests at the layout root before dynamic page rendering can consume system resources.
          </div>
        </AlertDescription>
      </Alert>

      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Code2 className="h-4 w-4 text-cyan-500" />
          <span>Static Generation Control Patterns</span>
        </div>
        <TabbedCodeBlock
          defaultTab="strict-enclave"
          tabs={[
            {
              id: "strict-enclave",
              label: "blog/[slug]/page_functions.ts",
              language: "typescript",
              code: `// src/app/blog/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";
import { getPublishedSlugs } from "@/lib/content";

// 1. Pre-render all published articles during the build phase
export const getStaticPaths: PageFunctions<"/blog/[slug]">["getStaticPaths"] = async () => {
  const slugs = await getPublishedSlugs();
  return slugs.map((slug) => ({ slug }));
};

// 2. Strict static enclave: unlisted slugs return 404 immediately
export const allowISG: PageFunctions["allowISG"] = false;

export const getProps: PageFunctions<"/blog/[slug]">["getProps"] = async (params) => {
  return { slug: params.slug };
};`,
            },
            {
              id: "hybrid-on-demand",
              label: "products/[id]/page_functions.ts",
              language: "typescript",
              code: `// src/app/products/[id]/page_functions.ts
import type { PageFunctions } from "dinou";
import { getTopProductIds } from "@/lib/catalog";

// 1. Pre-render the top 100 most popular products at build time
export const getStaticPaths: PageFunctions<"/products/[id]">["getStaticPaths"] = async () => {
  const topIds = await getTopProductIds(100);
  return topIds.map((id) => ({ id }));
};

// 2. Allow on-demand generation for long-tail products on first visitor request
export const allowISG: PageFunctions["allowISG"] = true;

export const getProps: PageFunctions<"/products/[id]">["getProps"] = async (params) => {
  return { id: params.id };
};`,
            },
            {
              id: "programmatic-toggle",
              label: "catalog/[category]/page_functions.ts",
              language: "typescript",
              code: `// src/app/catalog/[category]/page_functions.ts
import type { PageFunctions } from "dinou";

// Programmatic ISG flag toggled via environment configuration
export const allowISG: PageFunctions["allowISG"] = () => {
  // Disable runtime generation in test or high-load maintenance windows
  return process.env.ENABLE_RUNTIME_ISG !== "false";
};

export const getStaticPaths: PageFunctions<"/catalog/[category]">["getStaticPaths"] = () => [
  { category: "electronics" },
  { category: "apparel" },
  { category: "books" },
];`,
            },
            {
              id: "layout-enclave",
              label: "docs/[version]/layout_functions.ts",
              language: "typescript",
              code: `// src/app/docs/[version]/layout_functions.ts
import type { LayoutFunctions } from "dinou";

// Define the exact supported documentation versions at build time
export const getStaticPaths: LayoutFunctions<"/docs/[version]">["getStaticPaths"] = () => [
  { version: "v1" },
  { version: "v2" },
  { version: "v3" },
];

// Enforce a closed enclave across all child documentation pages
export const allowISG: LayoutFunctions["allowISG"] = false;`,
            },
          ]}
        />
      </div>
    </section>
  );
}
