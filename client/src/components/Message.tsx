import React, { useEffect, useState } from 'react'
import avatar from '../images/avatar.jpg'


const Message = ({...props}) => {

  const auth_token = localStorage.getItem('auth_token');
  const [profilePic, setProfilePic] = useState<any>();

  useEffect(() => {
    fetch('/image/user/' + props.message.authorId, {
      method: "GET",
      headers: {
        "authorization": "Bearer " + auth_token
      },
      mode: "cors"
    })
    .then((response: Response) => {
      if (response.status !== 404){
        response.json()
        .then(data => setProfilePic(data.image))
      } 
    })}, [props.message.authorId])


  return (
    <div className='border border-red-500 flex flex-row mt-2'>
        <img className='w-12 rounded-full mx-2' src={profilePic ?? avatar} alt="avatar"/>
        <div className=''>
            <p className='font-bold'>{props.message.author}</p>
            <p>{props.message.content}</p>
        </div>
    </div>
  )
}

export default Message