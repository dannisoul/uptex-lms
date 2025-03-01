import { IconCircleCheck, IconCircleCheckFilled, IconDownload, IconEye } from '@tabler/icons-react'
import { ActionButton } from '../shared/ActionButton'

export function EntregasAsignacionesDocente ({ entregas }) {
  return (
    <div className='bg-white mt-4 p-6 rounded-lg shadow-lg'>
      <div className='grid grid-cols-4 bg-[#E6E0F7] p-2 text-[#60499F] font-medium rounded-xl text-center'>
        <span className=''>Datos del alumno</span>
        <span className=''>Estado de entrega</span>
        <span className=''>Fecha y hora de entrega</span>
        <span className=''>Asignar calificacion</span>
      </div>
      <div className='grid grid-cols-4 py-4 items-center justify-center px-2 text-sm'>
        <div className='flex flex-col m-auto'>
          <span className='font-medium'>Daniel Vargas Tapia</span>
          <span className='text-[11px]'>dannitangerine@gmail.com</span>
        </div>
        <div className=''>
          <span className='bg-[#e6e0f7] text-[#60499f] py-2 px-4 rounded-full font-semibold block m-auto w-fit'>En tiempo</span>
        </div>
        <div className='text-center'>
          <span>23 de enero, 2024 a las 15:00 pm</span>
        </div>
        <div className='m-auto'>
          <form className='flex gap-1 items-center'>
            <input className='outline-none border-[#d9d9d9] border-2 p-2 w-[80px] text-center rounded-xl' type='text' />
            <span>pts</span>
            <button className='text-[#8062d6]'>
              <IconCircleCheckFilled />
            </button>
          </form>
        </div>
        <div className='col-span-4 mt-4 w-full px-16 '>
          <span className='text-primary-accent text-sm font-bold'>Archivos</span>
          <ul className='mt-2'>
            <li className='flex justify-between text-sm items-center'>
              Examén Diágnostico.pdf
              <div className='flex gap-2'>
                <ActionButton icon={<IconDownload />} />
                <ActionButton icon={<IconEye />} />
              </div>
            </li>
          </ul>
        </div>
      </div>

    </div>
  )
}
