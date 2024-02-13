import React, { useEffect, useState } from 'react'
import ProfileDropdown from './ProfileDropdown'


export const TopBar = () => {

    const [username, setUsername] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {

      let auth_token: string | null = localStorage.getItem('auth_token');
  
      fetch('/user', {
        method: "GET",
        headers: {
          "authorization": "Bearer " + auth_token
        },
        mode: "cors"
      })
        .then(response => {
          if (response.status === 401) { 
            setLoggedIn(false);
          } else {
            response.json().then((data) => {
              setUsername(data.username);
              setLoggedIn(true);
            })
          }
        })
        .catch(() => setLoggedIn(false))
    }, [])


  return (
    <div className='bg-main w-screen h-14 flex flex-wrap justify-between items-center mx-auto p-4 drop-shadow-md'>
        <a href='#' className='flex items-center space-x-3 text-secondary'>
            <img src="logo" className='h-8' alt='logo'/>
            <span className='self-center text-2xl whitespace-nowrap'>NotTinder</span>
        </a>
        <div className='flex items-center space-x-6 text-secondary'>
            {!loggedIn ? <p><a href='/login'>Sign in</a></p> : <ProfileDropdown username={username}/>}
            <p>FI / EN</p>
        </div>
    </div>
  )
}
