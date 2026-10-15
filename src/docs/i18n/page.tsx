import { TableOfContents } from "@/docs/components/table-of-contents";
import { DocsPager } from "@/docs/components/docs-pager";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import { TabbedCodeBlock } from "@/docs/components/tabbed-code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Globe,
  Zap,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";

const tocItems = [
  { id: "overview", title: "1. Overview", level: 2 },
  { id: "overview-how-it-works", title: "1.1 How it Works", level: 3 },
  { id: "implementation-guide", title: "2. Complete Implementation Guide", level: 2 },
  { id: "i18next-install", title: "2.1 Installation", level: 3 },
  { id: "i18next-config", title: "2.2 Shared Config & Server Helpers", level: 3 },
  { id: "i18next-plugin", title: "2.3 Plugin: Root Redirect & Context", level: 3 },
  { id: "i18next-provider", title: "2.4 Client Provider", level: 3 },
  { id: "i18next-layout", title: "2.5 Locale Layout", level: 3 },
  { id: "i18next-integration", title: "2.6 Server & Client Components (t)", level: 3 },
  { id: "language-switcher", title: "2.7 Language Switcher Component", level: 3 },
  { id: "i18next-ssg", title: "2.8 Cascading SSG (layout_functions)", level: 3 },
  { id: "server-functions", title: "2.9 Server Functions with i18n", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <title>Internationalization (i18n) | Dinou v7 Docs</title>
      <meta
        name="description"
        content="Build search-engine-friendly, localized applications using native dynamic folder route parameters (src/[lang]/...) and server-side dictionaries."
      />
      <link rel="canonical" href="https://dinou.dev/docs/i18n" />

      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-6 w-6 text-primary text-blue-600 dark:text-blue-400" />
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Internationalization (i18n)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Build search-engine-friendly, localized applications using native dynamic folder route parameters (<code>src/[lang]/...</code>).
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>In Dinou, internationalization follows modern web standards: localized pages are structured using folder-based dynamic route parameters (<code>src/[lang]/...</code>). This guarantees explicit, canonical URLs for search engines, eliminates complex server URL rewrites, and natively supports both Static (Pre-rendered) and Dynamic (On-Demand) rendering.</strong>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>1. Overview</h2>
              <p>
                Organizing routes under dynamic language folders (such as <code>src/[lang]/about/page.tsx</code>) provides a clean, predictable mental model for both developers and search engine crawlers.
              </p>

              <div className="grid gap-6 md:grid-cols-3 not-prose my-6">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      <Layers className="h-4 w-4" />
                      <span>Native File Routing</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Dinou's file-system router extracts the locale automatically into <code>params.lang</code>. No custom route-mapping configurations or Express URL rewriting middlewares needed.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-sm">
                      <Zap className="h-4 w-4" />
                      <span>Static (Pre-rendered) & Dynamic (On-Demand)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Pre-compile static HTML files for each language with <code>getStaticPaths()</code>, or render on-demand at request-time with <code>export const revalidate = 0;</code>.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold text-sm">
                      <Globe className="h-4 w-4" />
                      <span>SEO First-Class</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Every language has its own distinct, crawlable URL (e.g. <code>/en/about</code> and <code>/es/about</code>), perfectly suited for standard <code>hreflang</code> meta tags and sitemaps.
                  </CardContent>
                </Card>
              </div>

              <h3 id="overview-how-it-works">1.1 How it Works</h3>
              <p>
                When a request arrives for <code>/es/about</code>, Dinou matches the dynamic route <code>src/[lang]/about</code>. Your page component (<code>page.tsx</code>) automatically receives <code>{"{ params: { lang: 'es' } }"}</code> via standard React props (typed with <code>PageProps</code>). If defined, server contracts like <code>getProps(params)</code> or <code>validateParams(params)</code> also receive <code>params.lang</code> directly to load localized data or validate the route. For pre-rendering at build time, <code>getStaticPaths</code> can be exported in <code>layout_functions.ts</code> (or <code>page_functions.ts</code>) to declare the supported locales.
              </p>
            </section>

            <hr className="my-8" />

            {/* COMPLETE IMPLEMENTATION GUIDE */}
            <section id="implementation-guide">
              <h2>2. Complete Implementation Guide</h2>
              <p>
                Dinou integrates seamlessly with the industry-standard <code>i18next</code> and <code>react-i18next</code> ecosystem. This setup gives you the best of both worlds: Server Components render translations directly on Node.js using <strong><code>getFixedT()</code></strong> with <strong>0 kB client JavaScript bundle impact</strong>, while deeply nested Client Components consume reactive translations anywhere using the <strong><code>useTranslation()</code> hook</strong> without prop drilling.
              </p>

              <h3 id="i18next-install">2.1 Installation</h3>
              <div className="not-prose my-4">
                <CodeBlock language="bash">{`npm install i18next react-i18next`}</CodeBlock>
              </div>

              <h3 id="i18next-config">2.2 Shared Configuration &amp; Server Helpers (<code>src/lib/i18n.ts</code>)</h3>
              <p>
                Create a shared configuration file with your translation resources. Export <code>getFixedT(lang)</code> for explicit route language bindings, and <code>getServerT()</code> for zero-prop-drilling in nested Server Components:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/lib/i18n.ts
import i18next from "i18next";
import { getContext } from "dinou";

export const resources = {
  en: {
    translation: {
      title: "Interactive i18n Demo",
      serverMessage: "Rendered directly on Node.js with getFixedT() (0 kB client JS)!",
      serverNested: "Rendered deep in the RSC tree with getServerT() (zero prop drilling)!",
      clientMessage: "Translated inside a Client Component using useTranslation()!",
      save: "Save Changes",
      newsletter: {
        placeholder: "you@example.com",
        subscribe: "Subscribe",
        subscribing: "Subscribing...",
        success: "Thank you for subscribing!",
        invalidEmail: "Please enter a valid email address.",
      },
    },
  },
  es: {
    translation: {
      title: "Demostración Interactiva de i18n",
      serverMessage: "¡Renderizado directamente en Node.js con getFixedT() (0 kB de JS cliente)!",
      serverNested: "¡Renderizado profundo en el árbol RSC con getServerT() (cero prop drilling)!",
      clientMessage: "¡Traducido dentro de un Client Component usando useTranslation()!",
      save: "Guardar Cambios",
      newsletter: {
        placeholder: "tu@ejemplo.com",
        subscribe: "Suscribirse",
        subscribing: "Suscribiendo...",
        success: "¡Gracias por suscribirte!",
        invalidEmail: "Por favor introduce un email válido.",
      },
    },
  },
} as const;

if (!i18next.isInitialized) {
  i18next.init({
    resources,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

// 1. Explicit Server Helper: returns 't' bound to an explicit language parameter
export function getFixedT(lang: string) {
  return i18next.getFixedT(lang);
}

// 2. Zero-Prop-Drilling Server Helper: automatically resolves context.lang from AsyncLocalStorage.
// Deeply nested Server Components can call this anywhere without needing props from parent pages!
export function getServerT() {
  const { lang = "en" } = getContext() as { lang?: string };
  return getFixedT(lang);
}`}</CodeBlock>
              </div>

              <h3 id="i18next-plugin">2.3 Plugin Configuration: Root Redirection &amp; Context Extension (<code>dinou.config.mjs</code>)</h3>
              <p>
                In <strong>Dinou v7</strong>, you can configure both <strong>Root URL Redirection</strong> (<code>/</code> ➔ <code>/[lang]</code>) and <strong>Context Extension</strong> (attaching <code>context.lang</code> for <code>getContext()</code>) using a single Web Standards plugin:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou.config.mjs
import { defineConfig } from "dinou";

export default defineConfig({
  plugins: [
    {
      name: "i18n-plugin",
      onRequest(request, context) {
        const url = new URL(request.url);

        // 1. Root URL Redirection: / -> /[lang]
        if (url.pathname === "/") {
          const supportedLocales = ["en", "es"];
          const defaultLocale = "en";

          // Check saved user cookie from context.req.cookies
          const cookieLocale = context.req.cookies["locale"];
          if (cookieLocale && supportedLocales.includes(cookieLocale)) {
            return Response.redirect(new URL(\`/\${cookieLocale}\`, request.url), 307);
          }

          // Check browser Accept-Language header
          const acceptLang = request.headers.get("accept-language") || "";
          const browserLocale = supportedLocales.find((l) =>
            acceptLang.toLowerCase().includes(l)
          );

          const targetLocale = browserLocale || defaultLocale;
          return Response.redirect(new URL(\`/\${targetLocale}\`, request.url), 307);
        }

        // 2. Context Extension: Resolve active language for getContext()
        const supported = ["en", "es"];
        let lang = null;

        // A. From URL path (e.g. /es/about, /en/contact)
        const segments = url.pathname.split("/").filter(Boolean);
        if (segments[0] && supported.includes(segments[0])) {
          lang = segments[0];
        }

        // B. From Referer header (e.g. when triggered from Server Actions or client fetch)
        if (!lang && request.headers.get("referer")) {
          try {
            const refPath = new URL(request.headers.get("referer")).pathname;
            const refSegments = refPath.split("/").filter(Boolean);
            if (refSegments[0] && supported.includes(refSegments[0])) {
              lang = refSegments[0];
            }
          } catch {}
        }

        // C. From saved user cookie
        if (!lang && context.req.cookies["locale"]) {
          const cookieLocale = context.req.cookies["locale"];
          if (supported.includes(cookieLocale)) lang = cookieLocale;
        }

        // Attached directly to context: accessible anywhere via getContext()!
        context.lang = lang || "en";
      },
    },
  ],
});`}</CodeBlock>
              </div>

              <div className="not-prose my-4">
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>Why HTTP 307 &amp; AsyncLocalStorage?</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 space-y-1">
                    <p>• <strong>HTTP 307 (Temporary Redirect):</strong> Prevents search engines and browsers from permanently caching the redirect, allowing visitors to switch locales dynamically without getting locked in.</p>
                    <p>• <strong>AsyncLocalStorage Propagation:</strong> Any custom property attached to <code>context</code> (like <code>context.lang</code>) is preserved across the entire asynchronous execution chain on Node.js and accessible via <code>getContext()</code>.</p>
                  </AlertDescription>
                </Alert>
              </div>

              <h3 id="i18next-provider">2.4 Client Provider (<code>src/components/i18n-provider.tsx</code>)</h3>
              <p>
                Wrap the client tree in an <code>I18nextProvider</code> that synchronizes its active language whenever <code>locale</code> changes:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/components/i18n-provider.tsx
"use client";

import { ReactNode, useEffect, useMemo } from "react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { resources } from "@/lib/i18n";

export function I18nProvider({
  locale,
  children,
}: {
  locale: string;
  children: ReactNode;
}) {
  const i18nInstance = useMemo(() => {
    const instance = i18next.createInstance();
    instance.init({
      resources,
      lng: locale,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
    return instance;
  }, [locale]);

  useEffect(() => {
    if (i18nInstance.language !== locale) {
      i18nInstance.changeLanguage(locale);
    }
  }, [locale, i18nInstance]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}`}</CodeBlock>
              </div>

              <h3 id="i18next-layout">2.5 Root Locale Layout (<code>src/[lang]/layout.tsx</code>)</h3>
              <p>
                Instead of manually wrapping <code>&lt;I18nProvider&gt;</code> inside every individual page, mount it once in the localized route segment layout (<code>src/[lang]/layout.tsx</code>). It receives the active language directly via <code>LayoutProps&lt;&quot;/[lang]&quot;&gt;</code>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/[lang]/layout.tsx
import { I18nProvider } from "@/components/i18n-provider";
import type { LayoutProps } from "dinou";

export default function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const lang = params.lang || "en";

  return (
    <I18nProvider locale={lang}>
      {children}
    </I18nProvider>
  );
}`}</CodeBlock>
              </div>

              <div className="not-prose my-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  <AlertTitle>Why use a Layout for i18n?</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 space-y-1">
                    <p>• <strong>Zero Boilerplate:</strong> Wrap the provider once in <code>layout.tsx</code>; all current and future sub-pages inherit the i18n context automatically without importing the provider.</p>
                    <p>• <strong>State Persistence:</strong> Client-side navigation between pages in the same language preserves the provider instance and eliminates redundant context re-mounts.</p>
                    <p>• <strong>Strict Type Safety:</strong> <code>LayoutProps&lt;&quot;/[lang]&quot;&gt;</code> infers <code>params.lang</code> with automatic TypeScript autocomplete.</p>
                  </AlertDescription>
                </Alert>
              </div>

              <h3 id="i18next-integration">2.6 Translating in Server &amp; Client Components</h3>
              <p>
                In Dinou and React 19, you can author pages and components as either <strong>Server Components</strong> (Node.js) or <strong>Client Components</strong> (browser). Because <code>src/[lang]/layout.tsx</code> wraps the route subtree in <code>&lt;I18nProvider&gt;</code> and our plugin preserves <code>context.lang</code> in <code>AsyncLocalStorage</code>, translations work seamlessly across all environments:
              </p>

              <div className="not-prose my-4">
                <Alert>
                  <Sparkles className="h-4 w-4 text-primary text-blue-600 dark:text-blue-400" />
                  <AlertTitle>Server vs. Client Translation Patterns</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 space-y-1">
                    <p>• <strong>Server Component Pages (Zero Client JS):</strong> Server components cannot run hooks like <code>useTranslation()</code>. Call <code>getFixedT(params.lang)</code> to translate synchronously on Node.js during SSR, shipping pure HTML with <strong>0 kB client bundle impact</strong>.</p>
                    <p>• <strong>Deeply Nested Server Components (Zero Prop Drilling):</strong> In other frameworks, nested RSCs require passing <code>lang</code> or <code>t</code> down through every layer. In Dinou, any nested Server Component can simply call <strong><code>getServerT()</code></strong> (the helper we created in step 2.2 in <code>src/lib/i18n.ts</code>) to read the active locale directly from <code>AsyncLocalStorage</code> with <strong>zero prop drilling</strong>.</p>
                    <p>• <strong>Client Component Pages (&quot;use client&quot;):</strong> When an entire page requires client-side state (such as interactive dashboards, forms, or tabs), mark <code>page.tsx</code> with <code>&quot;use client&quot;</code> and call <code>const &#123; t &#125; = useTranslation()</code> directly at the page level.</p>
                    <p>• <strong>Nested Client Components:</strong> Any leaf component (buttons, modals, toolbars) can call <code>useTranslation()</code> anywhere in the tree with zero prop drilling.</p>
                  </AlertDescription>
                </Alert>
              </div>

              <div className="not-prose my-4">
                <TabbedCodeBlock
                  tabs={[
                    {
                      id: "server-comp",
                      label: "page.tsx (Server Component Page)",
                      language: "tsx",
                      code: `// src/[lang]/interactive/page.tsx
// Server Component: zero client JS overhead, translations rendered directly on Node.js
import { getFixedT } from "@/lib/i18n";
import { ServerStats } from "@/components/server-stats";
import { FeedbackBox } from "@/components/feedback-box";
import { Link, type PageProps } from "dinou";

export default function InteractivePage({
  params,
}: PageProps<"/[lang]/interactive">) {
  // 1. Explicit helper bound to route params
  const t = getFixedT(params.lang);

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground">{t("serverMessage")}</p>

      {/* Nested Server Component: zero props required! */}
      <ServerStats />

      {/* Interactive Client Component embedded inside the Server Page */}
      <FeedbackBox />

      <div className="flex gap-4 pt-4 border-t text-sm">
        <Link
          href="/en/interactive"
          className={params.lang === "en" ? "font-bold underline" : "text-muted-foreground"}
        >
          English
        </Link>
        <Link
          href="/es/interactive"
          className={params.lang === "es" ? "font-bold underline" : "text-muted-foreground"}
        >
          Español
        </Link>
      </div>
    </main>
  );
}`,
                    },
                    {
                      id: "server-nested",
                      label: "server-stats.tsx (Nested Server Component)",
                      language: "tsx",
                      code: `// src/components/server-stats.tsx
// Pure Server Component: nested anywhere, zero prop drilling!
import { getServerT } from "@/lib/i18n";

export function ServerStats() {
  // Reads context.lang automatically from Node.js AsyncLocalStorage
  const t = getServerT();

  return (
    <div className="p-4 rounded-lg bg-card border text-sm">
      <span className="font-semibold text-blue-600 dark:text-blue-400">RSC Subtree:</span>
      <p className="text-muted-foreground mt-1">{t("serverNested")}</p>
    </div>
  );
}`,
                    },
                    {
                      id: "client-page",
                      label: "dashboard/page.tsx (Client Component Page)",
                      language: "tsx",
                      code: `// src/[lang]/dashboard/page.tsx
"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { PageProps } from "dinou";

// Entire page marked with "use client" for client state and event handlers
export default function DashboardPage({
  params,
}: PageProps<"/[lang]/dashboard">) {
  // Inherits I18nProvider from src/[lang]/layout.tsx!
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <main className="max-w-2xl mx-auto py-12 px-4 space-y-4">
      <h1 className="text-3xl font-bold">{t("title")}</h1>
      <p className="text-muted-foreground">{t("clientMessage")}</p>

      <div className="flex gap-2">
        <button
          onClick={() => setActiveTab("overview")}
          className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-semibold"
        >
          {t("save")}
        </button>
      </div>
    </main>
  );
}`,
                    },
                    {
                      id: "client-comp",
                      label: "components/feedback-box.tsx (Nested Client)",
                      language: "tsx",
                      code: `// src/components/feedback-box.tsx
"use client";

import { useTranslation } from "react-i18next";

export function FeedbackBox() {
  // Consumes I18nProvider context for reactive client translations anywhere
  const { t } = useTranslation();

  return (
    <div className="p-4 rounded-lg bg-muted border text-sm">
      <p>{t("clientMessage")}</p>
      <button className="mt-3 px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-semibold">
        {t("save")}
      </button>
    </div>
  );
}`,
                    },
                  ]}
                />
              </div>

              <h3 id="language-switcher">2.7 Language Switcher Component</h3>
              <p>
                Below is a reusable language switcher component for your app. It uses Dinou&apos;s <code>usePathname()</code> to swap the leading language prefix while preserving the user&apos;s active sub-path (e.g. switching from <code>/en/interactive</code> to <code>/es/interactive</code>). It also updates the <code>locale</code> cookie on click so that future visits to the root URL (<code>/</code>) seamlessly remember the user&apos;s preferred language via our plugin in <code>dinou.config.mjs</code>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/components/language-switcher.tsx
"use client";

import { usePathname, Link } from "dinou";

const LOCALES = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export function LanguageSwitcher() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  // 1. Safe active locale detection (validating against supported LOCALES)
  const currentLocale = LOCALES.some((l) => l.code === segments[0])
    ? segments[0]
    : "en";

  // 2. Helper to replace the leading language prefix (e.g. /en/about -> /es/about)
  const getLocalizedPath = (targetLocale: string) => {
    const nextSegments = [...segments];
    if (nextSegments.length > 0 && LOCALES.some((l) => l.code === nextSegments[0])) {
      nextSegments[0] = targetLocale;
    } else {
      nextSegments.unshift(targetLocale);
    }
    return "/" + nextSegments.join("/");
  };

  return (
    <div className="inline-flex items-center gap-2 p-1 rounded-lg border bg-card text-xs">
      {LOCALES.map(({ code, label }) => (
        <Link
          key={code}
          href={getLocalizedPath(code)}
          onClick={() => {
            // 3. Persist locale cookie so dinou.config.mjs remembers it on root "/" visits
            document.cookie = \`locale=\${code}; path=/; max-age=31536000; SameSite=Lax\`;
          }}
          className={\`px-2.5 py-1 rounded-md transition-colors \${
            currentLocale === code
              ? "bg-primary text-primary-foreground font-semibold shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }\`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}`}</CodeBlock>
              </div>

              <h3 id="i18next-ssg">2.8 Cascading SSG with <code>layout_functions.ts</code></h3>
              <p>
                In Dinou, when a layout introduces a dynamic route segment (such as <code>src/[lang]/layout.tsx</code>), define <code>getStaticPaths</code> directly in <strong><code>src/[lang]/layout_functions.ts</code></strong>.
              </p>
              <p>
                This activates <strong>Cascading Static Generation</strong>: Dinou automatically pre-compiles every nested page under <code>src/[lang]/...</code> for each language declared in the layout, eliminating the need to duplicate <code>getStaticPaths</code> across multiple individual <code>page_functions.ts</code> files:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/[lang]/layout_functions.ts
import type { LayoutFunctions } from "dinou";

// 1. Cascades down to all child routes (e.g. /[lang]/interactive, /[lang]/about, etc.)
export const getStaticPaths: LayoutFunctions<"/[lang]">["getStaticPaths"] = [
  { lang: "en" },
  { lang: "es" },
];

// 2. Strict language enclave: immediately returns 404 for unlisted locales (e.g. /fr/about)
export const allowISG: LayoutFunctions<"/[lang]">["allowISG"] = false;`}</CodeBlock>
              </div>

              <div className="not-prose my-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <AlertTitle>Strict Language Enclave (<code>allowISG: false</code>)</AlertTitle>
                  <AlertDescription className="text-xs leading-relaxed text-muted-foreground mt-1">
                    Setting <code>allowISG = false</code> ensures that only the declared languages (<code>en</code>, <code>es</code>) can be accessed. Any incoming request for an unsupported locale (like <code>/fr/...</code> or <code>/de/...</code>) will immediately return a <strong>404 Not Found</strong> at the layout perimeter without attempting on-demand generation or invoking downstream server renderers.
                  </AlertDescription>
                </Alert>
              </div>

              <h3 id="server-functions">2.9 Server Functions (Server Actions) with i18n</h3>
              <p>
                Server Functions (<code>&quot;use server&quot;</code>) execute in an isolated backend Flight RPC context. In production web applications, having the active locale available on the server is critical for multiple backend operations.
              </p>

              <h4>When is <code>lang</code> needed on the Backend? (Real-World Use Cases)</h4>
              <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground my-3">
                <li><strong>Transactional Emails &amp; Notifications:</strong> When a user signs up for a newsletter, submits a contact request, or triggers a password reset, external email services (Resend, SendGrid, Nodemailer) require the language code to render the email template in the user&apos;s language.</li>
                <li><strong>Localized Database Queries &amp; Mutations:</strong> Storing the user&apos;s preferred language tag in the database (e.g. <code>db.users.update(&#123; preferredLocale: lang &#125;)</code>) or querying language-specific database tables/columns (e.g. <code>db.products.findMany(&#123; where: &#123; locale: lang &#125; &#125;)</code>).</li>
                <li><strong>Third-Party Payment &amp; API Gateways:</strong> Initializing checkout sessions with providers like Stripe or PayPal with the customer&apos;s active locale (e.g. <code>stripe.checkout.sessions.create(&#123; locale: lang &#125;)</code>).</li>
                <li><strong>Server-Side Document Generation:</strong> Compiling localized PDF receipts, invoices, or export reports directly on the server.</li>
              </ul>

              <h4>Obtaining the Locale: <code>getContext()</code> vs. Explicit Parameter</h4>
              <p>
                Dinou provides two flexible ways to handle the active language inside a Server Function:
              </p>

              <div className="not-prose my-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  <AlertTitle>Zero-Boilerplate Access via <code>getContext()</code></AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 space-y-1">
                    <p>Because our plugin in <code>dinou.config.mjs</code> attaches <code>context.lang</code>, any Server Function can read it directly from <code>AsyncLocalStorage</code> via <code>const &#123; lang &#125; = getContext()</code>. You don&apos;t need to pass <code>lang</code> through form inputs or client function parameters!</p>
                  </AlertDescription>
                </Alert>
              </div>

              <h4>Server Action Implementation Example</h4>
              <p>
                The Server Function reads the active locale via <code>getContext()</code>, performs the backend task (such as queuing an email), and returns a clean status response. The Client Component translates user feedback locally using <code>useTranslation()</code>:
              </p>

              <div className="not-prose my-4">
                <TabbedCodeBlock
                  tabs={[
                    {
                      id: "action",
                      label: "actions/newsletter.ts (Server Function)",
                      language: "typescript",
                      code: `// src/actions/newsletter.ts
"use server";

import { getContext } from "dinou";

export async function subscribeNewsletter(email: string) {
  // 1. Read locale directly from request context (zero parameter drilling!)
  const { lang = "en" } = getContext() as { lang?: string };

  if (!email || !email.includes("@")) {
    return { success: false, errorKey: "newsletter.invalidEmail" };
  }

  // 2. Perform backend localized side effects (e.g. queue email in user's language)
  console.log(\`[Email Service] Queueing \${lang} welcome email to \${email}\`);

  // 3. Return clean machine status and translation key for the client
  return { success: true, messageKey: "newsletter.success" };
}`,
                    },
                    {
                      id: "form",
                      label: "components/newsletter-form.tsx (Client Component)",
                      language: "tsx",
                      code: `// src/components/newsletter-form.tsx
"use client";

import { useState, useTransition } from "react";
import { useTranslation } from "react-i18next";
import { subscribeNewsletter } from "@/actions/newsletter";

export function NewsletterForm() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      // Call the action cleanly without passing locale arguments
      const res = await subscribeNewsletter(email);

      if (res.success) {
        setStatus(t(res.messageKey!));
        setEmail("");
      } else {
        setStatus(t(res.errorKey!));
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 max-w-sm">
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("newsletter.placeholder")}
          required
          className="px-3 py-2 rounded border text-sm flex-1"
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm font-semibold"
        >
          {isPending ? t("newsletter.subscribing") : t("newsletter.subscribe")}
        </button>
      </div>

      {status && <p className="text-xs text-muted-foreground mt-1">{status}</p>}
    </form>
  );
}`,
                    },
                    {
                      id: "action-bind",
                      label: "Alternative: Form .bind(null, lang)",
                      language: "tsx",
                      code: `// src/[lang]/contact/page.tsx
// Alternatively, pass lang explicitly using React 19's .bind() pattern
import { submitContactForm } from "@/actions/contact";
import type { PageProps } from "dinou";

export default function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  // Pre-binds params.lang as the first argument to the Server Action
  const submitWithLocale = submitContactForm.bind(null, params.lang);

  return (
    <form action={submitWithLocale} className="space-y-4">
      <input name="email" type="email" required placeholder="name@example.com" />
      <textarea name="message" required placeholder="Your message..." />
      <button type="submit">Submit</button>
    </form>
  );
}`,
                    },
                  ]}
                />
              </div>

              <div className="not-prose my-4">
                <Alert>
                  <Sparkles className="h-4 w-4 text-primary text-blue-600 dark:text-blue-400" />
                  <AlertTitle>Advanced Dinou Feature: Returning Rendered JSX Trees</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 space-y-1">
                    <p>In Dinou, Server Functions are not limited to returning JSON or primitive types. When rendering dynamic server widgets, dialogs, or slots on demand, a Server Function can return <strong>fully rendered React component trees (both Server and Client Components)</strong> directly across Flight RPC.</p>
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            {/* Documentation Previous / Next Pager */}
            <DocsPager />
          </div>
        </div>
      </main>

      {/* Sidebar TOC */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
