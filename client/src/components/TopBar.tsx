import React from 'react'


export const TopBar = () => {

    const loggedIn: Boolean = false;
    const username: string = "foobar";

  return (
    <div className='bg-accent w-screen h-14 flex flex-wrap justify-between items-center mx-auto p-4 drop-shadow-md'>
        <a href='#' className='flex items-center space-x-3 text-main'>
            <img src="aasdf" className='h-8' alt='logo'/>
            <span className='self-center text-2xl whitespace-nowrap'>NotTinder</span>
        </a>
        <div className='flex items-center space-x-6 text-main'>
            {!loggedIn ? <p><a href='/login'>Sing in</a></p> : <p>{username}</p>}
            <p>FI / EN</p>
        </div>
    </div>
  )
}
