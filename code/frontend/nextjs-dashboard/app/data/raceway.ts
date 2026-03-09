import { fase } from '@/app/lib/actions';
import { FuncionMotor } from '@/app/tipos/raceway';

// ─── Overview ────────────────────────────────────────────────────────────────

export const stats = [
  { valor: '5', label: 'Modos de operacion' },
  { valor: '24/7', label: 'Monitoreo continuo' },
  { valor: '100%', label: 'Control remoto' },
  { valor: 'IoT', label: 'Conectividad en tiempo real' },
];

export const funciones = [
  {
    id: 1,
    titulo: 'Iniciar Motor',
    utilidad: 'Pone en marcha el sistema de bombeo principal, iniciando la circulacion activa del agua a traves del canal del raceway.',
    aplicaciones: ['Inicio de jornada de cultivo', 'Reinicio tras mantenimiento', 'Activacion del ciclo de oxigenacion'],
    icono: '▶',
    gradiente: 'from-blue-900 via-blue-800 to-cyan-900',
    acento: 'border-cyan-500',
    tag: 'bg-cyan-900 text-cyan-300',
  },
  {
    id: 2,
    titulo: 'Motor parado, Valvula abierta',
    utilidad: 'Permite el flujo pasivo del agua sin accion mecanica del motor, util para drenajes controlados o equilibrado de presiones.',
    aplicaciones: ['Drenaje parcial del canal', 'Equilibrado de niveles', 'Limpieza sin agitacion'],
    icono: '■',
    gradiente: 'from-blue-950 via-indigo-900 to-blue-900',
    acento: 'border-blue-400',
    tag: 'bg-blue-900 text-blue-300',
  },
  {
    id: 3,
    titulo: 'Motor encendido, Valvula abierta',
    utilidad: 'Estado optimo de operacion: flujo maximo con motor activo y valvulas abiertas. Maxima oxigenacion y circulacion del agua.',
    aplicaciones: ['Operacion normal de cultivo', 'Maxima oxigenacion de algas', 'Ciclos de alta produccion'],
    icono: '◈',
    gradiente: 'from-sky-900 via-blue-800 to-indigo-900',
    acento: 'border-sky-400',
    tag: 'bg-sky-900 text-sky-300',
  },
  {
    id: 4,
    titulo: 'Cerrar todo',
    utilidad: 'Cierre completo del sistema hidraulico. Aisla el circuito para prevenir perdidas y proteger los componentes mecanicos.',
    aplicaciones: ['Parada de emergencia', 'Mantenimiento programado', 'Inspeccion del sistema'],
    icono: '◉',
    gradiente: 'from-slate-900 via-blue-950 to-slate-900',
    acento: 'border-amber-500',
    tag: 'bg-amber-900 text-amber-300',
  },
  {
    id: 5,
    titulo: 'Direccion Opuesta',
    utilidad: 'Invierte el sentido del flujo en el canal. Util para limpiezas profundas y uniformidad del cultivo a lo largo del raceway.',
    aplicaciones: ['Limpieza profunda del canal', 'Distribucion uniforme de nutrientes', 'Prevencion de sedimentos'],
    icono: '◎',
    gradiente: 'from-blue-900 via-cyan-900 to-teal-900',
    acento: 'border-teal-400',
    tag: 'bg-teal-900 text-teal-300',
  },
];

// ─── FuncionesMotor ───────────────────────────────────────────────────────────

export const motorFunctions: FuncionMotor[] = [
  {
    id: 1,
    nombre: 'Iniciar Motor',
    descripcion: 'Activa el sistema de bombeo principal del raceway y pone en marcha el ciclo de circulacion de agua.',
    icono: '▶',
    accion: 'Iniciar',
    color: 'from-blue-900 to-blue-700',
    hoverColor: 'hover:from-blue-800 hover:to-blue-600',
    btnColor: 'bg-emerald-500 hover:bg-emerald-400',
    onClick: () => fase('1'),
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
    onClick: () => fase('2'),
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
    onClick: () => fase('3'),
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
    onClick: () => fase('4'),
  },
  {
    id: 5,
    nombre: 'Motor sentido contrario',
    descripcion: 'El motor ya activo gira en sentido contrario al actual.',
    icono: '◎',
    accion: 'Invertir',
    color: 'from-blue-800 to-cyan-900',
    hoverColor: 'hover:from-blue-700 hover:to-cyan-800',
    btnColor: 'bg-blue-400 hover:bg-blue-300',
    onClick: () => fase('5'),
  },
];

// ─── Raceway Schema ───────────────────────────────────────────────────────────

export const nivelesConfig = [
  { label: 'Salida',         color: 'bg-cyan-600' },
  { label: 'Deposito CO2/O2', color: 'bg-purple-600' },
  { label: 'Raceway',        color: 'bg-blue-600' },
];

export const leyendaValvulas = [
  { color: 'bg-emerald-500', texto: 'Valvula abierta' },
  { color: 'bg-red-500',     texto: 'Valvula cerrada' },
  { color: 'bg-slate-500 opacity-50', texto: 'Valvula bloqueada' },
  { color: 'bg-amber-400',   texto: 'Sensor activo' },
];