'use client'
import { IconSearch } from '@tabler/icons-react'
import { useModal } from '@/hooks/useModal'
import { Inscripcion } from '../modals/Inscripcion'
import { useCursos } from '@/hooks/useCursos'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { gruposPorAlumnoConPaginacion } from '@/actions/grupos/gruposPorAlumnoConPaginacion'
import { useCallback, useRef } from 'react'
import { NuevoCurso } from './NuevoCurso'
import { IconLoading } from '../icons/IconsFIlled'
import { CursoCard } from './CursoCard'

export function CursosAlumno ({ initialCursos, user, toast }) {
  const { modal, handleModal } = useModal()
  const { cursos, updateCursos } = useCursos({ initialState: initialCursos })
  const { page, totalPages, updatePage, loading, handleInputChange } = useInfiniteScroll({ action: gruposPorAlumnoConPaginacion, updateState: updateCursos })
  const observer = useRef()
  const lastElementRef = useCallback((node) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new window.IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && page < totalPages) updatePage(page + 1)
    }, { threshold: 1 })
    if (node) observer.current.observe(node)
  })
  return (
    <>
      <div className='flex justify-between items-start flex-wrap sm:flex-nowrap gap-8'>
        <h1 className='text-2xl text-primary-accent font-bold sm:grow-0 grow min-w-[200px] sm:ml-0 ml-2'>Mis cursos </h1>
        <div className='relative min-w-[250px] sm:grow-0 grow'>
          <input className='px-4 py-2 border-none outline-none rounded-full w-full dark:bg-[#3b3b3b] dark:text-white' onChange={handleInputChange} type='text' placeholder='Buscar' />
          <IconSearch className='absolute top-[50%] right-4 translate-y-[-50%] text-primary-text dark:text-[#a1aab1]' />
        </div>
      </div>
      <section className='grid cardContainer gap-8 place-content-center mt-16'>
        <NuevoCurso handleClick={handleModal} title='Nuevo Curso' title2='Crea un nuevo curso' />
        {cursos.map((curso, index) => {
          // const avatar = curso.avatar ? `/api/usuarios/images/?idDocente=${curso.idUsuario}&idImagen=${curso.avatar}` : '/mis_cursos/usuario.png'
          // const imagen = `/api/cursos/images?idImagen=${curso.imagen}&idDocente=${(curso.idUsuario)}&idCurso=${curso.idCurso}`
          const avatar = curso.avatar ? (process.env.NEXT_PUBLIC_BUCKET || 'https://storage.googleapis.com/uptex_lms') + `/uploads/${curso.idUsuario}/perfil/${curso.avatar}` : '/mis_cursos/usuario.png'
          const imagen = `${process.env.NEXT_PUBLIC_BUCKET || 'https://storage.googleapis.com/uptex_lms'}/uploads/${curso.idUsuario}/cursos/${curso.idCurso}/${curso.imagen}`

          if (index === cursos.length - 1) {
            return (
              <div key={`${curso.nombre}-${curso?.idGrupo}`} ref={lastElementRef}>
                <CursoCard
                  avatar={avatar}
                  nombre={curso.nombre}
                  texto={curso.grupo}
                  imagen={imagen}
                  descripcion={curso.descripcion}
                  id={curso?.idGrupo}
                  ruta='/mis_cursos'
                />
              </div>
            )
          } else {
            return (
              <div key={`${curso.nombre}-${curso?.idGrupo}`}>
                <CursoCard
                  avatar={avatar}
                  nombre={curso.nombre}
                  texto={curso.grupo}
                  imagen={imagen}
                  descripcion={curso.descripcion}
                  id={curso?.idGrupo}
                  ruta='/mis_cursos'
                />
              </div>
            )
          }
        })}
      </section>
      {
        loading &&
          <div className='mx-auto mt-8 animate-spin w-8 h-8'>
            <IconLoading width={32} height={32} />
          </div>
      }
      {
        modal &&
          <Inscripcion
            handleModal={handleModal}
            action='post'
            toast={toast}
          />
      }
    </>
  )
}
