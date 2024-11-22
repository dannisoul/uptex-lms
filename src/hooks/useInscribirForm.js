import { post } from '@/helpers/forms/inscribir/post'
import { useState } from 'react'

const INITIAL_STATE = {
  codigo: ''
}

export function useInscribirForm ({ handleModal, toast, action }) {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [pending, setPending] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    if (action.toLowerCase() === 'post') await post(formData, setPending, handleModal, toast)
  }

  function handleInputChange (e) {
    const value = e.target.value
    setFormData({
      ...formData,
      codigo: value
    })
  }

  return {
    handleSubmit,
    handleInputChange,
    formData,
    pending
  }
}
