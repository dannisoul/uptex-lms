import { useModal } from '@/hooks/useModal'
import { ButtonIcon } from '../shared/IconButton'
import { IconNotebook, IconSettings } from '@tabler/icons-react'
import { Actividad } from '../modals/Actividad'
import { useActividades } from '@/hooks/useActividades'
import { usePaginacion } from '@/hooks/usePaginacion'
import { actividadesPorGrupo } from '@/actions/actividad/actividadesPorGrupo'
import { Paginacion } from '../shared/Paginacion'
import { ActionButton } from '../shared/ActionButton'
import { IconLoading } from '../icons/IconsFIlled'

export function AsignacionesGrupo ({ grupo }) {
  const { modal: modalActividad, handleModal: handleModalActividad } = useModal()
  const { actividades, updateActividades } = useActividades({ initialState: [] })
  const { loading, page, totalPage, updatePage } = usePaginacion({ updateState: updateActividades, action: actividadesPorGrupo, idToFilter: grupo.idGrupo })

  return (
    <>
      {
        modalActividad &&
          <Actividad
            updateActividades={updateActividades}
            handleModal={handleModalActividad}
            idGrupo={grupo.idGrupo}
            formTitle='Crear Actividad'
            submitText='Crear'
            action='post'
          />
      }

      <section className='w-full bg-white dark:bg-dark-secondary-bg rounded-xl p-5 shadow-md dark: border dark:border-dark-primary-bg select-none min-h-[115px]'>
        <header className='flex justify-end pb-4 border-b dark:bg-dark-secondary-bg dark:border-alpha-bg/20'>
          <ButtonIcon onClick={handleModalActividad} icon={<IconNotebook />} label='Crear Actividad' />
        </header>

        {/* LISTA DE ACTIVIDADES */}
        <div className='pt-4 select-none'>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text pl-4'>NOMBRE</th>
                <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text md:table-cell hidden'>TIPO</th>
                <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text'>ENTREGA</th>
                <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text sm:table-cell hidden'>PUNTAJE</th>
                <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text lg:table-cell hidden'>EXTEMPORANEO</th>
                <th className='text-center text-[12px] text-primary-text dark:text-dark-primary-text'>GESTIÓN</th>
              </tr>
            </thead>
            <tbody>
              {actividades.map(actividad => {
                const href = actividad.tipo === 1 ? `/asignaciones/${actividad.idActividad}` : `/cuestionarios/${actividad.idActividad}`
                console.log(actividad.fecha_cierre.toISOString().substring(0, 10))
                return (
                  <tr key={`actividad-${actividad.idActividad}`} className='hover:bg-gray-100 dark:hover:bg-[#232325] rounded-xl'>
                    <td className='text-sm dark:text-white p-2 pl-4'>{actividad.nombre}</td>
                    <td className='text-sm md:table-cell hidden dark:text-white py-2'>
                      {actividad.tipo === 1 ? 'Asignación' : 'Cuestionario'}
                    </td>
                    <td className='text-sm py-2 dark:text-white'>
                      {actividad.fecha_cierre.toISOString().substring(0, 10)}
                    </td>
                    <td className='text-sm py-2 dark:text-white sm:table-cell hidden'>
                      {Math.round(actividad.puntaje)}
                    </td>
                    <td className='text-sm py-2 lg:table-cell hidden dark:text-white'>
                      {
                        actividad.extemporaneo ? 'Si' : 'No'
                      }
                    </td>
                    <td className='text-sm py-2 dark:text-white'>
                      <div className='mx-auto w-fit flex gap-2'>
                        {/* <ActionButton
                          icon={<IconTrash />}
                          onClick={() => {
                          }}
                        /> */}
                        <a href={href}>
                          <ActionButton
                            icon={<IconSettings />}
                          />
                        </a>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        {loading &&
          <div className='mx-auto mt-8 animate-spin w-8 h-8'>
            <IconLoading width={32} height={32} />
          </div>}
        <div className='mt-4'>
          <Paginacion
            page={page}
            totalPages={totalPage}
            updatePage={updatePage}
          />
        </div>
      </section>
    </>
  )
}
