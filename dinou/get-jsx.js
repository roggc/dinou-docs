const path = require("path");
const { existsSync } = require("fs");
const React = require("react");
const {
  getFilePathAndDynamicParams,
} = require("./get-file-path-and-dynamic-params");

async function getJSX(reqPath, query) {
  const srcFolder = path.resolve(process.cwd(), "src");
  const reqSegments = reqPath.split("/").filter(Boolean);
  const folderPath = path.join(srcFolder, ...reqSegments);
  let pagePath;
  if (existsSync(folderPath)) {
    for (const ext of [".tsx", ".ts", ".jsx", ".js"]) {
      const candidatePath = path.join(folderPath, `page${ext}`);
      if (existsSync(candidatePath)) {
        pagePath = candidatePath;
      }
    }
  }
  let dynamicParams;

  if (!pagePath) {
    const [filePath, dParams] = getFilePathAndDynamicParams(
      reqSegments,
      query,
      srcFolder
    );
    pagePath = filePath;
    dynamicParams = dParams ?? {};
  }

  let jsx;
  let pageFunctionsProps;

  if (!pagePath) {
    const [notFoundPath, dParams] = getFilePathAndDynamicParams(
      reqSegments,
      query,
      srcFolder,
      "not_found",
      true,
      false
    );
    if (!notFoundPath) {
      jsx = React.createElement(
        "div",
        null,
        `Page not found: no "page" file found for "${reqPath}"`
      );
    } else {
      const pageModule = require(notFoundPath);
      const Page = pageModule.default ?? pageModule;
      jsx = React.createElement(Page, {
        params: dParams ?? {},
        query,
      });
      const noLayoutNotFoundPath = path.join(
        notFoundPath.split("\\").slice(0, -1).join("\\"),
        `no_layout_not_found`
      );
      if (existsSync(path.resolve(process.cwd(), `${noLayoutNotFoundPath}`))) {
        return jsx;
      }
    }
  } else {
    const pageModule = require(pagePath);
    const Page = pageModule.default ?? pageModule;

    let props = {
      params: dynamicParams,
      query,
    };
    const pageFolder = pagePath.split("\\").slice(0, -1).join("\\");
    const [pageFunctionsPath] = getFilePathAndDynamicParams(
      reqSegments,
      query,
      pageFolder,
      "page_functions",
      true,
      true,
      undefined,
      reqSegments.length
    );

    if (pageFunctionsPath) {
      const pageFunctionsModule = require(pageFunctionsPath);
      const getProps = pageFunctionsModule.getProps;
      pageFunctionsProps = await getProps?.(dynamicParams);
      props = { ...props, ...(pageFunctionsProps?.page ?? {}) };
    }

    jsx = React.createElement(Page, props);
  }

  if (
    getFilePathAndDynamicParams(
      reqSegments,
      query,
      srcFolder,
      "no_layout",
      false
    )[0]
  ) {
    return jsx;
  }

  const layouts = getFilePathAndDynamicParams(
    reqSegments,
    query,
    srcFolder,
    "layout",
    true,
    false,
    undefined,
    0,
    {},
    true
  );

  if (layouts && Array.isArray(layouts)) {
    let index = 0;
    for (const [layoutPath, dParams, slots] of layouts.reverse()) {
      const layoutModule = require(layoutPath);
      const Layout = layoutModule.default ?? layoutModule;
      let props = { params: dParams, query, ...slots };
      if (index === layouts.length - 1) {
        props = { ...props, ...(pageFunctionsProps?.layout ?? {}) };
      }
      jsx = React.createElement(Layout, props, jsx);
      const layoutFolderPath = path.dirname(layoutPath);
      if (
        getFilePathAndDynamicParams(
          [],
          {},
          layoutFolderPath,
          "reset_layout",
          false
        )[0]
      ) {
        break;
      }
      index++;
    }
  }

  return jsx;
}

module.exports = getJSX;
