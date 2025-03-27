import { Listbox, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";

interface Option {
  label: string;
  value: number;
}

export const SelectCustom = ({
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção",
  corTexto = "#FFFFFF",
  corPrincipal = "#FFFF00",
}: {
  value: number | null;
  onChange: (value: number) => void;
  options: Option[];
  placeholder?: string;
  corTexto?: string;
  corPrincipal?: string;
}) => {
  const [internalValue, setInternalValue] = useState<number | null>(value);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (newValue: number) => {
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <Listbox value={internalValue} onChange={handleChange}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button
            className="
            w-full bg-white/[0.08] text-white px-[16px] py-[16px]
            appearance-none
            font-regular font-inconsolata text-[16px] leading-[24px]
            relative
          "
          >
            <span 
              className="block text-left truncate"
              style={{
                color: internalValue === null ? corTexto : corPrincipal,
              }}
            >
              {internalValue === null
                ? placeholder
                : options.find((o) => o.value === internalValue)?.label}
            </span>
            <img
              src="/assets/images/icons/arrow-down-fill.svg"
              alt="Seta"
              className={`
                pointer-events-none
                absolute right-3 top-1/2 -translate-y-1/2 w-[24px] h-[24px]
                transition-transform duration-300
                ${open ? "rotate-180" : ""}
              `}
            />
          </Listbox.Button>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="transform opacity-0 -translate-y-2"
            enterTo="transform opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="transform opacity-100 translate-y-0"
            leaveTo="transform opacity-0 -translate-y-2"
          >
            <Listbox.Options
              className="
                absolute w-full z-50
                overflow-hidden
                origin-top
                mt-[16px]
                space-y-[16px]
                bg-[#141414]
                rounded-md
                border border-[#2A2A2A]
              "
            >
              {options.map((option) => (
                <Listbox.Option
                  key={option.value}
                  value={option.value}
                  className={({ active }) =>
                    `relative cursor-pointer select-none ${
                      active ? "bg-white/[0.16]" : "bg-white/[0.08]"
                    }
                    w-full text-white px-[16px] py-[16px]
                    font-regular font-inconsolata text-[16px] leading-[24px]
                    `
                  }
                >
                  {({ selected }) => (
                    <span 
                      className={selected ? "font-medium" : ""}
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
