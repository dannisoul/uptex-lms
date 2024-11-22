import { useReducer } from 'react'

export function useAlumnos ({ initialState }) {
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'addAlumno': {
        return [...state, payload]
      }
      case 'delete': {
        return state.filter(alumno => alumno.idUsuario !== payload)
      }
      case 'update': {
        return payload
      }
    }
  }

  function updateAlumnos (action) {
    dispatch({ type: action.type, payload: action.payload })
  }

  const [alumnos, dispatch] = useReducer(reducer, initialState)

  return { alumnos, updateAlumnos }
}
