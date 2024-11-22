import { getIcon } from '@/helpers/getIcon'
import { useState } from 'react'
export function InputFile2 ({ mimeType, onChange, maxSize, selected, updateLoaded, errors }) {
  const [progress, setProgress] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  function onSelectedChange (e) {
    const newFile = e.target.files[0]
    if (!newFile) return
    updateLoaded(false)
    const fr = new window.FileReader()
    fr.onload = (e) => {
      updateLoaded(true)
    }
    fr.onprogress = (e) => {
      if (e.lengthComputable) {
        console.log(100 / e.total * e.loaded)
        setProgress(Math.round((100 / e.total * e.loaded)))
      }
    }
    fr.onloadstart = (e) => {
      setIsLoading(true)
    }
    fr.readAsArrayBuffer(newFile)
  }
  return (
    <div className='flex flex-col gap-4'>
      <p className='text-sm font-medium text-secondary-accent dark:text-dark-primary-text'>* El peso máximo es de {maxSize}</p>
      <label htmlFor='recurso' className='w-full h-32 bg-alpha-bg/20 rounded-lg border-primary-accent border-dashed border-[1px] flex items-center justify-center'>
        <input
          type='file'
          accept={mimeType}
          id='recurso'
          name='recurso'
          hidden
          onChange={(e) => {
            onChange(e)
            onSelectedChange(e)
          }}
        />
        <div className='flex flex-col gap-2 text-[#9ca3af] items-center p-2'>
          {selected && getIcon(selected?.type)}

          {errors
            ? <p className='w-full text-red-600 font-bold text-[12px] px-2 text-center'>{errors}</p>
            : <span className='text-sm text-[#9ca3af] text-center'>{selected ? selected?.name : 'Selecciona un Archivo'}</span>}
        </div>
      </label>
      {isLoading &&
        <progress className='w-full [&::-webkit-progress-bar]:rounded-lg [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-violet-400 [&::-moz-progress-bar]:bg-violet-400 h-2 transition-all' max={100} value={progress} />}
    </div>
  )
}
