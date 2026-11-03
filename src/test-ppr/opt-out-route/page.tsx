// src/test-ppr/opt-out-route/page.tsx
import { Suspense } from "react";
import { incrementRenderCount } from "../ppr-tracker";

async function AsyncComponentInOptOutRoute() {
  await new Promise((r) => setTimeout(r, 15));
  const count = incrementRenderCount("opt-out-route-async-child");
  return (
    <div data-testid="opt-out-async-resolved" data-render-count={String(count)}>
      Opt-Out Route (ppr=false) Async Child Resolved Without noDynamic()! Render #{count}
    </div>
  );
}

export default async function OptOutPprRoutePage() {
  const count = incrementRenderCount("opt-out-route-page");
  return (
    <div data-testid="opt-out-route-page" data-render-count={String(count)}>
      <h1>Opt-Out Route (ppr = false) Render #{count}</h1>
      <Suspense fallback={<div data-testid="opt-out-async-fallback">Loading Opt-Out Async...</div>}>
        <AsyncComponentInOptOutRoute />
      </Suspense>
    </div>
  );
}

