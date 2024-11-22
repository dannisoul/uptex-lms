import { useState } from 'react'
import { useRouter } from 'next/navigation'
const INITIAL_STATE = { codigo: '' }

export function useDelete ({ idToDelete, deleteAction, codigo, toast, updateState, handleModal }) {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState(INITIAL_STATE)
  const [pending, setPending] = useState(false)
  const router = useRouter()

  async function handleSubmit (e) {
    e.preventDefault()
    if (errors.codigo !== '') return
    try {
      setPending(true)
      const response = await deleteAction(idToDelete)
      if (response.error) throw new Error(response.errorCode)
      toast.success('Registro eliminado correctamente')
      if (response.redirect) {
        router.push(response.url)
      }
      updateState && updateState({ type: 'delete', payload: response.deletedId })
      handleModal && handleModal()
    } catch (error) {
      console.log(error)
      toast.error('Error al elminar registro, intenta más tarde')
    } finally {
      setPending(false)
    }
  }

  function handleInputChange (e) {
    let error = ''
    setFormData({
      codigo: e.target.value
    })

    if (codigo !== e.target.value) {
      error = 'El codigo no coincide'
    } else {
      error = ''
    }

    setErrors({
      codigo: error
    })
  }

  return { formData, errors, handleSubmit, handleInputChange, pending }
}
