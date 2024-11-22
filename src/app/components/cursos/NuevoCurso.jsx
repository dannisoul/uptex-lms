import { IconPlus } from '@tabler/icons-react'

export function NuevoCurso ({ title, title2, handleClick }) {
  return (
    <div onClick={handleClick} className='w-[250px] h-[280px] rounded-[40px] shadow-xl select-none relative group grid place-content-center cursor-pointer dark:bg-[#19191a]'>
      <IconPlus width={42} height={42} className='text-primary-text dark:text-[#a1aab1]' />
      <div className='w-full h-[150px] absolute bottom-0 overflow-hidden rounded-b-[35px]'>
        <img className='absolute -bottom-[110px] dark:invert-[.95]' src='mis_cursos/overlaycard2.png' />
        <div className='w-full h-full relative flex items-center justify-center gap-3 px-6 pt-12'>
          <div className='grow text-[12px]'>
            <h2 className='font-bold text-primary-accent dark:text-dark-primary-accent'>{title}</h2>
            <span className='text-primary-text font-medium dark:text-white'>{title2}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
