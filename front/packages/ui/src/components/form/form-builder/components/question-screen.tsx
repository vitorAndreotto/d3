import { Form } from "../types";
import { Button } from "../../../button";
import { QuestionLabel } from "../../../question-label";
import { RadioGroup } from "../../../radio-group";
import { SelectCustom } from "../../../collapse-select";
import { TextArea } from "../../../text-area";
import { StepIndicator } from "../../../step-indicator";

interface QuestionScreenProps {
  form: Form;
  currentEtapa: number;
  formData: Record<string, any>;
  onInputChange: (id: string, value: any) => void;
  onNext: () => void;
  onPrevious: () => void;
}

export const QuestionScreen = ({
  form,
  currentEtapa,
  formData,
  onInputChange,
  onNext,
  onPrevious,
}: QuestionScreenProps) => {
  return (
    <>
      <StepIndicator
        currentStep={currentEtapa}
        totalSteps={form.etapas.length}
        corTexto={form.corTexto}
        corPrincipal={form.corPrincipal}
      />

      {form.etapas[currentEtapa - 1]?.perguntas.map((pergunta) => (
        <div key={pergunta.id}>
          <QuestionLabel
            text={pergunta.label}
            corTexto={form.corTexto}
            corPrincipal={form.corPrincipal}
          />

          {pergunta.tipo === "radio" && pergunta.opcoes ? (
            <RadioGroup
              options={pergunta.opcoes}
              value={(formData[pergunta.id] as number) || null}
              onChange={(value) => onInputChange(pergunta.id, value)}
              name={`pergunta_${pergunta.id}`}
              corTexto={form.corTexto}
            />
          ) : pergunta.tipo === "select" && pergunta.opcoes ? (
            <div className="mt-4">
              <SelectCustom
                value={(formData[pergunta.id] as number) || null}
                onChange={(value) => onInputChange(pergunta.id, value)}
                options={pergunta.opcoes}
                corTexto={form.corTexto}
                corPrincipal={form.corPrincipal}
              />
            </div>
          ) : pergunta.tipo === "textarea" ? (
            <TextArea
              value={(formData[pergunta.id] as string) || ""}
              onChange={(value) => onInputChange(pergunta.id, value)}
            />
          ) : null}
        </div>
      ))}

      <div className="flex justify-between pt-6">
        <Button onClick={onPrevious} corPrincipal={form.corPrincipal}>
          Voltar
        </Button>
        <Button onClick={onNext} corPrincipal={form.corPrincipal}>
          Próximo
        </Button>
      </div>
    </>
  );
};
