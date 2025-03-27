interface QuestionLabelProps {
  text: string;
  corTexto: string;
  corPrincipal: string;
}

export const QuestionLabel = ({
  text,
  corTexto,
  corPrincipal,
}: QuestionLabelProps) => {
  const processLabelText = (text: string) => {
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
    <label
      className="block text-[18px] font-regular leading-[26px] font-inconsolata mt-[16px] mb-[16px]"
      style={{
        color: corTexto,
      }}
    >
      {processLabelText(text)}
    </label>
  );
};
