import React from "react";

export default function StatusPage({ code, title, description, actions }) {
  return (
    <section className="status" role="document" aria-labelledby="status-title">
      <div className="status__code" aria-hidden="true">
        {code}
      </div>
      <h1 id="status-title" className="status__title">
        {title}
      </h1>
      {description ? <p className="status__desc">{description}</p> : null}
      {actions ? <div className="status__actions">{actions}</div> : null}
    </section>
  );
}
