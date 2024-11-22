import { DATE } from '../regexs'

export default function validarInicio (inicio, cierre) {
  const value = inicio.trim()
  if (value === '') {
    return 'Selecciona una fecha correcta'
  } else if (!DATE.test(value)) {
    return 'Formato de fecha inválido'
  } else if (new Date(inicio).getTime() > new Date(cierre).getTime()) {
    return 'El inicio no puede ser posterior a la fecha de cierre'
  } else {
    return ''
  }
}
