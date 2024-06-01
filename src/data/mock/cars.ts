import { Car } from "../../types/Car";
import { generateId } from "../../helpers/generateId.ts";

export const cars: Car[] = [
  {
    id: generateId(),
    name: "Carro preferido",
    licensePlate: "ABC1234",
    color: "Vermelho",
    year: "2023",
    brand: "Volkswagem",
  },
  {
    id: generateId(),
    name: "Segundo carro",
    licensePlate: "XYZ5678",
    color: "Azul",
    year: "2010",
    brand: "Volkswagem",
  },
  {
    id: generateId(),
    name: "Terceiro carro",
    licensePlate: "LMN9101",
    color: "Verde",
    year: "2005",
    brand: "Volkswagem",
  },
];
