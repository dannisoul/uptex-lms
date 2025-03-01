import { showToast as toast } from '@/app/components/shared/Toaster'
import { actualizarActividad } from '@/actions/actividad/actualizarActividad'

export async function put (
  formData,
  idActividad,
  setPending,
  handleModal,
  updateActividad,
  initialState
) {
  const newData = { ...formData, tipo: formData.tipo.value, extemporaneo: Number(formData.extemporaneo) }
  const oldData = {
    ...initialState,
    idCategoria: initialState.idCategoria,
    idNivel: initialState.idNivel,
    cursoInterno: Number(initialState.cursoInterno)
  }
  const changedData = {}

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

    const response = await actualizarActividad(idActividad, Array.from(newFormData.entries()))
    if (response.error) throw new Error(response.errorCode)
    updateActividad(response.editedRecord)
    toast.success('Curso editado correctamente')
    handleModal()
  } catch (error) {
    console.log(error)
    toast.error('Error al editar la actividad, intenta más tarde')
  } finally {
    setPending(false)
  }
}
