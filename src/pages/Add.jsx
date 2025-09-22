import React from "react";
import { useNavigate } from "react-router-dom";
import { addNote } from "../utils";
import TitleCounter from "../components/form/TitleCounter.jsx";
import TitleInput from "../components/form/TitleInput.jsx";
import Editor from "../components/form/Editor.jsx";
import FormActions from "../components/form/FormActions.jsx";
import AuthGate from "../components/AuthGate.jsx";
import { useLocale } from "../contexts/LocaleContext.jsx";

export default function Add() {
  return (
    <AuthGate>
      <AddInner />
    </AuthGate>
  );
}

function AddInner() {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState("");
  const [body, setBody] = React.useState("");
  const limit = 50;
  const counterId = "title-remaining";

  const { locale } = useLocale();
  const pageTitle = locale === "id" ? "Tambah Catatan" : "Add Note";
  const genericErr =
    locale === "id" ? "Terjadi kesalahan" : "Something went wrong";

  async function onSubmit(e) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    try {
      await addNote({ title: title.trim(), body });
      navigate("/");
    } catch (e) {
      alert(e.message || genericErr);
    }
  }

  return (
    <section className="section">
      <div className="page-head">
        <h1 className="page-head__title">{pageTitle}</h1>
      </div>

      <form className="form" onSubmit={onSubmit}>
        <div className="form__row">
          <div className="form__head">
            <TitleCounter id={counterId} length={title.length} limit={limit} />
          </div>
          <TitleInput
            value={title}
            onChange={setTitle}
            limit={limit}
            describedBy={counterId}
          />
        </div>

        <Editor value={body} onInput={setBody} />
        <FormActions />
      </form>
    </section>
  );
}
