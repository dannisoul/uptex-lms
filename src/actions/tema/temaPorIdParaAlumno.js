'use server'
import { Tema } from '@/models/Tema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function temaPorIdParaAlumno (idTema) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Tema.temaPorIdParaAlumno(idTema, session.user.idUsuario)
  return response
}
