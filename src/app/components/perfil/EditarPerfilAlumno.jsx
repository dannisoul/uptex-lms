'use client'
import React from 'react'
import { getFormattedDate } from '@/helpers/getFormattedDate'
import paises from './paises.json'
import { RedesSociales } from './RedesSociales'
import { usePerfilAlumnosForm } from '@/hooks/usePerfilAlumnosForm'
import { InformacionPersonal } from './InformacionPersonal'
import { Button } from '../forms/Button'
import { SobreMi } from './SobreMi'

export function EditarPerfilAlumno ({ data, toast }) {
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
    descripcion: data.usuario.descripcion ?? '',
    avatar: data.usuario.avatar ?? ''
  }

  const { formData, errors, handleInputChange, handleSelectChange, handleSubmit, pending } = usePerfilAlumnosForm({ initialState: initialFormData, toast })

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
      <SobreMi
        formData={formData}
        errors={errors}
        handleInputChange={handleInputChange}
      />
      <Button pending={pending} className='w-full sm:w-[300px] ml-auto mt-8'>Actualizar Datos</Button>
    </form>
  )
}
