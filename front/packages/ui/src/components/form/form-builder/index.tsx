import { useEffect, useState } from "react";
import { api } from "@front/api";
import { Form } from "./types";
import { useFormState } from "./hooks/useFormState";
import { WelcomeScreen } from "./components/welcome-screen";
import { QuestionScreen } from "./components/question-screen";
import { UserInfoScreen } from "./components/user-info-screen";
import { SuccessScreen } from "./components/success-screen";

interface FormBuilderProps {
  rota: string;
}

export const FormBuilder = ({ rota }: FormBuilderProps) => {
  const [form, setForm] = useState<Form | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const response = await api.get(`/api/formulario/etapas/${rota}`);
        setForm(response.data);
      } catch (err) {
        setError("Erro ao carregar o formulário");
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [rota]);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>{error || "Formulário não encontrado"}</p>
      </div>
    );
  }

  return (
    <FormContent form={form} />
  );
};

const FormContent = ({ form }: { form: Form }) => {
  const {
    state,
    submitting,
    error,
    handleStart,
    handleInputChange,
    handleUserInfoChange,
    handleNext,
    handlePrevious,
    handleSubmit,
    handleViewResults,
    handleReset,
  } = useFormState(form);

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

      {/* Container do formulário */}
      <div
        className="
          w-full lg:w-1/2
          flex items-center
          px-4 py-8 md:p-8 lg:p-12
          bg-black/50 backdrop-blur-sm
          relative z-10
        "
      >
        <div className="w-full max-w-[428px]">
          {state.showSuccess ? (
            <SuccessScreen
              form={form}
              showResults={state.showResults}
              resultados={state.resultados}
              onViewResults={handleViewResults}
              onReset={handleReset}
            />
          ) : state.currentEtapa === 0 ? (
            <WelcomeScreen form={form} onStart={handleStart} />
          ) : state.currentEtapa <= form.etapas.length ? (
            <QuestionScreen
              form={form}
              currentEtapa={state.currentEtapa}
              formData={state.formData}
              onInputChange={handleInputChange}
              onNext={handleNext}
              onPrevious={handlePrevious}
            />
          ) : (
            <UserInfoScreen
              form={form}
              userInfo={state.userInfo}
              onUserInfoChange={handleUserInfoChange}
              onSubmit={handleSubmit}
              onPrevious={handlePrevious}
              submitting={submitting}
              error={error}
            />
          )}
        </div>
      </div>
    </main>
  );
};
