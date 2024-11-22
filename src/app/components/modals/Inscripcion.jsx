import { useInscribirForm } from '@/hooks/useInscribirForm'
import { FormContainer } from '../forms/FormContainer'
import { InputText } from '../forms/InputText'

export function Inscripcion ({ handleModal, updateCursos, action, toast }) {
  const { formData, handleInputChange, handleSubmit, pending } = useInscribirForm({ handleModal, updateCursos, action, toast })
  return (
    <FormContainer
      formTitle='Unirme a un Grupo'
      submitText='Unirme'
      setVisible={handleModal}
      onSubmit={handleSubmit}
      pending={pending}
    >
      <div className='my-2'>
        <InputText
          placeholder='Código de Vinculación'
          name='codigo'
          value={formData.codigo}
          onChange={handleInputChange}
          className='text-sm'
          required
        />
      </div>
    </FormContainer>
  )
}
