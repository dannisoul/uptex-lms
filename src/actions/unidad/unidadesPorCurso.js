'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Unidad } from '@/models/Unidad'

export async function unidadesPorCurso (idCurso) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Unidad.unidadesPorCurso(idCurso)
  return response
}
