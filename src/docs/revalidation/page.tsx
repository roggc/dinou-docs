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
  RefreshCw,
  Tag,
  FolderOpen,
  Info,
  Zap,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { CodeBlock } from "@/docs/components/code-block";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "revalidate-path", title: "revalidatePath", level: 2 },
  { id: "revalidate-tag", title: "revalidateTag", level: 2 },
  { id: "get-cache-tags", title: "getCacheTags Function", level: 2 },
  { id: "best-practices", title: "Best Practices & Safety", level: 2 },
  { id: "webhooks", title: "Running in Webhooks", level: 3 },
  { id: "scripts", title: "Running in Scripts", level: 3 },
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
                On-Demand Revalidation
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Purge and regenerate the static page cache of your application on-demand in production when data changes, without rebuilding the whole site.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            {/* Overview */}
            <section id="overview">
              <h2>Overview</h2>
              <p className="text-lg">
                Dinou provides Incremental Static Regeneration (ISR) by default. However, when mutative actions occur (e.g. database updates), you want page cache purges to be instant. The <strong>On-Demand Revalidation API</strong> enables purging specific routes or groups of routes tagged with custom cache keys.
              </p>
              <p>
                These APIs are exported from the server-only endpoint <code>"dinou/server"</code>, keeping browser bundles completely clean of Node.js dependencies.
              </p>
            </section>

            {/* revalidatePath */}
            <section id="revalidate-path" className="mt-12">
              <h2>revalidatePath</h2>
              <p>
                Cleans the static cache files for a given route and immediately triggers a background recompilation to promote the new static output.
              </p>

              <h3>Absolute Paths</h3>
              <p>
                Pass an absolute pathname to revalidate that specific route directly:
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/products/actions.ts
"use server";

import { revalidatePath } from "dinou/server";

export async function updateProduct(id, data) {
  await db.updateProduct(id, data);
  
  // Revalidate the specific product page and the main index
  await revalidatePath(\`/products/\${id}\`);
  await revalidatePath("/products");
}`}
              </CodeBlock>

              <h3>Relative Paths</h3>
              <p>
                When called inside a <strong>Server Function</strong>, <code>revalidatePath</code> can resolve relative paths based on the browser url (extracted from the HTTP <code>referer</code> header):
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/demo/isr/actions.ts
"use server";

import { revalidatePath } from "dinou/server";

export async function triggerRevalidate() {
  // Revalidate the page that initiated this Server Function call (e.g., /demo/isr)
  await revalidatePath("./");
  
  // Revalidate an adjoined/adjacent route (e.g., /demo/dashboard)
  await revalidatePath("../dashboard");
}`}
              </CodeBlock>
            </section>

            {/* revalidateTag */}
            <section id="revalidate-tag" className="mt-12">
              <h2>revalidateTag</h2>
              <p>
                Revalidates all static pages associated with a specific cache tag. This allows groups of pages to be invalidated in a single call.
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/products/actions.ts
"use server";

import { revalidateTag } from "dinou/server";

export async function addNewProduct(data) {
  await db.insertProduct(data);
  
  // Revalidate all pages tagged with 'products'
  await revalidateTag("products");
}`}
              </CodeBlock>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <Tag className="h-5 w-5 text-blue-500" />
                      <span>Tag Indexing</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Cache tags are indexed in each page's <code>metadata.json</code> inside <code>dist2/</code> during builds and generation.
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 font-semibold">
                      <ShieldCheck className="h-5 w-5 text-green-500" />
                      <span>Concurrency Safe</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Dinou writes to unique temporary files and uses atomic renames. Multiple parallel revalidations will never collide.
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* getCacheTags Function */}
            <section id="get-cache-tags" className="mt-12">
              <h2>getCacheTags Function</h2>
              <p>
                To assign cache tags to a route, export the <code>getCacheTags</code> function from the route's <code>page_functions.ts</code> file. This function can be sync or async, receives the route parameters and runs on the server.
              </p>
              <CodeBlock
                language="typescript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// src/products/[id]/page_functions.ts

// Assign cache tags to the generated static page
export function getCacheTags(params) {
  return [
    "products",
    \`product-\${params.id}\`
  ];
}`}
              </CodeBlock>
            </section>

            {/* Best Practices & Safety */}
            <section id="best-practices" className="mt-12">
              <h2>Best Practices & Safety Guidelines</h2>
              
              <Alert className="not-prose border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/10">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <AlertTitle>Strict Execution Rules</AlertTitle>
                <AlertDescription>
                  <div className="space-y-2 text-sm leading-relaxed">
                    <p>
                      <strong>Only Call in Event Contexts:</strong> Revalidation APIs are mutative events. They should only be invoked inside <strong>Server Functions (Server Actions)</strong>, Express request endpoints (like webhooks), or standalone Node.js cron/sync scripts.
                    </p>
                    <p>
                      <strong>Do NOT Call inside getProps or Components:</strong> Never invoke <code>revalidatePath</code> or <code>revalidateTag</code> during the rendering phase of a React Component, or inside <code>getProps</code> hooks. Doing so will trigger <strong>infinite compilation loops</strong> that will crash the server.
                    </p>
                  </div>
                </AlertDescription>
              </Alert>

              <h3 className="mt-6" id="webhooks">Running in Webhooks</h3>
              <p>
                To trigger revalidation remotely, define a standard POST route inside your Express <code>server.js</code> file:
              </p>
              <CodeBlock
                language="javascript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// server.js
const { revalidateTag } = require("dinou/server");

app.post("/api/revalidate", express.json(), async (req, res) => {
  const { tag } = req.body;
  try {
    await revalidateTag(tag);
    res.status(200).json({ revalidated: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});`}
              </CodeBlock>

              <h3 className="mt-8" id="scripts">Running in Standalone Scripts</h3>
              <p>
                To run a local sync script that updates your database and immediately refreshes the Dinou page cache:
              </p>
              <CodeBlock
                language="javascript"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`// scripts/cron-sync.js
const { revalidateTag } = require("dinou/server");

async function run() {
  console.log("Sincronizando base de datos...");
  await syncDatabase();
  
  console.log("Limpiando cache de productos...");
  await revalidateTag("productos");
  console.log("Proceso terminado.");
}

run().catch(console.error);`}
              </CodeBlock>
              <p className="mt-4">
                Since standalone scripts execute outside the web server, you must run them with the Dinou loader and the React Server condition enabled:
              </p>
              <CodeBlock
                language="bash"
                containerClassName="w-full overflow-hidden rounded-lg"
              >
                {`node --conditions react-server --import ./dinou/core/register-loader.mjs scripts/cron-sync.js`}
              </CodeBlock>
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
