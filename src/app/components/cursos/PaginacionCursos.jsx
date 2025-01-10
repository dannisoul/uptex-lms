'use client'
import { FiltrosCursos } from './FiltrosCursos'
import { useFiltros } from '@/hooks/useFiltros'
import { CursoCard } from './CursoCard'
import { useCallback, useRef } from 'react'
import { IconLoading } from '../icons/IconsFIlled'
import { useInfiniteScrollWithFilters } from '@/hooks/useInfiniteScrollWithFilters'

export function PaginacionCursos () {
  const observer = useRef()
  const { nivel, academia, categoria, onChangeNivel, onChangeAcademia, onChangeCategoria } = useFiltros()
  const { cursos, pending, page, totalPages, updatePage, updateQuery } = useInfiniteScrollWithFilters({ nivel, academia, categoria })
  const lastElementRef = useCallback((node) => {
    if (pending) return
    if (observer.current) observer.current.disconnect()
    observer.current = new window.IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) updatePage(page + 1)
    }, { threshold: 1 })
    if (node) observer.current.observe(node)
  })

  return (
    <>
      <FiltrosCursos
        nivel={nivel}
        academia={academia}
        categoria={categoria}
        onChangeNivel={onChangeNivel}
        onChangeAcademia={onChangeAcademia}
        onChangeCategoria={onChangeCategoria}
        onChangeQuery={updateQuery}
      />
      <div className='grid cardContainer gap-8 place-content-center mt-16'>
        {cursos.map((curso, index) => {
          const avatar = curso.avatar ? `/api/usuarios/images/?idDocente=${curso.idUsuario}&idImagen=${curso.avatar}` : '/mis_cursos/usuario.png'
          const imagen = `/api/cursos/images?idImagen=${curso.imagen}&idDocente=${(curso.idUsuario)}&idCurso=${curso.idCurso}`
          if (index === cursos.length - 1) {
            return (
              <div ref={lastElementRef} key={curso.idGrupo}>
                <CursoCard
                  avatar={avatar}
                  descripcion={curso.descripcion}
                  texto={curso.grupo}
                  id={curso.idGrupo}
                  imagen={imagen}
                  nombre={curso.nombre}
                  ruta='/mis_cursos'
                  inicio={curso.inicio}
                  cierre={curso.cierre}
                />
              </div>
            )
          } else {
            return (
              <div key={curso.idGrupo}>
                <CursoCard
                  avatar={avatar}
                  descripcion={curso.descripcion}
                  texto={curso.grupo}
                  id={curso.idGrupo}
                  imagen={imagen}
                  nombre={curso.nombre}
                  ruta='/mis_cursos'
                  inicio={curso.inicio}
                  cierre={curso.cierre}
                />
              </div>
            )
          }
        })}

      </div>
      {
        pending &&
          <div className='mx-auto mt-8 animate-spin w-8 h-8'>
            <IconLoading width={32} height={32} />
          </div>
      }

    </>
  )
}
