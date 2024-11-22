import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { GruposDocente } from '../components/grupos/GruposDocentes'
import { Toast, showToast } from '../components/shared/Toaster'
import { cursosPorDocente } from '@/actions/grupos/cursoPorDocente'

export default async function MisGrupos () {
  const session = await getServerSession(authOptions)
  const { user } = session
  const { idRol } = user

  const { cursos } = await cursosPorDocente(user.idUsuario)
  const content = getContent(idRol, cursos, user, showToast)
  return (
    <main className='customSection max-w-[1200px] w-11/12 mx-auto pt-[120px] sm:pt-[150px] mb-16'>
      {content}
      <Toast />
    </main>
  )
}

function getContent (rol, cursos, user, showToastxd) {
  switch (rol) {
    case 1:{
      return null
    }
    case 2: {
      return <GruposDocente initialGrupos={[]} user={user} toast={showToastxd} cursos={cursos} />
    }
    case 3: {
      return null
    }
  }
}
