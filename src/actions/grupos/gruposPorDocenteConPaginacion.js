'use server'
import { Grupo } from '@/models/Grupo'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function gruposPorDocenteConPaginacion (page, query) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Grupo.gruposPorDocenteConPaginacion(session?.user?.idUsuario, page, query)
  return response
}
