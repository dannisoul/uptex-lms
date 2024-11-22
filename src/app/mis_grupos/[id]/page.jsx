import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { Toast, showToast } from '@/app/components/shared/Toaster'
import { grupoPorId } from '@/actions/grupos/grupoPorId'
import { cursosPorDocente } from '@/actions/grupos/cursoPorDocente'
import { unidadesPorCurso } from '@/actions/unidad/unidadesPorCurso'
import { GrupoDocente } from '@/app/components/grupos/GrupoDocente'
import { NotFound } from '@/app/components/shared/NotFound'

export default async function Grupo ({ params }) {
  const session = await getServerSession(authOptions)
  const { user } = session
  const idGrupo = params.id
  const data = await getData(idGrupo, user.idUsuario)
  const page = getPage(user.idRol, showToast, data)

  return (
    <>
      {data.grupo
        ? (
          <main className='customSection pt-[120px] sm:pt-[150px] mb-16 max-w-[1200px] w-11/12 mx-auto transition-all'>
            {page}
            <Toast />
          </main>
          )
        : (
            page
          )}
    </>
  )
}
function getPage (rol, showToast, data) {
  switch (rol) {
    case 1: {
      return null
    }
    case 2: {
      if (!data.grupo) return <NotFound />
      return (
        <GrupoDocente
          initialGrupo={data?.grupo}
          toast={showToast}
          cursos={data?.cursos}
          unidades={data?.unidades}
          temas={data?.temas}
          idGrupo={data?.grupo?.idGrupo}
        />
      )
    }
    case 3: {
      return null
    }
    default:
      return null
  }
}

async function getData (idGrupo, idUsuario) {
  const { grupo } = await grupoPorId(idGrupo, idUsuario)
  if (!grupo) return { grupo }
  const { cursos } = await cursosPorDocente(idUsuario)
  const { unidades = [], temas = [] } = await unidadesPorCurso(grupo.idCurso)

  return { grupo, cursos, unidades, temas }
}
