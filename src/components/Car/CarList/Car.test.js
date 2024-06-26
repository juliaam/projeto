import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { expect, describe, it, jest } from '@jest/globals';
import '@testing-library/jest-dom';
import { CarList } from './CarList.tsx';

describe('CarList component', () => {
  const mockCars = [
    { id: 1, name: 'Carro 1', color: 'Verde', year: '2020', brand: 'Marca A' },
    { id: 2, name: 'Carro 2', color: 'Azul', year: '2021', brand: 'Marca B' },
  ];

  const reloadMock = jest.fn();

  it('renders table with cars', () => {
    render(
      <MemoryRouter>
        <CarList cars={mockCars} reload={reloadMock} />
      </MemoryRouter>
    );

    const tableElement = screen.getByRole('table');
    expect(tableElement).toBeInTheDocument();

    const carRows = screen.getAllByRole('row', { name: /carro/i });
    expect(carRows).toHaveLength(mockCars.length);
  });

  it("renders 'Não há carros para exibir' when cars is empty", () => {
    render(
      <MemoryRouter>
        <CarList cars={[]} reload={reloadMock} />
      </MemoryRouter>
    );

    const notFoundElement = screen.getByText(/não há carros para exibir/i);
    expect(notFoundElement).toBeInTheDocument();
  });

  it('filters cars based on search input', () => {
    render(
      <MemoryRouter>
        <CarList cars={mockCars} reload={reloadMock} />
      </MemoryRouter>
    );
    const searchInput = screen.getByPlaceholderText('Busque por carros...');
    fireEvent.change(searchInput, { target: { value: 'carro 1' } });

    const carRows = screen.getAllByRole('row', { name: /carro/i });
    expect(carRows).toHaveLength(1);
  });

  // it("navigates to car form on 'Adicionar carro' button click", () => {
  //   render(
  //     <MemoryRouter>
  //       <CarList cars={mockCars} reload={reloadMock} />
  //     </MemoryRouter>
  //   );

  //   const addButton = screen.getByRole('button', { name: /adicionar carro/i });
  //   fireEvent.click(addButton);
  // });

  // it('edits car when edit button is clicked', async () => {
  //   const carToEdit = mockCars[0];

  //   render(
  //     <MemoryRouter initialEntries={['/carro']}>
  //       <Routes>
  //         <Route
  //           path="/carro"
  //           element={<CarList cars={mockCars} reload={jest.fn()} />}
  //         />
  //         <Route path="/carro/formulario" element={<CarForm />} />
  //       </Routes>
  //     </MemoryRouter>
  //   );

  //   const editButton = screen.getByLabelText(`editar-carro-${carToEdit.id}`);
  //   fireEvent.click(editButton);

  //   // expect(navigate).toHaveBeenCalledWith('/carro/formulario', {
  //   //   state: { car: carToEdit },
  //   // });
  // });

  // it('deletes car when delete button is clicked', async () => {
  //   render(
  //     <MemoryRouter>
  //       <CarList cars={mockCars} reload={reloadMock} />
  //     </MemoryRouter>
  //   );
  //   const carToRemove = mockCars[0];
  //   const deleteButton = screen.getByLabelText(
  //     `remover-carro-${carToRemove.id}`
  //   );
  //   fireEvent.click(deleteButton);

  //   expect(carToRemove).not.toBeInTheDocument();
  // });
});
