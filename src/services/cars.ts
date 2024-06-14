import axios from "axios";
import { Car } from "../types/Car";

export class CarsService {
  private static apiUrl = "http://localhost:5000/cars";

  static async FindAll() {
    return await axios.get(`${this.apiUrl}`);
  }

  static async Create(body: Car) {
    return await axios.post(`${this.apiUrl}`, body);
  }

  static async Edit(body: Car) {
    return await axios.put(`${this.apiUrl}`, body);
  }

  static async Delete(id: number) {
    return await axios.delete(`${this.apiUrl}/${id}`);
  }
}
