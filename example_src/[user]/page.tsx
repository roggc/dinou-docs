"use client";

export default function Page({
  params: { user },
  query: { name },
  data,
}: {
  params: { user: string };
  query: { [key: string]: string | undefined };
  data: string;
}) {
  // const data = await new Promise<string>((r) =>
  //   setTimeout(() => r("data"), 2000)
  // );
  return (
    <>
      {data}Users page{user}
      {name}
    </>
  );
}
