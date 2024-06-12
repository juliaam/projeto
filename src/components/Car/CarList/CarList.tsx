import React, { ChangeEvent, useState } from "react";
import { IconButton } from "../../IconButton/IconButton.tsx";
import { Input } from "../../Input/Input.tsx";
import { useNavigate } from "react-router-dom";
import { Pencil, Plus, XIcon } from "lucide-react";
import type { Car } from "../../../types/Car.ts";
import "./CarList.css";
import { useEffect } from "react";

type CarListProps = {
  cars: Car[];
};

const format = (value: string): string => value.toLowerCase().trim();

export function CarList({ cars }: CarListProps) {
  const [inputValue, setInputValue] = useState("");
  const [allCars, setAllCars] = useState<Car[]>([]);
  const navigate = useNavigate();

  // Carrega os carros do localStorage ao inicializar o componente
  useEffect(() => {
    const carsLocalStorage = JSON.parse(localStorage.getItem("cars") as string);
    if (carsLocalStorage) {
      setAllCars(carsLocalStorage);
    } else {
      localStorage.setItem("cars", JSON.stringify(cars));
      setAllCars(cars);
    }
  }, [cars]);

  // Função para atualizar o localStorage e o estado
  const updateCars = (newCars: Car[]) => {
    localStorage.setItem("cars", JSON.stringify(newCars));
    setAllCars(newCars);
  };

  const goToCarForm = () => {
    navigate("/carro/formulario");
  };

  const editCar = (car: Car) => {
    navigate(`/carro/formulario`, { state: { car } });
  };

  const removeCar = (id: string) => {
    const updatedCars = allCars.filter((car) => car.id !== id);
    updateCars(updatedCars);
  };

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    const valueSearch = event.target.value;
    setInputValue(valueSearch);
  };

  const filteredCars = allCars.filter((car) => {
    return Object.values(car).some((value) =>
      format(String(value)).includes(format(inputValue))
    );
  });

  return (
    <div className="table" role="region">
      <div className="table-header">
        <h3 className="table-title">Carros</h3>
        <div className="final-header">
          <Input
            placeholder="Busque por carros..."
            type="text"
            onChange={search}
            value={inputValue}
          />
          <IconButton onClick={goToCarForm}>
            <div className="icon-container">
              <Plus />
              Adicionar carro
            </div>
          </IconButton>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Cor</th>
            <th>Placa</th>
            <th>Ano</th>
            <th>Marca</th>
            <th>Ação</th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map((car) => {
            return (
              <tr key={car.id}>
                <td>{car.id}</td>
                <td>{car.name}</td>
                <td>{car.color}</td>
                <td>{car.licensePlate}</td>
                <td>{car.year}</td>
                <td>{car.brand}</td>
                <td className="actions">
                  <IconButton onClick={() => editCar(car)}>
                    <Pencil />
                  </IconButton>
                  <IconButton onClick={() => removeCar(car.id)}>
                    <XIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
