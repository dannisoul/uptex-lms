import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'
import { DocenteMenu } from './components/menu/DocenteMenu'
import { AlumnoMenu } from './components/menu/AlumnoMenu'
export default async function Home () {
  const session = await getServerSession(authOptions)
  const { idRol } = session.user
  const menu = getMenu(idRol)
  return (
    <main className='w-full'>
      {menu}
    </main>
  )
}

function getMenu (rol) {
  switch (rol) {
    case 1:{
      return null
    }
    case 2: {
      return <DocenteMenu />
    }
    case 3: {
      return <AlumnoMenu />
    }
  }
}
