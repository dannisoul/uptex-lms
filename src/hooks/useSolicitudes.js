import { useReducer } from 'react'

export function useSolicitudes ({ initialState }) {
  const reducer = (state, action) => {
    const { type, payload } = action

    switch (type) {
      case 'addSolicitud': {
        return [...state, payload]
      }
      case 'delete': {
        return state.filter(solicitud => solicitud.idUsuario !== payload)
      }
      case 'update': {
        return payload
      }
    }
  }

  function updateSolicitudes (action) {
    dispatch({ type: action.type, payload: action.payload })
  }

  const [solicitudes, dispatch] = useReducer(reducer, initialState)

  return { solicitudes, updateSolicitudes }
}
