import React from 'react'
import Login from './Login.tsx'

const LoginPage = () => {
  return (
    <div className='grid grid-cols-2 h-screen'>
        <div className='bg-mountain bg-cover bg-center h-full w-full flex justify-center items-center'>
            <h1 className='text-background text-8xl '>NotTinder</h1>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
            <Login />
        </div>
    </div>
  )
}

export default LoginPage