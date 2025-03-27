import { Form } from "../types";
import { Button } from "../../../button";
import { ResultadoGrafico } from "../../../resultado-grafico";

interface SuccessScreenProps {
  form: Form;
  showResults: boolean;
  resultados: {
    acertos: number;
    erros: number;
    vazios: number;
  } | null;
  onViewResults: () => void;
  onReset: () => void;
}

export const SuccessScreen = ({
  form,
  showResults,
  resultados,
  onViewResults,
  onReset,
}: SuccessScreenProps) => {
  if (showResults) {
    return (
      <div className="text-center">
        {resultados && (
          <ResultadoGrafico
            acertos={resultados.acertos}
            erros={resultados.erros}
            vazios={resultados.vazios}
            corPrincipal={form.corPrincipal}
            corTexto={form.corTexto}
          />
        )}
        <Button
          className="mt-[62px]"
          onClick={onReset}
          corPrincipal={form.corPrincipal}
        >
          Iniciar novamente
        </Button>
      </div>
    );
  }

  return (
    <div>
      <h2
        className="text-4xl font-bold font-montserrat"
        style={{ color: form.corPrincipal, textShadow: `0 0 8px ${form.corPrincipal}` }}
      >
        {form.tituloFinal || "Obrigado por participar!"}
      </h2>
      <p
        className="text-lg font-inconsolata mt-[16px] whitespace-pre-line"
        style={{ color: form.corTexto }}
      >
        {form.descricaoFinal?.replace(/<br\s*\/?>/gi, "\n")}
      </p>
      <Button
        className="mt-[62px]"
        onClick={onViewResults}
        corPrincipal={form.corPrincipal}
      >
        Ver resultados
      </Button>
    </div>
  );
};
