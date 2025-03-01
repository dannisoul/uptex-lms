import { IconTextPlus, IconTrash } from '@tabler/icons-react'
import { ButtonIcon } from '../shared/IconButton'
import { ActionButton } from '../shared/ActionButton'

export function EntregasAsignacionAlumno ({ entregas }) {
  return (
    <section className='mt-4'>
      <header className='flex justify-between items-center'>
        <h3 className='text-xl font-bold text-dark-primary-accent'>Entregas</h3>
        <ButtonIcon icon={<IconTextPlus />} label='Agregar' />
      </header>
      <ul className='flex flex-col gap-4 mt-4'>
        <li className='bg-[#e6e0f7] text-[#60499F] p-2 px-4 rounded-xl flex justify-between items-center w-10/12 max-w-[700px] gap-2'>
          <span className='text-sm line-clamp-1'>Vargas Tapia Daniel.pdf</span>
          <ActionButton className='bg-[#987de5] border-[#987de5] text-white ' icon={<IconTrash />} />
        </li>
        <li className='bg-[#e6e0f7] text-[#60499F] p-2 px-4 rounded-xl flex justify-between items-center w-10/12 max-w-[700px] gap-2'>
          <span className='text-sm line-clamp-1'>Exámen Diágnostico - Evidencia - 1er semestre.pdf</span>
          <ActionButton className='bg-[#987de5] border-[#987de5] text-white ' icon={<IconTrash />} />
        </li>
      </ul>
    </section>
  )
}
