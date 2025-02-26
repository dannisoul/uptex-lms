'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Actividad } from '@/models/Actividad'
export async function actividadPorId (idActividad) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Actividad.actividadPorId(idActividad)
  return response
}
