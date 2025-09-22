import React from "react";
import { Link } from "react-router-dom";

export default function AuthCTA({ lead, to, linkLabel }) {
  return (
    <p className="auth-cta">
      {lead}
      <Link to={to}>{linkLabel}</Link>
    </p>
  );
}
