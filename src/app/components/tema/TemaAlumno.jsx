'use client'

import { useModal } from '@/hooks/useModal'
import { Accordion } from '../shared/Accordion'
import { Recurso } from './Recurso'
import { useState } from 'react'
import { FilePreview } from '../shared/FilePreview'

export function TemaAlumno ({ tema, recursos = [] }) {
  const { handleModal, modal } = useModal()
  const [file, setFile] = useState(null)
  function updateFile (file) {
    setFile(file)
  }
  return (
    <>
      <section className='text-pretty'>
        <h2 className='sm:text-2xl text-xl font-bold text-secondary-accent dark:text-dark-primary-accent '>Unidad 1</h2>
        <h1 className='sm:text-2xl text-xl mt-4 font-bold text-primary-accent dark:text-dark-secondary-accent '>{tema.nombre}</h1>
        <p className='mt-8 dark:text-dark-primary-text dark:font-medium sm:text-base text-sm'>{tema.descripcion}</p>
      </section>
      <section className='mt-16'>
        <div className='flex justify-between items-center mb-10'>
          <h2 className='sm:text-2xl text-xl font-bold text-primary-accent dark:text-dark-primary-accent '>Recursos</h2>
        </div>
        <Accordion items={[]} isOpen title='Lista de Recursos'>
          {recursos.length === 0 &&
            <li className='p-4 flex items-center justify-center border-btransition-all dark:bg-dark-tertiary-bg dark:text-white'>
              <span className=''>Aquí aparecerá el contenido que comparta tu docente</span>
            </li>}
          {recursos.map(recurso => (
            <Recurso key={recurso.idRecurso} recurso={recurso} handleView={handleModal} updateFile={updateFile} viewPermission />
          ))}
        </Accordion>
      </section>
      {
        modal &&
          <FilePreview handleModal={handleModal} file={file} />
      }
    </>
  )
}
