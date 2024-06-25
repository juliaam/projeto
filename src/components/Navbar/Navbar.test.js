import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect, describe, it } from '@jest/globals';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

import { Navbar } from './Navbar';

describe('Navbar Component', () => {
  it('renders Navbar with links', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const carrosLink = screen.getByText('Carros');
    const adicionarCarroLink = screen.getByText('Adicionar carro');

    expect(carrosLink).toBeInTheDocument();
    expect(adicionarCarroLink).toBeInTheDocument();
  });

  it('checks if links have correct destinations', () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const carrosLink = screen.getByText('Carros');
    const adicionarCarroLink = screen.getByText('Adicionar carro');

    expect(carrosLink).toHaveAttribute('href', '/');
    expect(adicionarCarroLink).toHaveAttribute('href', '/carro/formulario');
  });
});
