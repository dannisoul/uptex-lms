// validacion para el facebook del usuario
export default function validarFacebook (link) {
  const value = link.trim()
  if (value === '') {
    return /* 'Provee un enlace' */ ''
  } else if (!/^https:\/\/facebook.com\/[\da-zA-z]{1,}$/.test(value)) {
    return 'Pista: https://facebook.com/MiUsuario'
  } else {
    return ''
  }
}
