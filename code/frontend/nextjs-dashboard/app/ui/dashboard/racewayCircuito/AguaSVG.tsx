//La función Agua

type AguaProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  nivel: number;
  encendido?: boolean;
};

export default function AguaSVG({ x, y, width, height, nivel, encendido }: AguaProps) {
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