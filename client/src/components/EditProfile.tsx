import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import Profile from './Profile'

const EditProfile = () => {

    let auth_token: string | null = localStorage.getItem('auth_token');
    const [profileData, setProfileData] = useState({})

    useEffect(() => {
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
            setProfileData({...profileData, ["previewAvatar"]: URL.createObjectURL(e.target.files[0]), [e.target.name]: e.target.files[0]})
        } else {
          setProfileData({...profileData, [e.target.name]: e.target.value})
        }
    }

    const submit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let form = new FormData();
        form.append("avatar", (profileData as any).avatar);

        // Post image
        fetch('/image', {
          method: "POST",
          headers: {
            "authorization": "Bearer " + auth_token,
          },
          body: form,
          mode: "cors"
        })
        .then(() => {
          // post bio
          fetch('/user/bio', {
            method: "POST",
            headers: {
              "authorization": "Bearer " + auth_token,
              "Content-type": "application/json",
            },
            body: JSON.stringify({"bio": (profileData as any).bio}),
            mode: "cors"
          })
        })

        
        
    }
    

    return (
        <div className='flex flex-col justify-center items-center w-full h-full'>
            <form className='w-2/3' onSubmit={submit} onChange={handleChange}>
                <div className='my-10 lg:grid lg:grid-cols-2'>
                  <div className='m-auto'>
                    <label htmlFor="avatar">Profile picture:</label>
                    <input type="file" name="avatar" />
                  </div>
                  <div>
                    <label htmlFor="bio">Bio:</label>
                    <textarea className='w-full h-full' name='bio' value={(profileData as any).bio}/>
                  </div>
                </div>
                <div className='flex flex-col justify-center items-center  gap-2'>
                  <input className='bg-accent py-4 px-6 rounded hover:cursor-pointer' type="submit" name="submit" value="Save"/>
                  <button className='bg-main py-4 px-6 rounded text-background' onClick={() => window.location.href = "/"}>Cancel</button>
                </div>
            </form>
        
            <div className='my-auto flex items-center justify-center lg:h-2/3 lg:w-2/3'>
                <Profile {...profileData}/>
            </div>
        </div>
    )
}

export default EditProfile