export function EntregasAsignacionesDocente ({ entregas }) {
  return (
    <div className='bg-white mt-4 p-4 rounded-lg shadow-lg'>
      <div className='flex bg-[#E6E0F7] p-2 rounde-lg text-[#60499F] font-medium rounded-full'>
        <span className='grow shrink-0 text-center'>Datos del alumno</span>
        <span className='grow shrink-0 text-center'>Estado de entrega</span>
        <span className='grow shrink-0 text-center'>Fecha y hora de entrega</span>
        <span className='grow shrink-0 text-center'>Asignar calificacion</span>
      </div>
    </div>
  )
}
