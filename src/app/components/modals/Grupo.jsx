import { IconCalendarEvent } from '@tabler/icons-react'
import { InputText } from '../forms/InputText'
import { InputDate } from '../forms/InputDate'
import { FormContainer } from '../forms/FormContainer'
import { useGrupoForm } from '@/hooks/useGrupoForm'
import Select from '../forms/Select'

export function Grupo ({ handleModal, updateGrupos, toast, formState, formTitle, submitText, action, idGrupo, cursos, disableCursosSelect }) {
  const {
    errors,
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    pending
  } = useGrupoForm({ handleModal, updateGrupos, toast, formState, action, idGrupo })
  return (

    <FormContainer setVisible={handleModal} onSubmit={handleSubmit} pending={pending} formTitle={formTitle} submitText={submitText}>
      <InputText
        id='nombre'
        name='nombre'
        value={formData.nombre}
        onChange={handleInputChange}
        errors={errors.nombre}
        placeholder='Nombre de tu grupo'
        className='text-sm self-start'
        required
      />

      <Select
        name='idCurso'
        selected={formData.idCurso}
        setSelected={handleSelectChange}
        errors={errors.idCurso}
        options={cursos}
        disabled={disableCursosSelect}
        selectedClassName='text-sm'
        optionsClassName='text-sm'
      />
      <span className='text-sm bg-alpha-bg/20 dark:text-white p-4 rounded-lg outline-none w-full pr-12 focus:outline-none  focus-visible:ring-2 focus-visible:ring-white/0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent'>
        Tu código de invitación es: <strong>{formData.codigo}</strong>
      </span>
      <InputDate
        id='inicio'
        name='inicio'
        required
        value={formData.inicio}
        onChange={handleInputChange}
        errors={errors.inicio}
        placeholder='Fecha de inicio'
        icon={<IconCalendarEvent />}
      />
      <div className='mb-4'>
        <InputDate
          id='cierre'
          name='cierre'
          required
          value={formData.cierre}
          onChange={handleInputChange}
          errors={errors.cierre}
          placeholder='Fecha de cierre'
          icon={<IconCalendarEvent />}
        />
      </div>

    </FormContainer>

  )
}
