# Partial Prerendering (PPR) Evolution in Dinou — Mental Model, `noDynamic()` API & Internal Architecture

This document records the architectural evolution of **Partial Prerendering (PPR)** in Dinou, detailing the updated `<Suspense>` mental model, the new `noDynamic()` opt-out primitive, the behavior of `<DinouCacheSlot>` (`revalidate >= 1` vs. `revalidate={0}`), and the internal engine changes implemented across `./dinou`.

---

## 1. Motivation: Why the PPR Mental Model Evolved

### 1.1. Previous Behavior (Request-Context Bailout Only)
Previously, when a route enabled Partial Prerendering (`export const ppr = true`), Dinou only turned a `<Suspense>` boundary into a **Dynamic PPR Hole (`ppr-hole-N`)** if a Server Component inside that `<Suspense>` boundary accessed request-specific properties on `getContext().req` (`req.cookies`, `req.headers`, or `req.query`) via Dinou's Bailout Proxy.

This created two significant developer-experience gaps:
1. **`async` Server Components Fetching Live Data Without Reading `req`**:
   If a developer wrote an `async` Server Component inside `<Suspense>` that performed `await fetch("https://api.example.com/stock")` or `await db.inventory.getLiveCount()`—without reading `req.cookies`, `req.headers`, or `req.query`—Dinou resolved that promise at build time and baked the result into `shell.html` instead of streaming it per request as a Dynamic Hole.
2. **Uncached `<DinouCacheSlot revalidate={0}>` Inside `<Suspense>`**:
   If a developer placed `<DinouCacheSlot id="live-ticker" revalidate={0}>` inside `<Suspense>` on a PPR page without reading `req.cookies`/`headers`/`query`, `revalidate={0}` bypassed the slot file cache (`slot.json`), but did not trigger a PPR postpone on the enclosing `<Suspense>` boundary during the static shell build, causing its initial output to be baked into `shell.html`.

### 1.2. The New PPR Mental Model
When `ppr = true` is active on a route, `<Suspense>` now acts as a true **temporal boundary** by default:

1. **Outside `<Suspense>` → Static Shell (`shell.html`)**:
   Synchronous and `async` Server Components outside `<Suspense>` execute at build time (or during background ISR shell revalidation) and are baked into the immutable Static Shell (`0ms TTFB`). *(If a component outside `<Suspense>` reads `req.cookies`, `req.headers`, or `req.query`, the route performs a full-route bailout to dynamic SSR as before).*
2. **`<Suspense>` Wrapping an `async` Server Component → Dynamic PPR Hole by Default**:
   Any `async` Server Component (returning a `Promise` / thenable) rendered inside `<Suspense>` on a `ppr = true` route automatically postpones at build time, bakes the `<Suspense fallback={...}>` into `shell.html` (`<div data-ppr-hole="ppr-hole-N">`), and executes + streams fresh on **every incoming HTTP request**—whether it reads `req.cookies` or performs `await fetch(...)` / database queries.
3. **`<Suspense>` Wrapping `<DinouCacheSlot>` → Controlled by `revalidate`**:
   - **Cached Slot (`revalidate >= 1` or `revalidate` omitted)**: Resolved at build time into the Static Shell (`shell.html`) and persisted to `slots/<id>/slot.json` (`inStaticShell: true`), unless a child inside the slot reads `req.cookies`, `req.headers`, or `req.query` (which still postpones to a Dynamic Hole to prevent cache poisoning).
   - **Uncached Slot (`revalidate={0}`)**: Automatically triggers a PPR postpone (`slot-revalidate-0`), turning the enclosing `<Suspense>` boundary into a **Dynamic PPR Hole** that streams fresh on every request while remaining addressable on the client via `refreshSlot(id)`.
4. **`noDynamic()` Opt-Out → Static `<Suspense>` in the Static Shell**:
   When a developer intentionally uses `<Suspense>` around an `async` Server Component whose promise should resolve at build time and remain baked into `shell.html` (for example, a shared component that streams during `dinou dev` or on non-PPR routes, or an outer `<Suspense>` wrapper around a nested dynamic `<Suspense>` hole), calling `noDynamic()` synchronously before the component's first `await` opts that `<Suspense>` boundary out of becoming a Dynamic Hole.

---

## 2. Decision Matrix (`ppr = true`)

| Pattern Inside `<Suspense>` (when `ppr = true`) | Build-Time Result (`shell.html`) | Request-Time Behavior (`handlePprResume`) |
| :--- | :--- | :--- |
| **`async` Server Component** (`await fetch(...)`, `await db.query(...)`, etc.) | **Dynamic Hole (`ppr-hole-N`)**: `fallback` baked into `shell.html`; hole registered in `metadata.holes` | Executed on every request and streamed via `<template id="ppr-content-ppr-hole-N">` + inline DOM swap `<script>` |
| **Server Component reading `req.cookies`, `req.headers`, or `req.query`** | **Dynamic Hole (`ppr-hole-N`)**: `fallback` baked into `shell.html`; hole registered in `metadata.holes` | Executed on every request with live request context and streamed in parallel |
| **`<DinouCacheSlot revalidate={0}>`** | **Dynamic Hole (`ppr-hole-N`)**: `fallback` baked into `shell.html`; hole registered in `metadata.holes` | Executed on every request (bypassing `slot.json`) and streamed in parallel; supports client `refreshSlot()` |
| **`<DinouCacheSlot revalidate={N}>`** (`N >= 1` or omitted, no `req` reads) | **Static Shell**: `async` children inside the slot resolve at build time into `shell.html` and `slots/<id>/slot.json` (`inStaticShell: true`) | Served immediately in `shellPrelude` (`0ms TTFB`); refreshes by TTL clock, `revalidateTag()`, or client `refreshSlot()` |
| **`async` Server Component calling `noDynamic()`** (no `req` reads) | **Static Shell**: Promise resolves at build time and output is baked into `shell.html` (excluded from `metadata.holes`) | Served immediately in `shellPrelude` (`0ms TTFB`); **not** re-executed or re-streamed at request time |
| **Outer `<Suspense>` with `noDynamic()` wrapping an inner `<Suspense>`** | Outer boundary resolves into `shell.html`; inner `<Suspense>` becomes **Dynamic Hole (`ppr-hole-N`)** | Outer wrapper arrives at `0ms TTFB`; inner hole streams dynamically per request |

---

## 3. Developer Usage Examples

### 3.1. Default Dynamic Hole (`<Suspense>` + `async` Server Component)
No `getContext().req` access is required to create a dynamic hole. Any `async` Server Component wrapped in `<Suspense>` on a PPR route streams at request time by default:

```tsx
// src/products/[slug]/page_functions.ts
export const ppr = true;
```

```tsx
// src/products/[slug]/page.tsx
import { Suspense } from "react";

async function LiveStockBadge({ slug }: { slug: string }) {
  // Automatically becomes a Dynamic PPR Hole because it is an async
  // Server Component inside <Suspense> on a ppr = true route:
  const res = await fetch(`https://api.example.com/stock/${slug}`);
  const { stock } = await res.json();
  return <span className="badge">{stock} units available</span>;
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  return (
    <main>
      <h1>Product: {params.slug}</h1>
      <Suspense fallback={<span>Checking live stock...</span>}>
        <LiveStockBadge slug={params.slug} />
      </Suspense>
    </main>
  );
}
```

### 3.2. Opting Out into a Static `<Suspense>` Boundary with `noDynamic()`
Import `noDynamic` from `"dinou"` (or `"dinou/server"`) and call it **synchronously at the top of the `async` Server Component (before its first `await`)**:

```tsx
import { Suspense } from "react";
import { noDynamic } from "dinou";

async function BuildTimeDocsSidebar() {
  noDynamic(); // 👈 Opts this <Suspense> boundary into the Static Shell
  const tree = await loadDocsNavigationFromDisk();
  return <nav>{tree.map((item) => <a key={item.href} href={item.href}>{item.title}</a>)}</nav>;
}

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="layout">
      <Suspense fallback={<div className="sidebar-skeleton" />}>
        <BuildTimeDocsSidebar />
      </Suspense>
      <main>{children}</main>
    </div>
  );
}
```

#### Scoping Rules for `noDynamic()`
1. **Must be called before the first `await`**:
   Because Dinou short-circuits default `async` Server Components inside `<Suspense>` as soon as they return a `Promise` at their first `await`, `noDynamic()` must be called synchronously before the first `await` statement.
2. **Covers helper `async` sub-components within the same `<Suspense>` boundary**:
   Calling `noDynamic()` marks the enclosing `<Suspense>` boundary's store (`store.noDynamic = true`). Any child `async` Server Components rendered inside that **same** `<Suspense>` boundary also resolve statically at build time without needing to call `noDynamic()` again.
3. **Resets automatically on nested `<Suspense>` boundaries**:
   If a component that called `noDynamic()` renders a **nested** `<Suspense>` boundary inside its returned JSX, the nested `<Suspense>` boundary receives a fresh store with `noDynamic: false` and therefore becomes a Dynamic PPR Hole by default.
4. **Never overrides request-specific dynamic bailouts**:
   If a component (or child) inside a `<Suspense>` boundary with `noDynamic()` reads `req.cookies`, `req.headers`, or `req.query`, Dinou's Bailout Proxy still postpones that `<Suspense>` boundary into a Dynamic Hole so request data can never poison `shell.html`.

### 3.3. `<Suspense>` Wrapping `<DinouCacheSlot>` (`revalidate >= 1` vs. `revalidate={0}`)

```tsx
import { Suspense } from "react";
import { DinouCacheSlot } from "dinou/server";

export default function DashboardPage() {
  return (
    <main>
      {/* 1. Cached Slot (revalidate >= 1):
          Resolved at build time into shell.html and cached in slots/global-kpis/slot.json.
          Refreshes every 300s (or via revalidateTag("kpis") / refreshSlot("global-kpis")). */}
      <Suspense fallback={<div>Loading KPIs...</div>}>
        <DinouCacheSlot id="global-kpis" tag="kpis" revalidate={300}>
          <AsyncKpiSummary />
        </DinouCacheSlot>
      </Suspense>

      {/* 2. Uncached Slot (revalidate={0}):
          Postponed at build time into a Dynamic PPR Hole (ppr-hole-2).
          Streams fresh on every HTTP request and can also be re-fetched live via refreshSlot("live-feed"). */}
      <Suspense fallback={<div>Streaming live feed...</div>}>
        <DinouCacheSlot id="live-feed" revalidate={0}>
          <AsyncLiveFeed />
        </DinouCacheSlot>
      </Suspense>
    </main>
  );
}
```

---

## 4. Internal Architecture & Code Changes in `./dinou`

### 4.1. Browser-Safe & Server-Safe `noDynamic()` Hook (`dinou/core/no-dynamic.js`)
- **File Created**: [`dinou/core/no-dynamic.js`](./dinou/core/no-dynamic.js)
- **Exported From**:
  - [`dinou/index.js`](./dinou/index.js) & [`dinou/index.d.ts`](./dinou/index.d.ts) (`import { noDynamic } from "dinou"`)
  - [`dinou/server.js`](./dinou/server.js) & [`dinou/server.d.ts`](./dinou/server.d.ts) (`import { noDynamic } from "dinou/server"`)
- **Design**:
  Because `dinou/index.js` is also imported by Client Components (`"use client"`) for `Link`, `useRouter`, etc., `dinou/core/no-dynamic.js` contains **zero `node:*` imports** (`node:async_hooks` is never pulled into client bundles across Esbuild, Rollup, or Webpack). On the server, it invokes `globalThis[Symbol.for("dinou.ppr.noDynamic.hook")]` registered by `dinou/core/ppr-context.js`.

### 4.2. PPR Context State Tracking (`dinou/core/ppr-context.js`)
- **File Modified**: [`dinou/core/ppr-context.js`](./dinou/core/ppr-context.js)
- **Key Additions**:
  1. **`noDynamic()` & Per-Component / Per-`<Suspense>` Opt-Out Tracking**:
     - `noDynamic()` sets a synchronous per-invocation flag (`currentComponentNoDynamic = true`) and, if inside an active `<Suspense>` boundary (`store.suspenseDepth > 0`), sets `store.noDynamic = true` on that `<Suspense>` boundary's `childStore`.
     - When `runInSuspense` enters any `<Suspense>` boundary (including a nested `<Suspense>` inside an outer `noDynamic()` boundary), it initializes the new `childStore` with `noDynamic: false` and `settled: false`.
  2. **Cached Slot Scope (`runInCachedSlot` / `isInsideCachedSlot`)**:
     - Uses `cachedSlotStorage` (`AsyncLocalStorage`) to track when execution is inside a cached `<DinouCacheSlot>` (`revalidate >= 1` or `undefined`).
  3. **Slot Discovery Scope (`runInSlotDiscovery` / `isSlotDiscoveryActive`)**:
     - Unified `slotDiscoveryStorage` in `ppr-context.js` so cold-start `getSlotJSX` discovery passes can traverse into `async` Server Components inside `<Suspense>` to register nested `<DinouCacheSlot>`s without prematurely postponing at the outer `async` component.
  4. **Settled `<Suspense>` Guard (`store.settled`)**:
     - Once a `<Suspense>` boundary finishes or postpones during a PPR build, `suspenseStore.settled = true` prevents any background continuation of an already-postponed promise from pushing late side effects into `pendingEffects`.

### 4.3. Zero-Latency First-`await` Postponement (`dinou/core/render-jsx-to-client-jsx.js`)
- **File Modified**: [`dinou/core/render-jsx-to-client-jsx.js`](./dinou/core/render-jsx-to-client-jsx.js)
- **Mechanism (`invokeServerComponentInPpr`)**:
  ```js
  async function invokeServerComponentInPpr(fn, callFn) {
    resetComponentNoDynamicFlag();
    const rawResult = callFn();
    const optedOut = consumeComponentNoDynamicFlag();
    if (
      isThenable(rawResult) &&
      !isCacheSlotComponent(fn) &&
      isPprBuildActive() &&
      isInsideSuspense() &&
      !isSlotDiscoveryActive() &&
      !isInsideCachedSlot() &&
      !optedOut &&
      !isNoDynamicActive()
    ) {
      try {
        rawResult.then(null, () => {});
      } catch (_) {}
      markDynamicAccess("async-suspense");
    }
    return await rawResult;
  }
  ```
- **Why Short-Circuiting at `callFn()` (Before `await rawResult`) Matters**:
  1. **Instant Build Performance**: When `callFn()` invokes an `async` Server Component, JavaScript runs its synchronous prologue up to its first `await` and immediately returns a `Promise` (`rawResult`). If `noDynamic()` was not called, Dinou throws `markDynamicAccess("async-suspense")` right away without waiting for slow network fetches or database queries during `npm run build`.
  2. **Background Rejection Safety**: Because `callFn()` already started the component up to its first `await`, if the component's promise later resolves a timer and accesses `req.cookies` in the background (or rejects because a runtime-only DB is unavailable at build time), `rawResult.then(null, () => {})` swallows the late rejection so Node.js / Bun / Deno never crashes with `UnhandledPromiseRejection`.
  3. **Full Unwrapping Coverage**: `invokeServerComponentInPpr` is applied across standard function Server Components, `React.forwardRef` Server Components, and `React.memo` Server Components.
  4. **Deterministic `<Suspense>` Counting on Non-PPR Routes**: When `isPprBuildActive()` is `false`, `<Suspense>` boundaries still execute inside `runInSuspense` so `getPprHoleCounter()` (`X-Dinou-Suspense-Count`) remains accurate for child PPR pages inheriting a non-PPR parent layout.

### 4.4. `<DinouCacheSlot>` Integration (`dinou/core/cache-slot.js` & `dinou/server.js`)
- **Files Modified**: [`dinou/core/cache-slot.js`](./dinou/core/cache-slot.js), [`dinou/server.js`](./dinou/server.js)
- **Key Changes**:
  1. Both `DinouCacheSlot` in `dinou/core/cache-slot.js` and the re-export wrapper in `dinou/server.js` are tagged with `DinouCacheSlot.$$dinouCacheSlot = true` so `invokeServerComponentInPpr` delegates postponement decisions to `DinouCacheSlot` itself.
  2. **When `revalidate === 0` (or `< 1`, `isNoCache === true`)**:
     After registering the slot in `slotRegistry`, if `isPprBuildActive() && isInsideSuspense() && !isSlotDiscoveryActive()`, `DinouCacheSlot` calls `markDynamicAccess("slot-revalidate-0")`, turning the enclosing `<Suspense>` into a Dynamic PPR Hole.
  3. **When `revalidate >= 1` or `undefined` (`isNoCache === false`)**:
     `DinouCacheSlot` evaluates its children inside `runInCachedSlot(async () => ...)`, allowing `async` Server Components inside the cached slot to resolve at build time and populate `slots/<id>/slot.json` (`inStaticShell: true`) and `shell.html`—while still postponing if any child inside the slot accesses `req.cookies`, `req.headers`, or `req.query`.

### 4.5. Route/Layout `isPpr` Isolation (`dinou/core/handler.js` & `dinou/core/cache-revalidate.js`)
- **Files Modified**: [`dinou/core/handler.js`](./dinou/core/handler.js), [`dinou/core/cache-revalidate.js`](./dinou/core/cache-revalidate.js)
- **Key Changes**:
  - Updated SSG `____rsc_page____` / `____rsc_layout____` rendering in `handler.js` and `revalidateLayout` in `cache-revalidate.js` to pass `{ isPpr: Boolean(isRoutePpr) }` / `{ isPpr: isLayoutPpr }` into `runWithPprContext` instead of hardcoded `{ isPpr: true }`, ensuring `<Suspense>` boundaries on non-PPR routes (`ppr = false`) always resolve their `async` children into the static payload while still counting `<Suspense>` boundaries via `getPprHoleCounter()`.

