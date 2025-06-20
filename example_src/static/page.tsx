// src/static/page.tsx

"use client";

export default function Page({
  data,
  query,
}: {
  data: string;
  query: { [x: string]: string };
}) {
  return <>{data}</>;
}
