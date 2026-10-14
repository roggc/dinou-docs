"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/docs/components/ui/card";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Shield, CheckCircle2, Layers, ShieldCheck, Code2 } from "lucide-react";

export function ValidateParamsContract() {
  return (
    <section id="validateparams" className="scroll-mt-20 mt-8">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="m-0">
          <code>validateParams()</code>
        </h3>
        <span className="inline-flex items-center rounded-md bg-rose-500/10 px-2 py-0.5 text-xs font-medium text-rose-600 dark:text-rose-400 ring-1 ring-inset ring-rose-500/20">
          Perimeter Guard
        </span>
        <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-mono font-medium text-primary ring-1 ring-inset ring-primary/20">
          (params?: TParams) =&gt; boolean | Promise&lt;boolean&gt;
        </span>
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-xs font-mono font-medium text-muted-foreground ring-1 ring-inset ring-border">
          layout_functions.ts &amp; page_functions.ts
        </span>
      </div>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        Route perimeter guard that evaluates incoming dynamic route parameters before pipeline execution. Returning <code>false</code> immediately terminates the request with a clean 404 Not Found HTTP response without invoking <code>getProps</code> or evaluating downstream components.
      </p>

      <div className="not-prose grid gap-4 md:grid-cols-3 my-6">
        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-rose-500" />
              <CardTitle className="text-sm font-semibold">1. Pre-Execution Perimeter Veto</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Evaluates dynamic parameters directly at the server route boundary before <code>getProps</code> executes. Prevents expensive database queries, external API calls, or server load when incoming requests contain malformed, illegal, or malicious parameter inputs.
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              <CardTitle className="text-sm font-semibold">2. Sync and Async Evaluation</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Supports both synchronous format assertions (regex pattern checks, numeric boundaries, UUID formats) and asynchronous validations (database lookups, tenant membership verification, or external cache checks) returning a Promise resolving to a boolean.
          </CardContent>
        </Card>

        <Card className="border border-border/70 shadow-xs">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-semibold">3. Layout Subtree Protection</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground leading-relaxed">
            Exporting <code>validateParams</code> in <code>layout_functions.ts</code> validates segment parameters (such as organization slugs or project identifiers) and guards the entire subtree, halting requests before any child layout or nested page executes.
          </CardContent>
        </Card>
      </div>

      <Alert className="not-prose my-4">
        <ShieldCheck className="h-4 w-4 text-rose-500" />
        <AlertTitle>Authoritative 404 Response and Delivery Veto</AlertTitle>
        <AlertDescription className="space-y-1.5 text-xs">
          <div>
            <strong>Immediate Request Termination.</strong> When <code>validateParams</code> returns <code>false</code> or resolves to <code>false</code>, Dinou halts route resolution immediately and responds with a clean 404 Not Found HTTP response.
          </div>
          <div>
            <strong>Perimeter Gatekeeper.</strong> Even if a pre-rendered HTML artifact or static cache entry already exists in the storage adapter, returning <code>false</code> acts as an authoritative veto that blocks delivery and returns a 404 response.
          </div>
        </AlertDescription>
      </Alert>

      <Alert className="not-prose my-4">
        <Layers className="h-4 w-4 text-rose-500" />
        <AlertTitle>Subtree Perimeter Guard in layout_functions.ts</AlertTitle>
        <AlertDescription className="space-y-1.5 text-xs">
          <div>
            <strong>Isolated Layout Parameter Scope.</strong> In <code>layout_functions.ts</code>, <code>validateParams</code> receives exclusively the dynamic parameters of that specific layout segment (for example, <code>params.organization</code> in <code>/[organization]/layout.tsx</code>) rather than downstream child page parameters.
          </div>
          <div>
            <strong>Ancestral Short-Circuit Execution.</strong> Dinou evaluates layouts hierarchically from root to child before resolving any page segment. If a parent layout returns <code>false</code> or resolves to <code>false</code>, Dinou halts execution immediately with a 404 response, preventing child layouts, child parameter validations, <code>getProps</code> loaders, and page renderers from running.
          </div>
          <div>
            <strong>Centralized Subtree Protection.</strong> Protects dozens of nested subpages (such as <code>/dashboard</code>, <code>/billing</code>, <code>/settings</code>, and <code>/members</code>) with a single validation hook at the branch root, eliminating redundant validation logic across individual <code>page_functions.ts</code> files.
          </div>
        </AlertDescription>
      </Alert>

      <div className="not-prose my-6 space-y-2">
        <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
          <Code2 className="h-4 w-4 text-rose-500" />
          <span>Parameter Validation Patterns</span>
        </div>
        <TabbedCodeBlock
          defaultTab="numeric-id"
          tabs={[
            {
              id: "numeric-id",
              label: "users/[id]/page_functions.ts",
              language: "typescript",
              code: `// src/app/users/[id]/page_functions.ts
import type { PageFunctions } from "dinou";

// Synchronous perimeter guard rejecting non-numeric parameters
export const validateParams: PageFunctions<"/users/[id]">["validateParams"] = (params) => {
  return /^[0-9]+$/.test(params.id);
};

export const getProps: PageFunctions<"/users/[id]">["getProps"] = async (params) => {
  // params.id is guaranteed to be a valid numeric string here
  return { userId: Number(params.id) };
};`,
            },
            {
              id: "uuid-check",
              label: "documents/[uuid]/page_functions.ts",
              language: "typescript",
              code: `// src/app/documents/[uuid]/page_functions.ts
import type { PageFunctions } from "dinou";

const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

// Rejects malformed UUID tokens before invoking backend loaders
export const validateParams: PageFunctions<"/documents/[uuid]">["validateParams"] = (params) => {
  return UUID_V4_REGEX.test(params.uuid);
};`,
            },
            {
              id: "async-tenant",
              label: "[organization]/layout_functions.ts",
              language: "typescript",
              code: `// src/app/[organization]/layout_functions.ts
import type { LayoutFunctions } from "dinou";
import { db } from "@/lib/database";

// Asynchronous perimeter guard protecting an entire organization branch
export const validateParams: LayoutFunctions<"/[organization]">["validateParams"] = async (params) => {
  const tenant = await db.organizations.findUnique({
    where: { slug: params.organization },
    select: { active: true },
  });

  return Boolean(tenant?.active);
};`,
            },
            {
              id: "multi-param",
              label: "shop/[category]/[slug]/page_functions.ts",
              language: "typescript",
              code: `// src/app/shop/[category]/[slug]/page_functions.ts
import type { PageFunctions } from "dinou";

const ALLOWED_CATEGORIES = new Set(["electronics", "clothing", "books", "home"]);

// Multi-segment parameter validation ensuring valid taxonomy paths
export const validateParams: PageFunctions<"/shop/[category]/[slug]">["validateParams"] = (params) => {
  if (!ALLOWED_CATEGORIES.has(params.category)) {
    return false;
  }

  return /^[a-z0-9-]+$/.test(params.slug);
};`,
            },
          ]}
        />
      </div>
    </section>
  );
}
