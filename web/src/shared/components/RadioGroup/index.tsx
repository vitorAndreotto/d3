interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: Option[];
  value: string | null;
  onChange: (value: string) => void;
  name: string;
  corTexto: string;
}

export const RadioGroup = ({
  options,
  value,
  onChange,
  name,
  corTexto,
}: RadioGroupProps) => {
  console.log("RadioGroup props", { options, value, name });
  
  return (
    <div className="space-y-[16px]">
      {options.map((opcao) => {
        console.log("Comparing", { value, optionValue: opcao.value, isChecked: value === opcao.value });
        return (
          <label
            key={opcao.value}
            className="flex items-center space-x-[8px] cursor-pointer hover:bg-white/5 p-[16px] rounded bg-white/[0.08]"
          >
            <input
              type="radio"
              name={name}
              value={opcao.value}
              checked={value === opcao.value}
              onChange={(e) => {
                console.log("Radio onChange", e.target.value);
                onChange(e.target.value);
              }}
              className="h-[24px] w-[24px] accent-[#3A3A3A] p-5"
            />
            <span style={{ color: corTexto }}>{opcao.label}</span>
          </label>
        );
      })}
    </div>
  );
};
