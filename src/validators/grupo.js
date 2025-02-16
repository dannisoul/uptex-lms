import { DATE, CURSO } from './regexs'

export function validarNombre (nombre) {
  const value = nombre.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 4 || value.length > 50) {
    return 'Entre 4 y 50 caracteres '
  } else {
    return ''
  }
}

export function validarCurso (curso) {
  console.log(curso)
  const value = curso.toString().trim()
  if (value === '') {
    return 'Selecciona un curso'
  } else if (!CURSO.test(value)) {
    return 'Selecciona una curso válido'
  } else {
    return ''
  }
}

export function validarInicio (inicio, cierre) {
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

export function validarCierre (inicio, cierre) {
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
