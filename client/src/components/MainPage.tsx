import React, { useEffect, useState } from 'react'
import Profile from './Profile'

const MainPage = () => {

  const [profileData, setProfileData] = useState({})

  useEffect(() => {

    let auth_token: string | null = localStorage.getItem('auth_token');
    if (!auth_token) window.location.href = '/login';

    fetch('/user', {
      method: "GET",
      headers: {
        "authorization": "Bearer " + auth_token
      },
      mode: "cors"
    })
      .then(response => {
        if (response.status === 401) { // if return status is forbidden == user is not signed in and should be redirected to sign in
          localStorage.removeItem('auth_token') // in case auth_token is expired
          window.location.href = '/login'
        } else {
          response.json().then((data) => {
            setProfileData(data);
          })
        }
      })
  }, [])

  
  return (
    <div>
      <div className='grid grid-cols-2 w-screen py-10 text-white text-3xl'>
        <button className='bg-main rounded-xl p-10 m-10'>Chats</button>
        <button className='bg-main rounded-xl p-10 m-10'>Start Swiping</button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <Profile {...profileData} />
      </div>

    </div>
  )
}

export default MainPage