import { useState } from 'react'

export function useModal () {
  const [modal, setModal] = useState(false)
  function handleModal () {
    setModal(!modal)
  }

  return { modal, handleModal }
}
