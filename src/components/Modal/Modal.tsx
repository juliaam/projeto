import React from "react";
import "./Modal.css";

type PropsModal = {
  isOpen: false;
  title: string;
  text: string;
};

export function Modal(props: PropsModal) {
  if (!props.isOpen) return null;
  return <div className="modal">modal de teste</div>;
}
