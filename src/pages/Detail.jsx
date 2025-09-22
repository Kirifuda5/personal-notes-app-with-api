import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import parser from "html-react-parser";
import { getNote, deleteNote, archiveNote, unarchiveNote } from "../utils";
import { FiTrash2, FiArchive, FiInbox } from "react-icons/fi";
import AuthGate from "../components/AuthGate.jsx";
import { useLocale } from "../contexts/LocaleContext.jsx";
import { formatDateByLocale } from "../utils/date.js";

export default function Detail() {
  return (
    <AuthGate>
      <DetailInner />
    </AuthGate>
  );
}

function DetailInner() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const { locale } = useLocale();
  const L =
    locale === "id"
      ? {
          notFound: "Catatan tidak ditemukan.",
          confirmDel: "Hapus catatan ini?",
          delErr: "Gagal menghapus",
          arc: "Arsip",
          unarc: "Batal Arsip",
          arcErr: "Gagal mengarsipkan",
          unarcErr: "Gagal batal arsip",
          delete: "Hapus",
          loading: "Memuat…",
        }
      : {
          notFound: "Note not found.",
          confirmDel: "Delete this note?",
          delErr: "Failed to delete",
          arc: "Archive",
          unarc: "Unarchive",
          arcErr: "Failed to archive",
          unarcErr: "Failed to unarchive",
          delete: "Delete",
          loading: "Loading…",
        };

  React.useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getNote(id);
        if (alive) setNote(data);
      } catch (e) {
        if (alive) setError(e.message || L.notFound);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, [id]);

  function handleDelete() {
    if (!confirm(L.confirmDel)) return;
    deleteNote(id)
      .then(() => navigate("/"))
      .catch((e) => alert(e.message || L.delErr));
  }
  function handleArchive() {
    archiveNote(id)
      .then(() => setNote((n) => ({ ...n, archived: true })))
      .catch((e) => alert(e.message || L.arcErr));
  }
  function handleUnarchive() {
    unarchiveNote(id)
      .then(() => setNote((n) => ({ ...n, archived: false })))
      .catch((e) => alert(e.message || L.unarcErr));
  }

  if (loading) return <p className="muted">{L.loading}</p>;
  if (error || !note) return <p className="muted">{error || L.notFound}</p>;

  return (
    <article className="panel">
      <header className="detail__header">
        <div>
          <h1 className="detail__title">{note.title}</h1>
          <div className="meta">
            <span>{formatDateByLocale(note.createdAt, locale)}</span>
          </div>
        </div>
        <div className="detail__actions">
          {note.archived ? (
            <button
              className="btn btn--primary btn--sm"
              onClick={handleUnarchive}
            >
              <FiInbox className="btn__icon" />
              <span>{L.unarc}</span>
            </button>
          ) : (
            <button
              className="btn btn--archive btn--sm"
              onClick={handleArchive}
            >
              <FiArchive className="btn__icon" />
              <span>{L.arc}</span>
            </button>
          )}
          <button className="btn btn--danger btn--sm" onClick={handleDelete}>
            <FiTrash2 className="btn__icon" />
            <span>{L.delete}</span>
          </button>
        </div>
      </header>
      <div className="detail__body">{parser(note.body)}</div>
    </article>
  );
}
