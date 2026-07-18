"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Globe, ArrowRight, Zap, RefreshCw, Cpu } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "link-structure", title: "📊 Physical File Structure", level: 2 },
  { id: "code-walkthrough", title: "⚛️ 1. Component Code Walkthrough", level: 2 },
  { id: "click-hijacking", title: "⚙️ 2. The Hijack Mechanism", level: 2 },
  { id: "hover-prefetch", title: "🚀 3. Hover Prefetching Optimization", level: 2 },
  { id: "seo-crawler", title: "📄 4. SEO & Crawler Compatibility", level: 2 },
];

const LINK_STRUCTURE_DIAGRAM = `========================================================================================================
                             PHYSICAL FILE CODE STRUCTURE: LINK.JSX
========================================================================================================

  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  1. Link Component Export                                                                        │
  │     • Props: href, children, prefetch (default: true), fresh (default: false), ...props          │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  2. Hover Prefetch Capture                                                                       │
  │     • onMouseEnter event handler:                                                                │
  │       • Checks prefetch eligibility: rejects empty/external links or fresh flags.              │
  │       • Calls window.__DINOU_PREFETCH__(resolvedHref) to pre-load target RSC payload in cache.   │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  3. Click Hijack Handler                                                                         │
  │     • onClick event handler:                                                                     │
  │       • Ignores compound clicks (Cmd/Ctrl, Shift, Alt click) to preserve native browser actions.  │
  │       • Blocks standard navigation with e.preventDefault().                                      │
  │       • Invokes push(href, { fresh }) via useRouter() to transition SPA states.                  │
  └─────────────────────────────────┬────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
  ┌──────────────────────────────────────────────────────────────────────────────────────────────────┐
  │  4. Native Anchor Render                                                                         │
  │     • Renders standard <a> element preserving SEO crawlers indexing pathways.                    │
  └──────────────────────────────────────────────────────────────────────────────────────────────────┘`;

const LINK_COMPONENT_CODE = `"use client";

import { useRouter, usePathname } from "./navigation.js";
import { resolveUrl, isExternalUrl } from "./navigation-utils.js";

export function Link({
  href,
  children,
  prefetch = true,
  fresh = false,
  ...props
}) {
  const { push } = useRouter();
  const pathname = usePathname();
  const resolvedHref = resolveUrl(href, pathname);

  const handlePrefetch = () => {
    if (!prefetch || !href || fresh || isExternalUrl(href)) return;
    if (window.__DINOU_PREFETCH__) {
      window.__DINOU_PREFETCH__(resolvedHref);
    }
  };

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || isExternalUrl(href)) return;

    e.preventDefault();
    push(href, { fresh });
  };

  return (
    <a
      href={resolvedHref}
      onClick={handleClick}
      onMouseEnter={handlePrefetch}
      {...props}
    >
      {children}
    </a>
  );
}`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Link Click Hijacking (link.jsx)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Understand how Dinou intercepts standard anchor tags, pre-loads RSC data structures, and facilitates seamless SPA transitions.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/link.jsx</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In a standard browser application, clicking an anchor tag (<code>&lt;a href="..."&gt;</code>) triggers a full-page reload. To build a fast Single Page Application (SPA), the client router needs to capture these navigations, prevent document reloads, and instead stream React Server Component (RSC) changes in the background. The <code>link.jsx</code> component is Dinou's interface to handle this.
              </p>
            </section>

            <hr className="my-8" />

            {/* STRUCTURE */}
            <section id="link-structure">
              <h2>📊 Physical File Structure</h2>
              <p>
                The component encapsulates path resolution, click hijacking, and hover prefetching:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="text">{LINK_STRUCTURE_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚛️ 1. Component Code Walkthrough</h2>
              <p>
                The <code>&lt;Link&gt;</code> component wraps a standard anchor tag, resolving relative paths at render time using context hooks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{LINK_COMPONENT_CODE}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* CLICK HIJACKING */}
            <section id="click-hijacking">
              <h2>⚙️ 2. The Hijack Mechanism</h2>
              <p>
                When a user clicks the link, the component evaluates the mouse click details to determine routing actions:
              </p>
              <ul>
                <li>
                  <strong>Bypass conditions:</strong> If the user is holding down key modifiers (such as <code>Cmd</code>, <code>Ctrl</code>, <code>Shift</code>, or <code>Alt</code>) or if the link is external (<code>isExternalUrl(href)</code>), the handler returns immediately. This allows the browser to perform native actions (like opening in a new tab).
                </li>
                <li>
                  <strong>Event Interception:</strong> If it's a standard internal click, it calls <code>e.preventDefault()</code> to block the document reload.
                </li>
                <li>
                  <strong>SPA navigation:</strong> Calls <code>push(href, &#123; fresh &#125;)</code> from `useRouter()` to transition the route path state.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* HOVER PREFETCH */}
            <section id="hover-prefetch">
              <h2>🚀 3. Hover Prefetching Optimization</h2>
              <p>
                To provide instantaneous page loads, the component listens for mouse hover events (<code>onMouseEnter</code>) to prefetch RSC Flight streams:
              </p>
              <ul>
                <li>
                  <strong>Hover evaluation:</strong> If <code>prefetch = true</code> and the URL is internal, the component calls <code>window.__DINOU_PREFETCH__(resolvedHref)</code>.
                </li>
                <li>
                  <strong>Payload Pre-load:</strong> The prefetch handler executes the network request to load the RSC binary payload in the background. If the user eventually clicks the link, the payload is already cached in memory, resolving the navigation transition instantly.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* SEO CRAWLER */}
            <section id="seo-crawler">
              <h2>📄 4. SEO & Crawler Compatibility</h2>
              <p>
                Importantly, the <code>&lt;Link&gt;</code> component outputs a native <code>&lt;a href="..."&gt;</code> HTML element. Search engine bots (like Googlebot) do not trigger Javascript hover or click handlers. By outputting standard anchors, crawlers can read the <code>href</code> links, index pages, and crawl the website structure.
              </p>
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
