export default async function Page({
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
