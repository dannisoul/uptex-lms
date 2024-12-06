import { cursoPorId } from '@/actions/curso/cursoPorId'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { CursoDocente } from '@/app/components/cursos/CursoDocente'
import { getServerSession } from 'next-auth'
import { Toast, showToast } from '@/app/components/shared/Toaster'
import { unidadesPorCurso } from '@/actions/unidad/unidadesPorCurso'
import { CursoAlumno } from '@/app/components/cursos/CursoAlumno'
import { grupoPorIdParaAlumno } from '@/actions/grupos/grupoPorIdParaAlumno'
import { CursoPreview } from '@/app/components/cursos/CursoPreview'
import { gruposRelacionados } from '@/actions/grupos/gruposRelacionados'
import { NotFound } from '@/app/components/shared/NotFound'
export default async function Curso ({ params }) {
  const session = await getServerSession(authOptions)
  const { user } = session
  const data = await getData(user, user.idRol, params.id)
  const page = await getPage(session.user.idRol, showToast, data)
  return (
    <>
      {data.curso
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

async function getPage (rol, showToast, data) {
  switch (rol) {
    case 1: {
      return null
    }
    case 2: {
      if (!data.curso) return <NotFound />
      return (
        <CursoDocente
          initialCurso={data.curso}
          toast={showToast}
          initialUnidades={data.unidades}
          initialTemas={data.temas}
        />
      )
    }
    case 3: {
      if (!data.curso) return <NotFound />
      if (data.inscrito) {
        const { grupos } = await gruposRelacionados(
          data.curso.idCategoria,
          data.curso.idCurso
        )
        return (
          <CursoAlumno
            curso={data.curso}
            unidades={data.unidades}
            temas={data.temas}
            grupos={grupos}
          />
        )
      } else {
        const { grupos } = await gruposRelacionados(
          data.curso.idCategoria,
          data.curso.idCurso
        )
        return (
          <CursoPreview
            curso={data.curso}
            unidades={data.unidades}
            temas={data.temas}
            grupos={grupos}
          />
        )
      }
    }
    default:
      return null
  }
}

async function getData (user, rol, idCurso) {
  switch (rol) {
    case 1: {
      return null
    }
    case 2: {
      const { curso } = await cursoPorId(idCurso, user.idUsuario)
      if (!curso) return { curso }
      const { unidades = [], temas = [] } = await unidadesPorCurso(
        idCurso,
        user.idUsuario
      )
      return { curso, unidades, temas }
    }
    case 3: {
      const { curso, unidades, temas, inscrito } = await grupoPorIdParaAlumno(
        idCurso,
        user.idUsuario
      )
      return { curso, unidades, temas, inscrito }
    }
  }
}
