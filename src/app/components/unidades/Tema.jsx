import { IconEdit, IconTrash } from '@tabler/icons-react'
import { ActionButton } from '../shared/ActionButton'
import Link from 'next/link'

export function Tema ({ tema, updateIdTema, updateIdUnidad, handleEditTema, handleDeleteTema, actions, authorized }) {
  return (
    <li className='px-4 py-2 gap-2 flex items-center justify-between border-b hover:bg-alpha-bg/20 dark:bg-dark-tertiary-bg dark:text-white dark:border-b-alpha-bg/20 transition-all'>
      {
        authorized
          ? <Link href={`/tema/${tema.idTema}`} className='hover:font-medium hover:text-primary-accent line-clamp-1'>{tema.np} {tema.nombre}</Link>
          : <span className='line-clamp-1'>{tema.np} {tema.nombre}</span>
      }
      <div className={'flex gap-2 ' + (!actions && 'px-4 py-5')}>
        {actions &&
          <>
            <ActionButton
              onClick={() => {
                updateIdTema(tema.idTema)
                handleEditTema()
              }} icon={<IconEdit />}
            />
            <ActionButton
              onClick={() => {
                updateIdTema(tema.idTema)
                updateIdUnidad(tema.idUnidad)
                handleDeleteTema()
              }} icon={<IconTrash />}
            />
          </>}
      </div>
    </li>
  )
}
