import { useReducer } from 'react'

export function useEntregas ({ initialState }) {
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'add': {
        return [...state, payload]
      }
      case 'delete': {
        const idToDelete = payload
        return state.filter(entrega => entrega.idEntrega !== idToDelete)
      }
      case 'update': {
        return payload
      }
      default:
        return state
    }
  }
  const [entregas, dispatch] = useReducer(reducer, initialState)

  function updateEntregas ({ type, payload }) {
    dispatch({ type, payload })
  }

  return { entregas, updateEntregas }
}
