import { NIVEL } from '../regexs'
// validacion para el nivel del curso
export default function validarNivel (nivel) {
  const value = nivel.trim()
  if (value === '') {
    return 'Selecciona una categoria'
  } else if (!NIVEL.test(value)) {
    return 'Selecciona un nivel válido'
  } else {
    return ''
  }
}
