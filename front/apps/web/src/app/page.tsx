"use client";

import { useEffect, useState } from "react";
import { FormList } from "@front/ui";
import { listForms } from "@front/api";
import type { Form } from "@front/ui";

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
    <main className="flex flex-col lg:flex-row min-h-[calc(100vh-128px)] bg-[#000000] relative">
      {/* Container do vídeo */}
      <div
        className="
    w-full lg:w-1/2
    h-[50vh] lg:h-auto
    relative overflow-hidden
    lg:relative lg:right-auto
    lg:right-1/2 lg:w-[50vw]
  "
      >
        <div
          className="
      absolute inset-0 
      flex items-end lg:items-center justify-center lg:justify-end
      h-full
    "
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="
        w-auto max-w-full
        absolute bottom-0 left-1/2 
        -translate-x-1/2
        lg:relative lg:bottom-auto lg:left-auto
        lg:translate-x-0 lg:translate-y-0
      "
            src="/assets/videos/backgrounds/esfera.mp4"
          />
        </div>
      </div>

      {/* Container do form */}
      <div
        className="
        w-full lg:w-1/2
        flex items-center
        px-4 py-8 md:p-8 lg:p-12
        bg-black/50 backdrop-blur-sm
        relative z-10
      "
      >
        <div className="w-full">
          <FormList
            forms={forms}
            loading={loading}
            error={error}
          />
        </div>
      </div>
    </main>
  );
}
