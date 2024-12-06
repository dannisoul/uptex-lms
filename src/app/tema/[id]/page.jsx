import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { TemaDocente } from '@/app/components/tema/TemaDocente'
import { temaPorId } from '@/actions/tema/temaPorId'
import { Toast, showToast } from '@/app/components/shared/Toaster'
import { recursosPorTema } from '@/actions/recursos/recursosPorTema'
import { TemaAlumno } from '@/app/components/tema/TemaAlumno'
import { temaPorIdParaAlumno } from '@/actions/tema/temaPorIdParaAlumno'
import { NotFound } from '@/app/components/shared/NotFound'
export default async function Tema ({ params }) {
  const idTema = params.id
  const session = await getServerSession(authOptions)
  const { user } = session
  const data = await getData(user.idRol, idTema)
  const page = getPage(session.user.idRol, data, showToast)

  return (
    <>
      {data.tema
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

function getPage (rol, data, toast) {
  switch (rol) {
    case 1: {
      return null
    }
    case 2: {
      if (!data.tema) return <NotFound />
      return (
        <TemaDocente
          tema={data.tema}
          toast={toast}
          initialRecursos={data.recursos}
        />
      )
    }
    case 3: {
      if (!data.tema) return <NotFound />
      return <TemaAlumno tema={data.tema} recursos={data.recursos} />
    }
    default:
      return null
  }
}

async function getData (rol, idTema) {
  switch (rol) {
    case 1: {
      return null
    }
    case 2: {
      const { tema } = await temaPorId(idTema)
      if (!tema) return { tema }
      const { recursos } = await recursosPorTema(idTema)
      return { tema, recursos }
    }
    case 3: {
      const { tema } = await temaPorIdParaAlumno(idTema)
      if (!tema) return { tema }
      const { recursos } = await recursosPorTema(idTema)
      return { tema, recursos }
    }
  }
}
