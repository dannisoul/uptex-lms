import { FormContainer } from '../forms/FormContainer'
import { InputText } from '../forms/InputText'
import { useUnidadForm } from '@/hooks/useUnidadForm'

export function Unidad ({ handleModal, idCurso, toast, updateUnidades, submitText, formTitle, action, formState, idUnidad }) {
  const { errors, formData, handleInputChange, handleSubmit, pending } = useUnidadForm({ handleModal, idCurso, toast, updateUnidades, action, formState, idUnidad })
  return (
    <FormContainer
      setVisible={handleModal}
      onSubmit={handleSubmit}
      pending={pending}
      submitText={submitText}
      formTitle={formTitle}
    >
      <InputText
        id='np'
        name='np'
        type='number'
        errors={errors.np}
        value={formData.np}
        onChange={handleInputChange}
        className='text-sm'
        placeholder='Número de la Unidad'
      />
      <div className='mb-4'>
        <InputText
          id='nombre'
          name='nombre'
          type='text'
          errors={errors.nombre}
          value={formData.nombre}
          onChange={handleInputChange}
          className='text-sm'
          placeholder='Nombre de la Unidad'
        />
      </div>
    </FormContainer>
  )
}
