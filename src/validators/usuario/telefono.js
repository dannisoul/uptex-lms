// validacion para el telefono del usuario
import { TELEFONO } from '../regexs'
export default function validarTelefono (telefono) {
  const value = telefono.trim()
  if (value === '') {
    return /* 'Campo vacío' */ ''
  } else if (!TELEFONO.test(value)) {
    return 'Formato telefónico no válido'
  } else {
    return ''
  }
}
