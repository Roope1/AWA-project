import React, { ChangeEvent, FormEvent, useState } from 'react'

const RegisterPage = () => {

    const [registerData, setRegisterData] = useState({})
    const [errorMsg, setErrorMsg] = useState("")

    const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    } 

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // check password match
        // send register to backend
    }

    return (
        <div className='flex flex-col justify-center items-center w-1/2 h-2/3 m-auto border-4 border-secondary rounded bg-secondary'>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor="name"> Name </label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' name='name' type='text' required/>
                    <label htmlFor="username">Username</label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' name='username' type='text' required/>
                    <label htmlFor="password">Password</label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' name='password ' type='password' required/>
                    <label htmlFor="retypepassword">Retype password</label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' name='retypepasswod' type='password' required/>
                    <p className='text-error text-s text-center'>{errorMsg}</p>
                    <input className='bg-main rounded hover:bg-accent text-secondary py-3 hover:text-main transition-all' type='submit' value='Register' />
                </div>
            </form>
        </div>
    )
}

export default RegisterPage