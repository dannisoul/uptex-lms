'use client'
import { PageOptions } from '../shared/PageOptions'
import { useModal } from '@/hooks/useModal'
import { Eliminar } from '../modals/Eliminar'
import { eliminarGrupo } from '@/actions/grupos/eliminar'
import { Grupo } from '../modals/Grupo'
import { useState } from 'react'
import { UnidadesGrid } from '../unidades/UnidadesGrid'
import { AlumnosGrupo } from './AlumnosGrupo'
import { AsignacionesGrupo } from './AsignacionesGrupo'
import { SolicitudesGrupo } from './SolicitudesGrupo'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'

export function GrupoDocente ({
  initialGrupo,
  toast,
  cursos,
  unidades = [],
  temas = [],
  idGrupo
}) {
  const params = useSearchParams()
  const searchParams = new URLSearchParams(params)
  const path = usePathname()
  const { replace } = useRouter()
  const { handleModal: handleModalEditarGrupo, modal: modalEditarGrupo } =
    useModal()
  const { handleModal: handleModalEliminarGrupo, modal: modalEliminarGrupo } =
    useModal()
  const [grupo, setGrupo] = useState(initialGrupo)
  const [selectedOption, setSelectedOption] = useState(
    searchParams.get('option') || '1'
  )
  const page = getPage(selectedOption, grupo, unidades, temas, toast, idGrupo)

  function updateGrupo (newGrupo) {
    setGrupo(newGrupo)
  }

  const handleRadioChange = (event) => {
    setSelectedOption(event.target.value)
    searchParams.set('option', event.target.value)
    replace(`${path}?${searchParams.toString()}`)
  }

  const fechaInicio = new Date(grupo.inicio).toISOString().slice(0, 10)
  const fechaCierre = new Date(grupo.cierre).toISOString().slice(0, 10)

  return (
    <>
      <section className=''>
        <div className='flex flex-col gap-4'>
          <h1 className='sm:text-2xl text-xl font-bold text-primary-accent dark:text-dark-primary-accent '>
            {grupo.nombrecurso}
          </h1>
          <span className=' font-bold text-base sm:text-xl text-secondary-accent dark:text-dark-secondary-accent'>
            {grupo.nombre}
          </span>
          <div className='gap-4 flex items-center'>
            <span className='dark:text-dark-secondary-accent text-primary-accent py-1 px-3 rounded-xl sm:text-sm text-[12px] font-medium bg-dark-secondary-accent dark:bg-dark-tertiary-bg'>
              {`Inicia: ${fechaInicio}`}
            </span>
            <span className='dark:text-dark-secondary-accent text-primary-accent py-1 px-3 rounded-xl sm:text-sm text-[12px] font-medium bg-dark-secondary-accent dark:bg-dark-tertiary-bg'>
              {`Termina: ${fechaCierre}`}
            </span>
          </div>
        </div>
      </section>
      <section className='mt-10 flex justify-between'>
        <div className='flex gap-2 sm:gap-8 items-center sm:flex-nowrap flex-wrap'>
          <select
            value={selectedOption}
            className='border-none outline-none p-2 font-medium rounded-xl sm:hidden block shadow-lg bg-white dark:bg-dark-secondary-bg dark:text-white'
            onChange={handleRadioChange}
          >
            <option value='1'>Unidades</option>
            <option value='2'>Alumnos</option>
            <option value='3'>Asignaciones</option>
            <option value='4'>Solicitudes</option>
          </select>
          <div className='max-w-[170px] sm:block hidden'>
            <input
              className='peer hidden'
              type='radio'
              name='inlineRadioOptions'
              id='inlineRadio1'
              value='1'
              checked={selectedOption === '1'}
              onChange={handleRadioChange}
            />
            <label
              className='cursor-pointer text-center text-sm md:text-base dark:text-white select-none peer-checked:font-semibold peer-checked:bg-white peer-checked:dark:bg-dark-secondary-bg peer-checked:shadow-lg peer-checked:text-black peer-checked:dark:text-white px-4 py-2 peer-checked:rounded-full font-medium transition-all'
              htmlFor='inlineRadio1'
            >
              Unidades
            </label>
          </div>

          <div className='max-w-[170px] sm:block hidden'>
            <input
              className='peer hidden'
              type='radio'
              name='inlineRadioOptions'
              id='inlineRadio2'
              value='2'
              checked={selectedOption === '2'}
              onChange={handleRadioChange}
            />
            <label
              className='cursor-pointer text-center text-sm md:text-base dark:text-white select-none peer-checked:font-semibold peer-checked:bg-white peer-checked:dark:bg-dark-secondary-bg peer-checked:shadow-lg peer-checked:text-black peer-checked:dark:text-white px-4 py-2 peer-checked:rounded-full font-medium transition-all'
              htmlFor='inlineRadio2'
            >
              Alumnos
            </label>
          </div>
          <div className='max-w-[170px] sm:block hidden'>
            <input
              className='peer hidden'
              type='radio'
              name='inlineRadioOptions'
              id='inlineRadio3'
              value='3'
              checked={selectedOption === '3'}
              onChange={handleRadioChange}
            />
            <label
              className='cursor-pointer text-center text-sm md:text-base dark:text-white select-none peer-checked:font-semibold peer-checked:bg-white peer-checked:dark:bg-dark-secondary-bg peer-checked:shadow-lg peer-checked:text-black peer-checked:dark:text-white px-4 py-2 peer-checked:rounded-full font-medium transition-all'
              htmlFor='inlineRadio3'
            >
              Asignaciones
            </label>
          </div>
          <div className='max-w-[170px] sm:block hidden'>
            <input
              className='peer hidden'
              type='radio'
              name='inlineRadioOptions'
              id='inlineRadio4'
              value='4'
              checked={selectedOption === '4'}
              onChange={handleRadioChange}
            />
            <label
              className='cursor-pointer text-center text-sm md:text-base dark:text-white select-none peer-checked:font-semibold peer-checked:bg-white peer-checked:dark:bg-dark-secondary-bg peer-checked:shadow-lg peer-checked:text-black peer-checked:dark:text-white px-4 py-2 peer-checked:rounded-full font-medium transition-all'
              htmlFor='inlineRadio4'
            >
              Solicitudes
            </label>
          </div>
        </div>
        <div>
          <PageOptions
            text='Opciones del curso'
            handleEdit={handleModalEditarGrupo}
            handleDelete={handleModalEliminarGrupo}
          />
        </div>
      </section>

      <section className='mt-8'>{page}</section>

      {modalEditarGrupo && (
        <Grupo
          handleModal={handleModalEditarGrupo}
          updateGrupos={updateGrupo}
          toast={toast}
          formTitle='Editar Grupo'
          submitText='Actualizar'
          action='put'
          idGrupo={grupo.idGrupo}
          cursos={cursos}
          disableCursosSelect
          formState={{
            nombre: grupo.nombre,
            codigo: grupo.codigo,
            inicio: fechaInicio,
            cierre: fechaCierre,
            idCurso: { name: grupo.nombrecurso, value: grupo.idCurso }
          }}
        />
      )}

      {modalEliminarGrupo && (
        <Eliminar
          handleModal={handleModalEliminarGrupo}
          idToDelete={grupo.idGrupo}
          toast={toast}
          formTitle='Eliminar Grupo'
          submitText='Eliminar'
          deleteAction={eliminarGrupo}
          nameToDelete={`Grupo ${grupo.nombre}`}
        />
      )}
    </>
  )
}

function getPage (selectedOption, grupo, unidades, temas, toast, idGrupo) {
  switch (selectedOption) {
    case '1': {
      return unidades?.length === 0
        ? (
          <span className='dark:text-dark-secondary-accent text-primary-accent py-1 px-3 rounded-xl text-sm font-medium bg-dark-secondary-accent dark:bg-dark-tertiary-bg'>Aún sin unidades</span>
          )
        : (
          <UnidadesGrid unidades={unidades} temas={temas} isOpen />
          )
    }
    case '2': {
      return <AlumnosGrupo grupo={grupo} toast={toast} idGrupo={idGrupo} />
    }
    case '3': {
      return <AsignacionesGrupo grupo={grupo} />
    }
    case '4': {
      return <SolicitudesGrupo grupo={grupo} toast={toast} />
    }
    default:
      return null
  }
}
