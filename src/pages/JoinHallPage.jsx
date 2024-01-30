import { getHallsByStatus, joinHall } from '../data/tuttifrutiAPI'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { getDateHourNow } from '../utils/helpers'
import Connector from '../hubs/signalr-connection'
import { useEffect, useState } from 'react'

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
    const { events } = Connector();
    const navigate = useNavigate();
    const { userLogued, setUserLogued } = useApp();
    const { iduser } = userLogued;
    const { halls } = useLoaderData();
    const [rooms, setRooms] = useState([]);

    const handleJoinHall = async (idsala) => {
        setUserLogued({
            ...userLogued, idroom: idsala, host: false
        });
        const game = {
            idsala: idsala, idusuario: iduser, fecingresojgo: getDateHourNow(), flghostjgo: false, flglistojgo: false, flgactivojgo: true
        }
        await joinHall(game);
        navigate(`/room/${idsala}`);
    }

    useEffect(() => {
      const newRooms = halls.map(h => ({ idsala: h.idsala, nombresal: h.nombresal }));
      setRooms(newRooms);
    }, []);

    useEffect(() => {
        const listarRooms = async (_, msg) => {
            console.log(msg);
            await handleListRooms();
        }
        events(null, listarRooms);
    }, [events]);

    const handleListRooms = async () => {
        const halls = await getListHalls();
        const newRooms = halls.map(h => ({ idsala: h.idsala, nombresal: h.nombresal }));
        setRooms(newRooms);
    }

    return (
        <div>
            <h2>Listado de Salas</h2>
            <div>
                {rooms.map((room, i) => (
                    <div key={i}>
                        <p>{room.nombresal}</p>
                        <button onClick={e => handleJoinHall(room.idsala)}>{`Join: ${room.idsala}`}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JoinHallPage