'use client'
import Link from 'next/link'
import { UnidadesGrid } from '../unidades/UnidadesGrid'
import { CursoCard } from './CursoCard'

export function CursoAlumno ({ curso, unidades = [], temas = [], grupos }) {
  return (
    <>
      <section className=''>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col gap-2'>
            <h1 className='sm:text-2xl text-xl font-bold text-secondary-accent dark:text-dark-primary-accent '>
              {curso.nombre}
            </h1>
            <h2 className='sm:text-2xl text-xl font-bold text-primary-accent dark:text-dark-secondary-accent '>por <Link href={`/perfil/${curso.idUsuario}`}>{curso.docente}</Link></h2>
          </div>
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
        </div>
        {
          unidades?.length === 0
            ? <span className='dark:text-dark-secondary-accent text-primary-accent py-1 px-3 rounded-xl text-sm font-medium bg-dark-secondary-accent dark:bg-dark-tertiary-bg'>Aún sin unidades</span>
            : <UnidadesGrid
                unidades={unidades}
                temas={temas}
                isOpen
              />
        }
      </section>
      {grupos.length > 0 &&
        <section className='mt-16'>
          <h2 className='sm:text-2xl text-xl font-bold text-primary-accent dark:text-dark-primary-accent mb-10'>
            Quizá te pueda interesar
          </h2>
          <div className='grid cardContainer gap-8'>
            {grupos.map(grupo => {
              const avatar = grupo.avatar ? `/api/usuarios/images/?idDocente=${grupo.idUsuario}&idImagen=${grupo.avatar}` : '/mis_cursos/usuario.png'
              return (
                <CursoCard
                  key={`${grupo.nombre}-${(grupo?.idGrupo || grupo?.idCurso)}`}
                  avatar={avatar}
                  nombre={grupo.nombre}
                  grupo={grupo.grupo || 'Click para gestionar'}
                  imagen={`/api/cursos/images?idImagen=${grupo.imagen}&idDocente=${(grupo.idUsuario)}&idCurso=${grupo.idCurso}`}
                  descripcion={grupo.descripcion}
                  id={(grupo?.idGrupo || grupo.idCurso)}
                  ruta='/mis_cursos'
                />
              )
            })}
          </div>
        </section>}
    </>
  )
}
