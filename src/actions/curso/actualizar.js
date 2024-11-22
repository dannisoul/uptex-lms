'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Curso } from '@/models/Curso'
import { revalidatePath } from 'next/cache'

/* esto lo puedes copiar y pegar el codigo va a ser muy similar */
export async function actualizarCurso (idCurso, fields) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Curso.actualizarCurso(idCurso, ...fields)
  if (!response.error) revalidatePath('/mis_cursos/:id*')
  return response
}
