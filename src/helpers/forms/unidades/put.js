import { actualizarUnidad } from '@/actions/unidad/actualizarUnidad'
export async function put (formData, idUnidad, setPending, handleModal, toast, updateUnidades, initialState) {
  const changedData = {}
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== initialState[key]) changedData[key] = value
  })
  if (Object.keys(changedData).length === 0) return
  try {
    setPending(true)
    const response = await actualizarUnidad(idUnidad, Object.entries(changedData))
    if (response.error) throw new Error(response.errorCode)
    handleModal()
    toast.success('Unidad actualizada correctamente')
    updateUnidades({ type: 'updateUnidad', payload: response.editedRecord })
  } catch (error) {
    if (error.message === 'ER_DUP_ENTRY') {
      toast.error(`Ya existe una unidad con el número ${formData.np} asignado`)
    } else {
      toast.error('Error al editar unidad, intenta más tarde')
    }
  } finally {
    setPending(false)
  }
}
