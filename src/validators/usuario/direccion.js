// validacion para la dirección del usuario
import { DIRECCION } from '../regexs'
export default function validarDireccion (direccion) {
  const value = direccion.trim()
  if (value === '') {
    return /* 'Campo vacío' */ ''
  } else if (DIRECCION.test(value)) {
    return 'Caracteres especiales no válidos'
  } else {
    return ''
  }
}
