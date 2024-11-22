import { useReducer } from 'react'
import { compareVersions } from '@/helpers/compareVersions'
export function useTemario ({ initialUnidades, initialTemas }) {
  const unidadesReducer = (state, action) => {
    const { type } = action
    switch (type) {
      case 'addUnidad': {
        return [...state, action?.payload]
      }
      case 'delete': {
        const idToRemove = action?.payload
        return state.filter(unidad => unidad.idUnidad !== idToRemove)
      }

      case 'updateUnidad': {
        const newUnidades = state.map(unidad => {
          if (unidad.idUnidad === action.payload.idUnidad) {
            return action.payload
          }
          return unidad
        })
        newUnidades.sort((a, b) => Number(a.np) - Number(b.np))
        return newUnidades
      }
    }
  }

  const temasReducer = (state, action) => {
    const { type } = action
    switch (type) {
      case 'addTema': {
        return [...state, action?.payload]
      }
      case 'delete': {
        const idToRemove = action?.payload
        return state.filter(tema => tema.idTema !== idToRemove)
      }
      case 'updateTema': {
        const newTemas = state.map(tema => {
          if (tema.idTema === action.payload.idTema) {
            return action.payload
          }
          return tema
        })
        newTemas.sort(compareVersions)
        return newTemas
      }
    }
  }

  function updateUnidades ({ type, payload }) {
    unidadesDispatch({ type, payload })
  }

  function updateTemas ({ type, payload }) {
    temasDispatch({ type, payload })
  }

  const [unidades, unidadesDispatch] = useReducer(unidadesReducer, initialUnidades)
  const [temas, temasDispatch] = useReducer(temasReducer, initialTemas)

  return { unidades, temas, updateUnidades, updateTemas }
}
