import Link from 'next/link'

export function CardMenu ({ icon, image, title, href }) {
  return (
    <div className='min-w-[250px] select-none min-h-[280px] bg-white dark:bg-dark-secondary-bg relative rounded-[25px] overflow-hidden group shadow-xl'>
      {image &&
        <img src={image} className='w-full h-full object-cover object-center absolute top-0 left-0' />}
      <div className='cardMenuCover absolute bottom-0 transition-all bg-[#9747FF]/60 sm:group-hover:bg-[#9747FF]/80 sm:group-hover:min-h-[190px] w-full px-4'>
        <div className='flex items-center justify-center'>
          <div className=' basis-1/3  self-start'>
            <div className='iconImage w-14 bg-primary-bg rounded-lg p-2 mx-auto'>
              <img src={icon ?? 'menu/iconFallback.svg'} alt='' />
            </div>
          </div>
          <div className='infoCard text-white basis-1/2 mt-6 text-[12px] grow text-right '>
            <h2 className='font-bold'>{title ?? 'Titulo '}</h2>
            <p>Da click para acceder a las opciones de este menú</p>
          </div>
        </div>
        <Link href={href || '#'} className='bg-white mt-4 px-3 py-1 rounded-lg w-[80px] right-4 bottom-4 sm:group-hover:bottom-12 sm:group-hover:right-[50%] sm:group-hover:translate-x-[50%] sm:group-hover:w-[60%] sm:group-hover:rounded-full transition-all absolute text-[12px] font-semibold text-center'>Entrar</Link>
      </div>
    </div>
  )
}
