import { DATE } from '../regexs'

// validacion para el nombre del usuario (tambien sirve para validar apellidos)
export default function validarNacimiento (date) {
  const value = date.trim()
  const age = validateAge(value)
  if (value === '') {
    return 'Selecciona una fecha de nacimiento'
  } else if (!DATE.test(value)) {
    return 'Formato de fecha inválido'
  } else if (age < 18) {
    return 'Edad minima 18 años'
  } else {
    return ''
  }
}

function validateAge (date) {
  const now = new Date()
  const [year, month, day] = date.split('-')
  const birthday = new Date(year, month - 1, day)

  let age = now.getFullYear() - birthday.getFullYear()

  if (birthday > now.setFullYear(now.getFullYear() - age)) {
    age--
  }
  return age
}
