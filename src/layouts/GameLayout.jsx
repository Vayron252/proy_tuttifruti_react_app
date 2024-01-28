import { Outlet } from "react-router-dom"
import { Logo } from '../components/Logo'
import { GameHeader } from "../components/headers/GameHeader"

export const GameLayout = () => {
  return (
    <>
        <GameHeader />
        <section className="seccion__logo__gamelay">
            <Logo />
        </section>
        <section className="seccion__contenido__gamelay contenedor">
            <Outlet />
        </section>
    </>
  )
}
