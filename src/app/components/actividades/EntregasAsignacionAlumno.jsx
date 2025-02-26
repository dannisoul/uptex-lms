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
      <ul className='flex flex-col gap-4'>
        <li className='bg-[#D9D9D9] text-[#60499F] p-2 px-4 rounded-xl flex justify-between items-center w-10/12 max-w-[700px] gap-2'>
          <span className='text-sm'>Vargas Tapia Daniel.pdf</span>
          <ActionButton className='bg-[#60499f] border-[#987de5] text-white ' icon={<IconTrash />} />
        </li>
        <li className='bg-[#D9D9D9] text-[#60499F] p-2 px-4 rounded-xl flex justify-between items-center w-10/12 max-w-[700px] gap-2'>
          <span className='text-sm'>Exámen Diágnostico - Evidencia - 1er semestre.pdf</span>
          <ActionButton className='bg-[#60499f] border-[#987de5] text-white ' icon={<IconTrash />} />
        </li>
      </ul>
    </section>
  )
}
