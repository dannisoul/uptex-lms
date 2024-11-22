// validacion para el campo de confirmación de contraseña
export default function validarContrasena2 (contrasena, contrasena2) {
  const value = contrasena.trim()
  const value2 = contrasena2.trim()
  if (value2 === '') {
    return 'Confirma la contraseña'
  } else if (value2 !== value) {
    return 'Las contraseñas deben coincidir'
  } else {
    return ''
  }
}
