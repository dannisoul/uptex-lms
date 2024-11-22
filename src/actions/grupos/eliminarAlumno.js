'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Grupo } from '@/models/Grupo'

export async function eliminarAlumno ({ idAlumno, idGrupo }) {
  console.log(idAlumno, idGrupo)
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Grupo.eliminarAlumno(idAlumno, idGrupo)
  return response
}
