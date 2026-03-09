//La tarjeta individual de cada función del motor usado en funcionesMotor/page.tsx

import { lusitana } from '@/app/ui/fonts';
import { FuncionMotor } from '@/app/tipos/raceway';

type FuncionCardProps = {
  fn: FuncionMotor;
  cargando: boolean;
  exito: boolean;
  error: boolean;
  onClick: () => void;
  disabled: boolean;
};

export default function FuncionCard({ fn, cargando, exito, error, onClick, disabled }: FuncionCardProps) {
  return (
    <div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${fn.color} ${fn.hoverColor} p-4 shadow-lg shadow-blue-950/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/60 border ${error ? 'border-red-500' : exito ? 'border-emerald-500' : 'border-blue-800/30'}`}
    >
      <div className="pointer-events-none absolute right-4 top-4 text-6xl opacity-5 select-none">
        {fn.icono}
      </div>
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl text-blue-200 ring-1 ring-white/10">
        {fn.icono}
      </div>
      <div className="flex-1">
        <h2 className={`${lusitana.className} mb-1 text-base font-bold text-white`}>
          {fn.nombre}
        </h2>
        <p className="text-xs leading-relaxed text-blue-200/80">
          {fn.descripcion}
        </p>
      </div>
      {exito && (
        <p className="mt-3 text-xs font-semibold text-emerald-400">✓ Ejecutado correctamente</p>
      )}
      {error && (
        <p className="mt-3 text-xs font-semibold text-red-400">✕ Error al ejecutar</p>
      )}
      <button
        onClick={onClick}
        disabled={disabled}
        className={`mt-3 w-full rounded-lg ${fn.btnColor} px-3 py-2 text-xs font-semibold text-white shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {cargando ? 'Ejecutando...' : fn.accion}
      </button>
    </div>
  );
}