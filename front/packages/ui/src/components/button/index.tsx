import React from "react";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  corPrincipal?: string;
}

const getContrastColor = (hexColor: string): string => {
  // Remove o # se existir
  const hex = hexColor.replace("#", "");
  
  // Converte para RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  
  // Calcula a luminância
  // Fórmula: https://www.w3.org/TR/WCAG20/#relativeluminancedef
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Retorna branco para cores escuras e preto para cores claras
  return luminance > 0.5 ? "#000000" : "#FFFFFF";
};

export const Button: React.FC<ButtonProps> = ({ 
  className = "",
  corPrincipal = "#FFFF00", // Cor amarela padrão
  children,
  disabled,
  ...props 
}) => {
  const baseClasses =
    "px-4 py-2 transition-colors flex items-center gap-2  text-[16px] leading-[24px]";
  const variantClasses = {
    primary: "bg-[#FFFF00] text-black hover:bg-[#DDDD00]",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
  };
  
  const textColor = getContrastColor(corPrincipal);

  return (
    <button
      className={`${baseClasses} ${variantClasses.primary} ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
      style={{
        backgroundColor: corPrincipal,
        color: textColor
      }}
      disabled={disabled}
      {...props}
    >
      {children}
      {children && (
        <img 
          src="/assets/images/icons/arrow-right.svg" 
          className="[filter:brightness(0)]"
          width={24}
          height={24}
        />
      )}
    </button>
  );
};
