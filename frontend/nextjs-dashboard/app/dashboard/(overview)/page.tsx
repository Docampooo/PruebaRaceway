import { lusitana } from '@/app/ui/fonts';

const motorFunctions = [
  {
    id: 1,
    nombre: 'Iniciar Motor',
    descripcion: 'Activa el sistema de bombeo principal del raceway y pone en marcha el ciclo de circulación de agua.',
    icono: '▶',
    accion: 'Iniciar',
    color: 'from-blue-900 to-blue-700',
    hoverColor: 'hover:from-blue-800 hover:to-blue-600',
    btnColor: 'bg-emerald-500 hover:bg-emerald-400',
  },
  {
    id: 2,
    nombre: 'Parar Motor',
    descripcion: 'Detiene de forma segura el sistema de bombeo, cerrando válvulas y deteniendo el flujo de agua.',
    icono: '■',
    accion: 'Detener',
    color: 'from-blue-950 to-blue-800',
    hoverColor: 'hover:from-blue-900 hover:to-blue-700',
    btnColor: 'bg-red-500 hover:bg-red-400',
  },
  {
    id: 3,
    nombre: 'Abrir Válvulas',
    descripcion: 'Abre las válvulas de control del sistema hidráulico para permitir la circulación completa del flujo.',
    icono: '◈',
    accion: 'Abrir',
    color: 'from-blue-900 to-indigo-800',
    hoverColor: 'hover:from-blue-800 hover:to-indigo-700',
    btnColor: 'bg-sky-500 hover:bg-sky-400',
  },
  {
    id: 4,
    nombre: 'Cerrar Válvulas',
    descripcion: 'Cierra todas las válvulas del circuito hidráulico para aislar el sistema y prevenir pérdidas.',
    icono: '◉',
    accion: 'Cerrar',
    color: 'from-slate-800 to-blue-900',
    hoverColor: 'hover:from-slate-700 hover:to-blue-800',
    btnColor: 'bg-amber-500 hover:bg-amber-400',
  },
  {
    id: 5,
    nombre: 'Estado del Sistema',
    descripcion: 'Consulta el estado actual de todos los componentes: motor, válvulas, presión y nivel de agua.',
    icono: '◎',
    accion: 'Consultar',
    color: 'from-blue-800 to-cyan-900',
    hoverColor: 'hover:from-blue-700 hover:to-cyan-800',
    btnColor: 'bg-blue-400 hover:bg-blue-300',
  },
];

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-gray-950 px-6 py-12">

      {/* Encabezado */}
      <div className="mb-12 text-center">
        <p className={`${lusitana.className} text-3xl font-bold text-white md:text-4xl`}>
          Operaciones con el Motor
        </p>
        <p className="mt-2 text-blue-400 text-sm md:text-base tracking-widest uppercase">
          Panel de control del raceway
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-blue-500 opacity-60" />
      </div>

      {/* Grid de tarjetas */}
      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {motorFunctions.map((fn) => (
          <div
            key={fn.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${fn.color} ${fn.hoverColor} p-6 shadow-lg shadow-blue-950/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/60 border border-blue-800/30`}
          >
            {/* Decoración de fondo */}
            <div className="pointer-events-none absolute right-4 top-4 text-6xl opacity-5 select-none">
              {fn.icono}
            </div>

            {/* Icono principal */}
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl text-blue-200 ring-1 ring-white/10">
              {fn.icono}
            </div>

            {/* Contenido */}
            <div className="flex-1">
              <h2 className={`${lusitana.className} mb-2 text-lg font-bold text-white`}>
                {fn.nombre}
              </h2>
              <p className="text-sm leading-relaxed text-blue-200/80">
                {fn.descripcion}
              </p>
            </div>

            {/* Botón */}
            <button
              className={`mt-6 w-full rounded-lg ${fn.btnColor} px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-95`}
            >
              {fn.accion}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}