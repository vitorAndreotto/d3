import React from 'react';
import { Button } from '../button';

export interface Form {
  id: string;
  name: string;
  createdAt: string;
}

interface FormCardProps {
  form: Form;
  onAccess?: (formId: string) => void;
}

export const FormCard: React.FC<FormCardProps> = ({ form, onAccess }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{form.name}</h3>
      <p className="text-gray-600 text-sm">
        Criado em: {new Date(form.createdAt).toLocaleDateString('pt-BR')}
      </p>
      <div className="mt-4">
        <Button onClick={() => onAccess?.(form.id)}>
          Acessar
        </Button>
      </div>
    </div>
  );
};
