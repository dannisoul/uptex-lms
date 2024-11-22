'use client'
import { IconCake, IconMailFilled, IconShieldLockFilled, IconUserFilled } from '@tabler/icons-react'
import { Button } from '../forms/Button'
import { InputText } from '../forms/InputText'
import { InputDate } from '../forms/InputDate'
import Select from '../forms/Select'
import { useRegister } from '@/hooks/useRegister'

export function RegisterForm ({ toast }) {
  const {
    handleSubmit,
    errors,
    formData,
    handleInputChange,
    handleSelectChange,
    pending
  } = useRegister({ toast })

  return (
    <form className='grid sm:grid-cols-2 grid-cols-1 gap-8 basis-[650px] xl:grow-0 grow' onSubmit={handleSubmit}>
      <div className='sm:order-1'>
        <InputText
          id='nombre'
          name='nombre'
          type='text'
          value={formData.nombre}
          onChange={handleInputChange}
          errors={errors.nombre}
          placeholder='Nombre(s)'
          required
          icon={<IconUserFilled />}
        />
      </div>
      <div className='sm:order-3'>
        <InputText
          id='paterno'
          name='paterno'
          type='text'
          value={formData.paterno}
          onChange={handleInputChange}
          errors={errors.paterno}
          placeholder='Apellido paterno'
          required
          icon={<IconUserFilled />}
        />
      </div>
      <div className='sm:order-5'>
        <InputText
          id='materno'
          name='materno'
          type='text'
          value={formData.materno}
          onChange={handleInputChange}
          errors={errors.materno}
          placeholder='Apellido materno'
          required
          icon={<IconUserFilled />}
        />
      </div>
      <div className='sm:order-7'>
        <Select
          name='genero'
          options={[{ name: 'Masculino', value: 'M' }, { name: 'Femenino', value: 'F' }]}
          selected={formData.genero}
          setSelected={handleSelectChange}
          errors={errors.genero}
        />
      </div>
      <div className='sm:order-2'>
        <InputText
          id='correo'
          name='correo'
          type='email'
          value={formData.correo}
          onChange={handleInputChange}
          errors={errors.correo}
          placeholder='Correo'
          required
          icon={<IconMailFilled />}
        />
      </div>
      <div className='sm:order-4'>
        <InputText
          id='contrasena'
          name='contrasena'
          type='password'
          value={formData.contrasena}
          onChange={handleInputChange}
          errors={errors.contrasena}
          placeholder='Contraseña'
          required
          icon={<IconShieldLockFilled />}
        />
      </div>
      <div className='sm:order-6'>
        <InputText
          id='contrasena2'
          name='contrasena2'
          type='password'
          value={formData.contrasena2}
          onChange={handleInputChange}
          errors={errors.contrasena2}
          placeholder='Repite la contraseña'
          required
          icon={<IconShieldLockFilled />}
        />
      </div>
      <div className='sm:order-8'>
        <InputDate
          id='nacimiento'
          name='nacimiento'
          required
          value={formData.nacimiento}
          onChange={handleInputChange}
          errors={errors.nacimiento}
          placeholder='Fecha de nacimiento'
          icon={<IconCake />}
        />
      </div>
      <div className='sm:order-9 w-full sm:col-start-1 sm:col-end-3'>
        <Button disabled={pending} type='submit'>
          Crear Cuenta
        </Button>
      </div>
    </form>
  )
}
