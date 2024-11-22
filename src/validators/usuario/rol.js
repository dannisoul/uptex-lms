import { ROL } from '../regexs'

// validacion para la dirección de correo del usuario
export default function validarRol (rol) {
  const value = rol.trim()
  if (value === '') {
    return 'El rol no puede estar vacío'
  } else if (!ROL.test(value)) {
    return 'Ingresa un rol válido'
  } else {
    return ''
  }
}
