import { Button } from '../forms/Button'
export function ModalContainer ({ children, submitText, formTitle, setVisible, action }) {
  return (
    <div className='fixed z-20 inset-0 mt-auto bg-black/30 w-full h-full flex justify-center items-center'>
      <div className='bg-primary-bg dark:bg-dark-primary-bg max-w-[450px] p-8 rounded-[20px] shadow-xl w-11/12 animate-fade-left animate-duration-300'>
        <header className='border-b-2 border-alpha-bg/20 pb-4'>
          <h2 className='text-2xl font-bold text-secondary-accent dark:text-white'>{formTitle || 'Formulario'}</h2>
        </header>
        <div className='my-4 grid grid-cols-1 gap-8'>
          {children}
        </div>
        <footer className='flex gap-4 pt-4 items-center border-t-2 border-alpha-bg/20'>
          <Button type='button' className='text-sm font-semibold bg-violet-500' onClick={setVisible}>Regresar</Button>
          <Button onClick={action} type='button' className='text-sm font-semibold text-nowrap'>{submitText || 'Continuar'}</Button>
        </footer>
      </div>
    </div>
  )
}
