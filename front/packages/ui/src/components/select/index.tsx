import { ChangeEvent, SelectHTMLAttributes } from "react";

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export const Select = ({ options, value, onChange, ...props }: SelectProps) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <select
      {...props}
      value={value}
      onChange={handleChange}
      className="w-full bg-[#141414] text-white px-4 py-2 rounded border border-[#2A2A2A] focus:outline-none focus:border-[#3A3A3A]"
    >
      <option value="">Selecione uma opção</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};
