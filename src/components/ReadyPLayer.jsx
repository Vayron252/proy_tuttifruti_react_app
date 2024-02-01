import ico_check from '../img/img_check.png'
import { SpinnerSkCircle } from './helpers/SpinnerSkCircle'
import '../styles/components.css'

export const ReadyPLayer = ({ ready }) => {
    return (
        <div className="contenedor__ready__player">
            {ready ?
                (
                    <div className="contenedor__icono__check">
                        <img className="icono__check__imagen" src={ico_check} alt="icono check" />
                    </div>
                ) :
                (
                    <div className="contenedor__wait__players">
                        <p>Esperando</p>
                        <SpinnerSkCircle />
                    </div>
                )}
        </div>
    )
}
