import { getHallsByStatus, joinHall } from '../data/tuttifrutiAPI'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { getDateHourNow } from '../utils/helpers'
import Connector from '../hubs/signalr-connection'
import { useEffect, useState } from 'react'
import '../styles/stylespages.css'

export const loaderJoinHall = async () => {
    const info = await getListHalls();
    return { halls: info };
}

const getListHalls = async () => {
    const info = await getHallsByStatus();
    const { data } = info;
    return data;
}

const JoinHallPage = () => {
    const { events, joinSpecificRoom } = Connector();
    const navigate = useNavigate();
    const { userLogued, setUserLogued } = useApp();
    const { iduser } = userLogued;
    const { halls } = useLoaderData();
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
      const newRooms = halls.map(h => ({ idsala: h.idsala, nombresal: h.nombresal }));
      setRooms(newRooms);
    }, []);

    useEffect(() => {
        const listarRooms = async (_, msg) => {
            if (msg === "LRS") {
                await handleListRooms();
            }
        }
        events(null, listarRooms);
    }, [events]);

    const handleJoinHall = async (idsala) => {
        const game = {
            idsala: idsala, idusuario: iduser, fecingresojgo: getDateHourNow(), flghostjgo: false, flglistojgo: false, flgactivojgo: true
        }
        const info = await joinHall(game);
        const { data } = info;
        const { idjuego } = data;
        setUserLogued({
            ...userLogued, idroom: idsala, host: false, idgame: idjuego
        });
        joinSpecificRoom(idsala, iduser);
        navigate(`/room/${idsala}`);
    }

    const handleListRooms = async () => {
        const halls = await getListHalls();
        const newRooms = halls.map(h => ({ idsala: h.idsala, nombresal: h.nombresal }));
        setRooms(newRooms);
    }

    return (
        <div className="contenido__listado__salas__enespera">
            <h2 className="listado__salas__enespera__titulo">Listado de Salas</h2>
            <table className="tabla__salas__enespera">
                <thead>
                    <tr>
                        <th>N°.</th>
                        <th>Nombre de la Sala</th>
                        <th>Jugadores</th>
                        <th>Unirse</th>
                    </tr>
                </thead>
                <tbody>
                    {rooms.map((room, i) => (
                        <tr key={i+1}>
                            <td>{i+1}</td>
                            <td>{room.nombresal}</td>
                            <td>{"3/4"}</td>
                            <td><i onClick={e => handleJoinHall(room.idsala)} className="fa-solid fa-gamepad"></i></td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div>
                {rooms.map((room, i) => (
                    <div key={i}>
                        <p>{room.nombresal}</p>
                        <button onClick={e => handleJoinHall(room.idsala)}>{`Join: ${room.idsala}`}</button>
                    </div>
                ))}
            </div> */}
        </div>
    )
}

export default JoinHallPage