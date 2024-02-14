import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Profile from './Profile'

const EditProfile = () => {

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

    const handleChange = (e: ChangeEvent<HTMLFormElement>) => {
        console.log(e.target.name);
        if (e.target.name === "avatar") {
            setProfileData({...profileData, ["previewAvatar"]: URL.createObjectURL(e.target.files[0])})
        } else {
            setProfileData({...profileData, [e.target.name]: e.target.value})
        }
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {
        // send to backend
    }
    

    return (
        <div className='flex flex-col justify-center items-center'>
            <form className='w-2/3' onSubmit={submit} onChange={handleChange}>
                <div className='my-10 flex flex-col'>
                    <label htmlFor="avatar">Profile picture:</label>
                    <input type="file" name="avatar" />
                    <label htmlFor="bio">Bio:</label>
                    <textarea name='bio' value={(profileData as any).bio}/>
                    <input type="submit" name="submit" id="" value="Save" />
                </div>
            </form>
            <button>Cancel</button>
            <div className='my-10'>
                <h1>Preview:</h1>
                <Profile {...profileData}/>
            </div>
        </div>
    )
}

export default EditProfile