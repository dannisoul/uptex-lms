'use server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Actividad } from '@/models/Actividad'

export async function crearActividad (data) {
  const session = await getServerSession(authOptions)
  if (!session) return { error: true, description: 'Credenciales no válidas' }
  console.log(data)
  const response = await Actividad.crearActividad(
    data.nombre,
    data.tipo,
    data.indicaciones,
    data.fecha_cierre,
    data.extemporaneo,
    data.puntaje,
    data.idGrupo
  )

  return response
}
