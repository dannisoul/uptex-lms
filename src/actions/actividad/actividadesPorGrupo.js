'use server'
import { Actividad } from '@/models/Actividad'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function actividadesPorGrupo (idGrupo, page) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Actividad.actividadesPorGrupo(idGrupo, page)
  return response
}
