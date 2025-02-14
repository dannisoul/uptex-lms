import { post } from '@/helpers/forms/actividad/post'
import { validarExtemporaneo, validarFechaCierre, validarIndicaciones, validarNombre, validarPuntaje, validarTipo } from '@/validators/actividad'
import { useState } from 'react'

const INITIAL_STATE = {
  nombre: '',
  tipo: { name: 'Selecciona un tipo de actividad', value: '' },
  indicaciones: '',
  fecha_cierre: '',
  extemporaneo: false,
  puntaje: ''
}

export function useActividadForm ({ handleModal, action, formState, tipos, idGrupo, idActividad, updateActividades }) {
  const initialState = formState || INITIAL_STATE

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({ ...INITIAL_STATE, tipo: '', extemporaneo: '', puntaje: '' })
  const [pending, setPending] = useState(false)

  /* con esto se va a setear bien el valor del select y ya detectara los cambios entre el initialstate y el formdata que actualices */

  /* luego en este useEffect seteamos el idCategoria y idNivel del formData en el select */
  /* useEffect(() => {
    if (formState) {
      const newState = { ...formData }
      newState.idCategoria = (formState ? categorias.find(categoria => categoria.value === initialState.idCategoria) : formState.idCategoria)
      newState.idNivel = (formState ? niveles.find(nivel => nivel.value === initialState.idNivel) : formState.idNivel)
      setFormData(newState)
    }
  }, []) */

  async function handleSubmit (e) {
    e.preventDefault()

    if (checkErrors()) return
    if (action.toLowerCase() === 'post') await post(formData, setPending, handleModal, updateActividades, idGrupo)
    // if (action.toLowerCase() === 'put') await put(formData, idActividad, idCurso, setPending, handleModal, toast, updateCurso, initialState)
  }

  function handleInputChange (e) {
    const { name } = e.target
    let value = ''
    let error = ''
    switch (name) {
      case 'nombre': {
        value = e.target.value
        error = validarNombre(value)
        break
      }
      case 'indicaciones': {
        value = e.target.value
        error = validarIndicaciones(value)
        break
      }
      case 'extemporaneo': {
        value = e.target.checked
        error = validarExtemporaneo(value)
        break
      }
      case 'puntaje': {
        value = e.target.value
        error = validarPuntaje(value)
        break
      }
      case 'fecha_cierre': {
        value = e.target.value
        error = validarFechaCierre(value)
        break
      }
      default:
        break
    }

    setFormData({
      ...formData,
      [name]: value
    })

    setErrors({
      ...errors,
      [name]: error
    })
  }

  function handleSelectChange (selected) {
    const { target, value } = selected
    let error = ''

    switch (target) {
      case 'tipo': {
        error = validarTipo(value)
        break
      }
      default:
        break
    }

    setFormData({
      ...formData,
      [target]: selected
    })

    setErrors({
      ...errors,
      [target]: error
    })
  }

  function checkErrors () {
    const newErrors = { ...errors }
    const data = { ...formData, tipo: formData.tipo.value }
    Object.entries(data).forEach(([entry, value]) => {
      if (value === '') newErrors[entry] = 'Campo requerido'
    })
    setErrors(newErrors)
    return Object.values(newErrors).some(error => error !== '')
  }

  return {
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    formData,
    errors,
    pending
  }
}
