export default function Page({
  params: { car },
  query: { name },
}: {
  params: { car: string };
  query: { [key: string]: string | undefined };
}) {
  return (
    <>
      Car page{car}
      {name}
    </>
  );
}
