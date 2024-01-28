import { useApp } from '../../hooks/useApp'
import { useNavigate } from 'react-router-dom'
import '../../styles/header.css'

export const GameHeader = () => {
    const navigate = useNavigate();
    const { userLogued } = useApp();
    const { nickname, idroom, nameroom, host } = userLogued;

    return (
        <header className="header">
            <div className="header__opciones">
                <div className="header__opciones__datos">
                    <label className="header__opciones__datos__etiqueta">{`N°.Room: ${idroom}`}</label>
                    <label className="header__opciones__datos__etiqueta">{`Room: ${nameroom}`}</label>
                </div>
                <i className="header__opciones__volver fa-solid fa-circle-xmark"></i>
            </div>
        </header>
    )
}
