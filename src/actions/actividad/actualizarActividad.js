'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { revalidatePath } from 'next/cache'
import { Actividad } from '@/models/Actividad'

/* esto lo puedes copiar y pegar el codigo va a ser muy similar */
export async function actualizarActividad (idActividad, fields) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Actividad.actualizarActividad(idActividad, ...fields)
  if (!response.error) {
    revalidatePath('/asignaciones/:id*')
    revalidatePath('/cuestionarios/:id*')
  }
  return response
}
