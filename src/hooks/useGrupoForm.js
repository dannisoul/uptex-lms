import { useState } from 'react'
import { post } from '@/helpers/forms/grupos/post'
import { put } from '@/helpers/forms/grupos/put'
import { generarCodigo } from '@/helpers/generarCodigo'

import { validarNombre, validarCierre, validarCurso, validarInicio } from '@/validators/grupo'

const INITIAL_STATE = {
  nombre: '',
  idCurso: { name: 'Selecciona una curso', value: '' },
  codigo: '',
  inicio: '',
  cierre: ''
}

export function useGrupoForm ({
  handleModal,
  updateGrupos,
  toast,
  action,
  formState,
  idGrupo
}) {
  const initialState = formState || { ...INITIAL_STATE, codigo: generarCodigo(6) }

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({
    ...INITIAL_STATE,
    idCurso: '',
    codigo: ''
  })

  const [pending, setPending] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    if (checkErrors()) return
    if (action.toLowerCase() === 'post') await post(formData, setPending, handleModal, toast, updateGrupos)
    if (action.toLowerCase() === 'put') await put(formData, idGrupo, setPending, handleModal, toast, updateGrupos, initialState)
  }

  function handleInputChange (e) {
    const { name, value } = e.target
    let error = ''
    let errorDate = { name: '', error: '' }
    switch (name) {
      case 'nombre': {
        error = validarNombre(value)
        break
      }
      case 'inicio': {
        error = validarInicio(value, formData.cierre)
        if (formData.cierre)errorDate = { name: 'cierre', error: validarCierre(value, formData.cierre) }
        break
      }
      case 'cierre': {
        error = validarCierre(formData.inicio, value)
        if (formData.inicio) errorDate = { name: 'inicio', error: validarInicio(formData.inicio, value) }
        break
      }
      default:
        break
    }

    setFormData({
      ...formData,
      [name]: value
    })

    let newErrors = { ...error, [name]: error }
    if (errorDate.error !== '') newErrors = { ...newErrors, [errorDate.name]: errorDate.error }

    setErrors(newErrors)
  }

  function handleSelectChange (selected) {
    const { target, value } = selected
    let error = ''

    switch (target) {
      case 'idCurso': {
        error = validarCurso(value)
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
    const data = {
      ...formData,
      idCurso: formData.idCurso.value
    }
    Object.entries(data).forEach(([entry, value]) => {
      if (value === '') newErrors[entry] = 'Campo requerido'
    })
    setErrors(newErrors)
    console.log(newErrors)
    return Object.values(newErrors).some((error) => error !== '')
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
