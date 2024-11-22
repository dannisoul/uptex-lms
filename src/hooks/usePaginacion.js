import { obtenerAlumnosPorGrupo } from '@/actions/grupos/obtenerAlumnosPorGrupo'
import { useEffect, useState } from 'react'
export function usePaginacion ({ updateAlumnos, idGrupo }) {
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [loading, setLoading] = useState(false)

  function updatePage (page) {
    setPage(page)
  }

  useEffect(() => {
    setLoading(true)
    obtenerAlumnosPorGrupo(idGrupo, page)
      .then(res => {
        setTotalPage(res.totalPages)
        updateAlumnos({ type: 'update', payload: res.alumnos })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [page])

  return { totalPage, page, updatePage, loading }
}
