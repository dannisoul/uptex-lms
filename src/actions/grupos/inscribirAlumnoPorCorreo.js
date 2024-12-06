'use server'
import { Grupo } from '@/models/Grupo'
import { revalidatePath } from 'next/cache'

export async function inscribirAlumnoPorCorreo (correoAlumno, idGrupo) {
  const response = await Grupo.inscribirAlumnoPorCorreo(correoAlumno, idGrupo)
  if (!response.error) {
    revalidatePath('/mis_grupos/:id*')
  }
  return response
}

// 'use server'
// import { getServerSession } from 'next-auth'
// import { authOptions } from '@/app/api/auth/[...nextauth]/route'
// import { Usuario } from '@/models/Usuario'
// export async function inscribirAlumnoPorCorreo (correoAlumno, idGrupo) {
//   const session = await getServerSession(authOptions)
//   if (!session) return { error: true, description: 'Credenciales no válidas' }
//   const response = await Usuario.inscribirAlumnoPorCorreo(correoAlumno, idGrupo)
//   return response
// }