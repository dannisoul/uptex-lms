export function InputText ({ id, name, type, value, placeholder, icon, required, onChange, errors, className, disabled, defaultValue }) {
  const handleChange = onChange || null
  return (
    <div className='flex relative w-full'>
      <input
        id={id}
        name={name}
        type={type || 'text'}
        value={value}
        placeholder={placeholder}
        required={required}
        onChange={handleChange}
        autoComplete='off'
        disabled={disabled}
        defaultValue={defaultValue}
        className={'bg-alpha-bg/20 text-base dark:text-white p-4 rounded-lg outline-none w-full pr-12 focus:outline-none  focus-visible:ring-2 focus-visible:ring-white/0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent ' + className}
      />
      <div
        className='text-primary-text dark:text-dark-primary-text absolute top-[50%] right-4 translate-y-[-50%] pointer-events-none'
      >
        {icon}
      </div>
      {errors &&
        <p className='absolute left-0 -bottom-6 w-full text-red-600 font-bold text-[12px] px-2'>{errors}</p>}
    </div>
  )
}
