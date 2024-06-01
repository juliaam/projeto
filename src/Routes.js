import { Route, Routes } from "react-router-dom";
import { CarPage } from "./pages/Car/index.tsx";
import { CarFormPage } from './pages/Car/formulario/index.tsx'


export function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<CarPage />} />
            <Route path="/carro/formulario" element={<CarFormPage />} />
        </Routes>)
}