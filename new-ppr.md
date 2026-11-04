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

### 4.6. Runtime Zero-Execution Optimization for Static `<Suspense>` Boundaries (`dinou/core/ppr-runtime.js`, `dinou/core/ppr-context.js`, `dinou/core/get-jsx.js`)
- **Files Modified**: [`dinou/core/ppr-runtime.js`](./dinou/core/ppr-runtime.js), [`dinou/core/ppr-context.js`](./dinou/core/ppr-context.js), [`dinou/core/get-jsx.js`](./dinou/core/get-jsx.js)
- **Key Changes**:
  1. **Zero-Hole Fast Path**: In `handlePprResume` and `streamDynamicHoles` (`dinou/core/ppr-runtime.js`), if `holes` is an empty array (`holes.length === 0`, e.g., a PPR route where all `<Suspense>` boundaries opted into the Static Shell via `noDynamic()` or `<DinouCacheSlot revalidate={N}>`), Dinou flushes `shellPrelude` + `shellPostlude` immediately without invoking `getJSX` or traversing any components at runtime.
  2. **`runInRuntimeStaticSuspense` & `SKIP_STATIC_SUSPENSE_SYMBOL`**: When a PPR route has both Static `<Suspense>` boundaries and Dynamic `<Suspense>` Holes, `streamDynamicHoles` and `spliceDynamicHolesIntoShell` wrap the traversal of non-streamed (`!shouldStream`) `<Suspense>` boundaries inside `runInRuntimeStaticSuspense(...)`. When `noDynamic()` is called inside `runInRuntimeStaticSuspense(...)` at runtime (`!isPprBuildActive()`), it immediately throws `{ $$typeof: Symbol.for("dinou.ppr.skipStatic") }`, which `ppr-runtime.js` catches silently—preventing the `noDynamic()` component's async work from executing on runtime requests while still allowing synchronous wrappers with nested Dynamic `<Suspense>` holes to be traversed.
  3. **Early Stop Once All Dynamic Holes Are Found**: Both `streamDynamicHoles` (`holePromises.length >= knownHoleIds.size`) and `spliceDynamicHolesIntoShell` (`liveHolesMap.size >= knownHoleIds.size`) halt tree traversal immediately once all registered dynamic holes have been matched.
  4. **`skipLayoutProbe` in `handlePprResume`**: `handlePprResume` passes `{ skipLayoutProbe: true }` to `getJSX` so `dinou/core/get-jsx.js` does not perform a redundant pre-render probe of the layout tree when resuming dynamic holes.

---

## 5. Comprehensive Verification Matrix (`src/test-ppr`)

The folder [`src/test-ppr`](./src/test-ppr) exercises all combinations of the new PPR mental model end-to-end:

- **[`src/test-ppr/layout.tsx`](./src/test-ppr/layout.tsx) & [`src/test-ppr/layout_functions.ts`](./src/test-ppr/layout_functions.ts)** (`ppr = true`):
  - Layout Boundary 1 (`ppr-hole-1`): Static `<Suspense>` via `noDynamic()` &rarr; baked into `shell.html`, `0` runtime executions.
  - Layout Boundary 2 (`ppr-hole-2`): `<DinouCacheSlot id="test-ppr-layout-slot" revalidate={3600}>` &rarr; baked into `shell.html` (`inStaticShell: true`), `0` runtime executions.
  - Layout Boundary 3 (`ppr-hole-3`): Default `async` `<Suspense>` (`LayoutLiveClock`) &rarr; registered in `layout.metadata.json` (`holes: ["ppr-hole-3"]`) and streamed on every request.
- **[`src/test-ppr/page.tsx`](./src/test-ppr/page.tsx) & [`src/test-ppr/page_functions.ts`](./src/test-ppr/page_functions.ts)** (`ppr = true`, 12 Cases):
  - **Case 1 (`1A` & `1B`)**: Top-level `async` Page (`1A`) and unwrapped child `async` Server Component (`1B`, `UnwrappedAsyncChildOutsideSuspense`) outside `<Suspense>` &rarr; both baked into `shell.html` without requiring `noDynamic()`.
  - **Case 2 (`ppr-hole-4`)**: Default `<Suspense>` + `async` Server Component (pure `await`, no cookies/headers/query) &rarr; Dynamic PPR Hole (`case2-fallback` in `shell.html`, `case2-resolved` streamed live on every request).
  - **Case 3 (`ppr-hole-5`)**: `<Suspense>` + `async` Server Component reading `req.cookies`, `req.headers`, and `req.query` &rarr; Dynamic PPR Hole.
  - **Case 4 (`ppr-hole-6`)**: `<Suspense>` + `async` Server Component calling `noDynamic()` from `"dinou"` &rarr; Static `<Suspense>` (`case4-resolved` baked into `shell.html`, `0` runtime executions).
  - **Case 5 (`ppr-hole-7`)**: `<Suspense>` + parent `async` Server Component calling `noDynamic()` from `"dinou/server"` + nested `async` child inheriting `noDynamic` from the `<Suspense>` store &rarr; both baked into `shell.html`, `0` runtime executions.
  - **Case 6 (`ppr-hole-8`)**: `<Suspense>` + `async` Server Component calling `noDynamic()` **and** reading `req.cookies.theme` &rarr; Dynamic bailout overrides `noDynamic()`, becoming a Dynamic PPR Hole (`ppr-hole-8`).
  - **Case 7 (`ppr-hole-9`)**: `<Suspense>` + `async` Server Component calling `noDynamic()` **after** its first `await` &rarr; intercepted at the first `await`, becoming a Dynamic PPR Hole (`ppr-hole-9`).
  - **Case 8 (`ppr-hole-10`)**: `<Suspense>` + `<DinouCacheSlot revalidate={3600}>` &rarr; baked into `shell.html` and persisted to `slots/test-ppr-slot-cached/slot.json` (`inStaticShell: true`), `0` runtime executions until `/____rsc_slot____/test-ppr-slot-cached?fresh=1`.
  - **Case 9 (`ppr-hole-11`)**: `<Suspense>` + `<DinouCacheSlot>` (omitted `revalidate`) &rarr; baked into `shell.html` and persisted forever until on-demand invalidation.
  - **Case 10 (`ppr-hole-12`)**: `<Suspense>` + `<DinouCacheSlot revalidate={0}>` &rarr; Dynamic PPR Hole (`ppr-hole-12`), re-evaluated on every request and never written to disk.
  - **Case 11 (`ppr-hole-13`)**: `<Suspense>` + `<DinouCacheSlot revalidate={3600}>` reading `req.cookies.user` &rarr; postponed at build time into Dynamic PPR Hole (`ppr-hole-13`), then cached on first runtime request (`inStaticShell: false`) and refreshable via `/____rsc_slot____/test-ppr-slot-cookies?fresh=1`.
  - **Case 12 (`ppr-hole-14` & `ppr-hole-15`)**: Nested `<Suspense>` where the outer Static `<Suspense>` (`ppr-hole-14`) is baked into `shell.html` while the inner Dynamic `<Suspense>` (`ppr-hole-15`) is postponed and streamed at runtime.
- **[`src/test-ppr/all-static/page.tsx`](./src/test-ppr/all-static/page.tsx)**: PPR route (`ppr = true`) where all `<Suspense>` boundaries are static (`holes: []`), verifying zero runtime Server Component executions.
- **[`src/test-ppr/opt-out-route/page.tsx`](./src/test-ppr/opt-out-route/page.tsx)**: Child route (`ppr = false`) inside the `ppr = true` layout, verifying that direct page `await`, unwrapped child `async` components, and `<Suspense>` + `async` child components on `ppr = false` routes all resolve statically into `index.html` without requiring `noDynamic()` and execute `0` times at runtime.
- **[`src/test-ppr/bailout-cookies/page.tsx`](./src/test-ppr/bailout-cookies/page.tsx)**: PPR route (`ppr = true`) that reads `getContext().req.cookies` **outside** `<Suspense>`, verifying a **Full-Page Dynamic Bailout** (no `shell.html`, `index.html`, or `metadata.json` written to `.dinou/dist2`; full-page SSR on every request).
- **[`src/test-ppr/bailout-slot-0/page.tsx`](./src/test-ppr/bailout-slot-0/page.tsx)**: PPR route (`ppr = true`) that renders `<DinouCacheSlot revalidate={0}>` **outside** `<Suspense>`, verifying a **Full-Page Dynamic Bailout** (no `shell.html`, `index.html`, or `metadata.json` written to `.dinou/dist2`; full-page SSR on every request).
- **[`src/test-ppr/no-ppr-bailout/page.tsx`](./src/test-ppr/no-ppr-bailout/page.tsx)**: Non-PPR route (`ppr = false`) where a child `async` component **inside `<Suspense>`** reads `getContext().req.cookies`, verifying that when `ppr = false`, `<Suspense>` does **not** isolate dynamic request access into a hole and instead triggers a **Full-Page Dynamic Bailout**.

---

## 6. Taxonomy of Full-Page Dynamic Bailouts (`ppr = true`)

While dynamic operations **wrapped in `<Suspense>`** isolate dynamism into a **Dynamic PPR Hole** (preserving the Static Shell `shell.html`), dynamic operations performed **outside `<Suspense>`** (or via route segment configuration) force the **entire page** to bail out of static shell generation (`isDynamic = true`), skipping `.dinou/dist2/<route>/shell.html` and rendering 100% dynamically on every request:

| # | Full-Page Dynamic Bailout Trigger (when `ppr = true`) | Mechanism |
|---|---|---|
| **1** | **Reading dynamic request data outside `<Suspense>`**: `getContext().req.cookies`, `getContext().req.headers`, `getContext().req.query`, or calling `useSearchParams()` in a Server Component outside `<Suspense>` | `createBailoutProxy` invokes `markAsDynamic()` at build time (`dinou/core/build-static-pages.js`) and `markDynamic()` at runtime (`dinou/core/handler.js`) because `isInsideSuspense()` is `false`. |
| **2** | **Rendering `<DinouCacheSlot revalidate={0}>` (or `< 1`) outside `<Suspense>`** (or a `<DinouCacheSlot>` outside `<Suspense>` whose children read `req.cookies`/`headers`/`query`) | `DinouCacheSlot` checks `isNoCache` (`revalidate < 1`). When `isInsideSuspense()` is `false`, it calls `getContext()?._markDynamic?.()`, aborting static shell persistence for the entire page. |
| **3** | **Mutating response state outside `<Suspense>`**: `getContext().res.cookie()`, `res.clearCookie()`, `res.setHeader()`, `res.status()`, `res.redirect()` / `redirect()` | `safeResCall` invokes `markDynamic()` in `dinou/core/handler.js`, preventing the response from being cached to disk. |
| **4** | **Explicit route/layout configuration**: `export const revalidate = 0` in `page_functions.ts` or `layout_functions.ts` | `isDynamicRoute(revalidate)` evaluates to `true`, skipping build-time pre-rendering and forcing per-request dynamic SSR. |

---

## 7. Theoretical Analysis: `await` in `Page` vs. Child Server Components (`ppr = false` vs. `ppr = true`)

To understand how Dinou evaluates `async` Server Components in every possible structure, two orthogonal questions govern the behavior:
1. **Is the `await` executed outside `<Suspense>` or inside `<Suspense>`?**
2. **Is the `await` pure (e.g., `fetch`, DB query, file read, timer) or does it access per-request dynamic state (`cookies`, `headers`, `query`, or `revalidate = 0`)?**

### 7.1. Scenario 1: Route Without PPR (`ppr = false`, Default)

#### 1A. `await` Directly in `Page` vs. `await` in a Child `<ChildAsync />` (Both Outside `<Suspense>`)
```tsx
// Option A: Direct await in Page
export default async function Page() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// Option B: Page delegates await to <ChildAsync /> (without <Suspense>)
export default function Page() {
  return (
    <div>
      <h1>Title</h1>
      <ChildAsync /> {/* ChildAsync awaits fetchData() */}
    </div>
  );
}
```
- **Pure `await` (no `cookies`/`headers`/`query`, `revalidate !== 0`)**:
  - **Build Time (SSG)**: Option A and Option B behave **identically**. Dinou awaits the entire Server Component tree top-to-bottom—whether the `await` is in `Page` or in `<ChildAsync />`—and writes the complete HTML to `.dinou/dist2/<route>/index.html`.
  - **Runtime**: Served instantaneously from static cache (`0` Server Component executions), or regenerated in the background via ISR when `revalidate >= 1` expires.
- **Reads `cookies`/`headers`/`query` (or `revalidate = 0`)**:
  - **Build Time**: Both Option A and Option B trigger a **Full-Page Dynamic Bailout** (`index.html` is not generated).
  - **Runtime (SSR)**: On every request, Dinou executes `Page` and `<ChildAsync />`, awaits all promises, and returns the dynamically rendered HTML.

#### 1B. `await` in `<ChildAsync />` Wrapped in `<Suspense>` when `ppr = false`
```tsx
export default function Page() {
  return (
    <div>
      <h1>Title</h1>
      <Suspense fallback={<p>Loading...</p>}>
        <ChildAsync />
      </Suspense>
    </div>
  );
}
```
- **Pure `await` (static route)**:
  - **Build Time (SSG)**: Because `ppr` is `false`, Dinou does **not** create PPR holes. It awaits `<ChildAsync />` during the build and bakes its resolved content directly into `index.html` (the `<Suspense>` fallback is never persisted into the static HTML).
  - **Runtime**: Served from static `index.html` with `0` Server Component executions (verified in [`src/test-ppr/opt-out-route/page.tsx`](./src/test-ppr/opt-out-route/page.tsx)).
- **Reads `cookies`/`headers`/`query` (or `revalidate = 0`) inside `<Suspense>` when `ppr = false`**:
  - **Build Time**: Because `ppr` is `false`, `<Suspense>` does **not** isolate the dynamic access into a PPR hole—the **entire page** bails out of static generation (verified in [`src/test-ppr/no-ppr-bailout/page.tsx`](./src/test-ppr/no-ppr-bailout/page.tsx)).
  - **Runtime (Streaming SSR)**: The entire page renders dynamically on each request, and React's native SSR streaming can flush `<h1>Title</h1>` + `<p>Loading...</p>` first and stream `<ChildAsync />` in the same HTTP response once its `await` resolves.

---

### 7.2. Scenario 2: Route With PPR (`ppr = true`)

When `ppr = true`, **`<Suspense>` is the explicit boundary** separating the **Static Shell (build time)** from **Dynamic Holes (runtime)**.

#### 2A. `await` Directly in `Page` vs. `await` in `<ChildAsync />` **Outside `<Suspense>`** (`ppr = true`)
```tsx
// Option A: Direct await in Page (outside <Suspense>)
export default async function Page() {
  const data = await fetchStaticHeader();
  return <header>{data}</header>;
}

// Option B: await in <ChildAsync /> rendered OUTSIDE <Suspense>
export default function Page() {
  return (
    <main>
      <ChildAsync /> {/* NOT wrapped in <Suspense> */}
    </main>
  );
}
```
- Internally, [`invokeServerComponentInPpr`](./dinou/core/render-jsx-to-client-jsx.js) checks `isPprBuildActive() && isInsideSuspense()`.
- Because neither `Page` (Option A) nor `<ChildAsync />` (Option B) is inside a `<Suspense>` boundary (`isInsideSuspense() === false`), **both belong to the Static Shell** and behave **identically**:
  1. **Pure `await` (no `cookies`/`headers`/`query`, no `DinouCacheSlot revalidate={0}`)**:
     - **Build Time**: Dinou awaits both `Page` and `<ChildAsync />` and bakes their resolved HTML into `shell.html` (no `noDynamic()` call is required outside `<Suspense>`; verified in Case 1A & Case 1B of [`src/test-ppr/page.tsx`](./src/test-ppr/page.tsx)).
     - **Runtime Performance Note**: If the PPR route has `0` Dynamic Holes (`holes: []`, e.g., [`src/test-ppr/all-static/page.tsx`](./src/test-ppr/all-static/page.tsx)), Dinou serves `shell.html` immediately without invoking `Page` or `<ChildAsync />` (`0` runtime executions). If the route *does* have Dynamic Holes (`holes.length > 0`), `shell.html` is still flushed at 0ms TTFB, and the server then invokes `Page` (and any unwrapped parent/sibling component rendered before the last Dynamic Hole) to reach the `<Suspense>` holes in the JSX tree—whereas static `async` components wrapped in `<Suspense>` with `noDynamic()` or `<DinouCacheSlot revalidate={N}>` are skipped (`0` runtime executions).
  2. **Reads `cookies`/`headers`/`query` or renders `<DinouCacheSlot revalidate={0}>` outside `<Suspense>`**:
     - **Build Time & Runtime**: Because there is no enclosing `<Suspense>` boundary to hold a fallback placeholder, Dinou cannot create a Dynamic Hole and triggers a **Full-Page Dynamic Bailout** (`shell.html` is discarded and the entire page renders via per-request SSR; verified in [`src/test-ppr/bailout-cookies/page.tsx`](./src/test-ppr/bailout-cookies/page.tsx) and [`src/test-ppr/bailout-slot-0/page.tsx`](./src/test-ppr/bailout-slot-0/page.tsx)).

#### 2B. `await` in `<ChildAsync />` **Inside `<Suspense>`** (`ppr = true`)
```tsx
export default async function Page() {
  const shellData = await fetchShellData(); // Resolved at build -> baked into shell.html
  return (
    <main>
      <h1>{shellData}</h1>
      <Suspense fallback={<Spinner />}>
        <ChildAsync /> {/* Wrapped in <Suspense> */}
      </Suspense>
    </main>
  );
}
```
Here `Page` (and any unwrapped `<ChildAsync />` outside `<Suspense>`) is baked into `shell.html`, while `<ChildAsync />` inside `<Suspense>` (`isInsideSuspense() === true`) follows the PPR mental model:
1. **Default (no `noDynamic()`, not inside a cached `<DinouCacheSlot>`)**:
   - Intercepted at its first `await` during the build &rarr; `<Spinner />` is baked into `shell.html` as a **Dynamic PPR Hole**, and `<ChildAsync />` is executed and streamed live on every request (Case 2 & Case 3 of [`src/test-ppr/page.tsx`](./src/test-ppr/page.tsx)).
2. **With `noDynamic()` (before the first `await`) or `<DinouCacheSlot revalidate={N}>` ($N \ge 1$)**:
   - If it does not access `cookies`/`headers`/`query`, Dinou awaits `<ChildAsync />` at build time, bakes its resolved HTML into `shell.html`, and skips executing `<ChildAsync />` at runtime (`0` runtime executions; Cases 4, 5, 8, and 9 of [`src/test-ppr/page.tsx`](./src/test-ppr/page.tsx)).

---

### 7.3. Complete Comparative Summary Matrix

| Where is the `await`? | Wrapped in `<Suspense>`? | Reads `cookies` / `headers` / `query` (or `revalidate = 0`)? | Behavior when `ppr = false` | Behavior when `ppr = true` | Verified in `src/test-ppr` |
|---|---|---|---|---|---|
| In `Page` or `<ChildAsync />` | **No** | **No** | Resolved at build (`index.html`), `0` runtime executions | Resolved at build into Static Shell (`shell.html`) | `page.tsx` (Case 1A & 1B), `opt-out-route/page.tsx` |
| In `Page` or `<ChildAsync />` | **No** | **Yes** | **Full-Page Dynamic Bailout** (per-request SSR) | **Full-Page Dynamic Bailout** (no `<Suspense>` to isolate hole; per-request SSR) | `bailout-cookies/page.tsx`, `bailout-slot-0/page.tsx` |
| In `<ChildAsync />` | **Yes** | **No** | Resolved at build (`index.html`), `0` runtime executions | **Dynamic PPR Hole by default** (`fallback` in `shell.html` + live runtime stream), **unless** opted out via `noDynamic()` or `<DinouCacheSlot revalidate={N}>` ($N \ge 1$) | `page.tsx` (Cases 2, 4, 5, 8, 9), `opt-out-route/page.tsx` |
| In `<ChildAsync />` | **Yes** | **Yes** | **Full-Page Dynamic Bailout** (per-request streaming SSR) | **Dynamic PPR Hole** (rest of page keeps static `shell.html`; only this `<Suspense>` streams at runtime) | `page.tsx` (Cases 3, 6, 10, 11), `no-ppr-bailout/page.tsx` |

---

### 7.4. Destination Classification when `ppr = true`: Static Shell vs. Dynamic Hole vs. Full-Page Bailout

When `ppr = true`, every component in the route tree falls into one of three destinations:

#### A. Baked into the Static Shell (`.dinou/dist2/<route>/shell.html` at Build Time)
1. **Any component (synchronous or `async`) rendered OUTSIDE `<Suspense>`** (`Page`, `Layout`, or an unwrapped `<ChildAsync />`), provided it does not read `cookies`/`headers`/`query`, does not render `<DinouCacheSlot revalidate={0}>`, and does not mutate `res`.
2. **`<Suspense>` wrapping only synchronous components** that do not read `cookies`/`headers`/`query`.
3. **`<Suspense>` wrapping an `async` Server Component that calls `noDynamic()` before its first `await`**, provided its subtree does not read `cookies`/`headers`/`query` or render `<DinouCacheSlot revalidate={0}>`.
4. **`<Suspense>` wrapping `<DinouCacheSlot revalidate={N}>` ($N \ge 1$) or `<DinouCacheSlot>` (omitted `revalidate`)**, provided its subtree does not read `cookies`/`headers`/`query`.

#### B. Postponed into a Dynamic PPR Hole (`data-ppr-hole` Fallback in `shell.html` + Streamed at Runtime)
*(All cases require being **wrapped inside `<Suspense>`**)*:
1. **`<Suspense>` wrapping an `async` Server Component by default** (without `noDynamic()` before its first `await` and outside a cached `DinouCacheSlot`), even if it only performs a pure `await` without reading `cookies`/`headers`/`query`.
2. **`<Suspense>` whose subtree reads `getContext().req.cookies`, `req.headers`, `req.query`, or `useSearchParams()`** (even if it called `noDynamic()` or is inside `<DinouCacheSlot revalidate={N}>`).
3. **`<Suspense>` wrapping `<DinouCacheSlot revalidate={0}>`**.

#### C. Full-Page Dynamic Bailout (No `shell.html`; 100% Per-Request Dynamic SSR)
- Occurs whenever any dynamic operation from Group B (`cookies`, `headers`, `query`, `<DinouCacheSlot revalidate={0}>`, `res` mutations, or `export const revalidate = 0` in `page_functions.ts` / `layout_functions.ts`) happens **outside any `<Suspense>` boundary**.

---

### 7.5. `<DinouCacheSlot revalidate={N}>` ($N \ge 1$) Lifecycle & TTL Expiration Transition (`ppr = true`)

When `ppr = true` and a `<DinouCacheSlot id="..." revalidate={N}>` ($N \ge 1$) does not read `cookies`/`headers`/`query`, it behaves **identically** whether it is wrapped in `<Suspense>` or rendered outside `<Suspense>`:

1. **Build Time (`npm run build`)**:
   - `DinouCacheSlot` executes its children, writes its serialized JSX to `.dinou/dist2/slots/<id>/slot.json` with `{ revalidate: N, generatedAt, inStaticShell: true }`, records its slot tags in `metadata.json` (`slotTags`), and bakes its resolved HTML into `shell.html`.
2. **Runtime While Cache Is Valid ($t \le \text{generatedAt} + N$)**:
   - The slot's HTML is served directly inside `shell.html`, and its child component executes **`0` times** at runtime.
3. **Runtime Transition When `revalidate` ($N$ seconds) Expires ($t > \text{generatedAt} + N$)**:
   - Unlike full-page ISR (which serves stale HTML and regenerates the whole page in the background), **Static-Shell Slot expiration is refreshed synchronously on the first request after expiration, but only re-executes the expired slot**:
     - Before flushing `shell.html`, [`dinou/core/handler.js`](./dinou/core/handler.js) checks `await hasExpiredSlots(cachedItem.metadata.slotTags)` (and similarly for layout slots).
     - When `hasExpiredSlots` returns `true`, Dinou awaits `revalidatePage(reqPath, { onlyRefreshSlots: true })` ([`dinou/core/cache-revalidate.js`](./dinou/core/cache-revalidate.js)).
     - `revalidatePage(..., { onlyRefreshSlots: true })` deserializes `shell.page.json` and runs [`refreshNestedSlotsInTree`](./dinou/core/cache-slot.js), which **re-executes only the expired `<DinouCacheSlot>`** (without re-running the rest of the Static Shell), updates `.dinou/dist2/slots/<id>/slot.json` with a fresh `generatedAt`, and recomposes `.dinou/dist2/<route>/shell.html` and `shell.rsc`.
     - Concurrent requests arriving at that exact moment are deduplicated via `inflightSlotRenders` and `enqueueRevalidation`, and the client immediately receives the updated `shell.html` (followed by the live stream of any Dynamic PPR Holes on the page).





