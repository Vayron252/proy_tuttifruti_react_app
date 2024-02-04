import { useNavigate } from 'react-router-dom'
import '../styles/stylespages.css'

const MenuPage = () => {
    const navigate = useNavigate();
    
    const handleNewHall = () => {
        navigate("/hall/create");
    }

    const handleListHalls = () => {
        navigate("/halls");
    }

    return (
        <div className="contenido__opciones__menu">
            <button onClick={handleNewHall} className="opciones__menu__crear__sala">Crear Sala</button>
            <button onClick={handleListHalls} className="opciones__menu__unirse__sala">Unirse a la Sala</button>
        </div>
    )
}

export default MenuPage