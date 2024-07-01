import React from 'react';
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CarForm } from './CarForm';
import { jest, it, describe, expect } from '@jest/globals';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

jest.mock('../../../stores/cars.ts', () => ({
  __esModule: true,
  default: () => ({
    addCar: jest.fn(),
    editCar: jest.fn(),
    cars: [],
  }),
}));

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: MemoryRouter });
};

describe('CarForm', () => {
  it('renders the form with empty fields', () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<CarForm />);

    expect(screen.getByLabelText(/Nome/i)).toHaveValue('');
    expect(screen.getByLabelText(/Cor/i)).toHaveValue('');
    expect(screen.getByLabelText(/Ano/i)).toHaveValue('');
    expect(screen.getByLabelText(/Marca/i)).toHaveValue('');
  });

  it('show an error message if required fields are not filled', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    renderWithRouter(<CarForm />);
    fireEvent.click(screen.getByText(/Confirmar/i));

    await waitFor(() => {
      expect(screen.getByText(/Necessário preencher/i)).toBeInTheDocument();
    });
  });

  it('calls addCar when the form is submitted with valid data', async () => {
    jest.spyOn(window, 'alert').mockImplementation(() => {});
    renderWithRouter(<CarForm />);

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/Nome/i), {
        target: { value: 'Test Car' },
      });
      fireEvent.change(screen.getByLabelText(/Cor/i), {
        target: { value: 'Red' },
      });
      fireEvent.change(screen.getByLabelText(/Ano/i), {
        target: { value: '2022' },
      });
      fireEvent.change(screen.getByLabelText(/Marca/i), {
        target: { value: 'Test Brand' },
      });
    });

    await fireEvent.click(screen.getByRole('button'));

    expect(window.alert).toHaveBeenCalledWith(
      'Seu carro foi criado com sucesso!'
    );
  });

  it('calls editCar when editing an existing car', async () => {
    const editCar = jest.fn();
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    const car = {
      id: 1,
      name: 'Existing Car',
      color: 'Blue',
      year: '2021',
      brand: 'Existing Brand',
    };

    render(
      <MemoryRouter initialEntries={[{ pathname: '/', state: { car } }]}>
        <Routes>
          <Route path="/" element={<CarForm editCar={editCar} />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: 'Updated Car' },
    });
    await fireEvent.click(screen.getByRole('button'));

    expect(window.alert).toHaveBeenCalledWith(
      'Seu carro foi editado com sucesso!'
    );

    jest.restoreAllMocks();
  });
});
