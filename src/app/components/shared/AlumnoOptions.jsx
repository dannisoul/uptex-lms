import Link from 'next/link'
import { IconAsignacionFilled, IconCalificacionFilled, IconCursoFilled, IconSearchFilled } from '../icons/IconsFIlled'

export function AlumnoOptions () {
  return (
    <nav className='lg:hidden block'>
      <ul className='flex flex-col gap-2 text-[12px] font-medium mt-2 border-t-2 border-alpha-bg/20 pt-4'>
        <li className='bg-alpha-bg/20 p-2 rounded-lg text-secondary-accent dark:text-white'>
          <Link href='/mis_cursos' className='flex gap-1 items-center'>
            <IconCursoFilled width={24} height={24} />
            <span className='text-black dark:text-white'>Mis cursos</span>
          </Link>
        </li>
        <li className='bg-alpha-bg/20 p-2 rounded-lg text-secondary-accent dark:text-white'>
          <Link href='/explorar_cursos' className='flex gap-1 items-center'>
            <IconSearchFilled width={24} height={24} />
            <span className='text-black dark:text-white'>Explorar cursos</span>
          </Link>
        </li>
        <li className='bg-alpha-bg/20 p-2 rounded-lg text-secondary-accent dark:text-white'>
          <Link href='#' className='flex gap-1 items-center'>
            <IconCalificacionFilled width={24} height={24} />
            <span className='text-black dark:text-white'>Mis calificaciones</span>
          </Link>
        </li>
        <li className='bg-alpha-bg/20 p-2 rounded-lg text-secondary-accent dark:text-white'>
          <Link href='#' className='flex gap-1 items-center'>
            <IconAsignacionFilled width={24} height={24} />
            <span className='text-black dark:text-white'>Mis asignaciones</span>
          </Link>
        </li>
      </ul>
    </nav>
  )
}
