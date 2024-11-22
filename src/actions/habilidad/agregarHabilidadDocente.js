'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Habilidad } from '@/models/Habilidad'
import { revalidatePath } from 'next/cache'
export async function agregarHabilidadDocente (idHabilidad) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Habilidad.agregarHabilidadDocente(session.user.idUsuario, idHabilidad)
  if (!response.error) revalidatePath('/perfil/:id*')
  return response
}
