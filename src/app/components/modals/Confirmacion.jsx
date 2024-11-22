'use client'
import { useConfirm } from '@/hooks/useConfirm'
import { FormContainer } from '../forms/FormContainer'
export function Confirmacion ({ data, description, descriptionStrong, formTitle, submitText, handleModal, updateState, action, toast, type }) {
  const { handleSubmit, pending } = useConfirm({ action, data, toast, updateState, handleModal, type })
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
          {description}
          <strong>
            {descriptionStrong}
          </strong>
        </p>
      </div>
    </FormContainer>
  )
}
