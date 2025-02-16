'use client'

export function InputDate ({ id, name, placeholder, icon, value, onChange, errors, time = false }) {
  const textClass = (value) ? 'text-black dark:text-white' : 'text-[#9ca3af]'
  return (
    <div
      className='flex relative w-full'
      role='button' tabIndex={0} /* onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') document.getElementById(id).showPicker()
      }} */
    >
      <input
        id={id}
        name={name}
        type={time ? 'datetime-local' : 'date'}
        onClick={(e) => {
          e.target.showPicker()
        }}
        className={'bg-alpha-bg/20 text-base dark:text-white p-4 pr-5 rounded-lg outline-none w-full focus:outline-none  focus-visible:ring-2 focus-visible:ring-white/0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent text-transparent ' + textClass}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      <span className={'absolute left-4 top-[50%] translate-y-[-50%] pointer-events-none text-sm ' + textClass}>
        {value || placeholder}
      </span>
      {errors &&
        <p className='absolute left-0 -bottom-6 w-full text-red-600 font-bold text-[12px] px-2'>{errors}</p>}
    </div>
  )
}
