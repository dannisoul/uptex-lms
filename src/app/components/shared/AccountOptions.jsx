'use client'
import { IconUserFilled, IconMoonFilled } from '@tabler/icons-react'
import { IconExitFilled, IconEditFilled, IconSunFilled } from '../icons/IconsFIlled'
import Link from 'next/link'
import { useEffect, useState, useContext } from 'react'
import { userDarkMode } from '@/hooks/useDarkMode'
import { signOut } from 'next-auth/react'
import { DocenteNavbar2 } from './DocenteNavbar2'
import { AlumnoNavBar2 } from './AlumnoNavbar2'

import { UserContext } from '@/providers/UserProvider'

export function AccountOptions ({ usuario }) {
  const [display, setDisplay] = useState(false)
  const { darkMode, handleDarkModeChange } = userDarkMode()
  const [pending, setPending] = useState(false)
  const navbar = getNavbar(usuario.idRol)
  const { avatar } = useContext(UserContext)

  // const avatarURL = `/api/usuarios/images?idUsuario=${usuario?.idUsuario}&idImagen=${avatar}`
  const avatarURL = process.env.NEXT_PUBLIC_BUCKET + `/uploads/${usuario.idUsuario}/perfil/` + avatar

  useEffect(() => {
    function hideAccountOptions (e) {
      if (!e.target.matches('#accountOptions') && !e.target.matches('#accountOptions *') &&
      !e.target.matches('#accountOptionsToggle') && !e.target.matches('#accountOptionsToggle *')) {
        setDisplay(false)
      }
    }
    document.addEventListener('mousedown', hideAccountOptions)
    return () => {
      document.removeEventListener('mousedown', hideAccountOptions)
    }
  }, [])

  return (
    <label className='lg:min-w-[115px] flex items-center justify-center relative'>
      <button id='accountOptionsToggle' onClick={() => setDisplay(!display)} className={' text-white rounded-full relative cursor-pointer ' + (avatar ? 'shadow-xl' : 'p-1 bg-black')}>
        {
          avatar
            ? <img className='w-[42px] h-[42px] rounded-full object-cover' src={avatarURL} />
            : <IconUserFilled width={28} height={28} />

        }
      </button>
      {display &&
        <div id='accountOptions' className='animate-fade animate-duration-200 absolute bg-white dark:bg-dark-secondary-bg right-0 lg:right-12 top-[110%] rounded-xl shadow-lg p-4 min-w-[200px] fade-in cursor-default'>
          <header className='border-b border-primary-accent dark:border-dark-primary-accent pb-2 mb-2'>
            <Link href={`/perfil/${usuario.idUsuario}`} className='text-primary-accent dark:text-dark-primary-accent text-[14px] font-semibold'>{`${usuario.nombre} ${usuario.paterno}`}</Link>
          </header>
          <ul className='flex flex-col gap-2 text-[12px] font-medium pb-2'>
            <li className='bg-alpha-bg/20 p-2 rounded-lg text-secondary-accent dark:text-white'>
              <Link href='/editar_perfil' className='flex gap-1 items-center'>
                <IconEditFilled width={24} height={24} />
                <span className='text-black dark:text-white'>Editar información</span>
              </Link>
            </li>
            <li className='bg-alpha-bg/20 p-2 rounded-lg text-secondary-accent dark:text-white'>
              <label className='flex gap-1 items-center w-full h-full cursor-pointer'>
                <input type='checkbox' className='hidden' checked={darkMode} onChange={() => handleDarkModeChange(!darkMode)} />
                {darkMode
                  ? <IconSunFilled width={24} height={24} />
                  : <IconMoonFilled width={24} height={24} />}
                <span className='text-black dark:text-white'>{darkMode ? 'Modo claro' : 'Modo oscuro'}</span>
              </label>
            </li>
            <li className='bg-secondary-accent p-2 rounded-lg text-white'>
              <button
                onClick={async () => {
                  try {
                    setPending(true)
                    await signOut()
                  } catch (error) {
                    console.log(error)
                  } finally {
                    setPending(false)
                  }
                }} className='flex gap-1 items-center w-full h-full'
              >
                <IconExitFilled width={24} height={24} />
                {
                  !pending
                    ? <span className='text-white'>Cerrar sesión</span>
                    : <span className='text-white flex gap-1 items-center'>Cerrando sesión <img src='/forms/loading.svg' className='w-4  animate-spin' /></span>
                }
              </button>
            </li>
          </ul>
          {navbar}
        </div>}
    </label>
  )
}

function getNavbar (rol) {
  switch (rol) {
    case 1:{
      return null
    }
    case 2:{
      return <DocenteNavbar2 />
    }
    case 3:{
      return <AlumnoNavBar2 />
    }
  }
}
