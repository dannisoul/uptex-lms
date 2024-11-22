export function ButtonIcon ({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className='flex gap-1 items-center justify-center bg-primary-accent text-white sm:p-4 p-3 sm:text-base text-sm cursor-pointer rounded-lg'
    >
      {icon}
      <span
        className='font-medium text-sm'
      >{label}
      </span>
    </button>
  )
}
