import { useReducer } from 'react'

export function useActividades ({ initialState }) {
  const reducer = (state, action) => {
    const { type, payload } = action
    switch (type) {
      case 'add': {
        return [...state, payload]
      }
      case 'delete': {
        return state.filter(actividad => actividad.idActividad === payload.idActividad)
      }
      case 'update': {
        return payload
      }
      default:
        return state
    }
  }
  const [actividades, dispatch] = useReducer(reducer, initialState)

  function updateActividades ({ type, payload }) {
    dispatch({ type, payload })
  }

  return { actividades, updateActividades }
}
