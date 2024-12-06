'use server'
import { Solicitud } from '@/models/Solicitud'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function solicitudesPorGrupoConPaginacion (idGrupo, page) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Solicitud.solicitudesPorGrupoConPaginacion(idGrupo, page)
  return response
}
