// scripts/generate-search-index.mjs
// Generates src/docs/lib/search-index.ts from src/docs/lib/docs-navigation.ts
// and every documentation page's <meta name="description"> + tocItems.

import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const navPath = path.join(rootDir, "src/docs/lib/docs-navigation.ts");
const outPath = path.join(rootDir, "src/docs/lib/search-index.ts");

// High-value synonyms & keywords per route so everyday searches always land on the best doc
const ROUTE_KEYWORDS = {
  "/docs": ["overview", "architecture", "react 19", "dual-bundle", "rsc", "0-fork", "web standards"],
  "/docs/getting-started": ["install", "setup", "create-dinou", "tsconfig", "rootDirs", "dinou-env.d.ts", "quickstart"],
  "/docs/routing": ["file-system", "dynamic", "catch-all", "optional", "route groups", "parallel routes", "slots", "@slot", "layout", "no_layout", "reset_layout", "error.tsx", "not_found.tsx", "404", "_folder", "underscore", "private folders"],
  "/docs/navigation": ["Link", "useRouter", "usePathname", "useSearchParams", "query", "redirect", "ClientRedirect", "fresh", "prefetch", "useNavigationLoading", "spa", "relative"],
  "/docs/type-safe-routing": ["typegen", "routes.d.ts", "./dinou", "ROUTE", "PageProps", "LayoutProps", "SlotProps", "ErrorProps", "NotFoundProps", "PageFunctions", "LayoutFunctions", "RouteParams", "DinouLinkTarget", "params", "from"],
  "/docs/server-client-components": ["rsc", "use client", "hydration", "composition", "serialization", "streaming"],
  "/docs/page-functions": ["page_functions.ts", "layout_functions.ts", "getProps", "revalidate", "ppr", "getStaticPaths", "validateParams", "getCacheTags", "allowISG"],
  "/docs/rendering": ["ssg", "isg", "isr", "ssr", "dynamic", "static", "ppr", "partial prerendering", "suspense", "bailout", "noDynamic", "streaming"],
  "/docs/3d-segmentation": ["DinouCacheSlot", "micro-isr", "refreshSlot", "horizontal", "vertical", "ppr", "noDynamic", "holes", "slots"],
  "/docs/server-functions": ["use server", "server actions", "rpc", "forms", "useActionState", "useFormStatus", "useOptimistic", "closures", "ui streaming", "callServer"],
  "/docs/request-context": ["getContext", "AsyncLocalStorage", "cookies", "headers", "req.path", "rawPath", "isRscRequest", "req.query", "res.cookie", "res.clearCookie", "res.setHeader", "res.status", "env", "ctx", "waitUntil", "bailout", "DinouEnv"],
  "/docs/revalidation": ["revalidatePath", "revalidatePage", "revalidateLayout", "revalidateTag", "refreshSlot", "StorageAdapter", "FileSystemStorage", "RedisStorage", "CloudflareKVStorage", "DenoKVStorage", "MemoryStorage", "setStorageAdapter", "getStorageAdapter"],
  "/docs/data-fetching": ["promise", "use()", "suspense", "14 strategies", "fetching", "database", "prisma", "drizzle"],
  "/docs/pattern": ["architecture", "best practices", "mental model", "dinou pattern"],
  "/docs/compiler": ["react compiler", "babel-plugin-react-compiler", "reactCompiler", "use no memo", "reactStrictMode", "memoization"],
  "/docs/public": ["static files", "robots.txt", "sitemap.xml", "manifest.json", "pwa", "well-known", "favicons", "206", "byte-range", "video", "audio", "llms.txt"],
  "/docs/styles": ["css", "tailwind", "tailwind v4", "css modules", "postcss", "url()", "global css"],
  "/docs/assets": ["images", "fonts", "woff2", "video", "audio", "glb", "wasm", "assetExtensions", "fingerprinting", "dinou/env"],
  "/docs/env-vars": ["environment variables", "secrets", "DINOU_PUBLIC_", ".env", ".env.local", "process.env", "getContext().env", "cloudflare bindings", "kv", "d1", "r2", "deno", "netlify"],
  "/docs/alias": ["tsconfig.json", "jsconfig.json", "paths", "@/", "extends", "configDir", "./dinou", "rootDirs"],
  "/docs/plugins": ["dinou.config.ts", "defineConfig", "DinouPlugin", "onRequest", "configureServer", "setupFiles", "middleware", "webhooks", "websockets", "socket.io", "cors", "helmet", "allowISG", "aot"],
  "/docs/bundlers": ["esbuild", "rollup", "webpack", "vendoring", "unvendorized", "-u", "DINOU_UNVENDORIZED", "cli", "scripts", "build:netlify", "build:cloudflare", "build:deno", "build:bun"],
  "/docs/deployment": ["deploy", "node", "docker", "dockerfile", "netlify", "netlify.toml", "cloudflare", "wrangler.toml", "workers", "deno", "bun", "compile", "binary", "export-static", "static export"],
  "/docs/eject": ["eject", "uneject", "build:vendors", "sovereignty", "reversible", "custom"],
  "/docs/api-reference": ["api", "reference", "exports", "signatures", "dinou", "dinou/server", "dinou/config"],
  "/docs/cheatsheet": ["cheatsheet", "quick reference", "summary", "commands", "cli"],
  "/docs/i18n": ["internationalization", "localization", "locale", "translations", "multilingual", "language"],
  "/docs/clerk": ["auth", "authentication", "clerk", "jwt", "session", "webhooks", "svix", "login", "protected routes"],
  "/docs/migration": ["upgrade", "migration", "changelog", "breaking changes"],
  "/docs/migration/v9-to-v10": ["v10", "breaking changes", "_folder", "ppr", "wrangler.toml", "netlify.toml", "favicons", "DINOU_PUBLIC_", "typegen", "uneject"],
  "/docs/migration/v8-to-v9": ["v9", "vendoring", "-u", "unvendorized", "subpath imports"],
  "/docs/migration/v7-to-v8": ["v8", "esm", "module"],
  "/docs/migration/v6-to-v7": ["v7", "dual-bundle", "revalidate", "getProps", "ppr", "DinouCacheSlot"],
  "/docs/migration/v5-to-v6": ["v6", ".dinou"],
  "/docs/migration/v4-to-v5": ["v5", "flight", "streaming", "plugins"],
  "/docs/about": ["about", "author", "history", "community", "license", "github"],
};

function decodeHtmlEntities(str) {
  return str
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&ndash;/g, "–")
    .replace(/&mdash;/g, "—")
    .replace(/&rarr;/g, "→")
    .replace(/\\"/g, '"')
    .replace(/\\'/g, "'")
    .trim();
}

function parseNavigation(source) {
  const sections = [];
  const sectionRegex = /\{\s*title:\s*"([^"]+)",\s*items:\s*\[([\s\S]*?)\],\s*\}/g;
  let secMatch;
  while ((secMatch = sectionRegex.exec(source)) !== null) {
    const sectionTitle = secMatch[1];
    const itemsBlock = secMatch[2];
    const itemRegex = /\{\s*title:\s*"([^"]+)",\s*href:\s*"([^"]+)"/g;
    let itemMatch;
    while ((itemMatch = itemRegex.exec(itemsBlock)) !== null) {
      sections.push({
        section: sectionTitle,
        title: itemMatch[1],
        href: itemMatch[2],
      });
    }
  }
  return sections;
}

function resolvePageFile(href) {
  const rel = href.replace(/^\/+/, "");
  return path.join(rootDir, "src", rel, "page.tsx");
}

function extractDescription(source) {
  const metaMatch = source.match(
    /<meta\s+name="description"\s+content="([^"]+)"/s
  );
  return metaMatch ? decodeHtmlEntities(metaMatch[1].replace(/\s+/g, " ")) : "";
}

function extractTocItems(source) {
  const tocBlockMatch = source.match(/const\s+tocItems\s*=\s*\[([\s\S]*?)\];/);
  if (!tocBlockMatch) return [];
  const block = tocBlockMatch[1];
  const items = [];
  // Matches objects with id, title (single or double quoted), and level in any formatting
  const entryRegex =
    /\{\s*id:\s*["']([^"']+)["']\s*,\s*title:\s*(?:"((?:[^"\\]|\\.)*)"|'((?:[^'\\]|\\.)*)')\s*,\s*level:\s*(\d+)\s*,?\s*\}/g;
  let m;
  while ((m = entryRegex.exec(block)) !== null) {
    const id = m[1];
    const rawTitle = m[2] !== undefined ? m[2] : m[3];
    const level = Number(m[4]);
    items.push({
      id,
      title: decodeHtmlEntities(rawTitle),
      level,
    });
  }
  return items;
}

const navSource = fs.readFileSync(navPath, "utf8");
const pages = parseNavigation(navSource);

const searchItems = [];

for (const page of pages) {
  const pageFile = resolvePageFile(page.href);
  if (!fs.existsSync(pageFile)) {
    throw new Error(`Missing page file for route ${page.href}: ${pageFile}`);
  }
  const source = fs.readFileSync(pageFile, "utf8");
  const description = extractDescription(source);
  const keywords = ROUTE_KEYWORDS[page.href] || [];

  // 1. Page-level entry
  searchItems.push({
    id: `page:${page.href}`,
    title: page.title,
    href: page.href,
    section: page.section,
    pageTitle: page.title,
    kind: "page",
    ...(description ? { description } : {}),
    ...(keywords.length > 0 ? { keywords } : {}),
  });

  // 2. Section / API symbol entries from tocItems
  const tocItems = extractTocItems(source);
  const isApiRef = page.href === "/docs/api-reference";
  for (const toc of tocItems) {
    const kind = isApiRef && toc.level === 3 ? "api" : "section";
    searchItems.push({
      id: `toc:${page.href}#${toc.id}`,
      title: toc.title,
      href: `${page.href}#${toc.id}`,
      section: page.section,
      pageTitle: page.title,
      kind,
    });
  }
}

const tsOutput = `// Auto-generated by scripts/generate-search-index.mjs — do not edit manually.
// Re-run \`node scripts/generate-search-index.mjs\` after adding or renaming docs sections.

export type DocSearchKind = "page" | "section" | "api";

export interface DocSearchItem {
  id: string;
  title: string;
  href: string;
  section: string;
  pageTitle: string;
  kind: DocSearchKind;
  description?: string;
  keywords?: string[];
}

export const docSearchIndex: DocSearchItem[] = ${JSON.stringify(searchItems, null, 2)};
`;

fs.writeFileSync(outPath, tsOutput, "utf8");

const counts = {
  pages: searchItems.filter((i) => i.kind === "page").length,
  apis: searchItems.filter((i) => i.kind === "api").length,
  sections: searchItems.filter((i) => i.kind === "section").length,
  total: searchItems.length,
};
console.log(
  `Generated ${path.relative(rootDir, outPath)} (${counts.total} items: ${counts.pages} pages, ${counts.apis} API symbols, ${counts.sections} sections)`
);
