import React, { useState } from 'react';
import { Input } from '../../Input/Input.tsx';
import { IconButton } from '../../IconButton/IconButton.tsx';
import { Check } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import useCarsStore from '../../../stores/cars.ts';
import { Car } from '../../../types/Car.ts';

export function CarForm() {
  const location = useLocation();
  const carToEdit = location.state?.car;
  const { addCar, editCar, cars } = useCarsStore();

  const [formData, setFormData] = useState({
    id: carToEdit?.id || 0,
    name: carToEdit?.name || '',
    color: carToEdit?.color || '',
    year: carToEdit?.year || '',
    brand: carToEdit?.brand || '',
  });

  const [fieldMissing, setFieldMissing] = useState('');
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const isValid = () => {
    let missingField = '';
    Object.entries(formData).forEach(([key, value]) => {
      if (!value && key !== 'name' && key !== 'id') {
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
      alert('Preencha os dados corretamente');
      return;
    }

    if (carToEdit) {
      editCar(formData);
      alert('Seu carro foi editado com sucesso!');
      goToMain();
      return;
    }

    formData.id = generateId();
    addCar(formData);
    alert('Seu carro foi criado com sucesso!');
    goToMain();
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2.5">
        <Input
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full"
        />
        <Input
          label="Cor"
          name="color"
          value={formData.color}
          onChange={handleInputChange}
          className="w-full"
        />
        <Input
          label="Ano"
          name="year"
          value={formData.year}
          onChange={handleInputChange}
          className="w-full"
        />
        <Input
          label="Marca"
          name="brand"
          value={formData.brand}
          onChange={handleInputChange}
          className="w-full"
        />
      </div>
      {fieldMissing && (
        <div className="text-red-500">
          Necessário preencher: '{fieldMissing}'
        </div>
      )}
      <IconButton className="w-full cursor-pointer" onClick={submit}>
        <div className="text-xl flex gap-4 justify-center items-center border border-black p-2">
          <Check />
          Confirmar
        </div>
      </IconButton>
    </div>
  );
}
