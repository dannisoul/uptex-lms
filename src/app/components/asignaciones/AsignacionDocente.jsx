'use client'
import { useModal } from '@/hooks/useModal'
import { PageOptions } from '../shared/PageOptions'
import { EntregasAsignacionesDocente } from './EntregasAsignacionesDocente'
import { Actividad } from '../modals/Actividad'
import { formatDateTimeToInput } from '@/helpers/Date'
import { useState } from 'react'
import { usePaginacion } from '@/hooks/usePaginacion'
import { useEntregas } from '@/hooks/useEntregas'
import { entregasPorAsignacion } from '@/actions/entrega/entregasPorAsignacion'
import { FilePreview } from '../shared/FilePreview'

export function AsignacionDocente ({ initialAsignacion, idGrupo }) {
  const { handleModal: handleModalEditarAsignacion, modal: modalEditarAsignacion } = useModal()
  const { handleModal: handleModalPreview, modal: modalPreview } = useModal()
  const [asignacion, setAsignacion] = useState(initialAsignacion)
  const { entregas, updateEntregas } = useEntregas({ initialState: [] })
  const { loading, page, totalPage, updatePage } = usePaginacion({ idToFilter: asignacion.idActividad, updateState: updateEntregas, action: entregasPorAsignacion })
  const [file, setFile] = useState()

  function updateFile (newFile) {
    setFile(newFile)
  }

  function updateAsignacion (newAsignacion) {
    setAsignacion(newAsignacion)
  }
  return (
    <>

      <div className='flex justify-end mt-2'>
        <PageOptions
          text='Opciones de asignación'
          handleEdit={handleModalEditarAsignacion}
        />
      </div>

      {
        handleModalPreview &&
          <FilePreview file={file} handleModal={handleModalPreview} />
      }
      <EntregasAsignacionesDocente idGrupo={asignacion.idGrupo} entregas={entregas} updateFile={updateFile} />
      {
        modalEditarAsignacion &&
          <Actividad
            action='put'
            formTitle='Editar Asignación'
            handleModal={handleModalEditarAsignacion}
            submitText='Actualizar'
            updateActividad={updateAsignacion}
            idActividad={asignacion.idActividad}
            formState={{
              nombre: asignacion.nombre,
              tipo: asignacion.tipo,
              indicaciones: asignacion.indicaciones,
              puntaje: asignacion.puntaje,
              fecha_cierre: formatDateTimeToInput(asignacion.fecha_cierre),
              extemporaneo: asignacion.extemporaneo
            }}

          />
      }
    </>
  )
}
