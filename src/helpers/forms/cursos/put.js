import { actualizarCurso } from '@/actions/curso/actualizar'
export async function put (
  formData,
  idCurso,
  setPending,
  handleModal,
  toast,
  updateCurso,
  initialState
) {
  const newData = {
    ...formData,
    idCategoria: formData.idCategoria.value,
    idNivel: formData.idNivel.value,
    cursoInterno: Number(formData.cursoInterno)
  }
  const oldData = {
    ...initialState,
    idCategoria: initialState.idCategoria,
    idNivel: initialState.idNivel,
    cursoInterno: Number(initialState.cursoInterno)
  }
  const changedData = {}

  let fileHasChanged = false
  Object.entries(newData).forEach(([key, value]) => {
    if (value !== oldData[key]) {
      changedData[key] = value
      if (key === 'imagen') fileHasChanged = true
    }
  })

  if (Object.keys(changedData).length === 0) return
  try {
    setPending(true)
    const newFormData = new FormData()
    Object.entries(changedData).forEach(([key, value]) => {
      newFormData.append(key, value)
    })

    if (fileHasChanged) {
      newFormData.append('fileToRemove', initialState.imagen)
      newFormData.append('idCurso', idCurso)
      const fileResponse = await fetch(
        'http://localhost:3000/api/cursos/images',
        {
          method: 'PUT',
          body: newFormData
        }
      )
      if (!fileResponse.ok) {
        throw new Error(
          `Status: ${fileResponse.status}, StatusText: ${fileResponse.statusText}`
        )
      }
      const fileData = await fileResponse.json()
      newFormData.set('imagen', fileData.baseName)
      newFormData.delete('idCurso')
      newFormData.delete('fileToRemove')
    }
    const response = await actualizarCurso(
      idCurso,
      Array.from(newFormData.entries())
    )
    if (response.error) throw new Error(response.errorCode)
    updateCurso(response.editedRecord)
    toast.success('Curso creado correctamente')
    handleModal()
  } catch (error) {
    console.log(error)
    toast.error('Error al crear el curso, intenta más tarde')
  } finally {
    setPending(false)
  }
}
