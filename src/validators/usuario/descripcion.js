// validacion para la descripcion del usuario
export default function validarDescripcion (descripcion) {
  const value = descripcion.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 100 || value.length > 500) {
    return 'Entre 100 y 500 caracteres '
  } else {
    return ''
  }
}
