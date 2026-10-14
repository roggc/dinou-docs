"use client";

import { useState } from "react";

// Estado B (Hot update): Hemos eliminado 'initialTestData' en caliente, exactamente como se hizo al eliminar 'docsNavigation'

export function TestWidget() {
  const [count, setCount] = useState(0);

  return (
    <div className="p-6 my-4 rounded-xl border border-emerald-200 dark:border-emerald-900 bg-emerald-50/50 dark:bg-emerald-950/30">
      <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200 mb-2">
        TestWidget (Client Component - Actualizado en caliente)
      </h3>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Estado reactivo tras actualización: <span className="font-bold text-emerald-600">{count}</span> clicks
      </p>
      <button
        type="button"
        onClick={() => setCount((c) => c + 1)}
        className="px-4 py-2 text-sm font-semibold rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
      >
        Incrementar contador
      </button>
    </div>
  );
}
