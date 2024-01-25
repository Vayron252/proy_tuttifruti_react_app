import React from 'react'
import '../styles/stylespages.css'
import { useNavigate } from 'react-router-dom'

const MenuPage = () => {
    const navigate = useNavigate();

    const handleNewHall = () => {
        navigate("/hall/create");
    }

    const handleListHalls = () => {
        navigate("/halls");
    }

    return (
        <div className="seccion__opciones contenedor">
            <button onClick={handleNewHall} className="opcion__crear__sala">Crear Sala</button>
            <button onClick={handleListHalls} className="opcion__unirse__sala">Unirse a la Sala</button>
        </div>
    )
}

export default MenuPage