import { IconMail, IconPhone } from '@tabler/icons-react'
import { InputText } from '../forms/InputText'
import Select from '../forms/Select'

export function Contacto ({ formData, errors, especialidades, handleInputChange, handleSelectChange }) {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-3 items-center gap-x-4 gap-y-8 mt-8 grow border-b-2 border-alpha-bg/20 pb-8'>
      <h3 className='lg:col-start-1 lg:col-end-3 font-semibold text-center sm:text-left text-secondary-accent text-xl dark:text-dark-secondary-accent'>Información de Contacto</h3>
      <h3 className='lg:col-start-3 lg:col-end-4 row-start-4 lg:row-start-1 font-semibold text-center sm:text-left text-secondary-accent text-xl dark:text-dark-secondary-accent'>Especialidad</h3>
      <InputText
        icon={<IconMail />}
        placeholder='Correo Electrónico'
        errors={errors.correo}
        id='correo'
        name='correo'
        onChange={handleInputChange}
        required
        value={formData.correo}
      />
      <InputText
        icon={<IconPhone />}
        placeholder='Teléfono'
        type='tel'
        errors={errors.telefono}
        id='telefono'
        name='telefono'
        onChange={handleInputChange}
        value={formData.telefono}
      />
      <Select
        placeholder='Especialidad'
        errors={errors.idEspecialidad}
        id='idEspecialidad'
        name='idEspecialidad'
        setSelected={handleSelectChange}
        options={especialidades}
        value={formData.idEspecialidad}
        selected={formData.idEspecialidad}
      />
    </section>
  )
}
