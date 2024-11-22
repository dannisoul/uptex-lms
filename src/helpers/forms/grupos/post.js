import { crearGrupo } from '@/actions/grupos/crear'
export async function post (formData, setPending, handleModal, toast, updateGrupos) {
  console.log(formData)
  try {
    setPending(true)
    const data = { ...formData, idCurso: formData.idCurso.value }

    const response = await crearGrupo(data)
    if (response.error) throw new Error(response.errorCode)
    updateGrupos({ type: 'addGrupo', payload: response.newRecord })
    toast.success('Grupo creado correctamente')
    handleModal()
  } catch (error) {
    console.log(error)
    if (error.message === 'ER_DUP_ENTRY') {
      toast.error('Ya hay un grupo con ese curso activo')
    } else {
      toast.error('Error al crear el grupo, intenta más tarde')
    }
  } finally {
    setPending(false)
  }
}
