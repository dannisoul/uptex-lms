import { useState } from 'react'
import { validarNombre, validarNp } from '@/validators/unidad'
import { post } from '@/helpers/forms/unidades/post'
import { put } from '@/helpers/forms/unidades/put'

const INITIAL_STATE = {
  np: '',
  nombre: ''
}

export function useUnidadForm ({ handleModal, updateUnidades, idCurso, toast, action, formState, idUnidad }) {
  const initialState = formState || INITIAL_STATE
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState(INITIAL_STATE)
  const [pending, setPending] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()

    if (checkErrors()) return
    if (action.toLowerCase() === 'post') await post(formData, idCurso, setPending, handleModal, toast, updateUnidades)
    if (action.toLowerCase() === 'put') await put(formData, idUnidad, setPending, handleModal, toast, updateUnidades, initialState)
  }

  function handleInputChange (e) {
    const { name } = e.target
    const value = e.target.value
    let error = ''
    switch (name) {
      case 'nombre': {
        error = validarNombre(value)
        break
      }
      case 'np': {
        error = validarNp(value)
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

  function checkErrors () {
    const newErrors = { ...errors }
    Object.entries(formData).forEach(([entry, value]) => {
      if (value === '') newErrors[entry] = 'Campo requerido'
    })
    setErrors(newErrors)
    return Object.values(newErrors).some(error => error !== '')
  }

  return {
    handleSubmit,
    handleInputChange,
    formData,
    errors,
    pending
  }
}
