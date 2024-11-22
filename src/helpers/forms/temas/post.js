import { crearTema } from '@/actions/tema/crear'
export async function post (formData, idUnidad, setPending, handleModal, toast, updateTemas) {
  try {
    setPending(true)
    const tema = { ...formData, idUnidad }
    const response = await crearTema(tema)
    if (response.error) throw new Error(response.errorCode)
    console.log(response)
    handleModal()
    toast.success('Tema creado correctamente')
    updateTemas({ type: 'addTema', payload: response.newRecord })
  } catch (error) {
    if (error.message === 'ER_DUP_ENTRY') {
      toast.error(`Ya existe una tema con el número ${formData.np} asignado`)
    } else {
      toast.error('Error al crear el tema, intenta más tarde')
      console.log(error)
    }
  } finally {
    setPending(false)
  }
}
