import { useApp } from '../../hooks/useApp'
import { useNavigate } from 'react-router-dom'
import { disconnectRoomByGameId } from '../../data/tuttifrutiAPI'
import Swal from 'sweetalert2'
import '../../styles/header.css'

export const GameHeader = () => {
    const navigate = useNavigate();
    const { userLogued, setUserLogued } = useApp();
    const { idroom, idgame } = userLogued;

    const handleDisconnectGame = async () => {
        Swal.fire({
            title: "¿Está seguro de salir del juego?",
            text: "Te desconectarás de la sala.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, desconectarme!",
            cancelButtonText: "Cancelar",
            allowOutsideClick: false
        }).then(async (result) => {
            if (result.isConfirmed) {
                const info = await disconnectRoomByGameId(idgame);
                const { data } = info;
                if (data) {
                    setUserLogued({
                        ...userLogued, idroom: 0, host: false, idgame: 0
                    });
                    Swal.fire({
                        title: "Desconectado!",
                        text: "Te has desconectado de la sala.",
                        icon: "success"
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/menu");
                        }
                    });
                }
            }
        });
    }

    return (
        <header className="header">
            <div className="header__opciones">
                <div className="header__opciones__datos">
                    <label className="header__opciones__datos__etiqueta">{`N°.Room: ${idroom}`}</label>
                    {/* <label className="header__opciones__datos__etiqueta">{`Room: ${nameroom}`}</label> */}
                </div>
                <i onClick={handleDisconnectGame} className="header__opciones__volver fa-solid fa-circle-xmark"></i>
            </div>
        </header>
    )
}
