"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription } from "@/docs/components/ui/alert";
import { Info } from "lucide-react";

const tocItems = [
  { id: "overview", title: "Overview", level: 2 },
  { id: "file-based", title: "File-based Persistence", level: 2 },
  { id: "redis", title: "Redis-based Persistence", level: 2 },
  { id: "recommendation", title: "Best Practices", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex">
      <main className="flex-1 py-6 lg:py-8 min-w-0">
        <div className="container max-w-4xl px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">
              Persisting In-Memory Values Between Renders (Dynamic Rendering)
            </h1>
            <p className="text-xl text-muted-foreground">
              Learn why in-memory state doesn't survive HTML rendering in Dinou
              when rendering dynamically, and how to persist values like
              counters using external storage.
            </p>
          </div>

          <div className="prose max-w-none">
            <section id="overview">
              <h2>Overview</h2>
              <p>
                Dinou renders HTML in a <strong>child process</strong>, isolated
                from the main server process. This means that any global state
                or in-memory variables are not shared across HTML renders. While
                the RSC server can retain memory, the HTML renderer cannot.
              </p>
              <p>
                This can cause <strong>hydration mismatches</strong> if your
                page depends on changing in-memory values like counters.
              </p>
              <p>Here's a problematic example:</p>
              <CodeBlock language="typescript">
                {`// src/page_functions.ts

let counter = 0;

export function getProps() {
  return { page: { visits: counter++ } }; // ❌ This causes hydration mismatch
}`}
              </CodeBlock>
              <p>
                In the code above, the HTML output will always be <code>0</code>
                , while the hydrated React app will see an incremented value.
              </p>
              <Alert className="not-prose mt-2 mb-2">
                <Info className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> This problem arises only in
                  dynamic rendering.
                </AlertDescription>
              </Alert>
            </section>

            <section id="file-based">
              <h2>File-based Persistence</h2>
              <p>
                One way to persist data is through local file storage using
                Node.js <code>fs</code> APIs. Here’s an example:
              </p>
              <CodeBlock language="typescript">
                {`import fs from 'fs';
const path = '.dinou_cache/counter.txt';

export function getCounter(): number {
  let value = 0;
  if (fs.existsSync(path)) value = parseInt(fs.readFileSync(path, 'utf8'), 10);
  fs.writeFileSync(path, String(value + 1));
  return value;
}`}
              </CodeBlock>
            </section>

            <section id="redis">
              <h2>Redis-based Persistence</h2>
              <p>
                You can also use Redis, a fast in-memory data store. This is
                especially useful in distributed or serverless environments.
              </p>
              <CodeBlock language="typescript">
                {`import { createClient } from 'redis';
const redis = createClient();
await redis.connect();

export async function getCounter() {
  const key = 'dinou:counter';
  const val = await redis.get(key);
  const num = val ? parseInt(val) : 0;
  await redis.set(key, num + 1);
  return num;
}`}
              </CodeBlock>
              <p>
                You can use{" "}
                <a href="https://upstash.com" target="_blank" rel="noreferrer">
                  Upstash
                </a>{" "}
                for a serverless Redis-compatible database.
              </p>
            </section>

            <section id="recommendation">
              <h2>Best Practices</h2>
              <ul>
                <li>
                  Avoid using in-memory state in <code>getProps()</code> or{" "}
                  <code>revalidate()</code> unless it's fully deterministic.
                </li>
                <li>
                  If you need state persistence, rely on external systems like
                  the file system, Redis, or a database.
                </li>
                <li>
                  Document any assumptions your code makes about state between
                  renders.
                </li>
              </ul>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
