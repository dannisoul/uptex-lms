export function CursoCardContent ({ imagen, avatar, nombre, grupo, inicio, cierre, descripcion, status }) {
  return (
    <>
      <img
        className='absolute left-0 w-full h-full object-cover rounded-[40px]' src={imagen}
      />
      <div className='w-full h-[150px] sm:group-hover:h-[300px] transition-all absolute bottom-0 overflow-hidden rounded-b-[35px]'>
        <img className='absolute -bottom-[110px] sm:group-hover:-bottom-0 transition-all dark:invert-[.95]' src='/mis_cursos/overlaycard2.png' />
        <div className='w-full h-full relative flex items-center justify-center gap-3 px-6 pt-12 sm:group-hover:pt-[120px] transition-all sm:group-hover:items-start'>
          <img className='w-10 h-10 rounded-full shadow-lg sm:group-hover:hidden transition-all object-cover' src={avatar} />
          <div className='grow text-[12px]'>
            <h2 className='font-bold text-primary-accent dark:text-dark-primary-accent w-[140px] text-ellipsis overflow-hidden sm:group-hover:w-auto line-clamp-1'>{nombre}</h2>
            <span className='text-primary-text font-medium dark:text-white sm:group-hover:hidden'>{grupo}</span>
            {inicio && cierre &&
              <>
                <span className='hidden sm:group-hover:block dark:text-white dark:font-medium mt-2'>Inicia: {new Date(inicio).toISOString().slice(0, 10)}</span>
                <span className='hidden sm:group-hover:block dark:text-white dark:font-medium'>Termina: {new Date(cierre).toISOString().slice(0, 10)}</span>
              </>}
            <div className={((inicio && cierre) ? 'line-clamp-5' : 'line-clamp-[7]')}>
              {status === 1
                ? (
                  <p className='hidden sm:group-hover:block text-primary-text transition-all dark:text-white dark:font-medium sm:group-hover:mt-2 text-pretty '>
                    {descripcion}
                  </p>
                  )
                : (
                  <p className='hidden sm:group-hover:block text-primary-text transition-all dark:text-white dark:font-medium sm:group-hover:mt-2 text-pretty '>
                    Curso en proceso de <strong>eliminación</strong>, si hay grupos activos se eliminará después de que estos acaben, si no hay grupos, el proceso de eliminación empezará en breve. Presiona en <strong>restaurar</strong> si deseas volver a activar este curso.
                  </p>
                  )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
