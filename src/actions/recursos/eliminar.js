'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Recurso } from '@/models/Recurso'
import { deleteFile } from '@/helpers/deleteFile'
import { revalidatePath } from 'next/cache'

export async function eliminarRecurso (recurso) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/docentes/${session.user.idUsuario}/cursos/${recurso.idCurso}/${recurso.idUnidad}/${recurso.idTema}`
  const isDeleted = await deleteFile(path, recurso.ruta)
  if (isDeleted.error) return { error: true, errorCode: 'NO_DELETED', affectedRows: 0, deletedId: 0 }
  const response = await Recurso.eliminarRecurso(recurso.idRecurso)
  if (!response.error) revalidatePath('/tema/:id*')
  return response
}
