import {loadDevTools} from './dev-tools/load'
import './bootstrap'
import * as React from 'react'
import ReactDOM from 'react-dom'
import {App} from './app'
import {ReactQueryConfigProvider} from 'react-query'

const reactQueryConfig = {
  queries: {
    useErrorBoundary: true,
    retry: 0,
  },
}
loadDevTools(() => {
  ReactDOM.render(
    <ReactQueryConfigProvider config={reactQueryConfig}>
      <App />
    </ReactQueryConfigProvider>,
    document.getElementById('root'),
  )
})
