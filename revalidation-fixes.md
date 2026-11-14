# Revalidation, Distributed Storage (`RedisStorage`) & 3D Cache Lifecycle Fixes — Architecture, Diffs & Verification Guide

This document details the root causes, exact framework changes implemented across `dinou`, ready-to-paste `CHANGELOG.md` entries, and complete unit + Dual-Bundle E2E verification test suites for fixing **six interconnected bugs in Dinou's revalidation and pluggable storage pipeline** prior to publishing `dinou@9.4.0`:

1. **Bug #1 — `revalidateLayout` Ignored Relative Paths (`"./"`, `".."`, `"../..."`)** (`dinou/core/cache-revalidate.js`, `dinou/server.d.ts`).
2. **Bug #2 — `RedisStorage` Lacked `keys()`, Path/Companion Key Normalization, Options Signature & Cluster Tombstones (`revalidateTag` Silently No-Op'd on Redis)** (`dinou/core/storage-adapter.js`, `dinou/server.d.ts`).
3. **Bug #3 — Custom `storage` in `dinou.config.*` Was Overwritten at Runtime, Written to During SSG Builds, Ignored Pre-Rendered `.dinou/dist2` Artifacts & Lacked TypeScript Typing (`DinouConfig.storage`)** (`dinou/index.d.ts`, `dinou/server.d.ts`, `dinou/core/storage-adapter.js`, `dinou/core/handler.js`, `dinou/core/generate-static.js`, `dinou/core/cache-revalidate.js`, `dinou/core/cache-slot.js`, `dinou/core/ppr-runtime.js`, `dinou/node/build.js`, `dinou/node/dev.js`, `dinou/bun/build.js`, `dinou/deno/build.js`, `dinou/cloudflare/build.js`).
4. **Bug #4 — Non-Edge Standalone `revalidatePage` / `revalidatePath` / `revalidateLayout` Crashed with `ReferenceError: getBuildStaticPage is not defined` & Hardcoded `.dinou/dist2`** (`dinou/core/cache-revalidate.js`).
5. **Bug #5 — Cold Distributed Pods Rejected `shell.page.json` / `shell.layout.json` / `*metadata.json` on Slot Tag Invalidations & Clobbered Updated Metadata** (`dinou/core/storage-adapter.js`).
6. **Bug #6 — Slot-Only Refreshes (`onlyRefreshSlots: true`) Reset `pageGeneratedAt` / `layoutGeneratedAt`, Starving Host Segment Time-Based ISR TTLs** (`dinou/core/cache-revalidate.js`, `dinou/core/handler.js`).

---

## 1. Problem Statement & Root Causes

### 1.1. Bug #1: `revalidateLayout("./")` Failed to Resolve Relative Paths Inside Server Functions

#### Intended Behavior
Inside Server Functions (`"use server"`), all path-based revalidation helpers (`revalidatePage`, `revalidatePath`, and `revalidateLayout`) should resolve relative paths (`"./"`, `".."`, `"../billing"`) against the caller's active route via `x-dinou-current-path` (sent automatically by Dinou's Server Function proxy), falling back to `Referer` and `ctx.req.path`.

#### Root Cause
`revalidatePage(reqPath)` called `normalizeRevalidatePath(reqPath)` (lines 250–286 of `dinou/core/cache-revalidate.js`), which resolved relative paths and stripped `?query` / `#hash`. However, `revalidateLayout(reqPath)` bypassed `normalizeRevalidatePath` and executed:

```js
// ❌ Previous behavior in dinou/core/cache-revalidate.js
let targetPath = String(reqPath || "/").trim() || "/";
if (!targetPath.startsWith("/")) {
  targetPath = "/" + targetPath;
}
```

Calling `await revalidateLayout("./")` inside a Server Function on `/dashboard/settings` literally targeted `"/./"` (`.dinou/dist2/./layout.rsc`) instead of `"/dashboard/settings"`, silently missing the active layout. In addition, when neither `x-dinou-current-path` nor `Referer` was present, `normalizeRevalidatePath` fell back to `ctx.req.path`, which inside a Server Function is `"/____server_function____"`.

---

### 1.2. Bug #2: `RedisStorage` Silently Skipped `revalidateTag()`, Misaligned Cache Keys, and Resurrected Invalidated Artifacts Across Pods

#### Root Causes
1. **Missing `keys(prefix)` method**: `revalidateTag(tag)` in `dinou/core/cache-revalidate.js` gated distributed tag lookup behind `if (storage && typeof storage.keys === "function")`. While `FileSystemStorage`, `MemoryStorage`, `CloudflareKVStorage`, and `DenoKVStorage` all implemented `keys()`, `RedisStorage` did **not**—causing `revalidateTag()` to silently become a 100% no-op whenever `RedisStorage` was active.
2. **Unnormalized keys & missing companion mirroring/eviction**:
   - `RedisStorage._key(key)` concatenated `${this.prefix}${key}` directly without stripping leading/trailing slashes or normalizing Windows backslashes (`"dinou:cache:/blog"` vs `"dinou:cache:blog/index.html"`).
   - Unlike `FileSystemStorage` and `MemoryStorage`, `RedisStorage.set("blog/index.html", ...)` did not mirror `"blog"` (and vice versa), `get("blog")` did not check `"blog/index.html"`, and `delete("blog")` / `delete("slots/x/slot.json")` did not evict companion `"blog/index.html"` or `"slots/x/slot.metadata.json"` keys.
3. **Constructor options mismatch**: Custom setups passing `new RedisStorage(redis, { prefix: "app:" })` produced `[object Object]` prefixes because the second parameter only accepted a raw string.
4. **Multi-pod resurrection of `.dinou/dist2` artifacts**: Without cluster-wide tombstones (`__tombstone__:<key>`) and tag invalidation timestamps (`__tag_inv__:<tag>`) stored in Redis itself, invalidating a tag or deleting a key on Pod A left Pod B unaware—causing Pod B to re-hydrate stale build-time `.dinou/dist2` files back into Redis on its next request.

---

### 1.3. Bug #3: `DinouConfig.storage` Was Untyped, Overwritten by Server Entrypoints, Executed During SSG Builds, and Blind to `.dinou/dist2`

#### Root Causes
1. **Missing TypeScript property**: `export interface DinouConfig` in `dinou/index.d.ts` only declared `plugins?` and `setupFiles?`, omitting `storage?: StorageAdapter`. Using `defineConfig({ storage: new RedisStorage(...) })` in `dinou.config.ts` failed `tsc --noEmit` with `TS2353`.
2. **Overwritten by `initStorage()`**: In `node/build.js`, `node/dev.js`, `bun/build.js`, `deno/build.js`, and `cloudflare/build.js`, `initStorage()` unconditionally called `setStorageAdapter(new FileSystemStorage(...))` or `new CloudflareKVStorage(...)` on startup, clobbering any adapter bound via `dinou.config.*` or `setStorageAdapter()` in `setupFiles`. Furthermore, `handler.js` only applied `cfg.storage` once inside `dinouConfigPromise`, never re-binding if overwritten.
3. **SSG build pollution (`generate-static.js`)**: During `npm run build`, `generate-static.js` initializes `new FileSystemStorage(".dinou/dist2")` and then calls `rscModule.handleRequest(webReq, { isSSG: true })`. Inside `handleRequest`, `await getDinouConfig()` loaded `dinou.config.ts` and called `setStorageAdapter(cfg.storage)`—hijacking the SSG build into writing build artifacts to live Redis (or crashing if Redis wasn't reachable in CI) instead of `.dinou/dist2`!
4. **No lazy `.dinou/dist2` hydration for distributed adapters**: When a production Node/Bun/Deno pod booted with a cold `RedisStorage` (or `DenoKVStorage`), `handler.js`, `cache-revalidate.js`, `cache-slot.js`, and `ppr-runtime.js` only checked `storage.get(key)` and Cloudflare's `env.ASSETS`, ignoring local `.dinou/dist2` SSG artifacts and forcing expensive live SSR re-renders on every pre-built static route.

---

### 1.4. Bug #4: Crashes in Standalone Node / Vitest / Queue Workers (`ReferenceError: getBuildStaticPage is not defined`)

#### Root Cause
In `dinou/core/cache-revalidate.js`:
- `revalidatePage` and `revalidateTag` branched on `if (isEdgeRuntime())` (`DINOU_RUNTIME === "edge" | "node-bundle" | "bun-bundle" | "deno-bundle"`).
- When invoked in a standalone Node process where `isEdgeRuntime()` was `false` (such as Vitest unit tests with `setStorageAdapter(new MemoryStorage())`, standalone queue workers invalidating `RedisStorage`, or pure Node scripts), `revalidatePage` fell through to removed legacy helpers `getBuildStaticPage()` and `getGenerateStaticRSC()`, immediately crashing with `ReferenceError: getBuildStaticPage is not defined`!
- Furthermore, that legacy branch hardcoded `.dinou/dist2` on disk (`fs.copyFileSync`, `walkMetadataFiles(".dinou/dist2")`), completely ignoring `getStorageAdapter()`.

---

### 1.5. Bug #5: Cold Distributed Pods Rejected `shell.page.json` / `shell.layout.json` & `*metadata.json` After Slot Tag Invalidation

#### Root Cause
During Dual-Bundle + `RedisStorage` E2E verification, two subtle interactions surfaced in `.dinou/dist2` fallback hydration (`readDist2Fallback`):
1. **`shell.page.json` & `shell.layout.json` rejected on `slotTags`**: `FileSystemStorage.get("dashboard/settings/shell.page.json")` attaches companion `metadata.json` (which contains both route `tags` and nested `slotTags`). When `revalidateTag("quota-tag")` invalidated a slot tag (`markTagInvalidatedAsync("quota-tag")`) and then invoked `revalidatePage("/dashboard/settings", { onlyRefreshSlots: true })`, `readDist2Fallback` checked `slotTags` against `invAt >= generatedAt` and returned `null` for `shell.page.json`! Without `shell.page.json`, `revalidatePage` fell back to re-executing `SettingsPage` from scratch instead of splicing only the refreshed `<DinouCacheSlot>` into the cached page shell.
2. **`*metadata.json` rejected after `markTagInvalidatedAsync` & companion metadata clobbering**: If `revalidateTag(tag)` ran on a 100% cold `RedisStorage` pod *before* any HTTP request had hydrated `metadata.json`, `markTagInvalidatedAsync(tag)` ran before scanning `.dinou/dist2` metadata files; rejecting `*metadata.json` on `invAt >= generatedAt` blinded `revalidateTag` to affected routes on cold pods. Conversely, hydrating `shell.page.json` from `.dinou/dist2` unconditionally rewrote companion `metadata.json` in `storage`, clobbering any newer `metadata.json` already written to `RedisStorage`.

---

### 1.6. Bug #6: Slot-Only Splicing (`onlyRefreshSlots: true`) Starved Host Page & Layout Time-Based ISR TTLs

#### Root Cause
`handler.js` tracks `pageGeneratedAt` separately from `generatedAt` so that lazy layout re-composition advances `generatedAt` without resetting `page.tsx`'s own ISR countdown (`Date.now() > pageOwnGeneratedAt + pageOwnRevalidate * 1000`).
However:
1. In `revalidatePage(reqPath, { onlyRefreshSlots: true })`, line 413 unconditionally set `currentMeta.pageGeneratedAt = newGenTime;` even when `page.tsx` was **not** executed and slots were merely spliced into `shell.page.json`. If a route had `revalidate = 60` and a `<DinouCacheSlot revalidate={5}>`, refreshing the slot every 5s reset `pageGeneratedAt` forever—starving the host page's 60s ISR TTL!
2. Layouts (`layout.metadata.json`) lacked an analogous `layoutGeneratedAt` field, so splicing a nested slot inside a layout (`revalidateLayout(path, { onlyRefreshSlots: true })`) reset `generatedAt` and starved the host layout's own `revalidate` TTL as well.

---

## 2. Summary of Framework Changes Implemented in `dinou/`

### 2.1. `dinou/core/storage-adapter.js`
- **`StorageAdapter` Base Lifecycle & Tracking**:
  - Added `this.hydrateFromDisk = true` on `StorageAdapter` (`false` by default on `MemoryStorage` unless `new MemoryStorage({ hydrateFromDisk: true })` so unit tests stay 100% isolated from `.dinou/dist2`).
  - Added async-capable invalidation/deletion hooks (`markTagInvalidatedAsync`, `getTagInvalidatedAtAsync`, `isKeyDeleted`) alongside sync `markTagInvalidated`, `getTagInvalidatedAt`, `isDeleted`.
  - Updated `_markDeleted` / `_unmarkDeleted` to track companion slot keys (`slots/<id>/slot.json` <-> `slots/<id>/slot.metadata.json`) in addition to `route` <-> `route/index.html`.
- **`RedisStorage` Full Parity & Cluster Safety**:
  - Updated constructor signature to `constructor(redisClient, prefixOrOptions = "dinou:cache:")` accepting either a string prefix or `{ prefix?: string, hydrateFromDisk?: boolean }`.
  - Added `_cleanKey(key)` normalization (stripping leading/trailing slashes and normalizing `\` -> `/`), `route` <-> `route/index.html` mirroring & fallback lookup in `get()` / `set()` / `has()`, and companion deletion (`index.html`, `slot.metadata.json`) in `delete()`.
  - Added Redis-backed cluster tombstones (`<prefix>__tombstone__:<key>`) written on `delete()` and cleared on `set()`, plus distributed tag invalidation timestamps (`<prefix>__tag_inv__:<tag>`) via `markTagInvalidatedAsync` / `getTagInvalidatedAtAsync` so multi-pod deployments never resurrect invalidated `.dinou/dist2` artifacts on sibling pods.
  - Implemented `async keys(prefix = "")` supporting all major Redis clients out of the box (filtering out internal `__tombstone__:` and `__tag_inv__:` keys and stripping `this.prefix`):
    1. `scanIterator` (`redis` / `node-redis` v4 & v5 — handling both yielded arrays in v5 and yielded strings in v4),
    2. `scanStream` (`ioredis`),
    3. `keys(pattern)` (`@upstash/redis` & universal clients),
    4. Cursor-based `scan(cursor, ...)` fallback (`[nextCursor, batch]` tuple and `{ cursor, keys }` object shapes).
- **`hasExplicitStorageAdapter()` & `readDist2Fallback(storage, key, knownTags)`**:
  - Added `hasExplicitStorageAdapter()` (`Boolean(globalThis[DINOU_STORAGE_KEY])`) so platform `initStorage()` functions never clobber user-configured adapters.
  - Added `readDist2Fallback(storage, key, knownTags)` to lazily hydrate missing pre-rendered `.dinou/dist2` artifacts into non-FS adapters when `storage.hydrateFromDisk !== false` and `!isKeyDeleted(key)`:
    - `*metadata.json` files are returned directly (unless explicitly deleted) so tag/slot discovery works even on 100% cold pods after `markTagInvalidatedAsync`.
    - `shell.page.json` and `shell.layout.json` validate only host segment `tags` (using `pageGeneratedAt` / `layoutGeneratedAt`), **ignoring `slotTags`** so `onlyRefreshSlots: true` can still splice refreshed slots into the host shell without re-executing `page.tsx` / `layout.tsx`.
    - Content artifacts (`index.html`, `shell.html`, `page.rsc`, `shell.rsc`, `rsc.rsc`, `layout.rsc`, `slot.json`) check both `tags` and `slotTags` against `invAt >= generatedAt` so stale build-time content is never resurrected.
    - Companion metadata is only seeded into `storage` if `!metaDeleted && !(await storage.has(companionMetaKey))`, never overwriting newer metadata already in `storage`.

### 2.2. `dinou/core/cache-revalidate.js`
- **`normalizeRevalidatePath(reqPath)`**:
  - Avoids falling back to `"/____server_function____"` when `ctx.req.path` is the internal Server Function endpoint.
  - Applied `normalizeRevalidatePath(reqPath)` at the entry of `revalidateLayout(reqPath, internalOptions)` so `"./"`, `".."`, `"../..."`, query strings, and hashes work identically across `revalidatePage`, `revalidatePath`, and `revalidateLayout`.
- **Unified Pluggable Storage Pipeline (Zero `ReferenceError` in Standalone / Vitest / Workers)**:
  - Removed the broken non-Edge legacy branch in `revalidatePage` and `revalidateTag` that called undefined `getBuildStaticPage` / `getGenerateStaticRSC` and hardcoded `.dinou/dist2`.
  - All environments now go through `getStorageAdapter()`. When running in a standalone environment without an active RSC renderer (`!isEdgeRuntime()` and `!didRenderFreshPage` / `!didRenderFreshLayout`, e.g. Vitest or an external Queue Worker), `revalidatePage` and `revalidateLayout` cleanly evict the target route/layout keys from `storage` (recording deletion tombstones) instead of throwing or writing empty HTML.
  - Guarded against writing empty cache entries when invoked on a non-existent, uncached route (`if (!pagePath && !cached && !existingPageRsc) return;`).
- **Cold-Pod `.dinou/dist2` Tag Discovery in `revalidateTag(tag)`**:
  - Calls `await storage.markTagInvalidatedAsync(tag)` and, when `!isFsStorage && storage.hydrateFromDisk !== false`, merges non-deleted `.dinou/dist2` metadata keys into `allKeysSet` so `revalidateTag` discovers and revalidates SSG-built routes/layouts/slots even on a completely cold `RedisStorage` pod prior to its first HTTP request.
- **Host Segment ISR TTL Preservation (`pageGeneratedAt` & `layoutGeneratedAt`)**:
  - `revalidatePage` preserves `prevPageOwnGenTime` in `currentMeta.pageGeneratedAt` when `didSpliceOnlyPageSlots` is `true`.
  - `revalidateLayout` preserves `prevLayoutOwnGenTime` in `currentMeta.layoutGeneratedAt` when `didSpliceOnlyLayoutSlots` is `true`.

### 2.3. `dinou/core/cache-slot.js` & `dinou/core/ppr-runtime.js`
- Updated `getSlotFromStorage`, `readMetaFromStorageOrAssets`, and `resolveCanonicalSlotId` in `dinou/core/cache-slot.js` to await `isKeyDeleted` / `getTagInvalidatedAtAsync`, fall back to `readDist2Fallback`, and scan `.dinou/dist2/slots` only when `storage.hydrateFromDisk !== false`.
- Updated `readShellJsonFromStorage` in `dinou/core/ppr-runtime.js` to check `isKeyDeleted` and delegate `.dinou/dist2` fallback to `readDist2Fallback` (preserving `MemoryStorage` test isolation).

### 2.4. `dinou/core/generate-static.js`, `dinou/core/handler.js` & Platform Entrypoints
- **`dinou/core/generate-static.js`**: Sets `globalThis.__DINOU_IS_SSG_BUILD__ = true` before importing Dual-Bundle engines (and cleans it up in `finally`), preventing `dinou.config.*` `storage` adapters from hijacking `.dinou/dist2` static generation at build time.
- **`dinou/core/handler.js`**:
  - Skips binding `cfg.storage` when `globalThis.__DINOU_IS_SSG_BUILD__` is active, and reliably ensures `setStorageAdapter(cfg.storage)` is active on runtime requests.
  - Updated `readMetaFromStorage`, `readRscFromStorage`, segmented `/____rsc____` / `/____rsc_page____` / `/____rsc_layout____` delivery, and full HTML delivery to respect `isKeyDeleted` and lazily hydrate `.dinou/dist2` via `readDist2Fallback`.
  - Updated layout chain TTL checks to evaluate `entry.layoutGeneratedAt` (`Number(lMeta?.layoutGeneratedAt || lMeta?.generatedAt || 0)`) so slot-only layout refreshes never starve layout `revalidate` TTLs.
- **`dinou/node/build.js`, `dinou/node/dev.js`, `dinou/bun/build.js`, `dinou/deno/build.js`, `dinou/cloudflare/build.js`**:
  - Guarded `initStorage()` with `if (!hasExplicitStorageAdapter())` so adapters registered via `setupFiles` or `dinou.config.*` are never overwritten by default adapters.

### 2.5. `dinou/index.d.ts` & `dinou/server.d.ts`
- Added `storage?: StorageAdapter;` to `DinouConfig` in `dinou/index.d.ts` (re-exporting `StorageAdapter` from `./server.js`).
- Added `MemoryStorageOptions`, `RedisStorageOptions`, `hydrateFromDisk?: boolean`, `keys(prefix?: string): Promise<string[]>`, `isDeleted`, `isKeyDeleted`, `markTagInvalidated`, `markTagInvalidatedAsync`, `getTagInvalidatedAt`, and `getTagInvalidatedAtAsync` to `StorageAdapter` / `MemoryStorage` / `RedisStorage` in `dinou/server.d.ts`.
- Updated JSDoc on `revalidatePath`, `revalidatePage`, and `revalidateLayout` in `dinou/server.d.ts` to document relative path resolution (`"./"`, `".."`, `"../..."`) via `x-dinou-current-path`.

---

## 3. `CHANGELOG.md` Entry (Ready to Copy Under `### Fixed`)

```markdown
### Fixed
- **Relative Path Resolution in `revalidateLayout`**: Fixed `revalidateLayout("./")`, `revalidateLayout("..")`, and relative sibling paths (`revalidateLayout("../billing")`) failing inside Server Functions due to bypassing `normalizeRevalidatePath`, and prevented `normalizeRevalidatePath` from falling back to `"/____server_function____"` when neither `x-dinou-current-path` nor `Referer` is present.
- **`RedisStorage` Tag Revalidation, Key Normalization & Cluster Tombstones**: Implemented `RedisStorage.keys(prefix)` across `node-redis` v4/v5 (`scanIterator`), `ioredis` (`scanStream`), Upstash (`keys`), and cursor `scan` clients so `revalidateTag()` works out of the box on Redis; normalized leading/trailing slashes and `route` <-> `route/index.html` / companion metadata keys; added options object support (`new RedisStorage(client, { prefix, hydrateFromDisk })`); and added Redis-backed deletion tombstones and tag invalidation timestamps so multi-pod clusters never resurrect invalidated `.dinou/dist2` artifacts.
- **`DinouConfig.storage` Typing, Runtime Binding, SSG Isolation & `.dinou/dist2` Hydration**: Added `storage?: StorageAdapter` to `DinouConfig` TypeScript definitions; guarded runtime `initStorage()` across Node, Bun, Deno, and Cloudflare entrypoints from overwriting custom storage adapters; isolated `generateStatic()` (`__DINOU_IS_SSG_BUILD__`) so build-time SSG always writes to `.dinou/dist2` without polluting live `RedisStorage` instances; and added lazy `.dinou/dist2` hydration (`readDist2Fallback`) for cold distributed storage pods while keeping `MemoryStorage` isolated by default for unit testing.
- **Standalone / Vitest Revalidation Crashes (`ReferenceError: getBuildStaticPage is not defined`)**: Unified `revalidatePage`, `revalidatePath`, `revalidateLayout`, and `revalidateTag` onto `getStorageAdapter()` across all runtimes, cleanly evicting cached entries in standalone test/worker environments instead of calling removed legacy build helpers.
- **3D Slot Splicing on Cold Distributed Pods & Host Segment ISR TTL Preservation**: Preserved `shell.page.json` / `shell.layout.json` and `*metadata.json` lookup across `.dinou/dist2` during slot-only tag invalidations (`onlyRefreshSlots: true`) without clobbering updated runtime metadata, and preserved `pageGeneratedAt` / `layoutGeneratedAt` during slot-only splices so frequent `<DinouCacheSlot>` refreshes never starve host `page.tsx` or `layout.tsx` time-based ISR TTLs.
```

---

## 4. Verification Test Suite for Upstream `dinou` CI

### 4.1. Unit & Multi-Pod Storage Suite (`tests/revalidation-storage.test.mjs`)

Covers:
1. `revalidateLayout("./")`, `revalidateLayout("..")`, and `revalidateLayout("../billing")` resolution via `x-dinou-current-path`, `referer`, and `/____server_function____` guard.
2. `RedisStorage` key/companion parity across all 5 Redis client shapes (`scanIterator` v5 batches, `scanIterator` v4 strings, `scanStream`, `keys()`, and cursor `scan()`) + multi-pod `revalidateTag` propagation.
3. Cold `RedisStorage` lazy `.dinou/dist2` hydration, `MemoryStorage` isolation (`hydrateFromDisk: false` by default), multi-pod Redis tombstones blocking `.dinou/dist2` resurrection on sibling pods, and `__DINOU_IS_SSG_BUILD__` guarding `RedisStorage` during SSG builds.
4. Standalone Vitest / Queue Worker `revalidatePage`, `revalidatePath`, `revalidateLayout`, and `revalidateTag` execution without `ReferenceError`.

```js
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { Readable } from "node:stream";
import {
  MemoryStorage,
  RedisStorage,
  FileSystemStorage,
  setStorageAdapter,
  readDist2Fallback,
} from "../dinou/core/storage-adapter.js";
import {
  revalidatePage,
  revalidatePath,
  revalidateLayout,
  revalidateTag,
} from "../dinou/core/cache-revalidate.js";
import { requestStorage } from "../dinou/core/request-context.js";

// 1. Relative path resolution in revalidateLayout
{
  const mem = new MemoryStorage();
  setStorageAdapter(mem);

  await mem.set("dashboard/settings/layout.rsc", "0:[\"old-settings-layout\"]\n", {
    status: 200,
    generatedAt: 1000,
    tags: ["settings-layout"],
  });
  await mem.set("dashboard/settings/layout.metadata.json", JSON.stringify({
    status: 200,
    generatedAt: 1000,
    tags: ["settings-layout"],
  }));
  await mem.set("dashboard/layout.rsc", "0:[\"old-dashboard-layout\"]\n", {
    status: 200,
    generatedAt: 1000,
  });
  await mem.set("dashboard/billing/layout.rsc", "0:[\"old-billing-layout\"]\n", {
    status: 200,
    generatedAt: 1000,
  });

  await requestStorage.run(
    {
      req: {
        path: "/____server_function____",
        headers: { "x-dinou-current-path": "/dashboard/settings?tab=general" },
      },
    },
    async () => {
      assert.equal(await revalidateLayout("./"), true);
      assert.equal(await mem.get("dashboard/settings/layout.rsc"), null);
      assert.notEqual(await mem.get("dashboard/layout.rsc"), null);

      assert.equal(await revalidateLayout(".."), true);
      assert.equal(await mem.get("dashboard/layout.rsc"), null);

      assert.equal(await revalidateLayout("../billing"), true);
      assert.equal(await mem.get("dashboard/billing/layout.rsc"), null);
    }
  );
}

// 2. RedisStorage across all 5 Redis scan/keys client variants + multi-pod tombstones
{
  function createMockRedis(mode) {
    const store = new Map();
    const matchPattern = (pattern) => {
      const prefix = String(pattern || "").replace(/\*$/, "");
      return [...store.keys()].filter((k) => k.startsWith(prefix));
    };
    const base = {
      store,
      async get(k) { return store.has(k) ? store.get(k) : null; },
      async set(k, v) { store.set(k, String(v)); return "OK"; },
      async del(k) { return store.delete(k) ? 1 : 0; },
      async exists(k) { return store.has(k) ? 1 : 0; },
    };
    if (mode === "scanIterator-v5") {
      base.scanIterator = async function* ({ MATCH }) {
        const matched = matchPattern(MATCH);
        for (let i = 0; i < matched.length; i += 2) yield matched.slice(i, i + 2);
      };
    } else if (mode === "scanIterator-v4") {
      base.scanIterator = async function* ({ MATCH }) {
        for (const k of matchPattern(MATCH)) yield k;
      };
    } else if (mode === "scanStream") {
      base.scanStream = ({ match }) => Readable.from([matchPattern(match)]);
    } else if (mode === "keys") {
      base.keys = async (pattern) => matchPattern(pattern);
    } else if (mode === "scan-cursor") {
      base.scan = async (cursor, _m, pattern) => ["0", matchPattern(pattern)];
    }
    return base;
  }

  for (const mode of ["scanIterator-v5", "scanIterator-v4", "scanStream", "keys", "scan-cursor"]) {
    const client = createMockRedis(mode);
    const podA = new RedisStorage(client, { prefix: "dinou:test:" });
    const podB = new RedisStorage(client, { prefix: "dinou:test:" });
    setStorageAdapter(podA);

    const pageMeta = { status: 200, generatedAt: 2000, tags: ["featured"] };
    await podA.set("/shop/deals/index.html", "<html>Deals v1</html>", pageMeta);
    await podA.set("/shop/deals/metadata.json", JSON.stringify(pageMeta));

    assert.equal((await podB.get("shop/deals"))?.content, "<html>Deals v1</html>");
    await revalidateTag("featured");
    assert.equal(await podB.get("shop/deals/index.html"), null);
    assert.equal(await podB.isKeyDeleted("shop/deals/index.html"), true);
    assert.ok((await podB.getTagInvalidatedAtAsync("featured")) >= 2000);
  }
}
```

### 4.2. Dual-Bundle + SSG + `RedisStorage` + 3D Revalidation E2E Test (`tests/revalidation-dual-bundle-e2e.test.mjs`)

Verifies the complete production lifecycle end-to-end:
1. Runs `generateStatic()` on an app whose `dinou.config.ts` exports `storage: new RedisStorage(...)`, asserting **zero** Redis writes occur during SSG while `.dinou/dist2` is populated on disk.
2. Boots `.dinou/node/rsc-engine.mjs` + `.dinou/node/ssr-engine.mjs` against a cold `RedisStorage`, increments in-memory component versions to `v2`, and asserts the first `GET /dashboard/settings` hydrates `v1` from `.dinou/dist2` into Redis without live re-execution.
3. Executes `await revalidateLayout("./")` inside a simulated Server Function (`req.path = "/____server_function____"`, `x-dinou-current-path: "/dashboard/settings"`), asserting **only** `SettingsLayout` advances to `v2` (lazy HTML re-composition) while `SettingsPage` stays at `v1`.
4. Executes `await revalidateTag("quota-tag")`, asserting **only** `<DinouCacheSlot id="quota-slot" tags={["quota-tag"]}>` advances to `v2` (`SettingsPage` stays at `v1`) AND `metadata.pageGeneratedAt` is **preserved** while `metadata.generatedAt` advances.
5. Executes `await revalidateTag("settings-page-tag")`, asserting `SettingsPage` advances to `v2`.
6. Clears Redis completely to simulate a newly booted cold pod receiving `await revalidateTag("settings-page-tag")` *before* its first HTTP request, asserting the cold pod scans `.dinou/dist2` metadata, renders `v3`, and never resurrects stale `v1` HTML from disk.

