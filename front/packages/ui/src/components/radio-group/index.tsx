interface Option {
  label: string;
  value: number;
}

interface RadioGroupProps {
  options: Option[];
  value: number | null;
  onChange: (value: number) => void;
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
  return (
    <div className="space-y-[16px]">
      {options.map((opcao) => (
        <label
          key={opcao.value}
          className="flex items-center space-x-[8px] cursor-pointer hover:bg-white/5 p-[16px] rounded bg-white/[0.08]"
        >
          <input
            type="radio"
            name={name}
            value={opcao.value}
            checked={value === opcao.value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="h-[24px] w-[24px] accent-[#3A3A3A] p-5"
          />
          <span style={{ color: corTexto }}>{opcao.label}</span>
        </label>
      ))}
    </div>
  );
};
