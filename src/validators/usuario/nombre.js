import { SPECIAL_CHARS_AND_NUMBERS } from '../regexs'

// validacion para el nombre del usuario (tambien sirve para validar apellidos)
export default function validarNombre (nombre) {
  const value = nombre.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 3 || value.length > 50) {
    return 'Entre 3 y 50 caracteres '
  } else if (SPECIAL_CHARS_AND_NUMBERS.test(value)) {
    return 'Caracteres especiales no válidos'
  } else {
    return ''
  }
}
