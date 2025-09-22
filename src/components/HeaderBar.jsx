import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext.jsx";
import { useAuth, useAuthActions } from "../contexts/AuthContext.jsx";
import { useLocale } from "../contexts/LocaleContext.jsx";
import LocaleToggle from "./LocaleToggle.jsx";
import ThemeToggle from "./ThemeToggle.jsx";

export default function HeaderBar() {
  const { theme, toggle } = useTheme();
  const { user } = useAuth();
  const { logout } = useAuthActions();
  const navigate = useNavigate();
  const { locale } = useLocale();

  const L =
    locale === "id"
      ? {
          brand: {
            logo: "C",
            title: "Catatan",
            subtitle: "Aplikasi React Pribadi",
          },
          active: "Aktif",
          archived: "Arsip",
          login: "Masuk",
          register: "Daftar",
          logout: "Keluar",
          userMenu: "Menu pengguna",
        }
      : {
          brand: { logo: "N", title: "Notes", subtitle: "Personal React App" },
          active: "Active",
          archived: "Archived",
          login: "Login",
          register: "Register",
          logout: "Logout",
          userMenu: "User menu",
        };

  const [menuOpen, setMenuOpen] = React.useState(false);
  const wrapperRef = React.useRef(null);
  const buttonRef = React.useRef(null);
  const firstItemRef = React.useRef(null);
  const menuId = "user-menu-popover";

  const closeMenu = React.useCallback(() => {
    setMenuOpen(false);
    buttonRef.current?.focus();
  }, []);

  const onLogout = () => {
    closeMenu();
    logout();
    navigate("/login", { replace: true });
  };

  React.useEffect(() => {
    function onDocPointerDown(e) {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(e.target)) setMenuOpen(false);
    }
    function onDocKeyDown(e) {
      if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      }
    }
    document.addEventListener("pointerdown", onDocPointerDown);
    document.addEventListener("keydown", onDocKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onDocPointerDown);
      document.removeEventListener("keydown", onDocKeyDown);
    };
  }, [closeMenu]);

  React.useEffect(() => {
    if (menuOpen) {
      const t = setTimeout(() => firstItemRef.current?.focus(), 0);
      return () => clearTimeout(t);
    }
  }, [menuOpen]);

  function onUserButtonKeyDown(e) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setMenuOpen(true);
    }
  }

  function onMenuKeyDown(e) {
    if (e.key === "Tab") setMenuOpen(false);
    else if (e.key === "Escape") {
      e.preventDefault();
      closeMenu();
    }
  }

  return (
    <header className="app-header-wrapper container">
      <div className="app-header">
        <div className="brand" aria-label={L.brand.title}>
          <div className="logo" aria-hidden>
            {L.brand.logo}
          </div>
          <div>
            <div>{L.brand.title}</div>
            <small>{L.brand.subtitle}</small>
          </div>
        </div>

        <div className="header-nav-actions">
          {user ? (
            <nav className="nav">
              <NavLink to="/" end>
                {L.active}
              </NavLink>
              <NavLink to="/archives">{L.archived}</NavLink>
            </nav>
          ) : null}

          <div className="actions">
            <LocaleToggle />
            <ThemeToggle theme={theme} onToggle={toggle} />

            {!user ? (
              <>
                <NavLink className="btn btn--ghost btn--sm" to="/login">
                  {L.login}
                </NavLink>
                <NavLink className="btn btn--primary btn--sm" to="/register">
                  {L.register}
                </NavLink>
              </>
            ) : (
              <div ref={wrapperRef} className="user-menu">
                <button
                  ref={buttonRef}
                  className="btn btn--ghost btn--sm"
                  type="button"
                  aria-haspopup="menu"
                  aria-expanded={menuOpen}
                  aria-controls={menuId}
                  aria-label={L.userMenu}
                  title={L.userMenu}
                  onClick={() => setMenuOpen((v) => !v)}
                  onKeyDown={onUserButtonKeyDown}
                >
                  {user.name}
                </button>

                {menuOpen ? (
                  <div
                    id={menuId}
                    className="menu"
                    role="menu"
                    onKeyDown={onMenuKeyDown}
                  >
                    <button
                      ref={firstItemRef}
                      className="menu__item"
                      role="menuitem"
                      onClick={onLogout}
                    >
                      {L.logout}
                    </button>
                  </div>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
