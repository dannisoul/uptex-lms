'use client'

import Hamburger from 'hamburger-react'
import Link from 'next/link'
import { useState } from 'react'

export function MobileMenu () {
  const [isOpen, setOpen] = useState(false)
  const visible = (!isOpen) ? 'hidden' : 'block'
  return (
    <>
      <div className='block lg:hidden'>
        <Hamburger direction='left' toggled={isOpen} toggle={setOpen} />
        <nav className={'absolute left-0 top-[112px] w-full transition-all duration-300 shadow-lg ' + visible}>
          <ul className='w-[95%] text-white mx-auto flex flex-col gap-1 bg-primary-bg dark:bg-dark-primary-bg'>
            <li><Link className='p-4 block text-primary-text dark:text-dark-primary-text rounded-lg' href='#inicio' onClick={() => setOpen(false)}>Inicio</Link></li>
            <li><Link className='p-4 block text-primary-text dark:text-dark-primary-text rounded-lg' href='#nuestra-oferta' onClick={() => setOpen(false)}>Nuestra Oferta</Link></li>
            <li><Link className='p-4 block text-primary-text dark:text-dark-primary-text rounded-lg' href='#mision-vision' onClick={() => setOpen(false)}>Misión y Visión</Link></li>
            <li><Link className='p-4 block text-primary-text dark:text-dark-primary-text rounded-lg' href='#caracteristicas' onClick={() => setOpen(false)}>Caracteristicas</Link></li>
          </ul>
        </nav>
      </div>
    </>
  )
}
