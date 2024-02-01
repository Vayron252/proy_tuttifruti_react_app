import React, { useRef, useState } from 'react'
import { useApp } from '../hooks/useApp'
import { useNavigate } from 'react-router-dom'
import { getDateHourNow } from '../utils/helpers'
import { registerHall } from '../data/tuttifrutiAPI'
import Swal from 'sweetalert2'
import '../styles/stylespages.css'

const NewHallPage = () => {
  const navigate = useNavigate();
  const contenedorCategRef = useRef();
  const { userLogued, setUserLogued } = useApp();
  const { iduser } = userLogued;
  const [hall, setHall] = useState({
    nombresal: '', cantpartsal: 0, cantcategsal: 0, cantrondassal: 0, passwordsal: ''
  });
  const [categories, setCategories] = useState([]);

  const handleCreateNewHall = async (e) => {
    e.preventDefault();
    const { nombresal, cantpartsal, cantcategsal, cantrondassal, passwordsal } = hall;
    const fecRegistro = getDateHourNow();
    const Hall = {
      nombresal, cantpartsal, cantcategsal, cantrondassal,
      fecregistrosal: fecRegistro, estadosal: 'EN ESPERA', passwordsal, flgactivosal: true
    }
    const Game = {
      idusuario: iduser, fecingresojgo: fecRegistro, flghostjgo: true, flglistojgo: false, flgactivojgo: true
    }
    const CategoryRoom = categories.map(categ => ({ titulocat: categ.valor, fecregistrocat: fecRegistro, flgactivocat: true }));
    const objHall = { oHallCreateDTO: Hall, oGameCreateDTO: Game, oCategorysDTO: CategoryRoom }
    const info = await registerHall(objHall);
    const { data } = info;
    const { idsala, idjuego } = data;
    setUserLogued({
      ...userLogued, idroom: idsala, host: true, idgame: idjuego
    });
    
    if (Object.keys(data).length > 0) {
      Swal.fire({
        title: "Mensaje al usuario",
        text: 'La sala se ha creado correctamente.!!!',
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        navigate(`/room/${idsala}`);
      });
    }
  }

  const handleLostFocus = (e) => {
    const newCategory = { numeracion: parseInt(e.target.getAttribute("number")), valor: e.target.value };
    const newCategories = categories.map(categ => (categ.numeracion === parseInt(e.target.getAttribute("number")) ? newCategory : categ));
    setCategories(newCategories);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHall({
      ...hall,
      [name]: value
    });
    if (name === "cantcategsal") {
      const cantidad = value === '' ? 0 : value;
      let tempCategorys = [];
      let contador = 1;
      if (categories.length >= cantidad) {
        tempCategorys = categories.filter(categ => categ.numeracion <= cantidad);
        contador = cantidad + 1;
      } else {
        tempCategorys = categories;
        contador = categories.length + 1;
      }
      while (contador <= cantidad) {
        tempCategorys.push({ numeracion: contador, valor: '' });
        contador++;
      }
      //setCategories([]);
      setCategories(tempCategorys);
    }
  }

  return (
    <div className="contenido__nueva__sala">
      <form onSubmit={handleCreateNewHall} className="formulario__nueva__sala">
        <h2 className="nueva__sala__titulo">Nueva Sala</h2>
        <div className="nueva__sala__datos">
          <div className="nueva__sala__campo">
            <label className="nueva__sala__campo__etiqueta" htmlFor="nombresal">Nombre de la sala:</label>
            <input className="nueva__sala__campo__caja" onChange={handleInputChange} name="nombresal" id="nombresal" type="text" placeholder="Ingrese el nombre de la sala" autoComplete="off" />
          </div>
          <div className="nueva__sala__campo">
            <label className="nueva__sala__campo__etiqueta" htmlFor="cantpartsal">Cant. Participantes:</label>
            <input className="nueva__sala__campo__caja" onChange={handleInputChange} name="cantpartsal" id="cantpartsal" type="number" placeholder="Ingrese la cantidad de participantes" autoComplete="off" />
          </div>
          <div className="nueva__sala__campo">
            <label className="nueva__sala__campo__etiqueta" htmlFor="cantcategsal">Cant. Categorias:</label>
            <input className="nueva__sala__campo__caja" onChange={handleInputChange} name="cantcategsal" id="cantcategsal" type="number" placeholder="Ingrese la cantidad de categorias" autoComplete="off" />
          </div>
          <div className="nueva__sala__campo">
            <label className="nueva__sala__campo__etiqueta" htmlFor="cantrondassal">Cant. Rondas:</label>
            <input className="nueva__sala__campo__caja" onChange={handleInputChange} name="cantrondassal" id="cantrondassal" type="number" placeholder="Ingrese la cantidad de rondas" autoComplete="off" />
          </div>
          <div className="nueva__sala__campo">
            <label className="nueva__sala__campo__etiqueta" htmlFor="passwordsal">Contraseña:</label>
            <input className="nueva__sala__campo__caja" onChange={handleInputChange} name="passwordsal" id="passwordsal" type="password" placeholder="Ingrese la contraseña" autoComplete="off" />
          </div>
        </div>
        <div className="seccion__categorias">
          <h5 className="seccion__categorias__titulo">Categorías a jugar:</h5>
          {categories.length > 0 ?
            (
              <div className="nueva__sala__categorias" ref={contenedorCategRef}>
                {categories.map(categ => (
                  <div key={categ.numeracion} className="nueva__sala__categoria__campo">
                    <label className="nueva__sala__categoria__campo__etiqueta">{categ.numeracion}.</label>
                    <input onBlur={handleLostFocus} className="nueva__sala__categoria__juego" type="text" placeholder="Categoria" number={categ.numeracion} autoComplete="off" />
                  </div>
                ))}
              </div>
            ) :
            (
              <p className="seccion__categorias__mensaje">Categorías no ingresadas.</p>
            )
          }
        </div>
        <div className="nueva__sala__botones">
          <button className="nueva__sala__boton" type="submit">Registrar Sala</button>
        </div>
      </form>
    </div>
  )
}

export default NewHallPage