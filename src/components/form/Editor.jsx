import React from "react";
import { useLocale } from "../../contexts/LocaleContext.jsx";

export default function Editor({ value, onInput }) {
  const { locale } = useLocale();
  const placeholder =
    locale === "id" ? "Tulis catatan di sini..." : "Write your note here...";

  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && ref.current.innerHTML !== value) {
      ref.current.innerHTML = value || "";
    }
  }, [value]);
  return (
    <div
      ref={ref}
      className="editor"
      data-placeholder={placeholder}
      contentEditable
      onInput={(e) => onInput(e.currentTarget.innerHTML)}
      suppressContentEditableWarning
    />
  );
}
