'use client';

import { useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { fase1, fase2, fase3, fase4, fase5 } from '@/app/lib/actions';

const DEVICE = 'Motor';

type FuncionMotor = {
  id: number;
  nombre: string;
  descripcion: string;
  icono: string;
  accion: string;
  color: string;
  hoverColor: string;
  btnColor: string;
  onClick: () => Promise<void>;
};

const motorFunctions: FuncionMotor[] = [
  {
    id: 1,
    nombre: 'Iniciar Motor',
    descripcion: 'Activa el sistema de bombeo principal del raceway y pone en marcha el ciclo de circulacion de agua.',
    icono: '▶',
    accion: 'Iniciar',
    color: 'from-blue-900 to-blue-700',
    hoverColor: 'hover:from-blue-800 hover:to-blue-600',
    btnColor: 'bg-emerald-500 hover:bg-emerald-400',
    onClick: () => fase1(DEVICE, 5),
  },
  {
    id: 2,
    nombre: 'Motor parado, Valvula abierta',
    descripcion: 'Abre las valvulas de control del sistema hidraulico con el motor parado.',
    icono: '■',
    accion: 'Detener',
    color: 'from-blue-950 to-blue-800',
    hoverColor: 'hover:from-blue-900 hover:to-blue-700',
    btnColor: 'bg-red-500 hover:bg-red-400',
    onClick: () => fase2(DEVICE),
  },
  {
    id: 3,
    nombre: 'Motor encendido, Valvula abierta',
    descripcion: 'Abre las valvulas de control del sistema hidraulico para permitir la circulacion completa del flujo y activa el motor.',
    icono: '◈',
    accion: 'Abrir',
    color: 'from-blue-900 to-indigo-800',
    hoverColor: 'hover:from-blue-800 hover:to-indigo-700',
    btnColor: 'bg-sky-500 hover:bg-sky-400',
    onClick: () => fase3(DEVICE),
  },
  {
    id: 4,
    nombre: 'Cerrar todo',
    descripcion: 'Cierra todas las valvulas del circuito hidraulico para aislar el sistema y prevenir perdidas.',
    icono: '◉',
    accion: 'Cerrar',
    color: 'from-slate-800 to-blue-900',
    hoverColor: 'hover:from-slate-700 hover:to-blue-800',
    btnColor: 'bg-amber-500 hover:bg-amber-400',
    onClick: () => fase4(DEVICE),
  },
  {
    id: 5,
    nombre: 'Encender motor Direccion Opuesta',
    descripcion: 'El motor se enciende y su movimiento es en sentido contrario.',
    icono: '◎',
    accion: 'Invertir',
    color: 'from-blue-800 to-cyan-900',
    hoverColor: 'hover:from-blue-700 hover:to-cyan-800',
    btnColor: 'bg-blue-400 hover:bg-blue-300',
    onClick: () => fase5(DEVICE),
  },
];

export default function Page() {

  //constantes de la UI de los botones
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
    <main className="flex min-h-screen flex-col items-center bg-gray-950 px-6 py-12">

      <div className="mb-12 text-center">
        <p className={`${lusitana.className} text-3xl font-bold text-white md:text-4xl`}>
          Operaciones con el Motor
        </p>
        <p className="mt-2 text-blue-400 text-sm md:text-base tracking-widest uppercase">
          Panel de control del raceway
        </p>
        <div className="mx-auto mt-4 h-px w-24 bg-blue-500 opacity-60" />
      </div>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {motorFunctions.map((fn) => {
          const estaCargando = cargando === fn.id;
          const fueExito = exito === fn.id;
          const fueError = errorId === fn.id;

          return (
            <div
              key={fn.id}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br ${fn.color} ${fn.hoverColor} p-6 shadow-lg shadow-blue-950/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/60 border ${fueError ? 'border-red-500' : fueExito ? 'border-emerald-500' : 'border-blue-800/30'}`}
            >
              <div className="pointer-events-none absolute right-4 top-4 text-6xl opacity-5 select-none">
                {fn.icono}
              </div>

              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-2xl text-blue-200 ring-1 ring-white/10">
                {fn.icono}
              </div>

              <div className="flex-1">
                <h2 className={`${lusitana.className} mb-2 text-lg font-bold text-white`}>
                  {fn.nombre}
                </h2>
                <p className="text-sm leading-relaxed text-blue-200/80">
                  {fn.descripcion}
                </p>
              </div>

              {/* Mensaje de feedback */}
              {fueExito && (
                <p className="mt-3 text-xs font-semibold text-emerald-400">✓ Ejecutado correctamente</p>
              )}
              {fueError && (
                <p className="mt-3 text-xs font-semibold text-red-400">✕ Error al ejecutar</p>
              )}

              <button
                onClick={() => ejecutar(fn)}
                disabled={estaCargando || cargando !== null}
                className={`mt-4 w-full rounded-lg ${fn.btnColor} px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {estaCargando ? 'Ejecutando...' : fn.accion}
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}