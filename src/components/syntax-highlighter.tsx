"use client";

import PrismLightMod from "react-syntax-highlighter/dist/cjs/prism-light.js";
import oneDarkMod from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark.js";

import tsxMod from "react-syntax-highlighter/dist/cjs/languages/prism/tsx.js";
import typescriptMod from "react-syntax-highlighter/dist/cjs/languages/prism/typescript.js";
import jsxMod from "react-syntax-highlighter/dist/cjs/languages/prism/jsx.js";
import javascriptMod from "react-syntax-highlighter/dist/cjs/languages/prism/javascript.js";
import bashMod from "react-syntax-highlighter/dist/cjs/languages/prism/bash.js";
import jsonMod from "react-syntax-highlighter/dist/cjs/languages/prism/json.js";
import cssMod from "react-syntax-highlighter/dist/cjs/languages/prism/css.js";
import markupMod from "react-syntax-highlighter/dist/cjs/languages/prism/markup.js";
import tomlMod from "react-syntax-highlighter/dist/cjs/languages/prism/toml.js";
import diffMod from "react-syntax-highlighter/dist/cjs/languages/prism/diff.js";
import dockerMod from "react-syntax-highlighter/dist/cjs/languages/prism/docker.js";
import powershellMod from "react-syntax-highlighter/dist/cjs/languages/prism/powershell.js";
import yamlMod from "react-syntax-highlighter/dist/cjs/languages/prism/yaml.js";
import markdownMod from "react-syntax-highlighter/dist/cjs/languages/prism/markdown.js";
import sqlMod from "react-syntax-highlighter/dist/cjs/languages/prism/sql.js";
import httpMod from "react-syntax-highlighter/dist/cjs/languages/prism/http.js";
import iniMod from "react-syntax-highlighter/dist/cjs/languages/prism/ini.js";
import nginxMod from "react-syntax-highlighter/dist/cjs/languages/prism/nginx.js";

// Unwrap CJS default exports across both Node native ESM (dev SSR) and ESM bundlers (prod/client)
function unwrap<T>(mod: T): T {
  return mod && typeof mod === "object" && "default" in mod
    ? ((mod as unknown as { default: T }).default as T)
    : mod;
}

const PrismLight = unwrap(PrismLightMod);
const oneDark = unwrap(oneDarkMod);

PrismLight.registerLanguage("tsx", unwrap(tsxMod));
PrismLight.registerLanguage("typescript", unwrap(typescriptMod));
PrismLight.registerLanguage("jsx", unwrap(jsxMod));
PrismLight.registerLanguage("javascript", unwrap(javascriptMod));
PrismLight.registerLanguage("bash", unwrap(bashMod));
PrismLight.registerLanguage("json", unwrap(jsonMod));
PrismLight.registerLanguage("css", unwrap(cssMod));
PrismLight.registerLanguage("markup", unwrap(markupMod));
PrismLight.registerLanguage("toml", unwrap(tomlMod));
PrismLight.registerLanguage("diff", unwrap(diffMod));
PrismLight.registerLanguage("docker", unwrap(dockerMod));
PrismLight.registerLanguage("powershell", unwrap(powershellMod));
PrismLight.registerLanguage("yaml", unwrap(yamlMod));
PrismLight.registerLanguage("markdown", unwrap(markdownMod));
PrismLight.registerLanguage("sql", unwrap(sqlMod));
PrismLight.registerLanguage("http", unwrap(httpMod));
PrismLight.registerLanguage("ini", unwrap(iniMod));
PrismLight.registerLanguage("nginx", unwrap(nginxMod));

PrismLight.alias({
  typescript: ["ts"],
  javascript: ["js", "mjs", "cjs"],
  bash: ["sh", "shell", "zsh"],
  markup: ["html", "xml", "svg"],
  docker: ["dockerfile"],
  yaml: ["yml"],
  markdown: ["md"],
  ini: ["env", "dotenv"],
});

export const SyntaxHighlighter = PrismLight;
export { oneDark };
