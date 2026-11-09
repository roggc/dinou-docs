// Automated test suite for src/_test-promise (or src/test-promise)
// Verifies Strategy 9 (RSC Promise -> Client use()), Strategy 9 + PPR, and Strategy 12 (getProps Promise -> Client use())
//
// NOTE: Uses dynamic imports inside a CLI guard so Dinou's route-generator / esbuild / rollup / webpack
// can safely scan or bundle `src/` in both ejected (`./dinou/core`) and non-ejected (`node_modules/dinou`) modes.

export const __isPromiseTestRunner = true;

async function main() {
  const dynamicImport = new Function("specifier", "return import(specifier)");

  const { default: assert } = await dynamicImport("node:assert/strict");
  const { default: fs } = await dynamicImport("node:fs");
  const { default: path } = await dynamicImport("node:path");
  const { fileURLToPath, pathToFileURL } = await dynamicImport("node:url");
  const { default: React } = await dynamicImport("react");
  const { default: esbuild } = await dynamicImport("esbuild");

  const projectRoot = process.cwd();
  const suiteDir = path.dirname(fileURLToPath(import.meta.url));

  // Automatically support both ejected (./dinou/core) and non-ejected (./node_modules/dinou/dinou/core) modes
  const ejectedCoreDir = path.resolve(projectRoot, "dinou/core");
  const installedCoreDir = path.resolve(
    projectRoot,
    "node_modules/dinou/dinou/core"
  );
  const coreDir = fs.existsSync(ejectedCoreDir)
    ? ejectedCoreDir
    : installedCoreDir;

  if (!fs.existsSync(coreDir)) {
    throw new Error(
      `Could not locate Dinou core in "${ejectedCoreDir}" or "${installedCoreDir}".`
    );
  }

  const importCore = (filename) =>
    dynamicImport(pathToFileURL(path.join(coreDir, filename)).href);

  const { default: getJSX } = await importCore("get-jsx.js");
  const { asyncRenderJSXToClientJSX } = await importCore(
    "render-jsx-to-client-jsx.js"
  );
  const { runWithPprContext, resetPprHoles, getRegisteredHoles } =
    await importCore("ppr-context.js");
  const { registerRouteModules } = await importCore("import-module.js");

  const CLIENT_REFERENCE = Symbol.for("react.client.reference");

  let clientConsumerRscExports = null;

  function compileTsxModule(localRelPath, { asClientRef = false } = {}) {
    const absPath = path.resolve(suiteDir, localRelPath);
    const virtualRouteRelPath = `src/test-promise/${localRelPath}`;
    const source = fs.readFileSync(absPath, "utf8");
    const { code } = esbuild.transformSync(source, {
      loader: localRelPath.endsWith(".tsx") ? "tsx" : "ts",
      format: "cjs",
      jsx: "transform",
    });

    const mod = { exports: {} };
    const fn = new Function("exports", "require", "module", "React", code);
    const customRequire = (id) => {
      if (id === "react") return React;
      if (id.endsWith("client-consumer")) return clientConsumerRscExports;
      throw new Error(`Unexpected require: ${id}`);
    };
    fn(mod.exports, customRequire, mod, React);

    if (asClientRef) {
      const refExports = {};
      for (const [k, v] of Object.entries(mod.exports)) {
        if (typeof v === "function") {
          const refFn = function ClientRefStub() {};
          Object.defineProperty(refFn, "$$typeof", { value: CLIENT_REFERENCE });
          Object.defineProperty(refFn, "$$id", {
            value: `${virtualRouteRelPath}#${k}`,
          });
          Object.defineProperty(refFn, "_realImpl", { value: v });
          refExports[k] = refFn;
        } else {
          refExports[k] = v;
        }
      }
      return { rscExports: refExports, realExports: mod.exports };
    }

    return { rscExports: mod.exports, realExports: mod.exports };
  }

  const clientConsumerCompiled = compileTsxModule("client-consumer.tsx", {
    asClientRef: true,
  });
  clientConsumerRscExports = clientConsumerCompiled.rscExports;

  const rscPage = compileTsxModule("page.tsx");
  const rscPageFns = compileTsxModule("page_functions.ts");
  const pprPage = compileTsxModule("ppr/page.tsx");
  const pprPageFns = compileTsxModule("ppr/page_functions.ts");
  const getPropsPage = compileTsxModule("getprops/page.tsx", {
    asClientRef: true,
  });
  const getPropsPageFns = compileTsxModule("getprops/page_functions.ts");

  // Register virtual VFS entries so `/test-promise/*` resolves even when the folder on disk is `src/_test-promise`
  globalThis.__DINOU_VFS__ = {
    ...(globalThis.__DINOU_VFS__ || {}),
    "src/test-promise": {
      type: "directory",
      children: [
        { name: "page.tsx", isDirectory: false },
        { name: "page_functions.ts", isDirectory: false },
        { name: "ppr", isDirectory: true },
        { name: "getprops", isDirectory: true },
      ],
    },
    "src/test-promise/page.tsx": { type: "file" },
    "src/test-promise/page_functions.ts": { type: "file" },
    "src/test-promise/ppr": {
      type: "directory",
      children: [
        { name: "page.tsx", isDirectory: false },
        { name: "page_functions.ts", isDirectory: false },
      ],
    },
    "src/test-promise/ppr/page.tsx": { type: "file" },
    "src/test-promise/ppr/page_functions.ts": { type: "file" },
    "src/test-promise/getprops": {
      type: "directory",
      children: [
        { name: "page.tsx", isDirectory: false },
        { name: "page_functions.ts", isDirectory: false },
      ],
    },
    "src/test-promise/getprops/page.tsx": { type: "file" },
    "src/test-promise/getprops/page_functions.ts": { type: "file" },
  };

  // Stub root layout so getJSX only tests the target route tree cleanly
  const passthroughLayout = {
    default: function RootLayout({ children }) {
      return React.createElement(
        "div",
        { "data-testid": "root-layout" },
        children
      );
    },
  };

  registerRouteModules({
    "src/layout.tsx": () => passthroughLayout,
    "src/test-promise/client-consumer.tsx": () => clientConsumerRscExports,
    "src/test-promise/page.tsx": () => rscPage.rscExports,
    "src/test-promise/page_functions.ts": () => rscPageFns.rscExports,
    "src/test-promise/ppr/page.tsx": () => pprPage.rscExports,
    "src/test-promise/ppr/page_functions.ts": () => pprPageFns.rscExports,
    "src/test-promise/getprops/page.tsx": () => getPropsPage.rscExports,
    "src/test-promise/getprops/page_functions.ts": () =>
      getPropsPageFns.rscExports,
  });

  function findElementByType(node, predicate) {
    if (!node || typeof node !== "object") return null;
    if (Array.isArray(node)) {
      for (const item of node) {
        const found = findElementByType(item, predicate);
        if (found) return found;
      }
      return null;
    }
    if (predicate(node)) return node;
    if (node.props && typeof node.props === "object") {
      for (const val of Object.values(node.props)) {
        if (val && typeof val === "object" && !(val instanceof Promise)) {
          const found = findElementByType(val, predicate);
          if (found) return found;
        }
      }
    }
    return null;
  }

  /**
   * Simulates React 19's client `use(usable)` hook behavior:
   * throws a TypeError if `usable` is not a thenable (Promise) or Context,
   * otherwise awaits/unwraps the Promise.
   */
  async function simulateReact19ClientUse(usable) {
    if (
      !usable ||
      (typeof usable !== "object" && typeof usable !== "function") ||
      typeof usable.then !== "function"
    ) {
      throw new TypeError(
        `An unsupported type was passed to use(): ${Object.prototype.toString.call(usable)}`
      );
    }
    return await usable;
  }

  let failures = 0;

  async function runTest(name, fn) {
    try {
      await fn();
      console.log(`✅ PASS: ${name}`);
    } catch (err) {
      failures++;
      console.error(`❌ FAIL: ${name}`);
      console.error(`   -> ${err.message}`);
    }
  }

  const relSuiteDir = path.relative(projectRoot, suiteDir).replace(/\\/g, "/");
  const modeLabel =
    coreDir === ejectedCoreDir ? "ejected (./dinou)" : "installed (node_modules/dinou)";

  console.log(
    `\n=== Running Dinou Promise Streaming Test Suite (${relSuiteDir} | ${modeLabel}) ===\n`
  );

  // TEST 1: Strategy 9 — RSC Promise + Array of Promises -> Client use()
  await runTest(
    "Test 1 (Strategy 9): RSC passes un-awaited Promise & Promise[] to Client Component without blocking TTFB or unwrapping on server",
    async () => {
      const envObj = globalThis.process.env;
      const nodeEnvKey = "NODE_ENV";
      const prevEnv = envObj[nodeEnvKey];
      envObj[nodeEnvKey] = "production";
      try {
        const start = Date.now();
        const tree = await getJSX("/test-promise", {}, null, false, false, {
          segment: "page",
        });
        const elapsed = Date.now() - start;

        const singleConsumerEl = findElementByType(
          tree,
          (n) => n?.props?.testId === "rsc-resolved"
        );
        assert.ok(singleConsumerEl, "Expected to find <ClientPromiseConsumer>");

        // 1. Must remain an instance of Promise (not unwrapped to a plain object!)
        assert.equal(
          singleConsumerEl.props.promise instanceof Promise,
          true,
          `Expected props.promise to be a Promise, but got ${typeof singleConsumerEl.props.promise}: ${JSON.stringify(singleConsumerEl.props.promise)}`
        );

        // 2. Must not have blocked getJSX waiting for the 150ms timer
        assert.ok(
          elapsed < 100,
          `Expected getJSX to return immediately without blocking TTFB (<100ms), but took ${elapsed}ms`
        );

        // 3. Array of Promises prop must also preserve Promise instances
        const arrayConsumerEl = findElementByType(
          tree,
          (n) => n?.props?.testId === "rsc-array-resolved"
        );
        assert.ok(
          arrayConsumerEl,
          "Expected to find <ClientPromiseArrayConsumer>"
        );
        assert.equal(
          Array.isArray(arrayConsumerEl.props.promises) &&
            arrayConsumerEl.props.promises.every((p) => p instanceof Promise),
          true,
          `Expected props.promises elements to be Promises, but got: ${JSON.stringify(arrayConsumerEl.props.promises)}`
        );

        // 4. Simulated React 19 client use(promise) must succeed and resolve to expected data
        const resolvedSingle = await simulateReact19ClientUse(
          singleConsumerEl.props.promise
        );
        assert.deepEqual(resolvedSingle, { label: "RSC-Promise-OK", value: 42 });

        const resolvedArray = await Promise.all(
          arrayConsumerEl.props.promises.map((p) => simulateReact19ClientUse(p))
        );
        assert.deepEqual(resolvedArray, ["Alpha", "Beta"]);
      } finally {
        if (prevEnv === undefined) {
          delete envObj[nodeEnvKey];
        } else {
          envObj[nodeEnvKey] = prevEnv;
        }
      }
    }
  );

  // TEST 2: Strategy 9 + PPR — RSC with <Suspense> + Client Component receiving Promise prop registers PPR Hole
  await runTest(
    "Test 2 (Strategy 9 + PPR): Client Component with Promise prop inside <Suspense> registers a PPR Dynamic Hole (ppr-hole-1)",
    async () => {
      await runWithPprContext({ isPpr: true }, async () => {
        resetPprHoles();
        const rawTree = await getJSX(
          "/test-promise/ppr",
          {},
          null,
          false,
          false,
          {
            segment: "page",
          }
        );
        const pprShellTree = await asyncRenderJSXToClientJSX(rawTree);
        const holes = getRegisteredHoles();

        assert.deepEqual(
          holes,
          ["ppr-hole-1"],
          `Expected PPR build to register ['ppr-hole-1'], but got ${JSON.stringify(holes)}`
        );

        const holeEl = findElementByType(
          pprShellTree,
          (n) => n?.props?.["data-ppr-hole"] === "ppr-hole-1"
        );
        assert.ok(
          holeEl,
          "Expected static PPR shell to contain data-ppr-hole='ppr-hole-1' fallback wrapper"
        );
      });
    }
  );

  // TEST 3: Strategy 12 — Client-First getProps Promise -> "use client" Page use()
  await runTest(
    "Test 3 (Strategy 12): getProps returns un-awaited Promise to 'use client' Page without blocking TTFB or unwrapping on server",
    async () => {
      const start = Date.now();
      const tree = await getJSX(
        "/test-promise/getprops",
        {},
        null,
        false,
        false,
        {
          segment: "page",
        }
      );
      const elapsed = Date.now() - start;

      assert.ok(tree, "Expected root page element from getJSX");

      // 1. docPromise prop on the Client Page must remain a Promise
      assert.equal(
        tree.props.docPromise instanceof Promise,
        true,
        `Expected tree.props.docPromise to be a Promise, but got ${typeof tree.props.docPromise}: ${JSON.stringify(tree.props.docPromise)}`
      );

      // 2. Must not have blocked TTFB waiting for the 150ms docPromise
      assert.ok(
        elapsed < 100,
        `Expected getJSX with getProps Promise to return immediately (<100ms), but took ${elapsed}ms`
      );

      // 3. Simulated React 19 client use(docPromise) must succeed
      const resolvedDoc = await simulateReact19ClientUse(tree.props.docPromise);
      assert.deepEqual(resolvedDoc, {
        label: "GetProps-Promise-OK",
        value: 99,
      });
    }
  );

  console.log(
    "\n====================================================================="
  );
  if (failures > 0) {
    console.error(`RESULT: ${failures} test(s) FAILED ❌`);
    process.exit(1);
  } else {
    console.log("RESULT: All 3 tests PASSED ✅");
    process.exit(0);
  }
}

const isCliEntry =
  typeof process !== "undefined" &&
  Array.isArray(process.argv) &&
  Boolean(process.argv[1]) &&
  /run-tests\.mjs$/.test(String(process.argv[1]).replace(/\\/g, "/"));

if (isCliEntry) {
  main().catch((err) => {
    console.error("❌ Unhandled error in run-tests.mjs:", err);
    process.exit(1);
  });
}
