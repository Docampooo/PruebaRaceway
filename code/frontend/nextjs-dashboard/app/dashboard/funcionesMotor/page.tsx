'use client';

import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { FuncionMotor } from '@/app/tipos/raceway';
import { motorFunctions } from '@/app/data/raceway';
import { useWebSocket } from '@/app/hooks/useWebSocket';
import FuncionCard from '@/app/ui/dashboard/racewayCircuito/FuncionCard';
import EstadoSistema from '@/app/ui/dashboard/racewayCircuito/EstadoSistema';

export default function Page() {

  const { estado, error: errorEstado, ultimaActualizacion } = useWebSocket('ws://localhost:8000/ws');

  const [cargando, setCargando] = useState<number | null>(null);
  const [exito, setExito] = useState<number | null>(null);
  const [errorId, setErrorId] = useState<number | null>(null);

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

  return (
    <main className="flex min-h-screen flex-col bg-gray-950 px-6 py-12">

      <div className="mb-12 text-center">
        <p className={`${lusitana.className} text-3xl font-bold text-white md:text-4xl`}>
          Operaciones con el Motor
        </p>
        <p className="mt-2 text-blue-400 text-sm md:text-base tracking-widest uppercase">
          Panel de control del raceway
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-blue-500 opacity-60" />
      </div>

      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">

        <section className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2">
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
        </section>

        <EstadoSistema
          estado={estado}
          error={errorEstado}
          ultimaActualizacion={ultimaActualizacion}
        />

      </div>
    </main>
  );
}