export async function getProps(params: { user: string }) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(`${params.user}data`), 2000)
  );
  return { page: { data }, layout: { title: data } };
}

export function getStaticPaths() {
  return ["user1", "user2"];
}

export function dynamic() {
  return true;
}
