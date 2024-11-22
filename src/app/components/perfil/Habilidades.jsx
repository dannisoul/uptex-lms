import Select from '../forms/Select'
import { Button } from '../forms/Button'
import { Habilidad } from './Habilidad'
import { useHabilidades } from '@/hooks/useHabilidades'

export function Habilidades ({ usuario, habilidades, initMisHabilidades, toast }) {
  const { misHabilidades, habilidad, errors, onChangeHabilidad, addHabilidad, pending, deleteHabilidad } = useHabilidades({ initState: initMisHabilidades, usuario, toast })
  return (
    <section className='grid grid-cols-1 lg:grid-cols-3 items-center gap-x-4 gap-y-8 mt-8 grow border-b-2 border-alpha-bg/20 pb-8'>
      <div className='flex flex-col gap-8 col-start-1 col-end-4 lg:col-end-2 mb-auto'>
        <h3 className='col-start-1 col-end-4 font-semibold text-center sm:text-left text-secondary-accent text-xl dark:text-dark-secondary-accent'>Habilidades</h3>
        <Select
          placeholder='Habilidad'
          id='habilidad'
          name='habilidad'
          setSelected={onChangeHabilidad}
          options={habilidades}
          selected={habilidad}
          errors={errors.habilidad}
        />
        <Button pending={pending} onClick={addHabilidad} type='button'>Añadir</Button>
      </div>
      <div className='grid grid-cols-2 lg:col-start-2 col-start-1 col-end-4  gap-y-8 gap-x-4 mb-auto transition-all'>
        <h3 className='col-start-1 col-end-3 font-semibold text-center sm:text-left text-secondary-accent text-xl dark:text-dark-secondary-accent'>Mis Habilidades</h3>
        {misHabilidades.map(habilidad => (
          <Habilidad key={`habilidad-${habilidad.idHabilidad}`} habilidad={habilidad} onDelete={deleteHabilidad} />
        ))}

      </div>
    </section>
  )
}
