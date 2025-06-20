// src/dynamic/[name]/page.tsx

"use client";

export default function Page({
  params: { name },
  data,
}: {
  params: { name: string };
  data: string;
}) {
  return (
    <>
      {name}
      {data}
    </>
  );
}
