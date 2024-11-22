import { NACIONALIDAD } from '../regexs'
// validacion para la nacionalidad del usuario
export default function validarNacionalidad (nacionalidad) {
  const value = String(nacionalidad).trim()
  if (value === '') {
    return 'Selecciona una nacionalidad'
  } else if (!NACIONALIDAD.test(value)) {
    return 'Selecciona una nacionalidad válida'
  } else {
    return ''
  }
}
