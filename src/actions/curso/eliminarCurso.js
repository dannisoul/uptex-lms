'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Curso } from '@/models/Curso'
import { revalidatePath } from 'next/cache'
import { deleteMultipleObjects } from '@/helpers/bucketGCS'

/* accion que elimina el curso y todas sus entidades relacionadas */
export async function eliminarCurso (idCurso) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  // const path = `${process.env.NEXT_PUBLIC_FOLDER}/uploads/${session.user.idUsuario}/cursos/${idCurso}`
  const path = `uploads/${session.user.idUsuario}/cursos/${idCurso}`
  const deleteResponse = await deleteMultipleObjects(path)
  if (deleteResponse.error) return deleteResponse
  const response = await Curso.eliminarCurso(idCurso)
  if (!response.error) {
    revalidatePath('/mis_cursos')
    response.redirect = true
    response.url = '/mis_cursos'
  }
  return response
}
