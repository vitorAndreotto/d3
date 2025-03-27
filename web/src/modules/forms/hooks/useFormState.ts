import { useState } from "react";
import { FormState, UserInfo } from '../state/formState.types';
import { Form } from "../types/form";
import { submitForm } from "../services/formService";

export const useFormState = (form: Form) => {
  const [state, setState] = useState<FormState>({
    formData: {},
    userInfo: {
      nome: "",
      email: "",
    },
    currentEtapa: 0,
    showSuccess: false,
    showResults: false,
    resultados: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleStart = () => {
    setState((prev) => ({ ...prev, currentEtapa: 1 }));
  };

  const handleInputChange = (id: string, value: any) => {
    console.log('handleInputChange:', { id, value });
    setState((prev) => {
      const newState = {
        ...prev,
        formData: { ...prev.formData, [id]: value },
      };
      console.log('newState:', newState);
      return newState;
    });
  };

  const handleUserInfoChange = (field: keyof UserInfo, value: string) => {
    setState((prev) => ({
      ...prev,
      userInfo: { ...prev.userInfo, [field]: value },
    }));
  };

  const handleNext = () => {
    setState((prev) => ({
      ...prev,
      currentEtapa: prev.currentEtapa + 1,
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const respostas = Object.entries(state.formData).map(([id, valor]) => ({
        perguntaId: id,
        valor,
      }));

      const response = await submitForm({
        formularioId: form.id,
        respostas,
        nome: state.userInfo.nome,
        email: state.userInfo.email,
      });

      setState((prev) => ({
        ...prev,
        showSuccess: true,
        resultados: response.resultados,
      }));
    } catch (err) {
      setError("Ocorreu um erro ao enviar o formulário. Tente novamente.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleViewResults = () => {
    setState((prev) => ({ ...prev, showResults: true }));
  };

  const handleReset = () => {
    setState({
      formData: {},
      userInfo: {
        nome: "",
        email: "",
      },
      currentEtapa: 0,
      showSuccess: false,
      showResults: false,
      resultados: null,
    });
  };

  return {
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
  };
};