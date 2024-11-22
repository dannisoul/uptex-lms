import { agregarHabilidadDocente } from '@/actions/habilidad/agregarHabilidadDocente'
import { borrarHabilidadDocente } from '@/actions/habilidad/borrarHabilidadDocente'
import { useReducer, useState } from 'react'

export function useHabilidades ({ initState, toast }) {
  const [errors, setErrors] = useState({ habilidad: '' })
  const [habilidad, setHabilidad] = useState({ name: 'Elige una habilidad', value: '' })
  const [pending, setPending] = useState(false)
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'add': {
        return [...state, payload]
      }
      case 'delete': {
        return state.filter(habilidad => habilidad.idHabilidad !== payload)
      }
    }
  }
  const [misHabilidades, dispatch] = useReducer(reducer, initState)
  function updateMisHabilidades (action) {
    dispatch(action)
  }

  function onChangeHabilidad (e) {
    setErrors({ habilidad: '' })
    setHabilidad(e)
  }

  async function addHabilidad () {
    if (habilidad.value === '') return
    if (misHabilidades.some(x => x.idHabilidad === habilidad.value)) {
      setErrors({ habilidad: 'Ya tienes esta habilidad' })
      return
    }
    if (misHabilidades.length >= 8) {
      setErrors({ habilidad: 'No puedes tener mas de 8 habilidades' })
      return
    }

    try {
      setPending(true)
      const response = await agregarHabilidadDocente(habilidad.value)
      if (response.error) throw new Error(response.errorCode)
      updateMisHabilidades({ type: 'add', payload: { idHabilidad: habilidad.value, nombre: habilidad.name } })
      toast && toast.success('Habilidad agregada')
      setHabilidad({ name: 'Elige una habilidad', value: '' })
    } catch (error) {
      console.log(error)
      toast && toast.error('Error al agregar la habilidad, intente más tarde')
    } finally {
      setPending(false)
    }
  }
  async function deleteHabilidad (idHabilidad) {
    try {
      const response = await borrarHabilidadDocente(idHabilidad)
      if (response.error) throw new Error(response.errorCode)
      updateMisHabilidades({ type: 'delete', payload: idHabilidad })
      toast && toast.success('Habilidad eliminada')
    } catch (error) {
      console.log(error)
      toast && toast.error('Error al eliminar habilidad, intente más tarde')
    }
  }
  return { habilidad, misHabilidades, updateMisHabilidades, onChangeHabilidad, errors, addHabilidad, pending, deleteHabilidad }
}
