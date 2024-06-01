import React from "react";

import "./IconButton.css";

export function IconButton(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>
) {
  return <button className="button" {...props}></button>;
}
