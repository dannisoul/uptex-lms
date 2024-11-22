import { inscribirAlumnoPorCorreo } from '@/actions/usuario/inscribirAlumnoPorCorreo'

export async function post (correoAlumno, toast, updateAlumnos, idGrupo, setCorreoAlumno) {
  try {
    const response = await inscribirAlumnoPorCorreo(correoAlumno, idGrupo)
    if (response.error) throw new Error(response.errorCode)
    console.log(response)
    toast.success('Alumno añanido')
    setCorreoAlumno('')
    updateAlumnos({ type: 'addAlumno', payload: response.newAlumno })
  } catch (error) {
    if (error.message === 'ER_DUP_ENTRY') {
      toast.error('Ya inscrito(a) en el grupo')
    } else if (error.message === 'NOT_FOUND') {
      toast.error('No hay alumnos con este correo')
    } else {
      toast.error('Error al unirte, intenta más tarde')
      console.log(error)
    }
  }
}
