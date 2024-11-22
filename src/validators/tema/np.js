import { TEMAS } from '../regexs'
// validacion para el np del tema
export default function validarNp (np) {
  const value = np.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (!TEMAS.test(value)) {
    return 'Ingresa un valor válido p.e 1.1'
  } else {
    return ''
  }
}
