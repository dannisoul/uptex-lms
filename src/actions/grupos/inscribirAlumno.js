'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Grupo } from '@/models/Grupo'
export async function inscribirAlumno (data) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Grupo.inscribirAlumno(session.user.idUsuario, data.codigo)
  return response
}
