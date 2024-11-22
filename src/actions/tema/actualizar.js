'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Tema } from '@/models/Tema'
import { revalidatePath } from 'next/cache'
export async function actualizarTema (idTema, fields) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Tema.actualizarTema(idTema, ...fields)
  if (!response.error) revalidatePath('/mis_cursos/:id*')
  return response
}
