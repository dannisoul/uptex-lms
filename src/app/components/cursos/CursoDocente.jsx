'use client'
import { IconPlaylistAdd } from '@tabler/icons-react'
import { useModal } from '@/hooks/useModal'
import { ButtonIcon } from '../shared/IconButton'
import { Unidad } from '../modals/Unidad'
import { Tema } from '../modals/Tema'
import { useTemario } from '@/hooks/useTemario'
import { useState } from 'react'
import { UnidadesGrid } from '../unidades/UnidadesGrid'
import { PageOptions } from '../shared/PageOptions'
import { Curso } from '../modals/Curso'
import { Eliminar } from '../modals/Eliminar'
import { eliminarUnidad } from '@/actions/unidad/eliminar'
import { eliminarTema } from '@/actions/tema/eliminar'
import { desactivarCurso } from '@/actions/curso/desactivarCurso'

export function CursoDocente ({ initialCurso, toast, initialUnidades, initialTemas }) {
  const { handleModal: handleModalUnidad, modal: modalUnidad } = useModal()
  const { handleModal: handleModalEditarUnidad, modal: modalEditarUnidad } = useModal()
  const { handleModal: handleModalEliminarUnidad, modal: modalEliminarUnidad } = useModal()
  const { handleModal: handleModalTema, modal: modalTema } = useModal()
  const { handleModal: handleModalEditarTema, modal: modalEditarTema } = useModal()
  const { handleModal: handleModalEliminarTema, modal: modalEliminarTema } = useModal()
  const { handleModal: handleModalEditarCurso, modal: modalEditarCurso } = useModal()
  const { handleModal: handleModalEliminarCurso, modal: modalEliminarCurso } = useModal()
  const { temas, unidades, updateTemas, updateUnidades } = useTemario({
    initialUnidades,
    initialTemas
  })
  const [idUnidad, setIdUnidad] = useState()
  const [idTema, setIdTema] = useState()
  const [curso, setCurso] = useState(initialCurso)

  function updateIdUnidad (idUnidad) {
    setIdUnidad(idUnidad)
  }
  function updateIdTema (idTema) {
    setIdTema(idTema)
  }
  function updateCurso (curso) {
    setCurso(curso)
  }

  const unidad = unidades.find(unidad => unidad.idUnidad === idUnidad)
  const tema = temas.find(tema => tema.idTema === idTema)

  return (
    <>
      <section className=''>
        <div className='flex justify-between items-center'>

          <h1 className='sm:text-2xl text-xl font-bold text-primary-accent dark:text-dark-primary-accent '>
            {curso.nombre}
          </h1>
          <PageOptions text='Opciones del curso' handleEdit={handleModalEditarCurso} handleDelete={handleModalEliminarCurso} />
        </div>
        <p className='mt-8 dark:text-dark-primary-text dark:font-medium sm:text-base text-sm'>
          {curso.descripcion}
        </p>
      </section>

      <section className='mt-16'>
        <div className='flex justify-between items-center mb-10'>
          <h2 className='sm:text-2xl text-xl font-bold text-primary-accent dark:text-dark-primary-accent '>
            Unidades del Curso
          </h2>
          <ButtonIcon
            icon={<IconPlaylistAdd />}
            label='Añadir'
            onClick={handleModalUnidad}
          />
        </div>
        {
          unidades?.length === 0
            ? <span className='dark:text-dark-secondary-accent text-primary-accent py-1 px-3 rounded-xl text-sm font-medium bg-dark-secondary-accent dark:bg-dark-tertiary-bg'>Aún sin unidades</span>
            : <UnidadesGrid
                unidades={unidades}
                temas={temas}
                updateIdUnidad={updateIdUnidad}
                updateIdTema={updateIdTema}
                handleModalTema={handleModalTema}
                handleEditTema={handleModalEditarTema}
                handleEditUnidad={handleModalEditarUnidad}
                handleDeleteUnidad={handleModalEliminarUnidad}
                handleDeleteTema={handleModalEliminarTema}
                actions
                isOpen
              />
        }
      </section>

      {modalUnidad && (
        <Unidad
          handleModal={handleModalUnidad}
          idCurso={curso.idCurso}
          toast={toast}
          updateUnidades={updateUnidades}
          formTitle='Nueva Unidad'
          submitText='Crear Unidad'
          action='post'
        />
      )}
      {modalEditarUnidad && (
        <Unidad
          handleModal={handleModalEditarUnidad}
          idUnidad={idUnidad}
          toast={toast}
          updateUnidades={updateUnidades}
          formTitle='Editar Unidad'
          submitText='Actualizar'
          action='put'
          formState={{
            np: unidad.np,
            nombre: unidad.nombre
          }}
        />
      )}
      {modalEliminarUnidad && (
        <Eliminar
          handleModal={handleModalEliminarUnidad}
          idToDelete={{ idCurso: curso.idCurso, idUnidad }}
          toast={toast}
          formTitle='Eliminar Unidad'
          submitText='Eliminar'
          deleteAction={eliminarUnidad}
          updateState={updateUnidades}
          nameToDelete={`Unidad ${unidad.np} - ${unidad.nombre}`}
        />
      )}
      {modalTema && (
        <Tema
          handleModal={handleModalTema}
          idUnidad={idUnidad}
          toast={toast}
          updateTemas={updateTemas}
          formTitle='Nuevo Tema'
          submitText='Crear Tema'
          action='post'
        />
      )}
      {modalEditarTema && (
        <Tema
          handleModal={handleModalEditarTema}
          idTema={idTema}
          toast={toast}
          updateTemas={updateTemas}
          formTitle='Editar Tema'
          submitText='Actualizar'
          action='put'
          formState={{
            np: tema.np,
            nombre: tema.nombre,
            descripcion: tema.descripcion
          }}
        />
      )}
      {modalEliminarTema && (
        <Eliminar
          handleModal={handleModalEliminarTema}
          idToDelete={{ idCurso: curso.idCurso, idUnidad, idTema }}
          toast={toast}
          formTitle='Eliminar Tema'
          submitText='Eliminar'
          deleteAction={eliminarTema}
          updateState={updateTemas}
          nameToDelete={`Tema ${tema.np} - ${tema.nombre}`}
        />
      )}
      {modalEditarCurso && (
        <Curso
          handleModal={handleModalEditarCurso}
          toast={toast}
          idCurso={curso.idCurso}
          updateCurso={updateCurso}
          formTitle='Editar Curso'
          submitText='Actualizar'
          action='put'
          formState={{
            nombre: curso.nombre,
            descripcion: curso.descripcion,
            idCategoria: String(curso.idCategoria),
            idNivel: String(curso.idNivel),
            cursoInterno: Boolean(curso.cursoInterno),
            imagen: curso.imagen
          }}
        />
      )}
      {modalEliminarCurso && (
        <Eliminar
          handleModal={handleModalEliminarCurso}
          idToDelete={curso.idCurso}
          toast={toast}
          formTitle='Eliminar Curso'
          submitText='Eliminar'
          deleteAction={desactivarCurso}
          nameToDelete={`Curso ${curso.nombre}`}
        />
      )}
    </>
  )
}
