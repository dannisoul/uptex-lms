import { useState } from 'react'
import { validarNombre, validarDescripcion, validarNp } from '@/validators/tema'
import { post } from '@/helpers/forms/temas/post'
import { put } from '@/helpers/forms/temas/put'

const INITIAL_STATE = {
  np: '',
  nombre: '',
  descripcion: ''
}

export function useTemaForm ({ handleModal, updateTemas, idUnidad, toast, formState, action, idTema }) {
  const initialState = formState || INITIAL_STATE
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState(INITIAL_STATE)
  const [pending, setPending] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()

    if (checkErrors()) return
    if (action.toLowerCase() === 'post') await post(formData, idUnidad, setPending, handleModal, toast, updateTemas)
    if (action.toLowerCase() === 'put') await put(formData, idTema, setPending, handleModal, toast, updateTemas, initialState)
  }

  function handleInputChange (e) {
    const { name } = e.target
    const value = e.target.value

    if (name === 'np') {
      if (!/^(?!.*\.\.)[0-9.]*$/.test(value)) return
    }

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
      case 'descripcion': {
        error = validarDescripcion(value)
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
