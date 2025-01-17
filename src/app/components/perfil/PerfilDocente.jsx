import { IconBrandWhatsapp } from '@tabler/icons-react'
import { IconFacebook, IconInstagram, IconTwitter } from '../icons/IconsFIlled'
import Link from 'next/link'

export function PerfilDocente ({ data }) {
  const { usuario, misHabilidades } = data
  // const avatar = usuario.avatar ? `/api/usuarios/images/?idDocente=${usuario.idUsuario}&idImagen=${usuario.avatar}` : '/avatar/avatar_placeholder.jpg'
  const avatar = usuario.avatar ? process.env.NEXT_PUBLIC_BUCKET + `/uploads/${usuario.idUsuario}/perfil/` + usuario.avatar : '/avatar/avatar_placeholder.jpg'

  return (
    <section className='relative '>
      <img className='absolute top-0 right-0' src='/landingPage/bubbles.svg' alt='' />
      <div className='flex gap-4 justify-between relative'>
        <div className='flex flex-col gap-1'>
          <h1 className='text-2xl md:text-4xl font-bold text-primary-accent line-clamp-2'>{`${usuario.nombre} ${usuario.paterno} ${usuario.materno}`}</h1>
          <h2 className='text-xl font-semibold text-secondary-accent mt-1 dark:text-dark-secondary-accent'>Docente</h2>
          <Link href={`mailto:${usuario.correo}`} target='_blank' rel='noreferrer' className='font-medium text-primary-text dark:text-dark-primary-text mt-4 flex items-center gap-1 hover:text-primary-accent transition-all text-sm sm:text-base'>{usuario.correo}</Link>
          <Link href={`https://wa.me/${usuario.telefono}`} target='_blank' rel='noreferrer' className='font-medium text-primary-text dark:text-dark-primary-text flex items-center gap-1 hover:text-primary-accent transition-all text-sm sm:text-base'>{(usuario.telefono ?? 'Número no registrado')} <IconBrandWhatsapp /></Link>
        </div>
        <img src={avatar} className='sm:w-[150px] md:w-[250px] w-[100px] sm:h-[150px] md:h-[250px] h-[100px] rounded-[25px] object-cover' alt='' />
      </div>
      <div className='flex flex-col gap-8 relative mt-8 md:mt-0'>
        <h3 className='font-bold text-primary-text dark:text-dark-primary-text relative left-8 before:w-6 before:h-1 before:bg-primary-text before:-left-8 before:absolute before:rounded-xl before:top-[50%] before:translate-y-[-50%]'>Especialidad</h3>
        {usuario.especialidad &&
          <div className='block py-4 px-6 sm:w-fit w-full text-center bg-primary-accent text-white rounded-xl text-sm sm:text-base'>
            <span className='line-clamp-1'>
              {(usuario.especialidad)}
            </span>
          </div>}
        {misHabilidades.length === 0 && <p className='text-left text-primary-text dark:text-dark-primary-text'>Sin especialidad registrada</p>}
      </div>
      <div className='flex flex-col gap-8 mt-8 relative'>
        <h3 className='font-bold text-primary-text dark:text-dark-primary-text relative left-8 before:w-6 before:h-1 before:bg-primary-text before:-left-8 before:absolute before:rounded-xl before:top-[50%] before:translate-y-[-50%]'>Habilidades</h3>
        <div className='flex flex-wrap gap-x-4 gap-y-8'>
          {misHabilidades.length === 0 && <p className='text-left text-primary-text dark:text-dark-primary-text'>Sin habilidades registradas</p>}
          {misHabilidades.map(habilidad => (
            <span key={`habilidad-${habilidad.idHabilidad}`} className=' block py-4 px-6 text-center bg-secondary-accent text-white rounded-xl sm:grow-0 grow'>
              <span className=' text-sm sm:text-base'>
                {habilidad.nombre}
              </span>
            </span>
          ))}
        </div>
      </div>
      <div className='flex flex-col gap-8 relative mt-8'>
        <h3 className='font-bold text-primary-text dark:text-dark-primary-text relative left-8 before:w-6 before:h-1 before:bg-primary-text before:-left-8 before:absolute before:rounded-xl before:top-[50%] before:translate-y-[-50%]'>Redes Sociales</h3>
        <div className='text-primary-accent flex justify-center gap-12'>
          <Link href={(usuario.facebook ?? '#')} target='_blank' rel='noreferrer'>
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
