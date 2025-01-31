'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Recurso } from '@/models/Recurso'
import { revalidatePath } from 'next/cache'
import { deleteObject } from '@/helpers/bucketGCS'
import { deleteFile } from '@/helpers/fileSystem'

export async function eliminarRecurso (recurso) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }

  const path = process.env.NEXT_PUBLIC_FOLDER
    ? `${process.env.NEXT_PUBLIC_FOLDER}/${session.user.idUsuario}/cursos/${recurso.idCurso}/${recurso.idUnidad}/${recurso.idTema}`
    : `uploads/${session.user.idUsuario}/cursos/${recurso.idCurso}/${recurso.idUnidad}/${recurso.idTema}/${recurso.nombre}`

  let deleteResponse = null

  if (process.env.NEXT_PUBLIC_FOLDER) {
    deleteResponse = await deleteFile(path, recurso.ruta)
  } else {
    deleteResponse = await deleteObject(path)
  }

  if (deleteResponse.error) return Response.json(deleteResponse)
  const response = await Recurso.eliminarRecurso(recurso.idRecurso)
  if (!response.error) revalidatePath('/tema/:id*')
  return response
}
