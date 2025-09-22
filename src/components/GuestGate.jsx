import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext.jsx";
import Loading from "./Loading.jsx";

export default function GuestGate({ children }) {
  const { user, booting } = useAuth();
  const location = useLocation();

  if (booting) return <Loading />;

  if (user) {
    const to = location.state?.from?.pathname || "/";
    return <Navigate to={to} replace />;
  }

  return children;
}
