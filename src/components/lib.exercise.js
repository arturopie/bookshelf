import styled from '@emotion/styled/macro'
import {Dialog as ReachDialog} from '@reach/dialog'
import {indigo, base, gray, text} from '../styles/colors'

const buttonVariant = {
  primary: {
    background: indigo,
    color: base,
  },
  secondary: {
    background: gray,
    color: text,
  },
}
const Button = styled.button(
  {
    padding: '10px 15px',
    border: '0',
    lineHeight: '1',
    borderRadius: '3px',
  },
  ({variant = 'primary'}) => buttonVariant[variant],
)

const Input = styled.input({
  borderRadius: '3px',
  border: '1px solid #f1f1f4',
  background: '#f1f2f7',
  padding: '8px 12px',
})

const FormGroup = styled.div({
  display: 'flex',
  flexDirection: 'column',
})

const CircleButton = styled.button({
  borderRadius: '30px',
  padding: '0',
  width: '40px',
  height: '40px',
  lineHeight: '1',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'white',
  color: '#434449',
  border: `1px solid #f1f1f4`,
  cursor: 'pointer',
})

const Dialog = styled(ReachDialog)({
  maxWidth: '450px',
  borderRadius: '3px',
  paddingBottom: '3.5em',
  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.2)',
  margin: '20vh auto',
  large: {
    width: '100%',
    margin: '10vh auto',
  },
})

export {CircleButton, Dialog, Button, Input, FormGroup}
