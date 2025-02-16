import { UNIDADES } from './regexs'

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

export function validarNp (np) {
  const value = np.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (!UNIDADES.test(value)) {
    return 'Valores entre 1 y 99'
  } else {
    return ''
  }
}
