export interface Pergunta {
  id: string;
  label: string;
  tipo: string;
  opcoes?: {
    label: string;
    valor: number | null | string;
    value: number | null | string;
  }[];
}

export interface Etapa {
  id: string;
  titulo: string;
  perguntas: Pergunta[];
}

export interface Form {
  id: string;
  nome: string;
  rota: string;
  titulo: string;
  descricao: string;
  tituloFinal: string;
  descricaoFinal: string;
  imagemFundo: string;
  corFundo: string;
  corPrincipal: string;
  corTexto: string;
  tipo: string;
  etapas: Etapa[];
}