import React from "react";
import { FiSave } from "react-icons/fi";
import { useLocale } from "../../contexts/LocaleContext.jsx";

export default function FormActions() {
  const { locale } = useLocale();
  const save = locale === "id" ? "Simpan" : "Save";

  return (
    <div className="form__actions">
      <button type="submit" className="btn btn--primary">
        <FiSave className="btn__icon" />
        <span>{save}</span>
      </button>
    </div>
  );
}
