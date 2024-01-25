import { Outlet } from 'react-router-dom'
import { Logo } from '../components/Logo'
import '../styles/layout.css'

export const InitialLayout = () => {
  return (
    <>
        <section className="seccion__logo__inilay">
            <Logo />
        </section>
        <section className="seccion__contenido__inilay contenedor">
            <Outlet />
        </section>
    </>
  )
}
