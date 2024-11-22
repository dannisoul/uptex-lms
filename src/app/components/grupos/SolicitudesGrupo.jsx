import { IconTrash, IconUserCheck } from '@tabler/icons-react'
import { useSolicitudes } from '@/hooks/useSolicitudes'
import React, { useState } from 'react'
import { Confirmacion } from '../modals/Confirmacion'
import { useModal } from '@/hooks/useModal'
import { eliminarSolicitud } from '@/actions/usuario/eliminarSolicitud'
import { aceptarSolicitud } from '@/actions/usuario/aceptarSolicitud'
import { Paginacion } from '../shared/Paginacion'
import usePaginacionSolicitudes from '@/hooks/usePaginacionSolicitudes'
import { ActionButton } from '../shared/ActionButton'
import { IconLoading } from '../icons/IconsFIlled'
import Link from 'next/link'

export function SolicitudesGrupo ({ grupo, toast }) {
  const { solicitudes, updateSolicitudes } = useSolicitudes({ initialState: [] })
  const { handleModal: handleModalAceptarSolicitud, modal: modalAceptarSolicitud } = useModal()
  const { handleModal: handleModalEliminarSolicitud, modal: modalEliminarSolicitud } = useModal()
  const [idAlumno, setIdAlumno] = useState()
  const [nombreAlumno, setNombreAlumno] = useState()
  const { totalPage, page, updatePage, loading } = usePaginacionSolicitudes({ solicitudes, updateSolicitudes, idGrupo: grupo.idGrupo })

  function updateIdAlumno (id) {
    setIdAlumno(id)
  }

  function updateNombreAlumno (nombre) {
    setNombreAlumno(nombre)
  }

  return (
    <>
      <section className='w-full bg-white dark:bg-dark-secondary-bg rounded-xl px-8 py-5 shadow-md dark: border dark:border-dark-primary-bg select-none'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text w-9/12'>ALUMNO (A)</th>
              <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text md:table-cell hidden'>GENERO</th>
              <th className='text-center text-[12px] text-primary-text dark:text-dark-primary-text'>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map(alumno => (
              <tr key={alumno.idUsuario} className='hover:bg-gray-100 dark:hover:bg-[#232325] rounded-xl'>
                <td>
                  <Link className='flex gap-2 py-2' href={`/perfil/${alumno.idUsuario}`}>
                    {alumno.avatar === null
                      ? <img className='w-8 h-8 my-auto sm:block hidden' src='/avatar/alumno.png' />
                      : <img className='w-8 h-8 rounded-full sm:block hidden' src={`/api/usuarios/images/?idAlumno=${alumno.idUsuario}&idImagen=${alumno.avatar}`} alt='avatar' />}
                    <div className='flex flex-col'>
                      <span className='text-sm text-black font-medium dark:text-white'>{alumno.paterno} {alumno.materno} {alumno.nombre}</span>
                      <span className='text-[12px] dark:text-dark-secondary-accent font-medium'>{alumno.correo}</span>
                    </div>
                  </Link>
                </td>
                <td className='text-sm md:table-cell hidden dark:text-white'>{alumno.genero === 'M' ? 'Hombre' : 'Mujer'}</td>
                <td className=''>
                  <div className='mx-auto w-fit flex gap-1'>
                    <ActionButton
                      icon={<IconUserCheck />}
                      onClick={() => {
                        updateIdAlumno(alumno.idUsuario)
                        updateNombreAlumno(`${alumno.nombre} ${alumno.paterno} ${alumno.materno}`)
                        handleModalAceptarSolicitud()
                      }}
                    />
                    <ActionButton
                      icon={<IconTrash />}
                      onClick={() => {
                        updateIdAlumno(alumno.idUsuario)
                        updateNombreAlumno(`${alumno.nombre} ${alumno.paterno} ${alumno.materno}`)
                        handleModalEliminarSolicitud()
                      }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {solicitudes.length === 0 && !loading && <p className='text-center text-[14px] text-primary-text dark:text-dark-primary-text my-4'>No hay solicitudes</p>}
        {loading &&
          <div className='mx-auto mt-8 animate-spin w-8 h-8'>
            <IconLoading width={32} height={32} />
          </div>}
        <Paginacion
          page={page}
          totalPages={totalPage}
          updatePage={updatePage}
        />
      </section>

      {modalAceptarSolicitud &&
        <Confirmacion
          action={aceptarSolicitud}
          data={{ idAlumno, idGrupo: grupo.idGrupo }}
          description='¿Deseas aceptar la solicitud de '
          descriptionStrong={`${nombreAlumno}?`}
          formTitle='Aceptar Solicitud'
          handleModal={handleModalAceptarSolicitud}
          submitText='Aceptar'
          toast={toast}
          type='delete'
          updateState={updateSolicitudes}
        />}

      {modalEliminarSolicitud &&
        <Confirmacion
          action={eliminarSolicitud}
          data={{ idAlumno, idGrupo: grupo.idGrupo }}
          description='¿Deseas rechazar la solicitud de '
          descriptionStrong={`${nombreAlumno}?`}
          formTitle='Eliminar Solicitud'
          handleModal={handleModalEliminarSolicitud}
          submitText='Aceptar'
          toast={toast}
          type='delete'
          updateState={updateSolicitudes}
        />}

    </>
  )
}
