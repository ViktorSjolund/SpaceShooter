import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Loading } from '../components/loading'
import { useLoginLazyQuery, useMeQuery } from '../generated/graphql'
import { TLoginProps } from '../types/types'

export const Login = (props: TLoginProps) => {
  const { loading, data } = useMeQuery()
  const [loginUser] = useLoginLazyQuery()
  let [username, setUsername] = useState('')
  let [password, setPassword] = useState('')
  let [usernameErr, setUsernameErr] = useState('')
  let [passwordErr, setPasswordErr] = useState('')
  const navigate = useNavigate()

  const handlePasswordChange = (e: any) => {
    setPassword(e.target.value)
  }

  const handleUsernameChange = (e: any) => {
    setUsername(e.target.value)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setUsernameErr('')
    setPasswordErr('')
    const result = await loginUser({
      variables: {
        username,
        password,
      },
    })

    if (result.data?.login.user?.id) {
      props.client.resetStore()
      navigate('/', { replace: true })
    } else {
      if (result.data?.login.errors![0].field === 'password') {
        setPasswordErr(result.data.login.errors[0].message)
      } else if (result.data?.login.errors![0].field === 'username') {
        setUsernameErr(result.data.login.errors[0].message)
      }
    }
  }

  if (loading) return <Loading />
  if (data?.me.user?.id) {
    return <Navigate to='/' />
  }

  return (
    <div className='wrapper'>
      <div className='form-wrapper'>
        <form onSubmit={handleSubmit}>
          <span>Login</span>
          <label>Username</label>
          <input 
            onChange={handleUsernameChange} 
            style={{ borderColor: usernameErr ? 'red': ''}}
          />
          <span className='form-error-text'>{usernameErr}</span>
          <label>Password</label>
          <input 
            onChange={handlePasswordChange} 
            type='password' 
            style={{ borderColor: passwordErr ? 'red': ''}}
          />
          <span className='form-error-text'>{passwordErr}</span>
          <Link to='/register'>
            <span>Create an account</span>
          </Link>
          <button type='submit'> Login </button>
        </form>
      </div>
    </div>
  )
}
