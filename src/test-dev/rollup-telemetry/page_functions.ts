export async function getProps() {
  const mem = process.memoryUsage();
  return {
    bundlerName: "Rollup v4 (ESM native)",
    rssMb: Math.round(mem.rss / 1024 / 1024),
    heapUsedMb: Math.round(mem.heapUsed / 1024 / 1024),
    heapTotalMb: Math.round(mem.heapTotal / 1024 / 1024),
    pid: process.pid,
    nodeVersion: process.version,
    platform: process.platform,
    timestamp: new Date().toISOString(),
  };
}
