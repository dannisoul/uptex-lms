import { gruposPorFiltro } from '@/actions/grupos/gruposPorFiltro'
import { useEffect, useRef, useState } from 'react'

export function useInfiniteScrollWithFilters ({ nivel, academia, categoria }) {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [pending, setPending] = useState(true)
  const [query, setQuery] = useState('')
  const offset = (page - 1) * 12
  const [cursos, setCursos] = useState([])

  const timeout = useRef()

  function updatePage (newPage) {
    setPage(newPage)
  }
  function udpateTotalPages (newTotalPages) {
    setTotalPages(newTotalPages)
  }

  function updateCursos (newCursos) {
    setCursos(newCursos)
  }
  function updateQuery (e) {
    if (timeout.current) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => {
      setQuery(e.target.value)
    }, 1000)
  }

  useEffect(() => {
    setCursos([])
    setPage(1)
    return () => {
      if (timeout.current) clearTimeout(timeout.current)
    }
  }, [nivel, academia, categoria, query])

  useEffect(() => {
    const filtros = {}
    if (nivel) filtros.idNivel = nivel
    if (academia) filtros.cursoInterno = academia
    if (categoria) filtros.idCategoria = categoria
    setPending(true)
    gruposPorFiltro(page, undefined, offset, Object.entries(filtros), query)
      .then(response => {
        if (response.error) throw new Error(response.errorCode)
        setCursos(prev => [...prev, ...response.cursos])
        setTotalPages(response.totalPages)
      })
      .catch(error => console.log(error))
      .finally(() => setPending(false))
  }, [page, nivel, academia, categoria, query])

  return { cursos, page, totalPages, offset, updateCursos, updatePage, udpateTotalPages, updateQuery, pending }
}
