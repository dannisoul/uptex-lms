'use client'
import { IconUpload } from '@tabler/icons-react'

export function InputFile ({ id, name, accept, selected, onChange, errors }) {
  return (
    <div className='relative'>
      <input
        id={id}
        name={name}
        accept={accept}
        onChange={onChange}
        type='file'
        className='hidden'
      />
      <label htmlFor={id} className='flex items-center text-[12px] gap-2'>
        <button type='button' className='bg-tertiary-accent uppercase rounded-lg font-semibold text-white text-sm px-4 py-3 flex justify-center gap-2 items-center' onClick={() => document.getElementById(id).showPicker()}>
          <IconUpload />
          Subir
        </button>
        <div className='flex flex-col dark:text-dark-secondary-accent'>
          {selected?.name || 'Ningún archivo seleccionado'}
          {errors &&
            <p className='w-full text-red-600 font-bold text-[12px]'>{errors}</p>}
        </div>
      </label>

    </div>
  )
}
