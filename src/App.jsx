import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Archive from "./pages/Archive.jsx";
import Add from "./pages/Add.jsx";
import Detail from "./pages/Detail.jsx";
import NotFound from "./pages/NotFound.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { LocaleProvider } from "./contexts/LocaleContext.jsx";

import HeaderBar from "./components/HeaderBar.jsx";
import BootGate from "./components/BootGate.jsx";
import GuestGate from "./components/GuestGate.jsx";
import AuthedFAB from "./components/AuthedFAB.jsx";

export default function App() {
  return (
    <ThemeProvider>
      <LocaleProvider>
        <AuthProvider>
          <BootGate>
            <HeaderBar />

            <main className="container">
              <Routes>
                <Route index element={<Home />} />
                <Route path="/archives" element={<Archive />} />
                <Route path="/notes/new" element={<Add />} />
                <Route path="/notes/:id" element={<Detail />} />
                <Route
                  path="/login"
                  element={
                    <GuestGate>
                      <Login />
                    </GuestGate>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <GuestGate>
                      <Register />
                    </GuestGate>
                  }
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            <AuthedFAB />
          </BootGate>
        </AuthProvider>
      </LocaleProvider>
    </ThemeProvider>
  );
}
