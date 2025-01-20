import { IconCake, IconMapPin, IconPencil } from '@tabler/icons-react'
import { InputText } from '../forms/InputText'
import paises from './paises.json'
import Select from '../forms/Select'
import { InputDate } from '../forms/InputDate'
import { ImageFileInput } from '../forms/ImageFileInput'

export function InformacionPersonal ({ usuario, formData, errors, handleInputChange, handleSelectChange, rolImgURL }) {
  // const avatarURL = usuario.avatar ? `/api/usuarios/images/?id${rolImgURL}=${usuario.idUsuario}&idImagen=${usuario.avatar}` : '/avatar/avatar_placeholder.jpg'
  const avatarURL = usuario.avatar ? (process.env.NEXT_PUBLIC_BUCKET || 'https://storage.googleapis.com/uptex_lms') + `/uploads/${usuario.idUsuario}/perfil/` + usuario.avatar : '/avatar/avatar_placeholder.jpg'
  return (
    <section className='flex lg:gap-20 gap-10 border-b-2 border-alpha-bg/20 pb-8 lg:flex-nowrap flex-wrap'>
      <ImageFileInput name='avatar' preview={avatarURL} handleInputChange={handleInputChange} errors={errors.avatar} />
      <div className='grid grid-cols-1 sm:grid-cols-2 items-center gap-x-4 gap-y-8 grow lg:basis-auto basis-[100%]'>
        <h3 className='sm:col-start-1 sm:col-end-3 font-semibold text-center sm:text-left text-secondary-accent text-xl dark:text-dark-secondary-accent'>Información Personal</h3>
        <InputText
          icon={<IconPencil />}
          placeholder='Nombre (s)'
          errors={errors.nombre}
          id='nombre'
          name='nombre'
          onChange={handleInputChange}
          required
          value={formData.nombre}
        />
        <InputText
          icon={<IconMapPin />}
          placeholder='Dirección'
          errors={errors.direccion}
          id='direccion'
          name='direccion'
          onChange={handleInputChange}
          value={formData.direccion}
        />
        <InputText
          icon={<IconPencil />}
          placeholder='Apellido paterno'
          errors={errors.paterno}
          id='paterno'
          name='paterno'
          onChange={handleInputChange}
          required
          value={formData.paterno}
        />
        <InputDate
          icon={<IconCake />}
          placeholder='Nacimiento'
          errors={errors.fechaNacimiento}
          id='fechaNacimiento'
          name='fechaNacimiento'
          onChange={handleInputChange}
          value={formData.fechaNacimiento}
        />
        <InputText
          icon={<IconPencil />}
          placeholder='Apellido materno'
          errors={errors.materno}
          id='materno'
          name='materno'
          onChange={handleInputChange}
          required
          value={formData.materno}
        />
        <Select
          placeholder='Nacionalidad'
          errors={errors.nacionalidad}
          id='nacionalidad'
          name='nacionalidad'
          setSelected={handleSelectChange}
          options={paises}
          value={formData.nacionalidad}
          selected={formData.nacionalidad}
        />
      </div>
    </section>
  )
}
