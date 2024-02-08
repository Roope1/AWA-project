import React from 'react'

const Login = () => {
  return (
    <div className='container flex justify-center items-center w-1/2 h-1/2 border-8 rounded-lg border-accent-secondary bg-secondary'>
        <form>
            <div className='flex flex-col'>
                <div className='flex flex-col'>   
                    <label htmlFor='name'>Username: </label>
                    <input name='username' placeholder='username' type='text' />
                </div>
                <div className='flex flex-col'>
                    <label htmlFor='password'>Password:</label>
                    <input name='password' placeholder='password' type='password' />
                </div>
                <input type='submit' value="Log in"/>
                <div className='flex flex-col'>
                    <p>Don't have an account?</p>
                    <p>Register <a href='/register'>here</a></p>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login