"use client";

import { useState, Suspense, useMemo } from "react";
import serverFunction from "./server-function";

export default function Counter() {
  const [count, setCount] = useState(0);

  const promise = useMemo(() => serverFunction(), []);

  return (
    <div>
      <h1>Counter</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <Suspense fallback={<div>Loading....</div>}>{promise}</Suspense>
    </div>
  );
}
