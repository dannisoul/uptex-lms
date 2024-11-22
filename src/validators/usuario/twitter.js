// validacion para el twitter del usuario
export default function validarTwitter (link) {
  const value = link.trim()
  if (value === '') {
    return /* 'Provee un enlace' */ ''
  } else if (!/^https:\/\/twitter.com\/[\da-zA-z]{1,}$/.test(value)) {
    return 'Pista: https://twitter.com/MiUsuario'
  } else {
    return ''
  }
}
