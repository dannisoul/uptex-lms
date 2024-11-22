import { useState } from 'react'
import { FormContainer } from '../forms/FormContainer'
import { useRecursoForm } from '@/hooks/useRecursoForm'
import { InputFile2 } from '../forms/InputFile2'

export function Recurso2 ({ handleModal, back, updateFileType, formTitle, maxSize, mimeType, idFileType, toast, idCurso, idUnidad, idTema, updateRecursos }) {
  const [isLoaded, setIsloaded] = useState(false)
  function updateLoaded (state) {
    setIsloaded(state)
  }
  const { errors, formData, handleInputChange, handleSubmit, pending } = useRecursoForm({ idFileType, isLoaded, handleModal, toast, idCurso, idUnidad, idTema, updateRecursos })

  return (
    <FormContainer
      formTitle={formTitle}
      submitText='Subir Recurso'
      onSubmit={handleSubmit}
      pending={pending}
      setVisible={() => {
        updateFileType(null)
        handleModal()
        back()
      }}
    >
      <InputFile2
        onChange={handleInputChange}
        selected={formData.recurso}
        maxSize={maxSize}
        mimeType={mimeType}
        updateLoaded={updateLoaded}
        errors={errors.recurso}
      />
    </FormContainer>
  )
}
