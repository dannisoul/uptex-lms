// validacion para la especialidad del usuario
export default function validarEspecialidad (especialidad) {
  const value = String(especialidad).trim()
  if (value === '') {
    return /* 'Selecciona una especialidad' */ ''
  } else if (!/^\d+$/.test(value)) {
    return 'Selecciona una especialidad válida'
  } else {
    return ''
  }
}
