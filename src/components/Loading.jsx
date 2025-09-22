import React from "react";
import Spinner from "./Spinner.jsx";
import { useLocale } from "../contexts/LocaleContext.jsx";

export default function Loading({ label }) {
  const { locale } = useLocale();
  const defaultLabel = locale === "id" ? "Memuat…" : "Loading…";
  const finalLabel = label || defaultLabel;

  return (
    <div className="loading__wrapper">
      <div
        className="loading"
        role="status"
        aria-live="polite"
        aria-busy="true"
      >
        <Spinner />
        <p className="small" style={{ margin: 0 }}>
          {finalLabel}
        </p>
      </div>
    </div>
  );
}
