import { Form, UserInfo } from "../types";
import { Button } from "../../../button";
import { QuestionLabel } from "../../../question-label";
import { Input } from "../../../input";

interface UserInfoScreenProps {
  form: Form;
  userInfo: UserInfo;
  onUserInfoChange: (field: keyof UserInfo, value: string) => void;
  onSubmit: () => void;
  onPrevious: () => void;
  submitting: boolean;
  error: string | null;
}

export const UserInfoScreen = ({
  form,
  userInfo,
  onUserInfoChange,
  onSubmit,
  onPrevious,
  submitting,
  error,
}: UserInfoScreenProps) => {
  return (
    <>
      <h2
        className="text-4xl font-bold font-montserrat"
        style={{ color: form.corPrincipal, textShadow: `0 0 8px ${form.corPrincipal}` }}
      >
        Deixe seu contato com a gente!
      </h2>

      <div className="mb-6">
        <QuestionLabel
          text="Nome"
          corTexto={form.corTexto}
          corPrincipal={form.corPrincipal}
        />
        <Input
          value={userInfo.nome}
          onChange={(e) => onUserInfoChange("nome", e.target.value)}
          placeholder="Digite seu nome"
        />
      </div>

      <div className="mb-6">
        <QuestionLabel
          text="E-mail"
          corTexto={form.corTexto}
          corPrincipal={form.corPrincipal}
        />
        <Input
          type="email"
          value={userInfo.email}
          onChange={(e) => onUserInfoChange("email", e.target.value)}
          placeholder="Digite seu e-mail"
        />
      </div>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <div className="flex justify-between pt-6">
        <Button
          onClick={onPrevious}
          corPrincipal={form.corPrincipal}
          disabled={submitting}
        >
          Voltar
        </Button>
        <Button
          onClick={onSubmit}
          corPrincipal={form.corPrincipal}
          disabled={!userInfo.nome || !userInfo.email || submitting}
        >
          {submitting ? "Enviando..." : "Finalizar"}
        </Button>
      </div>
    </>
  );
};
