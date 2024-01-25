import React, { useRef, useState } from 'react'
import { getDateHourNow } from '../utils/helpers'
import { registerHall } from '../data/tuttifrutiAPI'
import Swal from 'sweetalert2'


const NewHallPage = () => {
  const contenedorCategRef = useRef();
  const [hall, setHall] = useState({
    nombresal: '', cantpartsal: 0, cantcategsal: 0, cantrondassal: 0, passwordsal: ''
  });

  const handleCreateNewHall = async (e) => {
    e.preventDefault();
    const { nombresal, cantpartsal, cantcategsal, cantrondassal, passwordsal } = hall;
    const fecRegistro = getDateHourNow();
    const Hall = {
      nombresal, cantpartsal, cantcategsal, cantrondassal,
      fecregistrosal: fecRegistro, estadosal: 'CRE', passwordsal, flgactivosal: true
    }
    const Game = {
      idusuario: 1, fecingresojgo: fecRegistro, flghostjgo: true, flglistojgo: false, flgactivojgo: true
    }
    const CategoryRoom = [
      { titulocat: 'Nombre', fecregistrocat: fecRegistro, flgactivocat: true },
      { titulocat: 'Apellido', fecregistrocat: fecRegistro, flgactivocat: true },
      { titulocat: 'Fruta', fecregistrocat: fecRegistro, flgactivocat: true },
      { titulocat: 'País', fecregistrocat: fecRegistro, flgactivocat: true }
    ]
    const objHall = { oHallCreateDTO: Hall, oGameCreateDTO: Game, oCategorysDTO: CategoryRoom  }
    console.log(objHall);
    const info = await registerHall(objHall);
    const { data } = info;
    if (Object.keys(data).length > 0) {
      Swal.fire({
        title: "Mensaje al usuario",
        text: 'La sala se ha creado correctamente.!!!',
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        console.log('espera!!!');
      });
    }
  }

  const handleCreateTextBoxCategorias = (cantidad) => {
    let inputsCateg = '';
    let contador = 1;
    while (contador <= cantidad) {
      inputsCateg += `<input type="text" id="categ-${contador}" placeholder="Ingrese la categoría" />`
      contador++;
    }
    contenedorCategRef.current.innerHTML = inputsCateg;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHall({
      ...hall,
      [name]: value
    });
    if (name === "cantcategsal") {
      handleCreateTextBoxCategorias(value === '' ? 0 : value);
    }
  }

  return (
    <div className="seccion__nueva__sala">
      <h2 className="nueva__sala__titulo">Nueva Sala</h2>
      <form onSubmit={handleCreateNewHall} className="">
        <div className="">
          <label htmlFor="nombresal">Nombre de la sala:</label>
          <input onChange={handleInputChange} name="nombresal" id="nombresal" type="text" placeholder="Ingrese el nombre de la sala" />
        </div>
        <div>
          <label htmlFor="cantpartsal">Cant. Participantes</label>
          <input onChange={handleInputChange} name="cantpartsal" id="cantpartsal" type="number" placeholder="Ingrese la cantidad de participantes" />
        </div>
        <div>
          <label htmlFor="cantcategsal">Cant. Categorias</label>
          <input onChange={handleInputChange} name="cantcategsal" id="cantcategsal" type="number" placeholder="Ingrese la cantidad de categorias" />
        </div>
        <div>
          <label htmlFor="cantrondassal">Cant. Rondas</label>
          <input onChange={handleInputChange} name="cantrondassal" id="cantrondassal" type="number" placeholder="Ingrese la cantidad de rondas" />
        </div>
        <div>
          <label htmlFor="passwordsal">Contraseña</label>
          <input onChange={handleInputChange} name="passwordsal" id="passwordsal" type="password" placeholder="Ingrese la contraseña" />
        </div>
        <button type="submit" className="">Registrar Sala</button>
      </form>
      <div className="categorias" ref={contenedorCategRef}>

      </div>
    </div>
  )
}

export default NewHallPage