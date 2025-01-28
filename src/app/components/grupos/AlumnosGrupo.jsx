'use client'
import { eliminarAlumno } from '@/actions/grupos/eliminarAlumno'
import { useModal } from '@/hooks/useModal'
import { Eliminar } from '../modals/Eliminar'
import { IconTrash } from '@tabler/icons-react'
import { useState } from 'react'
import { useAlumnos } from '@/hooks/useAlumnos'
import { useCorreoAlumno } from '@/hooks/useCorreoAlumno'
import { Paginacion } from '../shared/Paginacion'
import { usePaginacion } from '@/hooks/usePaginacion'
import { ActionButton } from '../shared/ActionButton'
import { IconLoading } from '../icons/IconsFIlled'
import Link from 'next/link'

export function AlumnosGrupo ({ grupo, toast, idGrupo }) {
  const { handleModal: handleModalEliminarAlumno, modal: modalEliminarAlumno } = useModal()
  const { alumnos, updateAlumnos } = useAlumnos({ initialState: [] })
  const [idAlumno, setIdAlumno] = useState()
  const [nombreAlumno, setNombreAlumno] = useState()
  const [correoAlumno, setCorreoAlumno] = useState('')
  const { handleSubmit } = useCorreoAlumno(correoAlumno, idGrupo, toast, updateAlumnos, setCorreoAlumno)
  const { totalPage, page, updatePage, loading } = usePaginacion({ updateAlumnos, idGrupo })

  function handleObtenerCorreo (e) {
    setCorreoAlumno(e.target.value)
  }

  function updateIdAlumno (id) {
    setIdAlumno(id)
  }

  function updateNombreAlumno (nombre) {
    setNombreAlumno(nombre)
  }

  return (
    <section className='w-full bg-white dark:bg-dark-secondary-bg rounded-xl px-8 py-5 shadow-md dark:border dark:border-dark-primary-bg overflow-auto'>
      <form
        className='select-none pb-4 bg-white border-b dark:bg-dark-secondary-bg dark:border-alpha-bg/20 flex'
        onSubmit={handleSubmit}
      >
        <div className='relative sm:w-[400px] w-full pr-10'>
          <input
            className='text-base w-full  dark:bg-dark-tertiary-bg dark:text-white py-2 pl-4 rounded-lg outline-none border border-text-primary-accent dark:border-alpha-bg/20 pr-16'
            placeholder='Correo del alumno'
            type='text'
            required
            value={correoAlumno}
            onChange={handleObtenerCorreo}
            name=''
            id=''
          />
          <button
            className='absolute text-white right-0 top-0 bg-secondary-accent w-16 flex justify-center py-2 rounded-r-lg px-10 dark:border-alpha-bg/20 border'
            type='submit'
          >
            Añadir
          </button>
        </div>
      </form>
      <div className='pt-4 select-none'>
        <table className='w-full'>
          <thead>
            <tr>
              <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text w-9/12'>ALUMNO (A)</th>
              <th className='text-left text-[12px] text-primary-text dark:text-dark-primary-text md:table-cell hidden'>GENERO</th>
              <th className='text-center text-[12px] text-primary-text dark:text-dark-primary-text'>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {alumnos.map(alumno => {
              const avatar = alumno.avatar
                ? (process.env.NEXT_PUBLIC_FOLDER
                    ? `/api/usuarios/imagenes?idUsuario=${alumno.idUsuario}&idImagen=${alumno.avatar}`
                    : 'https://storage.googleapis.com/uptex_lms/uploads' + `/${alumno.idUsuario}/perfil/` + alumno.avatar
                  )
                : '/avatar/avatar_placeholder.jpg'
              return (
                <tr key={alumno.idUsuario} className='hover:bg-gray-100 dark:hover:bg-[#232325] rounded-xl'>
                  <td>
                    <Link className='flex gap-2 py-2' href={`/perfil/${alumno.idUsuario}`}>
                      {alumno.avatar === null
                        ? <img className='w-8 h-8 my-auto sm:block hidden' src='/avatar/alumno.png' />
                        : <img className='w-8 h-8 rounded-full sm:block hidden' src={avatar} alt='avatar' />}
                      <div className='flex flex-col'>
                        <span className='text-sm text-black font-medium dark:text-white'>{alumno.paterno} {alumno.materno} {alumno.nombre} </span>
                        <span className='text-[12px] dark:text-dark-secondary-accent font-medium'>{alumno.correo}</span>
                      </div>
                    </Link>
                  </td>
                  <td className='text-sm md:table-cell hidden dark:text-white'>{alumno.genero === 'M' ? 'Hombre' : 'Mujer'}</td>
                  <td className=''>
                    <div className='mx-auto w-fit'>
                      <ActionButton
                        icon={<IconTrash />}
                        onClick={() => {
                          updateIdAlumno(alumno.idUsuario)
                          updateNombreAlumno(`${alumno.nombre} ${alumno.paterno} ${alumno.materno}`)
                          handleModalEliminarAlumno()
                        }}
                      />
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {alumnos.length === 0 && !loading && <p className='text-center text-[14px] text-primary-text dark:text-dark-primary-text my-4'>No hay alumnos</p>}
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
      </div>

      {modalEliminarAlumno && (
        <Eliminar
          handleModal={handleModalEliminarAlumno}
          updateState={updateAlumnos}
          idToDelete={{ idAlumno, idGrupo: grupo.idGrupo }}
          toast={toast}
          formTitle='Sacar Alumno'
          submitText='Eliminar'
          deleteAction={eliminarAlumno}
          nameToDelete={`a ${nombreAlumno}`}
        />
      )}

    </section>
  )
}
