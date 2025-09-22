import React from "react";
import Spinner from "../Spinner.jsx";

export default function SubmitButton({ label, loading, loadingAlt }) {
  return (
    <button
      className="btn btn--primary"
      disabled={loading}
      aria-busy={loading}
      type="submit"
    >
      {loading ? <Spinner aria-label={loadingAlt} /> : label}
    </button>
  );
}
