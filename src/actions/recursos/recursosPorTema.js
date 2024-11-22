'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Recurso } from '@/models/Recurso'
export async function recursosPorTema (idTema) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Recurso.recursosPorTema(idTema)
  return response
}
