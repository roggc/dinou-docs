"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Link2, Compass, GitCommit } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "resolution-diagram", title: "📊 Normalization Flow", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Code Walkthrough", level: 2 },
  { id: "preservation", title: "⏱️ Preserving State Parameters", level: 2 },
];

const RESOLVER_DIAGRAM = `graph TD
    Start[resolveRelativeUrl href, currentPathname] --> AbsCheck{Is href absolute or external?}
    
    AbsCheck -->|Yes| ReturnHref[Return href directly]
    AbsCheck -->|No| NormalizeBase[Normalize base path]
    
    NormalizeBase --> Slash[Append trailing slash e.g. /docs to /docs/]
    Slash --> NewURL[Resolve via new URL href, base]
    NewURL --> Assemble[Re-assemble path: pathname + search + hash]
    Assemble --> ReturnPath[Return resolved URL path]`;

const RESOLVER_CODE = `function resolveRelativeUrl(href, currentPathname) {
  if (!href || typeof href !== "string") {
    return "/";
  }
  
  // 1. Return immediately if it is already absolute or external
  if (href.startsWith("/") || href.includes("://")) {
    return href;
  }
  
  // 2. Fall back to root if no base path is provided
  let base = currentPathname || "/";
  
  // 3. Ensure base directory ends with a slash so relative pathing is correct
  if (!base.endsWith("/")) {
    base += "/";
  }
  
  // 4. Resolve relative URL using the standard WHATWG URL constructor
  const resolved = new URL(href, "http://localhost" + base);
  
  // 5. Re-assemble and return the path, keeping query string and hash attributes
  return resolved.pathname + resolved.search + resolved.hash;
}

module.exports = { resolveRelativeUrl };`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Link2 className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Relative URL Resolver (url-resolver.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine the relative path normalization utility, context-aware URL constructor mappings, and query parameter preservation.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/url-resolver.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In client-side browsers, relative URLs like <code>../about</code> resolve automatically based on the active tab location. However, when rendering Server Components, validating cache lifecycles, or prefetching links on the server-side, the browser context is unavailable.
              </p>
              <p>
                The <code>url-resolver.js</code> utility resolves relative paths on the server. By passing the request pathname as context, it translates relative routes into absolute system paths.
              </p>
            </section>

            <hr className="my-8" />

            {/* RESOLUTION FLOW */}
            <section id="resolution-diagram">
              <h2>📊 Normalization Flow</h2>
              <p>
                The flowchart below shows how incoming paths are categorized and parsed:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{RESOLVER_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>url-resolver.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{RESOLVER_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PRESERVATION */}
            <section id="preservation">
              <h2>⏱️ Preserving State Parameters</h2>
              <p>
                A common bug in relative URL parsers is dropping critical metadata like query strings (<code>?id=1</code>) or section hashes (<code>#features</code>).
              </p>
              <p>
                Dinou solves this by resolving the full path structure via the built-in Node.js <code>URL</code> parser and re-assembling the return string using its key properties:
              </p>
              <ul>
                <li><strong><code>resolved.pathname</code></strong>: The resolved target route path (e.g. <code>/docs/routing</code>).</li>
                <li><strong><code>resolved.search</code></strong>: The complete unmodified query string parameters (e.g. <code>?theme=dark</code>).</li>
                <li><strong><code>resolved.hash</code></strong>: The target element scroll anchor tag (e.g. <code>#overview</code>).</li>
              </ul>
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
