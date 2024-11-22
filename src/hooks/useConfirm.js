import { useState } from 'react'

export function useConfirm ({ action, data, toast, updateState, handleModal, type }) {
  const [pending, setPending] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    try {
      setPending(true)
      const response = await action(data)
      if (response?.error) throw new Error(response.errorCode)
      toast && toast.success('Operación exitosa')
      updateState && updateState({ type, payload: response.payload })
      handleModal && handleModal()
    } catch (error) {
      console.log(error)
      toast.error('Ha ocurrido un error, intenta más tarde')
    } finally {
      setPending(false)
    }
  }

  return { handleSubmit, pending }
}
