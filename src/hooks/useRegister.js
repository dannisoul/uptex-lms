import { useState } from 'react'
import validarNombre from '@/validators/usuario/nombre'
import validarGenero from '@/validators/usuario/genero'
import validarCorreo from '@/validators/usuario/correo'
import validarContrasena from '@/validators/usuario/contrasena'
import validarContrasena2 from '@/validators/usuario/contrasena2'
import validarNacimiento from '@/validators/usuario/nacimiento'
import { crearUsuario } from '@/actions/usuario/crear'

const INITIAL_STATE = {
  paterno: '',
  materno: '',
  nombre: '',
  genero: { name: 'Selecciona tu genero', value: '' },
  correo: '',
  contrasena: '',
  contrasena2: '',
  nacimiento: ''
}

export function useRegister ({ toast }) {
  const [formData, setFormData] = useState(INITIAL_STATE)
  const [errors, setErrors] = useState({ ...INITIAL_STATE, genero: '' })

  const [pending, setPending] = useState(false)

  async function handleSubmit (e) {
    e.preventDefault()
    if (checkErrors()) return
    try {
      setPending(true)
      const data = { ...formData, genero: formData.genero.value, rol: 3 }
      const response = await crearUsuario(data)
      if (response.error) throw new Error(response.errorCode)
      toast.success('Cuenta creada, ve a Iniciar Sesión para comenzar')
      setFormData(INITIAL_STATE)
    } catch (error) {
      if (error.message === 'ER_DUP_ENTRY') {
        toast.error('El correo que ingresaste ya esta registrado')
      } else {
        toast.error('Error al crear cuenta, intenta más tarde')
      }
    } finally {
      setPending(false)
    }
  }

  function handleInputChange (e) {
    const { name, value } = e.target
    let error = ''
    const newErrors = { ...errors }
    setFormData({
      ...formData,
      [name]: value
    })

    switch (name) {
      case 'nombre':
      case 'paterno':
      case 'materno':
      {
        error = validarNombre(value)
        break
      }
      case 'correo': {
        error = validarCorreo(value)
        break
      }
      case 'contrasena': {
        error = validarContrasena(value)
        if (formData.contrasena2 !== '' && value !== formData.contrasena2) {
          newErrors.contrasena2 = 'Las contraseñas deben ser iguales'
        } else if (formData.contrasena2 !== '' && value === formData.contrasena2) {
          newErrors.contrasena2 = ''
        }
        break
      }
      case 'contrasena2': {
        error = validarContrasena2(formData.contrasena, value)
        break
      }
      case 'nacimiento': {
        error = validarNacimiento(value)
        break
      }
      default: {
        break
      }
    }
    setErrors({
      ...newErrors,
      [name]: error
    })
  }

  function handleSelectChange (selected) {
    const { target, value } = selected
    setFormData({
      ...formData,
      [target]: selected
    })
    let error = ''
    switch (target) {
      case 'genero': {
        error = validarGenero(value)
        break
      }
      default:
        break
    }

    setErrors({
      ...errors,
      [target]: error
    })
  }

  function checkErrors () {
    let newErrors = { ...errors }
    const data = { ...formData, genero: formData.genero.value }
    Object.entries(data).forEach(([key, value]) => {
      if (value === '') newErrors = { ...newErrors, [key]: 'Campo requerido' }
    })
    setErrors(newErrors)
    return Object.values(newErrors).some(error => error !== '')
  }

  return {
    handleSubmit,
    handleInputChange,
    handleSelectChange,
    formData,
    errors,
    pending
  }
}
