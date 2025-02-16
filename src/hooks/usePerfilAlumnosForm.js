import { put } from '@/helpers/forms/alumnos/put'
import { UserContext } from '@/providers/UserProvider'
import { validarNombre, validarAvatar, validarDescripcion, validarNacimiento, validarDireccion, validarFacebook, validarInstagram, validarNacionalidad, validarTwitter } from '@/validators/usuario'
import { useSession } from 'next-auth/react'
import { useContext, useState } from 'react'

const INITIAL_STATE = {
  nombre: '',
  paterno: '',
  materno: '',
  direccion: '',
  fechaNacimiento: '',
  nacionalidad: '',
  facebook: '',
  twitter: '',
  instagram: '',
  descripcion: '',
  avatar: ''

}

const REQUIRED_FIELDS = ['nombre', 'paterno', 'materno', 'fechaNacimiento']

export function usePerfilAlumnosForm ({ initialState, toast }) {
  const [prevFormData, setPrevFormData] = useState(initialState)
  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState(INITIAL_STATE)
  const [pending, setPending] = useState(false)
  const { updateAvatar } = useContext(UserContext)
  const { update: updateJWT } = useSession()

  async function handleSubmit (e) {
    e.preventDefault()
    if (checkErrors()) return
    await put(prevFormData, formData, toast, setPrevFormData, setPending, updateAvatar, updateJWT)
  }

  function checkErrors () {
    const data = { ...formData, nacionalidad: formData.nacionalidad.value }
    const newErrors = { ...errors }
    Object.entries(data).forEach(([key, value]) => {
      if (value === '' && REQUIRED_FIELDS.includes(key)) {
        newErrors[key] = 'Campo requerido'
      }
    })
    setErrors(newErrors)
    return Object.values(newErrors).some(error => error !== '')
  }

  function handleInputChange (e) {
    const { name } = e.target
    let error = ''
    let value = ''
    if (name === 'paterno' || name === 'materno' || name === 'nombre') {
      value = e.target.value
      error = validarNombre(value)
    } else if (name === 'direccion') {
      value = e.target.value
      error = validarDireccion(value)
    } else if (name === 'fechaNacimiento') {
      value = e.target.value
      error = validarNacimiento(value)
    } else if (name === 'facebook') {
      value = e.target.value
      error = validarFacebook(value)
    } else if (name === 'instagram') {
      value = e.target.value
      error = validarInstagram(value)
    } else if (name === 'twitter') {
      value = e.target.value
      error = validarTwitter(value)
    } else if (name === 'descripcion') {
      value = e.target.value
      error = validarDescripcion(value)
    } else if (name === 'avatar') {
      value = e.target.files[0]
      if (!value) return
      error = validarAvatar(value)
    }

    setFormData({
      ...formData,
      [name]: value
    })
    setErrors({
      ...errors,
      [name]: error
    })
  }

  function handleSelectChange (event) {
    const { target, value } = event
    let error = ''

    if (target === 'nacionalidad') {
      error = validarNacionalidad(value)
    }

    setErrors({
      ...errors,
      [target]: error
    })

    setFormData({
      ...formData,
      [target]: event
    })
  }

  return {
    formData,
    errors,
    handleInputChange,
    handleSelectChange,
    handleSubmit,
    pending
  }
}
