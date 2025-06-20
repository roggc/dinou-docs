export default function Page({
  params: { id },
  query: { name },
}: {
  params: { id: string | undefined };
  query: { name: string };
}) {
  return (
    <>
      products2 page{id}
      {name}
    </>
  );
}
