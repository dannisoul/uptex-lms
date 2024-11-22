'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Curso } from '@/models/Curso'

export async function crearCurso (data) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const { user: { idUsuario } } = session

  const response = await Curso.crearCurso(
    data.get('nombre'),
    data.get('descripcion'),
    data.get('idCategoria'),
    data.get('idNivel'),
    data.get('cursoInterno'),
    idUsuario
  )

  return response
}
