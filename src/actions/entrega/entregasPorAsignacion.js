'use server'
import { Entrega } from '@/models/Entrega'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
export async function entregasPorAsignacion (idAsignacion, page) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  const response = await Entrega.entregasPorAsignacion(idAsignacion, page)
  return response
}
