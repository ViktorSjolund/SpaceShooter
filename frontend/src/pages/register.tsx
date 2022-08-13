import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MeDocument, useRegisterMutation } from '../generated/graphql'

export const Register = () => {
  const [registerUser] = useRegisterMutation()
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [passwordErr, setPasswordErr] = useState('')
  let [usernameErr, setUsernameErr] = useState('')
  let [repasswordErr, setRepasswordErr] = useState('')
  let [repassword, setRepassword] = useState('')
  const navigate = useNavigate()

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleRepasswordChange = (e: any) => {
    setRepassword(e.target.value)
  }

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setPasswordErr('')
    setUsernameErr('')
    setRepasswordErr('')
    if (password !== repassword) {
      setRepasswordErr('Passwords needs to be matching.')
      return
    }
    const result = await registerUser({
      variables: {
        username,
        password
      },
      refetchQueries: [{ query: MeDocument }]
    })
    if (result.data?.register.success) {
      navigate('/login', { replace: true })
    } else {
      if (result.data?.register.errors![0].field === 'password') {
        setPasswordErr(result.data.register.errors[0].message)
      } else if (result.data?.register.errors![0].field === 'username') {
        setUsernameErr(result.data.register.errors[0].message)
      }
    }
  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <span> Register </span>
          <label>Username</label>
          <input 
            onChange={handleUsernameChange} 
            style={{ borderColor: usernameErr ? 'red': ''}}/>
          <span className='form-error-text'>{usernameErr}</span>
          <label>Password</label>
          <input 
            onChange={handlePasswordChange} 
            type='password' 
            style={{ borderColor: passwordErr ? 'red' : '' || repasswordErr ? 'red' : '' }}
          />
          <span className='form-error-text'>{passwordErr}</span>
          <label>Confirm Password </label>
          <input 
            onChange={handleRepasswordChange} 
            type='password' 
            style={{ borderColor: repasswordErr ? 'red': ''}}
          />
          <span className='form-error-text'>{repasswordErr}</span>
          <Link to='/login'>
            <span>Already have an account?</span>
          </Link>
          <button type='submit'> Register </button>
        </form>
      </div>
    </div>
  )
}
