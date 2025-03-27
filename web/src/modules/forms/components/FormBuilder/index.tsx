import { useEffect, useState } from 'react';
import { Form } from '../../types/form';
import { getFormByRota } from '../../services/formService';
import { WelcomeScreen } from './components/welcome-screen';
import { QuestionScreen } from './components/question-screen';
import { UserInfoScreen } from './components/user-info-screen';
import { SuccessScreen } from './components/success-screen';
import { useFormState } from '../../hooks/useFormState';

interface FormBuilderProps {
  rota: string;
}

export const FormBuilder = ({ rota }: FormBuilderProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Form | null>(null);

  useEffect(() => {
    const loadForm = async () => {
      try {
        const data = await getFormByRota(rota);
        setForm(data);
      } catch (err) {
        setError('Erro ao carregar o formulário');
      } finally {
        setLoading(false);
      }
    };

    loadForm();
  }, [rota]);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white">Carregando...</p>
      </div>
    );
  }

  if (error || !form) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white">{error || 'Formulário não encontrado'}</p>
      </div>
    );
  }

  return <FormContent form={form} />;
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
    handleSubmit,
    handleViewResults,
    handleReset,
  } = useFormState(form);

  const renderScreen = () => {
    if (state.showSuccess) {
      return (
        <SuccessScreen
          form={form}
          showResults={state.showResults}
          resultados={state.resultados}
          onViewResults={handleViewResults}
          onReset={handleReset}
        />
      );
    }

    if (state.currentEtapa === 0) {
      return <WelcomeScreen form={form} onStart={handleStart} />;
    }

    if (state.currentEtapa > form.etapas.length) {
      return (
        <UserInfoScreen
          form={form}
          userInfo={state.userInfo}
          onUserInfoChange={handleUserInfoChange}
          onSubmit={handleSubmit}
          submitting={submitting}
          error={error}
        />
      );
    }

    const currentEtapa = form.etapas[state.currentEtapa - 1];

    return (
      <QuestionScreen
        form={form}
        currentEtapa={state.currentEtapa}
        formData={state.formData}
        onInputChange={handleInputChange}
        onNext={handleNext}
      />
    );
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Container do vídeo */}
      <div
        className="
          w-full lg:w-1/2
          h-[50vh] lg:h-auto
          relative overflow-hidden
          flex items-start lg:items-center justify-center lg:justify-end
        "
      >
        <div
          className="
            absolute inset-0
            flex items-start lg:items-center justify-center lg:justify-end
          "
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="
              w-auto h-[200%]
              absolute top-0 left-1/2
              -translate-x-1/2 -translate-y-1/2
              lg:relative lg:h-full lg:top-auto lg:left-auto
              lg:translate-x-0 lg:translate-y-0
              object-cover
            "
            src="/assets/videos/backgrounds/esfera.mp4"
          />
        </div>
      </div>

      {/* Container do formulário */}
      <div
        className="
          w-full lg:w-1/2
          flex items-center justify-center lg:justify-start
          px-4 py-8 md:p-8 lg:p-12
          bg-black/50 backdrop-blur-sm
          relative z-10
        "
      >
        <div className="w-full max-w-[428px]">{renderScreen()}</div>
      </div>
    </div>
  );
};
