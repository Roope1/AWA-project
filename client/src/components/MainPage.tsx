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
        if (response.status === 403) { // if return status is forbidden == user is not signed in and should be redirected to sign in
          window.location.href = '/login'
        } else {
          response.json().then((data) => {
            setProfileData(data);
          })
        }
      })
  }, [])

  // get these from backend via authenticated user
  const profileProps = {
    name: "koira",
    username: "doggie44",
    bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate iste harum iure aut ab alias veniam saepe aliquid officia, doloribus voluptate repellat vero sapiente minima exercitationem nam doloremque! Natus, harum?"
  }

  return (
    <div>
      <div className='grid grid-cols-2 w-screen py-10 text-white text-3xl'>
        <button className='bg-main rounded-xl p-10 m-10'>Chats</button>
        <button className='bg-main rounded-xl p-10 m-10'>Start Swiping</button>
      </div>
      <div className='flex flex-col items-center justify-center'>
        <Profile {...profileProps} />
      </div>

    </div>
  )
}

export default MainPage