import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="navbar bg-gray-900 text-white sticky top-0 z-50">
      <nav>
        <ul className="list-none p-2 flex justify-center gap-8">
          <li>
            <Link
              to="/"
              className="text-aliceblue font-medium transition duration-500 ease-in-out hover:text-white no-underline"
            >
              Carros
            </Link>
          </li>
          <li>
            <Link
              to="/carro/formulario"
              className="text-aliceblue font-medium transition duration-500 ease-in-out hover:text-white no-underline"
            >
              Adicionar carro
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Navbar };
