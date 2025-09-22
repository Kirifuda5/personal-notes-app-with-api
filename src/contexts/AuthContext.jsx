import React from "react";
import * as api from "../utils/network-data";

const AuthStateContext = React.createContext(null);
const AuthActionsContext = React.createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);
  const [booting, setBooting] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      try {
        if (api.getAccessToken()) {
          const u = await api.getUserLogged();
          setUser(u);
        }
      } catch {
        api.logout();
        setUser(null);
      } finally {
        setBooting(false);
      }
    })();
  }, []);

  const actions = React.useMemo(
    () => ({
      async login(email, password) {
        await api.login({ email, password });
        const u = await api.getUserLogged();
        setUser(u);
      },
      async register(name, email, password) {
        await api.register({ name, email, password });
      },
      logout() {
        api.logout();
        setUser(null);
      },
    }),
    []
  );

  return (
    <AuthStateContext.Provider value={{ user, booting }}>
      <AuthActionsContext.Provider value={actions}>
        {children}
      </AuthActionsContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuth() {
  const ctx = React.useContext(AuthStateContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
export function useAuthActions() {
  const ctx = React.useContext(AuthActionsContext);
  if (!ctx)
    throw new Error("useAuthActions must be used inside <AuthProvider>");
  return ctx;
}
