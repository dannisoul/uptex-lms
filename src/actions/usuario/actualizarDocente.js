'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Usuario } from '@/models/Usuario'
import { revalidatePath } from 'next/cache'

export async function actualizarDocente (fields) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Usuario.actualizarDocente(session.user.idUsuario, ...fields)
  if (!response.error) revalidatePath('/editar_perfil')
  return response
}
