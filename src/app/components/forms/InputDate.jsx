'use client'

export function InputDate ({ id, name, placeholder, icon, value, onChange, errors }) {
  const textClass = (value) ? 'text-black dark:text-white' : 'text-[#9ca3af]'
  return (
    <div
      className='flex relative w-full focus:outline-none  focus-visible:ring-2 focus-visible:ring-white/0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent rounded-lg' role='button' tabIndex={0} onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') document.getElementById(id).showPicker()
      }}
    >
      <label
        className={'bg-alpha-bg/20 text-base p-4 rounded-lg outline-none w-full pr-12 focus:outline-none  focus-visible:ring-2 focus-visible:ring-white/0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent relative ' + textClass} onClick={() => {
          document.getElementById(id).showPicker()
        }} htmlFor={id}
      >{(value) || placeholder}
        <input
          id={id}
          name={name}
          type='date'
          className='absolute left-0 bg-transparent'
          placeholder={placeholder}
          onChange={onChange}
          value={value}
        />
        <div className='text-primary-text dark:text-dark-primary-text absolute top-[50%] right-4 translate-y-[-50%] pointer-events-none'>
          {icon}
        </div>
      </label>
      {errors &&
        <p className='absolute left-0 -bottom-6 w-full text-red-600 font-bold text-[12px] px-2'>{errors}</p>}
    </div>
  )
}
