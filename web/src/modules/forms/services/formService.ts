import { httpClient } from '@/services';
import type { Form } from '../types/form'; 
import type { Resultado } from '../state/formState.types';

interface SubmitFormPayload {
  formularioId: string;
  respostas: {
    perguntaId: string;
    valor: string | number;
  }[];
  nome: string;
  email: string;
}

interface SubmitFormResponse {
  resultados: Resultado;
}

export const listForms = async (): Promise<Form[]> => {
  const { data } = await httpClient.get<Form[]>('/api/formulario');
  return data;
};

export const getFormByRota = async (rota: string): Promise<Form> => {
  const { data } = await httpClient.get<Form>(`/api/formulario/etapas/${rota}`);
  return data;
};

export const submitForm = async (payload: SubmitFormPayload): Promise<SubmitFormResponse> => {
  const { data } = await httpClient.post<SubmitFormResponse>(`/api/envio/respostas`, payload);
  return data;
};
