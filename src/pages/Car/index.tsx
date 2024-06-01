import React from "react";
import "./index.css";
import { CarList } from "../../components/CarList/CarList.tsx";
import { cars } from "../../data/mock/cars.ts";

export function CarPage() {
  return (
    <div>
      <CarList cars={cars} />
    </div>
  );
}
