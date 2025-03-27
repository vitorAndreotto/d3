"use client";

import { FormBuilder } from "@front/ui";

export default function FormPage({ params }: { params: { rota: string } }) {
  return (
    <main className="min-h-[calc(100vh-128px)] bg-black">
      <FormBuilder rota={params.rota} />
    </main>
  );
}
