import React from 'react'

const AuthContext = React.createContext()

const useAuth = () => {
  let auth = React.useContext(AuthContext)

  if (auth === undefined) {
    throw new Error(
      'Make sure, any component using useAuth is wrapped by AuthContext.Provider.',
    )
  }
  return auth
}

export {AuthContext, useAuth}
