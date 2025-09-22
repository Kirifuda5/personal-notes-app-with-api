import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthActions } from "../contexts/AuthContext.jsx";
import { useLocale } from "../contexts/LocaleContext.jsx";
import useInput from "../hooks/useInput.js";

import AuthHeader from "../components/auth/AuthHeader.jsx";
import AuthCTA from "../components/auth/AuthCTA.jsx";
import Field from "../components/form/Field.jsx";
import ErrorText from "../components/form/ErrorText.jsx";
import SuccessText from "../components/form/SuccessText.jsx";
import SubmitButton from "../components/form/SubmitButton.jsx";

export default function RegisterPage() {
  const { register } = useAuthActions();
  const navigate = useNavigate();

  const [name, onNameChange] = useInput("");
  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");
  const [confirm, onConfirmChange] = useInput("");

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");
  const [ok, setOk] = React.useState("");

  const { locale } = useLocale();
  const L =
    locale === "id"
      ? {
          title: "Registrasi",
          desc: "Buat akun baru untuk menyimpan dan mengelola catatan Anda.",
          name: "Nama",
          email: "Email",
          password: "Password",
          confirm: "Konfirmasi Password",
          emailPh: "nama@contoh.com",
          passPh: "••••••••",
          confirmPh: "Ulangi password",
          reg: "Daftar",
          ok: "Registrasi berhasil. Silakan login.",
          mismatch: "Konfirmasi password tidak cocok",
          fail: "Registrasi gagal",
          ctaLead: "Sudah punya akun? ",
          ctaLink: "Masuk di sini",
          loadingAlt: "Memproses…",
        }
      : {
          title: "Register",
          desc: "Create a new account to save and manage your notes.",
          name: "Name",
          email: "Email",
          password: "Password",
          confirm: "Confirm Password",
          emailPh: "name@example.com",
          passPh: "••••••••",
          confirmPh: "Repeat password",
          reg: "Register",
          ok: "Registration successful. Please login.",
          mismatch: "Password confirmation does not match",
          fail: "Registration failed",
          ctaLead: "Already have an account? ",
          ctaLink: "Login here",
          loadingAlt: "Processing…",
        };

  async function onSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      setError(L.mismatch);
      return;
    }
    setSubmitting(true);
    setError("");
    setOk("");
    try {
      await register(name, email, password);
      setOk(L.ok);
      setTimeout(() => navigate("/login"), 800);
    } catch (e) {
      setError(e.message || L.fail);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section auth">
      <AuthHeader title={L.title} desc={L.desc} descId="register-desc" />

      <form
        className="form"
        onSubmit={onSubmit}
        aria-describedby="register-desc"
      >
        <Field
          id="name"
          label={L.name}
          placeholder="John Doe"
          value={name}
          onChange={onNameChange}
          autoComplete="name"
        />
        <Field
          id="email"
          type="email"
          label={L.email}
          placeholder={L.emailPh}
          value={email}
          onChange={onEmailChange}
          autoComplete="email"
        />
        <Field
          id="password"
          type="password"
          label={L.password}
          placeholder={L.passPh}
          value={password}
          onChange={onPasswordChange}
          autoComplete="new-password"
        />
        <Field
          id="confirm"
          type="password"
          label={L.confirm}
          placeholder={L.confirmPh}
          value={confirm}
          onChange={onConfirmChange}
          autoComplete="new-password"
        />

        <ErrorText message={error} />
        <SuccessText message={ok} />

        <div className="form__actions" style={{ gap: 8 }}>
          <SubmitButton
            label={L.reg}
            loading={submitting}
            loadingAlt={L.loadingAlt}
          />
        </div>
      </form>

      <AuthCTA lead={L.ctaLead} to="/login" linkLabel={L.ctaLink} />
    </section>
  );
}
