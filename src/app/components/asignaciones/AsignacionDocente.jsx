'use client'
import { useModal } from '@/hooks/useModal'
import { PageOptions } from '../shared/PageOptions'
import { EntregasAsignacionesDocente } from './EntregasAsignacionesDocente'
import { Actividad } from '../modals/Actividad'
import { formatDateTimeToInput } from '@/helpers/Date'
import { useState } from 'react'

export function AsignacionDocente ({ initialAsignacion, entregas }) {
  const { handleModal: handleModalEditarAsignacion, modal: modalEditarAsignacion } = useModal()
  const [asignacion, setAsignacion] = useState(initialAsignacion)

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

      <EntregasAsignacionesDocente entregas={entregas} />
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
