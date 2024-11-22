'use client'
import { IconEdit, IconTrash } from '@tabler/icons-react'
import { useState, useEffect } from 'react'
import { IconOptionsFilled } from '../icons/IconsFIlled'

export function PageOptions ({ text, handleEdit, handleDelete }) {
  const [display, setDisplay] = useState(false)

  useEffect(() => {
    function hideOptions (e) {
      if (!e.target.matches('#pageOptions') && !e.target.matches('#pageOptions *') &&
      !e.target.matches('#pageOptionsToggle') && !e.target.matches('#pageOptionsToggle *')) {
        setDisplay(false)
      }
    }
    document.addEventListener('mousedown', hideOptions)
    return () => {
      document.removeEventListener('mousedown', hideOptions)
    }
  }, [])

  return (
    <label className='flex items-center justify-center relative z-10'>
      <button id='pageOptionsToggle' onClick={() => setDisplay(!display)} className='bg-primary-accent text-white p-1 rounded-lg shadow-lg relative cursor-pointer'>
        <div className={'transition-all w-fit ' + (display ? 'rotate-90' : 'rotate-0')}>
          <IconOptionsFilled width={28} height={28} />
        </div>
      </button>

      {display &&
        <div id='pageOptions' className='animate-fade animate-duration-200 absolute bg-white dark:bg-dark-secondary-bg right-0 top-[110%] rounded-xl shadow-lg p-4 fade-in cursor-default'>
          <header className='border-b border-primary-accent dark:border-dark-primary-accent pb-2 mb-2'>
            <span className='text-primary-accent dark:text-dark-primary-accent text-[14px] font-semibold text-nowrap'>{text}</span>
          </header>
          <ul className='flex flex-col gap-2 text-[12px] font-medium pb-2'>
            <li className='bg-alpha-bg/20 p-2 rounded-lg text-secondary-accent dark:text-white'>
              <button onClick={handleEdit} className='flex gap-1 items-center w-full h-full'>
                <IconEdit width={24} height={24} />
                <span className='text-black dark:text-white'>Editar</span>
              </button>
            </li>
            <li className='bg-secondary-accent p-2 rounded-lg text-white'>
              <button onClick={handleDelete} className='flex gap-1 items-center w-full h-full'>
                <IconTrash width={24} height={24} />
                <span className='text-white'>Eliminar</span>
              </button>
            </li>
          </ul>
        </div>}
    </label>
  )
}
