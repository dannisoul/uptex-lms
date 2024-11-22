'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Unidad } from '@/models/Unidad'
import { revalidatePath } from 'next/cache'

export async function actualizarUnidad (idUnidad, fields) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Unidad.actualizarUnidad(idUnidad, ...fields)
  if (!response.error) revalidatePath('/mis_cursos/:id*')
  return response
}
