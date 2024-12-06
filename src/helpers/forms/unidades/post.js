import { crearUnidad } from '@/actions/unidad/crearUnidad'
export async function post (formData, idCurso, setPending, handleModal, toast, updateUnidades) {
  try {
    setPending(true)
    const unidad = { ...formData, idCurso }
    const response = await crearUnidad(unidad)
    if (response.error) throw new Error(response.errorCode)
    handleModal()
    toast.success('Unidad creada correctamente')
    updateUnidades({ type: 'addUnidad', payload: response.newRecord })
  } catch (error) {
    if (error.message === 'ER_DUP_ENTRY') {
      toast.error(`Ya existe una unidad con el número ${formData.np} asignado`)
    } else {
      toast.error('Error al crear unidad, intenta más tarde')
    }
  } finally {
    setPending(false)
  }
}
