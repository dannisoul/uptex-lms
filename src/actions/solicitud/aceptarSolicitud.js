'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Solicitud } from '@/models/Solicitud'

export async function aceptarSolicitud ({ idAlumno, idGrupo }) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Solicitud.aceptarSolicitud(idAlumno, idGrupo)
  return response
}
