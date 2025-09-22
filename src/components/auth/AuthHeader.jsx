import React from "react";

export default function AuthHeader({ title, desc, descId = "auth-desc" }) {
  return (
    <>
      <div className="page-head">
        <h1 className="page-head__title">{title}</h1>
      </div>
      {desc ? (
        <p id={descId} className="small" style={{ marginTop: 0 }}>
          {desc}
        </p>
      ) : null}
    </>
  );
}
