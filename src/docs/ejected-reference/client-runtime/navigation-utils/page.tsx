"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Globe, ShieldCheck, Compass, HelpCircle } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "navigation-flow", title: "📊 Navigation Resolves Flow", level: 2 },
  { id: "routing-safety", title: "⚡ Routing Safety Checks", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const NAVIGATION_DIAGRAM = `graph TD
    Start[resolveUrl href, current] --> ExtCheck{Is it an external URL?}
    
    ExtCheck -->|Yes| ReturnHref[Return href unmodified]
    ExtCheck -->|No| NormalizeTarget[Normalize target paths]
    
    NormalizeTarget --> RelCheck{Is path relative?}
    RelCheck -->|Yes| AppendBase[Append current base path /]
    RelCheck -->|No| ParseURL[Parse new URL href, origin]
    AppendBase --> ParseURL
    
    ParseURL --> StripSlash[normalize: Strips trailing slash]
    StripSlash --> ReturnPath[Return normalized URL string]`;

const NAVIGATION_CODE = `export function isExternalUrl(href) {
  if (!href) return false;

  // 1. Protocol-relative (e.g. //google.com)
  if (href.startsWith("//")) {
    return true;
  }

  // 2. Absolute with protocol (e.g. https://google.com)
  if (href.includes("://")) {
    try {
      const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";
      const url = new URL(href, origin);
      return url.origin !== origin;
    } catch (e) {
      return true;
    }
  }

  // 3. Non-http protocols (mailto:, tel:, javascript:)
  if (
    /^[a-zA-Z0-9+-.]+:[^//]/.test(href) ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:") ||
    href.startsWith("javascript:")
  ) {
    return true;
  }

  return false;
}

export function resolveUrl(href, currentPathname) {
  if (isExternalUrl(href)) {
    return href;
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "http://localhost";

  if (href.startsWith("/") || href.includes("://")) {
    const url = new URL(href, origin);
    return normalize(url.pathname + url.search + url.hash);
  }

  let base = currentPathname;
  if (!base.endsWith("/")) base += "/";

  const resolved = new URL(href, origin + base);
  return normalize(resolved.pathname + resolved.search + resolved.hash);
}

// 4. Trailing slash normalizer: prevents duplicate route cache records
function normalize(path) {
  if (
    path.length > 1 &&
    path.endsWith("/") &&
    !path.includes("?") &&
    !path.includes("#")
  ) {
    return path.slice(0, -1);
  }
  return path;
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Navigation Utilities (navigation-utils.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine link destination parsers, external route filters, and trailing-slash route normalizations.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/navigation-utils.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                When a user clicks a link (like <code>&lt;Link href="/about"&gt;</code>), the client router must hijack the click, resolve the destination, and update page states. If the link points to an external site or a mailto link, the router must bypass interception and let the browser load the link normally.
              </p>
              <p>
                The <code>navigation-utils.js</code> file exposes helpers to detect external links and normalize paths for consistent cache matching.
              </p>
            </section>

            <hr className="my-8" />

            {/* NAVIGATION RESOLVES FLOW */}
            <section id="navigation-flow">
              <h2>📊 Navigation Resolves Flow</h2>
              <p>
                The flowchart below shows how routes are resolved and normalized for client-side navigation:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{NAVIGATION_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* ROUTING SAFETY */}
            <section id="routing-safety">
              <h2>⚡ Routing Safety Checks</h2>
              <p>
                The utilities provide two key features:
              </p>
              <ul>
                <li>
                  <strong>External Link Identification:</strong> Filters out non-HTTP schemes (e.g. <code>mailto:</code>, <code>tel:</code>, <code>javascript:</code>) and external domains, preventing the SPA router from intercepting them.
                </li>
                <li>
                  <strong>Trailing Slash Standardization:</strong> Strips trailing slashes from pathnames (e.g. converting <code>/docs/</code> to <code>/docs</code>) to prevent duplicate route cache records.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>navigation-utils.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{NAVIGATION_CODE}</CodeBlock>
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
