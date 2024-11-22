'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Unidad } from '@/models/Unidad'
import { revalidatePath } from 'next/cache'

export async function crearUnidad (unidad) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Unidad.crearUnidad(unidad.np, unidad.nombre, unidad.idCurso)
  if (!response.error) revalidatePath('/mis_cursos/:id*')
  return response
}
