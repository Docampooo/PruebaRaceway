'use client';

import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { toggleValvula } from '@/app/lib/actions';
import { useWebSocket } from '@/app/hooks/useWebSocket';
import RacewaySVG from '@/app/ui/dashboard/racewayCircuito/RacewaySVG';

export default function RacewaySchema() {

  const { estado, error, ultimaActualizacion: ultimaAct } = useWebSocket('ws://localhost:8000/ws');
  const [mensajeBloqueo, setMensajeBloqueo] = useState<string | null>(null);

  const handleValvula = async (valvula: string, estadoActual: boolean) => {
    try {
      await toggleValvula(valvula, !estadoActual);
      setMensajeBloqueo(null);
    } catch (e: any) {
      setMensajeBloqueo(e.message);
      setTimeout(() => setMensajeBloqueo(null), 3000);
    }
  };

  return (
    <section className='flex min-h-screen flex-col items-center bg-gray-950 px-6 py-12'>

      <div className='mb-8 text-center'>
        <p className={`${lusitana.className} text-3xl font-bold text-white md:text-4xl`}>Gestion del Raceway</p>
        <p className='mt-2 text-xs uppercase tracking-widest text-blue-400/70'>
          Visualizacion en tiempo real · haz clic en las valvulas para accionarlas
        </p>
        {ultimaAct && <p className='mt-1 text-xs text-blue-700'>Actualizado: {ultimaAct}</p>}
      </div>

      {error && (
        <div className='mb-4 w-full max-w-4xl rounded-xl border border-red-800 bg-red-950/50 px-6 py-3 text-center text-sm text-red-400'>{error}</div>
      )}
      {mensajeBloqueo && (
        <div className='mb-4 w-full max-w-4xl rounded-xl border border-amber-700 bg-amber-950/50 px-6 py-3 text-center text-sm text-amber-400'>
          Accion bloqueada: {mensajeBloqueo}
        </div>
      )}

      <div className='mb-6 flex flex-wrap justify-center gap-6 text-xs text-slate-400'>
        <span className='flex items-center gap-2'><span className='inline-block h-3 w-3 rounded-full bg-emerald-500' /> Valvula abierta</span>
        <span className='flex items-center gap-2'><span className='inline-block h-3 w-3 rounded-full bg-red-500' /> Valvula cerrada</span>
        <span className='flex items-center gap-2'><span className='inline-block h-3 w-3 rounded-full bg-slate-500 opacity-50' /> Valvula bloqueada</span>
        <span className='flex items-center gap-2'><span className='inline-block h-3 w-3 rounded-full bg-amber-400' /> Sensor activo</span>
      </div>

      <RacewaySVG estado={estado} onValvula={handleValvula} />

      {estado && (
        <div className='mt-6 grid w-full max-w-4xl grid-cols-3 gap-4'>
          {[
            { label: 'Salida', nivel: estado.salida?.nivel ?? 0, color: 'bg-cyan-600' },
            { label: 'Deposito CO2/O2', nivel: estado.deposito?.nivel ?? 0, color: 'bg-purple-600' },
            { label: 'Raceway', nivel: estado.raceway?.nivel ?? 0, color: 'bg-blue-600' },
          ].map((item) => (
            <div key={item.label} className='rounded-xl border border-blue-800/30 bg-gray-900 p-4'>
              <p className='mb-2 text-xs uppercase tracking-widest text-blue-400/70'>{item.label}</p>
              <div className='h-2 w-full rounded-full bg-gray-800'>
                <div className={`h-2 rounded-full ${item.color} transition-all duration-700`} style={{ width: `${item.nivel}%` }} />
              </div>
              <p className='mt-1 text-right text-xs font-bold text-white'>{item.nivel}%</p>
            </div>
          ))}
        </div>
      )}

    </section>
  );
}