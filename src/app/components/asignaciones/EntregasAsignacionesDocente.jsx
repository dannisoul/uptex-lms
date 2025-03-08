import { IconCircleCheckFilled, IconDownload, IconEye } from '@tabler/icons-react'
import { ActionButton } from '../shared/ActionButton'
import { getDeadline } from '@/helpers/Date'

export function EntregasAsignacionesDocente ({ entregas, idGrupo }) {
  return (
    <div className='bg-white mt-4 p-6 rounded-lg shadow-lg'>
      <div className='grid grid-cols-4 bg-[#E6E0F7] p-2 text-[#60499F] font-medium rounded-xl text-center'>
        <span className=''>Datos del alumno</span>
        <span className=''>Estado de entrega</span>
        <span className=''>Fecha y hora de entrega</span>
        <span className=''>Asignar calificacion</span>
      </div>
      {
        entregas.map(entrega => (
          <div key={`entrega-${entrega.idEntrega}`} className='grid grid-cols-4 py-4 items-center justify-center px-2 text-sm'>
            <div className='flex flex-col m-auto'>
              <span className='font-medium'>{entrega.alumno}</span>
              <span className='text-[11px]'>{entrega.correo}</span>
            </div>
            <div className=''>
              <span className='bg-[#e6e0f7] text-[#60499f] py-2 px-4 rounded-full font-semibold block m-auto w-fit'>{entrega.estado}</span>
            </div>
            <div className='text-center'>
              <span>{getDeadline(entrega.fecha)}</span>
            </div>
            <div className='m-auto'>
              <form className='flex gap-1 items-center'>
                <input value={entrega.calificacion} className='outline-none border-[#d9d9d9] border-2 p-2 w-[80px] text-center rounded-xl' type='text' />
                <span>pts</span>
                <button className='text-[#8062d6]'>
                  <IconCircleCheckFilled />
                </button>
              </form>
            </div>
            <div className='col-span-4 mt-4 w-full px-16 '>
              <span className='text-primary-accent text-sm font-bold'>Archivos</span>
              <ul className='mt-2 flex flex-col gap-2'>
                {
                  entrega.evidencias.map(evidencia => {
                    const path = process.env.NEXT_PUBLIC_FOLDER
                      ? `/api/evidencias?file=${encodeURIComponent(evidencia.nombre)}&idGrupo=${idGrupo}&idAsignacion=${entrega.idActividad}&idEntrega=${entrega.idEntrega}`
                      : `https://storage.googleapis.com/uptex_lms/uploads/grupos/${idGrupo}/${entrega.idActividad}/${entrega.idEntrega}/${evidencia.nombre}`

                    return (
                      <li key={`entrega-${entrega.idEntrega}-evidencia-${evidencia.idEvidencia}`} className='flex justify-between text-sm items-center'>
                        {evidencia.nombre}
                        <div className='flex gap-2'>
                          <a
                            href={path}
                            download={evidencia.nombre}
                          >
                            <ActionButton icon={<IconDownload />} />
                          </a>
                          <ActionButton
                            onClick={() => {

                            }}
                            icon={<IconEye />}
                          />
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </div>
        ))
      }

    </div>
  )
}
