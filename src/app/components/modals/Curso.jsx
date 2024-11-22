import { InputText } from '../forms/InputText'
import Select from '../forms/Select'
import { TextArea } from '../forms/TextArea'
import { Checkbox } from '../forms/Checkbox'
import { InputFile } from '../forms/InputFile'
import { FormContainer } from '../forms/FormContainer'
import { useCursoForm } from '@/hooks/useCursoForm'

const categorias = [
  { name: 'Desarrollo Tecnológico', value: '1' },
  { name: 'Diseño y Creatividad', value: '2' },
  { name: 'Negocios y Emprendimiento', value: '3' },
  { name: 'Ciencias y Salud', value: '4' },
  { name: 'Idiomas y Comunicación', value: '5' },
  { name: 'Arte y Humanidades', value: '6' },
  { name: 'Estilo de Vida y Bienestar', value: '7' },
  { name: 'Tecnologías Emergentes', value: '8' }
]

const niveles = [
  { name: 'Principiante', value: '1' },
  { name: 'Intermedio', value: '2' },
  { name: 'Avanzado', value: '3' }
]

export function Curso ({ handleModal, updateCursos, toast, formState, formTitle, submitText, action, idCurso, updateCurso }) {
  const {
    errors,
    formData,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    pending
  } = useCursoForm({ handleModal, updateCursos, toast, formState, categorias, niveles, action, idCurso, updateCurso })
  return (

    <FormContainer setVisible={handleModal} onSubmit={handleSubmit} pending={pending} formTitle={formTitle} submitText={submitText}>
      <InputText
        id='nombre'
        name='nombre'
        value={formData.nombre}
        onChange={handleInputChange}
        errors={errors.nombre}
        placeholder='Nombre del curso'
        className='text-sm self-start'
        required
      />
      <TextArea
        id='descripcion'
        name='descripcion'
        value={formData.descripcion}
        onChange={handleInputChange}
        errors={errors.descripcion}
        placeholder='Descripción'
        rows='3'
        className='text-sm row-start-2 col-start-1'
        required
      />
      <Select
        name='idCategoria'
        selected={formData.idCategoria}
        setSelected={handleSelectChange}
        errors={errors.idCategoria}
        options={categorias}
        selectedClassName='text-sm'
        optionsClassName='text-sm'
      />
      <Select
        name='idNivel'
        selected={formData.idNivel}
        setSelected={handleSelectChange}
        errors={errors.idNivel}
        options={niveles}
        selectedClassName='text-sm'
        optionsClassName='text-sm'
      />
      <Checkbox
        id='cursoInterno'
        name='cursoInterno'
        checked={formData.cursoInterno}
        value={formData.cursoInterno}
        onChange={handleInputChange}
        errors={errors.cursoInterno}
        label='Curso interno'
        labelClassName='text-sm'
      />
      <span className='text-[12px] font-semibold dark:text-dark-secondary-accent'>Sube una imagen que identifique tu curso</span>
      <InputFile
        id='imagen'
        name='imagen'
        selected={formData.imagen}
        onChange={handleInputChange}
        accept='image/*'
        errors={errors.imagen}
      />
    </FormContainer>

  )
}
