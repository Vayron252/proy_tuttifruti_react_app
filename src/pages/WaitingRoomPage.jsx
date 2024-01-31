import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import toast, { Toaster } from 'react-hot-toast';
import { getHallById, getPlayersByRoomId, readyGameByRoom } from '../data/tuttifrutiAPI'
import { useLoaderData } from 'react-router-dom'
import { useApp } from '../hooks/useApp'
import Connector from '../hubs/signalr-connection'
import { useEffect, useState } from 'react';
import 'react-accessible-accordion/dist/fancy-example.css'
import '../styles/stylespages.css'

export const loaderWaitingRoom = async ({ params }) => {
    const { roomid } = params;
    const info = await getHallById(roomid);
    const { data } = info;
    return { hall: data };
}

const WaitingRoomPage = () => {
    const [startGame, setStartGame] = useState(false);
    const { events } = Connector();
    const [players, setPlayers] = useState([]);
    const { userLogued } = useApp();
    const { hall } = useLoaderData();
    const { iduser, nickname, host, idroom } = userLogued;
    const { nombresal, cantcategsal, cantpartsal, cantrondassal, estadosal, fecregistrosal, passwordsal, catSal, juegos } = hall;

    useEffect(() => {
      const arrayPlayers = juegos.map(jue => ({ idgame: jue.idjuego, idusu: jue.idusuario, nick: jue.usuario.apodousu, ready: jue.flglistojgo }));
      setPlayers(arrayPlayers);
      verifyAllPlayersReady(arrayPlayers);
    }, [])

    useEffect(() => {
        const listarJugadores = async (_, msg) => {
            await handleAgainListPlayers();
            toast.success(msg);
        }
        events(null, null, listarJugadores);
    }, [events]);

    const handleAgainListPlayers = async () => {
        const info = await getPlayersByRoomId(idroom);
        const { data } = info;
        const arrayPlayers = data.map(j => {
            const { idjuego, idusuario, apodousu, flglistojgo } = j;
            return { idgame: idjuego, idusu: idusuario, nick: apodousu, ready: flglistojgo }
        });
        setPlayers(arrayPlayers);
        verifyAllPlayersReady(arrayPlayers);
    }

    const handleChangeReady = async (ready, idgame) => {
        const oGame = { idjuego: idgame, flglistojgo: ready };
        const info = await readyGameByRoom(oGame);
    }

    const verifyAllPlayersReady = (listPlayers) => {
        const result = listPlayers.every(lp => lp.ready);
        setStartGame(result);
    }

    return (
        <div className="contenido__informacion__sala">
            <Toaster />
            {/* <button onClick={handleAgainListPlayers}>Listar</button> */}
            <Accordion preExpanded={["acord-info"]}>
                <AccordionItem uuid="acord-info">
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Información de la Sala
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="seccion__informacion__sala">
                            <div className="informacion__sala__fila__titulo">
                                <div className="">
                                    <p className="">Información</p>
                                </div>
                                <div className="">
                                    <p className="">Dato</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Nombre de la Sala:</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{nombresal}</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Jugador(a):</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{nickname}</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Tipo:</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{host ? 'Host' : 'Jugador'}</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Cant.Jugadores:</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{cantpartsal}</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Cant.Categorías:</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{cantcategsal}</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Cant.Rondas:</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{cantrondassal}</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Fec.Registro:</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{fecregistrosal.substring(0, 10)}</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Estado:</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{estadosal}</p>
                                </div>
                            </div>
                            <div className="informacion__sala__fila">
                                <div className="sala__fila__titulo">
                                    <p className="">Contraseña:</p>
                                </div>
                                <div className="sala__fila__dato">
                                    <p className="">{passwordsal != '' ? 'Si' : 'No'}</p>
                                </div>
                            </div>
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="acord-categ">
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Categorías a Jugar
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <div className="seccion__categorias__sala">
                            {catSal.map((cat, i) => (
                                <div key={i+1} className="categoria__sala__campo">
                                    <p className="categoria__sala__campo__dato">{`${i+1}. ${cat.categoria.titulocat}`}</p>
                                </div>
                            ))}
                        </div>
                    </AccordionItemPanel>
                </AccordionItem>
                <AccordionItem uuid="acord-part">
                    <AccordionItemHeading>
                        <AccordionItemButton>
                            Participantes de la Sala
                        </AccordionItemButton>
                    </AccordionItemHeading>
                    <AccordionItemPanel>
                        <table className="tablea__participantes__sala">
                            <thead>
                                <tr>
                                    <th>N°</th>
                                    <th>NickName</th>
                                    <th>¿Listo?</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((p, i) => (
                                    <tr key={i+1}>
                                        <td>{i+1}</td>
                                        <td>{p.nick}</td>
                                        <td><input type="checkbox" onChange={e => handleChangeReady(e.target.checked, p.idgame)} checked={p.ready} disabled={p.idusu == iduser ? false : true} /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
            { host ? 
            (
                <div className="informacion__contenedor__sala__boton">
                    <button className="informacion__sala__iniciar__juego" disabled={!startGame} >
                        <i className="fa-solid fa-gamepad"></i> Iniciar Juego
                    </button>
                </div>
            ) : (<></>) }
        </div>
    )
}

export default WaitingRoomPage