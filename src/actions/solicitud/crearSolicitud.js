'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Solicitud } from '@/models/Solicitud'
export async function crearSolicitud (data) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  console.log(data, session.user.idUsuario)
  const response = await Solicitud.crearSolicitud(session.user.idUsuario, data.codigo)
  return response
}
