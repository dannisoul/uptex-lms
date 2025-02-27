import { actividadPorId } from '@/actions/actividad/actividadPorId'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { AsignacionAlumno } from '@/app/components/asignaciones/AsignacionAlumno'
import { AsignacionDocente } from '@/app/components/asignaciones/AsignacionDocente'
import { Toast } from '@/app/components/shared/Toaster'
import { getDeadline } from '@/helpers/Date'
import { getServerSession } from 'next-auth'

export default async function AsignacionPage ({ params }) {
  const { user } = await getServerSession(authOptions)
  const { actividad } = await actividadPorId(params.id)

  return (
    <main className='customSection max-w-[1200px] w-11/12 mx-auto pt-[120px] sm:pt-[150px] mb-16'>
      <section className=''>
        <header className='flex flex-col gap-2 relative'>
          <span className='bg-[#E6E0F7] text-[#60499F] absolute text-sm rounded-lg text-center p-4 font-boldr right-0 top-0 font-semibold'>Puntaje Máximo <br /><span className='font-bold text-xl'>{Math.round(actividad.puntaje)}</span></span>
          <h1 className='sm:text-2xl text-xl font-bold text-secondary-accent dark:text-dark-primary-accent'>
            {actividad.tipo === 1 ? 'Asignacion' : 'Cuestionario'}
          </h1>
          <h2 className='sm:text-2xl text-xl font-bold text-dark-primary-accent'>{actividad.nombre}</h2>
          <div className='mt-4'>
            <span className='bg-[#E6E0F7] text-[#60499F] px-4 py-2 rounded-full'>
              {'Para el ' + getDeadline(actividad.fecha_cierre)}
            </span>
          </div>
        </header>
        <p style={{ whiteSpace: 'pre-wrap' }} className='mt-8 dark:text-dark-primary-text dark:font-medium sm:text-base text-sm'>{actividad.indicaciones}</p>

        {
          user.idRol === 2
            ? <AsignacionDocente asignacion={actividad} />
            : <AsignacionAlumno />

        }

      </section>

      <Toast />
    </main>
  )
}
