'use client'
import { IconX } from '@tabler/icons-react'

export function Habilidad ({ habilidad, onDelete }) {
  return (
    <div className='bg-primary-accent md:text-base sm:text-sm text-[10px] p-4 rounded-lg text-white text-center relative flex items-center justify-center transition-all group'>
      <span className='line-clamp-1'>
        {habilidad.nombre}
      </span>
      <button type='button' className='absolute hidden group-hover:block p-[2px] animate-fade animate-duration-300 shadow-xl -top-2 -right-2 bg-[#e0e0fc] rounded-full text-secondary-accent' onClick={async () => onDelete(habilidad.idHabilidad)}>
        <IconX width={16} height={16} />
      </button>
    </div>
  )
}
