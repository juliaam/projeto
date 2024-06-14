import React, { useState } from "react";
import { Input } from "../../Input/Input.tsx";
import { IconButton } from "../../IconButton/IconButton.tsx";
import { Check } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import "./CarForm.css";
import useCarsStore from "../../../stores/cars.ts";
import { Car } from "../../../types/Car.ts";

export function CarForm() {
  const location = useLocation();
  const carToEdit = location.state?.car;
  const { addCar, editCar, cars } = useCarsStore();

  const [formData, setFormData] = useState({
    id: carToEdit?.id || 0,
    name: carToEdit?.name || "",
    color: carToEdit?.color || "",
    year: carToEdit?.year || "",
    brand: carToEdit?.brand || "",
  });

  const [fieldMissing, setFieldMissing] = useState("");
  const navigate = useNavigate();

  const goToMain = () => {
    navigate("/");
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

  const generateId = () => {
    if (cars.length) {
      const ids = cars.map((car: Car) => car.id);
      return Math.max(...ids) + 1;
    }
    return 1;
  };

  const submit = async () => {
    if (!isValid()) {
      alert("Preencha os dados corretamente");
      return;
    }

    if (carToEdit) {
      editCar(formData);
      alert("Seu carro foi editado com sucesso!");
      goToMain();
      return;
    }

    formData.id = generateId();
    addCar(formData);
    alert("Seu carro foi criado com sucesso!");
    goToMain();
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
      <IconButton className="button-form" onClick={submit}>
        <div className="icon-container">
          <Check />
          Confirmar
        </div>
      </IconButton>
    </div>
  );
}
