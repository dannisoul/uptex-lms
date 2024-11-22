import { UNIDADES } from '../regexs'
// validacion para el np de la unidad
export default function validarNp (np) {
  const value = np.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (!UNIDADES.test(value)) {
    return 'Valores entre 1 y 99'
  } else {
    return ''
  }
}
