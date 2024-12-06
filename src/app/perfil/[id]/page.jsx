import { obtenerHabilidadesPorDocente } from '@/actions/habilidad/obtenerHabilidadesPorDocente'
import { usuarioPorId } from '@/actions/usuario/usuarioPorId'
import { PerfilAlumno } from '@/app/components/perfil/PerfilAlumno'
import { PerfilDocente } from '@/app/components/perfil/PerfilDocente'

export default async function Perfil ({ params }) {
  const { usuario } = await usuarioPorId(params.id)
  const data = await getData(usuario.idRol, usuario.idUsuario)
  const page = getPage(usuario.idRol, { ...data, usuario })
  return (
    <main className='customSection max-w-[1200px] w-11/12 mx-auto pt-[120px] sm:pt-[150px] mb-16 overflow-hidden sm:overflow-visible'>
      {page}
    </main>
  )
}

function getPage (idRol, data) {
  switch (idRol) {
    case 1:{
      return null
    }
    case 2: {
      return <PerfilDocente data={data} />
    }
    case 3: {
      return <PerfilAlumno data={data} />
    }
    default:
      return null
  }
}

async function getData (rol, idUsuario) {
  switch (rol) {
    case 1: {
      return null
    }
    case 2: {
      const { misHabilidades } = await obtenerHabilidadesPorDocente(idUsuario)
      return { misHabilidades }
    }
    case 3: {
      return null
    }
  }
}
