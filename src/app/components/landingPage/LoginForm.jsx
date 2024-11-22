'use client'
import { IconMailFilled, IconShieldLockFilled } from '@tabler/icons-react'
import { Button } from '../forms/Button'
import { InputText } from '../forms/InputText'
import { useLogin } from '@/hooks/useLogin'

export function LoginForm ({ toast }) {
  const {
    handleInputChange,
    handleSubmit,
    errors,
    formData,
    pending

  } = useLogin({ toast })

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-8 basis-[408px]'>
      <InputText
        id='correo'
        name='correo'
        type='email'
        value={formData.correo}
        onChange={handleInputChange}
        errors={errors.correo}
        placeholder='Escribe tu correo'
        required
        icon={<IconMailFilled />}
      />
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
      <Button pending={pending}>Entrar</Button>
    </form>
  )
}
