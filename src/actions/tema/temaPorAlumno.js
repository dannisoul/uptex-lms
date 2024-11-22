'use server'
import { Tema } from '@/models/Tema'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function temaPorAlumno (idTema) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Tema.temaPorAlumno(idTema, session.user.idUsuario)
  return response
}
