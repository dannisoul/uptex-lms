'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Grupo } from '@/models/Grupo'
import { revalidatePath } from 'next/cache'

export async function actualizarGrupo (idGrupo, fields) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Grupo.actualizarGrupo(idGrupo, ...fields)
  if (!response.error) revalidatePath('/mis_grupos/:id*')
  return response
}
