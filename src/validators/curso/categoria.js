import { CATEGORIA } from '../regexs'
// validacion para la categoría del curso
export default function validarCategoria (categoria) {
  const value = categoria.trim()
  if (value === '') {
    return 'Selecciona una categoria'
  } else if (!CATEGORIA.test(value)) {
    return 'Selecciona una categoría válida'
  } else {
    return ''
  }
}
