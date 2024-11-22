import { FormContainer } from '../forms/FormContainer'
import { InputText } from '../forms/InputText'
import { useTemaForm } from '@/hooks/useTemaForm'
import { TextArea } from '../forms/TextArea'

export function Tema ({ handleModal, idUnidad, toast, updateTemas, formTitle, submitText, action, idTema, formState }) {
  const { errors, formData, handleInputChange, handleSubmit, pending } = useTemaForm({ handleModal, idUnidad, toast, updateTemas, action, idTema, formState })
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
        type='text'
        errors={errors.np}
        value={formData.np}
        onChange={handleInputChange}
        className='text-sm'
        placeholder='Número del Tema'
      />
      <InputText
        id='nombre'
        name='nombre'
        type='text'
        errors={errors.nombre}
        value={formData.nombre}
        onChange={handleInputChange}
        className='text-sm'
        placeholder='Nombre del Tema'
      />
      <div className='mb-4'>
        <TextArea
          id='descripcion'
          name='descripcion'
          placeholder='Descripción'
          value={formData.descripcion}
          errors={errors.descripcion}
          onChange={handleInputChange}
          rows={5}
          className='text-sm'
        />
      </div>
    </FormContainer>
  )
}
