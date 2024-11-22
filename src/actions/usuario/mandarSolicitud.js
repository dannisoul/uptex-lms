'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Usuario } from '@/models/Usuario'
export async function mandarSolicitud (data) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  console.log(data, session.user.idUsuario)
  const response = await Usuario.mandarSolicitud(session.user.idUsuario, data.codigo)
  return response
}
