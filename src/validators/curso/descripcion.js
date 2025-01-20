// validacion para la descripcion del curso
export default function validarDescripcion (descripcion) {
  const value = descripcion.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 20 || value.length > 500) {
    return 'Entre 20 y 500 caracteres '
  } else {
    return ''
  }
}
