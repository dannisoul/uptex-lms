'use server'
import { Habilidad } from '@/models/Habilidad'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function obtenerHabilidadesLista () {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Habilidad.obtenerHabilidadesLista()
  return response
}
