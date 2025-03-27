import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const Input = ({ ...props }: InputProps) => {
  return (
    <input
      {...props}
      className="w-full bg-[#141414] text-white font-inconsolata font-regular text-[16px] leading-[24px] p-[16px] border-[#2A2A2A] focus:outline-none focus:border-[#3A3A3A]"
    />
  );
};
