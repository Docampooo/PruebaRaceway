'use client';

import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { FuncionMotor } from '@/app/tipos/raceway';
import { motorFunctions, funciones } from '@/app/data/raceway';
import { useWebSocket } from '@/app/hooks/useWebSocket';
import { toggleValvula } from '@/app/lib/actions';
import FuncionCard from '@/app/ui/dashboard/racewayCircuito/FuncionCard';
import FuncionInfoCard from '@/app/ui/dashboard/racewayCircuito/FuncionInfoCard';
import EstadoSistema from '@/app/ui/dashboard/racewayCircuito/EstadoSistema';
import RacewaySVG from '@/app/ui/dashboard/racewayCircuito/RacewaySVG';
import PageSkeleton from '@/app/ui/dashboard/racewayCircuito/pageskeleton';

export default function Page() {

  const { estado, error: errorEstado, ultimaActualizacion } = useWebSocket('ws://localhost:8000/ws');

  const [cargando, setCargando] = useState<number | null>(null);
  const [exito, setExito] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);
  const [mensajeBloqueo, setMensajeBloqueo] = useState<string | null>(null);

  const ejecutar = async (fn: FuncionMotor) => {
    setCargando(fn.id);
    setErrorId(null);
    try {
      await fn.onClick();
      setExito(fn.id);
      setTimeout(() => setExito(null), 2000);
    } catch (e) {
      setErrorId(fn.id);
      setTimeout(() => setErrorId(null), 3000);
    } finally {
      setCargando(null);
    }
  };

  const handleValvula = async (valvula: string, estadoActual: boolean) => {
    try {
      await toggleValvula(valvula, !estadoActual);
      setMensajeBloqueo(null);
    } catch (e: any) {
      setMensajeBloqueo(e.message);
      setTimeout(() => setMensajeBloqueo(null), 3000);
    }
  };

  // Mostrar skeleton hasta que llegue el primer dato
  if (!estado && !errorEstado) return <PageSkeleton />;

  return (
    <main className="min-h-screen bg-gray-950 px-4 py-8">
      <div className="mx-auto max-w-5xl">

        {/* ── Encabezado ── */}
        <div className="mb-5 text-center">
          <p className={`${lusitana.className} text-2xl font-bold text-white md:text-3xl`}>
            Gestion del Raceway
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-blue-400/70">
            Visualizacion en tiempo real · haz clic en las valvulas para accionarlas
          </p>
          {ultimaActualizacion && (
            <p className="mt-0.5 text-xs text-blue-700">Actualizado: {ultimaActualizacion}</p>
          )}
        </div>

        {/* ── Mensajes ── */}
        {errorEstado && (
          <div className="mb-3 rounded-xl border border-red-800 bg-red-950/50 px-4 py-2 text-center text-xs text-red-400">
            {errorEstado}
          </div>
        )}
        {mensajeBloqueo && (
          <div className="mb-3 rounded-xl border border-amber-700 bg-amber-950/50 px-4 py-2 text-center text-xs text-amber-400">
            Accion bloqueada: {mensajeBloqueo}
          </div>
        )}

        {/* ── Leyenda ── */}
        <div className="mb-3 flex flex-wrap justify-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500" /> Valvula abierta</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" /> Valvula cerrada</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-slate-500 opacity-50" /> Valvula bloqueada</span>
          <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-amber-400" /> Sensor activo</span>
        </div>

        {/* ── SVG + Estado ── */}
        <div className="flex items-start gap-3">
          <div className="min-w-0 flex-1">
            <RacewaySVG estado={estado} onValvula={handleValvula} />
          </div>
          <div className="w-56 shrink-0">
            <EstadoSistema
              estado={estado}
              error={null}
              ultimaActualizacion={ultimaActualizacion}
            />
          </div>
        </div>

        {/* ── Niveles ── */}
        {estado && (
          <div className="mt-3 grid grid-cols-3 gap-3">
            {[
              { label: 'Salida', nivel: estado.salida?.nivel ?? 0, color: 'bg-cyan-600' },
              { label: 'Deposito CO2/O2', nivel: estado.deposito?.nivel ?? 0, color: 'bg-purple-600' },
              { label: 'Raceway', nivel: estado.raceway?.nivel ?? 0, color: 'bg-blue-600' },
            ].map((item) => (
              <div key={item.label} className="rounded-xl border border-blue-800/30 bg-gray-900 p-3">
                <p className="mb-1.5 text-xs uppercase tracking-widest text-blue-400/70">{item.label}</p>
                <div className="h-1.5 w-full rounded-full bg-gray-800">
                  <div className={`h-1.5 rounded-full ${item.color} transition-all duration-700`} style={{ width: `${item.nivel}%` }} />
                </div>
                <p className="mt-1 text-right text-xs font-bold text-white">{item.nivel}%</p>
              </div>
            ))}
          </div>
        )}

        {/* ── Tarjetas acción motor ── */}
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {motorFunctions.map((fn) => (
            <FuncionCard
              key={fn.id}
              fn={fn}
              cargando={cargando === fn.id}
              exito={exito === fn.id}
              error={errorId === fn.id}
              onClick={() => ejecutar(fn)}
              disabled={cargando !== null}
            />
          ))}
        </div>

        <div className="my-8 h-px w-full bg-gradient-to-r from-transparent via-blue-800 to-transparent opacity-40" />

        {/* ── Tarjetas info fases ── */}
        <div className="mb-6 text-center">
          <p className={`${lusitana.className} text-xl font-bold text-white`}>
            Descripcion de las Fases
          </p>
          <p className="mt-1 text-xs uppercase tracking-widest text-blue-400/70">
            Utilidades y aplicaciones practicas
          </p>
          <div className="mx-auto mt-2 h-px w-16 bg-blue-500 opacity-60" />
        </div>

        <div className="space-y-4">
          {funciones.map((fn, i) => (
            <FuncionInfoCard key={fn.id} fn={fn} index={i} />
          ))}
        </div>

      </div>
    </main>
  );
}