export function TextArea ({ className, placeholder, name, id, cols, rows, value, required, onChange, errors }) {
  return (
    <div className='relative'>
      <textarea
        name={name}
        id={id}
        cols={cols || '30'}
        rows={rows || '10'}
        required={required}
        onChange={onChange}
        value={value}
        className={'bg-alpha-bg/20 text-base dark:text-white p-4 rounded-lg outline-none w-full pr-12 focus:outline-none  focus-visible:ring-2 focus-visible:ring-white/0 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-accent resize-none ' + className}
        placeholder={placeholder}
      />
      {errors &&
        <p className='absolute left-0 -bottom-6 w-full text-red-600 font-bold text-[12px] px-2'>{errors}</p>}
    </div>
  )
}
