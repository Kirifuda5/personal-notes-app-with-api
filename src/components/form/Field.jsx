import React from "react";

export default function Field({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  autoComplete,
}) {
  return (
    <div>
      <label className="small" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="input"
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={autoComplete}
      />
    </div>
  );
}
