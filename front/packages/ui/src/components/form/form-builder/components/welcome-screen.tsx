import { Form } from "../types";
import { Button } from "../../../button";

interface WelcomeScreenProps {
  form: Form;
  onStart: () => void;
}

export const WelcomeScreen = ({ form, onStart }: WelcomeScreenProps) => {
  return (
    <div>
      <h1
        className="text-4xl font-bold font-montserrat"
        style={{ color: form.corPrincipal, textShadow: `0 0 8px ${form.corPrincipal}` }}
      >
        {form.titulo}
      </h1>
      <p
        className="text-lg font-inconsolata mt-[16px] whitespace-pre-line"
        style={{ color: form.corTexto }}
      >
        {form.descricao.replace(/<br\s*\/?>/gi, "\n")}
      </p>
      <Button
        className="mt-[62px]"
        onClick={onStart}
        corPrincipal={form.corPrincipal}
      >
        Iniciar quiz
      </Button>
    </div>
  );
};
