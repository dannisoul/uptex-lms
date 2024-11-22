'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Recurso } from '@/models/Recurso'
import { revalidatePath } from 'next/cache'
export async function crearRecurso (data) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Recurso.crearRecurso(data.get('nombre'), data.get('recurso'), data.get('mimetype'), data.get('idTema'))
  if (!response.error) revalidatePath('/tema/:id*')
  return response
}
