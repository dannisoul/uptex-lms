import React from 'react'
import { TextArea } from '../forms/TextArea'

export function SobreMi ({ formData, errors, handleInputChange }) {
  return (
    <section className='flex lg:gap-20 gap-10 border-b-2 border-alpha-bg/20 pb-8 mt-8 lg:flex-nowrap flex-wrap'>
      <div className='flex flex-col gap-x-4 gap-y-8 w-full'>
        <h3 className='sm:col-start-1 sm:col-end-3 font-semibold text-center sm:text-left text-secondary-accent text-xl dark:text-dark-secondary-accent'>Sobre Mí</h3>
        <TextArea
          placeholder='Escribe cosas sobre ti...'
          errors={errors.descripcion}
          id='descripcion'
          name='descripcion'
          value={formData.descripcion}
          onChange={handleInputChange}
        />
      </div>
    </section>
  )
}
