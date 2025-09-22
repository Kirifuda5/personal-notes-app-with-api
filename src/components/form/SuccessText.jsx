import React from "react";

export default function SuccessText({ message }) {
  if (!message) return null;
  return (
    <p
      className="small"
      style={{ color: "#059669" }}
      role="status"
      aria-live="polite"
    >
      {message}
    </p>
  );
}
