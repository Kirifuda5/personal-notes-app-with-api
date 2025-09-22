import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import SearchBar from "../components/SearchBar.jsx";
import NoteList from "../components/NoteList.jsx";
import Loading from "../components/Loading.jsx";
import AuthGate from "../components/AuthGate.jsx";
import {
  getArchivedNotes,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils";
import { useLocale } from "../contexts/LocaleContext.jsx";

function ArchiveInner() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState("");

  const { locale } = useLocale();
  const L =
    locale === "id"
      ? {
          title: "Arsip",
          empty: "Tidak ada arsip catatan",
          loadErr: "Gagal memuat arsip",
          delErr: "Gagal menghapus",
          arcErr: "Gagal mengarsipkan",
          unarcErr: "Gagal mengaktifkan",
        }
      : {
          title: "Archived",
          empty: "No archived notes",
          loadErr: "Failed to load archives",
          delErr: "Failed to delete",
          arcErr: "Failed to archive",
          unarcErr: "Failed to unarchive",
        };

  React.useEffect(() => {
    let alive = true;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const data = await getArchivedNotes();
        if (alive) setNotes(data);
      } catch (e) {
        if (alive) setError(e.message || L.loadErr);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => {
      alive = false;
    };
  }, []);

  const onSearchChange = (kw) => setSearchParams(kw ? { keyword: kw } : {});

  const visibleNotes = React.useMemo(() => {
    if (!keyword) return notes;
    const q = keyword.toLowerCase();
    return notes.filter((n) => n.title.toLowerCase().includes(q));
  }, [notes, keyword]);

  async function onDelete(id) {
    const snapshot = notes;
    setNotes((prev) => prev.filter((n) => n.id !== id));
    try {
      await deleteNote(id);
    } catch (e) {
      setNotes(snapshot);
      alert(e.message || L.delErr);
    }
  }

  async function onArchive(id) {
    const snapshot = notes;
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: true } : n))
    );
    try {
      await archiveNote(id);
    } catch (e) {
      setNotes(snapshot);
      alert(e.message || L.arcErr);
    }
  }

  async function onUnarchive(id) {
    const snapshot = notes;
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, archived: false } : n))
    );
    try {
      await unarchiveNote(id);
      navigate("/");
    } catch (e) {
      setNotes(snapshot);
      alert(e.message || L.unarcErr);
    }
  }

  return (
    <section className="section">
      <div className="page-head">
        <h1 className="page-head__title">{L.title}</h1>
        <div className="page-head__actions">
          <SearchBar keyword={keyword} keywordChange={onSearchChange} />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : error ? (
        <div className="empty" role="alert">
          {error}
        </div>
      ) : (
        <NoteList
          notes={visibleNotes}
          onDelete={onDelete}
          onArchive={onArchive}
          onUnarchive={onUnarchive}
          emptyMessage={L.empty}
        />
      )}
    </section>
  );
}

export default function Archive() {
  return (
    <AuthGate>
      <ArchiveInner />
    </AuthGate>
  );
}
