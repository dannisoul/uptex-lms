import { IconFileTypeDocx, IconFileTypePdf, IconFileTypePpt, IconFileTypeTxt, IconFileTypeXls, IconMusic, IconPhoto, IconVideo } from '@tabler/icons-react'
import { ModalContainer } from '../shared/ModalContainer'

const FILETYPES = [
  { id: 'pdf', icon: <IconFileTypePdf />, name: 'PDF', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nuevo Archivo PDF', mimeType: 'application/pdf', bg: 'peer-checked/pdf:bg-secondary-accent dark:peer-checked/pdf:bg-primary-accent', text: 'peer-checked/pdf:text-white' },
  { id: 'doc', icon: <IconFileTypeDocx />, name: 'Word', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nuevo Archivo de Texto', mimeType: 'application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document', bg: 'peer-checked/doc:bg-secondary-accent dark:peer-checked/doc:bg-primary-accent', text: 'peer-checked/doc:text-white' },
  { id: 'ppt', icon: <IconFileTypePpt />, name: 'Presentación', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nueva Presentación', mimeType: 'application/vnd.ms-powerpoint, application/vnd.openxmlformats-officedocument.presentationml.presentation', bg: 'peer-checked/ppt:bg-secondary-accent dark:peer-checked/ppt:bg-primary-accent', text: 'peer-checked/ppt:text-white' },
  { id: 'xls', icon: <IconFileTypeXls />, name: 'Excel', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nueva Hoja de Cálculo', mimeType: 'application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', bg: 'peer-checked/xls:bg-secondary-accent dark:peer-checked/xls:bg-primary-accent', text: 'peer-checked/xls:text-white' },
  { id: 'video', icon: <IconVideo />, name: 'Video', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nuevo Video', mimeType: 'video/*', bg: 'peer-checked/video:bg-secondary-accent dark:peer-checked/video:bg-primary-accent', text: 'peer-checked/video:text-white' },
  { id: 'audio', icon: <IconMusic />, name: 'Audio', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nuevo Audio', mimeType: 'audio/*', bg: 'peer-checked/audio:bg-secondary-accent dark:peer-checked/audio:bg-primary-accent', text: 'peer-checked/audio:text-white' },
  { id: 'imagen', icon: <IconPhoto />, name: 'Imagen', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nueva Imagen', mimeType: 'image/*', bg: 'peer-checked/imagen:bg-secondary-accent dark:peer-checked/imagen:bg-primary-accent', text: 'peer-checked/imagen:text-white' },
  { id: 'txt', icon: <IconFileTypeTxt />, name: 'Texto Plano', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nuevo Archivo (.txt)', mimeType: 'text/plain', bg: 'peer-checked/txt:bg-secondary-accent dark:peer-checked/txt:bg-primary-accent', text: 'peer-checked/txt:text-white' }
  /* { id: 'link', icon: <IconLink />, name: 'Link', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nuevo Enlace', mimeType: 'n/a', bg: 'peer-checked/link:bg-secondary-accent', text: 'peer-checked/link:text-white' },
  { id: 'tarea', icon: <IconBook2 />, name: 'Tarea', maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nueva Tarea', mimeType: 'n/a', bg: 'peer-checked/tarea:bg-secondary-accent', text: 'peer-checked/tarea:text-white' },
  { id: 'cuestionario', icon: <IconFileDescription />, maxSize: '5mb', maxSizeInKB: 5120, formTitle: 'Nuevo Cuestionario', mimeType: 'n/a', name: 'Cuestionario', bg: 'peer-checked/cuestionario:bg-secondary-accent', text: 'peer-checked/cuestionario:text-white' } */
]

export function Recurso1 ({ handleModal, next, updateFileType, fileType }) {
  return (
    <ModalContainer
      formTitle='Nuevo Recurso'
      setVisible={() => {
        handleModal()
        updateFileType(null)
      }}
      action={() => {
        if (fileType === null) return
        handleModal()
        next()
      }}
    >
      <h2 className='font-semibold text-secondary-accent text-[12px] dark:text-dark-primary-text'>Elige el tipo de archivo que deseas subir</h2>
      <div className='flex gap-2 gap-y-8 items-center flex-wrap mx-auto justify-center'>
        {
          FILETYPES.map((file, index) => (
            <div key={`${file.id}_${index}`} className='flex flex-col items-center justify-center gap-2 basis-[85px]'>
              <input
                onChange={() => {
                  updateFileType({ maxSize: file.maxSize, maxSizeInKB: file.maxSizeInKB, formTitle: file.formTitle, mimeType: file.mimeType, id: file.id })
                }}
                id={file.id}
                type='radio'
                name='fileType'
                className={`peer/${file.id} hidden`}
              />
              <label htmlFor={file.id} className={'bg-alpha-bg/20 text-secondary-accent dark:text-white w-12 h-12 flex items-center justify-center rounded-full transition-all ' + file.bg + ' ' + file.text}>
                {file.icon}
              </label>
              <span className='text-[12px] font-medium dark:text-dark-primary-text'>{file.name}</span>
            </div>
          ))
        }
      </div>
    </ModalContainer>

  )
}
