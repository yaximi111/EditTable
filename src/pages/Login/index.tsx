import React from 'react'
import { history } from 'umi'

const Login = () => {
  return (
    <button onClick={()=>{history.push('/home'),
    localStorage.setItem('authorization', '999')
  }}>Login</button>
  )
}

export default Login