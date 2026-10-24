export const revalidate = 0;

export async function getProps() {
  const now = new Date();
  return {
    serverTimestamp: now.toISOString(),
    calculationEngine: "Node.js V8 Flight Engine",
    serverCalculations: [
      { operation: "Fibonacci(25)", result: 75025, executionMicroseconds: 42 },
      { operation: "SHA-256 Checksum", result: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", executionMicroseconds: 88 },
      { operation: "Dual-Bundle RSC Tree Size", result: "14.2 KB", executionMicroseconds: 15 },
    ],
    serverHost: {
      pid: process.pid,
      nodeVersion: process.version,
      platform: process.platform,
    },
  };
}
