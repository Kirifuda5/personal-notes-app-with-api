import React from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import StatusPage from "./StatusPage.jsx";
import { useLocale } from "../../contexts/LocaleContext.jsx";

export default function NotFoundStatus() {
  const { locale } = useLocale();

  const L =
    locale === "id"
      ? {
          title: "Halaman tidak ditemukan",
          desc: "Maaf, halaman yang kamu cari tidak tersedia. Periksa kembali URL atau gunakan tombol di bawah untuk kembali ke beranda.",
          home: "Kembali ke beranda",
        }
      : {
          title: "Page not found",
          desc: "Sorry, the page you're looking for doesn't exist. Check the URL or use the button below to go back home.",
          home: "Back to home",
        };

  return (
    <StatusPage
      code="404"
      title={L.title}
      description={L.desc}
      actions={
        <>
          <Link to="/" className="btn btn--primary">
            <FiHome className="btn__icon" />
            <span>{L.home}</span>
          </Link>
        </>
      }
    />
  );
}
