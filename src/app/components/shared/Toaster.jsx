import { Toaster, toast } from 'sonner'

export function Toast () {
  return (
    <Toaster
      toastOptions={{
        unstyled: true,
        classNames: {
          toast: 'p-4 rounded-lg flex items-center gap-2 w-full dark:bg-dark-secondary-bg bg-white shadow-lg',
          error: 'dark:text-red-400 text-red-700',
          success: 'dark:text-emerald-400 text-emerald-700',
          info: 'dark:text-blue-400 text-blue-700',
          warning: 'dark:text-yellow-400 text-yellow-600'

        }
      }}
    />
  )
}

export const showToast = toast
