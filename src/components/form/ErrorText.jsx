import React from "react";

export default function ErrorText({ message }) {
  if (!message) return null;
  return (
    <p className="small" style={{ color: "#ef4444" }} role="alert">
      {message}
    </p>
  );
}
