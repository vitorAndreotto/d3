export interface UserInfo {
  nome: string;
  email: string;
}

export interface Resultado {
  acertos: number;
  erros: number;
  vazios: number;
}

export interface FormState {
  formData: Record<string, string | number>;
  userInfo: UserInfo;
  currentEtapa: number;
  showSuccess: boolean;
  showResults: boolean;
  resultados: Resultado | null;
}