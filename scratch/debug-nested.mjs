const resLayout = await fetch("http://localhost:3000/____rsc_layout____/docs/migration/v6-to-v7");
const textLayout = await resLayout.text();
console.log(textLayout);
