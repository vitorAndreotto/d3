import React from 'react';
import { FormCard, Form } from '../form-card';

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
      <h2 className="text-3xl font-montserrat font-bold mb-6">Formulários Disponíveis</h2>
      
      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-600">Carregando formulários...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {!loading && !error && forms.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">Nenhum formulário encontrado.</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <FormCard 
            key={form.id} 
            form={form} 
            onAccess={onFormAccess}
          />
        ))}
      </div>
    </div>
  );
};
