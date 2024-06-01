import React from "react";
import "./Input.css";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <>
      {label && <label>{label}</label>}
      <div className="input-container">
        <input {...props} className="input" />
      </div>
    </>
  );
}
