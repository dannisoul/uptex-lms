export function Media ({ children, handleModal }) {
  return (
    <div className='fixed z-20 inset-0 m-auto bg-black/75 w-full h-full flex justify-center items-center'>
      {children}
      <button className='absolute top-4 right-4 bg-primary-accent text-white py-2 px-4 rounded-full font-medium' onClick={handleModal}>Cerrar</button>
    </div>
  )
}
