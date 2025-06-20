"use client";

import Counter from "./counter";
import { Suspense } from "react";

export default function Page({
  query,
  data,
}: {
  query: { [key: string]: string | undefined };
  data: string;
}) {
  return (
    <>
      <h1>Hello you!{data}</h1>
      <Suspense fallback={<div>Loading...</div>}>
        {new Promise((resolve) => setTimeout(() => resolve("Loaded"), 3000))}
      </Suspense>
      <Counter />
    </>
  );
}
