export function Checkbox ({ name, id, value, checked, label, labelClassName, onChange, errors }) {
  return (
    <div className='flex items-center gap-2 relative'>
      <input
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        type='checkbox'
        className='accent-secondary-accent bg-black dark:accent-dark-primary-accent w-4 h-4'
      />
      <label className={'text-primary-text dark:text-[#9ca5ab] ' + labelClassName} htmlFor={id}>{label}</label>
      {errors &&
        <p className='absolute left-0 -bottom-6 w-full text-red-600 font-bold text-[12px] px-2'>{errors}</p>}
    </div>
  )
}
