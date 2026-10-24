export async function getProps() {
  const t0 = Date.now();
  const uptime = process.uptime ? Math.round(process.uptime()) : 0;
  const memUsage = process.memoryUsage ? process.memoryUsage() : { heapUsed: 0, rss: 0 };

  return {
    vaultId: "QV-7789-ROLLUP",
    genesisTimestamp: new Date().toISOString(),
    computeLatencyMs: Date.now() - t0,
    serverEnvironment: {
      platform: process.platform,
      nodeVersion: process.version,
      uptimeSeconds: uptime,
      heapMb: Math.round(memUsage.heapUsed / 1024 / 1024),
    },
    qubitRegisters: [
      { address: "0x00A1", label: "Polarizer A", resonance: "99.4%" },
      { address: "0x00B2", label: "Interferometer B", resonance: "98.1%" },
      { address: "0x00C3", label: "Cryo Trap C", resonance: "99.9%" },
    ],
  };
}
