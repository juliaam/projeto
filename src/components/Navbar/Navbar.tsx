import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar">
      <nav>
        <ul className="list">
          <li>
            <Link to="/">Carros</Link>
          </li>
          <li>
            <Link to="/carro/formulario">Adicionar carro</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Navbar };
