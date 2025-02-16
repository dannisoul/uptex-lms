import { SPECIAL_CHARS, TEMAS } from './regexs'

export function validarNombre (nombre) {
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

export function validarDescripcion (descripcion) {
  const value = descripcion.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 20 || value.length > 500) {
    return 'Entre 20 y 500 caracteres'
  } else {
    return ''
  }
}

export function validarNp (np) {
  const value = np.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (!TEMAS.test(value)) {
    return 'Ingresa un valor válido p.e 1.1'
  } else {
    return ''
  }
}
