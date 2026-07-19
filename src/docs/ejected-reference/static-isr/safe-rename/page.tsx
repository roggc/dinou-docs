"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Lock, HardDrive, ShieldAlert, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "rename-flow", title: "📊 Retry Backoff Flow", level: 2 },
  { id: "file-locking", title: "🔒 The File Locking Problem", level: 2 },
  { id: "integration-usage", title: "🎯 Integration & Usage", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const RENAME_FLOW_DIAGRAM = `graph TD
    Start[safeRename oldPath, newPath] --> Loop[Iterate loop: 5 attempts]
    Loop --> TryRename[fs.rename src, dest]
    TryRename -->|Success| Return[Return success]
    TryRename -->|Exception| ErrorCheck{Is error EPERM or EBUSY?}
    ErrorCheck -->|No| Abort[Re-throw error / Abort]
    ErrorCheck -->|Yes| CalcDelay[Calculate Backoff Delay]
    CalcDelay --> Wait[Wait for delay ms]
    Wait --> Loop`;

const RENAME_CODE = `const fs = require("fs").promises;

async function safeRename(oldPath, newPath, retries = 5, delay = 100) {
  for (let i = 0; i < retries; i++) {
    try {
      // 1. Trigger native filesystem rename operation (Atomic)
      await fs.rename(oldPath, newPath);
      return;
    } catch (err) {
      // 2. If the error is not EPERM (Lock) or EBUSY (Busy), throw it immediately
      if (err.code !== "EPERM" && err.code !== "EBUSY") {
        throw err;
      }

      // 3. If we run out of retries, log error and throw
      if (i === retries - 1) {
        console.error(
          \`[ISR] Failed to rename locked file after \${retries} attempts: \${newPath}\`
        );
        throw err;
      }

      // 4. Calculate delay with progressive linear scale: 100ms, 200ms, 300ms, etc.
      await new Promise((resolve) => setTimeout(resolve, delay * (i + 1)));
    }
  }
}

module.exports = { safeRename };`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Lock className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Atomic Committer (safe-rename.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand atomic file system operations, dynamic read/write file lock overrides, and progressive linear backoff retry loops.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/safe-rename.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In production servers, updating files on disk can lead to dynamic page crashes. If a background thread overwrites a page's <code>index.html</code> while a user is loading that exact file, the browser may receive a partially written, corrupt document.
              </p>
              <p>
                Dinou solves this using <strong>atomic commits</strong>. The compiler writes assets to temporary files first. Once compilation succeeds, it runs <code>safeRename()</code> to replace the old file instantly at the operating system level, ensuring zero downtime.
              </p>
            </section>

            <hr className="my-8" />

            {/* RETRY FLOW */}
            <section id="rename-flow">
              <h2>📊 Retry Backoff Flow</h2>
              <p>
                The chart below traces the progressive retry loop triggered when file operations encounter active locks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{RENAME_FLOW_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* THE FILE LOCKING PROBLEM */}
            <section id="file-locking">
              <h2>🔒 The File Locking Problem</h2>
              <p>
                In Windows environments (and some Linux filesystems), when a file is open in a read stream, the OS places a lock on its sector. Trying to rename or delete the file throws <code>EPERM</code> (Operation not permitted) or <code>EBUSY</code> (Resource busy).
              </p>
              <p>
                The <code>safeRename()</code> utility mitigates this by:
              </p>
              <ul>
                <li>
                  <strong>Targeted Filtering:</strong> If the error is a normal filesystem error (e.g. <code>ENOENT</code> - File not found), it stops and throws immediately.
                </li>
                <li>
                  <strong>Progressive Backoff:</strong> If the file is locked, it sleeps for a progressive linear duration (<code>100ms * loop_iteration</code>) to allow active read streams to close before retrying.
                </li>
                <li>
                  <strong>Failure Threshold:</strong> Aborts and throws after 5 failed retries to prevent infinite execution hangs.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* INTEGRATION & USAGE */}
            <section id="integration-usage">
              <h2>🎯 Integration & Usage (Where is it Used?)</h2>
              <p>
                Because <code>safeRename()</code> is the core mechanism that prevents serving partially-written files to active users, it is imported and executed by the three runtime engines in Dinou that perform "in-flight" page updates:
              </p>
              <ul>
                <li className="space-y-1">
                  <a href="/docs/ejected-reference/static-isr/revalidating"><strong><code>revalidating.js</code> (Background ISR):</strong></a>
                  <p className="mt-1 text-sm text-muted-foreground">
                    When a stale page (past its <code>revalidate</code> timestamp) is requested, a background task generates new HTML and RSC payloads into <code>.tmp</code> files. Once finished, it invokes <code>safeRename()</code> to swap them into the production directory.
                  </p>
                </li>
                <li className="space-y-1">
                  <a href="/docs/ejected-reference/static-isr/generating-isg"><strong><code>generating-isg.js</code> (On-Demand ISG):</strong></a>
                  <p className="mt-1 text-sm text-muted-foreground">
                    When a user requests a path that was not generated at startup, the server dynamically renders the RSC and HTML files into temp files first, then uses <code>safeRename()</code> to promote them to static cache files.
                  </p>
                </li>
                <li className="space-y-1">
                  <a href="/docs/ejected-reference/static-isr/cache-revalidate"><strong><code>cache-revalidate.js</code> (On-Demand Revalidation API):</strong></a>
                  <p className="mt-1 text-sm text-muted-foreground">
                    When a CMS webhook calls <code>revalidatePath()</code>, the server forces an immediate compile of the target page into a temporary file and commits it to disk using <code>safeRename()</code>.
                  </p>
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>safe-rename.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RENAME_CODE}</CodeBlock>
              </div>
            </section>
          </div>
        </div>
      </main>

      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
