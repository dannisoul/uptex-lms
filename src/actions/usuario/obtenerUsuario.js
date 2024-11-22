'use server'
import { Usuario } from '@/models/Usuario'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function obtenerUsuario (idUsuario) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Usuario.obtenerUsuario(idUsuario)
  return response
}
