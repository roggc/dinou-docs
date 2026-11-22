/// <reference types="dinou/env" />

declare module "react-syntax-highlighter/dist/cjs/prism-light.js" {
  import PrismLight from "react-syntax-highlighter/dist/cjs/prism-light";
  export default PrismLight;
}

declare module "react-syntax-highlighter/dist/cjs/styles/prism/one-dark.js" {
  import type { CSSProperties } from "react";
  const style: Record<string, CSSProperties>;
  export default style;
}

declare module "react-syntax-highlighter/dist/cjs/languages/prism/*.js" {
  const language: any;
  export default language;
}
