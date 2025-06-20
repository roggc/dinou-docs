export async function getProps(params: { name: string }) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(`Hello ${params.name}`), 2000)
  );

  return { page: { data }, layout: { title: data } };
}

export function getStaticPaths() {
  return ["albert", "johan", "roger", "alex"];
}
