"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { HardDrive, HelpCircle, Terminal } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "normalize-flow", title: "📊 Normalization Flow", level: 2 },
  { id: "caching-inconsistencies", title: "⚡ Windows Cache Key Issues", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const UTILS_DIAGRAM = `%%{init: {'themeVariables': { 'fontSize': '20px' }}}%%
graph TD
    Start["normalizePathCase(path)<br/>(Entry function call)"] --> WinCheck{"Platform is Windows?<br/>(process.platform === 'win32')"}
    
    WinCheck -->|"Yes"| LetterCheck{"Has Drive Letter?<br/>(e.g. C: or D:)"}
    WinCheck -->|"No"| ReturnAsIs["Return Path As-Is<br/>(POSIX / Linux path unmodified)"]
    
    LetterCheck -->|"Yes"| Lowercase["Normalize Drive Letter<br/>(Convert letter to lowercase e.g. c:)"]
    LetterCheck -->|"No"| ReturnAsIs
    
    Lowercase --> ReturnPath["Return Normalized Path<br/>(Consistent casing for VFS & cache)"]
    ReturnAsIs --> ReturnPath`;

const UTILS_CODE = `function normalizePathCase(p) {
  // 1. Check if running on Windows (win32) and starts with a drive letter (e.g. C:)
  if (process.platform === "win32" && typeof p === "string" && p[1] === ":") {
    // 2. Convert drive letter to lowercase: C:\\path -> c:\\path
    return p.charAt(0).toLowerCase() + p.slice(1);
  }
  
  // 3. Fallback: Return POSIX/Linux path unmodified
  return p;
}

module.exports = {
  normalizePathCase,
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <HardDrive className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Path Normalizer (path-utils.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine drive-letter case normalizations, cache key matching operations, and Windows compatibility utilities.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/path-utils.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In cross-platform frameworks, path consistency is critical. On Linux and macOS, file paths are case-sensitive. On Windows (win32), they are case-insensitive, but drive letters can resolve inconsistently (e.g. <code>C:\project</code> vs <code>c:\project</code>).
              </p>
              <p>
                The <code>path-utils.js</code> utility resolves this inconsistency. It normalizes drive letter cases to ensure cache keys and registry lookups match consistently across platforms.
              </p>
            </section>

            <hr className="my-8" />

            {/* NORMALIZATION FLOW */}
            <section id="normalize-flow">
              <h2>📊 Normalization Flow</h2>
              <p>
                The flowchart below shows how path drive letters are evaluated and normalized:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="650px">{UTILS_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CACHING INCONSISTENCIES */}
            <section id="caching-inconsistencies">
              <h2>⚡ Windows Cache Key Issues</h2>
              <p>
                Why is drive-letter casing critical for frameworks?
              </p>
              <ul>
                <li>
                  <strong>Require Cache Duplication:</strong> Node's internal module loader (<code>require.cache</code>) matches files using their absolute path string as the key. If an import resolves to <code>C:\file.js</code> and another resolves to <code>c:\file.js</code>, Node will compile and cache the module twice, leading to state duplication bugs.
                </li>
                <li>
                  <strong>VFS Matching Mismatches:</strong> The virtual filesystem (<code>vfs.js</code>) matches paths using exact string matches. Case mismatches would cause file checks to fail.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>path-utils.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{UTILS_CODE}</CodeBlock>
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
