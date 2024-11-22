'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Usuario } from '@/models/Usuario'

export async function eliminarSolicitud ({ idAlumno, idGrupo }) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Usuario.eliminarSolicitud(idAlumno, idGrupo)
  return response
}
