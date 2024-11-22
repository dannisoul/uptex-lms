import { AccountOptions } from './AccountOptions'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { DocenteNavbar } from './DocenteNavbar'
import { AlumnoNavBar } from './AlumnoNavbar'
import Link from 'next/link'
export async function Header () {
  const session = await getServerSession(authOptions)
  const { user } = session
  const navbar = getNavbar(user.idRol)
  return (
    <header className='flex fixed z-20 top-0 w-full bg-primary-bg dark:bg-dark-primary-bg justify-between items-center mx-auto font-semibold text-primary-text dark:text-dark-primary-text xl:px-24 lg:px-18 sm:px-8 py-8 px-4'>
      <header>
        <Link href='/'>
          <img className='w-[115px] dark:invert' src='/logos/uptex.webp' alt='' />
        </Link>
      </header>
      <nav className='lg:block hidden'>
        <ul className='flex gap-12 xl:text-base text-sm'>
          {navbar}
        </ul>
      </nav>
      <AccountOptions usuario={user} />
    </header>
  )
}

function getNavbar (rol) {
  switch (rol) {
    case 1:{
      return null
    }
    case 2:{
      return <DocenteNavbar />
    }
    case 3:{
      return <AlumnoNavBar />
    }
  }
}
