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
      className={`relative flex flex-col items-center justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${fn.color} ${fn.hoverColor} p-3 shadow-lg shadow-blue-950/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/60 border ${error ? 'border-red-500' : exito ? 'border-emerald-500' : 'border-blue-800/30'}`}
    >
      <div className="pointer-events-none absolute right-3 top-3 text-5xl opacity-5 select-none">
        {fn.icono}
      </div>
      <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-lg text-blue-200 ring-1 ring-white/10">
        {fn.icono}
      </div>
      <h2 className={`${lusitana.className} mb-2 text-center text-xs font-bold text-white leading-tight`}>
        {fn.nombre}
      </h2>
      {exito && (
        <p className="mb-1 text-xs font-semibold text-emerald-400">✓ OK</p>
      )}
      {error && (
        <p className="mb-1 text-xs font-semibold text-red-400">✕ Error</p>
      )}
      <button
        onClick={onClick}
        disabled={disabled}
        className={`w-full rounded-lg ${fn.btnColor} px-2 py-1.5 text-xs font-semibold text-white shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {cargando ? '...' : fn.accion}
      </button>
    </div>
  );
}