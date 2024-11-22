'use client'

import { createContext, useState } from 'react'

export const UserContext = createContext()

export function UserProvider ({ children, user }) {
  const [avatar, setAvatar] = useState(user?.avatar)

  function updateAvatar (avatar) {
    setAvatar(avatar)
  }
  return (
    <UserContext.Provider value={{ avatar, updateAvatar }}>
      {children}
    </UserContext.Provider>
  )
}
