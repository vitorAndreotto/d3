import { useMemo } from "react";

interface ResultadoGraficoProps {
  acertos: number;
  erros: number;
  vazios: number;
  corPrincipal: string;
  corTexto: string;
}

export const ResultadoGrafico = ({
  acertos,
  erros,
  vazios,
  corPrincipal,
  corTexto,
}: ResultadoGraficoProps) => {
  const total = acertos + erros + vazios;
  const radius = 67;
  const strokeWidth = 20;
  const center = radius + strokeWidth;
  const size = (radius + strokeWidth) * 2;

  const isSingleValue = useMemo(() => {
    return (acertos === total && erros === 0 && vazios === 0) ||
           (erros === total && acertos === 0 && vazios === 0) ||
           (vazios === total && acertos === 0 && erros === 0);
  }, [acertos, erros, vazios, total]);

  const paths = useMemo(() => {
    const results = [];

    if (isSingleValue) {
      // Se for 100% de um único valor, desenha círculo completo
      let color = "#2A52F0"; // cor padrão (acertos)
      let label = "Acertos";
      
      if (erros === total) {
        color = "#AE2831";
        label = "Erros";
      } else if (vazios === total) {
        color = "#40C2E9";
        label = "Vazios";
      }

      results.push({
        path: `M ${center} ${strokeWidth} A ${radius} ${radius} 0 1 1 ${center - 0.01} ${strokeWidth}`,
        color,
        label,
        percentage: 100,
        textPosition: { x: center, y: center }
      });

      return results;
    }

    // Caso normal com múltiplos valores
    let currentAngle = 0;

    const calculateArc = (value: number) => {
      const percentage = value / total;
      return percentage * (2 * Math.PI);
    };

    const createArc = (startAngle: number, endAngle: number) => {
      const x1 = center + radius * Math.cos(startAngle);
      const y1 = center + radius * Math.sin(startAngle);
      const x2 = center + radius * Math.cos(endAngle);
      const y2 = center + radius * Math.sin(endAngle);
      
      const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
      
      return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
    };

    const calculateTextPosition = (startAngle: number, endAngle: number) => {
      const angle = (startAngle + endAngle) / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y };
    };

    // Acertos (azul)
    if (acertos > 0) {
      const angle = calculateArc(acertos);
      const textPos = calculateTextPosition(currentAngle, currentAngle + angle);
      results.push({
        path: createArc(currentAngle, currentAngle + angle),
        color: "#2A52F0",
        label: "Acertos",
        percentage: Math.round((acertos / total) * 100),
        textPosition: textPos,
      });
      currentAngle += angle;
    }

    // Erros (vermelho)
    if (erros > 0) {
      const angle = calculateArc(erros);
      const textPos = calculateTextPosition(currentAngle, currentAngle + angle);
      results.push({
        path: createArc(currentAngle, currentAngle + angle),
        color: "#AE2831",
        label: "Erros",
        percentage: Math.round((erros / total) * 100),
        textPosition: textPos,
      });
      currentAngle += angle;
    }

    // Vazios (azul claro)
    if (vazios > 0) {
      const angle = calculateArc(vazios);
      const textPos = calculateTextPosition(currentAngle, currentAngle + angle);
      results.push({
        path: createArc(currentAngle, currentAngle + angle),
        color: "#40C2E9",
        label: "Vazios",
        percentage: Math.round((vazios / total) * 100),
        textPosition: textPos,
      });
    }

    return results;
  }, [acertos, erros, vazios, total, isSingleValue]);

  return (
    <div className="flex items-center gap-12">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {paths.map((item, index) => (
          <g key={index}>
            <path
              d={item.path}
              fill="none"
              stroke={item.color}
              strokeWidth={strokeWidth}
              strokeLinecap="butt"
            />
            <text
              x={item.textPosition.x}
              y={item.textPosition.y}
              fill="white"
              fontSize="16"
              textAnchor="middle"
              dominantBaseline="middle"
            >
              {item.percentage}%
            </text>
          </g>
        ))}
      </svg>
      
      <div className="flex flex-col gap-4">
        {paths.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span style={{ color: corTexto }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
