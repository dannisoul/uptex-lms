'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Unidad } from '@/models/Unidad'
import { revalidatePath } from 'next/cache'
import { deleteMultipleObjects } from '@/helpers/bucketGCS'

export async function eliminarUnidad ({ idCurso, idUnidad }) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  // const path = `${process.env.NEXT_PUBLIC_FOLDER}/uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}`
  const path = `uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}`
  const deleteResponse = await deleteMultipleObjects(path)
  if (deleteResponse.error) return deleteResponse
  const response = await Unidad.eliminarUnidad(idUnidad)
  if (!response.error) revalidatePath('/mis_cursos/:id*')
  return response
}
