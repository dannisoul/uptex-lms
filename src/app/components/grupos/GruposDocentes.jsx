'use client'
import { IconSearch } from '@tabler/icons-react'
import { Grupo } from '../modals/Grupo'
import { useModal } from '@/hooks/useModal'
import { useGrupos } from '@/hooks/useGrupos'
import { useInfiniteScroll } from '@/hooks/useInfiniteScroll'
import { useCallback, useRef } from 'react'
import { gruposPorDocenteConPaginacion } from '@/actions/grupos/gruposPorDocenteConPaginacion'
import { CursoCard } from '../cursos/CursoCard'
import { NuevoCurso } from '../cursos/NuevoCurso'
import { IconLoading } from '../icons/IconsFIlled'
export function GruposDocente ({ initialGrupos, user, toast, cursos }) {
  const { modal, handleModal } = useModal()
  const { grupos, updateGrupos } = useGrupos({ initialState: initialGrupos })
  const { page, totalPages, updatePage, loading, handleInputChange } = useInfiniteScroll({ action: gruposPorDocenteConPaginacion, updateState: updateGrupos })
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
        <h1 className='text-2xl text-primary-accent font-bold sm:grow-0 grow min-w-[200px] sm:ml-0 ml-2'>Mis grupos </h1>
        <div className='relative min-w-[250px] sm:grow-0 grow'>
          <input
            onChange={handleInputChange}
            className='px-4 py-2 border-none outline-none rounded-full w-full dark:bg-[#3b3b3b] dark:text-white'
            type='text'
            placeholder='Buscar'
          />
          <IconSearch className='absolute top-[50%] right-4 translate-y-[-50%] text-primary-text dark:text-[#a1aab1]' />
        </div>
      </div>
      <section className='grid cardContainer gap-8 place-content-center mt-16'>
        <NuevoCurso handleClick={handleModal} title='Nuevo Grupo' title2='Crea un nuevo grupo' />
        {grupos.map((grupo, index) => {
          const avatar = grupo.avatar
            ? (process.env.NEXT_PUBLIC_BUCKET
                ? (process.env.NEXT_PUBLIC_BUCKET || 'https://storage.googleapis.com/uptex_lms/uploads') + `/${grupo.idUsuario}/perfil/${grupo.avatar}`
                : `/api/usuarios/imagenes?idUsuario=${grupo.idUsuario}&idImagen=${grupo.avatar}`)
            : '/mis_cursos/usuario.png'
          const imagen = process.env.NEXT_PUBLIC_BUCKET
            ? `${process.env.NEXT_PUBLIC_BUCKET || 'https://storage.googleapis.com/uptex_lms/uploads'}/${grupo.idUsuario}/cursos/${grupo.idCurso}/${grupo.imagen}`
            : `/api/cursos/imagenes?idImagen=${grupo.imagen}&idUsuario=${(grupo.idUsuario)}&idCurso=${grupo.idCurso}`
          if (index === grupos.length - 1) {
            return (
              <div key={`${grupo?.nombre}-${grupo?.idGrupo}`} ref={lastElementRef}>
                <CursoCard
                  avatar={avatar}
                  nombre={grupo?.nombrecurso}
                  texto={grupo?.nombre}
                  imagen={imagen}
                  descripcion={grupo?.descripcion}
                  id={grupo?.idGrupo}
                  ruta='mis_grupos'
                  inicio={grupo?.inicio}
                  cierre={grupo?.cierre}
                />
              </div>
            )
          } else {
            return (
              <div key={`${grupo?.nombre}-${grupo?.idGrupo}`}>
                <CursoCard
                  avatar={avatar}
                  nombre={grupo?.nombrecurso}
                  texto={grupo?.nombre}
                  imagen={imagen}
                  descripcion={grupo?.descripcion}
                  id={grupo?.idGrupo}
                  ruta='mis_grupos'
                  inicio={grupo?.inicio}
                  cierre={grupo?.cierre}
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
        modal && <Grupo
          handleModal={handleModal}
          updateGrupos={updateGrupos}
          toast={toast}
          action='post'
          formTitle='Nuevo Grupo'
          submitText='Crear Grupo'
          cursos={cursos}
                 />
      }
    </>
  )
}
