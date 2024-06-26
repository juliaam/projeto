import React from 'react';

export function IconButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return (
    <button
      className="py-2 px-1 border border-black rounded-md cursor-pointer"
      {...props}
    ></button>
  );
}
