import { put } from '@/helpers/forms/docentes/put'
import { UserContext } from '@/providers/UserProvider'
import { validarAvatar, validarCorreo, validarDireccion, validarEspecialidad, validarFacebook, validarInstagram, validarNacionalidad, validarNacimiento, validarNombre, validarTelefono, validarTwitter } from '@/validators/usuario'
import { useContext, useState } from 'react'
import { useSession } from 'next-auth/react'

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
  correo: '',
  telefono: '',
  idEspecialidad: '',
  avatar: ''

}

const REQUIRED_FIELDS = ['nombre', 'paterno', 'materno', 'fechaNacimiento', 'correo']

export function usePerfilDocenteForm ({ initialState, toast }) {
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
    const data = { ...formData, nacionalidad: formData.nacionalidad.value, idEspecialidad: formData.idEspecialidad }
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
    } else if (name === 'correo') {
      value = e.target.value
      error = validarCorreo(value)
    } else if (name === 'telefono') {
      value = e.target.value
      error = validarTelefono(value)
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
    } else if (target === 'especialidad') {
      error = validarEspecialidad(value)
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
