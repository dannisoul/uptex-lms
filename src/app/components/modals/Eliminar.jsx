'use client'
import { useEffect, useState } from 'react'
import { FormContainer } from '../forms/FormContainer'
import { InputText } from '../forms/InputText'
import { generarCodigo } from '@/helpers/generarCodigo'
import { useDelete } from '@/hooks/useDelete'
export function Eliminar ({ idToDelete, nameToDelete, formTitle, submitText, handleModal, updateState, deleteAction, toast }) {
  const [codigo, setCodigo] = useState('')
  const { errors, formData, handleInputChange, handleSubmit, pending } = useDelete({ deleteAction, codigo, idToDelete, toast, updateState, handleModal })
  useEffect(() => {
    setCodigo(generarCodigo(5))
  }, [])
  return (
    <FormContainer
      formTitle={formTitle}
      submitText={submitText}
      setVisible={handleModal}
      onSubmit={handleSubmit}
      pending={pending}
    >
      <div className='flex flex-col gap-4'>
        <p className='text-sm dark:text-white'>
          Estas a punto de eliminar "<span className='font-bold'>{nameToDelete}</span>", esta acción no puede ser deshecha. ¿Estas seguro de continuar?
        </p>
        <div className='flex flex-col gap-2 mb-4'>
          <span className='text-sm dark:text-white'>Para confirmar escribe: <span className='font-bold'>{codigo}</span></span>
          <InputText
            id='codigo'
            name='codigo'
            value={formData.codigo}
            errors={errors.codigo}
            onChange={handleInputChange}
            placeholder='Código de confirmación'
            className='text-sm'
            required
          />
        </div>
      </div>
    </FormContainer>
  )
}
