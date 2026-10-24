export async function getProps() {
  return {
    streamSource: "Webpack In-Memory Dev Server",
    timestamp: new Date().toISOString(),
    compilerStats: {
      tool: "webpack",
      mode: "development",
      memoryFiles: globalThis.__DINOU_MEM_FILES__ ? globalThis.__DINOU_MEM_FILES__.size : 0,
      activeSockets: 1,
    },
  };
}
