import { useReducer } from 'react'

export function useCursos ({ initialState }) {
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'addCurso': {
        return [...state, payload]
      }
      case 'append': {
        return [...state, ...payload]
      }
      case 'reset': {
        return []
      }
      case 'restore': {
        const newCursos = state.map(curso => {
          if (curso.idCurso === payload) {
            return { ...curso, activo: 1 }
          } else {
            return curso
          }
        })
        return newCursos
      }
      default:
        return state
    }
  }
  const [cursos, dispatch] = useReducer(reducer, initialState)

  function updateCursos ({ type, payload }) {
    dispatch({ type, payload })
  }

  return { cursos, updateCursos }
}
