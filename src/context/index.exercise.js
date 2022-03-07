import * as React from 'react'
import {AuthProvider} from './auth-context.exercise'
import {ReactQueryConfigProvider} from 'react-query'
import {BrowserRouter as Router} from 'react-router-dom'

const queryConfig = {
  retry(failureCount, error) {
    if (error.status === 404) return false
    else return failureCount < 2
  },
  useErrorBoundary: true,
  refetchAllOnWindowFocus: false,
}

const AppProviders = ({children}) => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>
        <Router>{children}</Router>
      </AuthProvider>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
