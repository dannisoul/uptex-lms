import { useEffect, useState } from 'react'
export function usePaginacion ({ updateState, action, idToFilter }) {
  const [page, setPage] = useState(1)
  const [totalPage, setTotalPage] = useState()
  const [loading, setLoading] = useState(false)

  function updatePage (page) {
    setPage(page)
  }

  useEffect(() => {
    setLoading(true)
    action(idToFilter, page)
      .then(response => {
        setTotalPage(response.totalPages)
        updateState({ type: 'update', payload: response.data })
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [page])

  return { totalPage, page, updatePage, loading }
}
