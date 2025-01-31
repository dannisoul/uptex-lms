'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Tema } from '@/models/Tema'
import { revalidatePath } from 'next/cache'
import { deleteMultipleObjects } from '@/helpers/bucketGCS'

export async function eliminarTema ({ idCurso, idUnidad, idTema }) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  // const path = `${process.env.NEXT_PUBLIC_FOLDER}/uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`
  const path = `uploads/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`
  const deleteReponse = await deleteMultipleObjects(path)
  if (deleteReponse.error) return { error: true, errorCode: 'NO_DELETED', affectedRows: 0, deletedId: 0 }
  const response = await Tema.eliminarTema(idTema)
  if (!response.error) revalidatePath('/mis_cursos/:id*')
  return response
}
