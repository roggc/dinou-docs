import { Link } from "dinou";
import { ArrowLeft, ShieldCheck, Cpu, Key, Database, Zap } from "lucide-react";
import { SpinStateIndicator, FluxCapacitorGauge } from "../components/quantum-grid";

interface VaultProps {
  vaultId: string;
  genesisTimestamp: string;
  computeLatencyMs: number;
  serverEnvironment: {
    platform: string;
    nodeVersion: string;
    uptimeSeconds: number;
    heapMb: number;
  };
  qubitRegisters: Array<{
    address: string;
    label: string;
    resonance: string;
  }>;
}

export default function QuantumVaultPage({
  vaultId = "QV-DEFAULT",
  genesisTimestamp = "",
  computeLatencyMs = 0,
  serverEnvironment = { platform: "win32", nodeVersion: "v20", uptimeSeconds: 0, heapMb: 0 },
  qubitRegisters = [],
}: VaultProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb back */}
      <div className="flex items-center justify-between">
        <Link
          to="/test-dev"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to Test Hub
        </Link>
        <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20 font-bold">
          NEW ROUTE: /test-dev/quantum-vault
        </span>
      </div>

      {/* Hero */}
      <div className="p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10 space-y-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-600 text-white shadow-md">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900 dark:text-white">
              Quantum Secure Vault ({vaultId})
            </h2>
            <p className="text-xs text-muted-foreground">
              Dynamic Server Component generated via Rollup dual-bundle engine.
            </p>
          </div>
        </div>

        {/* Server telemetry stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
            <div className="text-[11px] text-muted-foreground">Genesis (SSR)</div>
            <div className="font-mono text-xs font-bold truncate">{genesisTimestamp || "Now"}</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
            <div className="text-[11px] text-muted-foreground">Node Runtime</div>
            <div className="font-mono text-xs font-bold text-cyan-600 dark:text-cyan-400">
              {serverEnvironment.nodeVersion} ({serverEnvironment.platform})
            </div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
            <div className="text-[11px] text-muted-foreground">Heap Usage</div>
            <div className="font-mono text-xs font-bold">{serverEnvironment.heapMb} MB</div>
          </div>
          <div className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-card">
            <div className="text-[11px] text-muted-foreground">Server Uptime</div>
            <div className="font-mono text-xs font-bold">{serverEnvironment.uptimeSeconds}s</div>
          </div>
        </div>
      </div>

      {/* Embedded Client Components inside RSC */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpinStateIndicator spin={0.5} />
        <FluxCapacitorGauge />
      </div>

      {/* Registers */}
      <div className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-card space-y-4">
        <h4 className="font-bold text-sm text-foreground flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan-500" />
          Quantum Qubit Registers
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {qubitRegisters.map((reg) => (
            <div key={reg.address} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-background space-y-1">
              <div className="text-xs font-bold text-foreground">{reg.label}</div>
              <div className="font-mono text-[11px] text-muted-foreground">{reg.address}</div>
              <div className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400">
                Resonance: {reg.resonance}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
