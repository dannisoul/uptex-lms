import { DATE } from './regexs'

export function validarNombre (nombre) {
  const value = nombre.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 4 || value.length > 100) {
    return 'Entre 4 y 100 caracteres '
  } else {
    return ''
  }
}

export function validarTipo (tipo) {
  if (tipo === '') {
    return 'Campo vacío'
  } else if (Number(tipo) !== 1 && Number(tipo) !== 2) {
    return 'Elige un tipo válido'
  } else {
    return ''
  }
}

export function validarIndicaciones (nombre) {
  const value = nombre.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 4 || value.length > 500) {
    return 'Entre 4 y 500 caracteres '
  } else {
    return ''
  }
}

export function validarExtemporaneo (extemporaneo) {
  if (extemporaneo === '') {
    return 'Campo vacío'
  } else if (typeof extemporaneo !== 'boolean') {
    return 'Elige una opción válida'
  } else {
    return ''
  }
}

export function validarPuntaje (puntaje) {
  const value = puntaje.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (Number(value) < 0 || Number(value) > 100) {
    return 'Solo valores entre 0 y 100'
  } else {
    return ''
  }
}

export function validarFechaCierre (fechaCierre) {
  const value = fechaCierre.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (!DATE.test(value)) {
    return 'Ingresa una fecha válida'
  } else {
    return ''
  }
}
