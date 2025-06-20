// src/catch-all-optional/[[..names]]/page_functions.ts

export async function getProps(params: { names: string[] }) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(`Hello ${params.names.join(",")}`), 2000)
  );

  return { page: { data }, layout: { title: data } };
}

export function getStaticPaths() {
  return [["albert"], ["johan"], ["roger"], ["alex"], ["albert", "johan"]];
}
