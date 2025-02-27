'use client'
import { useModal } from '@/hooks/useModal'
import { PageOptions } from '../shared/PageOptions'
import { EntregasAsignacionesDocente } from './EntregasAsignacionesDocente'
import { Actividad } from '../modals/Actividad'
import { formatDateTimeToInput } from '@/helpers/Date'

export function AsignacionDocente ({ asignacion, entregas }) {
  const { handleModal: handleModalEditarAsignacion, modal: modalEditarAsignacion } = useModal()
  console.log(asignacion)
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
            updateActividades={null}
            formState={{
              ...asignacion,
              fecha_cierre: formatDateTimeToInput(asignacion.fecha_cierre)
            }}

          />
      }
    </>
  )
}
