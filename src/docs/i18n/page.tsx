"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/docs/components/ui/alert";
import {
  Globe,
  Languages,
  Zap,
  CheckCircle2,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "root-redirect", title: "🔀 Root URL Redirection", level: 2 },
  { id: "custom-dictionary", title: "🟢 Lightweight Custom Dictionary", level: 2 },
  { id: "i18next-standard", title: "🔵 Standard i18next & Client Hooks", level: 2 },
  { id: "server-functions", title: "⚡ Server Functions (Actions)", level: 2 },
  { id: "language-switcher", title: "🌐 Language Switcher Component", level: 2 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
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
              <strong>In Dinou, internationalization follows modern web standards: localized pages are structured using folder-based dynamic route parameters (<code>src/[lang]/...</code>). This guarantees explicit, canonical URLs for search engines, eliminates complex server URL rewrites, and natively supports both pre-compiled static files (SSG) and dynamic request-time rendering (SSR).</strong>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
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
                      <span>SSG & SSR Support</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-xs text-muted-foreground leading-relaxed">
                    Pre-compile static HTML files for each language with <code>getStaticPaths()</code>, or render on-demand at request-time with <code>export function dynamic() {"{ return true; }"}</code>.
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

              <h3>How it Works</h3>
              <p>
                When a request arrives for <code>/es/about</code>, Dinou matches the dynamic route <code>src/[lang]/about</code> and invokes <code>getProps(params)</code> inside <code>page_functions.ts</code>, passing <code>{"{ lang: 'es' }"}</code> directly in the parameters object. The active language is passed straight into the page component via standard React props.
              </p>
            </section>

            <hr className="my-8" />

            {/* ROOT REDIRECT */}
            <section id="root-redirect">
              <h2>🔀 Root URL Redirection (<code>/</code> ➔ <code>/[lang]</code>)</h2>
              <p>
                When all localized routes live under <code>src/[lang]/...</code>, a visitor navigating to the bare root URL (<code>https://example.com/</code>) should be redirected automatically to their preferred language.
              </p>

              <p>
                The standard industry approach follows this evaluation order:
              </p>
              <ol className="list-decimal pl-6 space-y-1 text-sm text-muted-foreground">
                <li><strong>Saved Cookie:</strong> Check <code>req.cookies.locale</code> if the user previously selected a language.</li>
                <li><strong>Browser Header:</strong> Check <code>req.headers["accept-language"]</code> for the user's browser language preference.</li>
                <li><strong>Default Fallback:</strong> Default to your primary language (e.g. <code>"en"</code> or <code>"es"</code>).</li>
                <li><strong>Temporary Redirect:</strong> Respond with an HTTP <code>307</code> (Temporary Redirect) to <code>/{"${targetLocale}"}</code>.</li>
              </ol>

              <h3>Configuring the Root Redirect Plugin</h3>
              <p>
                You can register this redirection logic cleanly without ejecting using a lightweight plugin in <code>dinou.config.js</code>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou.config.js
module.exports = {
  plugins: [
    {
      name: "i18n-root-redirect",
      onServerInit(app) {
        // Intercept requests to the bare root "/"
        app.get("/", (req, res) => {
          const supportedLocales = ["en", "es"];
          const defaultLocale = "en";

          // 1. Check saved user cookie
          const cookieLocale = req.cookies?.locale;
          if (cookieLocale && supportedLocales.includes(cookieLocale)) {
            return res.redirect(307, \`/\${cookieLocale}\`);
          }

          // 2. Check browser Accept-Language header
          const acceptLang = req.headers["accept-language"] || "";
          const browserLocale = supportedLocales.find((lang) =>
            acceptLang.toLowerCase().includes(lang)
          );

          // 3. Fallback to default
          const targetLocale = browserLocale || defaultLocale;
          return res.redirect(307, \`/\${targetLocale}\`);
        });
      },
    },
  ],
};`}</CodeBlock>
              </div>

              <div className="not-prose my-4">
                <Alert>
                  <Sparkles className="h-4 w-4" />
                  <AlertTitle>Why HTTP 307?</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    An HTTP 307 (Temporary Redirect) ensures that search engine crawlers and browser caches do not permanently store the redirect, allowing visitors to switch languages later without getting locked into their initial choice.
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            <hr className="my-8" />

            {/* OPTION A: CUSTOM DICTIONARY */}
            <section id="custom-dictionary">
              <h2>🟢 Option A: Lightweight Custom Dictionary</h2>
              <p>
                This zero-dependency pattern is ideal for websites where localized text is rendered directly within Server Components. Translations are defined in plain JavaScript/TypeScript dictionaries with zero bundle overhead.
              </p>

              <h3>1. Directory Structure</h3>
              <div className="not-prose my-4 border rounded-xl p-4 bg-slate-50 dark:bg-slate-900/50">
                <pre className="font-mono text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre">{`src/
└── [lang]/
    └── about/
        ├── page_functions.ts   # Route parameters & dictionary lookup
        └── page.tsx            # Server Component receiving translated props`}</pre>
              </div>

              <h3>2. Route Logic (<code>page_functions.ts</code>)</h3>
              <p>
                In <code>page_functions.ts</code>, define <code>getStaticPaths()</code> to declare which languages to pre-compile at build/startup time, and read <code>params.lang</code> inside <code>getProps(params)</code>:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/[lang]/about/page_functions.ts

// 1. Declare the language variants to pre-compile as static HTML
export async function getStaticPaths() {
  return [
    { lang: "en" },
    { lang: "es" },
  ];
}

// 2. Define your dictionary strings
const translations = {
  en: {
    title: "About Dinou",
    description: "Dinou is an ejectable, full-stack React 19 framework.",
    backToHome: "Back to Home",
  },
  es: {
    title: "Acerca de Dinou",
    description: "Dinou es un framework full-stack eyectable de React 19.",
    backToHome: "Volver al Inicio",
  },
};

// 3. Resolve the translation directly from route params
export async function getProps(params: { lang?: string }) {
  const lang = (params.lang === "es" ? "es" : "en") as "en" | "es";
  const t = translations[lang];

  return {
    page: {
      t,
      currentLocale: lang,
    },
  };
}`}</CodeBlock>
              </div>

              <h3>3. Page View (<code>page.tsx</code>)</h3>
              <p>
                The page component receives <code>t</code> and <code>currentLocale</code> via standard React props:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/[lang]/about/page.tsx
import { Link } from "dinou";

export default function AboutPage({
  t,
  currentLocale,
}: {
  t: { title: string; description: string; backToHome: string };
  currentLocale: string;
}) {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4 space-y-6">
      <h1 className="text-3xl font-bold">{t.title}</h1>
      <p className="text-muted-foreground">{t.description}</p>

      {/* Language Switcher */}
      <div className="flex gap-4 pt-4 border-t text-sm">
        <Link
          href="/en/about"
          className={currentLocale === "en" ? "font-bold underline" : "text-muted-foreground"}
        >
          English
        </Link>
        <Link
          href="/es/about"
          className={currentLocale === "es" ? "font-bold underline" : "text-muted-foreground"}
        >
          Español
        </Link>
      </div>
    </main>
  );
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* OPTION B: STANDARD I18NEXT */}
            <section id="i18next-standard">
              <h2>🔵 Option B: Standard i18next & Client Hooks</h2>
              <p>
                When interactive Client Components need to translate strings dynamically after hydration (e.g. inside form validations, modals, or toasts), integrate the official <code>i18next</code> and <code>react-i18next</code> libraries.
              </p>

              <h3>1. Installation</h3>
              <div className="not-prose my-4">
                <CodeBlock language="bash">{`npm install i18next react-i18next`}</CodeBlock>
              </div>

              <h3>2. Shared i18next Configuration (<code>src/lib/i18n.ts</code>)</h3>
              <p>
                Create a shared configuration file with your translation resources:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/lib/i18n.ts
import i18next from "i18next";

export const resources = {
  en: {
    translation: {
      title: "Interactive i18n Demo",
      clientMessage: "This text is translated inside a Client Component using useTranslation()!",
      save: "Save Changes",
    },
  },
  es: {
    translation: {
      title: "Demostración Interactiva de i18n",
      clientMessage: "¡Este texto se traduce dentro de un Client Component usando useTranslation()!",
      save: "Guardar Cambios",
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

// Helper for server-side fixed translations matching route parameters
export function getFixedT(lang: string) {
  return i18next.getFixedT(lang);
}`}</CodeBlock>
              </div>

              <h3>3. Route Logic (<code>page_functions.ts</code>)</h3>
              <p>
                Use <code>getFixedT(params.lang)</code> in <code>getProps</code> to pre-translate server strings:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/[lang]/interactive/page_functions.ts
import { getFixedT } from "@/lib/i18n";

export async function getStaticPaths() {
  return [
    { lang: "en" },
    { lang: "es" },
  ];
}

export async function getProps(params: { lang?: string }) {
  const lang = params.lang || "en";
  const t = getFixedT(lang);

  return {
    page: {
      title: t("title"),
      currentLocale: lang,
    },
  };
}`}</CodeBlock>
              </div>

              <h3>4. Client Provider (<code>src/components/i18n-provider.tsx</code>)</h3>
              <p>
                Wrap the Client tree in an <code>I18nextProvider</code> that synchronizes its active language whenever <code>currentLocale</code> changes:
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

              <h3>5. Client Component & Page Integration</h3>
              <p>
                Client Components can now call the <code>useTranslation()</code> hook safely:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/components/feedback-box.tsx
"use client";

import { useTranslation } from "react-i18next";

export function FeedbackBox() {
  const { t } = useTranslation();
  return (
    <div className="p-4 rounded-lg bg-muted border text-sm">
      <p>{t("clientMessage")}</p>
      <button className="mt-3 px-3 py-1.5 bg-primary text-primary-foreground rounded text-xs font-semibold">
        {t("save")}
      </button>
    </div>
  );
}`}</CodeBlock>
              </div>

              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/[lang]/interactive/page.tsx
import { I18nProvider } from "@/components/i18n-provider";
import { FeedbackBox } from "@/components/feedback-box";
import { Link } from "dinou";

export default function InteractivePage({
  title,
  currentLocale,
}: {
  title: string;
  currentLocale: string;
}) {
  return (
    <I18nProvider locale={currentLocale}>
      <main className="max-w-2xl mx-auto py-12 px-4 space-y-6">
        <h1 className="text-3xl font-bold">{title}</h1>
        <FeedbackBox />

        <div className="flex gap-4 pt-4 border-t text-sm">
          <Link href="/en/interactive">English</Link>
          <Link href="/es/interactive">Español</Link>
        </div>
      </main>
    </I18nProvider>
  );
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SERVER FUNCTIONS */}
            <section id="server-functions">
              <h2>⚡ Server Functions (Server Actions) with i18n</h2>
              <p>
                When a component triggers a Server Function (Server Action) from a localized page, pass the active language explicitly as an argument or form field. This maintains pure, testable functions without relying on hidden global server state.
              </p>

              <h3>Pattern 1: Function Argument</h3>
              <p>
                Directly pass <code>lang</code> when calling the server action from an event handler or transition:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/actions/newsletter.ts
"use server";

export async function subscribeNewsletter(lang: string, email: string) {
  // Use the active locale to send a localized confirmation email
  console.log(\`Sending \${lang} welcome email to \${email}\`);
  return { success: true };
}`}</CodeBlock>
              </div>

              <h3>Pattern 2: Form Actions with <code>.bind()</code></h3>
              <p>
                In React 19, use the standard <code>.bind()</code> pattern to pre-attach route parameters to native form actions:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/[lang]/contact/page.tsx
import { submitContactForm } from "@/actions/contact";

export default function ContactPage({ currentLocale }: { currentLocale: string }) {
  // Pre-bind currentLocale as the first argument
  const submitWithLocale = submitContactForm.bind(null, currentLocale);

  return (
    <form action={submitWithLocale} className="space-y-4">
      <input name="email" type="email" required placeholder="name@example.com" />
      <textarea name="message" required placeholder="Your message..." />
      <button type="submit">Submit</button>
    </form>
  );
}`}</CodeBlock>
              </div>

              <h3>Pattern 3: Hidden Form Input</h3>
              <p>
                Alternatively, include the locale as a standard hidden input:
              </p>

              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`<form action={submitContactForm}>
  <input type="hidden" name="lang" value={currentLocale} />
  {/* form fields */}
</form>`}</CodeBlock>
              </div>

              <div className="not-prose my-4">
                <Alert>
                  <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  <AlertTitle>Advantages of Passing Locale by Parameter</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1 space-y-1">
                    <p>• <strong>Strict Type Safety:</strong> TypeScript validates that the action receives a valid locale string.</p>
                    <p>• <strong>Testability:</strong> Unit test your Server Actions directly without having to mock Express request contexts.</p>
                    <p>• <strong>Zero Global Coupling:</strong> Functions remain pure and decoupled from server middleware lifecycles.</p>
                  </AlertDescription>
                </Alert>
              </div>
            </section>

            <hr className="my-8" />

            {/* LANGUAGE SWITCHER */}
            <section id="language-switcher">
              <h2>🌐 Language Switcher Component</h2>
              <p>
                Below is a reusable language switcher component. It uses Dinou's <code>usePathname()</code> to swap the active language prefix while keeping the user on the exact same sub-path:
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

  // Helper to replace the leading language prefix (e.g. /en/about -> /es/about)
  const getLocalizedPath = (targetLocale: string) => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length > 0 && LOCALES.some((l) => l.code === segments[0])) {
      segments[0] = targetLocale;
    } else {
      segments.unshift(targetLocale);
    }
    return "/" + segments.join("/");
  };

  const currentLocale = pathname.split("/").filter(Boolean)[0] || "en";

  return (
    <div className="inline-flex items-center gap-2 p-1 rounded-lg border bg-card text-xs">
      {LOCALES.map(({ code, label }) => (
        <Link
          key={code}
          href={getLocalizedPath(code)}
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
            </section>
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
