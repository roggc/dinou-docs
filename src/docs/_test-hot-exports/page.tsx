import { TestWidget } from "./test-widget";

export default function TestHotExportsPage() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-4">
        Verificación de Exportaciones en Caliente
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">
        Esta página comprueba que la modificación en caliente de las exportaciones de un Client Component se sincroniza correctamente con el motor RSC y el navegador.
      </p>
      <TestWidget />
    </div>
  );
}
