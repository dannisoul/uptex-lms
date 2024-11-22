import { post } from '@/helpers/forms/inscribir_por_correo/post'

export function useCorreoAlumno (
  correoAlumno,
  idGrupo,
  toast,
  updateAlumnos,
  setCorreoAlumno
) {
  async function handleSubmit (e) {
    e.preventDefault()
    await post(correoAlumno, toast, updateAlumnos, idGrupo, setCorreoAlumno)
  }

  return {
    handleSubmit
  }
}
