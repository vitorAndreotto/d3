import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

interface Option {
  label: string;
  value: number;
}

interface SelectCustomProps {
  value: number | null;
  onChange: (value: number) => void;
  options: Option[];
  placeholder?: string;
  corTexto?: string;
  corPrincipal?: string;
}

export const SelectCustom = ({
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  corTexto = "#FFFFFF",
  corPrincipal = "#FFFF00",
}: SelectCustomProps) => {
  const [internalValue, setInternalValue] = useState<number | null>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (newValue: number) => {
    setInternalValue(newValue);
    onChange(newValue);
  };

  const selectedOption = options.find((opt) => opt.value === internalValue);

  return (
    <Listbox value={internalValue} onChange={handleChange}>
      {({ open }: { open: boolean }) => (
        <div className="relative">
          <Listbox.Button
            className="
              w-full bg-white/[0.08] text-white px-4 py-4
              appearance-none
              font-regular font-inconsolata text-[16px] leading-[24px]
              relative
              hover:bg-white/[0.16]
              transition-colors
            "
          >
            <span 
              className="block text-left truncate"
              style={{
                color: internalValue === null ? corTexto : corPrincipal,
              }}
            >
              {selectedOption?.label || placeholder}
            </span>
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className="
                absolute z-10 w-full py-1 mt-1
                bg-black border border-white/[0.08]
                max-h-60 overflow-auto
                focus:outline-none
              "
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active, selected }: { active: boolean; selected: boolean }) => `
                    relative cursor-pointer select-none
                    py-2 pl-4 pr-9
                    ${active ? "bg-white/[0.08]" : ""}
                    ${selected ? "bg-white/[0.16]" : ""}
                  `}
                >
                  {({ selected }: { selected: boolean }) => (
                    <span
                      className="block truncate"
                      style={{
                        color: selected ? corPrincipal : corTexto,
                      }}
                    >
                      {option.label}
                    </span>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
