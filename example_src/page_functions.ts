export async function getProps(params: {}) {
  const data = await new Promise<string>((r) =>
    setTimeout(() => r("data"), 2000)
  );
  return { page: { data }, layout: { title: data } };
}

export function dynamic() {
  return true;
}
