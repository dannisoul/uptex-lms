'use server'
import { Habilidad } from '@/models/Habilidad'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function obtenerHabilidadesPorUsuario (idUsuario) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Habilidad.obtenerHabilidadesPorUsuario(idUsuario)
  return response
}
