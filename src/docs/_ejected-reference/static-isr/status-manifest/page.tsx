"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { FileCode, Activity, HardDrive, ShieldCheck } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "manifest-flow", title: "📊 Manifest API Structure", level: 2 },
  { id: "role-in-routing", title: "⚡ Role in the Server Lifecycle", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const MANIFEST_DIAGRAM = `graph TD
    Start[status-manifest.js] --> MapInit[statusMap Map Registry]
    
    MapInit --> GetStatus[getStatus path]
    GetStatus --> ReturnStatus[Retrieve key status from Map]

    MapInit --> UpdateStatus[updateStatus path, status]
    UpdateStatus --> CheckChange{Has status changed?}
    CheckChange -->|Yes| SetMap[Set Map key to new status]
    CheckChange -->|No| NoOp[No-op / Return]`;

const MANIFEST_CODE = `const statusMap = new Map(); // In-memory compilation status registry

function getStatus(reqPath) {
  return statusMap.get(reqPath)?.status;
}

function updateStatus(reqPath, status) {
  const current = statusMap.get(reqPath)?.status;
  if (current === status) return; // Prevent unnecessary map updates

  statusMap.set(reqPath, { status });
}

module.exports = { getStatus, updateStatus };`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Activity className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Status Manifest (status-manifest.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the in-memory route compilation registry, status cache accessors, and request middleware hook connectors.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/status-manifest.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                During application execution, the Express routing server needs to know whether a requested route is compiled successfully (status <code>200</code>), has triggered a redirect (status <code>302</code>), or is missing.
              </p>
              <p>
                The <code>status-manifest.js</code> utility provides a lightweight, in-memory registry (<code>statusMap</code>) to track the HTTP status codes generated during the static rendering passes of all pages.
              </p>
            </section>

            <hr className="my-8" />

            {/* MANIFEST API FLOW */}
            <section id="manifest-flow">
              <h2>📊 Manifest API Structure</h2>
              <p>
                The chart below traces the simple, high-performance key-value operations exposed by the manifest:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{MANIFEST_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ROLE IN ROUTING */}
            <section id="role-in-routing">
              <h2>⚡ Role in the Server Lifecycle</h2>
              <p>
                Although simple, the Status Manifest performs key optimization work during route resolution:
              </p>
              <ul>
                <li>
                  <strong>Bypass Read Overhead:</strong> Instead of parsing <code>metadata.json</code> files from disk on every page view to check compile states, the main Express router queries <code>getStatus()</code>, reducing file system I/O bounds.
                </li>
                <li>
                  <strong>Mutations Checking:</strong> When background ISR or dynamic ISG compiles routes, they invoke <code>updateStatus(path, status)</code>. If the new status matches the cached code, the operation exits immediately to avoid triggering HMR reload notifications.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>status-manifest.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{MANIFEST_CODE}</CodeBlock>
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
