import React, { ChangeEvent, useState } from "react";
import { IconButton } from "../../IconButton/IconButton.tsx";
import { Input } from "../../Input/Input.tsx";
import { useNavigate } from "react-router-dom";
import { Pencil, Plus, XIcon } from "lucide-react";
import type { Car } from "../../../types/Car.ts";
import "./CarList.css";
import useCarsStore from "../../../stores/cars.ts";

type CarListProps = {
  cars: Car[];
  reload: any;
};

const format = (value: string): string => value.toLowerCase().trim();

export function CarList({ cars }: CarListProps) {
  const [inputValue, setInputValue] = useState("");
  const navigate = useNavigate();
  const { deleteCar } = useCarsStore();

  const goToCarForm = () => {
    navigate("/carro/formulario");
  };

  const editCar = (car: Car) => {
    navigate(`/carro/formulario`, { state: { car } });
  };

  const search = (event: ChangeEvent<HTMLInputElement>) => {
    const valueSearch = event.target.value;
    setInputValue(valueSearch);
  };

  const handleDeleteCar = async (id: number) => {
    await deleteCar(id);
    alert("Carro removido com sucesso");
  };

  const filteredCars = cars.filter((car) => {
    return Object.values(car).some((value) =>
      format(String(value)).includes(format(inputValue))
    );
  });

  const renderTable = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Nome</th>
            <th>Cor</th>
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
                <td>{car.year}</td>
                <td>{car.brand}</td>
                <td className="actions">
                  <IconButton onClick={() => editCar(car)}>
                    <Pencil />
                  </IconButton>
                  <IconButton onClick={() => handleDeleteCar(car.id)}>
                    <XIcon />
                  </IconButton>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  };

  const renderNotFound = () => {
    return <p>Não há carros para exibir</p>;
  };

  return (
    <div className="table overflow-auto w-full" role="region">
      <div className="table-header flex justify-between items-center">
        <h3 className="table-title max-w-[10%]">Carros</h3>
        <div className="final-header flex gap-8">
          <Input
            placeholder="Busque por carros..."
            type="text"
            onChange={search}
            value={inputValue}
            className="p-2 border border-gray-300 rounded"
          />
          <IconButton onClick={goToCarForm}>
            <div className="icon-container flex items-center gap-2">
              <Plus />
              Adicionar carro
            </div>
          </IconButton>
        </div>
      </div>
      {cars.length ? renderTable() : renderNotFound()}
    </div>
  );
}
