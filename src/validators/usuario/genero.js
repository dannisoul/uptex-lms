// validacion para el genero del usuario
export default function validarGenero (genero) {
  const value = genero.trim()
  if (value === '') {
    return 'Selecciona un genero'
  } else if (value !== 'M' && value !== 'F') {
    return 'Selecciona un genero válido'
  } else {
    return ''
  }
}
