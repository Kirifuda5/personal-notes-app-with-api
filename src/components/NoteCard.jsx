import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import parser from "html-react-parser";
import {
  FiTrash2,
  FiArchive,
  FiInbox,
  FiEye,
  FiCalendar,
} from "react-icons/fi";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { formatDateByLocale } from "../utils/date.js";

export default function NoteCard({
  id,
  title,
  body,
  createdAt,
  archived,
  onDelete,
  onArchive,
  onUnarchive,
}) {
  const { locale } = useLocale();
  const L =
    locale === "id"
      ? {
          detail: "Detail",
          delete: "Hapus",
          archive: "Arsipkan",
          unarchive: "Aktifkan",
        }
      : {
          detail: "Detail",
          delete: "Delete",
          archive: "Archive",
          unarchive: "Unarchive",
        };

  return (
    <article className="card">
      <header className="card__header">
        <h3 className="card__title">
          <Link to={`/notes/${id}`}>{title}</Link>
        </h3>
        <div className="card__meta">
          <FiCalendar aria-hidden /> {formatDateByLocale(createdAt, locale)}
        </div>
      </header>
      <div className="card__body">{parser(body)}</div>
      <footer className="card__actions">
        <Link
          className="btn btn--ghost btn--sm"
          to={`/notes/${id}`}
          title={L.detail}
        >
          <FiEye className="btn__icon" />
        </Link>
        {archived ? (
          <button
            className="btn btn--primary btn--sm"
            onClick={() => onUnarchive(id)}
            title={L.unarchive}
          >
            <FiInbox className="btn__icon" />
          </button>
        ) : (
          <button
            className="btn btn--archive btn--sm"
            onClick={() => onArchive(id)}
            title={L.archive}
          >
            <FiArchive className="btn__icon" />
          </button>
        )}
        <button
          className="btn btn--danger btn--sm"
          onClick={() => onDelete(id)}
          title={L.delete}
        >
          <FiTrash2 className="btn__icon" />
        </button>
      </footer>
    </article>
  );
}

NoteCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  onDelete: PropTypes.func.isRequired,
  onArchive: PropTypes.func.isRequired,
  onUnarchive: PropTypes.func.isRequired,
};
