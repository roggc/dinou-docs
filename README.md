# Dinou Docs

Official documentation website for **[Dinou](https://github.com/roggc/dinou)** — the Web Standards-native, ejectable full-stack React 19 framework.

- **Live site:** https://dinou.dev
- **Framework repo:** https://github.com/roggc/dinou
- **npm package:** https://www.npmjs.com/package/dinou
- **LLM docs:** [llms.txt](https://dinou.dev/llms.txt) · [llms-full.txt](https://dinou.dev/llms-full.txt)

Built with **Dinou v10** itself (SSG, React 19, Tailwind CSS v4, Type-Safe Routing, and a zero-dependency `Ctrl+K` / `⌘K` search index).

## Local Development

```bash
npm install
npm run dev
```

Common scripts:

```bash
npm run dev           # Start development server (Esbuild)
npm run build         # Production build + full SSG pre-rendering
npm start             # Serve production build locally
npm run typegen       # Regenerate .dinou/types/routes.d.ts & contextual "./dinou" modules
npm run search:index  # Rebuild src/docs/lib/search-index.ts for the Ctrl+K search modal
```

## Project Structure

```text
├── src/
│   ├── page.tsx & layout.tsx            # Landing page & root layout
│   ├── components/                      # Landing sections, Header, Footer, UI primitives
│   └── docs/
│       ├── layout.tsx                   # Docs layout (DocsHeader + DocsSidebar)
│       ├── lib/docs-navigation.ts       # Sidebar navigation & DocsPager order
│       ├── lib/search-index.ts          # Auto-generated Ctrl+K search index
│       ├── components/docs-search.tsx   # Ctrl+K / ⌘K search modal
│       └── <topic>/page.tsx             # Documentation pages
├── public/                              # Static assets (og-image.png, sitemap.xml, robots.txt, llms*.txt)
├── scripts/generate-search-index.mjs    # Search index generator
└── Dockerfile                           # Standalone Bun compiled binary production image
```

## Adding or Updating a Documentation Page

1. Create or edit `src/docs/<slug>/page.tsx` with `<title>`, `<meta name="description">`, `<link rel="canonical">`, `tocItems`, and `scroll-mt-20` on section anchors.
2. If adding a new page, register it in `src/docs/lib/docs-navigation.ts`.
3. Regenerate route types and the `Ctrl+K` search index:
   ```bash
   npm run typegen
   npm run search:index
   ```
4. Update `public/sitemap.xml` and `public/llms.txt` (plus `public/llms-full.txt` for major API/concept updates).
5. Verify a clean production build with `npm run build`.

## Production Deployment (Docker)

The included `Dockerfile` compiles the site into a standalone native binary via Bun (`bun run build:bun:pure:compile`) and serves pre-rendered SSG output from `.dinou/dist2` and static assets from `.dinou/dist3` on port `8080`.

```bash
docker build -t dinou-docs .
docker run -p 8080:8080 dinou-docs
```

## License

MIT
