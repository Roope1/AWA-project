import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.jpg'
import { useTranslation } from 'react-i18next';

const Profile = ({...props}) => {

  //get image
  const [image, setImage] = useState();
  const auth_token = localStorage.getItem('auth_token');

  const { t } = useTranslation();

  useEffect(() => {
    // get the profile picture of the user
    fetch('/image/' + props.profilePic, {
      method: "GET",
      headers: {
        "authorization": "Bearer " + auth_token
      },
      mode: "cors"
    })
    .then((response: Response) => {
      if (response.status !== 404 && response.status !== 401){
        response.json()
        .then(data => setImage(data.image))
      } else if(response.status === 401){
        window.location.href = '/login'
      } 
    })
      
  }, [props.profilePic, auth_token])

  return (
    <div className='lg:w-[64rem] lg:h-[32rem] bg-secondary grid lg:grid-cols-2 sm:grid-rows-2 '>
        <div className='lg:h-[30rem] sm:h-full m-auto'>
          <img className="h-5/6 mt-10" src= {props.previewAvatar ?? image ?? avatar} alt="avatar" /> 
          <h1 className='relative text-4xl'>{props.username}</h1>
        </div>
        <div className='pt-10 mx-10'>
            <h1 className='text-2xl font-bold'>{t("bio")}:</h1>
            <p className='px-10 whitespace-pre-line'>{props.bio}</p>
        </div>
    </div>
  )
}

export default Profile