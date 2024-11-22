'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Curso } from '@/models/Curso'
import { revalidatePath } from 'next/cache'

/* accion que desactiva un curso */
export async function desactivarCurso (idCurso) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Curso.desactivarCurso(idCurso)
  if (!response.error) {
    revalidatePath('/mis_cursos')
    response.redirect = true
    response.url = '/mis_cursos'
  }
  return response
}
