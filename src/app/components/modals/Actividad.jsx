import { useActividadForm } from '@/hooks/useActividadForm'
import { Checkbox } from '../forms/Checkbox'
import { FormContainer } from '../forms/FormContainer'
import { InputDate } from '../forms/InputDate'
import { InputText } from '../forms/InputText'
import Select from '../forms/Select'
import { TextArea } from '../forms/TextArea'

export function Actividad ({ handleModal, idGrupo, updateActividades, formTitle, submitText, action }) {
  const {
    errors,
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    pending
  } = useActividadForm({ idGrupo, action, updateActividades, handleModal })

  return (
    <FormContainer
      formTitle={formTitle}
      submitText={submitText}
      onSubmit={handleSubmit}
      pending={pending}
      setVisible={() => {
        handleModal()
      }}
    >
      <InputText
        placeholder='Nombre de la actividad'
        type='text'
        name='nombre'
        id='nombre'
        className='text-sm'
        errors={errors.nombre}
        value={formData.nombre}
        onChange={handleInputChange}
      />
      <Select
        options={[
          { value: 1, name: 'Asignación' },
          { value: 2, name: 'Cuestionario' }
        ]}
        selectedClassName='text-sm'
        optionsClassName='text-sm'
        name='tipo'
        id='tipo'
        errors={errors.tipo}
        setSelected={handleSelectChange}
        selected={formData.tipo}
      />
      <TextArea
        className='text-sm'
        rows='4'
        placeholder='Escribe las indicaciones'
        name='indicaciones'
        id='indicaciones'
        errors={errors.indicaciones}
        onChange={handleInputChange}
        value={formData.indicaciones}
      />
      <InputDate
        placeholder='Ingresa la fecha de cierre'
        name='fecha_cierre'
        id='fecha_cierre'
        errors={errors.fecha_cierre}
        onChange={handleInputChange}
        value={formData.fecha_cierre}
        time
      />
      <Checkbox
        name='extemporaneo'
        id='extemporaneo'
        label='Permitir extemporaneo'
        labelClassName='text-sm'
        errors={errors.extemporaneo}
        onChange={handleInputChange}
        value={formData.extemporaneo}
      />
      <InputText
        placeholder='Puntaje máximo'
        type='text'
        name='puntaje'
        id='puntaje'
        className='text-sm'
        errors={errors.puntaje}
        onChange={handleInputChange}
        value={formData.puntaje}
      />
    </FormContainer>
  )
}
