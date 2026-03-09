//La función Sensor

type SensorProps = {
  x: number;
  y: number;
  activo: boolean;
  label: string;
};

export default function SensorSVG({ x, y, activo, label }: SensorProps) {
  return (
    <g>
      <circle cx={x} cy={y} r={5} fill={activo ? '#f59e0b' : '#334155'} stroke={activo ? '#d97706' : '#475569'} strokeWidth='1.5' />
      {activo && <circle cx={x} cy={y} r={8} fill='none' stroke='#f59e0b' strokeWidth='1' opacity='0.5' />}
      <text x={x+10} y={y+4} fill='#94a3b8' fontSize='9' fontFamily='monospace'>{label}</text>
    </g>
  );
}