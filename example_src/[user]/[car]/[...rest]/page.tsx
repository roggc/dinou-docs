export default function Page({
  params: { rest },
  query: { name },
}: {
  params: { rest: string };
  query: { [key: string]: string };
}) {
  return (
    <>
      Rest page{rest}
      {name}
    </>
  );
}
