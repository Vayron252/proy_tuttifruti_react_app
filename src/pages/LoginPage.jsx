import React, { useState, useEffect } from 'react'
import { getUserByCredentials } from '../data/tuttifrutiAPI'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import Connector from '../hubs/signalr-connection'
import Swal from 'sweetalert2'
import '../styles/stylespages.css'

const LoginPage = () => {
  const { userLogued, setUserLogued } = useApp();
  const { events, conecctionAppUser } = Connector();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    celular: '', password: ''
  });

  useEffect(() => {
    const createConectionUser = (_, msg) => {
      console.log(msg);
    };
    events(createConectionUser);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value
    });
  }

  const handleLoguearUsuario = async (e) => {
    e.preventDefault();
    const { celular, password } = usuario;
    Swal.fire({
      title: "Mensaje al usuario",
      text: "Obteniendo datos...",
      icon: "info",
      allowOutsideClick: false,
      didOpen: async () => {
        Swal.showLoading();
        const info_bd = await getUserByCredentials(celular, password);
        const { data } = info_bd;
        if (Object.keys(data).length > 0) {
          const { idusuario, apodousu } = data;
          setUserLogued({
            ...userLogued, iduser: idusuario, nickname: apodousu
          });
          conecctionAppUser(idusuario);
          setTimeout(() => {
            Swal.clickConfirm();
          }, 1500);
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/menu');
      }
    });
  }

  return (
    <div className="contenido__login">
      <form onSubmit={handleLoguearUsuario} className="formulario__login">
        <h2 className="login__titulo">Ingrese al juego</h2>
        <div className="login__datos">
          <div className="login__datos__campo">
            <label className="login__datos__campo__etiqueta" htmlFor="txtUsuario">Celular:</label>
            <i className="login__datos__icono fa-solid fa-user"></i>
            <input className="login__datos__campo__caja" name="celular" autoComplete="off"
              onChange={handleInputChange} type="text" id="txtUsuario" placeholder="Ingrese su usuario" />
          </div>
          <div className="login__datos__campo">
            <label className="login__datos__campo__etiqueta" htmlFor="txtPassword">Password:</label>
            <i className="login__datos__icono fa-solid fa-lock"></i>
            <input className="login__datos__campo__caja" name="password" autoComplete="off"
              onChange={handleInputChange} type="password" id="txtPassword" placeholder="Ingrese su password" />
          </div>
        </div>
        <div className="login__contenedor__boton">
          <button type="submit" className="login__boton"><i className="fa-solid fa-right-to-bracket"></i> Ingresar</button>
        </div>
      </form>
      <p className="login__registro__user">¿No tienes una cuenta?,
        <Link className="login__registro__user__link" to={"/user/register"}> Regístrate Aquí</Link>
      </p>
    </div>
  )
}

export default LoginPage