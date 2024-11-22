'use server'
import { Grupo } from '@/models/Grupo'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function grupoPorId (idGrupo, idDocente) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Grupo.grupoPorId(idGrupo, idDocente)
  return response
}
