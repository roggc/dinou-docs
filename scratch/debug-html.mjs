const res = await fetch("http://localhost:3000/docs/migration/v6-to-v7");
const text = await res.text();
// Find the <main> element
const mainMatch = text.match(/<main[^>]*>([\s\S]*?)<\/main>/);
console.log("Main inner HTML:", mainMatch ? mainMatch[1].slice(0, 500) : "NO MAIN");
// Check what errors are in the HTML
console.log("Error heading in HTML:", text.match(/<h2[^>]*>([\s\S]*?)<\/h2>/)?.[1]);
// Check body content
const bodyMatch = text.match(/<body[^>]*>([\s\S]*?)<\/body>/);
console.log("Body exists:", Boolean(bodyMatch));
