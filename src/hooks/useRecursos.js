import { useReducer } from 'react'

export function useRecursos ({ initialState }) {
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'addRecurso': {
        return [...state, payload]
      }
      case 'delete': {
        const idToDelete = payload
        return state.filter(recurso => recurso.idRecurso !== idToDelete)
      }
      default:
        return state
    }
  }
  const [recursos, dispatch] = useReducer(reducer, initialState)

  function updateRecursos ({ type, payload }) {
    dispatch({ type, payload })
  }

  return { recursos, updateRecursos }
}
