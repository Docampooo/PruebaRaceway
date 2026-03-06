import { lusitana } from './ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-gray-950">

      {/* Background grid + glow */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.04)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[600px] rounded-full bg-cyan-700/8 blur-[100px]" />

      {/* Header bar */}
      <header className="relative z-10 flex items-center justify-between border-b border-blue-900/30 px-8 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/20 ring-1 ring-blue-500/40 text-blue-400 text-base">
            ◈
          </div>
          <span className={`${lusitana.className} text-sm font-bold uppercase tracking-widest text-blue-400`}>
            Raceway Control
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-emerald-400/80">Sistema activo</span>
        </div>
      </header>

      {/* Hero */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20 text-center">

        {/* Status pill */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-800/40 bg-blue-950/60 px-4 py-2 backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-xs uppercase tracking-widest text-blue-400/80">Panel de gestión hidráulica</span>
        </div>

        <h1 className={`${lusitana.className} mb-6 max-w-3xl text-4xl font-bold leading-tight text-white md:text-6xl md:leading-tight`}>
          Control del{' '}
          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Motor y Válvulas
          </span>
          {' '}del Raceway
        </h1>

        <p className="mb-12 max-w-xl text-base leading-relaxed text-blue-200/60 md:text-lg">
          Monitorización en tiempo real y control de los sistemas hidráulicos. 
          Gestión de fases, válvulas y estado del sistema de circulación de agua.
        </p>

        <Link
          href="/dashboard"
          className="group inline-flex items-center gap-3 rounded-xl bg-blue-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-900/50 transition-all duration-200 hover:bg-blue-500 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-900/60 active:scale-95"
        >
          <span>Acceder al Panel</span>
          <ArrowRightIcon className="w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>

      {/* Stats row */}
      <div className="relative z-10 border-t border-blue-900/30 px-8 py-8">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { label: 'Fases de control', value: '5', icon: '⚡' },
            { label: 'Válvulas monitorizadas', value: '6', icon: '◉' },
            { label: 'Depósitos', value: '3', icon: '▣' },
            { label: 'Actualización', value: '1s', icon: '◎' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center rounded-2xl border border-blue-800/20 bg-blue-950/30 p-4 text-center backdrop-blur-sm"
            >
              <span className="mb-2 text-2xl text-blue-400/60">{stat.icon}</span>
              <span className={`${lusitana.className} text-2xl font-bold text-white`}>{stat.value}</span>
              <span className="mt-1 text-xs uppercase tracking-wider text-blue-400/50">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* System cards preview */}
      <div className="relative z-10 border-t border-blue-900/30 px-8 py-10">
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-center text-xs uppercase tracking-widest text-blue-400/50">
            Sistemas disponibles
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              {
                nombre: 'Motor',
                desc: 'Control de encendido, apagado e inversión de giro del sistema de bombeo.',
                icon: '⚙',
                color: 'from-blue-900 to-blue-700',
                border: 'border-blue-700/30',
              },
              {
                nombre: 'Raceway',
                desc: 'Monitorización del nivel y control de válvulas de llenado y vaciado.',
                icon: '◈',
                color: 'from-blue-950 to-indigo-900',
                border: 'border-indigo-700/30',
              },
              {
                nombre: 'Depósito',
                desc: 'Gestión de los sensores mínimo y máximo y estado de válvulas.',
                icon: '▣',
                color: 'from-slate-800 to-blue-900',
                border: 'border-slate-600/30',
              },
            ].map((card) => (
              <div
                key={card.nombre}
                className={`rounded-2xl border ${card.border} bg-gradient-to-br ${card.color} p-5 shadow-lg shadow-blue-950/40`}
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-xl text-blue-200 ring-1 ring-white/10">
                  {card.icon}
                </div>
                <h3 className={`${lusitana.className} mb-1 font-bold text-white`}>{card.nombre}</h3>
                <p className="text-xs leading-relaxed text-blue-200/70">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-blue-900/30 px-8 py-5 text-center">
        <p className="text-xs uppercase tracking-widest text-blue-400/30">
          Sistema de Control Hidráulico · Raceway
        </p>
      </footer>

    </main>
  );
}