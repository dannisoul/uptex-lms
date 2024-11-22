'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Curso } from '@/models/Curso'
import { removeDir } from '@/helpers/removeDir'
import { revalidatePath } from 'next/cache'

/* accion que elimina el curso y todas sus entidades relacionadas */
export async function eliminarCurso (idCurso) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const path = `${process.env.UPLOAD_FOLDER_PREFIX}/uploads/docentes/${session.user.idUsuario}/cursos/${idCurso}`
  const isDeleted = await removeDir(path)
  if (isDeleted.error) return { error: true, errorCode: 'NO_DELETED', affectedRows: 0, deletedId: 0 }
  const response = await Curso.eliminarCurso(idCurso)
  if (!response.error) {
    revalidatePath('/mis_cursos')
    response.redirect = true
    response.url = '/mis_cursos'
  }
  return response
}
