import React from 'react'
import { IconFacebook, IconInstagram, IconTwitter } from '../icons/IconsFIlled'
import Link from 'next/link'

export function PerfilAlumno (data) {
  const usuario = data.data.usuario
  const avatar = usuario.avatar ? `/api/usuarios/images/?idAlumno=${usuario.idUsuario}&idImagen=${usuario.avatar}` : '/avatar/avatar_placeholder.jpg'
  return (
    <section className='relative select-none'>
      <img className='absolute top-0 right-0' src='/landingPage/bubbles.svg' alt='' />
      <div className='flex gap-4 justify-between relative'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl md:text-4xl font-bold text-primary-accent line-clamp-2'>{`${usuario.nombre} ${usuario.paterno} ${usuario.materno}`}</h1>
          <h2 className='text-xl font-semibold text-secondary-accent mt-1 dark:text-dark-secondary-accent'>
            {
                usuario.genero === 'M' ? 'Alumno' : 'Alumna'
            }
          </h2>
          <Link href={`mailto:${usuario.correo}`} target='_blank' rel='noreferrer' className='font-medium text-primary-text dark:text-dark-primary-text flex items-center gap-1 hover:text-primary-accent transition-all text-sm sm:text-base'>{usuario.correo}</Link>
        </div>
        <img src={avatar} className='sm:w-[150px] md:w-[250px] w-[100px] sm:h-[150px] md:h-[250px] h-[100px] rounded-[25px] object-cover' alt='' />
      </div>
      <div className='flex flex-col gap-8 relative mt-8'>
        <h3 className='font-bold text-primary-text dark:text-dark-primary-text relative left-8 before:w-6 before:h-1 before:bg-primary-text before:-left-8 before:absolute before:rounded-xl before:top-[50%] before:translate-y-[-50%]'>Sobre Mí</h3>
        <div className='text-primary-tex dark:text-dark-primary-text gap-12 sm:text-base text-sm'>
          <p>{usuario.descripcion === null ? 'Sin información para mostrar' : usuario.descripcion}</p>
        </div>
      </div>
      <div className='flex flex-col gap-8 relative mt-8'>
        <h3 className='font-bold text-primary-text dark:text-dark-primary-text relative left-8 before:w-6 before:h-1 before:bg-primary-text before:-left-8 before:absolute before:rounded-xl before:top-[50%] before:translate-y-[-50%]'>Redes Sociales</h3>
        <div className='text-primary-accent flex justify-center gap-12'>
          <Link href={(usuario.facebook ?? '')} target='_blank' rel='noreferrer'>
            <IconFacebook width={48} height={48} />
          </Link>
          <Link href={(usuario.instagram ?? '')} target='_blank' rel='noreferrer'>
            <IconInstagram width={48} height={48} />
          </Link>
          <Link href={(usuario.twitter ?? '')} target='_blank' rel='noreferrer'>
            <IconTwitter width={48} height={48} />
          </Link>
        </div>
      </div>
    </section>
  )
}
