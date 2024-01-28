import React, { useState } from 'react'
import { registerUser } from '../data/tuttifrutiAPI'
import { useNavigate } from 'react-router-dom';
import { getDateHourNow } from '../utils/helpers'
import Swal from 'sweetalert2'
import '../styles/stylespages.css'

const RegisterUserPage = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        nombreusu: '',
        apellidousu: '',
        apodousu: '',
        celularusu: 0,
        passwordusu: ''
    });

    const handleRegisterUser = async (e) => {
        e.preventDefault();
        const { nombreusu, apellidousu, apodousu, celularusu, passwordusu } = user;
        const User = {
            nombreusu, apellidousu, apodousu, celularusu,
            passwordusu, fecregistrousu: getDateHourNow(),
            flgactivousu: true
        }
        const info = await registerUser(User);
        const { data } = info;
        if (Object.keys(data).length > 0) {
            Swal.fire({
                title: "Registro Exitoso",
                text: "Gracias por registrarse en el juego!!!",
                icon: "success",
                allowOutsideClick: false
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        }
    }

    const handleGoToLogin = () => {
        navigate('/');
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value
        });
    }

    return (
        <div className="contenido__registro__usuario">
            <form onSubmit={handleRegisterUser} className="formulario__registro__usuario">
                <h2 className="registro__usuario__titulo">Registro de Usuario</h2>
                <div className="registro__usuario__datos">
                    <div className="registro__usuario__campo">
                        <label htmlFor="nombreusu" className="registro__usuario__campo__etiqueta">Nombres:</label>
                        <i className="registro__usuario__icono fa-solid fa-user-pen"></i>
                        <input onChange={handleInputChange} type="text" name="nombreusu" id="nombreusu" autoComplete="off" 
                        placeholder="Ingrese su nombre" className="registro__usuario__campo__caja" />
                    </div>
                    <div className="registro__usuario__campo">
                        <label htmlFor="apellidousu" className="registro__usuario__campo__etiqueta">Apellidos:</label>
                        <i className="registro__usuario__icono fa-solid fa-user-pen"></i>
                        <input onChange={handleInputChange} type="text" name="apellidousu" id="apellidousu" autoComplete="off" placeholder="Ingrese su apellido" className="registro__usuario__campo__caja" />
                    </div>
                    <div className="registro__usuario__campo">
                        <label htmlFor="apodousu" className="registro__usuario__campo__etiqueta">NickName:</label>
                        <i className="registro__usuario__icono fa-solid fa-heart"></i>
                        <input onChange={handleInputChange} type="text" name="apodousu" id="apodousu" autoComplete="off" 
                        placeholder="Ingrese su nickname" className="registro__usuario__campo__caja" />
                    </div>
                    <div className="registro__usuario__campo">
                        <label htmlFor="celularusu" className="registro__usuario__campo__etiqueta">Celular:</label>
                        <i className="registro__usuario__icono fa-solid fa-mobile"></i>
                        <input onChange={handleInputChange} type="number" name="celularusu" id="celularusu" autoComplete="off" placeholder="Ingrese su celular" className="registro__usuario__campo__caja" />
                    </div>
                    <div className="registro__usuario__campo">
                        <label htmlFor="passwordusu" className="registro__usuario__campo__etiqueta">Password:</label>
                        <i className="registro__usuario__icono fa-solid fa-lock"></i>
                        <input onChange={handleInputChange} type="password" name="passwordusu" id="passwordusu" autoComplete="off" placeholder="Ingrese su Contraseña" className="registro__usuario__campo__caja" />
                    </div>
                </div>
                <div className="registro__usuario__botones">
                    <button onClick={handleGoToLogin} className="registro__usuario__boton__logueo" 
                    type="button"><i className="fa-solid fa-caret-left"></i> Volver</button>
                    <button className="registro__usuario__boton__registro" 
                    type="submit"><i className="fa-solid fa-floppy-disk"></i> Registrarse</button>
                </div>
            </form>
        </div>
    )
}

export default RegisterUserPage