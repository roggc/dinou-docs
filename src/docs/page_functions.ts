export function dynamic() {
  return false;
}

export function revalidate() {
  return 60000;
}

let data = 0;

export function getProps() {
  return { page: { data: data++ } };
}
