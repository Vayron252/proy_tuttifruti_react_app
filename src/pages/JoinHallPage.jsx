import { getHallsByStatus, joinHall } from '../data/tuttifrutiAPI'
import { useLoaderData, useNavigate } from 'react-router-dom'

export const loaderJoinHall = async () => {
    const info = await getHallsByStatus('CRE');
    const { data } = info;
    return { halls: data };
}

const JoinHallPage = () => {
    const navigate = useNavigate();
    const { halls } = useLoaderData();

    const handleJoinHall = async (idsala) => {
        const game = {
            idsala: idsala, idusuario: 2, fecingresojgo: '27/01/2024 20:51:00', flghostjgo: false, flglistojgo: false, flgactivojgo: true
        }
        const info = await joinHall(game);
        console.log(info);
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