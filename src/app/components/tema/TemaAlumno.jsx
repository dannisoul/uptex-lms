'use client'

import { useModal } from '@/hooks/useModal'
import { Accordion } from '../shared/Accordion'
import { Recurso } from './Recurso'
import { Media } from '../modals/Media'
import { useState } from 'react'
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'

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
            <Recurso key={recurso.idRecurso} recurso={recurso} handleView={handleModal} updateFile={updateFile} />
          ))}
        </Accordion>
      </section>
      {
        modal &&
          <Media handleModal={handleModal} file={file}>
            {getPreview(file)}
          </Media>
      }
    </>
  )
}

function getPreview (file) {
  if (file.mimeType.startsWith('image/')) {
    return <img src={file.ruta} className='h-[90dvh] object-contain' />
  } else if (file.mimeType.startsWith('video/')) {
    return <video src={file.ruta} controls autoPlay className='w-3/4' />
  } else if (file.mimeType.startsWith('audio/')) {
    return <audio src={file.ruta} controls autoPlay />
  } else if (file.mimeType === 'application/pdf') {
    return <iframe src={file.path} className='w-3/4' width='90%' height='90%' />
  } else if (file.mimeType === 'application/msword' || file.mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
    console.log(file.path)
    return (
      <DocViewer
        documents={[{ uri: file.path }]}
        pluginRenderers={DocViewerRenderers}
        className='h-[500px] w-[500px]'
        style={{ width: '90%', height: '85%' }}
      />
    )
  } else if (file.mimeType === 'application/vnd.ms-powerpoint' || file.mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
    return (
      <DocViewer
        documents={[{ uri: process.env.NEXT_PUBLIC_URL + file.ruta, fileName: file.nombre }]}
        pluginRenderers={DocViewerRenderers}
        className='h-[500px] w-[500px]'
        style={{ width: '90%', height: '85%' }}
      />
    )
  } else if (file.mimeType === 'application/vnd.ms-excel' || file.mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
    return (
      <DocViewer
        documents={[{ uri: process.env.NEXT_PUBLIC_URL + file.ruta, fileName: file.nombre }]}
        pluginRenderers={DocViewerRenderers}
        className='h-[500px] w-[500px]'
        style={{ width: '90%', height: '85%' }}
      />
    )
  } else if (file.mimeType === 'plain/text' || file.mimeType) {
    return (
      <DocViewer
        documents={[{ uri: process.env.NEXT_PUBLIC_URL + file.ruta, fileName: file.nombre }]}
        pluginRenderers={DocViewerRenderers}
        className='h-[500px] w-[500px]'
        style={{ width: '90%', height: '85%' }}
      />
    )
  }
}
