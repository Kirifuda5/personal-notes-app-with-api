import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuthActions } from "../contexts/AuthContext.jsx";
import { useLocale } from "../contexts/LocaleContext.jsx";
import useInput from "../hooks/useInput.js";

import AuthHeader from "../components/auth/AuthHeader.jsx";
import AuthCTA from "../components/auth/AuthCTA.jsx";
import Field from "../components/form/Field.jsx";
import ErrorText from "../components/form/ErrorText.jsx";
import SubmitButton from "../components/form/SubmitButton.jsx";

export default function LoginPage() {
  const { login } = useAuthActions();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, onEmailChange] = useInput("");
  const [password, onPasswordChange] = useInput("");

  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const { locale } = useLocale();
  const L =
    locale === "id"
      ? {
          title: "Masuk",
          desc: "Masukkan kredensial akun Anda untuk mengakses catatan pribadi.",
          email: "Email",
          password: "Password",
          emailPh: "nama@contoh.com",
          passPh: "••••••••",
          login: "Masuk",
          fail: "Gagal login",
          ctaLead: "Tidak punya akun? ",
          ctaLink: "Daftar di sini",
          loadingAlt: "Memproses…",
        }
      : {
          title: "Login",
          desc: "Enter your credentials to access your personal notes.",
          email: "Email",
          password: "Password",
          emailPh: "name@example.com",
          passPh: "••••••••",
          login: "Login",
          fail: "Login failed",
          ctaLead: "Don't have an account? ",
          ctaLink: "Register here",
          loadingAlt: "Processing…",
        };

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await login(email, password);
      const to = location.state?.from?.pathname || "/";
      navigate(to, { replace: true });
    } catch (e) {
      setError(e.message || L.fail);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section auth">
      <AuthHeader title={L.title} desc={L.desc} descId="login-desc" />
      <form className="form" onSubmit={onSubmit} aria-describedby="login-desc">
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
          autoComplete="current-password"
        />

        <ErrorText message={error} />

        <div className="form__actions" style={{ gap: 8 }}>
          <SubmitButton
            label={L.login}
            loading={submitting}
            loadingAlt={L.loadingAlt}
          />
        </div>
      </form>

      <AuthCTA lead={L.ctaLead} to="/register" linkLabel={L.ctaLink} />
    </section>
  );
}
