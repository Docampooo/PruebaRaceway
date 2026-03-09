//Las cards largas de overview con aplicaciones overview/page.tsx

import { lusitana } from '@/app/ui/fonts';

type FuncionInfo = {
  id: number;
  titulo: string;
  utilidad: string;
  aplicaciones: string[];
  icono: string;
  gradiente: string;
  acento: string;
  tag: string;
};

type FuncionInfoCardProps = {
  fn: FuncionInfo;
  index: number;
};

export default function FuncionInfoCard({ fn, index }: FuncionInfoCardProps) {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-2xl border-l-4 ${fn.acento} bg-gradient-to-r ${fn.gradiente} p-5 shadow-lg md:flex-row md:items-start md:gap-6`}
    >
      <div className="pointer-events-none absolute right-5 top-3 text-7xl font-bold text-white/5 select-none">
        {String(index + 1).padStart(2, '0')}
      </div>
      <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-2xl text-white ring-1 ring-white/10 md:mb-0">
        {fn.icono}
      </div>
      <div className="flex-1">
        <p className={`${lusitana.className} text-base font-bold text-white`}>
          {fn.titulo}
        </p>
        <p className="mt-1.5 text-sm leading-relaxed text-blue-200/80">
          {fn.utilidad}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {fn.aplicaciones.map((ap) => (
            <span
              key={ap}
              className={`rounded-full border border-white/10 ${fn.tag} px-3 py-1 text-xs font-medium`}
            >
              {ap}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}