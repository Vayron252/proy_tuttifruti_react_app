import React from 'react'
import logo_tf from '../../img/logo_tutti_fruti.png'
import { useApp } from '../../hooks/useApp'
import { useNavigate } from 'react-router-dom'
import '../../styles/header.css'

export const MainHeader = () => {
    const navigate = useNavigate();
    const { userLogued, setUserLogued } = useApp();
    const { name, lastname } = userLogued;

    const handleCerrarSesion = () => {
        setUserLogued({});
        navigate("/");
    }

  return (
    <header className="header">
        <div className="header__contenedor__logo">
            <img src={logo_tf} alt="imagen logo" />
        </div>
        { Object.keys(userLogued).length > 0 ? 
            (
                <div className="header__contenedor__datos">
                    <label htmlFor="">{`${name} ${lastname}`}</label>
                    <button onClick={handleCerrarSesion} className="">Cerrar Sesión</button>
                </div>
            ) : 
            (
                <></>
            ) 
        }
    </header>
  )
}
