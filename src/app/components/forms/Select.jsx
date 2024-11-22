'use client'
import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { IconCaretDownFilled, IconCheck } from '@tabler/icons-react'

export default function Select ({ name, options = [], selected = { name: 'Selecciona una opción', value: '' }, setSelected, errors, selectedClassName, optionsClassName, disabled }) {
  function handleChange (e) {
    setSelected(e)
  }
  const textClass = (selected.value === '') ? 'text-[#9ca3af] dark:text-[#95a3af]' : 'text-black dark:text-white'
  return (
    <Listbox name={name} value={selected} onChange={handleChange} disabled={disabled}>
      <div className='relative'>
        <Listbox.Button className={'relative cursor-default pr-10 text-left focus:outline-none  focus-visible:ring-2 focus-visible:ring-white/0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent bg-alpha-bg/20 p-4 rounded-lg outline-none w-full ' + textClass}>
          <span className={'block truncate ' + selectedClassName}>{selected.name}</span>
          <div className='pointer-events-none absolute right-3 top-[50%] translate-y-[-50%] text-primary-text dark:text-dark-primary-text'>
            <IconCaretDownFilled className='text-secondary-accent dark:text-dark-secondary-accent' width={32} height={32} />
          </div>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave='transition ease-in duration-100'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <Listbox.Options className='absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-dark-secondary-bg py-1 shadow-lg ring-1 ring-black/5 focus:outline-none z-10'>
            {options.map((option, index) => {
              option.target = name
              return (
                <Listbox.Option
                  key={`${options.name}-${index}`}
                  className={({ active }) =>
                      `relative cursor-default select-none p-4 pr-10 ${
                        active ? 'bg-alpha-bg/20 text-secondary-accent dark:text-dark-secondary-accent' : 'text-gray-900'
                      }`}
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate dark:text-white ${
                            selected ? 'font-medium' : 'font-normal'
                          } ` + optionsClassName}
                      >
                        {option.name}
                      </span>
                      {selected
                        ? (
                          <span className='absolute inset-y-0 right-4 flex items-center pl-3 text-primary-accent'>
                            <IconCheck />
                          </span>
                          )
                        : null}
                    </>
                  )}
                </Listbox.Option>
              )
            })}
          </Listbox.Options>
        </Transition>
        {errors &&
          <p className='absolute left-0 -bottom-6 w-full text-red-600 font-bold text-[12px] px-2'>{errors}</p>}
      </div>
    </Listbox>
  )
}
