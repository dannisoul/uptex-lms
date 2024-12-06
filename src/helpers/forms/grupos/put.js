import { actualizarGrupo } from '@/actions/grupos/actualizarGrupo'
export async function put (formData, idGrupo, setPending, handleModal, toast, updateGrupos, initialState) {
  const newData = { ...formData, idCurso: formData.idCurso.value }
  const oldData = { ...initialState, idCurso: formData.idCurso.value }
  const changedData = {}

  console.log(formData.idCurso.value)

  Object.entries(newData).forEach(([key, value]) => {
    if (value !== oldData[key]) {
      changedData[key] = value
    }
  })

  if (Object.keys(changedData).length === 0) return
  try {
    setPending(true)
    const newFormData = new FormData()
    Object.entries(changedData).forEach(([key, value]) => {
      newFormData.append(key, value)
    })

    const response = await actualizarGrupo(idGrupo, Object.entries(changedData))
    if (response.error) throw new Error(response.errorCode)
    updateGrupos(response.editedRecord)
    toast.success('Grupo actualizado correctamente')
    handleModal()
  } catch (error) {
    console.log(error)
    toast.error('Error al actualizar el grupo, intenta más tarde')
  } finally {
    setPending(false)
  }
}
