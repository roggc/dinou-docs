# Dinou `v9.4.0` & `dinou-docs` Pre-Release Audit Guide (`auditory.md`)

## 1. Purpose & Auditor Mindset

You are acting as the **Lead Framework Auditor & Co-Architect** for **Dinou `v9.4.0`** (prior to publishing `dinou@9.4.0` to npm) and its official documentation site (`dinou-docs`).

Your role goes far beyond proofreading documentation prose. Every documentation route in `dinou-docs` is a **forcing function to audit the underlying `dinou` framework implementation itself**.

Adopt and maintain these core principles on every single route:

1. **Code Truth Over Assumptions (Zero Guessing)**:
   - Never assume how Dinou works from memory or from what `page.tsx` currently says.
   - Before validating or editing any documentation page, **read the actual implementation files in `dinou`** (`./dinou/` when ejected in the workspace root, or `./node_modules/dinou/` when in library mode).
2. **Framework Bugs Come First (Never Document Around a Bug)**:
   - If `page.tsx` describes a feature (or if inspecting `dinou` reveals an edge case) where `dinou` is buggy, inconsistent, insecure, or incomplete, **do not paper over it in the docs**. Diagnose the root cause in `dinou`, design the cleanest architectural fix, align with the user when architectural trade-offs exist, and fix `dinou` itself.
3. **Full Matrix Parity (3 Bundlers × 4 Runtimes × Dev/Prod/Static-Export)**:
   - Every feature and fix in `dinou` must be verified across:
     - **All 3 Bundlers**: `esbuild` (`dinou/esbuild/`), `rollup` (`dinou/rollup/`), and `webpack` (`dinou/webpack/`).
     - **All 4 Production Runtimes**: `Node.js` (`dinou/node/`, `dinou/adapters/node.js`, `dinou/adapters/netlify.js`), `Bun` (`dinou/bun/`, `dinou/adapters/bun.js`), `Deno` (`dinou/deno/`, `dinou/adapters/deno.js`), and `Cloudflare Workers` (`dinou/cloudflare/`, `dinou/adapters/cloudflare.js`).
     - **All Execution Modes**: `dinou dev` (in-memory VFS + optional `DINOU_WRITE_TO_DISK=true`), `dinou build` + `dinou start`, and `dinou export-static` (`out/`).
     - **TypeScript Definitions**: `dinou/index.d.ts`, `dinou/env.d.ts`, `dinou/server.d.ts`, and `dinou/core/generate-route-types.js` (`.dinou/types/routes.d.ts` and `.dinou/routes/**/dinou.d.ts`).
4. **Architectural Cleanliness & Root-Cause Thinking**:
   - Prefer clean structural invariants (e.g., physical directory isolation, single shared core helpers with zero runtime-incompatible imports, deterministic behavior) over ad-hoc patches or bundler-specific workarounds.

---

## 2. Language & Communication Protocol

- **User Conversation Language**: **Spanish** (always reply to the user in clear, concise, natural Spanish).
- **Code, Comments, Docs & Handoff `.md` Language**: **English** (all `.ts`, `.tsx`, `.js`, `.jsx`, and `.md` files in the repository must be written in English).
- **Clickable File Links**: Always use clickable GitHub-style `file://` links with forward slashes on Windows (e.g., `[page.tsx](file:///c:/Users/roggc/dev/my-dinou-apps/dinou-docs/src/docs/styles/page.tsx#L1-L20)`).
- **Collaborative Decisions**: If you uncover an architectural issue with multiple viable designs or breaking config implications (e.g., `wrangler.toml`, `netlify.toml`, `dinou.config.ts`, CLI flags), present a crisp root-cause analysis and concrete options in Spanish so the user can choose before large refactors.
- **Pacing**: Audit **one route at a time** in the exact order of `src/docs/lib/docs-navigation.ts`. Complete all verification and handoff docs for the current route, present the summary to the user, update Section 7 of this `auditory.md` file, and wait for confirmation before advancing to the next route.

---

## 3. Ejected vs. Non-Ejected (`Library`) Workflow

The user periodically syncs upstream `dinou` fixes, tests `dinou-docs` in non-ejected mode (`node_modules/dinou`), or ejects Dinou (`./dinou/` in repo root) when framework changes are needed:

1. **Always check workspace mode first**:
   - Check if `c:\Users\roggc\dev\my-dinou-apps\dinou-docs\dinou` exists.
   - **If `./dinou/` exists (Ejected Mode)**: Read and edit framework files directly inside `./dinou/`. (`package.json` points `"dinou": "file:./dinou"` and scripts invoke `node dinou/cli.js ...`).
   - **If `./dinou/` does NOT exist (Library Mode)**: Read framework files from `./node_modules/dinou/` (note: check whether files live at `node_modules/dinou/` or `node_modules/dinou/dinou/`). Never silently edit `node_modules/` as a permanent fix—if a `dinou` bug fix is required while in library mode, inform the user or run `npx dinou eject` (with user alignment) so fixes are developed cleanly in `./dinou/` and documented in an `x-*.md` handoff file.
2. **Upstream Sync & E2E Verification Pipeline (`dinou-docs` -> `dinou-e2e` -> `dinou`)**:
   - After fixes are developed in `dinou-docs/dinou/` and documented in `x-<topic>-fixes.md`, the user copies ONLY the `./dinou/` folder into `dinou-e2e/dinou/` (where Dinou ALSO runs in ejected mode without root package files like `<pkgRoot>/eject.js`), runs all unit/Playwright tests and GitHub Actions in `dinou-e2e`, and once green, copies `dinou-e2e/dinou/` into the upstream `dinou` repository.
   - Therefore, **all test suites in `x-<topic>-fixes.md` must resolve `./dinou/` first** (`path.resolve(process.cwd(), "dinou")`, with fallback to `node_modules/dinou/dinou`) and never depend on files outside `./dinou/` existing at the root of `dinou-e2e`.

---

## 4. Mandatory Upstream Handoff Specification (`x-<topic>-fixes.md`)

Whenever **any** bug fix, parity improvement, or architectural change is made to `dinou/` during a route audit, you **must** create (or update) an English handoff markdown document in the repository root named `x-<topic>-fixes.md` (matching the existing `x-*.md` series, e.g., `x-public-static-assets-fixes.md`, `x-react-compiler-fixes.md`).

The user uses these `x-*.md` documents to apply the exact changes and automated tests into the upstream `dinou` repository. Every `x-<topic>-fixes.md` **must** include:

1. **Executive Summary & Root-Cause Analysis**: Clear explanation of every bug/gap discovered and how it was solved architecturally.
2. **Complete File Manifest**: Numbered list of all new and modified files in `dinou/`.
3. **Complete Source Code & Unified Diffs**: Full source code for any new files and exact, unambiguous diffs/code blocks for every modified file across all bundlers and runtimes.
4. **`CHANGELOG.md` Entry (`9.4.0`)**: Ready-to-paste Keep-a-Changelog (`### Added`, `### Changed`, `### Fixed`) markdown block.
5. **100% Complete, Unabbreviated, Copy-Pasteable Test Suites**:
   - **Unit / Multi-Bundler Integration Test Suite** (`tests/unit/<topic>.test.mjs` using `node:test` and `node:assert/strict`).
   - **Playwright E2E Test Suite** (`tests/e2e/<topic>.spec.ts` using `@playwright/test`).
   - **STRICT RULE**: Test code blocks in `x-*.md` must be **100% complete, self-contained, and directly copy-pasteable** with **ZERO** `// ...`, `/* rest of code */`, or abbreviated placeholders. Make sure fixtures resolve `"dinou"` cleanly in both the upstream `dinou` repo and consumer app repos.

---

## 5. Step-by-Step Route Audit Checklist

For each route in `src/docs/lib/docs-navigation.ts`:

### Phase A — Deep Framework Audit (`dinou/`)
1. Read `src/docs/<route>/page.tsx` completely to catalog every feature, config option, CLI command, behavior, file path, and edge case covered (or missing).
2. Read every corresponding implementation file in `dinou/` across:
   - `dinou/esbuild/`, `dinou/rollup/`, `dinou/webpack/` (plugins, loaders, helpers, dev vs. prod configs).
   - `dinou/core/` (runtime logic, manifests, RSC/SSR rendering, types, config loader).
   - `dinou/node/`, `dinou/bun/`, `dinou/deno/`, `dinou/cloudflare/`, and `dinou/adapters/`.
   - `dinou/cli.js` and TypeScript `.d.ts` files (`index.d.ts`, `env.d.ts`, `server.d.ts`).
3. Check for:
   - Bundler parity discrepancies (e.g., Esbuild supports X, but Rollup or Webpack drops, flattens, mis-hashes, or mis-resolves X).
   - Runtime parity discrepancies (e.g., works in Node dev, fails in `dinou build`, Bun, Deno, Cloudflare `workerd`, or `dinou export-static`).
   - Stale legacy paths (e.g., old root `dist3/`, `public/` dev output vs `.dinou/public`, `.dinou/react_client_manifest` vs `.dinou/dist1`).
   - Security, caching (`Cache-Control`), MIME type, Windows path-separator (`\` vs `/`), or URL-encoding bugs.
4. If bugs/gaps exist in `dinou/`:
   - Implement the fixes cleanly across all affected files.
   - Verify syntax (`node --check`), run targeted scratch unit/integration/build tests (store temporary scratch scripts in Antigravity's `<ArtifactDir>/scratch/`, never leaving junk in the project root), and clean up temporary build outputs like `out/`.
   - Write the complete `x-<topic>-fixes.md` handoff document.

### Phase B — Documentation Audit & Refinement (`src/docs/<route>/page.tsx`)
1. Verify 100% technical accuracy against `dinou@9.4.0`:
   - CLI commands (`dinou dev`, `dinou build`, `dinou start`, `dinou export-static`, bundler/runtime variants).
   - `.dinou/` directory paths (`.dinou/dist1`, `.dinou/dist2`, `.dinou/dist3`, `.dinou/cloudflare/assets`, `.dinou/public`, `.dinou/node-dev`, `.dinou/routes`, `.dinou/types`).
   - Code examples: React 19 best practices, TypeScript-first (`tsx`/`ts`), `dinou@9.4.0` contextual `./dinou` imports (`PageProps`, `LayoutProps`, `PageFunctions`, `Link`, `useRouter`) and root `"dinou"` exports (`defineConfig`, `getContext`, `noDynamic`, `ClientRedirect`, `redirect`, etc.).
2. Check UI/UX & Consistency:
   - Verify `tableOfContents` entries match actual `<section id="...">` headings (`h2` / `h3`) in `page.tsx`.
   - Use `<Link href="...">` (from `"dinou"` or `"./dinou"`) for internal documentation links (including Prev/Next navigation cards at the bottom if present, matching `docs-navigation.ts` order).
   - Ensure TypeScript strictness: run `npx tsc --noEmit` and verify **0 TypeScript errors** in the audited `page.tsx` (note: untouched `_test-dev`, `_internals`, `_route-parameters`, or not-yet-audited `migration` files may have pre-existing TS errors; never introduce any error in touched files).

---

## 6. Key `dinou@9.4.0` Architectural Invariants (Already Established)

Keep these invariants intact across all future audits and docs updates:

1. **`.dinou/` Directory Topology**:
   - **`.dinou/dist1/`**: **ALL** production internal build & server artifacts (never served publicly):
     - `.dinou/dist1/server/` → AOT Dual-Bundle `handler.js`, `netlify.js`, `.map` files, `package.json` (plus dedicated single-function `.dinou/netlify/functions/ssr.mjs` for `netlify.toml`).
     - `.dinou/dist1/manifest.json` → Bundler chunk asset map (`{"main.js": "main-<hash>.js", ...}`) across Esbuild, Rollup, and Webpack (freeing `/manifest.json` in `.dinou/dist3` for user PWA `public/manifest.json`!).
     - `.dinou/dist1/react-client-manifest.json` & `.dinou/dist1/server-functions-manifest.json` (plus `react-ssr-manifest.json` for Webpack). Legacy `.dinou/react_client_manifest/` and `.dinou/server_functions_manifest/` folders no longer exist.
   - **`.dinou/dist2/`**: Pre-rendered SSG / ISR / PPR HTML (`index.html`, `shell.html`), segmented RSC (`page.rsc`, `layout.rsc`, `shell.rsc`, `rsc.rsc`), metadata JSONs, `slots/*`, and `status-manifest.json`.
   - **`.dinou/dist3/`**: **100% pure public static webroot** (hashed client JS chunks, `styles.css`, `/assets/*`, and copied `public/*` files; legacy `favicons/` directory support was removed). Never polluted by server bundles, internal manifests, or Cloudflare `dist2` sync.
   - **`.dinou/cloudflare/`**:
     - `worker.js` → Compiled `workerd` Dual-Bundle orchestrator.
     - `assets/` → Wrangler `[assets] directory = ".dinou/cloudflare/assets"` (`run_worker_first = true`): root contains clean copy of `.dinou/dist3`; `.dinou/cloudflare/assets/__dinou_dist2/` isolates `.dinou/dist2` cache files (blocked with `404` on external HTTP requests via `isReservedCloudflareDist2RequestPath`, read internally via `fetchCloudflareDist2Asset`).
   - **`.dinou/node-dev/`**: Dev workspace & optional `DINOU_WRITE_TO_DISK=true` dev manifests (default `dinou dev` keeps manifests and client bundles 100% in-memory).
   - **`.dinou/routes/` & `.dinou/types/routes.d.ts`**: Auto-generated route-contextual `"./dinou"` modules and global route type registry (`generate-route-types.js`).
   - **`out/` (`dinou export-static`)**: Copies `.dinou/dist3` public assets + strictly allowlisted `index.html` (injected with `<script>window.__DINOU_STATIC_EXPORT__=true;</script>`), `page.rsc`, and `layout.rsc` from `.dinou/dist2` so both initial React 19 hydration and `<Link>` SPA navigation work serverlessly on static hosts without `/____rsc_*` endpoints.
2. **Underscore-Prefixed Escape Convention (`_folder`)**:
   - Any folder prefixed with `_` inside `src/` (top-level `src/_foo` or nested `src/docs/_foo`) is ignored by Dinou's router and bundlers (`dinou/core/resolve-contextual-dinou.js`, `x-escape.md`).
3. **`public/styles.css` Coexistence & Collision Precedence**:
   - When no CSS files are imported in `src/`, `public/styles.css` is served raw at `/styles.css` across `dinou dev` and `dinou build` in all 3 bundlers (`esbuild`, `rollup`, `webpack`) with zero warnings.
   - When CSS files are imported in `src/` alongside `public/styles.css`, Dinou's compiled `/styles.css` bundle wins deterministically in both dev and prod across all 3 bundlers (preserving nested `public/<subdir>/styles.css` untouched) and logs a deduplicated `console.warn`.
4. **Unified Static Media & Custom `assetExtensions` Pipeline (`x-assets-fixes.md`)**:
   - All 26 built-in media/font formats (plus any custom `assetExtensions` configured in `dinou.config.*`, with auto-generated `declare module "*.<ext>"` in `.dinou/types/routes.d.ts`) resolve across RSC, SSR, Client Components, and CSS `url(...)` to `/assets/[name]-[8hex].[ext]` using an OS-independent SHA-256 digest of `relPosixPath + "\0" + fileBytes` across Esbuild, Rollup, Webpack, Node.js, Bun, Deno, and Cloudflare Workers.
   - Static asset servers (`node/dev.js`, `node/build.js`, `bun/build.js`, `deno/build.js`) support RFC 9110 `Range: bytes=...` (`206 Partial Content`, `416`, `Accept-Ranges: bytes`) for HTML5 `<video>` / `<audio>` scrubbing and Safari playback.
5. **Environment Variables, `.env*` Hierarchy, `DINOU_PUBLIC_*` & Unified `getContext().env` (`x-env-vars-fixes.md`)**:
   - `dinou/core/env.js` loads `.env.<mode>.local` → `.env.local` (skipped in `test`) → `.env.<mode>` → `.env` (never overriding real OS/CLI shell variables) across all bundlers, CLI commands, standalone Node/Bun/Deno servers, and live hot-reload in `dinou dev`, while emitting `NodeJS.ProcessEnv` key names (never values) into `.dinou/types/routes.d.ts`.
   - `DINOU_PUBLIC_*` variables are safely inlined across Esbuild, Rollup, Webpack, and Pass B (`ssr-engine`), while remaining `process.env` accesses in Client Components & Pass B resolve to the sanitized public env object (preventing SSR/SSG secret leaks and browser `ReferenceError: process is not defined`).
   - `dinou/core/runtime-env.js` (`createUnifiedEnv`) powers `getContext().env` across Cloudflare Workers (preserving live KV/D1/R2 bindings), Node.js, Bun, Deno, Netlify, and SSG, and `isBotEnvProbePath` + static asset filters block all `.env` / `.env.*` / `%2eenv` probes and prevent accidental `public/.env*` copying.
6. **Unified TypeScript-Spec `tsconfig.json` & `jsconfig.json` Path Aliases Engine (`x-alias-fixes.md`)**:
   - `dinou/core/tsconfig-aliases.js` is the single zero-dependency source of truth across Esbuild, Rollup, Webpack, PostCSS (`@import` & `url()`), `dinou.config.ts`, `_folder` escape guards, and Dual-Bundle RSC/SSR/Edge builds (`Node.js`, `Cloudflare Workers`, `Bun`, `Deno`) — supporting granular aliases, longest-prefix specificity sorting, exact/wildcard patterns, multi-target fallbacks, recursive `"extends"` chains (including parent `baseUrl`, TS 5+ arrays, `node_modules` presets, and `${configDir}`), `.js` → `.ts`/`.tsx` substitution, and live hot-reload in `dinou dev`.
7. **AOT `dinou.config.*` Bundling, SPA-Safe `onRequest` Guards, `setupFiles` & `configureServer` Pipeline (`x-plugins-fixes.md`)**:
   - `dinou.config.{ts,mjs,js,cjs}` and `setupFiles` (supporting `@/*` path aliases, extensionless paths, and npm package subpaths, executed once at Line 1 in `[...pluginSetupFiles, ...userSetupFiles]` order) are AOT-bundled across Node.js, Cloudflare Workers, Bun, Deno, standalone binaries, and `.dinou/dist1/server/` (`handler.js`, `netlify.js`), with live `dinou dev` hot-reload.
   - `plugin.onRequest` skips build-time SSG (`isSSG === true`), runs at runtime ahead of all dynamic and cached SSG/ISR/PPR pages, normalizes `context.req.path` on `/____rsc_*` SPA fetches (`rawPath` + `isRscRequest`), translates `3xx` redirects into `x-rsc-redirect` (preserving `Set-Cookie` and `context.res` status/`Cache-Control`/headers), and `dinou/core/node-middleware-runner.js` powers sync/Promise/callback-async `(req, res, next)` middlewares with per-plugin fault isolation.
8. **Multi-Bundler CLI Execution, Pure Bun Compatibility, 31-Vendor Catalog & `-u` Unvendorized Mode (`x-bundlers-fixes.md`)**:
   - `dinou/cli.js` executes Esbuild, Rollup, and Webpack steps directly via `spawnSync` without `cross-env` or `npx`, propagating `DINOU_BUILD_TOOL` (`"esbuild"`, `"rollup"`, `"webpack"`) across all Node, Cloudflare, Deno, Bun, Pure Bun, and `export-static` targets, while `dinou/webpack/helpers/patch-webpack-internals.js` (`loadReactServerWebpackPlugin`) enables 100% Node-free Webpack 5.112+ builds under Bun.
   - `dinou/compiled/` consolidates 31 active pre-compiled vendor packages (including `#fast-glob`, `#resolve`, `#chokidar`, `#css-loader` + `runtime/`, and `#mini-css-extract-plugin` + `hmr/`) with full `dependencies` parity in `package.json` / `dinou/package.json` for strict `pnpm` workspaces, and `dinou/core/ensure-vendor-mode.js` activates `--conditions=unvendorized` across both Node.js and Bun.
9. **AOT Dual-Bundle Netlify Functions v2, Multi-Bundle React Isolation & Runtime Adapters (`x-deployment-fixes.md`)**:
   - `dinou/node/bundle-dual-engine.js` (`bundleServerAndNetlifyAdapters`) compiles self-contained AOT Dual-Bundle server artifacts into `.dinou/netlify/functions/ssr.mjs` (`netlify.toml` `[functions] directory = ".dinou/netlify/functions"`, `included_files = [".dinou/dist2/**"]`, `MemoryStorage({ hydrateFromDisk: true })` default, `Netlify.env` unification, `context.waitUntil()` ISR) and `.dinou/dist1/server/{netlify.js,handler.js}` across Esbuild, Rollup, and Webpack, alongside new `dinou build:netlify[:esbuild|:rollup|:webpack]` CLI commands.
   - `rsc-engine` and `ssr-engine` bind `globalThis.__DINOU_EDGE_RENDERER__` and `globalThis.__webpack_require__` per call across Node, Netlify, Cloudflare, Bun, and Deno so multiple compiled bundles can coexist in one process without `React` dispatcher collisions; `dinou/adapters/{netlify,cloudflare,bun,deno}.js` delegate cleanly to their pre-bundled AOT artifacts with `HOST` (`hostname`) propagation and CLI fail-fast checks.
10. **Selective Eject Script Rewriting, Transactional `dinou uneject` with `(y/N)` Confirmation, Live Ejected Specifier Resolution & Multi-Root `build:vendors` (`x-eject-fixes.md`)**:
   - `<pkgRoot>/eject.js` remains at package root (outside `./dinou/` to prevent accidental overwrites and junction self-copy issues) and uses `rewritePackageJsonForEject` from `dinou/core/uneject.js` to rewrite only Dinou scripts that already existed in the user's `package.json` (plus `"build:vendors"` and `"uneject"`, removing `"eject"` and `devDependencies.dinou`), while `dinou/cli.js` guards `dinou eject` cleanly when already ejected (`0` exit code, no `ERR_MODULE_NOT_FOUND` stack trace) and adds `dinou uneject [version] [-y|--yes]` with an interactive `(y/N)` safety prompt and automatic rollback if package installation fails.
   - `resolveEjectedDinouSpecifier` in `dinou/core/resolve-contextual-dinou.js` + Webpack `"dinou/config"` / `"dinou/server"` aliases resolve all `"dinou*"` imports directly to `<projectRoot>/dinou/...` across Esbuild, Rollup, and Webpack even under `pnpm` / `yarn` static `file:./dinou` snapshots, and `dinou/scripts/build-vendors.js` resolves vendor packages across `[projectRoot, dinouRoot, node_modules/dinou]`.
11. **API Reference Audit Fixes & ISR Concurrency Hardening (`x-api-reference-fixes-{1..4}.md`, `x-isr-concurrency-fixes.md`)**:
   - **Batch 1 (`x-api-reference-fixes-1.md`)**: Short-circuited `getProps()` / layout `redirect()` in `get-jsx.js` & `handler.js` via `_hasRedirected`; fixed external URL `SecurityError` and `#hash` cache/query handling in `client.jsx` & `client-webpack.jsx`; respected `target`, `download`, and `e.button !== 0` in `link.jsx` & global click listener; memoized `useRouter()` and guarded `window.__DINOU_STATIC_EXPORT__` in `useSearchParams()`.
   - **ISR Concurrency (`x-isr-concurrency-fixes.md`)**: Added `{ onlyIfExpired: true }` re-check inside serialized `enqueueRevalidation` (`cache-revalidate.js`) + synchronous `regenerating.add(reqPath)` (`handler.js`) to eliminate duplicate concurrent HTML+RSC ISR regenerations.
   - **Batch 2 (`x-api-reference-fixes-2.md`)**: Memoized generated contextual `"./dinou"` `useRouter()` safely under `react-server`; added `DinouEnv` and missing route helper re-exports to contextual `dinou.d.ts`; excluded `rawPath`/`isRscRequest` from `copyCustomContextProperties` and populated them across `createServerFunctionContext` & `getContext()` fallbacks.
   - **Batch 3 (`x-api-reference-fixes-3.md`)**: Added cursor pagination in `CloudflareKVStorage.keys()` and folder fallback in `CloudflareKVStorage.has()`; stripped trailing slashes in `DenoKVStorage._cleanKey()`; merged `tag` + `tags` and unified `revalidate < 1` + `revalidate?: number | false` in `<DinouCacheSlot>`; matched cold-start `id`-only slots in `revalidateTag(slotId)` and cold segment layouts in `revalidatePath()`.
   - **Batch 4 (`x-api-reference-fixes-4.md`)**: Enforced authoritative `validateParams()` & `allowISG: false` veto ahead of cached RSC responses (`/____rsc_page____/*`, `/____rsc_layout____/*`) in strict root-to-child order; normalized numeric/array `getStaticPaths` object values for `allowISG: false`; extended `buildStaticPages` `layout_functions.ts` `getStaticPaths` discovery to `[[param]]`, `[...slug]`, and `[[...slug]]`.
12. **Existing `x-*.md` Upstream Handoff Documents in Repo Root**:
   - `x-bailout.md`, `x-cache-slot-bailout.md`, `x-escape.md`, `x-server-functions-fixes.md`, `x-revalidation-fixes.md`, `x-streaming-suspense-fixes.md`, `x-ssr-server-references-fixes.md`, `x-react-compiler-fixes.md`, `x-public-static-assets-fixes.md`, `x-styles-css-fixes.md`, `x-assets-fixes.md`, `x-env-vars-fixes.md`, `x-alias-fixes.md`, `x-plugins-fixes.md`, `x-bundlers-fixes.md`, `x-deployment-fixes.md`, `x-eject-fixes.md`, `x-api-reference-fixes-1.md`, `x-isr-concurrency-fixes.md`, `x-api-reference-fixes-2.md`, `x-api-reference-fixes-3.md`, `x-api-reference-fixes-4.md`.

---

## 7. Route-by-Route Audit Progress (`src/docs/lib/docs-navigation.ts`)

### Landing & Getting Started
- [x] `/` — Landing Page (`src/page.tsx`, `src/components/landing/*`)
- [x] `/docs` — Introduction (`src/docs/page.tsx`)
- [x] `/docs/getting-started` — Installation (`src/docs/getting-started/page.tsx`)
- [x] `/docs/about` — About (`src/docs/about/page.tsx`)

### Core Concepts
- [x] `/docs/routing` — Routing (`src/docs/routing/page.tsx`)
- [x] `/docs/navigation` — Navigation (`src/docs/navigation/page.tsx`)
- [x] `/docs/type-safe-routing` — Type-Safe Routing (`src/docs/type-safe-routing/page.tsx`)
- [x] `/docs/server-client-components` — Component Architecture (`src/docs/server-client-components/page.tsx`)
- [x] `/docs/page-functions` — Page & Layout Functions (`src/docs/page-functions/page.tsx`)
- [x] `/docs/rendering` — Static & Dynamic Rendering (`src/docs/rendering/page.tsx`)
- [x] `/docs/3d-segmentation` — 3D Layered Segmentation (`src/docs/3d-segmentation/page.tsx` • `x-cache-slot-bailout.md`)
- [x] `/docs/server-functions` — Server Functions (`src/docs/server-functions/page.tsx` • `x-server-functions-fixes.md`)
- [x] `/docs/revalidation` — On-Demand Revalidation (`src/docs/revalidation/page.tsx` • `x-revalidation-fixes.md`)
- [x] `/docs/data-fetching` — Data Fetching (`src/docs/data-fetching/page.tsx` • `x-streaming-suspense-fixes.md`)
- [x] `/docs/pattern` — The Dinou Pattern (`src/docs/pattern/page.tsx` • `x-ssr-server-references-fixes.md`)
- [x] `/docs/compiler` — React Compiler (`src/docs/compiler/page.tsx` • `x-react-compiler-fixes.md`)
- [x] `/docs/public` — Public Directory (`src/docs/public/page.tsx` • `x-public-static-assets-fixes.md`)
- [x] `/docs/styles` — Styles (`src/docs/styles/page.tsx` • `x-styles-css-fixes.md`)
- [x] `/docs/assets` — Assets (`src/docs/assets/page.tsx` • `x-assets-fixes.md`)
- [x] `/docs/env-vars` — Env Vars (`src/docs/env-vars/page.tsx` • `x-env-vars-fixes.md`)
- [x] `/docs/alias` — Alias (`src/docs/alias/page.tsx` • `x-alias-fixes.md`)
- [x] `/docs/plugins` — Plugins (`src/docs/plugins/page.tsx` • `x-plugins-fixes.md`)
- [x] `/docs/bundlers` — Bundlers (`src/docs/bundlers/page.tsx` • `x-bundlers-fixes.md`)
- [x] `/docs/deployment` — Deployment (`src/docs/deployment/page.tsx` • `x-deployment-fixes.md`)
- [x] `/docs/eject` — Eject (`src/docs/eject/page.tsx` • `x-eject-fixes.md`)

### Reference
- [x] `/docs/api-reference` — API Reference (`src/docs/api-reference/page.tsx` • `x-api-reference-fixes-{1..4}.md`, `x-isr-concurrency-fixes.md`)
- [x] `/docs/cheatsheet` — Cheatsheet (`src/docs/cheatsheet/page.tsx` • docs audit complete, 0 framework bugs)

### Guides
- [ ] **`/docs/i18n` — Internationalization (`src/docs/i18n/page.tsx`)  ⬅️ NEXT ROUTE TO AUDIT**
- [ ] `/docs/clerk` — Clerk Authentication (`src/docs/clerk/page.tsx`)

### Upgrade Guides
- [ ] `/docs/migration` — Overview (`src/docs/migration/page.tsx`)
- [ ] `/docs/migration/v8-to-v9` — Migration from v8 to v9 (`src/docs/migration/v8-to-v9/page.tsx`)
- [ ] `/docs/migration/v7-to-v8` — Migration from v7 to v8 (`src/docs/migration/v7-to-v8/page.tsx`)
- [ ] `/docs/migration/v6-to-v7` — Migration from v6 to v7 (`src/docs/migration/v6-to-v7/page.tsx`)
- [ ] `/docs/migration/v5-to-v6` — Migration from v5 to v6 (`src/docs/migration/v5-to-v6/page.tsx`)
- [ ] `/docs/migration/v4-to-v5` — Migration from v4 to v5 (`src/docs/migration/v4-to-v5/page.tsx`)

