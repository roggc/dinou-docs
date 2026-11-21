### Name

Dinou

### Homepage

https://dinou.dev

### Install instructions

https://dinou.dev/docs/getting-started

### Is your framework open source?

Yes

### Well maintained

Dinou has had over 500 commits since its initial commit, is validated by a cross-platform end-to-end Playwright test suite (Windows and Ubuntu across esbuild, Rollup, and Webpack in dev and prod modes), and strictly follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and [Semantic Versioning](https://semver.org/) conventions. Every release is documented in a public [CHANGELOG.md](https://github.com/roggc/dinou/blob/master/CHANGELOG.md).

As an example of our development velocity and architectural evolution, here are the recent release notes for **v7.0.0**:

**[7.0.0] - 2026-10-15**
- **Refactored (Zero-Fork AOT Dual-Bundle Engine on Web Standards):** Completely removed Express and `child_process.fork()`. Dinou now pre-bundles the RSC graph (`"react-server"` condition) and the streaming HTML SSR graph (`"browser"` condition) in separate build passes before combining them into a single in-process orchestrator built exclusively on W3C Web Standards (`Request`, `Response`, `Headers`, `ReadableStream`, `renderToReadableStream`).
- **Added (Universal Multi-Runtime & Standalone Binaries):** Added first-class build targets and adapters for **Node.js**, **Cloudflare Workers** (with Cloudflare KV ISR storage), **Netlify Functions v2**, **Bun**, **Deno / Deno Deploy** (with Deno KV storage), **Pure Static Export** (`dinou export-static`), and single-file standalone executable compilation (`bun build --compile` and `deno compile`).
- **Added (Partial Prerendering - PPR):** Added support for `ppr = true` (globally or per route/layout), serving an instant build-time static HTML shell while streaming dynamic `<Suspense>` boundaries over the same HTTP connection.
- **Added (2D Caching — Horizontal & Vertical Segmentation):** Decoupled layout lifecycles (`layout_functions.ts`) from page lifecycles (`page_functions.ts`) so layouts persist without remounting during SPA navigation, and introduced `<DinouCacheSlot>` + `refreshSlot(id)` for component-level Micro-ISR and surgical in-place client refreshes.
- **Added (Compile-Time Type-Safe Routing):** Added zero-runtime route type generation (`.dinou/types/routes.d.ts`) for `<Link href="...">`, `useRouter()`, `PageProps<T>`, `LayoutProps<T>`, `ErrorProps<T>`, and `RouteParams<T>`.
- **Added (On-Demand Revalidation Suite):** Added `revalidatePage`, `revalidatePath` (with `{ cascade: true }`), `revalidateTag`, and pluggable `StorageAdapter` engines (`FileSystemStorage`, `RedisStorage`, `CloudflareKVStorage`, `DenoKVStorage`, `MemoryStorage`).

### Active community

Dinou is currently maintained by a single developer ([github.com/roggc/dinou](https://github.com/roggc/dinou)). While adoption is early-stage, the codebase and documentation are actively maintained and tested across multiple runtimes. Inclusion in the react.dev directory would provide invaluable visibility to help attract early adopters and contributors.

### Clear onboarding

Documentation: https://dinou.dev/docs

Getting started takes less than a minute:

**CLI Scaffold (Recommended):**
```bash
npm create dinou@latest my-app
cd my-app
npm run dev
```

**Manual Setup:**
```bash
mkdir my-app && cd my-app
npm init -y
npm i react react-dom dinou
mkdir src
```

Create a Server Component page in `src/page.jsx`:
```jsx
export default function Page() {
  return <h1>Hello from Dinou Server Components!</h1>;
}
```

Then run the development server directly:
```bash
npx dinou dev
```

### Ecosystem compatibility

Dinou works out-of-the-box with standard React 19 ecosystem tools:
- **Styling:** Built-in support for **Tailwind CSS v4** (`@tailwindcss/postcss`), CSS Modules (`*.module.css`), and global CSS with React 19 stylesheet `<link precedence="default">` hoisting.
- **State Management:** Fully compatible with standard client state libraries like Zustand, Jotai, Redux, or React 19's native `useSyncExternalStore`.
- **React 19 Primitives:** Native support for `use()`, `useActionState`, `useFormStatus`, `useOptimistic`, and Server Functions (`"use server"`).

No incompatibilities with standard React 19 libraries have been identified.

### Self-hosting option

In **Dinou v7**, Express and runtime Node flags (`--conditions react-server`) are no longer required at startup. Dinou uses a **Pre-Bundled AOT Dual-Engine Architecture** built on W3C Web Standards (`Request`, `Response`, `ReadableStream`), allowing it to self-host anywhere:

**1. Pre-Bundled Dual-Engine Architecture (Single Process):**
During the build step, Dinou resolves React 19's module conditions ahead of time in three passes:
1. **Pass A (RSC Engine):** Bundles Server Components and Server Functions with the `"react-server"` condition.
2. **Pass B (SSR Engine):** Bundles the HTML streaming renderer with standard `"browser"` / `"node"` conditions.
3. **Pass C (Unified Orchestrator):** Combines both engines into a single entry point that pipes React Flight `ReadableStream` payloads directly in memory with zero IPC or child processes.

**2. Universal Deployment & Self-Hosting Targets:**
Because no special runtime flags or child processes are needed, Dinou v7 runs natively on:
- **Node.js (Docker, VPS, Fly.io, Railway, Render, DigitalOcean):** `dinou build:node && dinou start:node`
- **Standalone Single-File Executables (Bun & Deno):** Compile the entire React 19 RSC + SSR app into a single binary with zero runtime dependencies via `dinou build:bun:compile` (or `dinou build:bun:pure:compile`) and `dinou build:deno:compile` (supporting cross-compilation for Linux x64/ARM64, macOS, and Windows).
- **Cloudflare Workers & Pages:** `dinou build:cloudflare` (with native `CloudflareKVStorage` for ISR).
- **Netlify (Serverless Functions v2):** Supported out of the box via `.dinou/dist3/server/netlify.js` with `preferStatic: true`.
- **Deno Deploy:** `dinou build:deno` (with native `DenoKVStorage`).
- **Pure Static HTML Export (SSG):** `dinou export-static` outputs a 100% static site to `out/` for GitHub Pages, S3, or Nginx.

Dinou is bundler-agnostic across all targets, supporting **esbuild** (default), **Rollup**, and **Webpack** via clean CLI scripts:
```json
{
  "scripts": {
    "dev": "dinou dev",
    "build": "dinou build",
    "start": "dinou start",
    "dev:rollup": "dinou dev:rollup",
    "dev:webpack": "dinou dev:webpack",
    "build:node": "dinou build:node",
    "start:node": "dinou start:node",
    "build:cloudflare": "dinou build:cloudflare",
    "build:deno": "dinou build:deno",
    "build:deno:compile": "dinou build:deno:compile",
    "build:bun": "dinou build:bun",
    "build:bun:compile": "dinou build:bun:compile",
    "export-static": "dinou export-static",
    "eject": "dinou eject"
  }
}
```

### Developer Experience

- **Fast Refresh & In-Memory Dev Server:** Sub-millisecond HMR powered by `@swc/core` and in-memory Virtual File System (VFS) compilation with `dinou dev` (esbuild) and `dinou dev:rollup`.
- **Compile-Time Type-Safe Routing (0 Runtime Bytes):** Automatically scans `src/` and generates `.dinou/types/routes.d.ts` for IDE autocomplete and type checking on `<Link href="...">`, `router.push()`, `PageProps<"/blog/[slug]">`, `LayoutProps<T>`, and `RouteParams<T>`.
- **React Compiler & StrictMode:** React Compiler is automatically integrated across production builds (esbuild, Rollup, Webpack) and in Webpack development mode, paired with `reactStrictMode: true` by default.
- **100% Ejectable & Agent-Friendly:** Running `npx dinou eject` extracts the entire framework (core engine, router, bundlers, and runtime adapters) into a local `dinou/` directory in the project root with zero lock-in. Additionally, the npm package ships with the complete ~10,000-line documentation in `node_modules/dinou/README.md` to give AI coding agents full offline context.

### User Experience

Dinou v7 is a full-stack React 19 framework engineered around progressive streaming and 2D caching segmentation:

- **Routing & Persistent Nested Layouts:** File-system routing supporting dynamic (`[slug]`), optional (`[[slug]]`), catch-all (`[...slug]`), route groups (`(group)`), and parallel slots (`@slot` with isolated error containment). Parent layouts never remount during client SPA navigation, preserving state, inputs, and scroll position.
- **2D Caching (Horizontal & Vertical Segmentation):**
  - *Horizontal (Route & Layout Plane):* Decoupled `layout_functions.ts` and `page_functions.ts` allow layouts and pages to have independent `getProps` lifecycles and ISR `revalidate` timers (strictly in seconds), plus surgical leaf invalidation via `revalidatePage(path)`.
  - *Vertical (Component-Level Micro-ISR):* `<DinouCacheSlot id="..." revalidate={60} tag="...">` caches isolated server component subtrees on the server. Client Components can surgically refresh individual slots in-place via `refreshSlot(id)` without reloading the page.
- **Partial Prerendering (PPR):** Setting `ppr = true` delivers an instant build-time static HTML shell while concurrently streaming dynamic `<Suspense>` holes over a single HTTP connection (and can be combined with `<DinouCacheSlot>` to serve streamed holes from server/KV cache).
- **13 Data Fetching Strategies:** Supports build-time SSG, time-based ISR (`revalidate = N`), dynamic streaming SSR (`revalidate = 0`), RSC-to-Client Promise streaming unwrapped with React 19's `use()`, and Client-First `getProps`.

### Compatible with our future vision for React

Dinou v7 is built natively around React 19's core primitives: React Server Components, Server Functions (`"use server"`), progressive Web Streams (`renderToReadableStream`), `use()`, `useActionState`, `useOptimistic`, and the React Compiler.

A signature pattern enabled by Dinou is **"The Dinou Pattern"**: Server Functions exported from `"use server"` modules can return rendered React components (including lightweight headless Client Component state updaters) directly over React Flight RPC. When a mutation Server Function returns a headless updater component, it mounts with zero DOM output and signals a client store (via Zustand or React's native `useSyncExternalStore`) to selectively re-trigger only the dependent `<Suspense>` boundary—unwrapping the fresh Server Function stream via React 19's native `use(promise)` hook without full-page reloads or client fetch waterfalls.
