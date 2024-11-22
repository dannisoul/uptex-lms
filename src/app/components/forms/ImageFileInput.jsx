import { useState } from 'react'

export function ImageFileInput ({ preview, handleInputChange, name, id, errors }) {
  const [url, setUrl] = useState(preview)
  function handleFileChange (e) {
    const newFile = e.target.files[0]
    if (!newFile) return
    const fr = new window.FileReader()

    fr.onload = (e) => {
      setUrl(e.target.result)
    }

    fr.readAsDataURL(newFile)
  }
  return (
    <label className='relative lg:w-[330px] w-[200px] lg:h-[330px] h-[200px] cursor-pointer mx-auto'>
      <input
        type='file'
        accept='image/*'
        name={name}
        id={id}
        hidden
        onChange={(e) => {
          handleInputChange(e)
          handleFileChange(e)
        }}
      />
      <img src={url} className='w-full h-full lg:rounded-[25px] rounded-full object-cover' />
      {errors &&
        <p className='absolute left-0 -bottom-6 w-full text-red-600 font-bold text-[12px] px-2'>{errors}</p>}
    </label>
  )
}
