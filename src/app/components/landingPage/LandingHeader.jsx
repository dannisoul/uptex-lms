'use client'

import Link from 'next/link'
import { MobileMenu } from './MobileMenu'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'

export function LandingHeader () {
  const pathname = usePathname()

  useEffect(() => {
    const intersectionObserver = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        document.querySelectorAll('a[data-section]').forEach(link => {
          if (link.dataset.section === entries[0].target.dataset.section) {
            link.classList.add('text-primary-accent', 'dark:text-dark-primary-accent')
          } else {
            link.classList.remove('text-primary-accent', 'dark:text-dark-primary-accent')
          }
        })
      }
    }, { threshold: 0.5 })

    intersectionObserver.observe(document.getElementById('inicio'))
    intersectionObserver.observe(document.getElementById('nuestra-oferta'))
    intersectionObserver.observe(document.getElementById('mision-vision'))
    intersectionObserver.observe(document.getElementById('caracteristicas'))

    return () => {
      intersectionObserver.disconnect()
    }
  }, [])

  return (
    <header className='flex fixed z-20 top-0 w-full bg-primary-bg dark:bg-dark-primary-bg justify-between items-center mx-auto font-semibold text-primary-text dark:text-dark-primary-text lg:px-24 px-8 py-8'>
      <MobileMenu />
      <nav className='hidden lg:block'>
        <ul className='flex gap-16'>
          <li><Link data-section='1' href='#inicio'>Inicio</Link></li>
          <li><Link data-section='2' href='#nuestra-oferta'>Oferta</Link></li>
          <li><Link data-section='3' href='#mision-vision'>Misión y Visión</Link></li>
          <li><Link data-section='4' href='#caracteristicas'>Caracteristicas</Link></li>
        </ul>
      </nav>
      <div className='flex gap-8 items-center'>
        <Link href='/login' className={(pathname === '/login') ? 'text-primary-accent dark:text-dark-primary-accent border-b-2 border-primary-accent dark:border-dark-primary-accent sm:text-base text-sm text-center' : 'bg-white dark:bg-dark-secondary-bg shadow-lg text-black dark:text-white sm:px-6 px-4 py-2 rounded-full sm:text-base text-sm text-center'}>Iniciar Sesión</Link>
        <Link href='/registro' className={(pathname === '/registro') ? 'text-primary-accent dark:text-dark-primary-accent border-b-2 border-primary-accent dark:border-dark-primary-accent sm:text-base text-sm text-center' : 'bg-white dark:bg-dark-secondary-bg shadow-lg text-black dark:text-white sm:px-6 px-4 py-2 rounded-full sm:text-base text-sm text-center'}>Registrate</Link>
      </div>
    </header>
  )
}
