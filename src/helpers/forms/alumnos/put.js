import { actualizarAlumno } from '@/actions/usuario/actualizarAlumno'

export async function put (prevFormData, formData, toast, updatePrevFormData, setPending, updateAvatar, updateJWT) {
  const oldData = { ...prevFormData, nacionalidad: prevFormData.nacionalidad.value }
  const newData = { ...formData, nacionalidad: formData.nacionalidad.value }
  const changedData = {}
  let hasAvatarChange = false
  Object.entries(oldData).forEach(([key, value]) => {
    if (value !== newData[key]) {
      changedData[key] = newData[key]
      if (key === 'avatar') hasAvatarChange = true
    }
  })

  if (Object.values(changedData).length === 0) return

  try {
    setPending(true)
    const newFormData = new FormData()
    Object.entries(changedData).forEach(([key, value]) => {
      newFormData.append(key, value)
    })

    if (hasAvatarChange) {
      newFormData.append('fileToRemove', oldData.avatar)
      const fileResponse = await fetch('http://localhost:3000/api/usuarios/images', {
        method: 'POST',
        body: newFormData
      })

      if (!fileResponse.ok) throw new Error(`Status: ${fileResponse.status}, StatusText: ${fileResponse.statusText}`)
      const fileData = await fileResponse.json()
      updateAvatar(fileData.baseName)
      updateJWT({ avatar: fileData.baseName })
      newFormData.set('avatar', fileData.baseName)
      newFormData.delete('fileToRemove')
    }
    const response = await actualizarAlumno(Array.from(newFormData.entries()))
    updatePrevFormData(formData)
    toast && toast.success('Información actualizada')
    if (response.error) throw new Error(response.errorCode)
  } catch (error) {
    if (error.message === 'ER_DUP_ENTRY') {
      toast && toast.error('El correo que ingresaste ya esta registrado')
    } else {
      toast && toast.error('Error al actualizar datos, intenta más tarde')
    }
  } finally {
    setPending(false)
  }
}
