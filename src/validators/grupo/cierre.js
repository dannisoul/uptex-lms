import { DATE } from '../regexs'

export default function validarCierre (inicio, cierre) {
  const value = cierre.trim()
  if (value === '') {
    return 'Selecciona una fecha correcta'
  } else if (!DATE.test(value)) {
    return 'Formato de fecha inválido'
  } else if (new Date(inicio).getTime() > new Date(cierre).getTime()) {
    return 'El cierre debe ser posterior a la fecha de inicio'
  } else {
    return ''
  }
}
