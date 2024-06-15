import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ label, ...props }: InputProps) {
  return (
    <>
      {label && <label>{label}</label>}
      <div className="mt-1">
        <input
          {...props}
          className="text-2xl p-4 border-2 border-gray-300 rounded-md outline-none transition-colors duration-300 ease-in-out focus:border-gray-800"
        />
      </div>
    </>
  );
}
