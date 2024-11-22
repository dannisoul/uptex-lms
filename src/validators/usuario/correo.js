import { EMAIL } from '../regexs'

// validacion para la dirección de correo del usuario
export default function validarCorreo (correo) {
  const value = correo.trim()
  if (value === '') {
    return 'El correo no puede quedar vacío'
  } else if (!EMAIL.test(value)) {
    return 'Ingresa un correo válido'
  } else {
    return ''
  }
}
