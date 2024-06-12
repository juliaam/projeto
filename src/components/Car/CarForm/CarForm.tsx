import React, { useState } from "react";
import { Input } from "../../Input/Input.tsx";
import { IconButton } from "../../IconButton/IconButton.tsx";
import { Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { generateId } from "../../../helpers/generateId.ts";

import "./CarForm.css";

export function CarForm() {
  const location = useLocation();
  const carToEdit = location.state?.car;

  const [formData, setFormData] = useState({
    id: carToEdit?.id || "",
    name: carToEdit?.name || "",
    color: carToEdit?.color || "",
    licensePlate: carToEdit?.licensePlate || "",
    year: carToEdit?.year || "",
    brand: carToEdit?.brand || "",
  });

  const [fieldMissing, setFieldMissing] = useState("");
  const navigate = useNavigate();

  const goToMain = (updatedCars) => {
    navigate("/", { state: { cars: updatedCars } });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isValid = () => {
    let missingField = "";
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== "name" && key !== "id") {
        missingField = key;
      }
    });

    setFieldMissing(missingField);

    return !missingField;
  };

  const handleSubmit = async () => {
    const carsLocalStorage =
      JSON.parse(localStorage.getItem("cars") as string) || [];

    const updatedCars = carToEdit
      ? carsLocalStorage.map((car) => (car.id === formData.id ? formData : car))
      : [...carsLocalStorage, { ...formData, id: generateId() }];

    if (isValid()) {
      localStorage.setItem("cars", JSON.stringify(updatedCars));
      goToMain(updatedCars);
      alert(`Carro ${carToEdit ? "editado" : "adicionado"} com sucesso!`);
      return;
    }
    alert("Preencha os dados corretamente");
  };
  return (
    <div className="car-form">
      <div className="input-group">
        <Input
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <Input
          label="Cor"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
        />
        <Input
          label="Placa"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleInputChange}
        />
        <Input
          label="Ano"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
        />
        <Input
          label="Marca"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
        />
      </div>
      {fieldMissing && (
        <div className="error-message">
          Necessário preencher: '{fieldMissing}'
        </div>
      )}
      <IconButton className="button-form" onClick={handleSubmit}>
        <div className="icon-container">
          <Check />
          Confirmar
        </div>
      </IconButton>
    </div>
  );
}
