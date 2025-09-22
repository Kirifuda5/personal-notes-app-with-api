import React from "react";
import { useLocale } from "../contexts/LocaleContext.jsx";

export default function LocaleToggle() {
  const { locale, toggleLocale } = useLocale();
  const label = locale === "id" ? "Ubah bahasa" : "Toggle language";

  return (
    <button
      className="btn btn--ghost btn--sm locale-toggle"
      type="button"
      onClick={toggleLocale}
      aria-label={label}
      title={label}
    >
      {locale === "id" ? "ID" : "EN"}
    </button>
  );
}
