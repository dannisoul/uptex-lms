'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Grupo } from '@/models/Grupo'
import { revalidatePath } from 'next/cache'

export async function eliminarGrupo (idGrupo) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Grupo.eliminarGrupo(idGrupo)
  if (!response.error) {
    revalidatePath('/mis_grupos')
    response.redirect = true
    response.url = '/mis_grupos'
  }
  return response
}
