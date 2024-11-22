'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Curso } from '@/models/Curso'
import { revalidatePath } from 'next/cache'

/* accion que activa un curso nuevamente */
export async function activarCurso (idCurso) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Curso.activarCurso(idCurso)
  if (!response.error) revalidatePath('/mis_cursos')
  return response
}
