Hi everyone! 👋

I’ve just released **Dinou v7** (`7.0.0`), an open-source, ejectable full-stack React 19 framework built on web standards. 

My goal with Dinou v7 was to harness the full power of React 19 (Server Components, Server Functions, streaming SSR, and Partial Prerendering) while keeping the architecture runtime-agnostic, bundler-flexible, and free of vendor lock-in.

Here is a quick overview of what’s in v7 and what the concepts in the title mean in practice:

### 1. Pre-Bundled Dual-Engine Architecture (No Runtime Flags Needed)
Running React 19 RSC usually requires passing `--conditions react-server` at runtime or spawning child processes (`child_process.fork()`), which makes deploying RSC to serverless/edge platforms like Netlify or compiling to single binaries tricky.
* In v7, Dinou pre-bundles the RSC graph (`"react-server"` condition) and the streaming HTML SSR graph (`"browser"` condition) in separate build passes before combining them into a single server entry point.
* **The result:** Everything runs in a single process over standard W3C Web Streams without needing special Node runtime flags or IPC child processes.

### 2. Horizontal & Vertical Segmentation (2D Caching)
Instead of treating caching as an all-or-nothing route setting, Dinou v7 splits rendering and caching across two dimensions:
* **Horizontal Segmentation (Route & Layout Plane):** Layouts (`layout.tsx` + `layout_functions.ts`) and Pages (`page.tsx` + `page_functions.ts`) have completely decoupled data lifecycles and cache TTLs. A parent layout shell can be cached with ISR (`revalidate = 3600`) and never remount during client navigation, while child pages run dynamic SSR (`revalidate = 0`) or their own ISR timer. You can also surgically invalidate just a leaf page (`revalidatePage`) without touching parent layout caches.
* **Vertical Segmentation (Component-Level Micro-ISR):** Using `<DinouCacheSlot id="..." revalidate="{60}" tag="...">`, you can cache individual server component subtrees with their own TTL and tags inside dynamic or static pages. Client Components can also surgically refresh a specific server slot in-place via `refreshSlot(id)` without reloading the page or losing client state.

### 3. Partial Prerendering (PPR) + `<DinouCacheSlot>`
By enabling `ppr = true`, Dinou serves a static HTML shell immediately while streaming dynamic `<Suspense>` holes over the same HTTP connection. 
* You can also combine PPR with `<DinouCacheSlot>` inside a `<Suspense>` boundary so that the streamed dynamic hole itself is served from your server/KV cache instead of hitting the database on every request.

### 4. Multi-Runtime & Standalone Single-File Binaries
Write your app once in `src/` and build for different targets without changing your application code:
* **Standalone Executables:** Compile your entire React 19 RSC + SSR app into a self-contained binary with **Bun** (`dinou build:bun:pure:compile`) or **Deno** (`dinou build:deno:compile`) for Linux (x64/ARM64), macOS, or Windows.
* **Edge, Serverless & Containers:** Built-in adapters and storage engines (`FileSystemStorage`, `RedisStorage`, `CloudflareKVStorage`, `DenoKVStorage`, `MemoryStorage`) for **Cloudflare Workers**, **Netlify Functions v2**, **Deno Deploy**, **Node.js**, or **Pure Static Export** (`dinou export-static`).

### 5. Developer Experience & Zero Lock-In
* **Compile-Time Type-Safe Routing:** Auto-generates route types (`.dinou/types/routes.d.ts`) from your folder structure for `<Link href="...">`, `router.push()`, `PageProps<"/blog/[slug]">`, and `RouteParams<T>` with zero runtime overhead.
* **Bundler Agnostic:** Uses **esbuild** by default for fast HMR in development, with full support for **Rollup** and **Webpack** (`dinou dev:rollup`, `dinou build:node:webpack`), plus **React Compiler** enabled in production builds.
* **Server Functions & Component Streaming:** `"use server"` functions can return data or live rendered React components over Flight RPC, unwrapped on the client with React 19's `use()`.
* **100% Ejectable & Agent-Friendly:** Run `npx dinou eject` at any time to copy the compiler, router, and runtime adapters directly into your project root. The npm package also ships with the complete documentation inside `node_modules/dinou/README.md` so AI coding agents (Antigravity, Cursor, Claude Code, Copilot) have full local context out of the box.

---

### Dogfooding in Production
The documentation site (**[dinou.dev](https://dinou.dev)**) is running on Dinou v7 compiled into a standalone Bun binary inside a Debian Slim Docker container on a single $5/mo (512 MB RAM) DigitalOcean container.

### Quick Start
```bash
npm create dinou@latest my-app
cd my-app
npm run dev
```

* 📚 **Documentation:** [https://dinou.dev](https://dinou.dev)
* 💻 **GitHub:** [https://github.com/roggc/dinou](https://github.com/roggc/dinou)
* 📦 **NPM:** [https://www.npmjs.com/package/dinou](https://www.npmjs.com/package/dinou)

I’d love to hear your thoughts or feedback if you give it a try!