export async function getProps() {
  const timestamp = new Date().toISOString();
  const uptimeSeconds = Math.round(process.uptime());

  return {
    serverTimestamp: timestamp,
    uptimeSeconds,
    nodeVersion: process.version,
    platform: process.platform,
    memoryUsage: process.memoryUsage(),
  };
}
