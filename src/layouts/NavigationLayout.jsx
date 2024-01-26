import { Outlet } from 'react-router-dom'
import { Logo } from '../components/Logo'
import { NavHeader } from '../components/headers/NavHeader'

export const NavigationLayout = () => {
  return (
    <>
        <NavHeader />
        <section className="seccion__logo__navilay">
            <Logo />
        </section>
        <section className="seccion__contenido__navilay contenedor">
            <Outlet />
        </section>
    </>
  )
}
