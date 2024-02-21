import React, { ChangeEvent, FormEvent } from 'react'
import { useState } from 'react'

const Login = () => {

    const [loginFailed, setLoginFailed] = useState(false)

    const [userInfo, setUserInfo] = useState({});

    const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
        setUserInfo({...userInfo, [e.target.name]: e.target.value})
        setLoginFailed(false);
    }

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // TODO: post userInfo to backend once its built
        fetch('/login', {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(userInfo) 
        })
        .then((res: Response) => {
            if(res.status != 200){
                setLoginFailed(true);
            } else {
                res.json().then((data)=>{
                    localStorage.setItem("auth_token", data.token)
                    window.location.href = '/'
                })
            }
        })
    }

    


    return (
    <div className='flex justify-center items-center lg:w-1/2 sm:w-5/6 h-2/3 border-2 rounded-lg border-main bg-main drop-shadow-md'>
        <form onSubmit={handleLogin} onChange={handleChange}>
            <div className='flex flex-col text-background'>
                <div className='mb-4 flex flex-col'>   
                    <label className='block text-sm font-bold mb-2' htmlFor='name'>Username: </label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3' 
                     name='username' placeholder='Username' type='text' required/>
                </div>
                <div className='mb-6 flex flex-col'>
                    <label className='block text-sm font-bold mb-2' htmlFor='password'>Password:</label>
                    <input className='shadow appearance-none border border-accent-secondary rounded mb-3 focus:outline-none focus:shadow-outline py-2 px-3'
                     name='password' placeholder='************' type='password' required/>
                </div>
                <div className='flex flex-col text-xs text-error text-center mb-1'>
                    {loginFailed ? <p>Username or password is incorrect!</p> : <p></p>}
                </div>
                <input className='bg-secondary rounded hover:bg-background text-main py-3' type='submit' value="Log in"/>
                <div className='flex flex-col text-xs py-4 text-center'>
                    <p>Don't have an account?</p>
                    <p>Register <a href='/register' className='underline'>here</a></p>
                </div>
            </div>
        </form>
    </div>
    )
}

export default Login