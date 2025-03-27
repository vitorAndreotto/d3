import { Resultado } from '../state/formState.types';

export const calcularPorcentagens = (resultados: Resultado[]) => {
  const total = resultados.length;
  const contagem = {
    ACERTO: 0,
    ERRO: 0,
    VAZIO: 0,
  };

  resultados.forEach(({ status }) => {
    contagem[status]++;
  });

  return {
    acerto: ((contagem.ACERTO / total) * 100).toFixed(2),
    erro: ((contagem.ERRO / total) * 100).toFixed(2),
    vazio: ((contagem.VAZIO / total) * 100).toFixed(2),
  };
};
