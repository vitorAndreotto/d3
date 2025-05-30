import React from "react";
import { Button } from "@/shared/components/Button";
import { useRouter } from "next/navigation";

export interface Form {
  id: string;
  rota: string;
  nome: string;
  tipo: string;
}

interface FormCardProps {
  form: Form;
  onAccess?: (formId: string) => void;
}

export const FormCard: React.FC<FormCardProps> = ({ form, onAccess }) => {
  const router = useRouter();

  const getBackgroundImage = () => {
    switch (form.tipo.toLowerCase()) {
      case "educacao":
        return "/assets/images/backgrounds/educacao.svg";
      case "saude":
        return "/assets/images/backgrounds/saude.svg";
      case "tecnologia":
        return "/assets/images/backgrounds/tecnologia.svg";
      case "marketing":
        return "/assets/images/backgrounds/marketing.svg";
      case "financeiro":
        return "/assets/images/backgrounds/financeiro.svg";
      default:
        return "";
    }
  };

  const handleAccess = () => {
    if (onAccess) {
      onAccess(form.rota);
    }
    router.push(`/formulario/${form.rota}`);
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${getBackgroundImage()})`,
          width: "40%",
          left: "60%",
        }}
      />

      {/* Content */}
      <div className="relative h-full border border-[#ffff00] p-6 hover:shadow-lg transition-shadow bg-black/50">
        <h3 className="text-xl font-semibold mb-2 text-white">{form.nome}</h3>
        <div className="mt-4">
          <Button onClick={handleAccess}>Acessar</Button>
        </div>
      </div>
    </div>
  );
};
