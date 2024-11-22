import { CURSO } from '../regexs'
// validacion para la categoría del curso
export default function validarCurso (curso) {
  console.log(curso)
  const value = curso.toString().trim()
  if (value === '') {
    return 'Selecciona un curso'
  } else if (!CURSO.test(value)) {
    return 'Selecciona una curso válido'
  } else {
    return ''
  }
}
