import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";

export default function BootGate({ children }) {
  const { booting } = useAuth();
  if (booting) return null;
  return children;
}
