import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { useLocale } from "../contexts/LocaleContext.jsx";

export default function FloatingAddButton() {
  const { locale } = useLocale();
  const label = locale === "id" ? "Tambah catatan" : "Add note";
  const { pathname } = useLocation();
  const hide =
    pathname.startsWith("/notes/new") || /^\/notes\/[^/]+$/.test(pathname);

  if (hide) return null;

  return (
    <Link to="/notes/new" aria-label={label} className="fab" title={label}>
      <FiPlus aria-hidden />
    </Link>
  );
}
