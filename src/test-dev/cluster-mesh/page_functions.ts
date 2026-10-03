export async function getProps() {
  return {
    meshId: "mesh-v4-rollup",
    activePeers: 12,
    packetLoss: "0.00%",
    consensusState: "SYNCHRONIZED",
    meshTimestamp: new Date().toISOString(),
  };
}
