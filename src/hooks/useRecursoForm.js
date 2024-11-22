import { validarAudio } from '@/validators/recurso/audio'
import { validarDoc } from '@/validators/recurso/doc'
import { validarImagen } from '@/validators/recurso/imagen'
import { validarPdf } from '@/validators/recurso/pdf'
import { validarPresentacion } from '@/validators/recurso/ppt'
import { validarTextoPlano } from '@/validators/recurso/txt'
import { validarVideo } from '@/validators/recurso/video'
import { validarHojaDeCalculo } from '@/validators/recurso/xls'
import { useState } from 'react'
import { post } from '@/helpers/forms/recursos/post'

const INITIAL_STATE = {
  recurso: ''
}

export function useRecursoForm ({ handleModal, updateRecursos, toast, idCurso, idUnidad, idTema, idFileType, isLoaded }) {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState(INITIAL_STATE)
  const [pending, setPending] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()

    if (!isLoaded || checkErrors()) return
    await post(formData, setPending, handleModal, toast, updateRecursos, idCurso, idUnidad, idTema)
  }

  function handleInputChange (e) {
    const value = e.target.files[0]
    if (!value) return
    let error = ''
    switch (idFileType) {
      case 'imagen': {
        error = validarImagen(value, 5120, '5mb')
        break
      }
      case 'video': {
        error = validarVideo(value, 15360, '15mb')
        break
      }
      case 'audio': {
        error = validarAudio(value, 5120, '5mb')
        break
      }
      case 'pdf': {
        error = validarPdf(value, 5120, '5mb')
        break
      }
      case 'doc': {
        error = validarDoc(value, 5120, '5mb')
        break
      }
      case 'ppt': {
        error = validarPresentacion(value, 5120, '5mb')
        break
      }
      case 'xls': {
        error = validarHojaDeCalculo(value, 5120, '5mb')
        break
      }
      case 'txt': {
        error = validarTextoPlano(value, 5120, '5mb')
        break
      }
      default:
        break
    }

    setFormData({
      recurso: value
    })

    setErrors({
      recurso: error
    })
  }

  function checkErrors () {
    const newErrors = { ...errors }
    const data = { ...formData }
    Object.entries(data).forEach(([entry, value]) => {
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
