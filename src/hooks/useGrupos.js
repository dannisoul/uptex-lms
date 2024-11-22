import { useReducer } from 'react'

export function useGrupos ({ initialState }) {
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'addGrupo': {
        return [...state, payload]
      }
      case 'append': {
        return [...state, ...payload]
      }
      case 'reset': {
        return []
      }
      default:
        return state
    }
  }
  const [grupos, dispatch] = useReducer(reducer, initialState)

  function updateGrupos ({ type, payload }) {
    dispatch({ type, payload })
  }

  return { grupos, updateGrupos }
}
