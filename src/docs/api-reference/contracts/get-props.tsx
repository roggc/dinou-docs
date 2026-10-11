"use client";

import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { Sliders, Server, Code2 } from "lucide-react";

export function GetPropsContract() {
  return (
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
        <span className="inline-flex items-center rounded-md bg-emerald-500/10 px-2 py-0.5 text-xs font-mono font-medium text-emerald-600 dark:text-emerald-400 ring-1 ring-inset ring-emerald-500/20">
          Returns: Promise&lt;TProps&gt; | TProps
        </span>
      </div>

      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        The primary server-side data loading contract for routes and layouts. Executes exclusively on the server during SSG build, on-demand ISG generation, or runtime request handling. The object returned by <code>getProps</code> is automatically injected as props into the companion <code>Page</code> or <code>Layout</code> component.
      </p>

      {/* Sub-section 1: Parameters */}
      <div id="getprops-params" className="scroll-mt-20 mt-6 pt-4 border-t border-border/60">
        <div className="flex items-center gap-2">
          <h4 className="text-base font-semibold text-foreground m-0 flex items-center gap-2">
            <Sliders className="h-4 w-4 text-amber-500" />
            <span>Parameters</span>
          </h4>
        </div>
        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
          Arguments supplied to <code>getProps(params)</code>.
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
                <td className="p-3 font-mono font-semibold text-primary align-top">params</td>
                <td className="p-3 font-mono text-[11px] text-foreground align-top">
                  Record&lt;string, string | string[]&gt;
                </td>
                <td className="p-3 font-mono text-[11px] text-muted-foreground align-top">&#123;&#125;</td>
                <td className="p-3 align-top leading-relaxed">
                  Parsed dynamic URL parameters defined by route folder naming (e.g. <code>&#123; id: &quot;42&quot; &#125;</code> for <code>[id]</code> or <code>&#123; slug: [&quot;a&quot;, &quot;b&quot;] &#125;</code> for catch-all <code>[...slug]</code>). In layouts, receives all segment parameters up to that layout level. Empty on static routes.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Context Access Alert */}
        <Alert className="not-prose mt-4">
          <Server className="h-4 w-4 text-amber-500" />
          <AlertTitle>Accessing Request Headers, Cookies &amp; Query</AlertTitle>
          <AlertDescription>
            While <code>getProps</code> receives route parameters as its first argument, you can access incoming HTTP request headers, cookies, query parameters, or platform environment variables by calling <code>getContext()</code> directly inside the function.
          </AlertDescription>
        </Alert>

        {/* Companion Pattern Tabbed Code Block */}
        <div className="not-prose my-6 space-y-2">
          <div className="flex items-center gap-2 font-semibold text-sm text-foreground">
            <Code2 className="h-4 w-4 text-amber-500" />
            <span>Companion Contract Pattern</span>
          </div>
          <TabbedCodeBlock
            defaultTab="page-functions"
            tabs={[
              {
                id: "page-functions",
                label: "products/[id]/page_functions.ts",
                language: "typescript",
                code: `// src/app/products/[id]/page_functions.ts
import type { PageFunctions } from "dinou";
import { getContext } from "dinou";
import { db } from "@/lib/db";

export interface ProductPageProps {
  product: {
    id: string;
    title: string;
    price: number;
    description: string;
  };
  preferredCurrency: string;
}

// Pass the route pattern directly: PageFunctions automatically infers params
export const getProps: PageFunctions<
  "/products/[id]",
  ProductPageProps
>["getProps"] = async (params) => {
  // 1. Fetch data on the server using route parameters (params.id is typed as string)
  const product = await db.products.findById(params.id);

  // 2. Read cookies or headers from request context
  const ctx = getContext();
  const preferredCurrency = ctx.req.cookies["user_currency"] || "USD";

  // 3. Return props passed directly to the companion Page component
  return {
    product,
    preferredCurrency,
  };
};`,
              },
              {
                id: "page-view",
                label: "products/[id]/page.tsx",
                language: "tsx",
                code: `// src/app/products/[id]/page.tsx
import type { PageProps } from "dinou";
import type { ProductPageProps } from "./page_functions";

// In Dinou, Page components receive route params plus props returned by getProps()
type Props = PageProps<"/products/[id]"> & ProductPageProps;

export default function ProductPage({
  params,
  product,
  preferredCurrency,
}: Props) {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-2xl font-semibold mt-2 text-primary">
        {preferredCurrency} {product.price.toFixed(2)}
      </p>
      <p className="mt-4 text-muted-foreground leading-relaxed">
        {product.description}
      </p>
    </main>
  );
}`,
              },
              {
                id: "layout-functions",
                label: "[organization]/layout_functions.ts",
                language: "typescript",
                code: `// src/app/[organization]/layout_functions.ts
import type { LayoutFunctions } from "dinou";
import { getContext, redirect } from "dinou";
import { db } from "@/lib/db";

export interface OrgLayoutProps {
  organization: {
    id: string;
    name: string;
    tier: string;
  };
  unreadCount: number;
}

// Layouts receive route parameters defined at or above this segment level
export const getProps: LayoutFunctions<
  "/[organization]",
  OrgLayoutProps
>["getProps"] = async (params) => {
  const org = await db.organizations.findBySlug(params.organization);
  if (!org) {
    redirect("/select-organization");
  }

  const ctx = getContext();
  const unreadCount = await db.notifications.countUnread(org.id, ctx.req.cookies["user_id"]);

  // Props are injected directly into src/app/[organization]/layout.tsx
  return {
    organization: org,
    unreadCount,
  };
};`,
              },
              {
                id: "layout-view",
                label: "[organization]/layout.tsx",
                language: "tsx",
                code: `// src/app/[organization]/layout.tsx
import type { LayoutProps } from "dinou";
import type { OrgLayoutProps } from "./layout_functions";

// Layout components receive children, segment params, and props returned by getProps()
type Props = LayoutProps<"/[organization]"> & OrgLayoutProps;

export default function OrgLayout({
  children,
  params,
  organization,
  unreadCount,
}: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <span className="font-bold">{organization.name}</span>
        <span className="text-xs bg-muted px-2 py-1 rounded">
          {unreadCount} unread
        </span>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
