'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Tema } from '@/models/Tema'
import { revalidatePath } from 'next/cache'

export async function crearTema (tema) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Tema.crearTema(tema.np, tema.nombre, tema.descripcion, tema.idUnidad)
  if (!response.error) revalidatePath('/mis_cursos:id*')
  return response
}
