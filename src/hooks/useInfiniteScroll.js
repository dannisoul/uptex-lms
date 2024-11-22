import { useEffect, useRef, useState } from 'react'

export function useInfiniteScroll ({ updateState, action }) {
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState()
  const [loading, setLoading] = useState(false)
  const debounce = useRef()
  const [query, setQuery] = useState('')

  function handleInputChange (e) {
    if (debounce.current) clearTimeout(debounce.current)
    debounce.current = setTimeout(() => {
      setQuery(e.target.value)
    }, 1000)
  }

  useEffect(() => {
    setPage(1)
    updateState({ type: 'reset' })
  }, [query])

  useEffect(() => {
    setLoading(true)
    action(page, query)
      .then(response => {
        updateState({ type: 'append', payload: response.data })
        setTotalPages(response.totalPages)
      })
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
  }, [page, query])

  function updatePage (page) {
    setPage(page)
  }
  return { page, updatePage, totalPages, loading, handleInputChange }
}
