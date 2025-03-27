import { Form } from "../../../types/form";
import { UserInfo } from "../../../state/formState.types";
import { Input } from "@/shared/components/Input";
import { Button } from "@/shared/components/Button";

interface UserInfoScreenProps {
  form: Form;
  userInfo: UserInfo;
  onUserInfoChange: (field: keyof UserInfo, value: string) => void;
  onSubmit: () => void;
  submitting: boolean;
  error: string | null;
}

export const UserInfoScreen = ({
  form,
  userInfo,
  onUserInfoChange,
  onSubmit,
  submitting,
  error,
}: UserInfoScreenProps) => {
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isEmailValid = userInfo.email ? isValidEmail(userInfo.email) : true;

  return (
    <>
      <h2
        className="text-4xl font-bold font-montserrat"
        style={{ color: form.corPrincipal, textShadow: `0 0 8px ${form.corPrincipal}` }}
      >
        Deixe seu contato com a gente!
      </h2>

      <div className="flex flex-col gap-4 mt-8">
        <Input
          type="text"
          value={userInfo.nome}
          onChange={(e) => onUserInfoChange("nome", e.target.value)}
          placeholder="Digite seu nome"
        />

        <div>
          <Input
            type="email"
            value={userInfo.email}
            onChange={(e) => onUserInfoChange("email", e.target.value)}
            placeholder="Digite seu e-mail"
          />
          {userInfo.email && !isEmailValid && (
            <p className="text-red-500 mt-2 text-sm">Digite um e-mail válido</p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <div className="flex justify-between pt-6">
        <Button
          onClick={onSubmit}
          corPrincipal={form.corPrincipal}
          disabled={!userInfo.nome || !userInfo.email || !isEmailValid || submitting}
        >
          {submitting ? "Enviando..." : "Finalizar"}
        </Button>
      </div>
    </>
  );
};
