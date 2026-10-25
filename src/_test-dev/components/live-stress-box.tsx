"use client";

import { useState } from "react";
import { CheckCircle2, RotateCw, Server, AlertTriangle } from "lucide-react";
import { getServerTelemetry } from "../test-actions";

export function LiveStressBox() {

  const [pulseCount, setPulseCount] = useState(1);
  const [isRotating, setIsRotating] = useState(false);
  const [serverResult, setServerResult] = useState<any>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testAction = async (msg: string) => {
    try {
      setLoading(true);
      setServerError(null);
      const res = await getServerTelemetry(msg);
      setServerResult(res);
    } catch (err: any) {
      setServerError(err?.message || String(err));
      alert("⚠️ Error capturado desde el servidor Node.js:\n\n" + (err?.message || err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 rounded-3xl border-2 border-emerald-500/50 bg-gradient-to-br from-emerald-950/40 via-slate-900/60 to-teal-950/40 shadow-2xl space-y-4 font-sans backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500 text-slate-950 font-black shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-emerald-400 flex items-center gap-2">
              ⚡ TEST 6.2: PRUEBA DE RUNTIME SERVER ERROR
            </h3>
            <p className="text-xs text-slate-400">
              Prueba de ejecución en caliente de Server Actions con llamada exitosa vs excepción de Node.js.
            </p>
          </div>
        </div>

        <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-mono font-bold">
          CLIENT HOOKS ACTIVE
        </span>
      </div>

      {/* Botones de prueba de Server Action */}
      <div className="flex flex-wrap items-center gap-3 pt-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => testAction("Petición exitosa normal")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black text-xs transition-transform active:scale-95 shadow-md shadow-emerald-600/30 disabled:opacity-50"
        >
          <Server className="h-4 w-4" />
          <span>🟢 Probar Llamada Exitosa</span>
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => testAction("provocar error")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-black text-xs transition-transform active:scale-95 shadow-md shadow-rose-600/30 disabled:opacity-50"
        >
          <AlertTriangle className="h-4 w-4" />
          <span>🔴 Provocar Excepción en Node.js</span>
        </button>

        <button
          type="button"
          onClick={() => setPulseCount((p) => p + 1)}
          className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs border border-slate-700"
        >
          Pulso: {pulseCount}
        </button>
      </div>

      {/* Resultados de Servidor */}
      {serverResult && !serverError && (
        <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 font-mono text-xs text-emerald-300 flex flex-wrap items-center justify-between gap-2 shadow-inner">
          <span>🕒 Hora: <strong>{serverResult.serverTime}</strong></span>
          <span>🟢 Node: <strong>{serverResult.nodeVersion}</strong></span>
          <span>💾 V8 Heap: <strong>{serverResult.heapUsedMB} MB</strong></span>
          <span>⏱ Uptime: <strong>{serverResult.uptimeSeconds}s</strong></span>
        </div>
      )}

      {serverError && (
        <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/50 font-mono text-xs text-rose-300 flex items-center gap-2 shadow-inner">
          <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
          <span><strong>Excepción capturada:</strong> {serverError}</span>
        </div>
      )}
    </div>
  );
}
