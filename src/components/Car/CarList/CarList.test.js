/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { jest, it, describe, expect } from '@jest/globals';
import { CarList } from './CarList.tsx';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

const mockCars = [
  { id: 1, name: 'Carro A', color: 'Azul', year: 2022, brand: 'Marca A' },
  { id: 2, name: 'Carro B', color: 'Vermelho', year: 2020, brand: 'Marca B' },
];

describe('CarList', () => {
  it('renders car list correctly', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<CarList cars={mockCars} reload={jest.fn()} />);

    expect(screen.getByText('Carros')).toBeInTheDocument();
    expect(screen.getByText('Carro A')).toBeInTheDocument();
    expect(screen.getByText('Carro B')).toBeInTheDocument();
  });

  it('filters cars correctly', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<CarList cars={mockCars} reload={jest.fn()} />);

    const searchInput = screen.getByPlaceholderText('Busque por carros...');
    fireEvent.change(searchInput, { target: { value: 'Carro A' } });

    expect(screen.getByText('Carro A')).toBeInTheDocument();
    expect(screen.queryByText('Carro B')).not.toBeInTheDocument();
  });

  it('calls deleteCar function when delete button is clicked', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const deleteCarMock = jest.fn();
    jest.spyOn(require('../../../stores/cars.ts'), 'default').mockReturnValue({
      deleteCar: deleteCarMock,
    });

    render(<CarList cars={mockCars} reload={jest.fn()} />);

    const deleteButton = screen.getByLabelText('remover-carro-1');
    fireEvent.click(deleteButton);

    expect(deleteCarMock).toHaveBeenCalledWith(1);
  });

  it('navigates to car form page when add car button is clicked', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    const navigateMock = jest.fn();
    jest
      .spyOn(require('react-router-dom'), 'useNavigate')
      .mockReturnValue(navigateMock);

    render(<CarList cars={mockCars} reload={jest.fn()} />);

    const addButton = screen.getByText('Adicionar carro');
    fireEvent.click(addButton);

    expect(navigateMock).toHaveBeenCalledWith('/carro/formulario');
  });
});
