"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { CodeBlock } from "@/docs/components/code-block";
import { Alert, AlertDescription, AlertTitle } from "@/docs/components/ui/alert";
import { Sparkles, Terminal, FileCode, ShieldCheck } from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "metadata-flow", title: "📊 Metadata Processing Flow", level: 2 },
  { id: "effects-handling", title: "⚡ Client-Side Side-Effects Injection", level: 2 },
  { id: "code-walkthrough", title: "⚙️ Complete Code Walkthrough", level: 2 },
];

const METADATA_FLOW_DIAGRAM = `graph TD
    Start[processMetadata effects] --> EffectCheck{Are effects present?}
    
    EffectCheck -->|No| ReturnEmpty[Return empty string]
    EffectCheck -->|Yes| CookiesCheck{Does effects.cookies exist?}
    
    CookiesCheck -->|Yes| LoopCookies[Loop cookies & generate document.cookie scripts]
    CookiesCheck -->|No| RedirectCheck{Does effects.redirect exist?}
    LoopCookies --> RedirectCheck
    
    RedirectCheck -->|Yes| AddRedirect[Append window.location.href script]
    RedirectCheck -->|No| WrapScript[Wrap code inside self-invoking function script block]
    AddRedirect --> WrapScript
    
    WrapScript --> ReturnScript[Return compiled inline script block]`;

const METADATA_CODE = `function processMetadata(effects) {
  if (!effects) return "";

  let scriptContent = "";

  // 1. Process cookie operations (setting or clearing)
  if (effects.cookies && effects.cookies.length > 0) {
    effects.cookies.forEach((ck) => {
      const name = JSON.stringify(ck.name);
      const value = JSON.stringify(ck.value || "");
      const path = JSON.stringify(ck.options?.path || "/");

      if (ck.isClear) {
        // Clear cookie by setting expiration to 0
        scriptContent += \`document.cookie = \${name} + "=; Max-Age=0; path=" + \${path} + ";";\`;
      } else {
        scriptContent += \`document.cookie = \${name} + "=" + \${value} + "; path=" + \${path} + ";";\`;
      }
    });
  }

  // 2. Process redirect actions
  if (effects.redirect) {
    scriptContent += \`window.location.href = "\${effects.redirect}";\`;
  }

  if (!scriptContent) return "";

  // 3. Return an inline script tag to execute immediately upon browser parse
  return \`<script>(function(){ \${scriptContent} })();</script>\`;
}

module.exports = {
  processMetadata,
};`;

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-6 w-6 text-primary" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Cache Side-Effects (get-ssg-metadata.js)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Examine compile-time side effect trackers, dynamic cookie injections, and static routing redirect scripts.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Key File Location:</strong> <code>./dinou/core/get-ssg-metadata.js</code>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                In a standard server rendering setup, setting cookies or executing redirects is handled via HTTP headers (<code>Set-Cookie</code> or <code>Location: /url</code>). However, once a page is pre-compiled and served statically from disk cache, the server does not run any dynamic code, making HTTP header manipulation impossible.
              </p>
              <p>
                Dinou solves this using <strong>Compile-Time Side-Effect Injection</strong>. If a Server Component sets a cookie or triggers a redirect during static compilation, the compiler captures it, serializes it with <code>get-ssg-metadata.js</code>, and prepends it to the static HTML file as an inline <code>&lt;script&gt;</code> block that runs immediately on the browser.
              </p>
            </section>

            <hr className="my-8" />

            {/* METADATA FLOW */}
            <section id="metadata-flow">
              <h2>📊 Metadata Processing Flow</h2>
              <p>
                The chart below traces the translation of compile-time side effects into executable inline scripts:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="mermaid" minWidth="600px">{METADATA_FLOW_DIAGRAM}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* EFFECTS HANDLING */}
            <section id="effects-handling">
              <h2>⚡ Client-Side Side-Effects Injection</h2>
              <p>
                This technique enables features like localized routing redirects and session cookie setup for static pages:
              </p>
              <ul>
                <li>
                  <strong>Cookie Setup:</strong> Generates immediate <code>document.cookie</code> assignments. If the compiler recorded a cookie clearance, it sets <code>Max-Age=0</code> to delete it in the browser.
                </li>
                <li>
                  <strong>Immediate Redirects:</strong> Generates a <code>window.location.href</code> redirect script. Because it sits at the top of the HTML header, it executes before styles or page elements load, preventing layout flicker.
                </li>
                <li>
                  <strong>IIFE Encapsulation:</strong> Wraps scripts in an Immediately Invoked Function Expression (IIFE) to avoid polluting the global window namespace.
                </li>
              </ul>
            </section>

            <hr className="my-8" />

            {/* CODE WALKTHROUGH */}
            <section id="code-walkthrough">
              <h2>⚙️ Complete Code Walkthrough</h2>
              <p>
                Below is the full, complete code of <code>get-ssg-metadata.js</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{METADATA_CODE}</CodeBlock>
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
