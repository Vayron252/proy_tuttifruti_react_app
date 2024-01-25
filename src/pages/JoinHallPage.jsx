import React from 'react'
import { getHallsByStatus } from '../data/tuttifrutiAPI'
import { useLoaderData } from 'react-router-dom';

export const loaderJoinHall = async () => {
    const info = await getHallsByStatus('CRE');
    const { data } = info;
    return { halls: data };
}

const JoinHallPage = () => {
    const { halls } = useLoaderData();

    return (
        <div>
            <h2>Listado de Salas</h2>
            <div>
                {halls.map((hall, i) => (
                    <p key={i}>{hall.nombresal}</p>
                ))}
            </div>
        </div>
    )
}

export default JoinHallPage