import { useState } from 'react'
export function useFiltros () {
  const [nivel, setNivel] = useState()
  const [academia, setAcademia] = useState()
  const [categoria, setCategoria] = useState()
  function onChangeNivel (e) {
    const value = e.target.value
    setNivel(prev => {
      if (prev === value) return ''
      return value
    })
  }
  function onChangeAcademia (e) {
    const value = e.target.value
    setAcademia(prev => {
      if (prev === value) return ''
      return value
    })
  }
  function onChangeCategoria (e) {
    const value = e.target.value
    setCategoria(prev => {
      if (prev === value) return ''
      return value
    })
  }

  return ({ nivel, academia, categoria, onChangeNivel, onChangeAcademia, onChangeCategoria })
}
