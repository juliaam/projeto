import React, { ChangeEvent, useState } from "react";
import { IconButton } from "../../IconButton/IconButton.tsx";
import { Input } from "../../Input/Input.tsx";
import { useNavigate } from "react-router-dom";
import { Pencil, Plus, XIcon } from "lucide-react";
import type { Car } from "../../../types/Car.ts";
import useCarsStore from "../../../stores/cars.ts";

type CarListProps = {
  cars: Car[];
  reload: any;
};

const format = (value: string): string => value.toLowerCase().trim();

export function CarList({ cars, reload }: CarListProps) {
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
    reload();
    alert("Carro removido com sucesso");
  };

  const filteredCars = cars.filter((car) => {
    return Object.values(car).some((value) =>
      format(String(value)).includes(format(inputValue))
    );
  });

  const renderTable = () => {
    return (
      <table className="w-full border border-gray-300 table-fixed">
        <thead>
          <tr>
            <th className="border border-black bg-red-500 text-black p-1">
              id
            </th>
            <th className="border border-black bg-red-500 text-black p-1">
              Nome
            </th>
            <th className="border border-black bg-red-500 text-black p-1">
              Cor
            </th>
            <th className="border border-black bg-red-500 text-black p-1">
              Ano
            </th>
            <th className="border border-black bg-red-500 text-black p-1">
              Marca
            </th>
            <th className="border border-black bg-red-500 text-black p-1">
              Ação
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredCars.map((car) => {
            return (
              <tr key={car.id}>
                <td className="border border-black bg-white text-black p-1">
                  {car.id}
                </td>
                <td className="border border-black bg-white text-black p-1">
                  {car.name}
                </td>
                <td className="border border-black bg-white text-black p-1">
                  {car.color}
                </td>
                <td className="border border-black bg-white text-black p-1">
                  {car.year}
                </td>
                <td className="border border-black bg-white text-black p-1">
                  {car.brand}
                </td>
                <td className="border border-black bg-white text-black p-1 flex justify-center gap-8">
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
    <div className="overflow-auto w-full" role="region">
      <div className="flex justify-between items-center">
        <h3 className="max-w-[10%]">Carros</h3>
        <div className="flex gap-8">
          <Input
            placeholder="Busque por carros..."
            type="text"
            onChange={search}
            value={inputValue}
          />
          <IconButton onClick={goToCarForm}>
            <div className="flex items-center">
              <Plus />
              <span>Adicionar carro</span>
            </div>
          </IconButton>
        </div>
      </div>
      {cars.length ? renderTable() : renderNotFound()}
    </div>
  );
}
