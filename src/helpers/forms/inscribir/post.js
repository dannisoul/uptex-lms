import { crearSolicitud } from '@/actions/solicitud/crearSolicitud'
export async function post (formData, setPending, handleModal, toast) {
  try {
    setPending(true)
    const response = await crearSolicitud(formData)
    if (response.error) throw new Error(response.errorCode)
    handleModal()
    toast.success('Solicitud con éxito, espera a que el propietario del curso la acepte')
  } catch (error) {
    if (error.message === 'ER_DUP_ENTRY') {
      toast.error('Ya has mandado solicitud a este grupo, espera a que el propietario te acepte')
    } else if (error.message === 'ALREADY_MEMBER') {
      toast.error('Ya estás en inscrito en este grupo')
    } else if (error.message === 'NOT_FOUND') {
      toast.error('Código no válido, solicitalo con tu docente')
    } else {
      toast.error('Error al unirte, intenta más tarde')
      console.log(error)
    }
  } finally {
    setPending(false)
  }
}
