import { Form } from "../../../types/form";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { SelectCustom } from "@/shared/components/CollapseSelect";
import { RadioGroup } from "@/shared/components/RadioGroup";
import { TextArea } from "@/shared/components/TextArea";
import { StepIndicator } from "@/shared/components/StepIndicator";
import { TextWithColor } from "@/shared/components/TextWithColor";

interface QuestionScreenProps {
  form: Form;
  currentEtapa: number;
  formData: Record<string, any>;
  onInputChange: (id: string, value: any) => void;
  onNext: () => void;
}

export const QuestionScreen = ({
  form,
  currentEtapa,
  formData,
  onInputChange,
  onNext,
}: QuestionScreenProps) => {
  console.log("form", form);
  return (
    <>
      <StepIndicator
        currentStep={currentEtapa}
        totalSteps={form.etapas.length}
        corTexto={form.corTexto}
        corPrincipal={form.corPrincipal}
      />

      <div>
        <h2
          className="text-4xl font-bold font-montserrat mt-8"
          style={{ color: form.corPrincipal }}
        >
          {form.etapas[currentEtapa - 1]?.titulo}
        </h2>

        <div className="flex flex-col gap-4 mt-8">
          {form.etapas[currentEtapa - 1]?.perguntas.map((pergunta) => (
            <div key={pergunta.id}>
              <TextWithColor 
                text={pergunta.label}
                corTexto={form.corTexto}
                corPrincipal={form.corPrincipal}
                className="text-[16px] leading-[24px] block mb-4"
              />
              
              {pergunta.tipo === "text" ? (
                <Input
                  type="text"
                  value={formData[pergunta.id] || ""}
                  onChange={(e) => onInputChange(pergunta.id, e.target.value)}
                  placeholder="Digite sua resposta"
                />
              ) : pergunta.tipo === "radio" && pergunta.opcoes ? (
                <RadioGroup
                  options={pergunta.opcoes.map((opcao) => ({
                    label: opcao.label,
                    value: String(opcao.value || "")
                  }))}
                  value={String(formData[pergunta.id] || "")}
                  onChange={(value) => {
                    // Tenta converter para número se possível
                    const numValue = Number(value);
                    onInputChange(pergunta.id, !isNaN(numValue) ? numValue : value);
                  }}
                  name={`pergunta_${pergunta.id}`}
                  corTexto={form.corTexto}
                />
              ) : pergunta.tipo === "select" && pergunta.opcoes ? (
                <div className="mt-4">
                  <SelectCustom
                    value={(formData[pergunta.id] as number) || null}
                    onChange={(value) => onInputChange(pergunta.id, value)}
                    options={pergunta.opcoes.map((opcao) => ({
                      label: opcao.label,
                      value: Number(opcao.value) || 0
                    }))}
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
        </div>

        <div className="flex justify-between pt-6">
          <Button onClick={onNext} corPrincipal={form.corPrincipal}>
            {currentEtapa === form.etapas.length ? "Finalizar" : "Próximo"}
          </Button>
        </div>
      </div>
    </>
  );
};
