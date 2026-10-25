"use server";

export async function getServerTelemetry(clientMsg: string) {
  // EXCEPCIÓN DELIBERADA DE RUNTIME EN NODE.JS
  if (clientMsg.includes("error") || clientMsg.includes("fallo")) {
    throw new Error(`[Node.js Server Error]: Fallo provocado deliberadamente en el backend para "${clientMsg}"`);
  }

  const memory = process.memoryUsage();
  return {
    success: true,
    serverTime: new Date().toLocaleTimeString(),
    nodeVersion: process.version,
    platform: process.platform,
    pid: process.pid,
    uptimeSeconds: Math.floor(process.uptime()),
    heapUsedMB: Math.round((memory.heapUsed / 1024 / 1024) * 100) / 100,
    echo: clientMsg,
  };
}
