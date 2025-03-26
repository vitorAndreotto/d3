'use client';

import { useEffect, useState } from 'react';
import { FormList } from '@front/ui';
import { listForms } from '@front/api';
import type { Form } from '@front/ui';

export default function Home() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const data = await listForms();
      setForms(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar formulários. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleFormAccess = (formId: string) => {
    alert(`Acessar formulário ${formId}`);
  };

  return (
    <main className="min-h-[calc(100vh-128px)] bg-gray-50 py-8">
      <FormList
        forms={forms}
        loading={loading}
        error={error || undefined}
        onFormAccess={handleFormAccess}
      />
    </main>
  );
}