import React from 'react'
import Login from './Login'

const LoginPage = () => {
  return (
    <div className='lg:grid lg:grid-cols-2 h-screen overflow-hidden'>
        <div className='bg-mountain bg-cover bg-center h-full w-full lg:flex justify-center items-center sm:hidden '>
            <h1 className='text-background text-8xl '>NotTinder</h1>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
            <Login />
        </div>
    </div>
  )
}

export default LoginPage