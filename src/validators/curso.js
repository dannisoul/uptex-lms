import { CATEGORIA, NIVEL } from './regexs'

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

export function validarDescripcion (descripcion) {
  const value = descripcion.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 20 || value.length > 500) {
    return 'Entre 20 y 500 caracteres '
  } else {
    return ''
  }
}

export function validarImagen (imagen) {
  const mime = imagen.type
  const sizeInKB = Math.round(imagen.size / 1024)
  if (!mime.startsWith('image/')) {
    return 'Solo se aceptan imagenes'
  } else if (sizeInKB > 500) {
    return 'El peso máximo es 500kb'
  } else {
    return ''
  }
}

export function validarCategoria (categoria) {
  const value = categoria.trim()
  if (value === '') {
    return 'Selecciona una categoria'
  } else if (!CATEGORIA.test(value)) {
    return 'Selecciona una categoría válida'
  } else {
    return ''
  }
}

export function validarCursoInterno (esCursoInterno) {
  if (typeof esCursoInterno !== 'boolean') {
    return 'Elige una opción válida'
  } else {
    return ''
  }
}

export function validarNivel (nivel) {
  const value = nivel.trim()
  if (value === '') {
    return 'Selecciona una categoria'
  } else if (!NIVEL.test(value)) {
    return 'Selecciona un nivel válido'
  } else {
    return ''
  }
}
