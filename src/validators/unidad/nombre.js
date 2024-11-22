import { SPECIAL_CHARS } from '../regexs'

// validacion para el nombre de la unidad
export default function validarNombre (nombre) {
  const value = nombre.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 4 || value.length > 50) {
    return 'Entre 4 y 50 caracteres '
  } else if (SPECIAL_CHARS.test(value)) {
    return 'Caracteres no válidos'
  } else {
    return ''
  }
}
