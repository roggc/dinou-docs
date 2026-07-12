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
} from "lucide-react";

const tocItems = [
  { id: "concept", title: "💡 Core Concept", level: 2 },
  { id: "server-setup", title: "🌐 1. Server Setup (Common)", level: 2 },
  { id: "option-a", title: "🟢 Option A: Custom Lightweight i18n", level: 2 },
  { id: "option-b", title: "🔵 Option B: Standard Package-Based i18n", level: 2 },
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
              Explore how to build prefix-based, search-engine-friendly localized routing in Dinou using either custom lightweight structures or standard industry packages.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>Dinou gives you total control over the server. By intercepting paths in Express, you can extract locales, manage cookies, and serve localized pages via dynamic Server Components and hydrated Client Components.</strong>
            </blockquote>

            <section id="concept">
              <h2>💡 Core Concept</h2>
              <p className="lead">
                Depending on the scope of your application, you can adopt two different paradigms for localization:
              </p>

              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold">
                      <Cpu className="h-5 w-5" />
                      <span>🟢 Custom Lightweight (Server Only)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Best for simple sites. Zero bundle-size footprint. Translation lookup files are resolved exclusively on the server, injecting pre-translated texts straight into Server Components.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Boxes className="h-5 w-5" />
                      <span>🔵 Standard (i18next & Client Hooks)</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Best for complex apps. Connects the robust <code>i18next</code> engine to React Server Components and exposes standard hooks like <code>useTranslation()</code> in Client Components.
                  </CardContent>
                </Card>
              </div>
            </section>

            <hr className="my-8" />

            {/* SECTION 1: COMMON SERVER SETUP */}
            <section id="server-setup">
              <h2>🌐 1. Server Setup (Common)</h2>
              <p>
                Both options rely on the same fundamental server middleware to intercept URL language segments (like <code>/es/dashboard</code> or <code>/en/dashboard</code>), rewrite paths internally for the router, and pass the detected locale to the page compiler.
              </p>

              <h3>Express Routing Middleware</h3>
              <p>
                Eject the framework with <code>npm run eject</code>, then open <code className="text-amber-500">dinou/core/server.js</code>. Insert this prefix-aware middleware immediately after the cookie parser middleware:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/server.js
app.use(appUseCookieParser);

// ============================================================
// 🌐 PREFIX-AWARE i18n ROUTING MIDDLEWARE
// ============================================================
app.use((req, res, next) => {
  // Matches language prefix, supporting HTML requests and RSC payload transitions
  const match = req.path.match(/^(\/____rsc_payload(?:_old)?(?:_static)?____)?\/(es|en)(\/|$)/);
  let locale = req.cookies?.locale || "en";

  if (match) {
    const prefix = match[1] || "";
    locale = match[2];
    if (req.cookies?.locale !== locale) {
      res.cookie("locale", locale, { maxAge: 31536000000, httpOnly: true });
    }
    // Remove the language prefix internally to match file-system routes
    const remaining = req.url.substring(match[0].length - 1) || "/";
    req.url = prefix + remaining;
  }

  req.locale = locale;
  next();
});`}</CodeBlock>
              </div>

              <h3>Context Configuration</h3>
              <p>
                Propagate the resolved <code>locale</code> context down to the AsyncLocalStorage request scope. In <code className="text-amber-500">dinou/core/server.js</code>, update <code>getContext</code> and <code>getContextForServerFunctionEndpoint</code>:
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
      locale: req.locale, // 👈 Add locale to request context
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
      locale: req.locale, // 👈 Add locale to request context
    },
    res: { ... }
  };
}`}</CodeBlock>
              </div>

              <p>
                Additionally, pass the locale down to the HTML compilation subprocess in the Express wildcard GET handler (<code>app.get(/^\/.*\/?$/)</code>) to prevent hydration mismatches during hard-reloads:
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

            <hr className="my-8" />

            {/* SECTION 2: OPTION A: CUSTOM */}
            <section id="option-a">
              <h2>🟢 Option A: Custom Lightweight i18n</h2>
              <p>
                A zero-dependency server lookup system. Best when translations are only used to present static text content inside Server Components.
              </p>

              <div className="not-prose my-4">
                <Alert variant="warning">
                  <AlertTitle>⚠️ Server-Only Constraint</AlertTitle>
                  <AlertDescription className="text-xs text-muted-foreground mt-1">
                    This custom approach does not establish context providers or client hooks (like <code>useTranslation()</code>). If a Client Component requires localized strings, they must be resolved on the server and explicitly passed down via props, which can lead to prop-drilling in larger component hierarchies.
                  </AlertDescription>
                </Alert>
              </div>

              <h3>1. Defining page_functions.ts</h3>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`import { getContext } from "dinou";

export function dynamic() {
  return true; // Force request-time rendering to access context dynamically
}

const translations = {
  en: {
    title: "Custom i18n Showcase",
    welcome: "Welcome!",
  },
  es: {
    title: "Showcase de i18n Custom",
    welcome: "¡Bienvenido!",
  },
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

              <h3>2. Rendering inside page.tsx</h3>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`import { Link } from "dinou";

export default function Page({ t, currentLocale }) {
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.welcome}</p>
      
      {/* Switch locales via standard SPA soft transitions */}
      <div className="flex gap-4">
        <Link href="/en/i18n-demo">English</Link>
        <Link href="/es/i18n-demo">Español</Link>
      </div>
    </div>
  );
}`}</CodeBlock>
              </div>
            </section>

            <hr className="my-8" />

            {/* SECTION 3: OPTION B: STANDARD */}
            <section id="option-b">
              <h2>🔵 Option B: Standard Package-Based i18n</h2>
              <p>
                Integrates the official <code>i18next</code> engine. Exposes translation hooks to Client Components so they can dynamically translate strings after hydration.
              </p>

              <h3>1. Installation</h3>
              <div className="not-prose my-4">
                <CodeBlock language="bash">{`npm install i18next react-i18next`}</CodeBlock>
              </div>

              <h3>2. Server Configuration (i18n.ts)</h3>
              <p>
                Initialize the server instance of <code>i18next</code>. Provide a helper <code>getT()</code> to obtain request-scoped fixed translation functions locked to the active request context:
              </p>
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
  return i18next.getFixedT(locale);
}`}</CodeBlock>
              </div>

              <h3>3. Page Functions (page_functions.ts)</h3>
              <p>
                Read the active locale from the request context and resolve translations on the server using <code>getT()</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`// src/i18n-real/page_functions.ts
import { getContext } from "dinou";
import { getT } from "./i18n";

export function dynamic() {
  return true; // Force SSR at request-time to load dynamic locale from context
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

              <h3>4. Client Context Provider (I18nProvider.tsx)</h3>
              <p>
                Create a Client Component wrapping the app tree. Synchronize the locale within a <code>useEffect</code> hook to prevent React state update warnings during render phase transitions:
              </p>
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

              <h3>5. Consuming in Client Components (ClientComponent.tsx)</h3>
              <p>
                You can now use standard <code>useTranslation</code> hooks from <code>react-i18next</code>:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`// src/i18n-real/ClientComponent.tsx
"use client";

import { useTranslation } from "react-i18next";

export default function ClientComponent() {
  const { t } = useTranslation();
  return <div>{t("clientText")}</div>;
}`}</CodeBlock>
              </div>

              <h3>6. Page Integration (page.tsx)</h3>
              <p>
                In the page file, wrap the component tree with the <code>I18nProvider</code>:
              </p>
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
        
        {/* Render interactive client component using translation hooks */}
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
