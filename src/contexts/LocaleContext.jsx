import React from "react";
const LocaleContext = React.createContext(null);
export function LocaleProvider({ children }) {
  const [locale, setLocale] = React.useState(
    () => localStorage.getItem("locale") || "id"
  );
  const toggleLocale = React.useCallback(() => {
    setLocale((l) => {
      const next = l === "id" ? "en" : "id";
      localStorage.setItem("locale", next);
      return next;
    });
  }, []);
  const value = React.useMemo(
    () => ({ locale, toggleLocale }),
    [locale, toggleLocale]
  );
  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}
export function useLocale() {
  const ctx = React.useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within <LocaleProvider>");
  return ctx;
}
