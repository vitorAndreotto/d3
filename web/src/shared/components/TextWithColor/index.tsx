import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface TextWithColorProps extends HTMLAttributes<HTMLDivElement> {
  text: string;
  corTexto: string;
  corPrincipal: string;
}

export const TextWithColor = ({
  text,
  corTexto,
  corPrincipal,
  className,
  ...props
}: TextWithColorProps) => {
  const processText = (text: string) => {
    const parts = text.split(/(<corTexto[^>]*>.*?<\/corTexto>)/g);

    return parts.map((part, index) => {
      if (part.startsWith("<corTexto")) {
        const content = part.match(/>(.+?)<\/corTexto>/)?.[1] || "";
        const color = part.match(/='([^']+)'/)?.[1];

        return (
          <span
            key={index}
            style={{
              color: color === "principal" ? corPrincipal : corTexto,
            }}
          >
            {content}
          </span>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={twMerge(className)} style={{ color: corTexto }} {...props}>
      {processText(text)}
    </div>
  );
};
