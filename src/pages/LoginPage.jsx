import React, { useState } from 'react'
import { getUserByCredentials } from '../data/tuttifrutiAPI'
import { Link, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import Swal from 'sweetalert2'
import '../styles/stylespages.css'
// import { WaitingRoom } from '../components/WaitingRoom'
// import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'

const LoginPage = () => {
  const [conn, setConnection] = useState();

  const { userLogued, setUserLogued } = useApp();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({
    celular: '', password: ''
  });

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
    const info_bd = await getUserByCredentials(celular, password);
    const { data } = info_bd;
    if (Object.keys(data).length > 0) {
      const { idusuario, nombreusu, apellidousu, apodousu } = data;
      setUserLogued({
        ...userLogued, iduser: idusuario, name: nombreusu, nickname: apodousu
      });
      Swal.fire({
        title: "Bienvenido",
        text: `${nombreusu} ${apellidousu}`,
        icon: "success",
        allowOutsideClick: false
      }).then((result) => {
        if (result.isConfirmed) {
          // createConectionUser(idusuario);
          navigate('/menu');
        }
      });
    }
  }

  // const createConectionUser = async (id) => {
  //   try {
  //     //iniciamos la conexion
  //     const conn = new HubConnectionBuilder()
  //                   .withUrl(`${import.meta.env.VITE_API_URL}/chat`)
  //                   .configureLogging(LogLevel.Information).build();

  //     //recivimos el mensaje
  //     // conn.on("JoinSpecificChatRoom", (username, msg) => {
  //     //   console.log("msg: ", msg);
  //     // });
  //     var x = await conn.start();
  //     console.log(x);
  //     await conn.invoke("GenerarConexionUsuario", id);
  //     setConnection(conn);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // const joinChatRoom = async (username, chatroom) => {
  //   // try {
  //   //   //iniciamos la conexion
  //   //   const conn = new HubConnectionBuilder()
  //   //                 .withUrl(`${import.meta.env.VITE_API_URL}/chat`)
  //   //                 .configureLogging(LogLevel.Information).build();

  //   //   //recivimos el mensaje
  //   //   conn.on("JoinSpecificChatRoom", (username, msg) => {
  //   //     console.log("msg: ", msg);
  //   //   });

  //   //   await conn.start();
  //   //   await conn.invoke("JoinSpecificChatRoom", {username, chatroom});
  //   //   setConnection(conn);
  //   // } catch (e) {
  //   //   console.log(e);
  //   // }

  //   console.log(conn);
  // }

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

      {/* <h2>hello a mi hall</h2>
      <WaitingRoom joinChatRoom={joinChatRoom}></WaitingRoom> */}


    </div>
  )
}

export default LoginPage