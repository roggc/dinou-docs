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
  Cpu,
  Boxes,
  Zap,
} from "lucide-react";

const tocItems = [
  { id: "overview", title: "💡 Overview", level: 2 },
  { id: "dynamic-routing", title: "⚡ Part 1: Dynamic Localized Routing", level: 2 },
  { id: "dynamic-custom", title: "🟢 Option 1.A: Custom Server Lookup", level: 3 },
  { id: "dynamic-standard", title: "🔵 Option 1.B: i18next & Client Hooks", level: 3 },
  { id: "static-routing", title: "🌐 Part 2: Static Localized Routing (SSG)", level: 2 },
  { id: "static-custom", title: "🟢 Option 2.A: Custom Dictionary SSG", level: 3 },
  { id: "static-standard", title: "🔵 Option 2.B: i18next SSG Resolution", level: 3 },
];

export default function Page() {
  return (
    <div className="flex-1 flex flex-col xl:flex-row w-full max-w-[100vw]">
      <main className="flex-1 py-6 lg:py-8 w-full min-w-0">
        <div className="container max-w-4xl px-4 md:px-6 mx-auto">
          {/* Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center space-x-2">
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Internationalization (i18n)
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Explore the architectural patterns for building prefix-based, search-engine-friendly localized routing in Dinou.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>In Dinou, internationalization is built on standard web primitives. You have the choice between Dynamic request-time routing or Static pre-compiled routing, using custom dictionaries or standard packages.</strong>
            </blockquote>

            {/* OVERVIEW */}
            <section id="overview">
              <h2>💡 Overview</h2>
              <p>
                Dinou provides complete flexibility for internationalization. Depending on whether you prefer dynamic request-time translations or pre-compiled static HTML pages, the configuration is structured into two main pathways:
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Zap className="h-5 w-5" />
                      <span>Part 1: Dynamic Routing (URL Rewrites)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Evaluate language at request-time. Keeps your directory structure clean (e.g. <code>src/about/page.tsx</code>). Uses Express middleware to intercept prefixes and rewrite URLs internally.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-yellow-600 dark:text-yellow-400 font-semibold">
                      <Globe className="h-5 w-5" />
                      <span>Part 2: Static Routing (SSG Prefixes)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Pre-compile independent language files at build/startup time for maximum performance. Uses folders (e.g. <code>src/[lang]/about/page.tsx</code>) matched natively by the file-system router.
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="my-8" />

            {/* PART 1: DYNAMIC ROUTING */}
            <section id="dynamic-routing">
              <h2>⚡ Part 1: Dynamic Localized Routing</h2>
              <p>
                This approach intercepts incoming language routes (like <code>/es/about</code>), extracts the locale, rewrites the URL to standard paths (<code>/about</code>) internally, and resolves the active translation dynamically at request-time.
              </p>

              <h3>Common Server Configuration</h3>
              <p>
                Eject the framework with <code>npm run eject</code>, then open <code className="text-amber-500">dinou/core/server.js</code>. Insert this prefix-aware middleware immediately after the cookie parser middleware:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/server.js
app.use(appUseCookieParser);

// 🌐 PREFIX-AWARE i18n ROUTING MIDDLEWARE
app.use((req, res, next) => {
  const match = req.path.match(/^(\/____rsc_payload(?:_old)?(?:_static)?____)?\/(es|en)(\/|$)/);
  let locale = req.cookies?.locale || "en";

  if (match) {
    const prefix = match[1] || "";
    locale = match[2];
    if (req.cookies?.locale !== locale) {
      res.cookie("locale", locale, { maxAge: 31536000000, httpOnly: true });
    }
    // Remove the language prefix internally to match standard routes
    const remaining = req.url.substring(match[0].length - 1) || "/";
    req.url = prefix + remaining;
  }

  req.locale = locale;
  next();
});`}</CodeBlock>
              </div>

              <p>
                Expose the active <code>req.locale</code> inside the request context. In <code className="text-amber-500">server.js</code>, update <code>getContext</code> and <code>getContextForServerFunctionEndpoint</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`function getContext(req, res) {
  return {
    req: {
      cookies: { ...req.cookies },
      headers: { ... },
      query: { ...req.query },
      path: req.path,
      method: req.method,
      locale: req.locale, // 👈 Expose locale to request context
    },
    res: { ... }
  };
}

function getContextForServerFunctionEndpoint(req, res) {
  return {
    req: {
      cookies: { ...req.cookies },
      headers: { ... },
      query: { ...req.query },
      path: req.path,
      method: req.method,
      locale: req.locale, // 👈 Expose locale to request context
    },
    res: { ... }
  };
}`}</CodeBlock>
              </div>

              <p>
                Also, pass the locale to the dynamic HTML compilation subprocess in the Express wildcard GET handler (<code>app.get(/^\/.*\/?$/)</code>) inside <code>contextForChild</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// In server.js wildcard route handler
const contextForChild = {
  req: {
    query: { ...req.query },
    cookies: { ...req.cookies },
    headers: { ... },
    path: req.path,
    method: req.method,
    locale: req.locale, // 👈 Propagate locale here
  },
};`}</CodeBlock>
              </div>
            </section>

            {/* OPTION 1.A */}
            <section id="dynamic-custom">
              <h3>🟢 Option 1.A: Custom Lightweight Server Lookup</h3>
              <p>
                A simple server-side lookup system. Best when translations are only used to present static text content inside Server Components with zero package dependencies.
              </p>

              <div className="not-prose my-4">
                <Alert variant="warning">
                  <AlertTitle>⚠️ Server-Only Constraint</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    This custom approach does not establish context providers or client hooks (like <code>useTranslation()</code>). If a Client Component requires localized strings, they must be resolved on the server and explicitly passed down via props.
                  </AlertDescription>
                </Alert>
              </div>

              <h4>1. Defining page_functions.ts</h4>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/about/page_functions.ts
import { getContext } from "dinou";

export function dynamic() {
  return true; // Evaluate route dynamically at request-time (to access request cookies/locale)
}

const translations = {
  en: { title: "Custom i18n", welcome: "Welcome!" },
  es: { title: "i18n Personalizado", welcome: "¡Bienvenido!" },
};

export async function getProps() {
  const ctx = getContext();
  const locale = ctx?.req?.locale || "en";
  const t = translations[locale] || translations.en;

  return {
    page: {
      t,
      currentLocale: locale,
    },
  };
}`}</CodeBlock>
              </div>

              <h4>2. Rendering inside page.tsx</h4>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/about/page.tsx
import { Link } from "dinou";

export default function Page({ t, currentLocale }) {
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.welcome}</p>
      
      <div className="flex gap-4">
        <Link href="/en/about">English</Link>
        <Link href="/es/about">Español</Link>
      </div>
    </div>
  );
}`}</CodeBlock>
              </div>
            </section>

            {/* OPTION 1.B */}
            <section id="dynamic-standard">
              <h3>🔵 Option 1.B: Standard i18next & Client Hooks</h3>
              <p>
                Integrates the official <code>i18next</code> engine. Exposes translation hooks to Client Components so they can dynamically translate strings after hydration.
              </p>

              <h4>1. Installation</h4>
              <div className="not-prose my-4">
                <CodeBlock language="bash">{`npm install i18next react-i18next`}</CodeBlock>
              </div>

              <h4>2. Server Configuration (i18n.ts)</h4>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/i18n-real/i18n.ts
import i18next from "i18next";
import { getContext } from "dinou";

if (!i18next.isInitialized) {
  i18next.init({
    resources: {
      en: {
        translation: {
          title: "Standard i18n Demo",
          clientText: "This text is translated inside a CLIENT component using useTranslation!",
        },
      },
      es: {
        translation: {
          title: "Demostración de i18n Estándar",
          clientText: "¡Este texto se traduce dentro de un componente de CLIENTE usando useTranslation!",
        },
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export function getT() {
  const ctx = getContext();
  const locale = ctx?.req?.locale || "en";
  return i18next.getFixedT(locale); // Safe for concurrent requests
}`}</CodeBlock>
              </div>

              <h4>3. Page Functions (page_functions.ts)</h4>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/i18n-real/page_functions.ts
import { getContext } from "dinou";
import { getT } from "./i18n";

export function dynamic() {
  return true; // Evaluate route dynamically at request-time (to access request cookies/locale)
}

export async function getProps() {
  const ctx = getContext();
  const locale = ctx?.req?.locale || "en";
  const t = getT();

  return {
    page: {
      title: t("title"),
      currentLocale: locale,
    },
  };
}`}</CodeBlock>
              </div>

              <h4>4. Client Context Provider (I18nProvider.tsx)</h4>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/i18n-real/I18nProvider.tsx
"use client";

import { ReactNode, useEffect } from "react";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";

const clientResources = {
  en: {
    translation: {
      title: "Standard i18n Demo",
      clientText: "This text is translated inside a CLIENT component using useTranslation!",
    },
  },
  es: {
    translation: {
      title: "Demostración de i18n Estándar",
      clientText: "¡Este texto se traduce dentro de un componente de CLIENTE usando useTranslation!",
    },
  },
};

const i18nInstance = i18next.createInstance();

export function I18nProvider({ locale, children }: { locale: string; children: ReactNode }) {
  if (!i18nInstance.isInitialized) {
    i18nInstance.init({
      resources: clientResources,
      lng: locale,
      fallbackLng: "en",
      interpolation: { escapeValue: false },
    });
  }

  useEffect(() => {
    if (i18nInstance.language !== locale) {
      i18nInstance.changeLanguage(locale);
    }
  }, [locale]);

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}`}</CodeBlock>
              </div>

              <h4>5. Consuming in Client Components (ClientComponent.tsx)</h4>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/i18n-real/ClientComponent.tsx
"use client";

import { useTranslation } from "react-i18next";

export default function ClientComponent() {
  const { t } = useTranslation();
  return <div>{t("clientText")}</div>;
}`}</CodeBlock>
              </div>

              <h4>6. Page Integration (page.tsx)</h4>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/i18n-real/page.tsx
import { Link } from "dinou";
import { I18nProvider } from "./I18nProvider";
import ClientComponent from "./ClientComponent";

export default function Page({ title, currentLocale }) {
  return (
    <I18nProvider locale={currentLocale}>
      <div>
        <h1>{title}</h1>
        <ClientComponent />
        <div className="flex gap-4">
          <Link href="/en/i18n-real">English</Link>
          <Link href="/es/i18n-real">Español</Link>
        </div>
      </div>
    </I18nProvider>
  );
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* PART 2: STATIC ROUTING */}
            <section id="static-routing">
              <h2>🌐 Part 2: Static Localized Routing (SSG)</h2>
              <p>
                Instead of rewriting URLs, pages are nested inside a dynamic folder structure (e.g. <code>src/[lang]/about/page.tsx</code>) and pre-compiled during server startup into static HTML files via <code>getStaticPaths()</code>.
              </p>

              <h3>Simplified Server Middleware</h3>
              <p>
                Since the file-system router naturally matches the route prefix folder structure, we do <strong>not</strong> need to rewrite request paths. The middleware only updates cookies and sets <code>req.locale</code> for dynamic hooks:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/server.js
app.use((req, res, next) => {
  const match = req.path.match(/^(\/____rsc_payload(?:_old)?(?:_static)?____)?\/(es|en)(\/|$)/);
  let locale = req.cookies?.locale || "en";

  if (match) {
    locale = match[2];
    if (req.cookies?.locale !== locale) {
      res.cookie("locale", locale, { maxAge: 31536000000, httpOnly: true });
    }
    // 🚨 NOTE: No URL rewriting is needed here!
  }

  req.locale = locale;
  next();
});`}</CodeBlock>
              </div>
            </section>

            {/* OPTION 2.A */}
            <section id="static-custom">
              <h3>🟢 Option 2.A: Custom Dictionary SSG Lookup</h3>
              <p>
                Uses a custom translations dictionary within dynamic parameters. Fully compiled at build/startup time for maximum speed.
              </p>

              <h4>1. Defining page_functions.ts</h4>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/[lang]/about/page_functions.ts

// 1. Tell Dinou which language paths to pre-compile as static HTML files at startup
export async function getStaticPaths() {
  return [
    { lang: "en" },
    { lang: "es" },
  ];
}

const translations = {
  en: { title: "Static i18n Page", welcome: "Statically compiled!" },
  es: { title: "Página de i18n Estática", welcome: "¡Compilado estáticamente!" },
};

// 2. Read the lang parameter directly from the route parameters
export async function getProps({ params }) {
  const lang = params.lang || "en";
  const t = translations[lang] || translations.en;

  return {
    page: {
      t,
      currentLocale: lang,
    },
  };
}`}</CodeBlock>
              </div>

              <h4>2. Rendering inside page.tsx</h4>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/[lang]/about/page.tsx
import { Link } from "dinou";

export default function Page({ t, currentLocale }) {
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.welcome}</p>
      <div className="flex gap-4">
        <Link href="/en/about">English</Link>
        <Link href="/es/about">Español</Link>
      </div>
    </div>
  );
}`}</CodeBlock>
              </div>
            </section>

            {/* OPTION 2.B */}
            <section id="static-standard">
              <h3>🔵 Option 2.B: Standard i18next SSG Resolution</h3>
              <p>
                Utilizes the <code>i18next</code> package inside a static pre-compiled context by leveraging <code>i18next.getFixedT(lang)</code>.
              </p>

              <h4>1. Defining page_functions.ts</h4>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/[lang]/about/page_functions.ts
import i18next from "i18next";

// Ensure i18next is initialized for the static compilation run
if (!i18next.isInitialized) {
  i18next.init({
    resources: {
      en: {
        translation: {
          title: "Static Page (i18next)",
          welcome: "This HTML page was pre-compiled statically via i18next!",
        },
      },
      es: {
        translation: {
          title: "Página Estática (i18next)",
          welcome: "¡Esta página se pre-compiló estáticamente con i18next!",
        },
      },
    },
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
}

export async function getStaticPaths() {
  return [
    { lang: "en" },
    { lang: "es" },
  ];
}

export async function getProps({ params }) {
  const lang = params.lang || "en";
  const t = i18next.getFixedT(lang); // Get translation function fixed to route parameter lang

  return {
    page: {
      title: t("title"),
      welcome: t("welcome"),
      currentLocale: lang,
    },
  };
}`}</CodeBlock>
              </div>

              <h4>2. Rendering inside page.tsx</h4>
              <p>
                In the page file, render the pre-translated props and wrap the tree in the client provider if client components also need translations:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/[lang]/about/page.tsx
import { Link } from "dinou";
import { I18nProvider } from "../../i18n-real/I18nProvider"; // Import client provider
import ClientComponent from "../../i18n-real/ClientComponent"; // Client component using hooks

export default function Page({ title, welcome, currentLocale }) {
  return (
    <I18nProvider locale={currentLocale}>
      <div>
        <h1>{title}</h1>
        <p>{welcome}</p>
        
        {/* Translates correctly on the client side using useTranslation hooks */}
        <ClientComponent />

        <div className="flex gap-4">
          <Link href="/en/about">English</Link>
          <Link href="/es/about">Español</Link>
        </div>
      </div>
    </I18nProvider>
  );
}`}</CodeBlock>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Sidebar TOC - Hidden on Mobile */}
      <aside className="hidden xl:block w-64 pl-8 py-6 lg:py-8 shrink-0">
        <div className="sticky top-20">
          <TableOfContents items={tocItems} />
        </div>
      </aside>
    </div>
  );
}
