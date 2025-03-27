interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  corTexto: string;
  corPrincipal: string;
}

export const StepIndicator = ({
  currentStep,
  totalSteps,
  corTexto,
  corPrincipal,
}: StepIndicatorProps) => {
  return (
    <div
      className="font-inconsolata text-[18px] leading-[26px] font-bold w-full"
      style={{
        color: corTexto,
      }}
    >
      ETAPA <span style={{ color: corPrincipal }}>{currentStep}</span> / {totalSteps}
    </div>
  );
};
