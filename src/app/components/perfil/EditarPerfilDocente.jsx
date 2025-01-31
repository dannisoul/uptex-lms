'use client'
import { usePerfilDocenteForm } from '@/hooks/usePerfilDocenteForm'
import { Button } from '../forms/Button'
import { Contacto } from './Contacto'
import { Habilidades } from './Habilidades'
import { InformacionPersonal } from './InformacionPersonal'
import { RedesSociales } from './RedesSociales'
import { getFormattedDate } from '@/helpers/getFormattedDate'
import paises from './paises.json'

export function EditarPerfilDocente ({ data, toast }) {
  const initialFormData = {
    nombre: data.usuario.nombre,
    paterno: data.usuario.paterno,
    materno: data.usuario.materno,
    direccion: data.usuario.direccion ?? '',
    fechaNacimiento: getFormattedDate(data.usuario.fechaNacimiento),
    nacionalidad: paises.find(pais => pais.value === data.usuario?.nacionalidad) ?? { name: 'Selecciona tu nacionalidad', value: '' },
    facebook: data.usuario.facebook ?? '',
    twitter: data.usuario.twitter ?? '',
    instagram: data.usuario.instagram ?? '',
    correo: data.usuario.correo,
    telefono: data.usuario.telefono ?? '',
    idEspecialidad: data.especialidades.find(especialidad => especialidad.value === data.usuario?.idEspecialidad) ?? { name: 'Selecciona una especialidad', value: '' },
    avatar: data.usuario.avatar ?? ''

  }
  const { formData, errors, handleInputChange, handleSelectChange, handleSubmit, pending } = usePerfilDocenteForm({ initialState: initialFormData, toast })
  return (
    <form onSubmit={handleSubmit}>
      <InformacionPersonal
        usuario={data.usuario}
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
      <RedesSociales
        usuario={data.usuario}
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
      />
      <Contacto
        usuario={data.usuario}
        especialidades={data.especialidades}
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSelectChange={handleSelectChange}
      />
      <Habilidades
        usuario={data.usuario}
        habilidades={data.habilidades}
        initMisHabilidades={data.misHabilidades}
        toast={toast}
      />
      <Button pending={pending} className='w-full sm:w-[300px] ml-auto mt-8'>Actualizar Datos</Button>
    </form>
  )
}
