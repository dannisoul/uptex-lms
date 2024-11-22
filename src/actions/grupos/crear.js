'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Grupo } from '@/models/Grupo'
import { revalidatePath } from 'next/cache'

export async function crearGrupo (data) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }

  const response = await Grupo.crearGrupo(
    data.nombre,
    data.codigo,
    data.inicio,
    data.cierre,
    data.idCurso
  )

  if (!response.error) revalidatePath('/tema/:id*')
  return response
}
