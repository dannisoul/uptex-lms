'use server'
import { Curso } from '@/models/Curso'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function cursosPorDocenteConPaginacion (page, query) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Curso.cursosPorDocenteConPaginacion(session?.user?.idUsuario, page, query)
  return response
}
