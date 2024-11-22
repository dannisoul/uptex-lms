import Link from 'next/link'

export function NotFound () {
  return (
    <div className='customSection  pt-[120px] sm:pt-[150px] mb-16 max-w-[1200px] w-11/12 mx-auto grid place-items-center'>
      <div className='flex flex-col gap-6'>
        <h2 className='md:text-7xl text-5xl font-bold text-primary-accent text-center'>Oops!</h2>
        <span className='sm:text-3xl text-xl font-semibold text-secondary-accent dark:text-dark-secondary-accent text-center'>404 - Parece que te has perdido</span>
        <Link href='/' className='px-4 py-2 sm:py-4 bg-primary-accent text-white text-center rounded-full w-fit mx-auto'>Ir a la página principal</Link>
      </div>
    </div>
  )
}
