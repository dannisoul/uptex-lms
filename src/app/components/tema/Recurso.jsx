import { IconDownload, IconEye, IconFile, IconFileText, IconFileTypeDocx, IconFileTypePdf, IconFileTypePpt, IconFileTypeXls, IconMovie, IconMusic, IconPhoto, IconTrash } from '@tabler/icons-react'
import { ActionButton } from '../shared/ActionButton'

export function Recurso ({ recurso, handleDeleteRecurso, updateRecurso, deletePermission, viewPermission, handleView, updateFile }) {
  const icon = getIcon(recurso.mimetype)
  // const ruta = `/api/recursos?idRecurso=${encodeURIComponent(recurso.ruta)}&idCurso=${recurso.idCurso}&idUnidad=${recurso.idUnidad}&idTema=${recurso.idTema}&idDocente=${recurso.idDocente}`
  const path = `${process.env.NEXT_PUBLIC_BUCKET}/uploads/${recurso.idDocente}/cursos/${recurso.idCurso}/${recurso.idUnidad}/${recurso.idTema}/${recurso.nombre}`
  return (
    <li className='px-4 py-2 flex items-center justify-between gap-2 border-b hover:bg-alpha-bg/20 dark:bg-dark-tertiary-bg dark:text-white dark:border-b-alpha-bg/20 transition-all'>
      <div className='flex items-center gap-4'>
        <div>
          {icon}
        </div>
        <span className='line-clamp-1'>
          {recurso.nombre}
        </span>
      </div>
      <div className='flex gap-2'>
        <a
          href={path}
          download={recurso.nombre}
        >
          <ActionButton icon={<IconDownload />} />
        </a>
        {
          deletePermission &&
            <ActionButton
              onClick={() => {
                updateRecurso(recurso)
                handleDeleteRecurso()
              }} icon={<IconTrash />}
            />
          }
        {
          viewPermission &&
            <ActionButton
              onClick={() => {
                updateFile({ nombre: recurso.nombre, path, mimeType: recurso.mimetype })
                handleView && handleView()
              }} icon={<IconEye />}
            />
          }
      </div>
    </li>
  )
}

function getIcon (mimeType) {
  if (mimeType.startsWith('image/')) return <IconPhoto />
  if (mimeType.startsWith('video/')) return <IconMovie />
  if (mimeType.startsWith('audio/')) return <IconMusic />
  if (mimeType === 'application/pdf') return <IconFileTypePdf />
  if (mimeType === 'text/plain') return <IconFileText />
  if (mimeType === 'application/msword' || mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') return <IconFileTypeDocx />
  if (mimeType === 'application/vnd.ms-excel' || mimeType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') return <IconFileTypeXls />
  if (mimeType === 'application/vnd.ms-powerpoint' || mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') return <IconFileTypePpt />
  return <IconFile />
}
