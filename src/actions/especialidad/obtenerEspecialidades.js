'use server'
import { Especialidad } from '@/models/Especialidad'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function obtenerEspecialidades () {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Especialidad.obtenerEspecialidades()
  return response
}
