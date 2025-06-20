// "use client";
export default function Page({ query: { name } }: { query: { name: string } }) {
  return (
    <>
      some page!
      {name}
    </>
  );
}
