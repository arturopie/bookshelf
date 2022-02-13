/** @jsx jsx */
// noinspection ES6UnusedImports
import {jsx} from '@emotion/core'

import * as React from 'react'
import * as auth from 'auth-provider'
import {AuthenticatedApp} from './authenticated-app'
import {UnauthenticatedApp} from './unauthenticated-app'
import {client} from './utils/api-client.exercise'
import {useAsync} from './utils/hooks'
import {FullPageSpinner} from './components/lib'
import * as colors from './styles/colors'

async function getUser() {
  const token = await auth.getToken()
  if (token) {
    return (await client('me', {token})).user
  }
  return null
}

function App() {
  const {
    data: user,
    error,
    isIdle,
    isLoading,
    isError,
    run,
    setData: setUser,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = creds => auth.login(creds).then(u => setUser(u))
  const register = creds => auth.register(creds).then(u => setUser(u))
  const logout = () => {
    auth.logout()
    setUser(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }
  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  return user ? (
    <AuthenticatedApp user={user} logout={logout} />
  ) : (
    <UnauthenticatedApp login={login} register={register} />
  )
}

export {App}

/*
eslint
  no-unused-vars: "off",
*/
