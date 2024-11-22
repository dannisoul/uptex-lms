import { crearRecurso } from '@/actions/recursos/crear'
export async function post (
  formData,
  setPending,
  handleModal,
  toast,
  updateRecursos,
  idCurso,
  idUnidad,
  idTema
) {
  try {
    setPending(true)
    const newFormData = new FormData()

    newFormData.append('idCurso', idCurso)
    newFormData.append('idUnidad', idUnidad)
    newFormData.append('idTema', idTema)
    newFormData.append('recurso', formData.recurso)
    newFormData.append('nombre', formData.recurso.name)
    newFormData.append('mimetype', formData.recurso.type)

    // solicita guardar el recurso en el servidor
    const fileResponse = await fetch(`${process.env.PUBLIC_URL}/api/recursos`, {
      method: 'POST',
      body: newFormData
    })
    if (!fileResponse.ok) {
      throw new Error(
        `Status: ${fileResponse.status}, StatusText: ${fileResponse.statusText}`
      )
    }
    const fileData = await fileResponse.json()
    if (fileData.error) throw new Error(fileData.errorCode)
    newFormData.set('recurso', fileData.baseName)

    // inserta recurso en la base de datos
    const response = await crearRecurso(newFormData)
    if (response.error) throw new Error(response.errorCode)
    newFormData.append('idCurso', response.insertId)

    updateRecursos({ type: 'addRecurso', payload: response.newRecord })
    toast.success('Recurso subido correctamente')
    handleModal()
  } catch (error) {
    console.log(error)
    toast.error('Error al subir el recurso, intenta más tarde')
  } finally {
    setPending(false)
  }
}
