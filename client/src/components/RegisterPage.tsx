import React, { ChangeEvent, FormEvent, useState } from 'react'

const RegisterPage = () => {

    const [registerData, setRegisterData] = useState({})
    const [errorMsg, setErrorMsg] = useState("")

    const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
        setRegisterData({...registerData, [e.target.name]: e.target.value})
    } 

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // send new register data to server
        fetch('/register', {
            method: "POST",
            headers: {
                "Content-type" : "application/json",
            },
            body: JSON.stringify(registerData),
            mode: 'cors'
        })
        .then((res: Response) => {
            if (res.status === 200) {
                window.location.href = '/login';
            } else {
                res.json().then(data => setErrorMsg(data.msg))
            }
        })
    }

    return (
        <div className='flex flex-col justify-center items-center lg:w-1/2 h-2/3 sm:w-3/4 m-auto border-4 border-secondary rounded bg-secondary'>
            <form onChange={handleChange} onSubmit={handleSubmit}>
                <div className='flex flex-col'>
                    <label htmlFor="name"> Name </label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' name='name' type='text' required/>
                    <label htmlFor="username">Username</label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' name='username' type='text' required/>
                    <label htmlFor="password">Password</label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' name='password' type='password' required/>
                    <label htmlFor="retypepassword">Retype password</label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' name='retypepassword' type='password' required/>
                    <p className='text-error text-s text-center'>{errorMsg}</p>
                    <input className='bg-main rounded hover:bg-accent text-secondary py-3 hover:text-main transition-all' type='submit' value='Register' />
                </div>
            </form>
        </div>
    )
}

export default RegisterPage