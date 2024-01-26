import React from 'react'
import logo_tf from '../../img/logo_tutti_fruti.png'
import { useApp } from '../../hooks/useApp'
import { useNavigate } from 'react-router-dom'
import '../../styles/header.css'

export const NavHeader = () => {
    const navigate = useNavigate();
    const { userLogued, setUserLogued } = useApp();
    const { nickname } = userLogued;

    const handleCerrarSesion = () => {
        setUserLogued({});
        navigate("/");
    }

    const handleBack = () => {
        navigate(-1);
    }

    return (
        <header className="header">
            <div className="header__opciones">
                <i onClick={handleBack} className="header__opciones__volver fa-solid fa-angle-left"></i>
                <div className="header__opciones__datos">
                    <label className="header__opciones__datos__etiqueta">{`Bienvenido(a), ${nickname}`}</label>
                    <button onClick={handleCerrarSesion}
                        className="header__opciones__datos__boton"><i className="fa-solid fa-right-from-bracket"></i></button>
                </div>
            </div>
        </header>
    )
}
