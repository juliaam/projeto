import React, { ChangeEvent, useEffect, useState } from "react";
import { IconButton } from "../../IconButton/IconButton.tsx";
import { Input } from "../../Input/Input.tsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Pencil, Plus, XIcon } from "lucide-react";
import type { Car } from "../../../types/Car.ts";
import "./CarList.css";

type CarListProps = {
  cars: Car[];
};

const format = (value: string): string => value.toLowerCase().trim();

export function CarList({ cars }: CarListProps) {
  const [inputValue, setInputValue] = useState("");
  const [allCars, setAllCars] = useState<Car[]>(cars);
  const navigate = useNavigate();
  const location = useLocation();

  const { formData } = location.state || {};

  const handleChangeAllCars = () => {
    const { formData } = location.state || {};

    const carToEdit = allCars.some((car) => car.id === formData.id);

    if (carToEdit) {
      const allCarsUpdated = allCars.map((car) => {
        if (car.id === formData.id) {
          return formData;
        }
        return car;
      });
      setAllCars(allCarsUpdated);
      return;
    }
    setAllCars([...allCars, formData]);
  };

  useEffect(() => {
    if (formData) {
      handleChangeAllCars();
    }
  }, []);

  const goToCarForm = () => {
    navigate("/carro/formulario");
  };

  const editCar = (car: Car) => {
    navigate(`/carro/formulario`, { state: { car } });
  };

  const removeCar = (id: string) => {
    const updatedCars = allCars.filter((car) => car.id !== id);
    setAllCars(updatedCars);
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
