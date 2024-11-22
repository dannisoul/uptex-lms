import { IconBrandFacebook, IconBrandInstagram, IconBrandX } from '@tabler/icons-react'
import { InputText } from '../forms/InputText'

export function RedesSociales ({ formData, errors, handleInputChange }) {
  return (
    <section className='grid grid-cols-1 lg:grid-cols-3 items-center gap-x-4 gap-y-8 mt-8 grow border-b-2 border-alpha-bg/20 pb-8'>
      <h3 className='lg:col-start-1 lg:col-end-4 text-center sm:text-left font-semibold text-secondary-accent text-xl dark:text-dark-secondary-accent'>Redes Sociales</h3>
      <InputText
        icon={<IconBrandFacebook />}
        placeholder='Facebook'
        errors={errors.facebook}
        id='facebook'
        name='facebook'
        onChange={handleInputChange}
        value={formData.facebook}
      />
      <InputText
        icon={<IconBrandInstagram />}
        placeholder='Instagram'
        errors={errors.instagram}
        id='instagram'
        name='instagram'
        onChange={handleInputChange}
        value={formData.instagram}
      />
      <InputText
        icon={<IconBrandX />}
        placeholder='Twitter'
        errors={errors.twitter}
        id='twitter'
        name='twitter'
        onChange={handleInputChange}
        value={formData.twitter}
      />
    </section>
  )
}
