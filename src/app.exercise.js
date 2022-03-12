import * as React from 'react'
import {Suspense} from 'react'
import {useAuth} from './context/auth-context'
import {FullPageSpinner} from './components/lib'

const AuthenticatedApp = React.lazy(() => import('./authenticated-app'))
const UnauthenticatedApp = React.lazy(() =>
  import(
    /* webpackPreload: true */
    './unauthenticated-app'
  ),
)

function App() {
  const {user} = useAuth()
  return (
    <Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Suspense>
  )
}

export {App}
