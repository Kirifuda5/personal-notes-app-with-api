import React from "react";
import { useLocale } from "../../contexts/LocaleContext.jsx";

export default function TitleInput({
  value,
  onChange,
  limit = 50,
  describedBy = "title-remaining",
}) {
  const { locale } = useLocale();

  const placeholder =
    locale === "id" ? "Masukkan judul catatan..." : "Enter note title...";

  return (
    <input
      id="title-input"
      className="input input--title"
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value.slice(0, limit))}
      aria-describedby={describedBy}
      required
    />
  );
}
