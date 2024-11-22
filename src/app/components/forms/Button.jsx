export function Button ({ children, type, pending, className, onClick }) {
  return (
    <button
      disabled={pending}
      type={type}
      onClick={onClick}
      className={'p-4 text-white bg-secondary-accent rounded-lg uppercase text-base w-full flex items-center justify-center gap-2 ' + className}
    >
      <span className='relative'>
        <div className='absolute -left-8 top-[50%] translate-y-[-50%]'>
          {pending &&
            <img
              src='/forms/loading.svg'
              className='w-6  animate-spin'
            />}
        </div>
        {pending
          ? 'Enviando'
          : children}
      </span>
    </button>
  )
}
