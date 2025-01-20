import { crearCurso } from '@/actions/curso/crearCurso'
import { registrarImagen } from '@/actions/curso/registrarImagen'
export async function post (
  formData,
  setPending,
  handleModal,
  toast,
  updateCursos
) {
  try {
    setPending(true)
    const data = {
      ...formData,
      idCategoria: formData.idCategoria.value,
      idNivel: formData.idNivel.value,
      cursoInterno: Number(formData.cursoInterno)
    }
    const newFormData = new FormData()

    Object.entries(data).forEach(([key, value]) => {
      newFormData.append(key, value)
    })

    // inserta curso en la base de datos
    const response = await crearCurso(newFormData)
    if (response.error) throw new Error(response.errorCode)
    newFormData.append('idCurso', response.insertId)

    // con el id del curso crea la carpeta y guarda la imagen del curso
    const fileResponse = await fetch(
      `${(process.env.NEXT_PUBLIC_URL) || 'https://uptex-lms-765271791469.us-central1.run.app'}/api/cursos/images`,
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

    // si la imagen se guarda correctamente actualiza la referencia de la imagen en al base de datos
    const updatedResponse = await registrarImagen(newFormData)
    if (response.error) throw new Error(response.errorCode)
    console.log(updatedResponse.newRecord)
    updateCursos({ type: 'addCurso', payload: updatedResponse.newRecord })
    toast.success('Curso creado correctamente')
    handleModal()
  } catch (error) {
    console.log(error)
    toast.error('Error al crear el curso, intenta más tarde')
  } finally {
    setPending(false)
  }
}
