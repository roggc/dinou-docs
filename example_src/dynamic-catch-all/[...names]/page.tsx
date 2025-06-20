// src/catch-all/[...names]/page.tsx

"use client";

export default function Page({
  params: { names },
  data,
}: {
  params: { names: string[] };
  data: string;
}) {
  return (
    <>
      {names}
      {data}
    </>
  );
}
