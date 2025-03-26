import { Form } from '../types/form';
import api from '../api';

interface UIForm {
  id: string;
  name: string;
  createdAt: string;
}

export const listForms = async (): Promise<UIForm[]> => {
  const response = await api.get<Form[]>('api/formulario');
  return response.data.map(form => ({
    ...form,
    id: form.id.toString()
  }));
};
