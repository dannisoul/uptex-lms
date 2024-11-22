import { IconTargetArrow, IconLeaf, IconPresentation } from '@tabler/icons-react'

export function RegisterBody ({ form }) {
  return (
    <div className='max-w-[1200px] w-10/12 mx-auto relative'>
      <img className='absolute top-[25%]' src='/landingPage/bubbles.svg' alt='' />
      <img className='absolute top-[70%]' src='/landingPage/bubbles.svg' alt='' />

      <section data-section='1' id='inicio' className='pt-[120px] customSection flex xl:gap-14 gap-4 justify-between items-center relative xl:flex-nowrap flex-wrap place-content-center'>
        <article className='flex flex-col xl:h-[492px] h-auto w-[408px] xl:shrink-0 shrink relative'>
          <h1 className='lg:text-5xl md:text-4xl text-3xl font-bold text-primary-accent dark:text-dark-primary-accent'>Bienvenido a esta comunidad</h1>
          <p className='xl:max-w-[250px] text-sm font-medium text-primary-text mt-4 inline-block dark:text-dark-primary-text'>Donde podrás unirte a cursos que te ayudarán en tu desarrollo profesional.</p>
          <img className='w-80 absolute bottom-16 right-0 xl:block hidden' src='/landingPage/login1.webp' alt='' />
        </article>
        {form}
      </section>

      <section data-section='2' id='nuestra-oferta' className='flex gap-8 items-center  pt-[120px] customSection relative lg:flex-nowrap flex-wrap justify-center place-content-center'>
        <div className='lg:basis-1/2 basis-auto lg:w-auto md:w-8/12 w-11/12'>
          <img className='w-10/12 mx-auto' src='/landingPage/login2.webp' alt='' />
        </div>
        <article className='lg:basis-1/2 basis-auto'>
          <h3 className='font-bold text-primary-accent dark:text-dark-primary-accent md:text-3xl text-2xl'>¡Bienvenido al futuro de la eduación!</h3>
          <p className='mt-8 text-primary-text dark:text-dark-primary-text font-medium md:text-base text-sm'>
            Estamos emocionados de invitarte a descubrir las muchas posibilidades que ofrece nuestra plataforma de aprendizaje en línea. ¿Eres un apasionado educador buscando llevar tus clases al siguiente nivel? ¿O eres un ávido estudiante ansioso por explorar nuevos horizontes educativos? Sea cual sea tu rol, nuestra plataforma está diseñada para brindarte una experiencia educativa sin igual.
          </p>
        </article>
      </section>

      <section data-section='3' id='mision-vision' className='flex gap-8 items-center  pt-[120px] customSection relative '>
        <div className='flex justify-center w-full gap-6 text-primary-text dark:text-dark-primary-text font-medium lg:flex-nowrap flex-wrap'>
          <article className='flex flex-col items-center'>
            <IconTargetArrow width={64} height={64} className='text-primary-accent dark:text-dark-primary-accent' />
            <h3 className='md:text-3xl text-2xl font-bold text-secondary-accent dark:text-dark-secondary-accent'>Misión</h3>
            <p className='max-w-[300px] mt-2 text-center md:text-base text-sm'>
              Facilitar el acceso a una educación de calidad, rompiendo barreras geográficas y promoviendo la excelencia académica a través de nuestra plataforma LMS.
            </p>
          </article>
          <article className='flex flex-col items-center'>
            <IconPresentation width={64} height={64} className='text-primary-accent dark:text-dark-primary-accent' />
            <h3 className='md:text-3xl text-2xl font-bold text-secondary-accent dark:text-dark-secondary-accent'>Visión</h3>
            <p className='max-w-[300px] mt-2 text-center md:text-base text-sm'>
              Ser la principal plataforma global de aprendizaje en línea, reconocida por su impacto positivo en la educación. Aspiramos a crear un entorno que inspire el pensamiento crítico, colaboración y crecimiento personal.
            </p>
          </article>
          <article className='flex flex-col items-center'>
            <IconLeaf width={64} height={64} className='text-primary-accent dark:text-dark-primary-accent' />
            <h3 className='md:text-3xl text-2xl font-bold text-secondary-accent dark:text-dark-secondary-accent'>Valores</h3>
            <p className='max-w-[300px] mt-2 text-center md:text-base text-sm'>
              Aspiramos a construir un espacio educativo en línea que inspire el crecimiento, el descubrimiento y el éxito duradero para todos los que forman parte de nuestra comunidad educativa.
            </p>
          </article>
        </div>
      </section>

      <section data-section='4' id='caracteristicas' className=' pt-[120px] customSection flex items-center relative place-content-center'>
        <div className='w-full'>
          <h3 className='text-2xl font-bold text-primary-accent dark:text-dark-primary-accent'>Caracteristicas</h3>
          <div className='flex justify-center lg:gap-24 gap-4 mt-8 md:flex-nowrap flex-wrap'>
            <article className='p-8 bg-white dark:bg-dark-secondary-bg rounded-lg min-w-[312px]'>
              <h4 className='lg:text-2xl text-xl font-semibold text-secondary-accent dark:text-dark-secondary-accent'>Docente</h4>
              <ul className='mt-6 text-sm font-medium [&>li]:before:absolute [&>li]:before:w-2 [&>li]:before:h-2 [&>li]:before:bg-primary-accent [&>li]:before:rounded-full [&>li]:before:top-[50%] [&>li]:before:translate-y-[-50%] [&>li]:before:-left-4 [&>li]:relative [&>li]:ml-4 [&>li]:font-base flex flex-col gap-4 dark:text-white'>
                <li>Creación de cursos</li>
                <li>Creación de grupos</li>
                <li>Desgloce de cursos por unidades</li>
                <li>Gestión de asignaciones</li>
                <li>Creación de recursos</li>
                <button className='bg-secondary-accent text-white  py-2 px-4 rounded-lg mt-6'>Solicitar Cuenta</button>
              </ul>
            </article>
            <article className='p-8 bg-white dark:bg-dark-secondary-bg rounded-lg min-w-[312px]'>
              <h4 className='lg:text-2xl text-xl font-semibold text-secondary-accent dark:text-dark-secondary-accent'>Alumno</h4>
              <ul className='mt-6 text-sm font-medium [&>li]:before:absolute [&>li]:before:w-2 [&>li]:before:h-2 [&>li]:before:bg-primary-accent [&>li]:before:rounded-full [&>li]:before:top-[50%] [&>li]:before:translate-y-[-50%] [&>li]:before:-left-4 [&>li]:relative [&>li]:ml-4 [&>li]:font-base flex flex-col gap-4 dark:text-white'>
                <li>Explora infinidad de cursos</li>
                <li>Acceso a cursos gratuitos *</li>
                <li>Estudia en tus tiempos libres</li>
                <li>Estudia donde sea que estés</li>
                <li>Administra tu propio tiempo</li>
                <button className='bg-secondary-accent text-white  py-2 px-4 rounded-lg mt-6'>Crear Cuenta</button>
              </ul>
            </article>
          </div>
        </div>
      </section>
    </div>
  )
}
