import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css'
import '../styles/stylespages.css'
import { getHallById } from '../data/tuttifrutiAPI'
import { useLoaderData } from 'react-router-dom'
import { useApp } from '../hooks/useApp'

export const loaderWaitingRoom = async ({ params }) => {
    const { roomid } = params;
    const info = await getHallById(roomid);
    const { data } = info;

    return { hall: data };
}

const WaitingRoomPage = () => {
    const { userLogued } = useApp();
    const { hall } = useLoaderData();
    const { nickname, host } = userLogued;
    const { cantcategsal, cantpartsal, cantrondassal, estadosal, fecregistrosal, passwordsal, catSal, juegos } = hall;

    return (
        <div className="contenido__informacion__sala">
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
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {juegos.map((jue, i) => (
                                    <tr key={i+1}>
                                        <td>{i+1}</td>
                                        <td>{jue.usuario.apodousu}</td>
                                        {/* <td>{jue.flghostjgo}</td> */}
                                        <td>{`Esperando...`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </AccordionItemPanel>
                </AccordionItem>
            </Accordion>
        </div>
    )
}

export default WaitingRoomPage