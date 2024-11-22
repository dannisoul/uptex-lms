'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Curso } from '@/models/Curso'
import { revalidatePath } from 'next/cache'

export async function registrarImagen (data) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }

  const response = await Curso.registrarImagen(
    data.get('idCurso'),
    data.get('imagen')
  )

  if (!response.error) revalidatePath('/mis_cursos')
  return response
}
