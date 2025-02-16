import { crearActividad } from '@/actions/actividad/crearActividad'
import { showToast as toast } from '@/app/components/shared/Toaster'
export async function post (formData, setPending, handleModal, updateActividades, idGrupo) {
  try {
    setPending(true)
    const data = { ...formData, tipo: formData.tipo.value, extemporaneo: Number(formData.extemporaneo), idGrupo }

    const response = await crearActividad(data)
    if (response.error) throw new Error(response.errorCode)
    updateActividades({ type: 'add', payload: response.newRecord })
    toast.success('Actividad creada correctamente')
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
