// validacion para el instagram del usuario
export default function validarInstagram (link) {
  const value = link.trim()
  if (value === '') {
    return /* 'Provee un enlace' */ ''
  } else if (!/^https:\/\/instagram.com\/[\da-zA-z]{1,}$/.test(value)) {
    return 'Pista: https://instagram.com/MiUsuario'
  } else {
    return ''
  }
}
