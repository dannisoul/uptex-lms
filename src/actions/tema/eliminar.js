'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Tema } from '@/models/Tema'
import { removeDir } from '@/helpers/removeDir'
import { revalidatePath } from 'next/cache'

export async function eliminarTema ({ idCurso, idUnidad, idTema }) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/docentes/${session.user.idUsuario}/cursos/${idCurso}/${idUnidad}/${idTema}`
  const isDeleted = await removeDir(path)
  if (isDeleted.error) return { error: true, errorCode: 'NO_DELETED', affectedRows: 0, deletedId: 0 }
  const response = await Tema.eliminarTema(idTema)
  if (!response.error) revalidatePath('/mis_cursos/:id*')
  return response
}
