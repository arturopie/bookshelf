import React from 'react'
import ReactDOM from 'react-dom'
import '@reach/dialog/styles.css'
import {Logo} from './components/logo'
import {Dialog} from '@reach/dialog'
import * as PropTypes from 'prop-types'

const handleLogin = formData => {
  console.log('login', formData)
}

function LoginForm({onSubmit, buttonText}) {
  return (
    <>
      <form
        onSubmit={e => {
          e.preventDefault()
          return onSubmit({
            username: e.target.username.value,
            password: e.target.password.value,
          })
        }}
      >
        <div>
          <label htmlFor="username">Username</label>
          <input id="username" />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input id="password" type="password" />
        </div>
        <input type="submit" value={buttonText} />
      </form>
    </>
  )
}

LoginForm.propTypes = {
  onSubmit: PropTypes.func,
  buttonText: PropTypes.string,
}

const App = () => {
  const [openModal, setOpenModal] = React.useState('none')

  return (
    <>
      <Logo height="80" width="80" />
      <title>Bookshelf</title>
      <h1>Bookshelf</h1>
      <div>
        <button onClick={() => setOpenModal('login')}>Login</button>
      </div>
      <div>
        <button onClick={() => setOpenModal('register')}>Register</button>
      </div>
      <Dialog isOpen={openModal === 'login'} aria-label="login">
        <button onClick={() => setOpenModal('none')}>Close</button>
        <h3>Login</h3>
        <LoginForm onSubmit={handleLogin} buttonText="Login" />
      </Dialog>
      <Dialog isOpen={openModal === 'register'} aria-label="register">
        <button onClick={() => setOpenModal('none')}>Close</button>
        <h3>Register</h3>
        <LoginForm onSubmit={handleLogin} buttonText="Register" />
      </Dialog>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
