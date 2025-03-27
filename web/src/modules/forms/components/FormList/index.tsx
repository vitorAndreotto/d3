import React from 'react';
import { Form } from '../../types/form';
import { FormCard } from '../FormCard';

interface FormListProps {
  forms: Form[];
  loading?: boolean;
  error?: string;
  onFormAccess?: (formId: string) => void;
}

export const FormList: React.FC<FormListProps> = ({
  forms,
  loading,
  error,
  onFormAccess,
}) => {
  return (
    <div className="max-w-4xl mx-auto bg-black">
      <h2 className="text-3xl font-montserrat font-bold mb-6 text-[#ffff00]">Formulários Disponíveis</h2>
      
      {loading && (
        <div className="text-white">Carregando formulários...</div>
      )}

      {error && (
        <div className="text-red-500">{error}</div>
      )}

      {!loading && !error && forms.length === 0 && (
        <div className="text-white">Nenhum formulário disponível.</div>
      )}

      {!loading && !error && forms.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {forms.map((form) => (
            <FormCard 
              key={form.id} 
              form={form} 
              onAccess={onFormAccess}
            />
          ))}
        </div>
      )}
    </div>
  );
};
