'use client'
import { useState } from 'react'

export function Accordion ({ nombre, children, actions, title, isOpen = false }) {
  const [open, setOpen] = useState(isOpen)
  return (
    <section className='transition-all duration-300 accordion lg:text-base text-sm'>
      <div className='shadow-lg'>
        <header className={'bg-[#60499f] text-white flex justify-between items-center rounded-t-xl cursor-pointer transition-all duration-300 ' + (!open ? 'rounded-b-xl' : '')}>
          <div onClick={() => setOpen(!open)} className={' flex items-center sm:grow grow-0 w-1/2 sm:w-3/4 ' + (!actions && 'w-full sm:w-full')}>
            <span className={'font-medium p-4 flex gap-1 flex-wrap ' + (actions && 'sm:flex-nowrap flex-wrap ')}>
              <span className='sm:font-normal font-bold shrink-0 '>{title}</span>
              <span className='overflow-hidden text-ellipsis'>
                {nombre}
              </span>
            </span>
          </div>
          <div className='flex gap-2 px-4 py-2'>
            {actions}
          </div>
        </header>
        <ul className={'overflow-hidden transition-all duration-300' + (open ? ' max-h-[3000px] ' : ' max-h-[0px]')}>
          {children}
        </ul>
        <footer className={'bg-[#60499f] rounded-b-xl w-full transition-all duration-300 ' + (open ? 'h-4' : 'h-0')} />
      </div>
    </section>
  )
}
