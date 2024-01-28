import { getHallsByStatus, joinHall } from '../data/tuttifrutiAPI'
import { useLoaderData, useNavigate } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import { getDateHourNow } from '../utils/helpers'

export const loaderJoinHall = async () => {
    const info = await getHallsByStatus();
    const { data } = info;
    return { halls: data };
}

const JoinHallPage = () => {
    const navigate = useNavigate();
    const { userLogued, setUserLogued } = useApp();
    const { iduser } = userLogued;
    const { halls } = useLoaderData();

    const handleJoinHall = async (idsala) => {
        setUserLogued({
            ...userLogued, idroom: idsala, host: false
        });
        const game = {
            idsala: idsala, idusuario: iduser, fecingresojgo: getDateHourNow(), flghostjgo: false, flglistojgo: false, flgactivojgo: true
        }
        const info = await joinHall(game);
        navigate(`/room/${idsala}`);
    }

    return (
        <div>
            <h2>Listado de Salas</h2>
            <div>
                {halls.map((hall, i) => (
                    <div key={i}>
                        <p>{hall.nombresal}</p>
                        <button onClick={e => handleJoinHall(hall.idsala)}>{`Join: ${hall.idsala}`}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default JoinHallPage