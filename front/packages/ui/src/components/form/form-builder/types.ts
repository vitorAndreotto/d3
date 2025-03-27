export interface Form {
  id: string;
  etapas: {
    id: string;
    perguntas: {
      id: string;
      tipo: string;
      label: string;
      opcoes?: {
        label: string;
        value: number;
      }[];
    }[];
  }[];
  corTexto: string;
  corPrincipal: string;
  titulo: string;
  descricao: string;
  tituloFinal: string;
  descricaoFinal: string;
}

export interface FormState {
  formData: Record<string, any>;
  userInfo: {
    nome: string;
    email: string;
  };
  currentEtapa: number;
  showSuccess: boolean;
  showResults: boolean;
  resultados: {
    acertos: number;
    erros: number;
    vazios: number;
  } | null;
}

export interface UserInfo {
  nome: string;
  email: string;
}
