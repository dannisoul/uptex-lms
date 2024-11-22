'use client'
import { IconPlaylistAdd } from '@tabler/icons-react'
import { ButtonIcon } from '../shared/IconButton'
import { Accordion } from '../shared/Accordion'
import { Recurso } from './Recurso'
import { useModal } from '@/hooks/useModal'
import { Recurso1 } from '../modals/Recurso1'
import { Recurso2 } from '../modals/Recurso2'
import { useState } from 'react'
import { useRecursos } from '@/hooks/useRecursos'
import { Eliminar } from '../modals/Eliminar'
import { eliminarRecurso } from '@/actions/recursos/eliminar'

export function TemaDocente ({ tema, toast, initialRecursos }) {
  const { handleModal: handleModalRecurso1, modal: modalRecurso1 } = useModal()
  const { handleModal: handleModalRecurso2, modal: modalRecurso2 } = useModal()
  const { handleModal: handleModalEliminarRecurso, modal: modalEliminarRecurso } = useModal()
  const { recursos, updateRecursos } = useRecursos({ initialState: initialRecursos })
  const [fileType, setFileType] = useState(null)
  const [recurso, setRecurso] = useState()
  function updateFileType (type) {
    setFileType(type)
  }
  function updateRecurso (recurso) {
    setRecurso(recurso)
  }
  return (
    <>
      <section className='text-pretty'>
        <h2 className='sm:text-2xl text-xl font-bold text-secondary-accent dark:text-dark-primary-accent '>Unidad 1</h2>
        <h1 className='sm:text-2xl text-xl mt-4 font-bold text-primary-accent dark:text-dark-secondary-accent'>{tema.nombre}</h1>
        <p className='mt-8 dark:text-dark-primary-text dark:font-medium sm:text-base text-sm'>{tema.descripcion}</p>
      </section>

      <section className='mt-16'>
        <div className='flex justify-between items-center mb-10'>
          <h2 className='sm:text-2xl text-xl font-bold text-primary-accent dark:text-dark-primary-accent '>Recursos</h2>
          <ButtonIcon icon={<IconPlaylistAdd />} label='Añadir' onClick={handleModalRecurso1} />
        </div>
        <Accordion isOpen title='Lista de Recursos'>
          {recursos?.length === 0 &&
            <li className='p-4 flex items-center justify-center border-btransition-all dark:bg-dark-tertiary-bg dark:text-white'>
              <span className=''>Para subir un recurso presiona el botón de "Añadir"</span>
            </li>}
          {recursos.map(recurso => (
            <Recurso key={recurso.idRecurso} recurso={recurso} updateRecurso={updateRecurso} handleDeleteRecurso={handleModalEliminarRecurso} actions />
          ))}
        </Accordion>
      </section>
      {modalRecurso1 && <Recurso1
        handleModal={handleModalRecurso1}
        next={handleModalRecurso2}
        updateFileType={updateFileType}
        fileType={fileType}
                        />}
      {modalRecurso2 && <Recurso2
        handleModal={handleModalRecurso2}
        back={handleModalRecurso1}
        updateFileType={updateFileType}
        fileType={fileType}
        formTitle={fileType?.formTitle}
        maxSize={fileType?.maxSize}
        mimeType={fileType?.mimeType}
        idFileType={fileType?.id}
        toast={toast}
        idCurso={tema.idCurso}
        idUnidad={tema.idUnidad}
        idTema={tema.idTema}
        updateRecursos={updateRecursos}
                        />}

      {modalEliminarRecurso && (
        <Eliminar
          handleModal={handleModalEliminarRecurso}
          idToDelete={recurso}
          updateState={updateRecursos}
          toast={toast}
          formTitle='Eliminar Recurso'
          submitText='Eliminar'
          deleteAction={eliminarRecurso}
          nameToDelete={`Recurso ${recurso.nombre}`}
        />
      )}
    </>
  )
}
