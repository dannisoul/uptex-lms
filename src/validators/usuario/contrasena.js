import { PASSWORD } from '../regexs'

// validacion para la complejidad de la contraseña del usuario
export default function validarContrasena (contrasena) {
  const value = contrasena.trim()
  if (value === '') {
    return 'Proporciona una contraseña'
  } else if (!PASSWORD.test(value)) {
    return '8 caracteres letra, numero y simbolo'
  } else {
    return ''
  }
}
