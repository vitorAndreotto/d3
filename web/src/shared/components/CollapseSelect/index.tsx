import { Listbox, Transition } from '@headlessui/react';
import { Fragment, useEffect, useState } from 'react';

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
  placeholder = 'Selecione uma opção',
  corTexto = '#FFFFFF',
  corPrincipal = '#FFFF00',
}: SelectCustomProps) => {
  const [internalValue, setInternalValue] = useState<number | null>(value);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleChange = (newValue: number) => {
    setInternalValue(newValue);
    onChange(newValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === internalValue);

  return (
    <Listbox value={internalValue} onChange={handleChange}>
      {({ open }: { open: boolean }) => {
        if (open !== isOpen) setIsOpen(open);
        return (
          <div className="relative">
            <Listbox.Button
              className="
                w-full bg-white/[0.08] text-white px-4 py-4
                appearance-none
                font-regular font-inconsolata text-[16px] leading-[24px]
                relative
                hover:bg-white/[0.16]
                transition-colors
                group
              "
              style={{ color: internalValue === null ? corTexto : corPrincipal }}
            >
              <span className="block text-left truncate">
                {selectedOption?.label || placeholder}
              </span>
              <img
                src="/assets/images/icons/arrow-down-fill.svg"
                alt="Expandir"
                className={`absolute right-4 top-1/2 -translate-y-1/2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
              />
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
                  w-full mt-[16px]
                  focus:outline-none
                  space-y-[16px]
                "
              >
                {options.map((option) => (
                  <Listbox.Option
                    key={option.value}
                    value={option.value}
                    className={({ active, selected }: { active: boolean; selected: boolean }) => `
                      relative cursor-pointer select-none
                      p-[16px]
                      bg-white/[0.08]
                      ${active ? 'bg-white/[0.16]' : ''}
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
        );
      }}
    </Listbox>
  );
};
