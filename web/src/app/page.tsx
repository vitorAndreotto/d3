"use client";

import { useEffect, useState } from "react";
import { Form } from "@/modules/forms/types/form";
import { FormList } from "@/modules/forms/components";
import { listForms } from "@/modules/forms/services";

export default function Home() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const data = await listForms();
      setForms(data);
      setError(undefined);
    } catch (err) {
      setError("Erro ao carregar formulários. Por favor, tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black p-8">
      <FormList
        forms={forms}
        loading={loading}
        error={error}
      />
    </main>
  );
}
