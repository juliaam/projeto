import { useEffect, useState } from "react";
import { CarsService } from "../services/cars.ts";
import { Car } from "../types/Car.ts";

const useCarsStore = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const addCar = async (body: Car) => {
    await CarsService.Create(body);
    fetchCars();
  };

  const editCar = async (body: Car) => {
    await CarsService.Edit(body);
    await fetchCars();
  };

  const deleteCar = async (id: number) => {
    await CarsService.Delete(id);
    await fetchCars();
  };

  const findAllCars = async () => {
    return await CarsService.FindAll();
  };

  const fetchCars = async () => {
    try {
      setLoading(true);
      const { data } = await CarsService.FindAll();
      setCars(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return { cars, loading, error, deleteCar, addCar, editCar, findAllCars };
};

export default useCarsStore;
