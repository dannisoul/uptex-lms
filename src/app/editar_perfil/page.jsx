import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { Toast, showToast } from '@/app/components/shared/Toaster'
import { obtenerEspecialidadesLista } from '@/actions/especialidad/obtenerEspecialidadesLista'
import { obtenerHabilidadesLista } from '@/actions/habilidad/obtenerHabilidadesLista'
import { obtenerHabilidadesPorDocente } from '@/actions/habilidad/obtenerHabilidadesPorDocente'
import { usuarioPorId } from '@/actions/usuario/usuarioPorId'
import { EditarPerfilDocente } from '../components/perfil/EditarPerfilDocente'
import { EditarPerfilAlumno } from '../components/perfil/EditarPerfilAlumno'
export default async function Tema () {
  const session = await getServerSession(authOptions)
  const { user } = session
  const data = await getData(user)
  const page = getPage(session.user, data, showToast)

  return (
    <main className='customSection pt-[120px] sm:pt-[150px] mb-16 max-w-[1200px] w-11/12 mx-auto transition-all'>
      {page}
      <Toast />
    </main>
  )
}

function getPage (user, data) {
  switch (user.idRol) {
    case 1:{
      return null
    }
    case 2: {
      return <EditarPerfilDocente data={data} toast={showToast} />
    }
    case 3: {
      return <EditarPerfilAlumno data={data} toast={showToast} />
    }
    default:
      return null
  }
}

async function getData (user) {
  switch (user.idRol) {
    case 1: {
      return null
    }
    case 2: {
      const promises = [obtenerEspecialidadesLista(), obtenerHabilidadesLista(), obtenerHabilidadesPorDocente(user.idUsuario), usuarioPorId(user.idUsuario)]
      const [{ especialidades = [] }, { habilidades = [] }, { misHabilidades = [] }, { usuario }] = await Promise.all(promises)
      return { especialidades, habilidades, misHabilidades, usuario }
    }
    case 3: {
      const data = await usuarioPorId(user.idUsuario)
      return data
    }
  }
}
