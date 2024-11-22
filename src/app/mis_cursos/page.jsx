import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { CursosDocente } from '../components/cursos/CursosDocente'
import { Toast, showToast } from '../components/shared/Toaster'
import { CursosAlumno } from '../components/cursos/CursosAlumno'

export default async function MisCursos () {
  const session = await getServerSession(authOptions)
  const { user } = session

  const content = getContent(user.idRol, user, showToast)
  return (
    <main className='customSection max-w-[1200px] w-11/12 mx-auto pt-[120px] sm:pt-[150px] mb-16'>
      {content}
      <Toast />
    </main>
  )
}

function getContent (rol, user) {
  switch (rol) {
    case 1:{
      return null
    }
    case 2: {
      return <CursosDocente initialCursos={[]} user={user} toast={showToast} />
    }
    case 3: {
      return <CursosAlumno initialCursos={[]} user={user} toast={showToast} />
    }
  }
}
