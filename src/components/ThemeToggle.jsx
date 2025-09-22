import React from "react";
import { useLocale } from "../contexts/LocaleContext.jsx";

function ThemeToggle({ theme, onToggle }) {
  const { locale } = useLocale();

  const L =
    locale === "id"
      ? {
          toLight: "Ganti ke mode terang",
          toDark: "Ganti ke mode gelap",
        }
      : {
          toLight: "Switch to light mode",
          toDark: "Switch to dark mode",
        };

  const label = theme === "dark" ? L.toLight : L.toDark;

  return (
    <button
      className="toggle"
      aria-label={label}
      onClick={onToggle}
      title={label}
    >
      {theme === "dark" ? (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21.64 13a1 1 0 0 0-1.05-.14 8 8 0 1 1-9.45-9.45 1 1 0 0 0 .14-1.05A10 10 0 1 0 21.64 13z" />
        </svg>
      ) : (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="5"></circle>
          <g stroke="currentColor" strokeWidth="2">
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </g>
        </svg>
      )}
    </button>
  );
}
export default ThemeToggle;
