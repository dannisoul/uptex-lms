import { actualizarTema } from '@/actions/tema/actualizarTema'
export async function put (formData, idTema, setPending, handleModal, toast, updateTemas, initialState) {
  console.log(idTema)
  const changedData = {}
  Object.entries(formData).forEach(([key, value]) => {
    if (value !== initialState[key]) changedData[key] = value
  })
  if (Object.keys(changedData).length === 0) return
  try {
    setPending(true)
    const response = await actualizarTema(idTema, Object.entries(changedData))
    if (response.error) throw new Error(response.errorCode)
    handleModal()
    toast.success('Tema actualizado correctamente')
    updateTemas({ type: 'updateTema', payload: response.editedRecord })
  } catch (error) {
    if (error.message === 'ER_DUP_ENTRY') {
      toast.error(`Ya existe una tema con el número ${formData.np} asignado`)
    } else {
      toast.error('Error al actualizar el tema, intenta más tarde')
      console.log(error)
    }
  } finally {
    setPending(false)
  }
}
