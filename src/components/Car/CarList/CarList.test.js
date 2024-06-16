import { render, screen, fireEvent } from '@testing-library/react';
import { CarList } from './CarList';

const mockedCars = [
  { id: 1, name: 'Mustang', brand: 'Ford', color: 'Preto', year: '1970' },
  { id: 2, name: 'Camaro', brand: 'GM', color: 'Amarelo', year: '2010' },
  { id: 3, name: 'Ferrari', brand: 'FIAT', color: 'Vermelho', year: '2000' },
  { id: 4, name: 'Madza', brand: 'Madz', color: 'Cinza', year: '1998' },
  { id: 5, name: 'F350', brand: 'Ford', color: 'Bordo', year: '2000' },
];

describe('CarList Component', () => {
  const mockReload = jest.fn();

  const setup = () => {
    return render(<CarList cars={mockedCars} reload={mockReload} />);
  };

  it('should render the CarList with given cars', () => {
    render();
    expect(screen.getByText(/Corolla/)).toBeInTheDocument();
    expect(screen.getByText(/Civic/)).toBeInTheDocument();
  });

  it('should filter cars based on search input', () => {
    setup();
    fireEvent.change(screen.getByPlaceholderText(/Busque por carros.../), {
      target: { value: 'Corolla' },
    });
    expect(screen.getByText(/Corolla/)).toBeInTheDocument();
    expect(screen.queryByText(/Civic/)).toBeNull();
  });

  it('should display "Não há carros para exibir" when no cars are available', () => {
    render(<CarList cars={[]} reload={mockReload} />);
    expect(screen.getByText(/Não há carros para exibir/)).toBeInTheDocument();
  });

  it('should call reload function when deleteCar is called', async () => {
    setup();
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(mockReload).toHaveBeenCalled();
  });

  it('should navigate to the car form when edit button is clicked', () => {
    setup();
    fireEvent.click(screen.getAllByRole('button')[0]);
  });
});
