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
              const avatar = grupo.avatar
                ? (process.env.NEXT_PUBLIC_BUCKET
                    ? (process.env.NEXT_PUBLIC_BUCKET || 'https://storage.googleapis.com/uptex_lms/uploads') + `/${grupo.idUsuario}/perfil/${grupo.avatar}`
                    : `/api/usuarios/imagenes?idUsuario=${grupo.idUsuario}&idImagen=${grupo.avatar}`)
                : '/mis_cursos/usuario.png'
              const imagen = process.env.NEXT_PUBLIC_BUCKET
                ? `${process.env.NEXT_PUBLIC_BUCKET || 'https://storage.googleapis.com/uptex_lms/uploads'}/${grupo.idUsuario}/cursos/${grupo.idCurso}/${grupo.imagen}`
                : `/api/cursos/imagenes?idImagen=${grupo.imagen}&idUsuario=${(grupo.idUsuario)}&idCurso=${grupo.idCurso}`
              return (
                <CursoCard
                  key={`${grupo.nombre}-${grupo?.idGrupo}`}
                  avatar={avatar}
                  nombre={grupo.nombre}
                  texto={grupo.grupo}
                  imagen={imagen}
                  descripcion={grupo.descripcion}
                  id={grupo?.idGrupo}
                  ruta='/mis_cursos'
                />
              )
            })}
          </div>
        </section>}
    </>
  )
}
