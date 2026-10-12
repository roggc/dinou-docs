export const revalidate = 0; // SSR on every request

export async function getProps() {
  return {
    serverTimestamp: new Date().toISOString(),
    systemInfo: {
      nodeVersion: process.version,
      platform: process.platform,
      arch: process.arch,
      pid: process.pid,
      uptimeSeconds: Math.floor(process.uptime()),
    },
    mockDatabaseItems: [
      { id: "item-1", name: "In-Memory Dual-Engine", status: "Healthy", latencyMs: 1.2 },
      { id: "item-2", name: "Zero-Disk I/O Dev Pipeline", status: "Healthy", latencyMs: 0.8 },
      { id: "item-3", name: "Module Register Hook", status: "Active", latencyMs: 0.4 },
      { id: "item-4", name: "Client Chunk Manifest", status: "Loaded", latencyMs: 2.1 },
    ],
  };
}
