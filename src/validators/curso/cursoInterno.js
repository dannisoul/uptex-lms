// validacion para el tipo del curso p.e ES CURSO INTERNO ? (TRUE | FALSE)
export default function validarCursoInterno (esCursoInterno) {
  if (typeof esCursoInterno !== 'boolean') {
    return 'Elige una opción válida'
  } else {
    return ''
  }
}
