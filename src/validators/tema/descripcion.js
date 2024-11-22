// validacion para la descripcion del tema
export default function validarDescripcion (descripcion) {
  const value = descripcion.trim()
  if (value === '') {
    return 'Campo vacío'
  } else if (value.length < 100 || value.length > 500) {
    return 'Entre 50 y 250 caracteres'
  } else {
    return ''
  }
}
