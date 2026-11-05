# Dinou Public Exports Architecture (`"dinou"` vs `"dinou/server"`)

This document details the public API surface exported by **Dinou** across its two entry points (`"dinou"` and `"dinou/server"`), classifies each API by target execution environment, explains the runtime behavior when APIs are imported or invoked across boundaries (Server vs. Client), and outlines the architectural rationale behind separating `"dinou"` from `"dinou/server"`.

---

## 1. Overview of Entry Points

Dinou exposes two package entry points:

1. **`"dinou"` (`dinou/index.js` & `dinou/index.d.ts`)** — The universal entry point safe to import in **Server Components**, **Client Components**, **Server Functions**, and **configuration files**. All modules referenced by `"dinou"` are completely free of top-level Node.js native imports (`node:fs`, `node:crypto`, `node:path`, etc.) so client bundlers (Rollup/Vite) can process them cleanly.
2. **`"dinou/server"` (`dinou/server.js` & `dinou/server.d.ts`)** — The dedicated server-only entry point for cache revalidation, vertical micro-ISR (`<DinouCacheSlot>`), and storage adapters. These modules depend on Dinou's RSC rendering engine and Node.js/server primitives.

---

## 2. Classification of Exports from `"dinou"` (`dinou/index.js`)

`"dinou"` currently exports **11 runtime values** (plus TypeScript types). Grouped by where they are intended to run:

### 2.1. Server / Build-Only APIs Exported from `"dinou"`

| Export | Source File | Purpose |
| :--- | :--- | :--- |
| `getContext()` | `dinou/core/request-context.js` | **Server-only** (Server Components, Server Functions, and middleware). Synchronously returns `{ req, res, env, ctx, ... }` from `AsyncLocalStorage`. |
| `noDynamic()` | `dinou/core/no-dynamic.js` | **Server-only (PPR Build)**. Opts the enclosing `<Suspense>` boundary out of becoming a Dynamic PPR Hole when wrapping an `async` Server Component on a `ppr = true` route, resolving its promise at build time into `shell.html`. |
| `defineConfig(config)` | `dinou/core/config.js` | **Build/Config-only** (`dinou.config.ts` / `dinou.config.mjs`). Identity helper providing TypeScript autocompletion for `DinouConfig`. |

#### TypeScript Types (Server / Build-Only) Exported from `"dinou"` (and Re-exported from `"dinou/server"`)
* **Route & Segment Config Types** (`page_functions.ts` / `layout_functions.ts`): `PageFunctions`, `LayoutFunctions`, `RouteSegmentConfig`, `PPRConfig`, `StaticPathItem`, `StaticPathsResult`
* **Server Request Context Types** (`getContext()` & `onRequest` middleware): `RequestContextStore`, `ResponseProxy`, `CookieOptions`, `Query`, `Cookies`, `Headers`
* **Server Plugin & Build Config Types** (`dinou.config.ts` & server plugins): `DinouConfig`, `DinouPlugin`, `ServerHookContext`, `NodeMiddleware`

---

### 2.2. Universal APIs (Server + Client) Exported from `"dinou"`

| Export | Source File | Purpose |
| :--- | :--- | :--- |
| `redirect(destination)` | `dinou/core/redirect.jsx` | On the server (if HTTP headers have not been sent yet), triggers `ctx.res.redirect(destination)` (HTTP 307 / `x-rsc-redirect`) and returns `<ClientRedirect to={destination} />`. On the client or after streaming has started, returns `<ClientRedirect to={destination} />` to trigger a client-side navigation. |
| `usePathname()` | `dinou/core/navigation.js` | On the server, reads and normalizes `ctx.req.path` from the active request context. On the client, subscribes to `RouterContext` and returns the normalized pathname. |
| `useSearchParams()` | `dinou/core/navigation.js` | On the server, constructs a `URLSearchParams` instance from `ctx.req.query` (which also triggers dynamic hole detection during PPR builds). On the client, reads query parameters from `RouterContext` / `window.location.search`. |
| `Link` | `dinou/core/link.jsx` | Client Component (`"use client"`) that can be imported and rendered inside both Server Components and Client Components for soft SPA navigation and hover prefetching. |
| `ClientRedirect` | `dinou/core/client-redirect.jsx` | Client Component (`"use client"`) that triggers `router.replace(to)` upon mounting in the browser. Can be rendered by either Server or Client Components. |

#### TypeScript Types (Universal — Server + Client) Exported from `"dinou"`
* **Page, Layout & Error Component Prop Types** (primarily Server Components, also valid in `"use client"` pages/errors; also re-exported from `"dinou/server"`): `PageProps`, `LayoutProps`, `ErrorProps`
* **Typed Route & Parameter Helpers** (also re-exported from `"dinou/server"`): `DinouRouter`, `DinouRoute`, `DinouRoutePattern`, `RouteParams`, `CleanRoutePath`, `ExtractRouteParams`, `ExtractSegmentParam`
* **Universal Component Prop Types** (`"dinou"` only): `LinkProps`, `ClientRedirectProps`

---

### 2.3. Client-Only APIs Exported from `"dinou"`

| Export | Source File | Purpose |
| :--- | :--- | :--- |
| `useRouter()` | `dinou/core/navigation.js` | Client Component hook returning `{ push, replace, back, forward, refresh, refreshSlot }`. |
| `useNavigationLoading()` | `dinou/core/navigation.js` | Client Component hook returning `true` while a client-side SPA transition (`isPending`) is in progress. |
| `refreshSlot(slotId, options)` | `dinou/core/navigation.js` | Browser utility to programmatically re-fetch and re-render a specific `<DinouCacheSlot>` without reloading the page. |

#### TypeScript Types (Client-Only) Exported from `"dinou"`
* **Programmatic Navigation Options** (`useRouter().push` / `useRouter().replace`): `NavigationOptions`

---

## 3. Exports from `"dinou/server"` (`dinou/server.js`)

`"dinou/server"` exports APIs that interact directly with the server cache, RSC rendering pipeline, and storage backends:

| Export | Source File | Purpose |
| :--- | :--- | :--- |
| `revalidatePath(path)` | `dinou/core/cache-revalidate.js` | Invalidates and regenerates both the layout and page cache for a route path. |
| `revalidatePage(path)` | `dinou/core/cache-revalidate.js` | Invalidates and regenerates only `page.rsc` and `index.html` while preserving the cached layout. |
| `revalidateLayout(path)` | `dinou/core/cache-revalidate.js` | Surgically invalidates and regenerates only `layout.rsc` and `layout.metadata.json`. |
| `revalidateTag(tag)` | `dinou/core/cache-revalidate.js` | Invalidates and regenerates all pages, layouts, and `<DinouCacheSlot>` entries associated with `tag`. |
| `DinouCacheSlot` | `dinou/core/cache-slot.js` | Async Server Component for vertical segmentation (Micro-ISR), allowing independent per-component TTL (`revalidate`) and tags (`tag` / `tags`). |
| `getContext()` | `dinou/core/request-context.js` | Re-exported for convenience alongside `DinouCacheSlot` and `revalidateTag` so Server Components, `page_functions.ts`, and `"use server"` actions can import all server primitives from `"dinou/server"`. |
| `noDynamic()` | `dinou/core/no-dynamic.js` | Re-exported for convenience alongside `DinouCacheSlot` so server modules can import all PPR/caching primitives from `"dinou/server"`. |
| `StorageAdapter`, `FileSystemStorage`, `CloudflareKVStorage`, `DenoKVStorage`, `MemoryStorage`, `RedisStorage`, `getStorageAdapter`, `setStorageAdapter` | `dinou/core/storage-adapter.js` | Pluggable storage adapter classes and getters/setters for ISR/ISG/PPR cache persistence. |

#### TypeScript Types Exported from `"dinou/server"` (`dinou/server.d.ts`)
* **Cache Slot & Storage Types**: `DinouCacheSlotProps`, `StorageItem`, `StorageAdapter`, `FileSystemStorage`, `CloudflareKVStorage`, `DenoKVStorage`, `MemoryStorage`, `RedisStorage`
* **Route & Segment Config Types** (re-exported from `./index`): `PPRConfig`, `RouteSegmentConfig`, `PageFunctions`, `LayoutFunctions`, `StaticPathItem`, `StaticPathsResult`
* **Server Request Context Types** (re-exported from `./index`): `RequestContextStore`, `ResponseProxy`, `CookieOptions`, `Query`, `Cookies`, `Headers`
* **Page, Layout, Error & Route Param Types** (re-exported from `./index`): `PageProps`, `LayoutProps`, `ErrorProps`, `RouteParams`, `DinouRoutePattern`, `DinouRoute`, `DinouRouter`, `CleanRoutePath`, `ExtractRouteParams`, `ExtractSegmentParam`
* **Server Plugin & Build Config Types** (re-exported from `./index`): `DinouConfig`, `DinouPlugin`, `ServerHookContext`, `NodeMiddleware`

---

## 4. Cross-Environment Behavior (Server vs. Client Guards)

Because `"dinou"` re-exports Server-only, Universal, and Client-only utilities from a single entry point (`dinou/index.js`), every module inside `"dinou"` implements defensive isomorphic guards (`typeof window`) so that:
1. Importing `"dinou"` never breaks client or server bundlers.
2. Calling an API in the wrong environment degrades gracefully without crashing the render tree.

### 4.1. What Happens When a Client-Only API from `"dinou"` Is Imported/Called in a Server Component?

All three client-only utilities live in `dinou/core/navigation.js` and fall back to safe no-ops on the server:

1. **`useRouter()`** (`dinou/core/navigation.js`, lines 54–100):
   * In the React Server Components (`react-server`) environment, `React.useContext` does not exist. `navigation.js` defines a defensive fallback at the top of the file:
     ```js
     const useContext = React.useContext || (() => null);
     ```
   * When `useRouter()` is called in a Server Component, `context` evaluates to `null`, hitting the SSR guard (`if (!context)`) and returning an object with no-op methods so server rendering does not throw:
     ```js
     return {
       push: () => {},
       replace: () => {},
       back: () => {},
       forward: () => {},
       refresh: (options) => {},
     };
     ```
2. **`useNavigationLoading()`** (`dinou/core/navigation.js`, lines 34–49):
   * Explicitly checks `if (typeof window === "undefined") return false;`. In a Server Component, it always returns `false`.
3. **`refreshSlot(slotId, options)`** (`dinou/core/navigation.js`, lines 102–112):
   * Wrapped in `if (typeof window !== "undefined") { ... }`. In a Server Component, calling `refreshSlot()` is a silent no-op.

---

### 4.2. What Happens When a Server-Only API from `"dinou"` Is Imported/Called in a Client Component?

Whenever any Client Component writes `import { Link, useRouter } from "dinou"`, the client bundler traverses `dinou/index.js` and all of its imports. Therefore, server-only utilities in `"dinou"` are written with zero static Node.js dependencies:

1. **`getContext()`** (`dinou/core/request-context.js`, lines 59–68):
   * **At import/bundle time**: When `typeof window !== "undefined"`, it skips `AsyncLocalStorage` initialization and creates an in-memory dummy `requestStorage` (`{ run: (s, cb) => cb(), getStore: () => undefined }`).
   * **When called in a Client Component**: It logs an explicit `console.error` explaining the mistake and returns an empty object `{}` (so destructuring like `const { req } = getContext()` does not throw a fatal `TypeError` that crashes the React tree):
     ```js
     if (typeof window !== "undefined") {
       console.error(
         "[Dinou] ❌ You are calling getContext() inside a Client Component running in the browser. This function is Server-Only. Pass the data as props from a Server Component instead."
       );
       return {};
     }
     ```
2. **`noDynamic()`** (`dinou/core/no-dynamic.js`, lines 16–24):
   * **At import/bundle time**: Has zero imports (uses `globalThis[Symbol.for("dinou.ppr.noDynamic.hook")]`), adding negligible bytes and zero Node.js dependencies to the client bundle.
   * **When called in a Client Component**: Immediately returns via `if (typeof window !== "undefined") return;` (a safe no-op).
3. **`defineConfig(config)`** (`dinou/core/config.js`, lines 4–6):
   * Pure identity function (`return config;`). Completely inert in the browser and eliminated by bundler tree-shaking when unused.

---

## 5. Architectural Rationale: Why Does `"dinou/server"` Exist Separately from `"dinou"`?

Unlike `getContext()` and `noDynamic()`—which only communicate with `AsyncLocalStorage` via lightweight `globalThis` symbols—the APIs in `"dinou/server"` (`revalidatePath`, `revalidateTag`, `DinouCacheSlot`, `FileSystemStorage`, etc.) depend on **heavy server-only modules**:
* `dinou/core/cache-revalidate.js`
* `dinou/core/cache-slot.js`
* `dinou/core/render-jsx-to-client-jsx.js`
* `dinou/core/storage-adapter.js`
* Native Node.js modules (`node:fs`, `node:path`, `node:crypto`, `node:async_hooks`)

If those APIs were exported directly from `"dinou"` (`dinou/index.js`), any Client Component importing `Link` or `useRouter` from `"dinou"` would cause the client bundler to trace into the RSC compiler and `node:fs`, either breaking the client build or requiring brittle bundler-specific externals/shims.

Isolating them in `"dinou/server"` keeps `"dinou"` 100% browser-bundler safe while giving Server Components and Server Functions full access to Dinou's caching, revalidation, and storage engine.

---

## 6. Complete Distribution Matrix (`"dinou"` vs. `"dinou/server"`)

### 6.1. Runtime Exports (`.js`)

| Category | `"dinou"` (`dinou/index.js`) | `"dinou/server"` (`dinou/server.js`) | Rationale |
| :--- | :--- | :--- | :--- |
| **Client / SPA Navigation** | `Link`, `ClientRedirect`, `useRouter`, `useNavigationLoading`, `refreshSlot` | — | `"use client"` components and browser hooks; only exported from `"dinou"`. |
| **Isomorphic Navigation (Server + Client)** | `usePathname`, `useSearchParams`, `redirect` | — | Work seamlessly in both Server Components and Client Components from the universal `"dinou"` entry point. |
| **Build Configuration** | `defineConfig` | — | Identity helper for `dinou.config.ts`. |
| **Request Context & PPR Opt-Out (Zero `node:*` imports)** | `getContext`, `noDynamic` | `getContext`, `noDynamic` | **Exported from both**: safe for client bundlers in `"dinou"` and available in `"dinou/server"` so Server Components and Server Functions do not need to split imports. |
| **Cache Revalidation, Micro-ISR & Storage (`node:*` / RSC engine)** | — | `DinouCacheSlot`, `revalidatePath`, `revalidatePage`, `revalidateLayout`, `revalidateTag`, `StorageAdapter`, `FileSystemStorage`, `CloudflareKVStorage`, `DenoKVStorage`, `MemoryStorage`, `RedisStorage`, `getStorageAdapter`, `setStorageAdapter` | **Exclusive to `"dinou/server"`**: depend on the RSC compiler and native Node.js modules (`node:fs`, `node:path`, `node:crypto`, `node:async_hooks`). |

---

### 6.2. TypeScript Types (`.d.ts`)

| Type Group | `"dinou"` (`dinou/index.d.ts`) | `"dinou/server"` (`dinou/server.d.ts`) | Coherence |
| :--- | :---: | :---: | :--- |
| **Client Navigation & Component Props** (`LinkProps`, `ClientRedirectProps`, `NavigationOptions`) | ✅ | — | Only in `"dinou"`, alongside `Link`, `ClientRedirect`, and `useRouter`. |
| **Page / Layout / Error Props & Typed Routes** (`PageProps`, `LayoutProps`, `ErrorProps`, `RouteParams`, `DinouRoutePattern`, `DinouRoute`, `DinouRouter`, `CleanRoutePath`, `ExtractRouteParams`, `ExtractSegmentParam`) | ✅ | ✅ | In both: available whether a `page.tsx` / `layout.tsx` imports from `"dinou"` or consolidates its server imports into `"dinou/server"`. |
| **Route Segment Config (`page_functions.ts` / `layout_functions.ts`)** (`PageFunctions`, `LayoutFunctions`, `RouteSegmentConfig`, `PPRConfig`, `StaticPathItem`, `StaticPathsResult`) | ✅ | ✅ | In both. |
| **Server Request Context & Plugins** (`RequestContextStore`, `ResponseProxy`, `CookieOptions`, `Query`, `Cookies`, `Headers`, `DinouConfig`, `DinouPlugin`, `ServerHookContext`, `NodeMiddleware`) | ✅ | ✅ | In both, accompanying `getContext()` and server plugin configuration. |
| **Cache Slot & Storage Adapter Types** (`DinouCacheSlotProps`, `StorageItem`, `StorageAdapter` classes) | — | ✅ | Only in `"dinou/server"`, alongside `DinouCacheSlot` and the storage adapters. |

---

## 7. Practical Import Safety Rules (TL;DR & Details)

| Import Statement | In Server Component / Server Function (`"use server"`) | In Client Component (`"use client"`) |
| :--- | :---: | :---: |
| `import { ... } from "dinou"` (runtime values) | ✅ **OK** (100% safe) | ✅ **OK** (100% safe) |
| `import type { ... } from "dinou"` (TypeScript types) | ✅ **OK** (erased at compile time) | ✅ **OK** (erased at compile time) |
| `import { ... } from "dinou/server"` (runtime values) | ✅ **OK** (100% safe) | ❌ **NOT OK** (pulls `node:fs` / `node:path` into client bundler) |
| `import type { ... } from "dinou/server"` (TypeScript types) | ✅ **OK** (erased at compile time) | ✅ **OK** (erased at compile time) |

### 7.1. Is `import { ... } from "dinou"` Always Safe in a Server Component or Server Function?
**Yes — 100% safe in all cases:**
* **Server & Universal APIs** (`getContext`, `noDynamic`, `redirect`, `usePathname`, `useSearchParams`, `defineConfig`) execute natively on the server and read from the active `AsyncLocalStorage` request context.
* **Client Components exported from `"dinou"`** (`Link`, `ClientRedirect`) carry their own `"use client"` directive (`dinou/core/link.jsx` and `dinou/core/client-redirect.jsx`), so Dinou's RSC loader automatically registers them as Client References (`Symbol.for("react.client.reference")`) when rendered inside a Server Component.
* **Client Hooks/Utilities exported from `"dinou"`** (`useRouter`, `useNavigationLoading`, `refreshSlot`) include defensive SSR guards (`typeof window === "undefined"` and `React.useContext || (() => null)`), so even if accidentally invoked on the server they degrade to safe no-ops without throwing.

### 7.2. Can `import { ... } from "dinou/server"` Be Used in a Client Component (`"use client"`)?
* **Runtime value imports (`import { revalidateTag, DinouCacheSlot, ... } from "dinou/server"`) — NO:**
  * `dinou/server.js` statically imports `./core/storage-adapter.js` (which imports `node:path` and `node:fs`) and dynamically imports `./core/cache-revalidate.js` and `./core/cache-slot.js` (which depend on `node:fs`, `node:path`, `node:async_hooks`, `node:module`, and the RSC rendering pipeline).
  * Importing runtime values from `"dinou/server"` inside a `"use client"` file will cause the client bundler to trace into Node.js native modules (`node:fs`, `node:path`), failing the browser bundle build.
  * To trigger cache revalidation (`revalidateTag`, `revalidatePath`, etc.) from a Client Component, invoke a **`"use server"` Server Function** that imports and calls those functions on the server, or call `refreshSlot(slotId)` / `router.refresh()` from `"dinou"`.
* **Type-only imports (`import type { PageProps, ... } from "dinou/server"`) — YES (compile-time only):**
  * TypeScript completely erases `import type` statements before bundling, so they produce zero runtime imports in the browser bundle (though `import type { ... } from "dinou"` remains the idiomatic choice in Client Components).


