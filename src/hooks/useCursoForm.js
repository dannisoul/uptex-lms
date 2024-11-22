import { useEffect, useState } from 'react'
import validarNombre from '@/validators/curso/nombre'
import validarDescripcion from '@/validators/curso/descripcion'
import validarCursoInterno from '@/validators/curso/cursoInterno'
import { validarImagen } from '@/validators/curso/imagen'
import validarCategoria from '@/validators/curso/categoria'
import validarNivel from '@/validators/curso/nivel'
import { post } from '@/helpers/forms/cursos/post'
import { put } from '@/helpers/forms/cursos/put'

const INITIAL_STATE = {
  nombre: '',
  descripcion: '',
  idCategoria: { name: 'Selecciona una categoría', value: '' },
  idNivel: { name: 'Selecciona el nivel', value: '' },
  cursoInterno: false,
  imagen: ''
}

export function useCursoForm ({ handleModal, updateCursos, toast, action, formState, categorias, niveles, idCurso, updateCurso }) {
  const initialState = formState || INITIAL_STATE

  const [formData, setFormData] = useState(initialState)
  const [errors, setErrors] = useState({ ...INITIAL_STATE, idCategoria: '', idNivel: '', cursoInterno: '' })
  const [pending, setPending] = useState(false)

  /* con esto se va a setear bien el valor del select y ya detectara los cambios entre el initialstate y el formdata que actualices */

  /* luego en este useEffect seteamos el idCategoria y idNivel del formData en el select */
  useEffect(() => {
    if (formState) {
      /* destructuras el formdata y setea el idCategoria y idNivel del formData en el select  */
      const newState = { ...formData }
      /* y luego buscas entre las categorias y niveles el que coincida con el id del formData   */
      newState.idCategoria = (formState ? categorias.find(categoria => categoria.value === initialState.idCategoria) : formState.idCategoria)
      newState.idNivel = (formState ? niveles.find(nivel => nivel.value === initialState.idNivel) : formState.idNivel)
      setFormData(newState)
    }
  }, [])

  async function handleSubmit (e) {
    e.preventDefault()

    if (checkErrors()) return
    if (action.toLowerCase() === 'post') await post(formData, setPending, handleModal, toast, updateCursos)
    if (action.toLowerCase() === 'put') await put(formData, idCurso, setPending, handleModal, toast, updateCurso, initialState)
  }

  function handleInputChange (e) {
    const { name } = e.target
    let value = ''
    let error = ''
    switch (name) {
      case 'nombre': {
        value = e.target.value
        error = validarNombre(value)
        break
      }
      case 'descripcion': {
        value = e.target.value
        error = validarDescripcion(value)
        break
      }
      case 'cursoInterno': {
        value = e.target.checked
        error = validarCursoInterno(value)
        break
      }
      case 'imagen': {
        value = e.target.files[0]
        error = validarImagen(value)
        break
      }
      default:
        break
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

  function handleSelectChange (selected) {
    const { target, value } = selected
    let error = ''

    switch (target) {
      case 'idCategoria': {
        error = validarCategoria(value)
        break
      }
      case 'idNivel': {
        error = validarNivel(value)
        break
      }
      default:
        break
    }

    setFormData({
      ...formData,
      [target]: selected
    })

    setErrors({
      ...errors,
      [target]: error
    })
  }

  function checkErrors () {
    const newErrors = { ...errors }
    const data = { ...formData, idCategoria: formData.idCategoria.value, idNivel: formData.idNivel.value }
    Object.entries(data).forEach(([entry, value]) => {
      if (value === '') newErrors[entry] = 'Campo requerido'
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
