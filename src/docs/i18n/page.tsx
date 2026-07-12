"use client";

import { TableOfContents } from "@/docs/components/table-of-contents";
import { Card, CardContent, CardHeader } from "@/docs/components/ui/card";
import { CodeBlock } from "@/docs/components/code-block";
import {
  Globe,
  Cpu,
} from "lucide-react";

const tocItems = [
  { id: "concept", title: "💡 Core Concept", level: 2 },
  { id: "server-middleware", title: "🌐 1. Server Middleware & URL Rewriting", level: 2 },
  { id: "context-propagation", title: "📦 2. Propagating Context to RSC", level: 2 },
  { id: "consuming-translations", title: " Consuming Translations", level: 2 },
  { id: "routing-links", title: "🔗 4. Creating Router Links", level: 2 },
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
                Custom Internationalization
              </h1>
            </div>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Learn how to implement a native, lightweight, and zero-client-bundle internationalization routing system in an ejected Dinou application.
            </p>
          </div>

          <div className="prose prose-slate dark:prose-invert max-w-none w-full break-words">
            <blockquote>
              <strong>In Dinou, internationalization is built on standard web primitives. Instead of adding heavy client-side libraries, i18n is achieved simply by intercepting and rewriting requests in Express.js.</strong>
            </blockquote>

            <p className="lead">
              Since Dinou is fully ejectable, the entire server implementation is at your disposal. By writing a small middleware in Express, you can intercept language prefixes, handle routing, persist the language in cookies, and supply the active locale to React Server Components with zero JavaScript bundle overhead on the client.
            </p>

            <hr className="my-8" />

            <section id="concept">
              <h2>💡 Core Concept</h2>
              <p>
                The i18n implementation operates entirely at the server level:
              </p>
              <div className="grid gap-6 md:grid-cols-2 not-prose my-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold">
                      <Globe className="h-5 w-5" />
                      <span>URL Rewriting</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Express middleware intercepts incoming requests containing language prefixes (like <code>/es/about</code> or <code>/en/about</code>), extracts the locale, updates cookies, and rewrites the request path to clean segments (e.g. <code>/about</code>) for the file-system router.
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-semibold">
                      <Cpu className="h-5 w-5" />
                      <span>Zero Client Overhead</span>
                    </div>
                  </CardHeader>
                  <CardContent className="text-sm text-muted-foreground">
                    Translations are resolved and injected as static text on the server (RSC). The client browser receives pre-translated texts directly, eliminating the need to bundle complex translation libraries or localization catalog files in client-side bundles.
                  </CardContent>
                </Card>
              </div>
            </section>

            <section id="server-middleware">
              <h2>🌐 1. Server Middleware & URL Rewriting</h2>
              <p>
                After running <code>npm run eject</code>, open your local <code className="text-amber-500">dinou/core/server.js</code> file. Add the native internationalization middleware directly after the cookie parser middleware:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// dinou/core/server.js

app.use(appUseCookieParser);

// ============================================================
// 🌐 NATIVE INTERNATIONALIZATION (i18n) MIDDLEWARE
// ============================================================
app.use((req, res, next) => {
  // Matches language prefix, supporting both HTML routes and client-side RSC payload fetches
  const match = req.path.match(/^(\/____rsc_payload(?:_old)?(?:_static)?____)?\/(es|en)(\/|$)/);
  let locale = req.cookies?.locale || "en";

  if (match) {
    const prefix = match[1] || "";
    locale = match[2];
    if (req.cookies?.locale !== locale) {
      res.cookie("locale", locale, { maxAge: 31536000000, httpOnly: true });
    }
    // Rewrite path to remove the language prefix for the internal routing engine
    const remaining = req.url.substring(match[0].length - 1) || "/";
    req.url = prefix + remaining;
  }

  req.locale = locale;
  next();
});`}</CodeBlock>
              </div>
            </section>

            <section id="context-propagation">
              <h2>📦 2. Propagating Context to RSC</h2>
              <p>
                To access the active language from React Server Components, we expose the detected <code>req.locale</code> property in the AsyncLocalStorage context inside <code className="text-amber-500">dinou/core/server.js</code>.
              </p>
              <h3>Updating getContext Functions</h3>
              <p>
                Locate <code>getContext</code> and <code>getContextForServerFunctionEndpoint</code> in <code>server.js</code> and add the <code>locale: req.locale</code> property:
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
      locale: req.locale, // 👈 Propagate locale here
    },
    res: { ... }
  };
}`}</CodeBlock>
              </div>

              <h3>Updating Subprocess Context for dynamic HTML Rendering</h3>
              <p>
                In the wildcard route handler where <code>contextForChild</code> is created, ensure <code>locale: req.locale</code> is serialized so that the HTML compiler subprocess is aware of the active language:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="javascript">{`// In server.js wildcard handler (app.get(/^\/.*\/?$/))
const contextForChild = {
  req: {
    query: { ...req.query },
    cookies: { ...req.cookies },
    headers: { ... },
    path: req.path,
    method: req.method,
    locale: req.locale, // 👈 Map locale for the child process
  },
};`}</CodeBlock>
              </div>
            </section>

            <section id="consuming-translations">
              <h2> Consuming Translations</h2>
              <p>
                Now you can read the active locale in any Server Component or Page Function using the native <code>getContext</code> API.
              </p>
              <h3>Inside page_functions.ts</h3>
              <div className="not-prose my-4">
                <CodeBlock language="typescript">{`import { getContext } from "dinou";

export function dynamic() {
  return true; // Force SSR at request-time to load dynamic locale from context
}

const translations = {
  en: {
    title: "Internationalization Demo",
    description: "Welcome to the Dinou framework internationalization showcase page.",
  },
  es: {
    title: "Demostración de Internacionalización",
    description: "Bienvenido a la página de demostración de internacionalización del framework Dinou.",
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

              <h3>Inside page.tsx</h3>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`export default function Page({ t, currentLocale }) {
  return (
    <div>
      <h1>{t.title}</h1>
      <p>{t.description}</p>
      <span>Active Language: {currentLocale}</span>
    </div>
  );
}`}</CodeBlock>
              </div>
            </section>

            <section id="routing-links">
              <h2>🔗 4. Creating Router Links</h2>
              <p>
                To change language, simply use the native <code>Link</code> component from <code>dinou</code>. Because the client-side router and Express middleware support prefix rewrites, soft SPA transitions will work automatically:
              </p>
              <div className="not-prose my-4">
                <CodeBlock language="tsx">{`import { Link } from "dinou";

export default function LanguageSelector({ currentLocale }) {
  return (
    <div className="flex gap-4">
      <Link href="/en/about" className={currentLocale === 'en' ? 'active' : ''}>
        English
      </Link>
      <Link href="/es/about" className={currentLocale === 'es' ? 'active' : ''}>
        Español
      </Link>
    </div>
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
