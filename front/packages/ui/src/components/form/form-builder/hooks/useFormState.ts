import { useState } from "react";
import { api } from "@front/api";
import { Form, FormState, UserInfo } from "../types";

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
    setState((prev) => ({
      ...prev,
      formData: { ...prev.formData, [id]: value },
    }));
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

  const handlePrevious = () => {
    setState((prev) => ({
      ...prev,
      currentEtapa: prev.currentEtapa > 1 ? prev.currentEtapa - 1 : 0,
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

      const response = await api.post(`/api/envio/respostas`, {
        formularioId: form.id,
        nome: state.userInfo.nome,
        email: state.userInfo.email,
        respostas,
      });

      setState((prev) => ({
        ...prev,
        showSuccess: true,
        resultados: response.data.resultados,
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
      userInfo: { nome: "", email: "" },
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
    handlePrevious,
    handleSubmit,
    handleViewResults,
    handleReset,
  };
};
