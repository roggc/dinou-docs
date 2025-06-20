// src/optional/[[name]]/page_functions.ts

let counter = 0;

export async function getProps(params: { name: string }) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r(`Hello ${counter++} ${params.name ?? ""}`), 8000)
  );

  return { page: { data }, layout: { title: data } };
}

export function getStaticPaths() {
  return ["albert", "johan", "roger", "alex"];
}

export function revalidate() {
  return 60000;
}
