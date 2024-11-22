export function ActionButton ({ icon, onClick }) {
  return (
    <button
      type='button'
      onClick={onClick}
      className='sm:p-2 p-[.35rem] border sm:rounded-xl rounded-lg bg-white text-dark-primary-bg dark:bg-dark-tertiary-bg dark:text-white dark:border-alpha-bg/20'
    >
      {icon}
    </button>
  )
}
