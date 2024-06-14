import React, { useEffect, useState } from "react";
import "./index.css";
import { CarList } from "../../components/Car/CarList/CarList.tsx";
import useCarsStore from "../../stores/cars.ts";

export function CarPage() {
  const [allCars, setAllCars] = useState([]);
  const { findAllCars } = useCarsStore();

  const reloadPage = () => {};

  useEffect(() => {
    const fetchCars = async () => {
      const { data } = await findAllCars();
      setAllCars(data);
    };

    fetchCars();
  }, [reloadPage]);

  return (
    <div>
      <CarList cars={allCars} reload={reloadPage} />
    </div>
  );
}
