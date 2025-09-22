import React from "react";
import { useLocale } from "../../contexts/LocaleContext.jsx";

export default function TitleCounter({
  length = 0,
  limit = 50,
  id = "title-remaining",
}) {
  const { locale } = useLocale();
  const remainingText =
    locale === "id" ? "Sisa karakter judul" : "Title characters remaining";

  const remain = Math.max(0, limit - length);

  return (
    <div id={id} className="muted" aria-live="polite" aria-atomic="true">
      {remainingText}: <span className="mono">{remain}</span>
    </div>
  );
}
