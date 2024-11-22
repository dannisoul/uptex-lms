import { solicitudPorGrupo } from '@/actions/usuario/solicitudPorGrupo'
import { useEffect, useState } from 'react'
export default function usePaginacionSolicitudes ({ solicitudes, updateSolicitudes, idGrupo }) {
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [loading, setLoading] = useState(false)

  function updatePage (page) {
    setPage(page)
  }

  useEffect(() => {
    setLoading(true)
    solicitudPorGrupo(idGrupo, page)
      .then(res => {
        setTotalPage(res.totalPages)
        updateSolicitudes({ type: 'update', payload: res.solicitudes })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [page])

  return { totalPage, page, updatePage, loading }
}
