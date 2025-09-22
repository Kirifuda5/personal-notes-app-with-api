import React from "react";
import { useAuth } from "../contexts/AuthContext.jsx";
import FloatingAddButton from "./FloatingAddButton.jsx";

export default function AuthedFAB() {
  const { user } = useAuth();
  if (!user) return null;
  return <FloatingAddButton />;
}
