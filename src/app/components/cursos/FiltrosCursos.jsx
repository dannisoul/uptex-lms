'use client'
import { IconSearch, IconTriangleInvertedFilled } from '@tabler/icons-react'
import { useState } from 'react'

const NIVELES = [
  { label: 'Principiante', name: 'idNivel', peer: 'peer/principiante', value: '1', className: 'peer-checked/principiante:bg-primary-accent rounded-lg peer-checked/principiante:text-white' },
  { label: 'Intermedio', name: 'idNivel', peer: 'peer/intermedio', value: '2', className: 'peer-checked/intermedio:bg-primary-accent rounded-lg peer-checked/intermedio:text-white' },
  { label: 'Avanzado', name: 'idNivel', peer: 'peer/avanzado', value: '3', className: 'peer-checked/avanzado:bg-primary-accent rounded-lg peer-checked/avanzado:text-white' }
]

const ACADEMIA = [
  { label: 'Interno', name: 'esCursoInterno', peer: 'peer/interno', value: '0', className: 'peer-checked/interno:bg-primary-accent rounded-lg peer-checked/interno:text-white' },
  { label: 'Externo', name: 'esCursoInterno', peer: 'peer/externo', value: '1', className: 'peer-checked/externo:bg-primary-accent rounded-lg peer-checked/externo:text-white' }
]

const CATEGORIAS = [
  { label: 'Desarrollo Tecnológico', name: 'idCategoria', peer: 'peer/desarrollo', value: '1', className: 'peer-checked/desarrollo:bg-primary-accent peer-checked/desarrollo:text-white' },
  { label: 'Diseño y Creatividad', name: 'idCategoria', peer: 'peer/diseno-categoria', value: '2', className: 'peer-checked/diseno-categoria:bg-primary-accent peer-checked/diseno-categoria:text-white' },
  { label: 'Negocios y Emprendimiento', name: 'idCategoria', peer: 'peer/negocios-emprendimiento', value: '3', className: 'peer-checked/negocios-emprendimiento:bg-primary-accent peer-checked/negocios-emprendimiento:text-white' },
  { label: 'Ciencias y Salud', name: 'idCategoria', peer: 'peer/ciencias-salud', value: '4', className: 'peer-checked/ciencias-salud:bg-primary-accent peer-checked/ciencias-salud:text-white' },
  { label: 'Idiomas y Comunicación', name: 'idCategoria', peer: 'peer/idiomas-comunicacion', value: '5', className: 'peer-checked/idiomas-comunicacion:bg-primary-accent peer-checked/idiomas-comunicacion:text-white' },
  { label: 'Arte y Humanidades', name: 'idCategoria', peer: 'peer/arte-humanidades', value: '6', className: 'peer-checked/arte-humanidades:bg-primary-accent peer-checked/arte-humanidades:text-white' },
  { label: 'Estilo de Vida y Bienestar', name: 'idCategoria', peer: 'peer/estilo-vida-bienestar', value: '7', className: 'peer-checked/estilo-vida-bienestar:bg-primary-accent peer-checked/estilo-vida-bienestar:text-white' },
  { label: 'Tecnologías Emergentes', name: 'idCategoria', peer: 'peer/tecnologias-emergentes', value: '8', className: 'peer-checked/tecnologias-emergentes:bg-primary-accent peer-checked/tecnologias-emergentes:text-white' }
]

export function FiltrosCursos ({ nivel, academia, categoria, onChangeNivel, onChangeAcademia, onChangeCategoria, onChangeQuery }) {
  const [open, setOpen] = useState(false)

  return (
    <div>
      <div>
        <div className='flex items-center justify-between flex-wrap-reverse sm:flex-nowrap gap-4'>
          <label className={'cursor-pointer flex gap-8 items-center dark:bg-dark-secondary-bg bg-white p-4 rounded-t-xl ' + (!open && 'rounded-b-xl')}>
            <input type='checkbox' hidden className='peer/filter' onChange={() => setOpen(!open)} />
            <span className='lg:text-2xl sm:text-xl text-base lg:text-secondary-accent font-bold dark:text-dark-secondary-accent text-nowrap'>Explorar Cursos</span>
            <div className='peer-checked/filter:rotate-180 transition-all w-fit'>
              <IconTriangleInvertedFilled height={18} width={18} className='dark:text-dark-secondary-accent' />
            </div>
          </label>

          <div className='relative min-w-[250px] sm:grow-0 grow'>
            <input
              onChange={onChangeQuery}
              type='text'
              placeholder='Buscar'
              className='px-4 py-2 border-none outline-none rounded-full w-full dark:bg-[#3b3b3b] dark:text-white'
            />
            <IconSearch className='absolute top-[50%] right-4 translate-y-[-50%] text-primary-text dark:text-[#a1aab1]' />
          </div>
        </div>
      </div>
      {
        open &&
          <div className='w-full bg-white dark:bg-dark-secondary-bg dark:text-white rounded-b-xl rounded-tr-xl p-4 flex md:gap-12 sm:gap-8 gap-6 select-none shadow-lg sm:text-sm text-[12px]'>
            <div className='flex flex-col gap-4 flex-shrink-0'>
              <ul className='flex flex-col gap-2'>
                <li className='font-semibold mb-2'>Nivel</li>
                {NIVELES.map(item => (
                  <li key={`nivel-${item.peer}`} className='ml-2'>
                    <label>
                      <input type='checkbox' name={item.name} hidden className={item.peer} onChange={onChangeNivel} value={item.value} checked={(nivel === item.value)} />
                      <span className={'ml-4 relative before:absolute before:w-2 before:h-2 before:bg-primary-accent before:rounded-full before:-left-4 before:top-[50%] before:translate-y-[-50%] cursor-pointer transition-all p-1 rounded-lg ' + item.className}>
                        {item.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              <ul className='flex flex-col gap-2'>
                <li className='font-semibold mb-2'>Academia</li>
                {ACADEMIA.map(item => (
                  <li key={`academia-${item.peer}`} className='ml-2 select-none'>
                    <label>
                      <input type='checkbox' name={item.name} hidden className={item.peer} onChange={onChangeAcademia} value={item.value} checked={(academia === item.value)} />
                      <span className={'ml-4 relative before:absolute before:w-2 before:h-2 before:bg-primary-accent before:rounded-full before:-left-4 before:top-[50%] before:translate-y-[-50%] cursor-pointer transition-all p-1 rounded-lg ' + item.className}>
                        {item.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div className='flex flex-col gap-4'>
              <span className='font-semibold'>Ambito</span>
              <ul className='flex lg:gap-10 sm:gap-8 gap-4 flex-wrap'>
                {CATEGORIAS.map(item => (
                  <li key={`categoria-${item.peer}`} className='select-none'>
                    <label>
                      <input type='checkbox' name={item.name} hidden className={item.peer} onChange={onChangeCategoria} value={item.value} checked={(categoria === item.value)} />
                      <span className={'p-2 rounded-full block text-center cursor-pointer text-nowrap ' + item.className}>{item.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <div />
          </div>
      }
    </div>
  )
}
