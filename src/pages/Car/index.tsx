import React, { useEffect, useState } from 'react';
import { CarList } from '../../components/Car/CarList/CarList.tsx';
import useCarsStore from '../../stores/cars.ts';

export function CarPage() {
  const [allCars, setAllCars] = useState([]);
  const { findAllCars } = useCarsStore();

  const fetchCars = async () => {
    try {
      const { data } = await findAllCars();
      setAllCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  const reloadPage = async () => {
    await fetchCars();
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div>
      <CarList cars={allCars} reload={reloadPage} />
    </div>
  );
}
