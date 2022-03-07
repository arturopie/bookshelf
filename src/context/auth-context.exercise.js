import React from 'react'
import * as auth from '../auth-provider'
import {client} from '../utils/api-client'
import {useAsync} from '../utils/hooks'
import {FullPageErrorFallback, FullPageSpinner} from '../components/lib'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

const useAuth = () => {
  let auth = React.useContext(AuthContext)

  if (auth === undefined) {
    throw new Error(
      'Make sure, any component using useAuth is wrapped by AuthContext.Provider.',
    )
  }
  return auth
}

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

const AuthProvider = ({children}) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    isSuccess,
    run,
    setData,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return <FullPageErrorFallback error={error} />
  }

  if (isSuccess) {
    const props = {user, login, register, logout}
    return <AuthContext.Provider value={props}>{children}</AuthContext.Provider>
  }
}

export {useAuth, AuthProvider}
