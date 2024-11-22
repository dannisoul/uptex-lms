import { useState } from 'react'
import validarCorreo from '@/validators/usuario/correo'
import validarContrasena from '@/validators/usuario/contrasena'
import { signIn } from 'next-auth/react'
const INITIAL_STATE = {
  correo: '',
  contrasena: ''
}

export function useLogin ({ toast }) {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState(INITIAL_STATE)
  const [pending, setPending] = useState(false)
  async function handleSubmit (e) {
    e.preventDefault()
    if (checkErrors()) return
    setPending(true)
    try {
      const response = await signIn('credentials', {
        redirect: false,
        correo: formData.correo,
        contrasena: formData.contrasena
      })

      console.log(response)
      if (!response.ok) throw new Error(response.status)
      if (response.status === 200) window.location.href = ''
    } catch (error) {
      console.log(error)
      if (error.message === '401') {
        toast.error('Credenciales no válidas')
      } else {
        toast.error('Error de servidor, intenta más tarde')
      }
    } finally {
      setPending(false)
    }
  }

  function handleInputChange (e) {
    const { name, value } = e.target
    let error = ''
    setFormData({
      ...formData,
      [name]: value
    })

    switch (name) {
      case 'correo': {
        error = validarCorreo(value)
        break
      }
      case 'contrasena': {
        error = validarContrasena(value)
        break
      }
    }

    setErrors({
      ...errors,
      [name]: error
    })
  }

  function checkErrors () {
    const newErrors = { ...errors }
    Object.entries(formData).forEach(([key, value]) => {
      if (value === '') newErrors[key] = 'Campo requerido'
    })
    setErrors(newErrors)
    return Object.values(newErrors).some(error => error !== '')
  }

  return {
    handleSubmit,
    handleInputChange,
    pending,
    formData,
    errors
  }
}
