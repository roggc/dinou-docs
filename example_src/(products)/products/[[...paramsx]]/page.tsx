// "use client";
export default function Page({
  params: { paramsx },
  query: { name },
}: {
  params: { paramsx: string[] };
  query: { name: string };
}) {
  return (
    <>
      products page!{paramsx}
      {name}
    </>
  );
}
