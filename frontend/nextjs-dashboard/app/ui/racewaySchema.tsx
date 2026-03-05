'use client';

import { useEffect, useState } from 'react';
import { lusitana } from '@/app/ui/fonts';
import { fetchEstado, toggleValvula, type Estado } from '@/app/lib/actions';

const INTERVALO_MS = 5000;

function Valvula({
  x, y, abierta, label, onClick, bloqueada = false
}: {
  x: number; y: number; abierta: boolean; label: string; onClick: () => void; bloqueada?: boolean
}) {
  const color = bloqueada ? '#64748b' : abierta ? '#22c55e' : '#ef4444';
  const stroke = bloqueada ? '#475569' : abierta ? '#16a34a' : '#dc2626';
  return (
    <g
      onClick={bloqueada ? undefined : onClick}
      style={{ cursor: bloqueada ? 'not-allowed' : 'pointer', userSelect: 'none' }}
      opacity={bloqueada ? 0.5 : 1}
    >
      <polygon points={`${x},${y-10} ${x+14},${y+10} ${x-14},${y+10}`} fill={color} stroke={stroke} strokeWidth='1.5' />
      <polygon points={`${x},${y+10} ${x+14},${y-10} ${x-14},${y-10}`} fill={color} stroke={stroke} strokeWidth='1.5' />
      {bloqueada && <text x={x-5} y={y+4} fill='#94a3b8' fontSize='10'>X</text>}
      <text x={x+18} y={y+4} fill='#94a3b8' fontSize='10' fontFamily='monospace'>{label}</text>
    </g>
  );
}

function Sensor({ x, y, activo, label }: { x: number; y: number; activo: boolean; label: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill={activo ? '#f59e0b' : '#334155'} stroke={activo ? '#d97706' : '#475569'} strokeWidth='1.5' />
      {activo && <circle cx={x} cy={y} r={8} fill='none' stroke='#f59e0b' strokeWidth='1' opacity='0.5' />}
      <text x={x+10} y={y+4} fill='#94a3b8' fontSize='9' fontFamily='monospace'>{label}</text>
    </g>
  );
}

function Agua({ x, y, width, height, nivel, encendido }: {
  x: number; y: number; width: number; height: number; nivel: number; encendido?: boolean
}) {
  const aguaHeight = (height * nivel) / 100;
  const aguaY = y + height - aguaHeight;
  return (
    <g>
      <defs>
        <clipPath id={`clip-${x}-${y}`}>
          <rect x={x} y={y} width={width} height={height} />
        </clipPath>
      </defs>
      {nivel > 0 && (
        <g clipPath={`url(#clip-${x}-${y})`}>
          <rect x={x} y={aguaY} width={width} height={aguaHeight} fill='#1d4ed8' opacity='0.7' />
          <path
            d={`M${x} ${aguaY} Q${x+width*0.25} ${aguaY-4} ${x+width*0.5} ${aguaY} Q${x+width*0.75} ${aguaY+4} ${x+width} ${aguaY}`}
            fill='none' stroke='#3b82f6' strokeWidth='2' opacity={encendido ? '1' : '0.5'}
          >
            {encendido && (
              <animate attributeName='d'
                values={`M${x} ${aguaY} Q${x+width*0.25} ${aguaY-4} ${x+width*0.5} ${aguaY} Q${x+width*0.75} ${aguaY+4} ${x+width} ${aguaY};M${x} ${aguaY} Q${x+width*0.25} ${aguaY+4} ${x+width*0.5} ${aguaY} Q${x+width*0.75} ${aguaY-4} ${x+width} ${aguaY};M${x} ${aguaY} Q${x+width*0.25} ${aguaY-4} ${x+width*0.5} ${aguaY} Q${x+width*0.75} ${aguaY+4} ${x+width} ${aguaY}`}
                dur='2s' repeatCount='indefinite'
              />
            )}
          </path>
        </g>
      )}
    </g>
  );
}

export default function RacewaySchema() {
  const [estado, setEstado] = useState<Estado | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ultimaAct, setUltimaAct] = useState('');
  const [mensajeBloqueo, setMensajeBloqueo] = useState<string | null>(null);

  useEffect(() => {
    const actualizar = async () => {
      try {
        const datos = await fetchEstado();
        setEstado(datos);
        setError(null);
        setUltimaAct(new Date().toLocaleTimeString());
      } catch {
        setError('Sin conexion con la API');
      }
    };
    actualizar();
    const intervalo = setInterval(actualizar, INTERVALO_MS);
    return () => clearInterval(intervalo);
  }, []);

  const handleValvula = async (valvula: string, estadoActual: boolean) => {
    try {
      await toggleValvula(valvula, !estadoActual);
      setMensajeBloqueo(null);
    } catch (e: any) {
      setMensajeBloqueo(e.message);
      setTimeout(() => setMensajeBloqueo(null), 3000);
    }
  };

  const r = estado?.raceway;
  const d = estado?.deposito;
  const s = estado?.salida;
  const m = estado?.motor;

  // Bloqueos usando nuevos nombres de sensores
  const bloqueos = {
    v1: r?.sensor_minimo ?? false,
    v2: r?.sensor_maximo ?? false,
    v3: d?.sensor_minimo ?? false,
    v4: d?.sensor_maximo ?? false,
    v5: s?.sensor_minimo ?? false,
    v6: s?.sensor_maximo ?? false,
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

      <div className='w-full max-w-4xl rounded-2xl border border-blue-800/30 bg-gray-900 p-4 shadow-xl'>
        <svg viewBox='0 0 780 420' className='w-full' style={{ fontFamily: 'monospace' }}>
          <rect width='780' height='420' fill='#0f172a' rx='12' />

          {/* TANQUE RACEWAY */}
          <rect x='480' y='80' width='120' height='160' fill='none' stroke='#334155' strokeWidth='2' rx='4' />
          {r && <Agua x={481} y={81} width={118} height={158} nivel={r.nivel} encendido={m?.encendido} />}
          <text x='540' y='72' fill='#64748b' fontSize='11' textAnchor='middle'>RACEWAY</text>
          <line x1='540' y1='30' x2='540' y2='80' stroke='#334155' strokeWidth='6' />
          <line x1='480' y1='30' x2='700' y2='30' stroke='#334155' strokeWidth='6' />
          <line x1='700' y1='30' x2='700' y2='80' stroke='#334155' strokeWidth='6' />

          {r && <Valvula x={700} y={110} abierta={r.valvula_llenado} bloqueada={bloqueos.v2} label='V2' onClick={() => handleValvula('v2', r.valvula_llenado)} />}
          <line x1='540' y1='240' x2='540' y2='300' stroke='#334155' strokeWidth='6' />

          {r && <Valvula x={540} y={310} abierta={r.valvula_vaciado} bloqueada={bloqueos.v1} label='V1' onClick={() => handleValvula('v1', r.valvula_vaciado)} />}
          <line x1='475' y1='170' x2='480' y2='170' stroke='#475569' strokeWidth='1.5' strokeDasharray='3,2' />
          <line x1='475' y1='120' x2='480' y2='120' stroke='#475569' strokeWidth='1.5' strokeDasharray='3,2' />
          {r && <Sensor x={468} y={170} activo={r.sensor_minimo} label='N1' />}
          {r && <Sensor x={468} y={120} activo={r.sensor_maximo} label='N2' />}

          {/* DEPOSITO CO2/O2 */}
          <polygon points='270,100 350,100 330,210 290,210' fill='none' stroke='#334155' strokeWidth='2' />
          {d && d.nivel > 0 && (
            <g>
              <defs><clipPath id='clip-deposito'><polygon points='270,100 350,100 330,210 290,210' /></clipPath></defs>
              <rect x='270' y={210-(110*d.nivel/100)} width='80' height={110*d.nivel/100} fill='#7c3aed' opacity='0.5' clipPath='url(#clip-deposito)' />
            </g>
          )}
          <text x='310' y='92' fill='#64748b' fontSize='10' textAnchor='middle'>DEPOSITO CO2/O2</text>

          <line x1='310' y1='50' x2='310' y2='100' stroke='#334155' strokeWidth='5' />
          {d && <Valvula x={310} y={65} abierta={d.valvula_llenado} bloqueada={bloqueos.v4} label='V4' onClick={() => handleValvula('v4', d.valvula_llenado)} />}
          <line x1='310' y1='210' x2='310' y2='270' stroke='#334155' strokeWidth='5' />

          {d && <Valvula x={310} y={255} abierta={d.valvula_vaciado} bloqueada={bloqueos.v3} label='V3' onClick={() => handleValvula('v3', d.valvula_vaciado)} />}
          {d && <Sensor x={355} y={185} activo={d.sensor_minimo} label='N3' />}
          {d && <Sensor x={355} y={135} activo={d.sensor_maximo} label='N4' />}

          {/* ZONA SALIDA */}
          <rect x='60' y='120' width='100' height='100' fill='none' stroke='#334155' strokeWidth='2' rx='4' />
          {s && <Agua x={61} y={121} width={98} height={98} nivel={s.nivel} />}
          <text x='110' y='112' fill='#64748b' fontSize='10' textAnchor='middle'>SALIDA</text>
          <line x1='110' y1='220' x2='110' y2='290' stroke='#334155' strokeWidth='5' />

          {s && <Valvula x={110} y={278} abierta={s.valvula_vaciado} bloqueada={bloqueos.v5} label='V5' onClick={() => handleValvula('v5', s.valvula_vaciado)} />}
          <line x1='110' y1='120' x2='110' y2='60' stroke='#334155' strokeWidth='5' />
          
          {s && <Valvula x={110} y={72} abierta={s.valvula_llenado} bloqueada={bloqueos.v6} label='V6' onClick={() => handleValvula('v6', s.valvula_llenado)} />}
          {s && <Sensor x={50} y={195} activo={s.sensor_minimo} label='N5' />}
          {s && <Sensor x={50} y={150} activo={s.sensor_maximo} label='N6' />}

          {/* MOTOR */}
          <circle cx='390' cy='360' r='28' fill={m?.encendido ? '#1e3a5f' : '#1e293b'} stroke={m?.encendido ? '#3b82f6' : '#334155'} strokeWidth='2.5' />
          {m?.encendido && (
            <circle cx='390' cy='360' r='34' fill='none' stroke='#3b82f6' strokeWidth='1' opacity='0.4'>
              <animate attributeName='r' values='28;36;28' dur='2s' repeatCount='indefinite' />
              <animate attributeName='opacity' values='0.4;0;0.4' dur='2s' repeatCount='indefinite' />
            </circle>
          )}
          <text x='390' y='356' fill={m?.encendido ? '#93c5fd' : '#64748b'} fontSize='11' textAnchor='middle'>MOTOR</text>
          <text x='390' y='370' fill={m?.encendido ? '#22c55e' : '#ef4444'} fontSize='9' textAnchor='middle'>
            {m?.encendido ? (m.forward === true ? '>> FWD' : '<< BWD') : 'OFF'}
          </text>
          <line x1='310' y1='360' x2='362' y2='360' stroke='#334155' strokeWidth='3' strokeDasharray='4,3' />
          <line x1='310' y1='270' x2='310' y2='360' stroke='#334155' strokeWidth='3' strokeDasharray='4,3' />
          <line x1='418' y1='360' x2='460' y2='360' stroke='#334155' strokeWidth='3' strokeDasharray='4,3' />
          <line x1='460' y1='360' x2='460' y2='330' stroke='#334155' strokeWidth='3' strokeDasharray='4,3' />
          <line x1='160' y1='170' x2='480' y2='170' stroke={m?.encendido ? '#1d4ed8' : '#1e293b'} strokeWidth='4'>
            {m?.encendido && <animate attributeName='stroke' values='#1d4ed8;#3b82f6;#1d4ed8' dur='1.5s' repeatCount='indefinite' />}
          </line>
          {!estado && (
            <g>
              <rect x='50' y='50' width='680' height='300' fill='#1e293b' rx='8' opacity='0.5' />
              <text x='390' y='210' fill='#475569' fontSize='16' textAnchor='middle'>Conectando con la API...</text>
            </g>
          )}
        </svg>
      </div>

      {estado && (
        <div className='mt-6 grid w-full max-w-4xl grid-cols-3 gap-4'>
          {[
            { label: 'Salida', nivel: s?.nivel ?? 0, color: 'bg-cyan-600' },
            { label: 'Deposito CO2/O2', nivel: d?.nivel ?? 0, color: 'bg-purple-600' },
            { label: 'Raceway', nivel: r?.nivel ?? 0, color: 'bg-blue-600' },
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