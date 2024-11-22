'use client'
import { useEffect, useState } from 'react'

export function userDarkMode () {
  const [darkMode, setDarkMode] = useState(false)

  function handleDarkModeChange () {
    document.documentElement.classList.toggle('dark')
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    window.localStorage.setItem('dark', newDarkMode)
  }

  useEffect(() => {
    function applyDarkMode () {
      const darkModeStored = window.localStorage.getItem('dark') === 'true'
      setDarkMode(darkModeStored)
      if (darkModeStored) {
        document.documentElement.classList.add('dark')
      }
    }

    applyDarkMode()
  }, [])
  return { darkMode, handleDarkModeChange }
}
