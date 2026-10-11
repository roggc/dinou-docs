"use client";

import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import { FileText, CheckCircle2, ArrowRightLeft } from "lucide-react";

export function RevalidatePageSection() {
  return (
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
        Asynchronously invalidates and regenerates <strong>only the targeted page component</strong> (its <code>page.rsc</code> payload and static HTML), while leaving parent and ancestor layouts (<code>layout.rsc</code>) completely untouched.
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

        {/* Parameters Table */}
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
                  The target route path to revalidate (e.g. <code>&quot;/blog/post-1&quot;</code>, <code>&quot;/products/123&quot;</code>, or <code>&quot;./&quot;</code> for the active URL). Trailing slashes are automatically normalized.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="not-prose my-4">
          <TabbedCodeBlock
            defaultTab="server-action"
            tabs={[
              {
                id: "server-action",
                label: "update-article.ts (Server Action)",
                language: "typescript",
                code: `// src/actions/update-article.ts
"use server";

import { revalidatePage } from "dinou/server";
import { db } from "@/lib/db";

export async function updateArticle(slug: string, content: string) {
  // 1. Update database record
  await db.articles.update({ where: { slug }, data: { content } });

  // 2. Purge only the article's page.rsc and index.html
  // Leaves the parent /blog layout and global navigation cache untouched
  await revalidatePage(\`/blog/\${slug}\`);

  return { success: true };
}`,
              },
              {
                id: "cms-webhook",
                label: "cms-webhook.ts (Headless CMS Webhook)",
                language: "typescript",
                code: `// src/plugins/cms-webhook.ts
import type { DinouPlugin } from "dinou";
import { revalidatePage } from "dinou/server";

export const cmsWebhookPlugin: DinouPlugin = {
  name: "cms-webhook",
  async onRequest(request) {
    const url = new URL(request.url);

    if (url.pathname === "/api/webhooks/cms" && request.method === "POST") {
      const payload = await request.json();
      const slug = payload?.entry?.slug;

      if (slug) {
        // Invalidate strictly the updated page without rebuilding shared layouts
        await revalidatePage(\`/posts/\${slug}\`);
        return Response.json({ revalidated: true, path: \`/posts/\${slug}\` });
      }

      return Response.json({ error: "Missing slug" }, { status: 400 });
    }
  },
};`,
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
